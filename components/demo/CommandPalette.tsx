"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { useDemo, type Role, type View } from "./DemoContext";
import { SCENARIOS } from "@/lib/scenario";

interface Cmd {
  id: string;
  label: string;
  hint: string;
  run: () => void;
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { setView, setRole, setMode, startRun, resetRun } = useDemo();
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmds = useMemo<Cmd[]>(() => {
    const go = (v: View, label: string): Cmd => ({
      id: `view-${v}`,
      label,
      hint: "Go to",
      run: () => setView(v),
    });
    const role = (r: Role, label: string): Cmd => ({
      id: `role-${r}`,
      label,
      hint: "Switch role",
      run: () => setRole(r),
    });
    return [
      go("deck", "Command Deck"),
      go("studio", "Campaign Studio"),
      go("queue", "Compliance Queue"),
      go("brain", "One Brain"),
      go("library", "Agent Library"),
      ...SCENARIOS.map((s) => ({
        id: `run-${s.id}`,
        label: `New campaign: ${s.label}`,
        hint: "Run",
        run: () => {
          setRole("marketer");
          setView("studio");
          startRun(s.id);
        },
      })),
      { id: "reset", label: "Reset the current run", hint: "Run", run: resetRun },
      role("cmo", "CMO"),
      role("marketer", "Marketer"),
      role("compliance", "Compliance Officer"),
      { id: "mode-flow", label: "Studio: Flow mode", hint: "View", run: () => { setView("studio"); setMode("flow"); } },
      { id: "mode-canvas", label: "Studio: Agent Canvas", hint: "View", run: () => { setView("studio"); setMode("canvas"); } },
    ];
  }, [setView, setRole, setMode, startRun, resetRun]);

  const filtered = cmds.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setIdx(0), [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-foreground/25 pt-[16vh] backdrop-blur-[2px]"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={reduced ? false : { scale: 0.97, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-e-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIdx((i) => Math.min(i + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIdx((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter" && filtered[idx]) {
                    filtered[idx].run();
                    onClose();
                  } else if (e.key === "Escape") {
                    onClose();
                  }
                }}
                placeholder="Jump to a view, start a campaign, switch role..."
                className="w-full bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">esc</kbd>
            </div>
            <ul className="thin-scroll max-h-72 overflow-y-auto p-1.5" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-xs text-muted-foreground">No matches.</li>
              )}
              {filtered.map((c, i) => (
                <li key={c.id} role="option" aria-selected={i === idx}>
                  <button
                    type="button"
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => {
                      c.run();
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === idx ? "bg-brand-soft text-brand-text" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {c.label}
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
