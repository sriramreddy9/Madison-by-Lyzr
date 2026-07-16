"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Activity,
  Brain,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListTree,
  UserCheck,
} from "lucide-react";
import { useDemo } from "./DemoContext";
import { IconFor } from "@/components/brand/IconFor";
import { agentById } from "@/lib/agents";
import type { Turn } from "@/lib/scenario";
import { signalBucket } from "./studioHelpers";

type Tab = "activity" | "reasoning" | "signals";

const SIGNAL_GROUPS = ["Core data", "Rulebook", "Brand kit", "Competitor signals", "Outcome history", "Other"];

export function ContextDrawer() {
  const { scenario, run, turnFor, auditLog, focusBrainNode } = useDemo();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("activity");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const running = run.itemIdx >= 0;
  const finished = run.phase === "complete" || run.phase === "compose_prompt";
  const live = run.phase === "running";

  const turns = scenario.items.filter((i): i is Turn => i.kind === "turn");
  const idxOf = (t: Turn) => scenario.items.findIndex((i) => i.id === t.id);
  const doneTurns = running
    ? turns.filter((t) => idxOf(t) < run.itemIdx || finished)
    : [];
  const activeItem = live ? scenario.items[run.itemIdx] : null;
  const activeTurn = activeItem?.kind === "turn" ? turnFor(activeItem) : null;
  const doneCount = doneTurns.length;

  const startedTurns = running
    ? turns.filter((t) => idxOf(t) <= run.itemIdx || finished)
    : [];

  // Collapsed rail: a calm pulse plus progress.
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the agent context drawer"
        className="sticky top-[56px] hidden h-[calc(100vh-56px)] w-14 shrink-0 flex-col items-center gap-3 border-l border-border bg-card pt-5 transition-colors hover:bg-secondary/50 xl:flex"
      >
        <ChevronLeft className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
        <span className="relative flex h-9 w-9 items-center justify-center">
          {live && !reduced && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-brand"
              animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
              live ? "border-brand bg-brand-soft text-brand-text" : "border-border bg-muted text-muted-foreground"
            }`}
          >
            <Activity className="h-4 w-4" strokeWidth={2} />
          </span>
        </span>
        {running && (
          <span className="font-mono text-[10px] font-semibold text-muted-foreground">
            {doneCount}/{turns.length}
          </span>
        )}
        <span
          className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70"
          style={{ writingMode: "vertical-rl" }}
        >
          {live ? "agents active" : "agent context"}
        </span>
      </button>
    );
  }

  const TABS: { id: Tab; label: string; icon: typeof Activity }[] = [
    { id: "activity", label: "Activity", icon: Activity },
    { id: "reasoning", label: "Reasoning", icon: ListTree },
    { id: "signals", label: "Signals", icon: Brain },
  ];

  return (
    <motion.aside
      initial={reduced ? false : { width: 56, opacity: 0.6 }}
      animate={{ width: 360, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-[56px] hidden h-[calc(100vh-56px)] shrink-0 flex-col overflow-hidden border-l border-border bg-card xl:flex"
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <div className="flex rounded-lg bg-muted p-0.5" role="tablist" aria-label="Context tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                tab === t.id ? "bg-card text-foreground shadow-e-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-3 w-3" strokeWidth={2} />
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Collapse the context drawer"
          className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className="thin-scroll flex-1 overflow-y-auto p-4">
        {tab === "activity" && (
          <div className="space-y-5">
            {!running && (
              <p className="text-xs leading-[1.6] text-muted-foreground">
                Quiet for now. Run a brief in Campaign Studio and a live, human-readable feed of agent events appears here.
              </p>
            )}
            {activeTurn && (
              <div>
                <p className="overline-sage !text-[9px]">Now</p>
                <div className="mt-2 flex items-start gap-2.5 rounded-lg bg-brand-soft/60 p-2.5">
                  <span className="mt-0.5 text-brand-text">
                    <IconFor icon={agentById(activeTurn.agentId)?.icon ?? "workflow"} className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-xs leading-[1.5] text-foreground">
                    <span className="font-semibold">{activeTurn.title}</span> is working
                    <span className="animate-blink">…</span>
                  </p>
                </div>
              </div>
            )}
            {run.phase === "awaiting_marketer" && (
              <div className="flex items-start gap-2.5 rounded-lg bg-warning-soft p-2.5">
                <UserCheck className="mt-0.5 h-3.5 w-3.5 text-warning-text" strokeWidth={2} />
                <p className="text-xs leading-[1.5] text-warning-text">Waiting on the Marketer&apos;s approval.</p>
              </div>
            )}
            {run.phase === "in_compliance_queue" && (
              <div className="flex items-start gap-2.5 rounded-lg bg-warning-soft p-2.5">
                <UserCheck className="mt-0.5 h-3.5 w-3.5 text-warning-text" strokeWidth={2} />
                <p className="text-xs leading-[1.5] text-warning-text">With Compliance for the second review.</p>
              </div>
            )}
            {doneTurns.length > 0 && (
              <div>
                <p className="overline-sage !text-[9px]">{activeTurn ? "Just now" : "Earlier"}</p>
                <ul className="mt-2 space-y-1">
                  {[...doneTurns].reverse().map((t) => {
                    const rt = turnFor(t);
                    const openRow = expandedRow === t.id;
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          onClick={() => setExpandedRow(openRow ? null : t.id)}
                          aria-expanded={openRow}
                          className="flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-secondary/60"
                        >
                          <span className="mt-0.5 text-success-text">
                            <IconFor icon={agentById(rt.agentId)?.icon ?? "workflow"} className="h-3.5 w-3.5" />
                          </span>
                          <span className="min-w-0 flex-1 text-xs leading-[1.5] text-foreground/85">
                            <span className="font-semibold">{rt.title}:</span> {rt.output.headline}
                          </span>
                          <ChevronDown className={`mt-0.5 h-3 w-3 shrink-0 text-muted-foreground transition-transform ${openRow ? "rotate-180" : ""}`} strokeWidth={2} />
                        </button>
                        <AnimatePresence initial={false}>
                          {openRow && (
                            <motion.ul
                              initial={reduced ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduced ? undefined : { height: 0, opacity: 0 }}
                              className="overflow-hidden pl-8"
                            >
                              {rt.output.details.map((d, i) => (
                                <li key={i} className="py-0.5 text-[11px] leading-[1.5] text-muted-foreground">· {d}</li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {auditLog.length > 0 && (
              <div>
                <p className="overline-sage !text-[9px]">Decisions</p>
                <ul className="mt-2 space-y-1.5">
                  {[...auditLog].reverse().slice(0, 4).map((e, i) => (
                    <li key={i} className="text-[11px] leading-[1.5] text-muted-foreground">
                      <span className="font-mono text-muted-foreground/60">{e.time}</span>{" "}
                      <span className="font-medium text-foreground/75">{e.actor}</span> {e.action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === "reasoning" && (
          <div className="space-y-2">
            {startedTurns.length === 0 && (
              <p className="text-xs leading-[1.6] text-muted-foreground">
                Every agent&apos;s reasoning trail lands here, grouped by agent. Show the Work is not optional in a regulated industry.
              </p>
            )}
            {startedTurns.map((t) => {
              const rt = turnFor(t);
              const openAgent = expandedAgent === t.id;
              return (
                <div key={t.id} className="overflow-hidden rounded-lg border border-border">
                  <button
                    type="button"
                    onClick={() => setExpandedAgent(openAgent ? null : t.id)}
                    aria-expanded={openAgent}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-secondary/60"
                  >
                    <IconFor icon={agentById(rt.agentId)?.icon ?? "workflow"} className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="flex-1 text-xs font-semibold text-foreground">{rt.title}</span>
                    <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${openAgent ? "rotate-180" : ""}`} strokeWidth={2} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAgent && (
                      <motion.ul
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-border bg-muted/40"
                      >
                        {rt.reasoning.map((l, i) => (
                          <li key={i} className="px-3 py-1.5 text-[11px] leading-[1.55] text-muted-foreground">
                            {l}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {tab === "signals" && (
          <div className="space-y-4">
            {startedTurns.length === 0 && (
              <p className="text-xs leading-[1.6] text-muted-foreground">
                What each agent pulls from One Brain shows up here, grouped by source. One shared brain, no per-screen forks.
              </p>
            )}
            {SIGNAL_GROUPS.map((g) => {
              const chips = Array.from(
                new Set(
                  startedTurns
                    .flatMap((t) => turnFor(t).brainReads)
                    .filter((c) => signalBucket(c).group === g)
                )
              );
              if (chips.length === 0) return null;
              return (
                <div key={g}>
                  <p className="overline-sage !text-[9px]">{g}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {chips.map((c) => {
                      const { nodeId } = signalBucket(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          disabled={!nodeId}
                          onClick={() => nodeId && focusBrainNode(nodeId)}
                          title={nodeId ? "Show this node in One Brain" : undefined}
                          className="chip border border-border bg-card text-muted-foreground transition-colors enabled:hover:border-brand enabled:hover:text-brand-text disabled:cursor-default"
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.aside>
  );
}
