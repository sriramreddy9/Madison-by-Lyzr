"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useDemo } from "./DemoContext";
import { IconFor } from "@/components/brand/IconFor";
import { STOCK_AGENTS } from "@/lib/agents";

export function AgentLibrary() {
  const { dynamicAgents } = useDemo();

  return (
    <div className="space-y-8">
      <div>
        <div className="card p-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">Agent Library</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Stock agents make us useful on day one. Dynamic agents make us impossible to rip out.
          </p>
        </div>
      </div>

      <section aria-labelledby="stock-heading">
        <h3 id="stock-heading" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
          Stock agents · ship with the platform, reusable across every institution
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {STOCK_AGENTS.map((a) => (
            <div key={a.id} className="card p-5">
              <div className="flex items-center gap-2.5">
                <span className="rounded-xl bg-secondary p-2 text-foreground/70">
                  <IconFor icon={a.icon} className="h-4 w-4" />
                </span>
                <h4 className="font-serif text-sm font-semibold leading-tight text-foreground">{a.name}</h4>
              </div>
              <p className="mt-2.5 text-xs leading-[1.55] text-muted-foreground">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="dynamic-heading">
        <h3 id="dynamic-heading" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
          Dynamic agents · composed for Willamette Community CU from its own brain
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {dynamicAgents.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card border-2 border-brand/25 p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="rounded-xl bg-brand-soft p-2 text-brand-text">
                  <IconFor icon={a.icon} className="h-4 w-4" />
                </span>
                <h4 className="font-serif text-sm font-semibold leading-tight text-foreground">{a.name}</h4>
              </div>
              <p className="mt-2.5 text-xs leading-[1.55] text-muted-foreground">{a.description}</p>
              {a.composedFrom && (
                <>
                  <p className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-text">
                    <Sparkles className="h-3 w-3" strokeWidth={2} /> Composed from
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {a.composedFrom.map((f) => (
                      <li key={f} className="text-[11px] leading-[1.5] text-muted-foreground">
                        · {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
