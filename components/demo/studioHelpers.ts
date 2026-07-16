import type { Scenario, TimelineItem, Turn } from "@/lib/scenario";
import { STOCK_AGENTS } from "@/lib/agents";

export interface RunSnapshot {
  itemIdx: number;
  step: number;
  phase: string;
}

export const STAGES = [
  "Brief",
  "Segment",
  "Intel",
  "Content",
  "Compliance",
  "Approvals",
  "Launch",
  "Measure",
] as const;

// Map a timeline position to one of the eight pipeline stages.
export function stageOfItem(items: TimelineItem[], idx: number): number {
  const item = items[idx];
  if (!item) return 0;
  if (item.kind === "gate") {
    return item.gate === "launch" ? 6 : 5;
  }
  const turnIdxBefore = items
    .slice(0, idx)
    .filter((i) => i.kind === "turn").length;
  // turns 0..4 map to stages 0..4; launch turn -> 6; measurement/compose -> 7
  if (turnIdxBefore <= 4) return Math.min(turnIdxBefore, 4);
  if (turnIdxBefore === 5) return 6;
  return 7;
}

export function currentStage(scenario: Scenario, run: RunSnapshot): number {
  if (run.itemIdx < 0) return -1;
  if (run.phase === "complete" || run.phase === "compose_prompt") return 7;
  return stageOfItem(scenario.items, run.itemIdx);
}

export type OrbStatus = "idle" | "queued" | "thinking" | "producing" | "done";

// Status for each of the eight stock agents based on the run position.
export function orbStatuses(
  scenario: Scenario,
  run: RunSnapshot
): { id: string; name: string; icon: string; status: OrbStatus }[] {
  const finished = run.phase === "complete" || run.phase === "compose_prompt";
  return STOCK_AGENTS.map((a) => {
    const turnIdxs = scenario.items
      .map((item, i) => (item.kind === "turn" && item.agentId === a.id ? i : -1))
      .filter((i) => i >= 0);
    let status: OrbStatus = "idle";
    if (turnIdxs.length > 0 && run.itemIdx >= 0) {
      const active = turnIdxs.includes(run.itemIdx) && run.phase === "running";
      const anyAhead = turnIdxs.some((i) => i > run.itemIdx);
      const anyDone = turnIdxs.some((i) => i < run.itemIdx) || finished;
      if (active) status = run.step === 0 ? "thinking" : "producing";
      else if (anyDone && !anyAhead) status = "done";
      else if (anyDone && anyAhead) status = "done";
      else if (anyAhead) status = "queued";
    }
    if (finished && turnIdxs.length > 0) status = "done";
    return { id: a.id, name: a.name, icon: a.icon, status };
  });
}

// A short, human line for the activity feed, per completed turn.
export function activityLine(turn: Turn): string {
  return turn.output.headline;
}

// Group a brain-read chip into its One Brain source bucket, and map to a
// graph node id when one exists.
const SIGNAL_MAP: { match: string; group: string; nodeId: string | null }[] = [
  { match: "core data", group: "Core data", nodeId: "core-data" },
  { match: "member data", group: "Core data", nodeId: "core-data" },
  { match: "crm", group: "Core data", nodeId: "crm" },
  { match: "rulebook", group: "Rulebook", nodeId: "rulebook" },
  { match: "compliance history", group: "Rulebook", nodeId: "compliance-history" },
  { match: "approval", group: "Rulebook", nodeId: "approval-history" },
  { match: "brand kit", group: "Brand kit", nodeId: "brand-kit" },
  { match: "competitor", group: "Competitor signals", nodeId: "competitor-signals" },
  { match: "market signals", group: "Competitor signals", nodeId: "market-signals" },
  { match: "outcome", group: "Outcome history", nodeId: "outcome-history" },
  { match: "campaign", group: "Outcome history", nodeId: "campaign-history" },
  { match: "rate table", group: "Rulebook", nodeId: "rulebook" },
];

export function signalBucket(chip: string): { group: string; nodeId: string | null } {
  const lower = chip.toLowerCase();
  const hit = SIGNAL_MAP.find((s) => lower.includes(s.match));
  return hit ? { group: hit.group, nodeId: hit.nodeId } : { group: "Other", nodeId: null };
}

// One plain-language line about what is happening now and what comes next.
export function orientationCaption(phase: string, stage: number): string {
  switch (phase) {
    case "idle":
      return "Type a one-line brief, or pick an example, and the agents take it from there.";
    case "awaiting_marketer":
      return "Everything is drafted and pre-cleared. Review the package and approve to send it to Compliance.";
    case "in_compliance_queue":
      return "Compliance is doing a second, independent review. Launch stays locked until it clears.";
    case "ready_to_launch":
      return "Both human approvals are in. Launch when you are ready.";
    case "compose_prompt":
      return "Save this run as a reusable agent, tuned to Willamette, so the next rate change is one click.";
    case "complete":
      return "Done. Run another brief, or open One Brain to see what the campaign wrote back.";
    default:
      break;
  }
  if (stage <= 4)
    return "Agents are structuring, segmenting, drafting, and pre-clearing your campaign. Next: your approval.";
  if (stage === 6) return "The approved package is going out through the credit union's own send tools.";
  return "Measurement is attributing results and writing them back to One Brain.";
}
