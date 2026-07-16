import { Fragment } from "react";
import { PanelFrame } from "@/components/mocks/chrome";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/icons";
import { HOW } from "@/content/commercial-banking-rm";
import { cn } from "@/lib/utils";

/**
 * Static rendering of the source's animated RelationshipWorkflowVisual
 * (motion law: no looping animation). One relationship flowing through the
 * four stages over a shared customer context. Copy verbatim from HOW.flow.
 */
export function ContextFlow({ className }: { className?: string }) {
  const { flow } = HOW;
  return (
    <PanelFrame title={flow.label} className={cn("bg-background", className)}>
      <div className="p-4" aria-label="One relationship, end to end: Relationship, Credit, Service, and Portfolio stages sharing one customer context">
        <div className="flex items-center gap-1" aria-hidden>
          {flow.nodes.map((node, i) => (
            <Fragment key={node}>
              {i > 0 ? (
                <ArrowRightIcon
                  size={12}
                  className="shrink-0 text-muted-foreground/60"
                />
              ) : null}
              <div className="min-w-0 flex-1 rounded-sm border bg-card px-1 py-2.5 text-center">
                <div className="font-mono text-[10px] text-muted-foreground">{`0${i + 1}`}</div>
                <div className="mt-0.5 text-[11px] font-medium leading-tight text-foreground">
                  {node}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="mx-auto h-3 w-px bg-border" aria-hidden />
        <div className="rounded-sm border bg-muted px-3 py-3.5 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-brand-text">
            {flow.contextTitle}
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            {flow.contextBody}
          </p>
          <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
            {flow.teams.map((team) => (
              <Badge key={team}>{team}</Badge>
            ))}
          </div>
        </div>
      </div>
    </PanelFrame>
  );
}
