import { cn } from "@/lib/utils";

export type StepItem = {
  num?: string;
  title: string;
  body?: React.ReactNode;
  meta?: string;
  highlighted?: boolean;
};

/** Numbered journey/flow rail with hairline separators. */
export function StepRail({
  steps,
  className,
}: {
  steps: StepItem[];
  className?: string;
}) {
  return (
    <ol className={cn("border-t", className)}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            "grid grid-cols-[3rem_1fr] gap-4 border-b py-5 sm:grid-cols-[3.5rem_14rem_1fr] sm:gap-6",
            step.highlighted && "bg-muted",
          )}
        >
          <span className="font-mono text-sm text-brand-text">
            {step.num ?? String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-sans text-base font-semibold text-foreground">
            {step.title}
            {step.meta ? (
              <span className="mt-1 block font-mono text-xs font-normal uppercase tracking-wide text-muted-foreground">
                {step.meta}
              </span>
            ) : null}
          </span>
          {step.body ? (
            <span className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
              {step.body}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
