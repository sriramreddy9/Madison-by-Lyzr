import { PanelFrame, StatusTag } from "@/components/mocks/chrome";
import { CheckIcon } from "@/components/icons";
import { AT_WORK } from "@/content/hr";

/**
 * "See it at work" mock — a candidate-intake agent mid-run on REQ-2048, with a
 * decision gate and audit trail. Static; copy verbatim from content AT_WORK.
 */
export function AtWorkScreen({ className }: { className?: string }) {
  const { screen } = AT_WORK;
  return (
    <PanelFrame
      title={screen.title}
      status={<StatusTag status="running">Step 4 / 5</StatusTag>}
      className={className}
    >
      <div className="border-b px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        {screen.step}
      </div>

      <div className="grid gap-px border-b bg-border md:grid-cols-[1.5fr_1fr]">
        {/* Work log */}
        <div className="bg-card p-4">
          <ul className="flex flex-col gap-2.5">
            {screen.lines.map((l) => (
              <li
                key={l.text}
                className={
                  "flex items-start gap-2 text-[13px] leading-relaxed " +
                  (l.dim ? "text-muted-foreground" : "text-foreground")
                }
              >
                <CheckIcon
                  size={14}
                  className={
                    "mt-0.5 shrink-0 " +
                    (l.dim ? "text-warning-text" : "text-success-text")
                  }
                />
                {l.text}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-xs border border-transparent bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              {screen.gate.primary}
            </span>
            <span className="inline-flex items-center rounded-xs border border-input px-3 py-1.5 text-xs font-medium text-foreground">
              {screen.gate.secondary}
            </span>
          </div>
        </div>

        {/* Audit trail */}
        <div className="bg-background p-4">
          <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
            {screen.auditLabel}
          </div>
          <ol className="mt-3 flex flex-col gap-2">
            {screen.audit.map((a) => (
              <li
                key={a.text}
                className="flex items-baseline gap-2 font-mono text-[11px]"
              >
                <span
                  className={
                    "mt-1 size-1.5 shrink-0 rounded-full " +
                    (a.waiting ? "bg-brand" : "bg-success")
                  }
                />
                <span
                  className={
                    a.waiting ? "text-brand-text" : "text-muted-foreground"
                  }
                >
                  {a.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PanelFrame>
  );
}
