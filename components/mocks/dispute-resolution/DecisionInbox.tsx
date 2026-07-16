import { PanelFrame, StatusTag } from "@/components/mocks/chrome";
import { Badge } from "@/components/ui/Badge";
import { DECISION_INBOX } from "@/content/dispute-resolution";

/**
 * Hero mock — the "Decision Inbox · one verdict, awaiting you" card from the
 * source hero. Static; copy verbatim from content DECISION_INBOX. Titles are
 * styled divs (one-h1 rule).
 */
export function DecisionInbox({ className }: { className?: string }) {
  return (
    <PanelFrame
      title={DECISION_INBOX.panelTitle}
      status={<StatusTag status="waiting">day 3 / 30</StatusTag>}
      className={className ? `shadow-lg ${className}` : "shadow-lg"}
    >
      <div className="border-b px-4 py-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-serif text-h3 text-foreground">
            {DECISION_INBOX.case.title}
          </span>
          <Badge tone="warning">{DECISION_INBOX.case.severity}</Badge>
        </div>
        <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          {DECISION_INBOX.case.meta}
        </div>
      </div>

      <div className="border-b bg-muted px-4 py-3.5">
        <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
          {DECISION_INBOX.outcomeLabel}
        </div>
        <div className="mt-1.5 font-sans text-base font-semibold text-foreground">
          {DECISION_INBOX.outcome}
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          {DECISION_INBOX.body}
        </p>
        <div className="mt-3 font-mono text-[11px] text-muted-foreground">
          {DECISION_INBOX.recompute}
        </div>
      </div>

      <div className="px-4 py-3.5">
        <div className="font-sans text-sm font-semibold text-foreground">
          {DECISION_INBOX.awaiting.title}
        </div>
        <div className="mt-1 text-[13px] text-muted-foreground">
          {DECISION_INBOX.awaiting.sub}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {DECISION_INBOX.gates.map((gate, i) => (
            <span
              key={gate}
              className={
                i === 0
                  ? "inline-flex items-center rounded-xs border border-transparent bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                  : "inline-flex items-center rounded-xs border border-input px-3 py-1.5 text-xs font-medium text-foreground"
              }
            >
              {gate}
            </span>
          ))}
        </div>
      </div>
    </PanelFrame>
  );
}
