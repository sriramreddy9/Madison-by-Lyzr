import { PanelFrame, KVRow, StatusTag } from "@/components/mocks/chrome";
import { LIVE_BRIEF } from "@/content/commercial-banking-rm";
import { cn } from "@/lib/utils";

/**
 * Hero mock — the floating "Live client brief · 08:42" Ashfield Logistics
 * prep-brief card from the source hero, rebuilt on PanelFrame/KVRow.
 * Copy verbatim from content/commercial-banking-rm.ts (LIVE_BRIEF).
 */
export function LiveBriefCard({ className }: { className?: string }) {
  return (
    <PanelFrame
      title={LIVE_BRIEF.chip}
      status={<StatusTag status="running">{LIVE_BRIEF.signals}</StatusTag>}
      className={cn("shadow-lg", className)}
    >
      <div className="border-b px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-foreground">
        {LIVE_BRIEF.title}
      </div>
      {LIVE_BRIEF.rows.map((row) => (
        <KVRow
          key={row.label}
          label={
            <span className="text-sm text-muted-foreground">{row.label}</span>
          }
          value={
            <>
              <span className="text-foreground">{row.value}</span>
              {row.delta ? (
                <span className="ml-1 text-danger-text">{row.delta}</span>
              ) : null}
            </>
          }
        />
      ))}
      <p className="px-4 py-3.5 text-[13px] leading-relaxed text-foreground">
        {LIVE_BRIEF.note}
      </p>
    </PanelFrame>
  );
}
