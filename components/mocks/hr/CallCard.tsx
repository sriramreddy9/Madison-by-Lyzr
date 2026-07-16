import { PanelFrame, StatusTag } from "@/components/mocks/chrome";
import { CheckIcon } from "@/components/icons";
import { CALL_CARD } from "@/content/hr";

/**
 * Signature hero mock — the early phone-screen agent on a live call. The
 * source animated a waveform; per the motion law it renders static, with the
 * single allowed pulse dot on the "On call" status. Copy verbatim from
 * content CALL_CARD. All headings are styled divs (one-h1 rule).
 */
export function CallCard({ className }: { className?: string }) {
  return (
    <PanelFrame
      title={CALL_CARD.agent}
      status={
        <StatusTag status="running">
          {CALL_CARD.status} · {CALL_CARD.time}
        </StatusTag>
      }
      className={className ? `shadow-lg ${className}` : "shadow-lg"}
    >
      <div
        className="p-4"
        aria-label={CALL_CARD.ariaLabel}
      >
        {/* Candidate */}
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm text-foreground">
            {CALL_CARD.candidate.initials}
          </span>
          <div>
            <div className="font-sans text-sm font-semibold text-foreground">
              {CALL_CARD.candidate.name}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {CALL_CARD.candidate.role}
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="mt-4 flex flex-col gap-2">
          {CALL_CARD.transcript.map((t) => (
            <div
              key={t.line}
              className={
                t.candidate
                  ? "self-end rounded-md rounded-br-none border bg-muted px-3 py-2 text-[13px] leading-relaxed text-foreground"
                  : "self-start rounded-md rounded-bl-none border bg-card px-3 py-2 text-[13px] leading-relaxed text-foreground"
              }
            >
              <span className="mr-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                {t.speaker}
              </span>
              {t.line}
            </div>
          ))}
        </div>

        {/* Live check block */}
        <div className="mt-4 rounded-md border bg-muted/60 px-3 py-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-overline uppercase tracking-overline text-brand-text">
              {CALL_CARD.blockLabel}
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              {CALL_CARD.toneTag}
            </span>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {CALL_CARD.claims.map((c) => (
              <li
                key={c.claim}
                className="flex items-center justify-between gap-3 text-[13px]"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <CheckIcon
                    size={13}
                    className={c.ok ? "text-success-text" : "text-warning-text"}
                  />
                  {c.claim}
                </span>
                <span
                  className={
                    c.ok
                      ? "shrink-0 font-mono text-[11px] uppercase tracking-wide text-success-text"
                      : "shrink-0 font-mono text-[11px] uppercase tracking-wide text-warning-text"
                  }
                >
                  {c.verdict}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t px-4 py-2.5 text-[11px] text-muted-foreground">
        <span>{CALL_CARD.foot.left}</span>
        <span className="font-mono text-brand-text">{CALL_CARD.foot.right}</span>
      </div>
    </PanelFrame>
  );
}
