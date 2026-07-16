/**
 * Dispute Resolution (Mortgage Servicing) — all page copy, verbatim from
 * sub-landing/madison-mortgage-servicing-landing/index.html (590 lines,
 * single file). Section-by-section line refs live in
 * docs/content-map/dispute-resolution.md.
 */

/** Inline-rich copy: plain runs + <strong> runs (source <b> tags). */
export type RichPart = string | { strong: string };
export type RichText = RichPart[];

export const DEMO_URL = "https://mortgage-dispute-manager.onrender.com";

export const META = {
  title: "Dispute Resolution — Mortgage Servicing, RESPA-Ready",
  description:
    "Agentic dispute resolution for US banks & credit unions. The model drafts, your rulebook decides, a person signs — every dispute inside the RESPA window.",
};

/* ------------------------------ Hero (303–355) ------------------------------ */

export const HERO = {
  eyebrow: "Agentic dispute resolution · US banks & credit unions",
  headline1: "Every servicing dispute answered on time —",
  headline2: "your team holds the pen.",
  lead: "Agents investigate and draft on your loan data. Your team makes the call. The 30-day scramble becomes a same-week sign-off.",
  primaryCta: { label: "Book a demo", href: "/#contact" },
  secondaryCta: { label: "See a live run", href: "#run" },
  microTrust: [
    "RESPA & TRID by construction",
    "Human on every verdict",
    "Sovereign / on-prem",
  ],
};

export const DECISION_INBOX = {
  panelTitle: "decision inbox · one verdict, awaiting you",
  case: {
    title: "Escrow shortage — payment jumped",
    meta: "L-1003 · Aisha Khan · RESPA · day 3 of 30",
    severity: "High",
  },
  outcomeLabel: "Recommended outcome",
  outcome: "Resolve — waive fee, re-send analysis",
  body: "Tax increase raised the payment; the annual statement went out late. Waive the $240 late fee, re-issue the analysis.",
  recompute: "Verdict recomputed server-side against your rulebook",
  awaiting: {
    title: "Awaiting your sign-off",
    sub: "Nothing has been sent to the borrower.",
  },
  gates: ["Approve & send", "Edit draft", "Refer to specialist"],
};

/* -------------------------- Trust strip (357–371) --------------------------- */

export const TRUST_STRIP = {
  chips: [
    "The model never decides",
    "Full audit trail on every action",
    "Runs inside your perimeter",
    "Built for a $1–10B servicer",
  ],
  regLabel: "Built around the rules that govern servicing",
  regPills: [
    "RESPA",
    "TRID",
    "ECOA",
    "GLBA",
    "FCRA",
    "CFPB supervision",
    "SR 11-7 model risk",
  ],
};

/* ---------------------------- The clock (373–390) --------------------------- */

export const CLOCK = {
  eyebrow: "Why this is urgent",
  title: "The RESPA clock starts the moment a borrower writes in.",
  dek: "Acknowledge in 5 days, resolve in 30 — miss it and it's cures, fines, and a CFPB finding. Most servicers still work it by hand.",
  pains: [
    {
      lead: "The clock you can't stop.",
      text: "The RESPA window runs whether or not you're staffed for it.",
    },
    {
      lead: "The exam you can't fail.",
      text: "Every decision has to stay defensible to the CFPB, months later.",
    },
    {
      lead: "The queue you can't see.",
      text: "Disputes pile up in inboxes — or inside a subservicer you can't watch.",
    },
  ],
  stats: [
    {
      value: "26,100",
      label: "Mortgage complaints to the CFPB in 2024 — mostly the payment process.",
      footnote: "CFPB Consumer Response, 2024",
    },
    {
      value: "5 / 30 days",
      label: "The clock you're already on — acknowledge in 5 business days, resolve in 30.",
      footnote: "12 CFR 1024.35 (RESPA)",
    },
    {
      value: "8.9×",
      label: "A non-performing loan costs $1,573 to service vs $176 — that gap is disputes.",
      footnote: "MBA Servicing Study, 2024",
    },
  ],
};

/* ---------------------------- Outcomes (392–404) ---------------------------- */

export const OUTCOMES = {
  eyebrow: "What changes",
  title: "What you get back.",
  dek: "The same figures that measure your exposure, read the other way — the value of closing disputes fast and preventing the next one.",
  cards: [
    {
      figure: "$1,397",
      body: "The extra cost of servicing a loan once it turns non-performing — $1,573 vs $176. Fast resolution and upstream prevention keep loans performing.",
      source: "MBA Servicing Study, 2024",
    },
    {
      figure: "Inside 30 days",
      body: "Every dispute acknowledged in 5 and resolved in 30 — SLA breaches, cures and CFPB findings off the table.",
      source: "12 CFR 1024.35 (RESPA)",
    },
    {
      figure: "A shrinking queue",
      body: "Disputes caught upstream never land — the inflow falls instead of climbing past 26,100 complaints a year.",
      source: "CFPB Consumer Response, 2024",
    },
  ],
};

/* ------------------------ How it stays safe (406–421) ----------------------- */

export const SAFE = {
  eyebrow: "Built for the compliance signature",
  title: "The model never decides. Your rulebook does.",
  dek: "The AI reads and drafts. The decision is a deterministic call on your rules — recomputed server-side, human-approved, fully logged.",
  steps: [
    {
      num: "01",
      title: "Rules decide",
      body: "Your rulebook scores the case — not the LLM.",
    },
    {
      num: "02",
      title: "The model drafts",
      body: "Explains, cites the loan file, writes the response.",
    },
    {
      num: "03",
      title: "Server recomputes",
      body: "Feed it a wrong answer — nothing changes.",
    },
    {
      num: "04",
      title: "A person approves",
      body: "Every action waits in the Decision Inbox for sign-off.",
      highlighted: true,
    },
    {
      num: "05",
      title: "Everything is logged",
      body: "Provenance on every figure. Audit-ready.",
    },
  ],
  govline: {
    lead: "The LLM never touches the decision.",
    strong: "Rules decide, the server recomputes, a human approves — all auditable.",
    tail: "That property is the product.",
  },
};

/* ------------------------- Prevent / Resolve (423–457) ---------------------- */

export const LOOP = {
  eyebrow: "Two halves of the same problem",
  title: "Shrink the inflow. Speed the outflow.",
  dek: "Point tools clean up disputes after they land. One agentic layer over your data works both ends — prevent and resolve.",
  halves: [
    {
      tag: "Upstream · Prevent",
      heading: "Catch the error before the borrower writes in.",
      desc: "Flag the mistakes that become disputes — while they're still cheap to fix.",
      items: [
        "TRID tolerance breaches, before the cure window closes",
        "Wrong or duplicate fees on the statement",
        "Escrow miscalcs after a tax or insurance change",
        "Missing or stale docs in the loan file",
      ],
      foot: "The cheapest dispute is the one that never happens.",
    },
    {
      tag: "Downstream · Resolve",
      heading: "Work every dispute that lands, inside the window.",
      desc: "One clean path from raw complaint to compliant resolution — carried end to end, not scored and dropped.",
      items: [
        "Intake, classify against the rule, pull the loan file",
        "Decide on your rulebook, draft the response",
        "Compliance pre-check, then human sign-off",
        "Response filed — every step logged",
      ],
      foot: "Every dispute closed inside the window — a person on every verdict.",
    },
  ],
  note: {
    strong: "Most vendors sell you the right column.",
    tail: "Owning both is how the queue actually shrinks.",
  },
};

/* ---------------------------- See it run (459–491) -------------------------- */

export const RUN = {
  eyebrow: "Watch one run",
  title: "One dispute, start to filed.",
  dek: "A real escrow-shortage case, end to end — every figure sourced, the verdict recomputed, a person on the sign-off.",
  panelTitle: "mortgage-servicing · complaint resolution · L-1003",
  steps: [
    { label: "Classified — escrow shortage", status: "rule-matched" },
    { label: "Pulled loan file & escrow analysis", status: "sourced" },
    { label: "Root cause — tax increase + late statement", status: "provenance" },
    { label: "Drafted borrower response + fee waiver", status: "draft" },
    {
      label: "Awaiting human sign-off · Decision Inbox",
      status: "day 3/30",
      highlighted: true,
    },
  ],
  outcomeLabel: "Recommended outcome",
  outcomeBadge: "Resolve (draft)",
  outcomeBody:
    "Waive the $240 late fee, re-send the corrected escrow analysis, explain the change in plain language.",
  outcomeNote: "Queued for approval — nothing sent yet.",
  recompute: "Recomputed against the rulebook · resolves inside the window",
  primaryCta: { label: "Open the live demo", href: DEMO_URL },
  secondaryCta: { label: "Book a walkthrough", href: "/#contact" },
};

/* ---------------------------- Onboarding (493–508) -------------------------- */

export type StackIconKey = "plug" | "audit" | "lock" | "eye" | "users" | "bolt";

export const STACK = {
  eyebrow: "Onboarding",
  title: "It rides on the stack you already run.",
  dek: "No rip-and-replace, no AI team, no data leaving your perimeter. It reads your systems and files into your tools.",
  cards: [
    {
      icon: "plug" as StackIconKey,
      title: "Reads your systems of record",
      body: "Core, servicing platform, LOS — read as a layer, never replaced.",
      chips: ["Fiserv", "Jack Henry", "FIS", "ICE / Black Knight MSP", "Encompass"],
    },
    {
      icon: "audit" as StackIconKey,
      title: "Files into your workflow",
      body: "Cases and audit records sync into the trackers you already use.",
      chips: ["Jira", "ServiceNow", "your case system"],
    },
    {
      icon: "lock" as StackIconKey,
      title: "Your data stays yours",
      body: "Sovereign / on-prem. Runs on your data — nothing leaves the perimeter.",
      chips: ["on-prem", "VPC", "no data egress"],
    },
    {
      icon: "eye" as StackIconKey,
      title: "Works with your subservicer",
      body: "Outsourced servicing? Visibility and control back — without pulling it in-house.",
      chips: ["subservicer oversight"],
    },
    {
      icon: "users" as StackIconKey,
      title: "No headcount, no build",
      body: "Buy it, don't build it. No AI engineers, no spare compliance capacity.",
      chips: ["buy, not build"],
    },
    {
      icon: "bolt" as StackIconKey,
      title: "Live in a week, on synthetic data",
      body: "Synthetic data that mirrors your book — prove it before a single integration.",
      chips: ["week-1 pilot", "no integration to start"],
    },
  ],
};

/* ------------------------------- FAQ (510–524) ------------------------------ */

export const FAQ: {
  eyebrow: string;
  title: string;
  items: { question: string; answer: RichText }[];
} = {
  eyebrow: "Straight answers",
  title: "What servicing leaders ask us.",
  items: [
    {
      question: "What if the AI gets it wrong?",
      answer: [
        "It can't. The verdict is ",
        { strong: "recomputed server-side against your rules" },
        ", and a person approves every action. The model only drafts.",
      ],
    },
    {
      question: "Does this replace my team?",
      answer: [
        "No — it kills the busywork so your specialists spend time on judgment. ",
        { strong: "Your team owns every decision." },
        " No new headcount.",
      ],
    },
    {
      question: "Where does our data live?",
      answer: [
        "Inside your perimeter. Sovereign / on-prem — ",
        { strong: "nothing leaves the institution" },
        ", no training on your data, no egress.",
      ],
    },
    {
      question: "How does it hold up in a CFPB exam?",
      answer: [
        "Built for it. Human-in-the-loop, a ",
        { strong: "full audit trail" },
        ", provenance on every figure — show exactly how each dispute was decided and who signed off.",
      ],
    },
    {
      question: "Do we have to replace our MSP?",
      answer: [
        "No. It's a layer on top of your servicing platform, core and LOS. ",
        { strong: "Nothing gets ripped out." },
      ],
    },
    {
      question: "How fast can we see it on our disputes?",
      answer: [
        "A 30-minute walkthrough on synthetic data that mirrors your book — ",
        { strong: "no integration to start" },
        ". Bring your hardest dispute.",
      ],
    },
  ],
};

/* ---------------------------- Is this you (526–548) ------------------------- */

export const WHO = {
  eyebrow: "Is this you?",
  title: "Built for the desk that carries the dispute.",
  checklist: [
    "You own the RESPA SLA and the CFPB exposure — and feel the 30-day clock.",
    "Your compliance officer won't sign anything that decides without a human.",
    "No headcount to add, no AI team to build it in-house.",
    "Disputes are worked by hand — or sit in a subservicer you can't see into.",
  ],
  profileLabel: "Who it fits",
  profile: [
    { label: "Institution", value: "US bank or credit union" },
    { label: "Size", value: "$1–10B in assets" },
    { label: "Owner", value: "Head of Mortgage & Default Servicing" },
    { label: "Co-signer", value: "Chief Compliance / Risk Officer" },
    { label: "Autonomy", value: "Recommend — human approves" },
  ],
};

/* ------------------------------- Book (550–562) ----------------------------- */

export const BOOK = {
  eyebrow: "Get started",
  title: "See it on your own dispute types.",
  line: "30 minutes on synthetic data that mirrors your book — no integration to start. Bring your hardest dispute.",
  actions: [
    { label: "Book a demo", href: "/#contact" },
    { label: "Explore the product", href: DEMO_URL, variant: "outline" as const },
  ],
};
