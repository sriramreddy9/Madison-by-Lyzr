import { PanelFrame, StatusTag } from "@/components/mocks/chrome";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { INBOX } from "@/content/retail-cross-sell";
import { cn } from "@/lib/utils";

/**
 * Hero mock — the banker's opportunity inbox: live signals arriving as
 * pre-researched briefs, the first one expanded. Copy verbatim from
 * content/retail-cross-sell.ts (INBOX).
 */
export function OpportunityInbox({ className }: { className?: string }) {
  return (
    <PanelFrame
      title={INBOX.chip}
      status={<StatusTag status="running">{INBOX.status}</StatusTag>}
      className={cn("shadow-lg", className)}
    >
      <Stagger>
        {INBOX.items.map((item, i) => (
          <StaggerItem
            key={item.signal}
            className={cn(
              "border-b border-border/70 px-4 py-3",
              i === 0 && "bg-muted/50",
            )}
          >
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-medium text-foreground">
              {item.signal}
            </span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-brand-text">
              {item.agent}
            </span>
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">{item.who}</div>
            {i === 0 ? (
              <p className="mt-2.5 text-[13px] leading-relaxed text-foreground">
                {INBOX.note}
              </p>
            ) : null}
          </StaggerItem>
        ))}
      </Stagger>
      <div className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {INBOX.footer}
      </div>
    </PanelFrame>
  );
}
