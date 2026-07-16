"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { useDemo } from "./DemoContext";
import { BrainGraph } from "./BrainGraph";
import { BRAIN_EDGES, BRAIN_NODES, OUTCOME_NODE } from "@/lib/brain";

// The second futuristic centerpiece: the shared brain on a dark surface,
// zoomable and pannable, with a clean side panel per node.
export function BrainView() {
  const { outcomeAdded, brainFocus, focusBrainNode } = useDemo();
  const [selected, setSelected] = useState<string | null>("rulebook");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number } | null>(null);

  // Honor a focus request coming from the Signals tab.
  useEffect(() => {
    if (brainFocus) {
      setSelected(brainFocus);
      focusBrainNode(null); // consume it
    }
  }, [brainFocus, focusBrainNode]);

  const nodes = outcomeAdded ? [...BRAIN_NODES, OUTCOME_NODE] : BRAIN_NODES;
  const edges = outcomeAdded
    ? [...BRAIN_EDGES, { from: "outcome-hy-q3", to: "outcome-history" }, { from: "outcome-hy-q3", to: "campaign-history" }]
    : BRAIN_EDGES;
  const node = nodes.find((n) => n.id === selected) ?? null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="sage-dark relative overflow-hidden rounded-2xl bg-background p-5 text-foreground">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.005em]">One Brain</h2>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              One shared data layer powers every view. No per-screen forks. Click a node, drag to pan, zoom with the controls.
            </p>
          </div>
          {outcomeAdded && (
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="chip bg-brand-soft font-semibold text-brand-text"
            >
              +1 node: written back by Measurement
            </motion.span>
          )}
        </div>

        <div
          className="mt-4 cursor-grab touch-none overflow-hidden rounded-xl active:cursor-grabbing"
          onPointerDown={(e) => {
            dragging.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (dragging.current) {
              setPan({ x: e.clientX - dragging.current.x, y: e.clientY - dragging.current.y });
            }
          }}
          onPointerUp={() => (dragging.current = null)}
          onPointerLeave={() => (dragging.current = null)}
        >
          <div
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "center" }}
            className="transition-transform duration-100"
          >
            <BrainGraph
              nodes={nodes}
              edges={edges}
              selectedId={selected}
              onSelect={setSelected}
              highlightId={outcomeAdded ? OUTCOME_NODE.id : null}
            />
          </div>
        </div>

        <div className="relative z-10 mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-dataviz-primary" /> Internal</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-dataviz-primary/75" /> Governance</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-dataviz-support" /> Memory (teal: the moat)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-dataviz-primary/50" /> External</span>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
              aria-label="Zoom out"
              className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <span className="w-10 text-center font-mono text-[10px]">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
              aria-label="Zoom in"
              className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="ml-1 rounded-md border border-border px-2 py-1.5 text-[10px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="card h-fit p-5">
        {node ? (
          <motion.div key={node.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-base font-semibold text-foreground">{node.label}</h3>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-muted-foreground">{node.summary}</p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/80">Contains</p>
            <ul className="mt-2 space-y-1.5">
              {node.contents.map((c) => (
                <li key={c} className="text-xs leading-[1.55] text-muted-foreground">· {c}</li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/80">Read by</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {node.readBy.map((a) => (
                <span key={a} className="chip bg-brand-soft text-brand-text">{a}</span>
              ))}
            </div>
          </motion.div>
        ) : (
          <p className="text-sm text-muted-foreground">Select a node to see what it contains and which agents read it.</p>
        )}
      </div>
    </div>
  );
}
