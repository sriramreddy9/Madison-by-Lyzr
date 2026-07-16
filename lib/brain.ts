export interface BrainNode {
  id: string;
  label: string;
  group: "internal" | "external" | "governance" | "memory";
  summary: string;
  contents: string[];
  readBy: string[]; // agent names
}

export interface BrainEdge {
  from: string;
  to: string;
}

// Seed data for the demo tenant: Willamette Community Credit Union, $3.2B in assets.
export const BRAIN_NODES: BrainNode[] = [
  {
    id: "core-data",
    label: "Core data",
    group: "internal",
    summary: "Accounts, balances, and activity from the core banking system.",
    contents: [
      "214,600 members, 388,400 accounts",
      "31,240 checking accounts with balances over $10,000",
      "4,182 of those show 90+ days of idle balance",
      "Deposit mix: 46% checking, 31% savings, 23% CDs",
    ],
    readBy: ["Fair-lending Segmentation", "Campaign Production", "Measurement and Attribution"],
  },
  {
    id: "crm",
    label: "CRM",
    group: "internal",
    summary: "Member relationships, channel preferences, and consent flags.",
    contents: [
      "Email opt-in: 71% of members",
      "SMS opt-in: 38% of members",
      "Preferred channel modeled per member",
      "Do-not-contact and marketing-consent flags enforced",
    ],
    readBy: ["Campaign Production", "Content and Language Optimization"],
  },
  {
    id: "brand-kit",
    label: "Brand kit",
    group: "internal",
    summary: "Voice, palette, and creative rules for Willamette Community CU.",
    contents: [
      "Voice: warm, community-first, plain-spoken",
      "Always 'members', never 'customers'",
      "Palette: evergreen, river blue, warm sand",
      "Banned phrases list: 14 entries (no urgency-bait, no 'act now')",
    ],
    readBy: ["Content and Language Optimization", "Social and Reputation"],
  },
  {
    id: "rulebook",
    label: "Bank policy / rulebook",
    group: "governance",
    summary: "The institution's own compliance rulebook, encoded.",
    contents: [
      "Reg DD (Truth-in-Savings): APY statements need minimum-balance and fee disclosures",
      "Reg Z (Truth-in-Lending): APR triggering terms require full disclosure",
      "UDAAP: no misleading comparative claims",
      "NCUA advertising rules: official insurance statement on deposit ads",
    ],
    readBy: ["Compliance Pre-check", "Fair-lending Segmentation", "Board Reporting"],
  },
  {
    id: "campaign-history",
    label: "Campaign history",
    group: "memory",
    summary: "Every past campaign, its brief, assets, and structure.",
    contents: [
      "2025 Q1 CD ladder promo: email + branch, 4.9% response",
      "2025 HELOC spring push: 212 funded lines",
      "2024 dormant-checking win-back: 9.2% reactivation",
    ],
    readBy: ["Content and Language Optimization", "Campaign Production"],
  },
  {
    id: "approval-history",
    label: "Approval history",
    group: "memory",
    summary: "Who approved what, when, and with which notes.",
    contents: [
      "Chain: Marketer, then Compliance Officer, then VP Marketing",
      "Median approval turnaround: 6 business days (pre-OS)",
      "Common return reason: missing Reg DD fee disclosure",
    ],
    readBy: ["Compliance Pre-check", "Board Reporting"],
  },
  {
    id: "compliance-history",
    label: "Compliance history",
    group: "memory",
    summary: "Past findings, disclosures used, and exam notes.",
    contents: [
      "Zero advertising findings in last two NCUA exams",
      "Standard Reg DD disclosure block, last revised 2026-03",
      "Fair-lending review template for all targeted offers",
    ],
    readBy: ["Compliance Pre-check", "Fair-lending Segmentation"],
  },
  {
    id: "outcome-history",
    label: "Outcome history",
    group: "memory",
    summary: "What actually worked, written back after every campaign.",
    contents: [
      "Rate-led subject lines outperform benefit-led by 22% for savings offers",
      "SMS follow-up at day 3 lifts conversion 1.4x",
      "Best send window: Tuesday 10am local",
    ],
    readBy: ["Content and Language Optimization", "Measurement and Attribution"],
  },
  {
    id: "competitor-signals",
    label: "Competitor signals",
    group: "external",
    summary: "Local competitor rates, offers, and creative from public data.",
    contents: [
      "First Cascade Bank: 3.80% APY savings promo",
      "Rose City CU: 4.00% APY, $25,000 minimum",
      "Meridian National: 3.65% APY plus $200 checking bonus",
      "Umpqua Valley Bank: auto loans from 5.99% APR",
    ],
    readBy: ["Competitive and Rate Intelligence", "Campaign Production"],
  },
  {
    id: "market-signals",
    label: "Market signals",
    group: "external",
    summary: "Rate environment and demand signals for the region.",
    contents: [
      "National savings rate average: 3.42% APY",
      "Deposit competition index for the metro: elevated",
      "Auto-loan demand trending up 8% quarter over quarter",
    ],
    readBy: ["Competitive and Rate Intelligence", "Board Reporting"],
  },
];

export const RATE_TABLE = {
  product: "High-yield savings",
  apy: "4.25%",
  minimumToObtain: "$1,000",
  competitors: [
    { name: "First Cascade Bank", apy: "3.80%" },
    { name: "Rose City CU", apy: "4.00%" },
    { name: "Meridian National", apy: "3.65%" },
  ],
};

export const BRAIN_EDGES: BrainEdge[] = [
  { from: "core-data", to: "crm" },
  { from: "core-data", to: "campaign-history" },
  { from: "crm", to: "campaign-history" },
  { from: "brand-kit", to: "campaign-history" },
  { from: "rulebook", to: "compliance-history" },
  { from: "rulebook", to: "approval-history" },
  { from: "campaign-history", to: "outcome-history" },
  { from: "approval-history", to: "compliance-history" },
  { from: "competitor-signals", to: "market-signals" },
  { from: "outcome-history", to: "core-data" },
  { from: "competitor-signals", to: "campaign-history" },
  { from: "compliance-history", to: "campaign-history" },
];

// The node added live when Measurement writes back.
export const OUTCOME_NODE: BrainNode = {
  id: "outcome-hy-q3",
  label: "Outcome: HY savings Q3",
  group: "memory",
  summary: "Written back by Measurement and Attribution just now.",
  contents: [
    "42% open rate, 9.1% click rate [Modeled]",
    "312 new high-yield savings accounts [Modeled]",
    "$18.4M in balances moved [Modeled]",
    "Rate-led subject confirmed as winner for this segment",
  ],
  readBy: ["Content and Language Optimization", "Board Reporting"],
};
