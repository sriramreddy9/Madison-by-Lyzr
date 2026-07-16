"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

const STEPS = [
  {
    title: "Three roles, one product",
    body: "Use the switcher in the top bar to move between the CMO (watch), the Marketer (run and approve), and the Compliance Officer (second approval). Each role sees what matters to them.",
  },
  {
    title: "Flow and Canvas",
    body: "Campaign Studio has two views of the same run: Flow is the clean guided thread, Canvas is the live agent constellation around One Brain. Toggle them in the top bar, mid-run if you like.",
  },
  {
    title: "Run your first campaign",
    body: "Pick an example brief in Campaign Studio and press Run. Agents draft, segment, and pre-clear everything; you approve at the gates. Weeks become minutes.",
  },
];

const KEY = "aos-coach-done";

export function Coach() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setStep(0);
    } catch {
      /* storage unavailable, skip the coach */
    }
  }, []);

  const dismiss = () => {
    setStep(-1);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (step < 0) return null;
  const s = STEPS[step];

  return (
    <AnimatePresence>
      <motion.div
        key={step}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: 8 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-20 left-1/2 z-[60] w-[min(420px,calc(100vw-32px))] -translate-x-1/2 rounded-2xl border border-border bg-card p-5 shadow-e-lg lg:bottom-6"
        role="dialog"
        aria-label="Getting started"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-text">
            Getting started · {step + 1} of {STEPS.length}
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Skip the tour"
            className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
        <h3 className="mt-2 text-sm font-semibold text-foreground">{s.title}</h3>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-muted-foreground">{s.body}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === step ? "w-5 bg-brand" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={dismiss} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
              Skip
            </button>
            <button
              type="button"
              onClick={() => (step === STEPS.length - 1 ? dismiss() : setStep(step + 1))}
              className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {step === STEPS.length - 1 ? "Start" : "Next"}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
