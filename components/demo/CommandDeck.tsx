"use client";

import { motion, useReducedMotion } from "motion/react";
import { FileDown, Radar } from "lucide-react";
import { useDemo } from "./DemoContext";
import { CountUp } from "@/components/landing/CountUp";
import { BRAIN_NODES } from "@/lib/brain";

// Cycle time per campaign, in days, since the OS went in. 25 days down to 3.
const CYCLE_TREND = [25, 24, 19, 14, 9, 5, 3];

function TrendLine() {
  const reduced = useReducedMotion();
  const W = 220;
  const H = 48;
  const max = Math.max(...CYCLE_TREND);
  const pts = CYCLE_TREND.map((v, i) => ({
    x: 4 + (i * (W - 8)) / (CYCLE_TREND.length - 1),
    y: 6 + (1 - v / max) * (H - 12),
  }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label="Campaign cycle time trending down from 25 days to 3">
      <motion.path
        d={d}
        fill="none"
        stroke="hsl(var(--success))"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill="hsl(var(--success))" className="animate-pulse-soft" />
    </svg>
  );
}

const PIPELINE: Record<string, string[]> = {
  Drafting: ["Q3 CD ladder refresh", "New-member onboarding series"],
  "In review": ["Debit card activation push"],
  Approved: ["Branch anniversary event"],
  Launched: ["Spring HELOC push"],
  Measuring: ["2025 dormant-checking win-back"],
};

export function CommandDeck() {
  const { run, scenario, queue, setView, setRole } = useDemo();
  const running = run.itemIdx >= 0;

  const liveCard = running ? scenario.campaignName : null;
  const liveColumn =
    run.phase === "complete" || run.phase === "compose_prompt"
      ? "Measuring"
      : run.phase === "ready_to_launch"
        ? "Approved"
        : run.phase === "in_compliance_queue" || run.phase === "awaiting_marketer"
          ? "In review"
          : "Drafting";

  const competitors = BRAIN_NODES.find((n) => n.id === "competitor-signals");

  return (
    <div className="space-y-6">
      {!running && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-e-sm">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.005em] text-foreground">Good morning. The agents are ready.</h2>
            <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">
              No live run right now. Start a campaign and watch it move from brief to compliant launch.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRole("marketer");
              setView("studio");
            }}
            className="btn-primary !px-5 !py-2.5"
          >
            Start your first campaign
          </button>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Campaigns in flight</p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-foreground">
            <CountUp value={running ? 7 : 6} />
          </p>
        </div>
        <div className="card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Average cycle time</p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-foreground">
            5 wks <span className="text-lg text-muted-foreground/70">to</span> 3 days
          </p>
          <TrendLine />
        </div>
        <div className="card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Compliance items cleared, QTD</p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-foreground">
            <CountUp value={23 + queue.filter((q) => q.status === "approved").length} />
          </p>
        </div>
        <div className="card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Estimated lift, QTD</p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-foreground">
            +<CountUp value={12} />% <span className="tag-confidence text-foreground">[Modeled]</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="card p-5">
          <h3 className="font-serif text-base font-semibold text-foreground">Campaign pipeline</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
            {Object.entries(PIPELINE).map(([col, cards]) => (
              <div key={col} className="rounded-xl bg-muted p-2.5">
                <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{col}</p>
                <div className="mt-2 space-y-2">
                  {cards.map((c) => (
                    <div key={c} className="rounded-lg border border-border bg-card p-2 text-[11px] leading-[1.4] text-foreground/80">
                      {c}
                    </div>
                  ))}
                  {liveCard && liveColumn === col && (
                    <div className="rounded-lg border-2 border-warning/60 bg-warning-soft/60 p-2 text-[11px] font-semibold leading-[1.4] text-foreground">
                      {liveCard}
                      <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wider text-warning-text">live run</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 text-foreground/70" strokeWidth={1.75} />
                <h3 className="font-serif text-base font-semibold text-foreground">Rate intel, today</h3>
              </div>
              <span className="chip bg-success-soft font-semibold text-success-text">No integration required</span>
            </div>
            <ul className="mt-3 space-y-2">
              {competitors?.contents.map((c) => (
                <li key={c} className="text-xs leading-[1.5] text-muted-foreground">
                  · {c}
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-xl bg-brand-soft p-2.5 text-xs font-semibold text-brand-text">
              Our 4.25% APY leads the market at a $1,000 minimum.
            </p>
          </div>

          <div className="card p-5">
            <h3 className="font-serif text-base font-semibold text-foreground">Board reporting</h3>
            <p className="mt-2 text-xs leading-[1.5] text-muted-foreground">
              Every campaign, approval, and compliance decision this quarter, assembled with its full trail.
            </p>
            <button type="button" className="btn-secondary mt-3 !px-4 !py-2 text-xs">
              <FileDown className="h-3.5 w-3.5" strokeWidth={1.75} /> Export exam-ready report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
