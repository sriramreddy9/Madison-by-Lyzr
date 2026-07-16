import { PanelFrame, StatusTag } from "@/components/mocks/chrome";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RUN } from "@/content/retail-workflows";
import { cn } from "@/lib/utils";

/**
 * Hero mock — one Life-Event Cross-Sell run traced through the operating
 * loop, mid-flight at the banker step. Copy verbatim from
 * content/retail-workflows.ts (RUN).
 */
export function WorkflowRun({ className }: { className?: string }) {
  return (
    <PanelFrame
      title={RUN.chip}
      status={<StatusTag status="running">{RUN.status}</StatusTag>}
      className={cn("shadow-lg", className)}
    >
      <Stagger>
        {RUN.steps.map((step) => (
          <StaggerItem
            key={step.name}
            className={cn(
              "flex items-baseline gap-4 border-b border-border/70 px-4 py-2.5",
              step.state === "running" && "bg-muted/50",
            )}
          >
          <span
            className={cn(
              "w-16 shrink-0 font-mono text-[11px] uppercase tracking-wide",
              step.state === "done" && "text-success-text",
              step.state === "running" && "text-brand-text",
              step.state === "queued" && "text-muted-foreground",
            )}
          >
            {step.name}
          </span>
          <span
            className={cn(
              "text-[13px] leading-relaxed",
              step.state === "queued"
                ? "text-muted-foreground"
                : "text-foreground",
            )}
          >
            {step.detail}
          </span>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {RUN.footer}
      </div>
    </PanelFrame>
  );
}
