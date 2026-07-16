"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/icons";

export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

/** Hairline-divided accordion. One item open at a time; no animation excess. */
export function FaqAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("border-t", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left font-sans text-base font-medium text-foreground transition-colors duration-180 ease-standard hover:text-brand-text"
            >
              {item.question}
              <ChevronDownIcon
                size={18}
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform duration-180 ease-standard",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-180 ease-standard",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
