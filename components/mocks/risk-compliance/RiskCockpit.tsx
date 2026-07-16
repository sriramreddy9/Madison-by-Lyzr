import { PanelFrame, StatusTag } from "@/components/mocks/chrome";
import { Badge } from "@/components/ui/Badge";
import { COCKPIT } from "@/content/risk-compliance";

/**
 * Hero mock — the "Madison — Risk cockpit" panel: three governed controls
 * (third-party risk, vendor-AI kill-switch, exit test). Static; copy verbatim
 * from content COCKPIT. Titles are styled divs (one-h1 rule).
 */
export function RiskCockpit({ className }: { className?: string }) {
  return (
    <PanelFrame
      title={COCKPIT.title}
      status={<StatusTag status="running">{COCKPIT.live}</StatusTag>}
      className={className ? `shadow-lg ${className}` : "shadow-lg"}
    >
      <div className="flex flex-col gap-px bg-border">
        {COCKPIT.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 bg-card px-4 py-3.5"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {row.label}
              </div>
              <div className="mt-1 font-sans text-sm font-semibold text-foreground">
                {row.value}
              </div>
            </div>
            <Badge tone={row.tone}>{row.tag}</Badge>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border-t px-4 py-3">
        {COCKPIT.trust.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </PanelFrame>
  );
}
