"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "motion/react";
import { SEED_DYNAMIC_AGENTS, type AgentDef } from "@/lib/agents";
import {
  scenarioById,
  type Gate,
  type Scenario,
  type Turn,
} from "@/lib/scenario";
import {
  delayForStep,
  fetchLiveTurn,
  isLiveMode,
  totalSteps,
} from "@/lib/orchestrator";

export type Role = "cmo" | "marketer" | "compliance";
export type View = "deck" | "studio" | "queue" | "brain" | "library";
export type StudioMode = "flow" | "canvas";

export interface Toast {
  id: number;
  message: string;
}

export type RunPhase =
  | "idle"
  | "running"
  | "awaiting_marketer"
  | "in_compliance_queue"
  | "ready_to_launch"
  | "compose_prompt"
  | "complete";

export interface AuditEntry {
  time: string;
  actor: string;
  action: string;
}

export interface ComplianceItem {
  id: string;
  scenarioId: string;
  campaignName: string;
  submittedBy: string;
  status: "pending" | "approved" | "returned";
}

interface RunState {
  scenarioId: string;
  itemIdx: number;
  step: number; // progress within the current turn
  phase: RunPhase;
}

interface DemoContextValue {
  role: Role;
  view: View;
  setRole: (r: Role) => void;
  setView: (v: View) => void;
  mode: StudioMode;
  setMode: (m: StudioMode) => void;
  brainFocus: string | null;
  focusBrainNode: (nodeId: string | null) => void;
  toasts: Toast[];
  pushToast: (message: string) => void;
  scenario: Scenario;
  run: RunState;
  turnFor: (item: Turn) => Turn; // applies live-mode overrides
  liveTurnPending: boolean;
  queue: ComplianceItem[];
  auditLog: AuditEntry[];
  dynamicAgents: AgentDef[];
  outcomeAdded: boolean;
  startRun: (scenarioId: string) => void;
  approveMarketer: () => void;
  approveCompliance: () => void;
  returnWithNote: (note: string, by: "marketer" | "compliance") => void;
  launchCampaign: () => void;
  confirmCompose: () => void;
  declineCompose: () => void;
  resetRun: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

function now(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const [role, setRoleState] = useState<Role>("marketer");
  const [view, setView] = useState<View>("studio");
  const [run, setRun] = useState<RunState>({
    scenarioId: "hy-savings",
    itemIdx: -1,
    step: 0,
    phase: "idle",
  });
  const [overrides, setOverrides] = useState<Record<string, Turn>>({});
  const [liveTurnPending, setLiveTurnPending] = useState(false);
  const liveFetched = useRef<Set<string>>(new Set());
  const [queue, setQueue] = useState<ComplianceItem[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [dynamicAgents, setDynamicAgents] =
    useState<AgentDef[]>(SEED_DYNAMIC_AGENTS);
  const [outcomeAdded, setOutcomeAdded] = useState(false);
  const [mode, setMode] = useState<StudioMode>("flow");
  const [brainFocus, setBrainFocus] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const pushToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  const focusBrainNode = useCallback((nodeId: string | null) => {
    setBrainFocus(nodeId);
    if (nodeId) setView("brain");
  }, []);

  const scenario = useMemo(() => scenarioById(run.scenarioId), [run.scenarioId]);

  const log = useCallback((actor: string, action: string) => {
    setAuditLog((l) => [...l, { time: now(), actor, action }]);
  }, []);

  const setRole = useCallback(
    (r: Role) => {
      setRoleState(r);
      setView(r === "cmo" ? "deck" : r === "compliance" ? "queue" : "studio");
      pushToast(
        r === "cmo"
          ? "You are the CMO: watch the pipeline and export board reports."
          : r === "compliance"
            ? "You are the Compliance Officer: review, approve, or return campaigns."
            : "You are the Marketer: run briefs and approve the first gate."
      );
    },
    [pushToast]
  );

  const turnFor = useCallback(
    (item: Turn): Turn => overrides[item.id] ?? item,
    [overrides]
  );

  const startRun = useCallback(
    (scenarioId: string) => {
      liveFetched.current = new Set();
      setOverrides({});
      setOutcomeAdded(false);
      setQueue([]);
      setRun({ scenarioId, itemIdx: 0, step: 0, phase: "running" });
      log("Orchestrator", `Run started: ${scenarioById(scenarioId).label}`);
    },
    [log]
  );

  const resetRun = useCallback(() => {
    setRun((r) => ({ ...r, itemIdx: -1, step: 0, phase: "idle" }));
    setQueue([]);
    setOutcomeAdded(false);
    setOverrides({});
  }, []);

  // The streaming engine: advances the current turn step by step with
  // realistic pacing, pauses at gates, and applies side effects.
  useEffect(() => {
    if (run.phase !== "running") return;
    const item = scenario.items[run.itemIdx];
    if (!item) return;

    if (item.kind === "gate") {
      const g = item as Gate;
      setRun((r) => ({
        ...r,
        phase:
          g.gate === "marketer"
            ? "awaiting_marketer"
            : g.gate === "compliance"
              ? "in_compliance_queue"
              : "ready_to_launch",
      }));
      return;
    }

    const turn = overrides[item.id] ?? item;

    // Live mode: hold in "thinking" until the server turn arrives, then stream it.
    if (
      isLiveMode() &&
      run.step === 0 &&
      !liveFetched.current.has(item.id)
    ) {
      liveFetched.current.add(item.id);
      setLiveTurnPending(true);
      let cancelled = false;
      fetchLiveTurn(scenario.id, item.id, scenario.brief).then((live) => {
        if (cancelled) return;
        if (live) setOverrides((o) => ({ ...o, [item.id]: live }));
        setLiveTurnPending(false);
        setRun((r) => ({ ...r, step: 1 }));
      });
      return () => {
        cancelled = true;
        setLiveTurnPending(false);
      };
    }

    const total = totalSteps(turn);
    const timer = setTimeout(
      () => {
        if (run.step < total - 1) {
          setRun((r) => ({ ...r, step: r.step + 1 }));
          return;
        }
        // Turn complete: side effects, then advance.
        if (turn.agentId === "measurement") {
          setOutcomeAdded(true);
          log("Measurement and Attribution", "Outcome node written to One Brain");
        }
        const isLast = run.itemIdx === scenario.items.length - 1;
        if (isLast) {
          setRun((r) => ({ ...r, phase: "compose_prompt" }));
          return;
        }
        if (turn.requiresApproval === "marketer") {
          setRun((r) => ({
            ...r,
            itemIdx: r.itemIdx + 1,
            step: 0,
            phase: "awaiting_marketer",
          }));
          log(turn.title, "Package ready, waiting on Marketer approval");
          return;
        }
        setRun((r) => ({ ...r, itemIdx: r.itemIdx + 1, step: 0 }));
      },
      delayForStep(run.step, turn, reduced)
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run.phase, run.itemIdx, run.step, scenario, reduced, overrides]);

  const approveMarketer = useCallback(() => {
    setQueue((q) => [
      ...q.filter((i) => i.scenarioId !== scenario.id),
      {
        id: `q-${scenario.id}`,
        scenarioId: scenario.id,
        campaignName: scenario.campaignName,
        submittedBy: "Jordan Lee (Marketer)",
        status: "pending",
      },
    ]);
    log("Jordan Lee (Marketer)", "Approved package, routed to Compliance Queue");
    pushToast("Approved. Sent to Compliance for a second, independent review.");
    setRun((r) => ({ ...r, itemIdx: r.itemIdx + 1, phase: "in_compliance_queue" }));
  }, [scenario, log, pushToast]);

  const approveCompliance = useCallback(() => {
    setQueue((q) =>
      q.map((i) =>
        i.scenarioId === scenario.id ? { ...i, status: "approved" } : i
      )
    );
    log("Dana Okafor (Compliance Officer)", "Second approval granted, launch unlocked");
    pushToast("Second approval granted. Launch is unlocked.");
    setRun((r) => ({ ...r, itemIdx: r.itemIdx + 1, phase: "ready_to_launch" }));
  }, [scenario, log, pushToast]);

  const returnWithNote = useCallback(
    (note: string, by: "marketer" | "compliance") => {
      const actor =
        by === "marketer"
          ? "Jordan Lee (Marketer)"
          : "Dana Okafor (Compliance Officer)";
      log(actor, `Returned with note: "${note}"`);
      // Send it back to the pre-check turn so the agent revises and re-presents.
      const precheckIdx = scenario.items.findIndex(
        (i) => i.kind === "turn" && i.requiresApproval === "marketer"
      );
      setQueue((q) =>
        q.map((i) =>
          i.scenarioId === scenario.id ? { ...i, status: "returned" } : i
        )
      );
      setRun((r) => ({
        ...r,
        itemIdx: precheckIdx >= 0 ? precheckIdx : r.itemIdx,
        step: 0,
        phase: "running",
      }));
    },
    [scenario, log]
  );

  const launchCampaign = useCallback(() => {
    log("Jordan Lee (Marketer)", "Launch confirmed, package handed to send tools");
    pushToast(`Launched to ${scenario.segmentSize.toLocaleString("en-US")} members.`);
    setRun((r) => ({ ...r, itemIdx: r.itemIdx + 1, step: 0, phase: "running" }));
  }, [log, pushToast, scenario]);

  const confirmCompose = useCallback(() => {
    const c = scenario.composedAgent;
    setDynamicAgents((agents) =>
      agents.some((a) => a.id === c.id)
        ? agents
        : [
            ...agents,
            {
              id: c.id,
              name: c.name,
              icon: c.icon,
              kind: "dynamic",
              oneLiner: c.oneLiner,
              description: c.description,
              composedFrom: c.composedFrom,
            },
          ]
    );
    log("Jordan Lee (Marketer)", `Dynamic agent composed: ${c.name}`);
    pushToast(`"${c.name}" added to the Agent Library.`);
    setRun((r) => ({ ...r, phase: "complete" }));
  }, [scenario, log, pushToast]);

  const declineCompose = useCallback(() => {
    log("Jordan Lee (Marketer)", "Dynamic agent not saved");
    setRun((r) => ({ ...r, phase: "complete" }));
  }, [log]);

  const value: DemoContextValue = {
    role,
    view,
    setRole,
    setView,
    mode,
    setMode,
    brainFocus,
    focusBrainNode,
    toasts,
    pushToast,
    scenario,
    run,
    turnFor,
    liveTurnPending,
    queue,
    auditLog,
    dynamicAgents,
    outcomeAdded,
    startRun,
    approveMarketer,
    approveCompliance,
    returnWithNote,
    launchCampaign,
    confirmCompose,
    declineCompose,
    resetRun,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
