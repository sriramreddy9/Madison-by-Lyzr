"use client";

import { motion, useReducedMotion } from "motion/react";
import { Brain, Check } from "lucide-react";
import { useDemo } from "./DemoContext";
import { IconFor } from "@/components/brand/IconFor";
import { orbStatuses, type OrbStatus } from "./studioHelpers";

function Orb({
  icon,
  name,
  status,
}: {
  icon: string;
  name: string;
  status: OrbStatus;
}) {
  const reduced = useReducedMotion();
  const ring =
    status === "done"
      ? "border-success/60 bg-success-soft text-success-text"
      : status === "thinking" || status === "producing"
        ? "border-brand bg-brand-soft text-brand-text"
        : status === "queued"
          ? "border-border bg-card text-muted-foreground/70"
          : "border-border bg-muted text-muted-foreground/40";

  return (
    <div className="group relative flex flex-col items-center" title={`${name}: ${status}`}>
      <motion.span
        animate={
          reduced
            ? undefined
            : status === "queued"
              ? { scale: [1, 1.05, 1] }
              : status === "thinking"
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
        }
        transition={
          status === "queued"
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : status === "thinking"
              ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 180, damping: 16 }
        }
        className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors duration-300 ${ring}`}
      >
        <IconFor icon={icon} className="h-4 w-4" />
        {status === "producing" && !reduced && (
          <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
            <motion.circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="hsl(var(--brand))"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        )}
        {status === "thinking" && !reduced && (
          <motion.span
            className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        )}
        {status === "done" && (
          <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-success p-0.5 text-white">
            <Check className="h-2 w-2" strokeWidth={4} />
          </span>
        )}
      </motion.span>
      <span
        className={`mt-1.5 max-w-[64px] truncate text-center text-[9px] font-semibold leading-tight ${
          status === "idle" ? "text-muted-foreground/50" : "text-muted-foreground"
        }`}
      >
        {name.split(" ")[0]}
      </span>
      {/* hover tooltip */}
      <span className="pointer-events-none absolute -top-8 z-20 hidden whitespace-nowrap rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground group-hover:block">
        {name} · {status}
      </span>
    </div>
  );
}

// The ambient "agents at work" strip: eight orbs plus a brain glyph that
// pulses toward whichever agent is currently reading One Brain.
export function AgentOrbs() {
  const { scenario, run } = useDemo();
  const reduced = useReducedMotion();
  const orbs = orbStatuses(scenario, run);
  const activeIdx = orbs.findIndex((o) => o.status === "thinking" || o.status === "producing");

  return (
    <div className="relative flex items-center gap-3 overflow-x-auto rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-sm">
      <div className="flex shrink-0 flex-col items-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Brain className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <span className="mt-1.5 text-[9px] font-semibold text-muted-foreground">One Brain</span>
      </div>
      <div className="relative flex items-center gap-3">
        {/* pulse from the brain to the active orb */}
        {activeIdx >= 0 && !reduced && (
          <motion.span
            key={activeIdx}
            className="absolute -left-3 top-[22px] z-10 h-1.5 w-1.5 rounded-full bg-brand"
            animate={{ x: [0, 12 + activeIdx * 56], opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
            aria-hidden="true"
          />
        )}
        {orbs.map((o) => (
          <Orb key={o.id} icon={o.icon} name={o.name} status={o.status} />
        ))}
      </div>
    </div>
  );
}
