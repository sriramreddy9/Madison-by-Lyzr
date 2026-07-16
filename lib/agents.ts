export type AgentKind = "stock" | "dynamic";

export interface AgentDef {
  id: string;
  name: string;
  icon: string; // lucide icon key, resolved in components
  kind: AgentKind;
  oneLiner: string;
  description: string;
  composedFrom?: string[]; // brain fragments, dynamic agents only
}

export const STOCK_AGENTS: AgentDef[] = [
  {
    id: "campaign-production",
    name: "Campaign Production",
    icon: "workflow",
    kind: "stock",
    oneLiner: "Brief to compliant, launch-ready, multi-channel campaign.",
    description:
      "The hero agent. Takes a one-line brief and produces a segmented, multi-channel campaign on the bank's own data, human-approved at every step.",
  },
  {
    id: "compliance-precheck",
    name: "Compliance Pre-check",
    icon: "shield-check",
    kind: "stock",
    oneLiner: "First-pass-clean drafts against the bank's own rulebook.",
    description:
      "Reviews every rate-bearing asset against Truth-in-Lending (Reg Z), Truth-in-Savings (Reg DD), UDAAP, fair lending, and FDIC / NCUA advertising rules. Inserts required disclosures, shows its reasoning, and hands a first-pass-clean draft to a human. Assist, not act.",
  },
  {
    id: "fair-lending-segmentation",
    name: "Fair-lending Segmentation",
    icon: "users",
    kind: "stock",
    oneLiner: "Audience segments with disparate-impact guardrails built in.",
    description:
      "Builds audience segments on core data with fair-lending and disparate-impact checks so targeting avoids redlining risk. A human reviews every segment before use.",
  },
  {
    id: "content-optimization",
    name: "Content and Language Optimization",
    icon: "pen-line",
    kind: "stock",
    oneLiner: "On-brand, compliance-aware copy, scored and selected. Persado-integrated.",
    description:
      "Drafts and optimizes on-brand, compliance-aware copy and creative variants, then tests for the highest-performing message. This is where Persado, Jasper, Writer, or Typeface plugs in. Governed, brand-bound, clearance-aware, never free-form generation.",
  },
  {
    id: "rate-intel",
    name: "Competitive and Rate Intelligence",
    icon: "radar",
    kind: "stock",
    oneLiner: "A daily brief of local competitor rates, offers, and creative. Zero integration.",
    description:
      "Delivers a daily brief of local competitor rates, offers, and marketing creative from public data. Valuable from day zero with no integration, which makes it the land-motion wedge.",
  },
  {
    id: "measurement",
    name: "Measurement and Attribution",
    icon: "bar-chart-3",
    kind: "stock",
    oneLiner: "Tracks outcomes, attributes lift, writes results back to the brain.",
    description:
      "Tracks campaign outcomes, attributes lift, and writes results back into the shared brain so every future campaign starts smarter. This is how memory compounds.",
  },
  {
    id: "social-reputation",
    name: "Social and Reputation",
    icon: "megaphone",
    kind: "stock",
    oneLiner: "Monitors and drafts responses within brand and compliance guardrails.",
    description:
      "Monitors social and reputation channels and drafts responses within brand and compliance guardrails, queued for human review before anything posts.",
  },
  {
    id: "board-reporting",
    name: "Board Reporting",
    icon: "file-check",
    kind: "stock",
    oneLiner: "Exam-ready, board-ready reporting from live activity.",
    description:
      "Turns campaign and compliance activity into exam-ready and board-ready reporting, with the full approval trail attached.",
  },
];

export const SEED_DYNAMIC_AGENTS: AgentDef[] = [
  {
    id: "heloc-cross-sell",
    name: "HELOC Cross-sell to Mortgage Holders",
    icon: "home",
    kind: "dynamic",
    oneLiner: "Willamette-tuned cross-sell flow for members holding a first mortgage.",
    description:
      "Composed for Willamette Community CU. Targets members with a first mortgage and available equity, drafts in the credit union's voice, and routes through its exact sign-off chain.",
    composedFrom: [
      "Willamette rulebook (Reg Z, NCUA advertising)",
      "Brand kit (warm, community-first)",
      "Past campaign: 2025 HELOC spring push",
      "Approval chain: Marketer, Compliance Officer, VP Marketing",
    ],
  },
  {
    id: "dormant-checking-winback",
    name: "Dormant-checking Win-back",
    icon: "rotate-ccw",
    kind: "dynamic",
    oneLiner: "Reactivates members whose checking has gone quiet, on Willamette's data.",
    description:
      "Composed for Willamette Community CU. Finds members with no checking activity in 90 days, matches offers to their history, and pre-clears every asset against the credit union's rulebook.",
    composedFrom: [
      "Core data: activity and balance history",
      "Willamette rulebook (Reg DD, UDAAP)",
      "Outcome history: 2024 win-back results",
      "Approval chain: Marketer, Compliance Officer",
    ],
  },
  {
    id: "cra-lmi-outreach",
    name: "CRA / LMI Community Outreach",
    icon: "heart-handshake",
    kind: "dynamic",
    oneLiner: "Community outreach campaigns with fair-lending guardrails baked in.",
    description:
      "Composed for Willamette Community CU. Builds community outreach for low-to-moderate-income areas with fair-lending checks and documentation designed for CRA exam readiness.",
    composedFrom: [
      "Bank policy: CRA program goals",
      "Member data summary (protected-class distribution)",
      "Willamette rulebook (fair lending, UDAAP)",
      "Compliance history: past exam notes",
    ],
  },
];

export function agentById(id: string): AgentDef | undefined {
  return [...STOCK_AGENTS, ...SEED_DYNAMIC_AGENTS].find((a) => a.id === id);
}
