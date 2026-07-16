/**
 * Commercial Banking (RM) page copy — extracted verbatim from
 * sub-landing/commercial-banking/src/routes/index.tsx (all sections) and
 * sub-landing/commercial-banking/src/routes/__root.tsx (meta/SEO copy).
 * Section map + adaptation notes: docs/content-map/commercial-banking-rm.md
 */

export const META = {
  title: "Commercial Banking — The Commercial Banking Orchestrator",
  // Source meta (168 chars) lightly compressed to ≤160; claims unchanged.
  description:
    "Madison prepares relationship managers for every client meeting — a decision-ready brief from emails, financials, and signals, on the systems you already run.",
};

export const HERO = {
  eyebrow: "Madison for Commercial Banking",
  headlineLead: "Grow the commercial book — ",
  headlineItalic: "without replacing your core.",
  subhead:
    "Madison is the agentic AI layer for commercial banking. More revenue capacity per relationship manager, faster and more consistent credit decisions, and portfolio risk you can see early — running on the systems you already run.",
  subheadEmphasis: "Live in weeks, not a multi-year transformation.",
  primaryCta: { label: "Become a design partner", href: "/#contact" },
  secondaryCta: { label: "Explore the workspaces", href: "#workspaces" },
  stats: [
    { label: "Prep time", value: "−72%" },
    { label: "Follow-up SLA", value: "<24h" },
    { label: "Deployed in", value: "6 wks" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=80",
    alt: "A relationship manager reviewing a client brief",
  },
};

export type BriefRow = { label: string; value: string; delta?: string };

export const LIVE_BRIEF = {
  chip: "Live client brief · 08:42",
  title: "Ashfield Logistics — Prep brief",
  signals: "Signals: 4 new",
  rows: [
    { label: "Revolver utilization", value: "83%", delta: "▲9pp" },
    { label: "Days sales outstanding", value: "64", delta: "▲7" },
    { label: "CFO sentiment (last 30d)", value: "Cautious" },
  ] satisfies BriefRow[],
  note: "Lead with the DSO conversation. Ashfield's Q3 board deck flagged a new distribution contract; ask about working-capital timing before pitching the FX hedge.",
};

export const TRUST_STRIP = {
  label: "Enterprise-ready by default",
  items: [
    "SOC 2 Type II",
    "ISO 27001",
    "EU data residency",
    "BYO-LLM",
    "Zero training on your data",
    "SSO / SAML",
  ],
};

export const HOW = {
  eyebrow: "How commercial banking works with Madison",
  title: "One relationship. One shared context. Every team moving together.",
  dek: "Madison carries context and coordinates work across the relationship—from the first conversation through credit, service, and portfolio growth.",
  stages: [
    {
      num: "01",
      stage: "Relationship",
      headline: "Start with the full picture.",
      body: "What changed, what matters now, and where to act next.",
    },
    {
      num: "02",
      stage: "Credit",
      headline: "Move credit without the chase.",
      body: "Gather information, prepare analysis, and coordinate review with context intact.",
    },
    {
      num: "03",
      stage: "Service",
      headline: "Get customer issues to the right people.",
      body: "Coordinate resolution across teams without making the RM the middleman.",
    },
    {
      num: "04",
      stage: "Portfolio",
      headline: "Know where to act.",
      body: "Surface emerging risk, growth opportunities, and next-best actions.",
    },
  ],
  flow: {
    label: "One relationship · end to end",
    nodes: ["Relationship", "Credit", "Service", "Portfolio"],
    contextTitle: "Shared customer context",
    contextBody: "CRM · emails · filings · credit files · service history",
    teams: ["RM", "Credit", "Risk", "Ops"],
  },
};

export const WEDGE = {
  eyebrow: "Where Madison fits",
  titleLines: ["Not a new core.", "Not another copilot."],
  dek: "Madison is the orchestration layer across your commercial bank—connecting people, workflows, and existing systems without replacing the infrastructure you already run.",
  cards: [
    { k: "Not", v: "A new core banking system", good: false },
    { k: "Not", v: "Another standalone AI copilot", good: false },
    { k: "Is", v: "An orchestration layer on your stack", good: true },
  ],
};

export type WorkspaceCapability = {
  name: string;
  headline?: string;
  body: string;
};

export type Workspace = {
  num: string;
  title: string;
  headline: string;
  body: string;
  insideLabel: string;
  capabilities: WorkspaceCapability[];
};

export const WORKSPACES = {
  eyebrow: "Commercial banking workspaces",
  title: "From relationship to credit to portfolio.",
  dek: "Start with the workflow that matters most. Each workspace connects people, context, and action on the same orchestration layer.",
  items: [
    {
      num: "01",
      title: "RM Copilot",
      headline: "Give every RM the full picture.",
      body: "Prepare for meetings, capture what matters, and keep every commitment moving.",
      insideLabel: "Inside RM Copilot",
      capabilities: [
        {
          name: "The Brief",
          body: "Know the relationship before the conversation.",
        },
        {
          name: "The Meeting",
          body: "Capture decisions, commitments, risks, and opportunities.",
        },
        {
          name: "The Follow-through",
          body: "Turn conversations into coordinated actions across the bank.",
        },
        {
          name: "The Relationship Plan",
          body: "Know where the relationship stands, what matters next, and where to deepen it.",
        },
      ],
    },
    {
      num: "02",
      title: "Credit",
      headline: "Move credit without the chase.",
      body: "Gather information, prepare analysis, and coordinate decisions with context intact.",
      insideLabel: "Inside Credit",
      capabilities: [
        {
          name: "The Opportunity",
          headline: "Start with the full picture.",
          body: "Capture the request, exposure, relationship context, and missing information.",
        },
        {
          name: "The Underwriting",
          headline: "Get to decision-ready faster.",
          body: "Analyze financials, surface risks, and prepare the credit narrative.",
        },
        {
          name: "The Decision",
          headline: "Move credit without the chase.",
          body: "Coordinate questions, revisions, and approvals with context intact.",
        },
        {
          name: "The Monitoring",
          headline: "Stay ahead after approval.",
          body: "Track covenants, conditions, and emerging risk.",
        },
      ],
    },
    {
      num: "03",
      title: "Client Service",
      headline: "Coordinate resolution across the bank.",
      body: "Route requests to the right teams, coordinate resolution, and keep everyone informed.",
      insideLabel: "Inside Client Service",
      capabilities: [
        {
          name: "The Request",
          headline: "Understand the need from the start.",
          body: "Bring together the request, relationship context, and relevant history.",
        },
        {
          name: "The Coordination",
          headline: "Get the right teams moving.",
          body: "Route work, assign owners, and coordinate dependencies.",
        },
        {
          name: "The Resolution",
          headline: "Drive the issue to an outcome.",
          body: "Track actions, decisions, and approvals through resolution.",
        },
        {
          name: "The Communication",
          headline: "Keep everyone informed.",
          body: "Give the RM and customer clear, timely updates.",
        },
      ],
    },
    {
      num: "04",
      title: "Portfolio Growth",
      headline: "Know where to act across the book.",
      body: "Surface emerging risk, growth opportunities, and the relationships that need attention.",
      insideLabel: "Inside Portfolio Growth",
      capabilities: [
        {
          name: "The Signal",
          headline: "See what changed.",
          body: "Surface meaningful shifts across financials, behavior, and relationship activity.",
        },
        {
          name: "The Priority",
          headline: "Know what matters now.",
          body: "Rank relationships by risk, opportunity, urgency, and value.",
        },
        {
          name: "The Opportunity",
          headline: "See where to grow.",
          body: "Identify wallet gaps, product needs, and moments to engage.",
        },
        {
          name: "The Action",
          headline: "Turn insight into action.",
          body: "Give the right person the context and next best step.",
        },
      ],
    },
  ] satisfies Workspace[],
  image: {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    alt: "Client meeting with banker",
  },
};

export const TRUST = {
  eyebrow: "Trust & sovereignty",
  title: "Built to pass second-line review.",
  dek: "Because your compliance team reads landing pages too — and we designed this one for them.",
  governance: {
    title: "Governance",
    items: [
      {
        h: "The banker always decides",
        b: "Madison prepares inputs. Credit, pricing, and relationship calls stay with your people.",
      },
      {
        h: "Auditable, always",
        b: "Every brief, note, and draft is versioned, attributable, and exportable to your evidence store.",
      },
      {
        h: "Human-in-the-loop by design",
        b: "No autonomous sends. No shadow decisions. Sign-off is a first-class citizen.",
      },
    ],
  },
  sovereignty: {
    title: "Sovereignty",
    items: [
      {
        h: "BYO-LLM",
        b: "Bring your Azure OpenAI, AWS Bedrock, or private deployment. Your keys, your logs, your controls.",
      },
      {
        h: "Your tenancy",
        b: "EU or in-country data residency. No cross-tenant training. Ever.",
      },
      {
        h: "Your systems",
        b: "Microsoft 365, Salesforce/Dynamics, nCino, S/4HANA, your data lake — additive, not replacement.",
      },
    ],
  },
  pack: {
    title: "Full security & compliance pack",
    body: "SOC 2 Type II, ISO 27001, DORA-aligned operational resilience, EBA guidelines on outsourcing, model risk documentation (SR 11-7 / EBA MRM), and reference DPIA.",
    cta: { label: "Request the pack", href: "/#contact" },
  },
};

export const OUTCOMES = {
  eyebrow: "The business case",
  titleLines: ["Measured. Attributed.", "Defensible."],
  dek: "Agree the baseline before deployment. Measure the change in production. Expand when the numbers make the case.",
  stats: [
    {
      value: "72%",
      label: "Less prep time",
      footnote: "More time for relationships.",
    },
    {
      value: "3.4×",
      label: "More prepared meetings",
      footnote: "Greater coverage with the same team.",
    },
    {
      value: "<24h",
      label: "Meeting to follow-through",
      footnote: "Less time between conversation and action.",
    },
    {
      value: "€4.2M",
      label: "Opportunity surfaced",
      footnote: "Across the measured portfolio.",
    },
  ],
  baseline:
    "Baseline before deployment. Measure in production. Attribute against agreed outcomes.",
};

export const ROADMAP = {
  eyebrow: "Roadmap",
  titleLines: ["Start with one workflow.", "Prove value in weeks."],
  dek: "Start with one high-value workflow, a focused team, and the systems needed to make it work. Measure the impact, then expand from proof.",
  steps: [
    {
      num: "01",
      meta: "Weeks 1–2",
      title: "Scope & connect",
      body: "Choose one workflow, one team, and the systems needed to deliver value.",
    },
    {
      num: "02",
      meta: "Weeks 3–4",
      title: "Go live",
      body: "Put the first workflow into production with the pilot team.",
    },
    {
      num: "03",
      meta: "Weeks 5–8",
      title: "Measure & refine",
      body: "Track adoption, capacity, speed, and business outcomes.",
    },
    {
      num: "04",
      meta: "From week 8",
      title: "Expand",
      body: "Extend to more teams, workflows, and shared context across the bank.",
    },
  ],
};

export const FAQ = {
  eyebrow: "FAQ",
  title: "The six questions your risk committee will ask.",
  items: [
    {
      question: "Do we need to replace our core banking system?",
      answer:
        "No. Madison is additive — it orchestrates on top of your existing core, CRM, and productivity stack.",
    },
    {
      question: "Does it record meetings?",
      answer:
        "Optional and consent-gated. Notes and decisions can be produced from a live transcript, an uploaded recording, or manual entry — never automatically.",
    },
    {
      question: "Does it make credit decisions?",
      answer:
        "No. Madison prepares inputs. Every credit, pricing, and relationship decision stays with a human, with a full audit trail.",
    },
    {
      question: "Which model powers it?",
      answer:
        "Yours. BYO-LLM against your Azure OpenAI, AWS Bedrock, or self-hosted deployment. Your keys, your logs, your controls.",
    },
    {
      question: "Which systems do you integrate with today?",
      answer:
        "Microsoft 365, Salesforce, Dynamics 365, nCino, SAP S/4HANA, Snowflake, and most modern data lakes. New connectors ship as part of design-partner scopes.",
    },
    {
      question: "How is data isolated?",
      answer:
        "Single-tenant deployment in your region of choice. No cross-tenant training. Ever.",
    },
  ],
};

export const CLOSING = {
  eyebrow: "Design-partner pilot",
  title: "See Madison on your bank's stack.",
  dek: "Bounded, below-tender, live in weeks. We work with a small number of banks per region — currently accepting three design partners for the next cohort.",
  actions: [
    { label: "Book a walkthrough", href: "/#contact" },
    { label: "Request the security pack", href: "/#contact" },
  ],
  expect: {
    label: "What to expect",
    items: [
      "30-minute working session with an RM on your team",
      "A live brief on one of your real (masked) clients",
      "Reference architecture for your CISO",
      "Scoping doc within 48 hours",
    ],
  },
};
