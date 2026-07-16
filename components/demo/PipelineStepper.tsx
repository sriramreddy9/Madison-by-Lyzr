"use client";

import { Check } from "lucide-react";
import { useDemo } from "./DemoContext";
import { currentStage, STAGES } from "./studioHelpers";

// A slim always-visible stepper: done, active, upcoming.
export function PipelineStepper({ dark = false }: { dark?: boolean }) {
  const { scenario, run } = useDemo();
  const stage = currentStage(scenario, run);
  const finished = run.phase === "complete";

  return (
    <ol className="flex min-w-max items-center gap-1" aria-label="Campaign pipeline">
      {STAGES.map((s, i) => {
        const done = finished || i < stage;
        const active = !finished && i === stage;
        return (
          <li key={s} className="flex items-center gap-1">
            {i > 0 && (
              <span
                className={`h-px w-4 sm:w-6 ${
                  done ? "bg-brand/50" : dark ? "bg-primary-foreground/15" : "bg-border"
                }`}
              />
            )}
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300 ${
                active
                  ? "bg-brand-soft text-brand-text"
                  : done
                    ? dark
                      ? "text-primary-foreground/75"
                      : "text-foreground/75"
                    : dark
                      ? "text-primary-foreground/35"
                      : "text-muted-foreground/50"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {done ? (
                <Check className="h-3 w-3 text-success" strokeWidth={3} />
              ) : (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? "animate-pulse-soft bg-brand" : "bg-current opacity-40"
                  }`}
                />
              )}
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
