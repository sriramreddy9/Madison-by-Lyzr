"use client";

import { motion, useReducedMotion } from "motion/react";
import type { BrainEdge, BrainNode } from "@/lib/brain";

// Sage palette: neutral-led data viz, teal reserved for memory (the moat).
const GROUP_COLOR_SAGE: Record<BrainNode["group"], string> = {
  internal: "hsl(var(--dataviz-primary))",
  governance: "hsl(var(--dataviz-primary) / 0.75)",
  memory: "hsl(var(--dataviz-support))",
  external: "hsl(var(--dataviz-primary) / 0.5)",
};

export function BrainGraph({
  nodes,
  edges,
  selectedId,
  onSelect,
  highlightId,
  className = "",
}: {
  nodes: BrainNode[];
  edges: BrainEdge[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  highlightId?: string | null;
  className?: string;
}) {
  const reduced = useReducedMotion();
  
  const c = {
    hub: "hsl(var(--primary))",
    hubText: "hsl(var(--primary-foreground))",
    hubRing: "hsl(var(--border))",
    spoke: "hsl(var(--border))",
    edge: "hsl(var(--border))",
    pulse: "hsl(var(--brand))",
    nodeStroke: "hsl(var(--background))",
    nodeStrokeSel: "hsl(var(--foreground))",
    label: "hsl(var(--foreground))",
    groups: GROUP_COLOR_SAGE,
  };
  const W = 820;
  const H = 520;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 330;
  const ry = 195;

  const pos = new Map<string, { x: number; y: number }>();
  nodes.forEach((n, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    pos.set(n.id, {
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
    });
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full ${className}`}
      role="img"
      aria-label="One Brain knowledge graph"
    >
      {/* hub */}
      <circle cx={cx} cy={cy} r={46} fill={c.hub} />
      <circle cx={cx} cy={cy} r={58} fill="none" stroke={c.hubRing} strokeOpacity={1} strokeWidth={2} />
      <text x={cx} y={cy - 2} textAnchor="middle" fill={c.hubText} fontSize={13} fontWeight={700}>
        One
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill={c.hubText} fontSize={13} fontWeight={700}>
        Brain
      </text>

      {/* spokes to hub */}
      {nodes.map((n) => {
        const p = pos.get(n.id)!;
        return (
          <line
            key={`spoke-${n.id}`}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={c.spoke}
            strokeOpacity={0.7}
            strokeWidth={1.5}
          />
        );
      })}

      {/* cross edges with pulse */}
      {edges.map((e, i) => {
        const a = pos.get(e.from);
        const b = pos.get(e.to);
        if (!a || !b) return null;
        return (
          <g key={`${e.from}-${e.to}`}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c.edge} strokeOpacity={0.8} strokeWidth={1.25} />
            {!reduced && (
              <motion.circle
                r={3}
                fill={c.pulse}
                initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                animate={{ cx: [a.x, b.x], cy: [a.y, b.y], opacity: [0, 0.9, 0] }}
                transition={{
                  duration: 2.6,
                  delay: i * 0.7,
                  repeat: Infinity,
                  repeatDelay: edges.length * 0.7 - 2.6 > 0 ? edges.length * 0.7 - 2.6 : 1,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => {
        const p = pos.get(n.id)!;
        const selected = selectedId === n.id;
        const highlighted = highlightId === n.id;
        const color = c.groups[n.group];
        return (
          <motion.g
            key={n.id}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.06 * i, duration: 0.5 }}
            style={{ cursor: onSelect ? "pointer" : "default" }}
            onClick={() => onSelect?.(n.id)}
            tabIndex={onSelect ? 0 : -1}
            role={onSelect ? "button" : undefined}
            aria-label={onSelect ? `Open ${n.label}` : undefined}
            onKeyDown={(ev) => {
              if (onSelect && (ev.key === "Enter" || ev.key === " ")) {
                ev.preventDefault();
                onSelect(n.id);
              }
            }}
          >
            {highlighted && (
              <circle cx={p.x} cy={p.y} r={30} fill={color} fillOpacity={0.18} className="animate-pulse-soft" />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={selected ? 15 : 12}
              fill={color}
              stroke={selected ? c.nodeStrokeSel : c.nodeStroke}
              strokeWidth={selected ? 2.5 : 2}
            />
            <text
              x={p.x}
              y={p.y + (p.y > cy ? 34 : -24)}
              textAnchor="middle"
              fontSize={12.5}
              fontWeight={600}
              fill={c.label}
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
