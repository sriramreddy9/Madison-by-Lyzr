"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CornerUpLeft,
  Loader2,
  Rocket,
  Sparkles,
  Timer,
  UserCheck,
} from "lucide-react";
import { useDemo } from "./DemoContext";
import { OutputCard } from "./OutputCard";
import { PipelineStepper } from "./PipelineStepper";
import { AgentOrbs } from "./AgentOrbs";
import { AgentCanvas } from "./AgentCanvas";
import { TypeText } from "@/components/brand/TypeText";
import { IconFor } from "@/components/brand/IconFor";
import { agentById } from "@/lib/agents";
import { SCENARIOS, type Gate, type Scenario, type Turn } from "@/lib/scenario";
import { totalSteps } from "@/lib/orchestrator";
import { currentStage, orientationCaption } from "./studioHelpers";

/* ----------------------------- gates ----------------------------- */

export function GateCard({ gate, index }: { gate: Gate; index: number }) {
  const { role, run, approveMarketer, approveCompliance, returnWithNote, launchCampaign, setRole } = useDemo();
  const reduced = useReducedMotion();
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const isCurrent = run.itemIdx === index;
  const passed = run.itemIdx > index;

  if (passed) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success-soft/50 px-4 py-2.5">
        <UserCheck className="h-4 w-4 text-success-text" strokeWidth={2} />
        <p className="text-[13px] font-medium text-success-text">{gate.title}: cleared</p>
      </div>
    );
  }
  if (!isCurrent) return null;

  const noteForm = noteOpen && (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        returnWithNote(
          note || "Please tighten the disclosure placement.",
          gate.gate === "compliance" ? "compliance" : "marketer"
        );
        setNoteOpen(false);
        setNote("");
      }}
      className="mt-3 flex gap-2"
    >
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What should the agents revise?"
        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm"
      />
      <button type="submit" className="btn-secondary shrink-0 !px-4 !py-2 text-xs">
        Send back
      </button>
    </form>
  );

  const body = (() => {
    if (gate.gate === "marketer" && run.phase === "awaiting_marketer") {
      if (role !== "marketer")
        return (
          <p className="text-sm text-muted-foreground">
            Waiting on the Marketer.{" "}
            <button type="button" onClick={() => setRole("marketer")} className="font-semibold text-brand-text underline">
              Switch to the Marketer role
            </button>{" "}
            to act.
          </p>
        );
      return (
        <>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={approveMarketer} className="btn-primary !px-6 !py-2.5">
              Approve <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
            <button type="button" onClick={() => setNoteOpen((o) => !o)} className="btn-secondary !border-transparent !px-4 !py-2.5">
              <CornerUpLeft className="h-4 w-4" strokeWidth={2} /> Return with note
            </button>
          </div>
          {noteForm}
        </>
      );
    }
    if (gate.gate === "compliance" && run.phase === "in_compliance_queue") {
      if (role !== "compliance")
        return (
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" strokeWidth={2} />
            <p className="text-sm text-muted-foreground">
              Sent to Compliance for a second, independent review.{" "}
              <button type="button" onClick={() => setRole("compliance")} className="font-semibold text-brand-text underline">
                Review as the Compliance Officer
              </button>
            </p>
          </div>
        );
      return (
        <>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={approveCompliance} className="btn-primary !px-6 !py-2.5">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> Approve, unlock launch
            </button>
            <button type="button" onClick={() => setNoteOpen((o) => !o)} className="btn-secondary !border-transparent !px-4 !py-2.5">
              <CornerUpLeft className="h-4 w-4" strokeWidth={2} /> Return with note
            </button>
          </div>
          {noteForm}
        </>
      );
    }
    if (gate.gate === "launch" && run.phase === "ready_to_launch") {
      if (role === "compliance")
        return (
          <p className="text-sm text-muted-foreground">
            Approved. The Marketer or CMO launches.{" "}
            <button type="button" onClick={() => setRole("marketer")} className="font-semibold text-brand-text underline">
              Switch role
            </button>
          </p>
        );
      return (
        <button type="button" onClick={launchCampaign} className="btn-primary !px-7 !py-3">
          <Rocket className="h-4 w-4" strokeWidth={2} /> Launch campaign
        </button>
      );
    }
    return null;
  })();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="rounded-2xl border-2 border-warning/50 bg-card p-6 shadow-e-md"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-warning-soft p-2.5 text-warning-text">
          <UserCheck className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-foreground">Your approval is needed</h3>
          <p className="text-xs text-muted-foreground">{gate.title} · human-in-the-loop gate</p>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-[1.6] text-muted-foreground">{gate.description}</p>
      <div className="mt-4">{body}</div>
    </motion.div>
  );
}

/* --------------------------- step cards --------------------------- */

function ActiveStepCard({
  turn,
  revealed,
  showOutput,
  thinking,
  scenario,
}: {
  turn: Turn;
  revealed: number;
  showOutput: boolean;
  thinking: boolean;
  scenario: Scenario;
}) {
  const reduced = useReducedMotion();
  const agent = agentById(turn.agentId);
  const lines = turn.reasoning.slice(0, revealed);
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
      className="rounded-2xl border border-brand/30 bg-card p-6 shadow-e-md"
      aria-live="polite"
    >
      <header className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand bg-brand-soft text-brand-text">
          <IconFor icon={agent?.icon ?? "workflow"} className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">{turn.title}</h3>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" strokeWidth={2.5} />
            {thinking ? "reading One Brain and thinking" : "working"}
          </p>
        </div>
      </header>
      {lines.length > 0 && (
        <ul className="mt-4 space-y-2 border-l-2 border-brand/25 pl-4">
          {lines.map((l, i) => (
            <motion.li
              key={i}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[13px] leading-[1.6] text-muted-foreground"
            >
              {!showOutput && i === lines.length - 1 ? <TypeText text={l} speed={32} /> : l}
            </motion.li>
          ))}
        </ul>
      )}
      {showOutput && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
          className="mt-4"
        >
          <OutputCard turn={turn} scenario={scenario} />
        </motion.div>
      )}
    </motion.article>
  );
}

function DoneStepRow({ turn, scenario }: { turn: Turn; scenario: Scenario }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const agent = agentById(turn.agentId);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-text">
          <IconFor icon={agent?.icon ?? "workflow"} className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px]">
            <span className="font-semibold text-foreground">{turn.title}</span>{" "}
            <span className="text-muted-foreground">· {turn.output.headline}</span>
          </span>
        </span>
        <CheckCircle2 className="h-4 w-4 shrink-0 text-success-text" strokeWidth={2} />
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-4">
              <ul className="mb-3 space-y-1.5 border-l-2 border-border pl-3">
                {turn.reasoning.map((l, i) => (
                  <li key={i} className="text-xs leading-[1.55] text-muted-foreground">
                    {l}
                  </li>
                ))}
              </ul>
              <OutputCard turn={turn} scenario={scenario} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------- impact + compose ------------------------- */

export function RunEnding() {
  const { scenario, run, confirmCompose, declineCompose, resetRun } = useDemo();
  const reduced = useReducedMotion();
  if (run.phase !== "compose_prompt" && run.phase !== "complete") return null;
  return (
    <>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-e-md"
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/60">
          <Timer className="h-3.5 w-3.5" strokeWidth={2} /> Impact
        </p>
        <p className="mt-3 text-lg font-semibold leading-[1.45]">
          Built and cleared in about 3 minutes of your time, versus a typical four to five week cycle [Primary].
        </p>
        <p className="mt-2 text-sm leading-[1.6] text-primary-foreground/70">
          Six tools replaced by one. Every regulated step approved by a human. Every decision logged for the exam.
        </p>
      </motion.div>

      {run.phase === "compose_prompt" && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-brand/40 bg-brand-soft/50 p-6"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-brand-text" strokeWidth={1.75} />
            <h3 className="text-base font-semibold text-foreground">
              Save this as a reusable agent for Willamette CU?
            </h3>
          </div>
          <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
            &quot;{scenario.composedAgent.name}&quot; would keep this segment logic, these disclosures, this voice, and this
            sign-off chain. It compounds: every run teaches it this credit union&apos;s patterns, and no competitor can copy
            that history.
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={confirmCompose} className="btn-primary !px-5 !py-2.5">
              <Sparkles className="h-4 w-4" strokeWidth={2} /> Compose dynamic agent
            </button>
            <button type="button" onClick={declineCompose} className="btn-secondary !border-transparent !px-4 !py-2.5">
              Not now
            </button>
          </div>
        </motion.div>
      )}

      {run.phase === "complete" && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground">Run complete. The outcome is in One Brain.</p>
          <button type="button" onClick={resetRun} className="btn-secondary !px-4 !py-2 text-xs">
            Run another brief
          </button>
        </div>
      )}
    </>
  );
}

/* ----------------------------- flow ----------------------------- */

function FlowStudio() {
  const { role, scenario, run, turnFor, liveTurnPending, startRun } = useDemo();
  const reduced = useReducedMotion();
  const [brief, setBrief] = useState("");
  const [typing, setTyping] = useState(false);
  const running = run.itemIdx >= 0;

  const submitBrief = (text: string) => {
    const match =
      SCENARIOS.find((s) => s.brief === text) ??
      (text.toLowerCase().includes("auto") ? SCENARIOS[1] : SCENARIOS[0]);
    setBrief(text || match.brief);
    startRun(match.id);
  };

  const typeAndRun = (s: Scenario) => {
    if (reduced) {
      setBrief(s.brief);
      startRun(s.id);
      return;
    }
    setTyping(true);
    let i = 0;
    const t = setInterval(() => {
      i += 3;
      setBrief(s.brief.slice(0, i));
      if (i >= s.brief.length) {
        clearInterval(t);
        setBrief(s.brief);
        setTyping(false);
        startRun(s.id);
      }
    }, 16);
  };

  const visible = running ? scenario.items.slice(0, run.itemIdx + 1) : [];
  const caption = orientationCaption(run.phase, currentStage(scenario, run));

  return (
    <div className="mx-auto w-full max-w-[760px]">
      <div className="overflow-x-auto pb-1">
        <PipelineStepper />
      </div>
      <p className="mt-2 text-xs leading-[1.5] text-muted-foreground">{caption}</p>

      <div className="mt-4">
        <AgentOrbs />
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-e-sm">
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (role === "marketer" && !typing && brief.trim()) submitBrief(brief.trim());
          }}
        >
          <label htmlFor="brief" className="sr-only">
            Campaign brief
          </label>
          <input
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="One line, for example: launch our new 4.25% APY savings to members with idle balances..."
            className="w-full rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm placeholder:text-muted-foreground/60"
            disabled={role !== "marketer" || typing}
          />
          <button type="submit" className="btn-primary shrink-0 justify-center" disabled={role !== "marketer" || typing}>
            Run <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => role === "marketer" && !typing && typeAndRun(s)}
              disabled={role !== "marketer" || typing}
              className="chip border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-50"
            >
              {s.label}
            </button>
          ))}
        </div>
        {role !== "marketer" && (
          <p className="mt-3 text-xs text-warning-text">
            Briefs are submitted in the Marketer role. Use the role switcher above.
          </p>
        )}
      </div>

      <div className="mt-5 space-y-3 pb-10">
        {visible.map((item, i) => {
          if (item.kind === "gate") return <GateCard key={item.id} gate={item} index={i} />;
          const turn = turnFor(item);
          const isActive = i === run.itemIdx && run.phase === "running";
          if (isActive) {
            const total = totalSteps(turn);
            return (
              <ActiveStepCard
                key={item.id}
                turn={turn}
                revealed={Math.min(run.step, turn.reasoning.length)}
                showOutput={run.step >= total - 1}
                thinking={run.step === 0 || liveTurnPending}
                scenario={scenario}
              />
            );
          }
          return <DoneStepRow key={item.id} turn={turn} scenario={scenario} />;
        })}
        <RunEnding />
      </div>
    </div>
  );
}

/* --------------------------- mode switch --------------------------- */

export function CampaignStudio() {
  const { mode } = useDemo();
  return mode === "canvas" ? <AgentCanvas /> : <FlowStudio />;
}
