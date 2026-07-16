"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

/** Hairline tab strip; active tab carries the band's oxblood moment. */
export function Tabs({
  items,
  className,
}: {
  items: TabItem[];
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const current = items.find((t) => t.id === active) ?? items[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex flex-wrap gap-x-6 gap-y-2 border-b"
      >
        {items.map((tab) => {
          const isActive = tab.id === current?.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                "-mb-px border-b-2 pb-3 pt-1 font-sans text-sm font-medium transition-colors duration-180 ease-standard",
                isActive
                  ? "border-brand text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-8">
        {current?.content}
      </div>
    </div>
  );
}
