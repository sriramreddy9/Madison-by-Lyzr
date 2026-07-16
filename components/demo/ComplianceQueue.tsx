"use client";

import { useState } from "react";
import { CheckCircle2, CornerUpLeft, ScrollText, ShieldCheck } from "lucide-react";
import { useDemo } from "./DemoContext";
import type { Turn } from "@/lib/scenario";

export function ComplianceQueue() {
  const {
    role,
    scenario,
    queue,
    run,
    auditLog,
    approveCompliance,
    returnWithNote,
    setRole,
    turnFor,
  } = useDemo();
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");

  const turns = scenario.items.filter((i): i is Turn => i.kind === "turn");
  const completedTurns = turns.filter(
    (t) => scenario.items.findIndex((i) => i.id === t.id) < run.itemIdx
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-5">
        <div className="card p-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">Compliance Queue</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Second, independent human approval. Everything here is logged for exam readiness.
          </p>
        </div>

        {queue.length === 0 && (
          <div className="card p-6 text-sm text-muted-foreground/90">
            Nothing waiting. When a Marketer approves a campaign package, it lands here for the second human review before launch unlocks.
          </div>
        )}

        {queue.map((item) => (
          <div key={item.id} className="card border border-border p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-base font-semibold text-foreground">{item.campaignName}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground/90">Submitted by {item.submittedBy}</p>
              </div>
              <span
                className={`chip font-semibold ${
                  item.status === "approved"
                    ? "bg-success-soft text-success-text"
                    : item.status === "returned"
                      ? "bg-danger-soft text-danger-text"
                      : "bg-warning-soft text-warning-text"
                }`}
              >
                {item.status === "approved" ? "Approved" : item.status === "returned" ? "Returned" : "Awaiting review"}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-muted p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                <ScrollText className="h-3.5 w-3.5" strokeWidth={1.75} /> Rule citations
              </p>
              <ul className="mt-2 space-y-1.5">
                {scenario.citations.map((c) => (
                  <li key={c} className="text-xs leading-[1.55] text-muted-foreground">
                    · {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 rounded-xl bg-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">Inserted disclosure</p>
              <p className="mt-2 rounded border-l-2 border-success bg-success-soft/60 p-2.5 text-[11px] leading-[1.6] text-muted-foreground">
                {scenario.finalAssets.disclosure}
              </p>
            </div>

            <div className="mt-3 rounded-xl bg-muted p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} /> Fair-lending check
              </p>
              <p className="mt-2 text-xs leading-[1.55] text-muted-foreground">{scenario.fairnessSummary}</p>
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-semibold text-brand-text">
                Full reasoning trail ({completedTurns.length} agent turns)
              </summary>
              <div className="mt-3 space-y-3">
                {completedTurns.map((t) => (
                  <div key={t.id}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text">
                      {turnFor(t).title}
                    </p>
                    <ul className="mt-1 space-y-1 border-l border-border pl-3">
                      {turnFor(t).reasoning.map((l, i) => (
                        <li key={i} className="text-xs leading-[1.5] text-muted-foreground">
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>

            {item.status === "pending" && run.phase === "in_compliance_queue" && (
              <div className="mt-5 border-t border-border pt-4">
                {role === "compliance" ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={approveCompliance} className="btn-primary !px-5 !py-2.5">
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> Approve, unlock launch
                      </button>
                      <button type="button" onClick={() => setNoteOpen((o) => !o)} className="btn-secondary !px-5 !py-2.5">
                        <CornerUpLeft className="h-4 w-4" strokeWidth={2} /> Return with note
                      </button>
                    </div>
                    {noteOpen && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          returnWithNote(note || "Move the fee disclosure above the fold.", "compliance");
                          setNoteOpen(false);
                          setNote("");
                        }}
                        className="flex gap-2"
                      >
                        <input
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Note back to the Marketer"
                          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm"
                        />
                        <button type="submit" className="btn-secondary !px-4 !py-2 text-xs">
                          Send back
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Only the Compliance Officer can act here.{" "}
                    <button type="button" onClick={() => setRole("compliance")} className="font-semibold text-brand-text underline">
                      Switch role
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card h-fit p-5">
        <h3 className="font-serif text-base font-semibold text-foreground">Audit log</h3>
        <p className="mt-1 text-xs text-muted-foreground/90">Every action, logged for exam readiness.</p>
        <ul className="mt-4 space-y-2.5">
          {auditLog.length === 0 && <li className="text-xs text-muted-foreground/70">No activity yet this session.</li>}
          {[...auditLog].reverse().map((e, i) => (
            <li key={i} className="text-xs leading-[1.5]">
              <span className="font-mono text-muted-foreground/70">{e.time}</span>{" "}
              <span className="font-semibold text-foreground/80">{e.actor}</span>{" "}
              <span className="text-muted-foreground">{e.action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
