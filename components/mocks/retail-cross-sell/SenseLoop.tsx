import { PanelFrame } from "@/components/mocks/chrome";
import { Badge } from "@/components/ui/Badge";
import { HOW } from "@/content/retail-cross-sell";
import { cn } from "@/lib/utils";

/**
 * Static rendering of the continuous Sense → Judge → Engage → Execute → Learn
 * loop over the institution's existing systems (motion law: no looping
 * animation). Copy verbatim from HOW.loop.
 */
export function SenseLoop({ className }: { className?: string }) {
  const { loop } = HOW;
  return (
    <PanelFrame title={loop.label} className={cn("bg-background", className)}>
      <div
        className="p-4"
        aria-label="A continuous loop — Sense, Judge, Engage, Execute, Learn — running over the institution's core, digital banking, and interaction systems"
      >
        <div className="rounded-sm border bg-muted px-3 py-3 text-center" aria-hidden>
          <div className="font-mono text-[10px] uppercase tracking-wider text-brand-text">
            {loop.baseTitle}
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {loop.baseBody}
          </p>
        </div>
        <div className="mx-auto h-3 w-px bg-border" aria-hidden />
        <div className="flex flex-col gap-1" aria-hidden>
          {loop.nodes.map((node, i) => (
            <div
              key={node.name}
              className="flex items-baseline gap-3 rounded-sm border bg-card px-3 py-2"
            >
              <span className="font-mono text-[10px] text-muted-foreground">{`0${i + 1}`}</span>
              <span className="text-[11px] font-medium text-foreground">
                {node.name}
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground">
                {node.hint}
              </span>
            </div>
          ))}
        </div>
        <div className="mx-auto h-3 w-px bg-border" aria-hidden />
        <div className="rounded-sm border bg-muted px-3 py-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {loop.cycle}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {loop.chips.map((chip) => (
              <Badge key={chip}>{chip}</Badge>
            ))}
          </div>
        </div>
      </div>
    </PanelFrame>
  );
}
