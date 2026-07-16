"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, ChevronDown, Mail, MessageSquare, PanelTop } from "lucide-react";
import type { Scenario, Turn } from "@/lib/scenario";
import { RATE_TABLE } from "@/lib/brain";
import { CountUp } from "@/components/landing/CountUp";

// One consistent output block, typed per agent, used in Flow and Canvas.

function Shell({
  headline,
  badge,
  children,
}: {
  headline: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-[15px] font-semibold leading-snug text-foreground">{headline}</p>
        {badge && (
          <span className="chip shrink-0 bg-success-soft font-semibold text-success-text">{badge}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function LabelledFields({ details }: { details: string[] }) {
  const fields = details.map((d) => {
    const i = d.indexOf(":");
    return i > 0 ? { label: d.slice(0, i).trim(), value: d.slice(i + 1).trim() } : { label: "", value: d };
  });
  return (
    <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {fields.map((f, i) => (
        <div key={i}>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {f.label || "Detail"}
          </dt>
          <dd className="mt-0.5 text-sm text-foreground">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SegmentOutput({ turn, scenario }: { turn: Turn; scenario: Scenario }) {
  const members = turn.output.headline.match(/([\d,]+)\s+members/)?.[1] ?? String(scenario.segmentSize);
  return (
    <Shell headline="Segment built and cleared" badge={turn.output.badge}>
      <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-3">
        <div>
          <p className="font-mono text-4xl font-semibold tracking-tight text-foreground">{members}</p>
          <p className="mt-1 text-xs text-muted-foreground">members match the criteria</p>
        </div>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-success-text">
          <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> Fair-lending check: cleared
        </p>
      </div>
      <p className="mt-4 rounded-lg bg-muted p-3 text-xs leading-[1.6] text-muted-foreground">
        {scenario.fairnessSummary}
      </p>
    </Shell>
  );
}

function IntelOutput({ turn, scenario }: { turn: Turn; scenario: Scenario }) {
  const hy = scenario.id === "hy-savings";
  return (
    <Shell headline={turn.output.headline} badge={turn.output.badge}>
      {hy ? (
        <table className="mt-4 w-full text-sm">
          <tbody>
            <tr className="rounded-lg bg-brand-soft font-semibold text-brand-text">
              <td className="rounded-l-lg px-3 py-2">Willamette Community CU</td>
              <td className="rounded-r-lg px-3 py-2 text-right font-mono">{RATE_TABLE.apy} APY · {RATE_TABLE.minimumToObtain} min</td>
            </tr>
            {RATE_TABLE.competitors.map((c) => (
              <tr key={c.name} className="text-muted-foreground">
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2 text-right font-mono">{c.apy} APY</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul className="mt-4 space-y-1.5">
          {turn.output.details.map((d, i) => (
            <li key={i} className="text-[13px] leading-[1.55] text-muted-foreground">· {d}</li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

function ContentOutput({ turn, scenario }: { turn: Turn; scenario: Scenario }) {
  const [showRunners, setShowRunners] = useState(false);
  const runners = turn.output.details.filter((d) => d.startsWith("Runner-up"));
  const a = scenario.draftAssets;
  return (
    <Shell headline={turn.output.headline}>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="chip bg-brand-soft font-semibold text-brand-text">
          scored via integrated copy optimization
        </span>
      </div>
      <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
        <p className="flex items-center gap-2 border-b border-border pb-2 text-[13px]">
          <Mail className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
          <span className="font-medium text-foreground">{a.emailSubject}</span>
        </p>
        <p className="mt-3 whitespace-pre-line text-[13px] leading-[1.6] text-foreground/80">{a.emailBody}</p>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <MessageSquare className="h-3 w-3" strokeWidth={1.75} /> SMS
          </p>
          <p className="mt-1.5 text-xs leading-[1.5] text-foreground/80">{a.sms}</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <PanelTop className="h-3 w-3" strokeWidth={1.75} /> Web banner
          </p>
          <p className="mt-1.5 text-xs font-medium leading-[1.5] text-foreground/80">{a.banner}</p>
        </div>
      </div>
      {runners.length > 0 && (
        <button
          type="button"
          onClick={() => setShowRunners((s) => !s)}
          aria-expanded={showRunners}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showRunners ? "rotate-180" : ""}`} strokeWidth={2} />
          {showRunners ? "Hide" : "Show"} runner-up variants ({runners.length})
        </button>
      )}
      {showRunners && (
        <ul className="mt-2 space-y-1.5">
          {runners.map((r, i) => (
            <li key={i} className="text-xs leading-[1.5] text-muted-foreground">· {r}</li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

function ComplianceOutput({ turn, scenario }: { turn: Turn; scenario: Scenario }) {
  const reduced = useReducedMotion();
  const [showBefore, setShowBefore] = useState(false);
  const body = showBefore ? scenario.draftAssets.emailBody : scenario.finalAssets.emailBody;
  return (
    <Shell headline={turn.output.headline} badge={turn.output.badge}>
      <div className="mt-3 flex rounded-lg border border-border text-xs font-semibold" role="group" aria-label="Before or after pre-check">
        <button
          type="button"
          onClick={() => setShowBefore(true)}
          aria-pressed={showBefore}
          className={`flex-1 rounded-l-lg px-3 py-1.5 ${showBefore ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
        >
          Before
        </button>
        <button
          type="button"
          onClick={() => setShowBefore(false)}
          aria-pressed={!showBefore}
          className={`flex-1 rounded-r-lg px-3 py-1.5 ${!showBefore ? "bg-success-soft text-success-text" : "text-muted-foreground"}`}
        >
          After pre-check
        </button>
      </div>
      <motion.div
        key={String(showBefore)}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-3 rounded-lg border border-border bg-muted/50 p-4"
      >
        <p className="whitespace-pre-line text-[13px] leading-[1.6] text-foreground/80">{body}</p>
        {!showBefore && scenario.finalAssets.disclosure && (
          <p className="mt-3 rounded-md border-l-2 border-success bg-success-soft/70 p-3 text-[11px] leading-[1.6] text-success-text">
            {scenario.finalAssets.disclosure}
          </p>
        )}
        {showBefore && (
          <p className="mt-3 text-[11px] font-medium text-danger-text">
            Missing: the required Reg DD disclosures. This is what the agent fixed.
          </p>
        )}
      </motion.div>
      <ul className="mt-3 space-y-1">
        {scenario.citations.slice(0, 2).map((c) => (
          <li key={c} className="text-[11px] leading-[1.55] text-muted-foreground">· {c}</li>
        ))}
      </ul>
    </Shell>
  );
}

function MeasurementOutput({ scenario }: { scenario: Scenario }) {
  return (
    <Shell headline="Outcomes attributed and written back to One Brain" badge="Memory updated">
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {scenario.measurementMetrics.map((m) => {
          const num = m.value.match(/^([$+]?)([\d,.]+)/);
          const suffix = m.value.replace(/^[$+]?[\d,.]+/, "");
          return (
            <div key={m.label} className="rounded-lg bg-muted/60 p-3">
              <p className="font-mono text-lg font-semibold tracking-tight text-foreground">
                {num ? (
                  <>
                    {num[1]}
                    <CountUp value={parseFloat(num[2].replace(/,/g, ""))} />
                    {suffix}
                  </>
                ) : (
                  m.value
                )}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {m.label}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        A new outcome node is now in One Brain. The next campaign starts smarter.
      </p>
    </Shell>
  );
}

export function OutputCard({ turn, scenario }: { turn: Turn; scenario: Scenario }) {
  switch (turn.title) {
    case "Brief Structurer":
      return (
        <Shell headline={turn.output.headline} badge={turn.output.badge}>
          <LabelledFields details={turn.output.details} />
        </Shell>
      );
    case "Fair-lending Segmentation":
      return <SegmentOutput turn={turn} scenario={scenario} />;
    case "Competitive and Rate Intel":
      return <IntelOutput turn={turn} scenario={scenario} />;
    case "Content and Language Optimization":
      return <ContentOutput turn={turn} scenario={scenario} />;
    case "Compliance Pre-check":
      return <ComplianceOutput turn={turn} scenario={scenario} />;
    case "Measurement and Attribution":
      return <MeasurementOutput scenario={scenario} />;
    default:
      return (
        <Shell headline={turn.output.headline} badge={turn.output.badge}>
          <ul className="mt-3 space-y-1.5">
            {turn.output.details.map((d, i) => (
              <li key={i} className="text-[13px] leading-[1.55] text-muted-foreground">· {d}</li>
            ))}
          </ul>
        </Shell>
      );
  }
}
