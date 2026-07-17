import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { CALL_CARD } from "@/content/hr";

/**
 * Signature hero mock — the early phone-screen agent on a live call, rebuilt to
 * match the source HR page's call-card layout (serif agent header with a square
 * glyph, a sunken candidate row with a waveform, a speaker-labelled transcript,
 * and live resume-verification rows) in the Madison theme. The source animated
 * the waveform; per the motion law it renders static, with the single allowed
 * pulse dot on the "On call" status. Copy verbatim from content CALL_CARD.
 */

// Static waveform bar heights (source animated these; kept static per motion law).
const WAVE = [
  "h-2",
  "h-3.5",
  "h-[18px]",
  "h-2.5",
  "h-4",
  "h-1.5",
  "h-5",
  "h-3",
  "h-2",
  "h-[17px]",
  "h-3",
  "h-1.5",
];

export function CallCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "ml-auto w-full max-w-[420px] overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg",
        className,
      )}
      aria-label={CALL_CARD.ariaLabel}
    >
      {/* Header: agent + on-call status */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="inline-flex items-center gap-2">
          <span className="relative size-5 shrink-0 rounded-sm bg-foreground">
            <span className="absolute inset-[5px] rounded-[1px] border border-background" />
          </span>
          <span className="font-serif text-sm font-semibold text-foreground">
            {CALL_CARD.agent}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-brand-text">
          <span className="size-1.5 rounded-full bg-brand motion-safe:animate-pulse" />
          {CALL_CARD.status}
          <span className="ml-0.5 text-muted-foreground">{CALL_CARD.time}</span>
        </span>
      </div>

      {/* Candidate row (sunken) with waveform */}
      <div className="mx-3 flex items-center gap-3 rounded-md bg-muted px-3 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-foreground font-serif text-[13px] font-semibold text-background">
          {CALL_CARD.candidate.initials}
        </span>
        <span>
          <span className="block font-serif text-[15px] font-semibold text-foreground">
            {CALL_CARD.candidate.name}
          </span>
          <span className="block text-xs text-muted-foreground">
            {CALL_CARD.candidate.role}
          </span>
        </span>
        <span className="ml-auto flex h-6 items-center gap-[2.5px]" aria-hidden>
          {WAVE.map((h, i) => (
            <span
              key={i}
              className={cn(
                "w-[3px] rounded-full",
                h,
                (i + 1) % 3 === 0 ? "bg-muted-foreground/50" : "bg-brand",
              )}
            />
          ))}
        </span>
      </div>

      {/* Transcript */}
      <div className="flex flex-col gap-1 px-4 pb-1 pt-3">
        {CALL_CARD.transcript.map((t) => (
          <div key={t.line} className="flex items-baseline gap-2.5">
            <span className="w-11 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              {t.speaker}
            </span>
            <p
              className={cn(
                "text-[13px] leading-relaxed",
                t.candidate ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {t.line}
            </p>
          </div>
        ))}
      </div>

      {/* Live resume check */}
      <div className="mx-4 mt-2 border-t pt-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            {CALL_CARD.blockLabel}
          </span>
          <span className="rounded-full bg-brand-soft px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wide text-brand-text">
            {CALL_CARD.toneTag}
          </span>
        </div>
        <ul>
          {CALL_CARD.claims.map((c) => (
            <li
              key={c.claim}
              className="flex items-center gap-3 border-t border-border/70 py-1.5 text-[12.5px] first:border-t-0"
            >
              {c.ok ? (
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand text-background">
                  <CheckIcon size={11} strokeWidth={2.4} />
                </span>
              ) : (
                <span className="size-[18px] shrink-0 rounded-full border border-muted-foreground/60" />
              )}
              <span className="flex-1 text-foreground">{c.claim}</span>
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wide",
                  c.ok ? "text-brand-text" : "text-muted-foreground",
                )}
              >
                {c.verdict}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Foot */}
      <div className="mx-4 mt-2 flex items-center justify-between gap-3 border-t py-3 text-xs text-muted-foreground">
        <span>{CALL_CARD.foot.left}</span>
        <span className="font-serif font-semibold text-foreground">
          {CALL_CARD.foot.right}
        </span>
      </div>
    </div>
  );
}
