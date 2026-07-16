"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Brain, Check, Loader2, Rocket, Sparkles, UserCheck, X } from "lucide-react";
import { useDemo } from "./DemoContext";
import { OutputCard } from "./OutputCard";
import { PipelineStepper } from "./PipelineStepper";
import { TypeText } from "@/components/brand/TypeText";
import { IconFor } from "@/components/brand/IconFor";
import { agentById } from "@/lib/agents";
import { SCENARIOS, type TimelineItem } from "@/lib/scenario";
import { totalSteps } from "@/lib/orchestrator";

const BRAIN_DOMAINS = [
  "Core data",
  "Rulebook",
  "Brand kit",
  "Campaign history",
  "Approvals",
  "Outcomes",
  "Competitor signals",
];

function nodePositions(count: number): { x: number; y: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (-90 + (i * 360) / count) * (Math.PI / 180);
    return { x: 50 + 38 * Math.cos(angle), y: 46 + 34 * Math.sin(angle) };
  });
}

function shortLabel(item: TimelineItem, title: string): string {
  if (item.kind === "gate")
    return item.gate === "marketer" ? "Marketer" : item.gate === "compliance" ? "Compliance" : "Launch gate";
  const MAP: Record<string, string> = {
    "Brief Structurer": "Brief",
    "Fair-lending Segmentation": "Fair-lending",
    "Competitive and Rate Intel": "Rate Intel",
    "Content and Language Optimization": "Content",
    "Compliance Pre-check": "Pre-check",
    Launch: "Launch",
    "Measurement and Attribution": "Measure",
    "Compose Dynamic Agent": "Compose",
  };
  return MAP[title] ?? title.split(" ")[0];
}

export function AgentCanvas() {
  const { scenario, run, turnFor, role, startRun, launchCampaign, approveMarketer, approveCompliance, confirmCompose, resetRun, setRole } = useDemo();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);

  const items = scenario.items;
  const pos = useMemo(() => nodePositions(items.length), [items.length]);
  const running = run.itemIdx >= 0;
  const finished = run.phase === "complete" || run.phase === "compose_prompt";
  const live = run.phase === "running";
  const activeIdx = running && !finished ? run.itemIdx : -1;
  const activeItem = activeIdx >= 0 ? items[activeIdx] : null;
  const activeTurn = activeItem?.kind === "turn" && live ? turnFor(activeItem) : null;
  const currentLine =
    activeTurn && run.step > 0
      ? activeTurn.reasoning[Math.min(run.step, activeTurn.reasoning.length) - 1]
      : null;

  const selectedItem = items.find((i) => i.id === selected) ?? null;
  const selectedIdx = selectedItem ? items.indexOf(selectedItem) : -1;
  const selectedStarted = selectedIdx >= 0 && running && selectedIdx <= run.itemIdx;

  const ticker = (() => {
    if (!running) return "Idle. Start a run from the dock below.";
    if (activeTurn) return `${activeTurn.title}: ${currentLine ?? "reading One Brain"}`;
    if (run.phase === "awaiting_marketer") return "Waiting on the Marketer's approval.";
    if (run.phase === "in_compliance_queue") return "With Compliance for the second, independent review.";
    if (run.phase === "ready_to_launch") return "Both approvals in. Ready to launch.";
    if (run.phase === "compose_prompt") return "Run finished. Save it as a reusable dynamic agent?";
    return "Run complete. The outcome is written back to One Brain.";
  })();

  const dockAction = (() => {
    if (!running)
      return (
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => role === "marketer" && startRun(s.id)}
              disabled={role !== "marketer"}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            >
              Run: {s.label}
            </button>
          ))}
        </div>
      );
    if (run.phase === "awaiting_marketer")
      return role === "marketer" ? (
        <button type="button" onClick={approveMarketer} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Approve package
        </button>
      ) : (
        <button type="button" onClick={() => setRole("marketer")} className="rounded-xl border border-primary-foreground/25 px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-foreground/10">
          Switch to Marketer to approve
        </button>
      );
    if (run.phase === "in_compliance_queue")
      return role === "compliance" ? (
        <button type="button" onClick={approveCompliance} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Approve, unlock launch
        </button>
      ) : (
        <button type="button" onClick={() => setRole("compliance")} className="rounded-xl border border-primary-foreground/25 px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-foreground/10">
          Switch to Compliance to review
        </button>
      );
    if (run.phase === "ready_to_launch" && role !== "compliance")
      return (
        <button type="button" onClick={launchCampaign} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Rocket className="h-4 w-4" strokeWidth={2} /> Launch
        </button>
      );
    if (run.phase === "compose_prompt")
      return (
        <button type="button" onClick={confirmCompose} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Sparkles className="h-4 w-4" strokeWidth={2} /> Compose dynamic agent
        </button>
      );
    if (run.phase === "complete")
      return (
        <button type="button" onClick={resetRun} className="rounded-xl border border-primary-foreground/25 px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-foreground/10">
          Run another brief
        </button>
      );
    return null;
  })();

  return (
    <div className="sage-dark relative h-[calc(100vh-140px)] min-h-[520px] overflow-hidden rounded-2xl bg-background text-foreground">
      {/* edges */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {items.map((item, i) => (
          <line
            key={`spoke-${item.id}`}
            x1={50}
            y1={46}
            x2={pos[i].x}
            y2={pos[i].y}
            stroke="hsl(var(--foreground))"
            strokeOpacity={0.07}
            strokeWidth={0.15}
          />
        ))}
        {items.map((item, i) => {
          if (i === 0) return null;
          const done = running && i <= run.itemIdx;
          return (
            <line
              key={`chain-${item.id}`}
              x1={pos[i - 1].x}
              y1={pos[i - 1].y}
              x2={pos[i].x}
              y2={pos[i].y}
              stroke={done ? "hsl(var(--brand))" : "hsl(var(--foreground))"}
              strokeOpacity={done ? 0.4 : 0.12}
              strokeWidth={0.2}
            />
          );
        })}
      </svg>

      {/* brain hub */}
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex flex-col items-center">
          {!reduced && (
            <motion.span
              className="absolute h-28 w-28 rounded-full bg-brand/20 blur-xl"
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-brand/50 bg-card shadow-e-lg">
            <Brain className="h-7 w-7 text-brand-text" strokeWidth={1.5} />
          </span>
          <p className="relative mt-2 text-xs font-semibold text-foreground">One Brain</p>
          <p className="relative mt-0.5 max-w-[180px] text-center text-[9px] leading-[1.5] text-muted-foreground">
            {BRAIN_DOMAINS.join(" · ")}
          </p>
        </div>
      </div>

      {/* particles: brain to active node */}
      {activeIdx >= 0 && live && !reduced && (
        <>
          {[0, 1].map((k) => (
            <motion.span
              key={`${activeIdx}-${k}`}
              className="absolute z-10 h-1.5 w-1.5 rounded-full bg-brand"
              style={{ left: 0, top: 0 }}
              animate={{
                left: ["50%", `${pos[activeIdx].x}%`],
                top: ["46%", `${pos[activeIdx].y}%`],
                opacity: [0, 0.9, 0],
              }}
              transition={{ duration: 1.1, repeat: Infinity, delay: k * 0.55, ease: "easeInOut" }}
              aria-hidden="true"
            />
          ))}
        </>
      )}

      {/* nodes */}
      {items.map((item, i) => {
        const done = running && (i < run.itemIdx || finished);
        const active = i === activeIdx;
        const isGate = item.kind === "gate";
        const title = item.kind === "turn" ? turnFor(item).title : item.title;
        const label = shortLabel(item, item.kind === "turn" ? turnFor(item).title : "");
        return (
          <div
            key={item.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
          >
            <button
              type="button"
              onClick={() => setSelected(selected === item.id ? null : item.id)}
              aria-label={`Open output: ${title}`}
              className="group flex flex-col items-center"
            >
              <motion.span
                animate={active && !reduced ? { scale: [1, 1.12, 1] } : { scale: active ? 1.15 : 1 }}
                transition={active && !reduced ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 160, damping: 15 }}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                  active
                    ? "border-brand bg-brand-soft text-brand-text shadow-[0_0_24px_hsl(var(--brand)/0.35)]"
                    : done
                      ? "border-success/50 bg-success-soft text-success-text"
                      : "border-border bg-card text-muted-foreground/70"
                }`}
              >
                {isGate ? (
                  <UserCheck className="h-4 w-4" strokeWidth={2} />
                ) : done ? (
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  <IconFor icon={agentById((item as { agentId?: string }).agentId ?? "")?.icon ?? "workflow"} className="h-4 w-4" />
                )}
              </motion.span>
              <span className={`mt-1.5 text-[10px] font-semibold ${active ? "text-brand-text" : done ? "text-foreground/70" : "text-muted-foreground/60"}`}>
                {label}
              </span>
            </button>
            {/* live readout under the active node */}
            {active && activeTurn && currentLine && (
              <div className="absolute left-1/2 top-full z-20 mt-1 w-52 -translate-x-1/2 rounded-lg border border-border bg-card/95 p-2 text-[10px] leading-[1.5] text-muted-foreground shadow-e-md backdrop-blur">
                <TypeText text={currentLine} speed={40} />
              </div>
            )}
          </div>
        );
      })}

      {/* slide-over output panel (light surface) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.aside
            initial={reduced ? false : { x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduced ? undefined : { x: 400, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="sage-light thin-scroll absolute bottom-0 right-0 top-0 z-30 w-full max-w-[400px] overflow-y-auto border-l border-border bg-background p-5 text-foreground"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                {selectedItem.kind === "turn" ? turnFor(selectedItem).title : selectedItem.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close output panel"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            {selectedItem.kind === "gate" ? (
              <p className="mt-3 text-[13px] leading-[1.6] text-muted-foreground">
                {selectedItem.description} Use the dock below, or the Flow view, to act on this gate.
              </p>
            ) : selectedStarted ? (
              <>
                <ul className="mt-3 space-y-1.5 border-l-2 border-border pl-3">
                  {turnFor(selectedItem).reasoning.map((l, i) => (
                    <li key={i} className="text-xs leading-[1.55] text-muted-foreground">{l}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <OutputCard turn={turnFor(selectedItem)} scenario={scenario} />
                </div>
              </>
            ) : (
              <p className="mt-3 flex items-center gap-2 text-[13px] text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5" strokeWidth={2} /> This agent has not run yet. Its output appears here as soon as it does.
              </p>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* bottom dock */}
      <div className="absolute inset-x-4 bottom-4 z-20 rounded-2xl border border-border bg-card/70 px-4 py-3 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <PipelineStepper dark />
          </div>
          <div className="shrink-0">{dockAction}</div>
        </div>
        <p className="mt-2 truncate text-[11px] text-muted-foreground" aria-live="polite">
          {ticker}
        </p>
      </div>
    </div>
  );
}
