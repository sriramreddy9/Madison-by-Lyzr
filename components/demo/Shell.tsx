"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Brain,
  Bot,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Command,
  LayoutDashboard,
  ListChecks,
  PenSquare,
  Plus,
} from "lucide-react";
import { useDemo, type Role, type View, type StudioMode } from "./DemoContext";
import { SageLockup } from "@/components/brand/Elevate";
import { CommandDeck } from "./CommandDeck";
import { CampaignStudio } from "./CampaignStudio";
import { ComplianceQueue } from "./ComplianceQueue";
import { BrainView } from "./BrainView";
import { AgentLibrary } from "./AgentLibrary";
import { ContextDrawer } from "./ContextDrawer";
import { CommandPalette } from "./CommandPalette";
import { Coach } from "./Coach";

const ROLES: { id: Role; label: string; initials: string }[] = [
  { id: "cmo", label: "CMO", initials: "AV" },
  { id: "marketer", label: "Marketer", initials: "JL" },
  { id: "compliance", label: "Compliance", initials: "DO" },
];

const NAV: { id: View; label: string; icon: typeof Brain }[] = [
  { id: "deck", label: "Command Deck", icon: LayoutDashboard },
  { id: "studio", label: "Campaign Studio", icon: PenSquare },
  { id: "queue", label: "Compliance Queue", icon: ListChecks },
  { id: "brain", label: "One Brain", icon: Brain },
  { id: "library", label: "Agent Library", icon: Bot },
];

const RAIL_KEY = "aos-rail-collapsed";

export function Shell() {
  const { role, setRole, view, setView, mode, setMode, queue, run, resetRun, toasts } = useDemo();
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const currentRole = ROLES.find((r) => r.id === role)!;
  const pendingCount = queue.filter((q) => q.status === "pending").length;

  // Remember the rail state.
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(RAIL_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);
  const toggleRail = () => {
    setCollapsed((c) => {
      try {
        localStorage.setItem(RAIL_KEY, c ? "0" : "1");
      } catch {
        /* ignore */
      }
      return !c;
    });
  };

  // Command palette shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const newCampaign = () => {
    resetRun();
    setRole("marketer");
    setView("studio");
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="mesh-bg" aria-hidden="true" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="flex h-full items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
              aria-label="Back to the site"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </Link>
            <SageLockup />
            <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground lg:inline-flex">
              Willamette Community CU · $3.2B · Demonstration environment
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Flow / Canvas toggle, studio only */}
            {view === "studio" && (
              <div className="hidden rounded-xl border border-border bg-muted p-0.5 sm:flex" role="group" aria-label="Studio mode">
                {(["flow", "canvas"] as StudioMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className="relative rounded-[10px] px-3 py-1.5 text-xs font-semibold capitalize"
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="mode-pill"
                        className="absolute inset-0 rounded-[10px] bg-card shadow-e-xs"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className={`relative ${mode === m ? "text-foreground" : "text-muted-foreground"}`}>{m}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Role switcher with sliding indicator */}
            <div className="flex rounded-xl border border-border bg-muted p-0.5" role="group" aria-label="Role switcher">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  aria-pressed={role === r.id}
                  className="relative rounded-[10px] px-3 py-1.5 text-xs font-semibold"
                >
                  {role === r.id && (
                    <motion.span
                      layoutId="role-pill"
                      className="absolute inset-0 rounded-[10px] bg-card shadow-e-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className={`relative ${role === r.id ? "text-foreground" : "text-muted-foreground"}`}>{r.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open the command palette"
              className="hidden items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex"
            >
              <Command className="h-3 w-3" strokeWidth={2} /> K
            </button>

            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
              aria-label={`Signed in as the ${currentRole.label}`}
            >
              {currentRole.initials}
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        {/* Left rail, collapsible */}
        <nav
          className={`sticky top-14 hidden h-[calc(100vh-56px)] shrink-0 flex-col border-r border-border bg-card transition-[width] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex ${
            collapsed ? "w-16" : "w-60"
          }`}
          aria-label="Demo navigation"
        >
          <div className="p-3">
            <button
              type="button"
              onClick={newCampaign}
              title="New campaign"
              className={`flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 ${
                collapsed ? "px-0" : "px-3"
              }`}
            >
              <Plus className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              {!collapsed && "New campaign"}
            </button>
          </div>
          <div className="flex-1 space-y-0.5 px-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setView(n.id)}
                aria-current={view === n.id ? "page" : undefined}
                title={collapsed ? n.label : undefined}
                className={`group relative flex w-full items-center gap-2.5 rounded-lg py-2.5 text-left text-[13px] font-medium transition-colors duration-200 ${
                  collapsed ? "justify-center px-0" : "px-3"
                } ${
                  view === n.id
                    ? "bg-brand-soft font-semibold text-brand-text"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {view === n.id && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-brand" />
                )}
                <n.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {!collapsed && <span className="flex-1 truncate">{n.label}</span>}
                {n.id === "queue" && pendingCount > 0 && (
                  <span
                    className={`flex h-5 min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground ${
                      collapsed ? "absolute -right-0.5 -top-0.5" : "ml-auto"
                    }`}
                  >
                    {pendingCount}
                  </span>
                )}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full z-30 ml-2 hidden whitespace-nowrap rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground group-hover:block">
                    {n.label}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <button
              type="button"
              onClick={toggleRail}
              aria-label={collapsed ? "Expand the navigation" : "Collapse the navigation"}
              className={`flex w-full items-center gap-2 rounded-lg py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${
                collapsed ? "justify-center" : "px-3"
              }`}
            >
              {collapsed ? (
                <ChevronsRight className="h-4 w-4" strokeWidth={2} />
              ) : (
                <>
                  <ChevronsLeft className="h-4 w-4" strokeWidth={2} /> Collapse
                </>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile view switcher */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-border bg-background/95 py-1.5 backdrop-blur lg:hidden">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setView(n.id)}
              aria-current={view === n.id ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[9px] font-semibold ${
                view === n.id ? "text-brand-text" : "text-muted-foreground"
              }`}
            >
              <n.icon className="h-5 w-5" strokeWidth={1.75} />
              {n.label.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Main */}
        <main className="min-w-0 flex-1 p-4 pb-24 sm:p-6 lg:pb-8">
          {view === "deck" && <CommandDeck />}
          {view === "studio" && <CampaignStudio />}
          {view === "queue" && <ComplianceQueue />}
          {view === "brain" && <BrainView />}
          {view === "library" && <AgentLibrary />}
        </main>

        <ContextDrawer />
      </div>

      {/* Toasts */}
      <div className="pointer-events-none fixed bottom-16 right-4 z-[65] flex w-[min(360px,calc(100vw-32px))] flex-col gap-2 lg:bottom-4" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-auto rounded-xl border border-border bg-card px-4 py-3 text-[13px] leading-[1.5] text-foreground shadow-e-lg"
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Coach />

      {run.itemIdx < 0 && view !== "studio" && (
        <div className="pointer-events-none fixed bottom-16 left-1/2 z-30 -translate-x-1/2 lg:bottom-6">
          <button type="button" onClick={newCampaign} className="btn-primary pointer-events-auto shadow-e-lg">
            <PenSquare className="h-4 w-4" strokeWidth={2} /> Start your first campaign
          </button>
        </div>
      )}
    </div>
  );
}
