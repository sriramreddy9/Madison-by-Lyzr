/**
 * Risk & Compliance page copy — extracted verbatim from
 * sub-landing/Madison-Banking-Site/index.html (674 lines). The journey rail,
 * comparison table, region panels, and the compliance marquee are injected at
 * runtime from JS arrays (script block, lines 515–671); they are hand-lifted
 * here into typed consts. Two documented adaptations required by the master
 * design law: the source's animated compliance MARQUEE renders as a static
 * badge row, and its animated stat COUNTERS render as static figures. Inline
 * <b>/<span class="big"> emphasis in the source strings is flattened to plain
 * text (meaning preserved); HTML entities are decoded. Section map:
 * docs/content-map/risk-compliance.md.
 */

export const META = {
  title: "Risk & Compliance — The Procurement & Risk Desk for Banks",
  description:
    "Agentic third-party risk, vendor-AI governance, and tested vendor exits — on-prem, sovereign, and examiner-ready. Built for how banks are regulated across North America, the EU, the Gulf, and India.",
};

export type IconKey =
  | "shield"
  | "bolt"
  | "lock"
  | "layers"
  | "key"
  | "doc"
  | "stop"
  | "plug"
  | "globe"
  | "gavel";

export const HERO = {
  eyebrow: "Madison · Banking, by Lyzr",
  headlineLead: "The procurement & risk desk, built ",
  headlineAccent: "deep into banking.",
  lead: "Agentic third-party risk, vendor-AI governance and tested vendor exits — on-prem, sovereign, examiner-ready. Built for how banks are actually regulated across North America, the EU, the Gulf and India.",
  primaryCta: { label: "Book a demo", href: "/#contact" },
  secondaryCta: { label: "See what we do", href: "#core" },
  regions: [
    "🌎 North America",
    "🇪🇺 European Union",
    "🕌 Gulf / GCC",
    "🇮🇳 India",
  ],
};

export const COCKPIT = {
  title: "Madison — Risk cockpit",
  live: "Live · on-prem",
  rows: [
    {
      label: "Third-party risk",
      value: "318 vendors governed · 2 FTEs",
      tag: "A−",
      tone: "success" as const,
    },
    {
      label: "Vendor-AI kill-switch",
      value: "Armed · SR 26-2 · RBI",
      tag: "Armed",
      tone: "brand" as const,
    },
    {
      label: "Exit test · AWS us-east-1",
      value: "Orderly + stressed · T+41d / $2.3M",
      tag: "✓ Passed",
      tone: "success" as const,
    },
  ],
  trust: ["On-prem", "SOC 2 Type II", "Audit ledger", "BYOK"],
};

/** Source compliance marquee (animated) → static badge row (motion law). */
export const COMPLIANCE_BADGES = [
  "SOC 2 Type II",
  "ISO 27001",
  "ISO 42001 · AI",
  "GDPR",
  "HIPAA",
  "PCI-DSS",
  "DORA-ready · EU",
  "FFIEC-aligned · US",
  "RBI IT-Outsourcing · India",
  "SAMA · CBUAE · Gulf",
  "DPDP · India",
  "On-prem · BYOK",
];
export const COMPLIANCE_LABEL =
  "Built to the standards banks are examined against";

export const WHY = {
  eyebrow: "Why Madison",
  titleLead: "Risk is the one line a bank ",
  titleAccent: "can never cut.",
  dek: "Every dollar a bank spends on third-party and model risk is legally required — board-level, examiner-driven, un-cuttable. Madison is the agentic desk that owns it.",
  cards: [
    {
      icon: "gavel" as IconKey,
      title: "Mandated demand",
      body: "2023 Interagency, DORA, RBI, SAMA & CBUAE all require it. Regulation is the buyer — demand survives every downturn.",
    },
    {
      icon: "bolt" as IconKey,
      title: "Real agents, not copilots",
      body: "Bounded-autonomy agents that assess, remediate and act — with a human on every material call. Not a chatbot that summarises.",
    },
    {
      icon: "lock" as IconKey,
      title: "On-prem & sovereign",
      body: "Runs inside your walls or in-country. Vendor, contract and model data never leaves. Decisive in the Gulf and India.",
    },
    {
      icon: "layers" as IconKey,
      title: "One desk, one data spine",
      body: "Land on third-party risk, expand into AI governance and exit-testing on the same vendor graph — one buyer, one deployment.",
    },
  ],
};

export const CORE = {
  eyebrow: "What Madison does",
  titleLead: "Third-party risk & vendor-AI, ",
  titleAccent: "run by agents.",
  dek: "The work examiners care about most — governing your vendors and the AI they embed — done continuously, safely, and inside your walls.",
  features: [
    {
      title: "Third-Party Risk Management",
      oneline:
        "A continuous, agentic vendor-risk loop so a 2-person team governs hundreds of vendors to examiner standard.",
      stats: [
        {
          value: "73%",
          label: "run vendor risk with ≤2 FTEs vs 300+ vendors",
          source: "Ncontracts 2025",
        },
        {
          value: "$4.91M",
          label: "avg third-party breach · 267 days to contain",
          source: "IBM 2025",
        },
        {
          value: "weeks → hours",
          label: "onboarding & due diligence, agent-run (illustrative)",
          source: "Deutsche Bank, Dec 2025",
        },
      ],
      compare: [
        {
          them: "Questionnaires & workflow, AI bolted on",
          us: "Agents that score, monitor & remediate",
        },
        {
          them: "Fixed scoring (BitSight / EcoVadis)",
          us: "Configurable scorecard the business owns",
        },
        {
          them: "Cloud-only SaaS",
          us: "On-prem / sovereign — data never leaves",
        },
        {
          them: "Manual exam-pack assembly",
          us: "Immutable ledger — the pack writes itself",
        },
      ],
      screen: {
        title: "madison · risk-intelligence",
        heading: "Third-party risk radar",
        chip: "318 vendors · continuous",
        head: ["Vendor", "Score", "Tier", "Status"],
        rows: [
          ["Amazon Web Services", "A− · 88", "Critical", "Monitored"],
          ["Datadog", "B · 74", "High", "Watch"],
          ["Finxact · core", "C · 61", "Critical", "Action"],
          ["Plaid", "A · 91", "Medium", "Monitored"],
        ],
        tones: ["success", "warning", "danger", "success"] as const,
        kpis: [
          { value: "12", label: "new signals today" },
          { value: "4", label: "reviews due" },
          { value: "1", label: "open exception" },
        ],
      },
    },
    {
      title: "Vendor-AI & Model-Risk Governance",
      oneline:
        "Discover, supervise and — when it breaches — stop the AI your vendors embed, with an immutable audit trail. Governing exactly what new model-risk rules left out of scope.",
      stats: [
        {
          value: "~3 in 4",
          label: "banks least-prepared on an AI kill-switch / failure reporting",
          source: "Wolters Kluwer / Am. Banker",
        },
        {
          value: "SR 26-2",
          label: "rewrote model risk (Apr 2026) — but excludes gen/agentic AI",
          source: "Federal Reserve",
        },
        {
          value: "kill-switch",
          label: "mandated on every AI model (India, Jun 2026)",
          source: "RBI draft MRM",
        },
      ],
      compare: [
        {
          them: "Attestation dashboards & registries",
          us: "Runtime supervision of vendor-embedded AI",
        },
        {
          them: 'Kill-switch "planned" or scoped to their own AI',
          us: "An enforceable, tested kill-switch",
        },
        {
          them: "Maps to old SR 11-7",
          us: "Mapped to SR 26-2, EU AI Act, RBI, CBUAE",
        },
        {
          them: "SaaS security, not bank-grade model risk",
          us: "MRM-grade + agentic + on-prem, one stack",
        },
      ],
      screen: {
        title: "madison · vendor-ai governance",
        heading: "Vendor-embedded AI · 24 models",
        chip: "SR 26-2 · EU AI Act · RBI",
        head: ["Model · vendor", "Use", "Status", "Control"],
        rows: [
          ["Einstein · Salesforce", "lead scoring", "Monitored", "Enabled"],
          ["Score API · FICO", "credit decisioning", "Drift", "Throttled"],
          ["LLM · VendorX", "doc summarize", "Blocked", "Kill-switch ✓"],
        ],
        tones: ["success", "warning", "danger"] as const,
        kpis: [
          { value: "Armed", label: "kill-switch" },
          { value: "3", label: "drift alerts" },
          { value: "100%", label: "actions logged" },
        ],
      },
    },
  ],
};

export const EXIT = {
  tag: "Operational resilience",
  titleLead: "Prove you can ",
  titleAccent: "leave a cloud",
  titleTail: " — before you have to.",
  body: "Turn untested paper exit clauses into generated, cost-modeled, stress-tested exit & continuity playbooks for critical vendors. A tested exit is the single control examiners cite most — and “untested” doesn't count. It reuses the same vendor graph, so it drops straight in.",
  chips: [
    { value: "$5.4B", label: "Fortune-500 cost of the CrowdStrike outage", source: "Parametrix" },
    { value: "19", label: "EU critical ICT providers named — AWS, Azure, Google", source: "ESAs, Nov 2025" },
    { value: "DORA Art. 28", label: "mandates a tested exit", source: "EUR-Lex" },
  ],
  cta: { label: "Test an exit", href: "/#contact" },
  screen: {
    title: "madison · exit & continuity",
    heading: "Exit test · AWS us-east-1",
    status: "Passed",
    kpis: [
      { value: "$2.3M", label: "migration cost" },
      { value: "T+41d", label: "recovery time" },
      { value: "2", label: "viable alternates" },
      { value: "82%", label: "continuity conf." },
    ],
    rows: [
      "Orderly playbook — generated",
      "Stressed (insolvency) playbook — stress-tested",
      "Examiner pack · DORA Art. 28 — ready",
    ],
  },
};

export type JourneyStep = {
  stage: string;
  title: string;
  cap: string[];
  diff: string[];
};

export const JOURNEY = {
  eyebrow: "The full journey",
  titleLead: "Every step of source-to-pay, ",
  titleAccent: "agentic.",
  dek: "Beyond the headline work, Madison runs the whole banking procurement journey — banking-configured by default (sanctions · DORA · KYB · FFIEC). Each step shows what it does and where we're different.",
  capLabel: "Capabilities",
  diffLabel: "How we're different",
  steps: [
    {
      stage: "Source-to-contract",
      title: "Conversational intake",
      cap: [
        "Plain-English request → agent classifies category, vendor & budget, and dedupes against 90 days of spend.",
        "Runs policy + sanctions at the front door.",
        "Routes by banking DOA tier (e.g. CFO+CPO co-sign).",
      ],
      diff: [
        "Sanctions & policy checked before a buyer ever sees it — Coupa/Ariba intake is a form that routes to a human.",
        "On-prem, so intake data never leaves the bank.",
      ],
    },
    {
      stage: "Source-to-contract",
      title: "Sourcing & negotiation",
      cap: [
        "Auto-shortlist internal + external vendors on a 40-attribute, bank-weighted matrix.",
        "Parallel negotiation agents, one per vendor.",
        "Human takeover the moment a thread stalls.",
      ],
      diff: [
        "Autonomous multi-vendor negotiation with a human-in-the-loop — incumbents run RFx workflow, not agents that negotiate.",
      ],
    },
    {
      stage: "Source-to-contract",
      title: "Contract redline & obligations",
      cap: [
        "Clause-by-clause agent redline against a bank clause library — DORA Art. 28/30, audit rights, exit.",
        "Flags missing mandatory clauses.",
        "Tracks obligations, SLAs & renewals.",
      ],
      diff: [
        "Redlines against regulator-mandated clause sets, on-prem — CLM incumbents (Icertis, Ironclad) are cloud copilots.",
      ],
    },
    {
      stage: "Govern & comply",
      title: "KYB & sanctions screening",
      cap: [
        "UBO trace via Sayari / D&B / court records.",
        "Continuous OFAC / EU / UN / UK / Canada screening.",
        "Auto-block on a confirmed hit.",
      ],
      diff: [
        "Continuous re-screening tied to the live vendor graph + auto-block — data vendors sell a feed, not an agent that acts.",
      ],
    },
    {
      stage: "Procure-to-pay",
      title: "Touchless AP & payment integrity",
      cap: [
        "Agentic 3-way match auto-clears clean invoices.",
        "Routes exceptions; optimises DPO.",
        "Blocks payment fraud at the point of pay.",
      ],
      diff: [
        "Sanctions + fraud re-checked at payment, not just at match; on-prem — AP incumbents (AvidXchange, Tipalti) are cloud.",
      ],
    },
    {
      stage: "Procure-to-pay",
      title: "Spend intelligence & forecasting",
      cap: [
        "Multi-horizon category forecasts with confidence bands.",
        "One-click-executable savings proposals.",
        "Budget & DOA aware.",
      ],
      diff: [
        "Proposals are executable — route to sourcing in a click — while analytics incumbents (Sievo, Coupa) only describe spend.",
      ],
    },
    {
      stage: "Govern & comply",
      title: "Regulatory intelligence",
      cap: [
        "Monitors 40+ sources — OCC · Fed · FDIC · EBA · FCA · MAS · RBI.",
        "Maps a new rule to affected vendors.",
        "Drafts remediation, routes to Legal + Risk.",
      ],
      diff: [
        "Closes the loop — rule → affected-vendor mapping → remediation task; horizon-scanners (CUBE, Corlytics) only alert.",
      ],
    },
    {
      stage: "Govern & comply",
      title: "Policy, DOA & approvals",
      cap: [
        "Policy engine simulates BLOCK / WARN / ROUTE / ALLOW.",
        "Enforces banking DOA tiers.",
        "Visual approval flows + FFIEC-ready audit trail.",
      ],
      diff: [
        "Policy simulation + bank DOA templates as code with an audit trail — incumbents hard-code approval chains, no what-if.",
      ],
    },
  ] satisfies JourneyStep[],
};

export const COMPARE = {
  eyebrow: "The gap we exploit",
  titleLead: "What the market ships — ",
  titleAccent: "vs what Madison does.",
  dek: "The incumbents are workflow and dashboards with AI bolted on. Madison is agentic, on-prem, and closes the loop.",
  head: ["Capability", "The market ships", "Madison does"],
  rows: [
    [
      "Vendor risk assessment",
      "Questionnaires + workflow, AI bolted on",
      "Agents that score, monitor & remediate",
    ],
    [
      "Deployment",
      "Cloud-only SaaS",
      "On-prem / VPC / sovereign — data never leaves",
    ],
    [
      "Monitoring",
      "Point-in-time score or annual review",
      "Continuous — ratings, news, filings; re-tier on change",
    ],
    [
      "Vendor exit",
      "A stored contract clause",
      "Generated & stress-tested orderly + stressed playbooks",
    ],
    [
      "Vendor-AI risk",
      "Attestation dashboards & registries",
      "Runtime supervision + an enforceable kill-switch",
    ],
    [
      "KYB & sanctions",
      "Point-in-time check, a data feed",
      "Continuous re-screening + auto-block, tied to the graph",
    ],
    [
      "Evidence for examiners",
      "Manual exam-pack assembly",
      "Immutable decision ledger — the pack writes itself",
    ],
  ],
};

export type Region = {
  flag: string;
  name: string;
  reg: string;
  why: string;
  stake: string;
  stakeSrc: string;
  deadline: string;
  deadlineSrc: string;
};

export const REGIONS = {
  eyebrow: "Global by design",
  titleLead: "One platform, ",
  titleAccent: "tuned to every regulator.",
  dek: "Same desk — the regulation, target segment and deployment adapt to each market.",
  whyLabel: "Why now",
  stakeLabel: "What's at stake",
  deadlineLabel: "Deadline / trigger",
  items: [
    {
      flag: "🌎",
      name: "North America",
      reg: "OCC · Federal Reserve · FDIC — 2023 Interagency Guidance; SR 24-2; SR 26-2 model-risk carve-out.",
      why: "Exam-driven. The SR 26-2 gen/agentic-AI gap is now the bank's own problem — no rulebook, full liability.",
      stake:
        "Consent orders, MRAs & civil-money penalties — and a $4.91M average third-party breach.",
      stakeSrc: "IBM 2025",
      deadline: "SR 26-2 in force Apr 2026; continuous exam cycles.",
      deadlineSrc: "Fed SR 26-2",
    },
    {
      flag: "🇪🇺",
      name: "European Union",
      reg: "DORA · EBA · EU AI Act — tested exits, subcontracting RTS, deployer duties.",
      why: "Register of Information live; first resilience-testing (TLPT) cycle in 2026; 19 critical ICT providers named.",
      stake:
        "EU AI Act fines up to €35M or 7% of global turnover; DORA oversight of critical providers.",
      stakeSrc: "EU AI Act · Art. 99",
      deadline: "DORA live since Jan 2025; first TLPT tests in 2026.",
      deadlineSrc: "EUR-Lex · DORA",
    },
    {
      flag: "🕌",
      name: "Gulf / GCC",
      reg: "SAMA · CBUAE — outsourcing rules, data localization, 'immediate cessation' of vendor AI.",
      why: "On-prem / in-country residency is mandated; sovereign-cloud programs make local deployment the default.",
      stake:
        "CBUAE penalties up to AED 1B; the regulator can force termination of a non-compliant vendor.",
      stakeSrc: "CBUAE",
      deadline: "AI guidance issued Feb 2026; data residency required now.",
      deadlineSrc: "CBUAE rulebook",
    },
    {
      flag: "🇮🇳",
      name: "India",
      reg: "RBI — IT-Outsourcing Directions; draft MRM mandates an AI kill-switch (Jun 2026).",
      why: "Strongest near-term AI mandate globally; the board is personally accountable for third-party & model risk.",
      stake:
        "RBI monetary penalties + board-level accountability for outsourcing & AI failures.",
      stakeSrc: "RBI IT-Outsourcing",
      deadline: "10 Apr 2026 compliance cliff; AI kill-switch mandate (Jun 2026).",
      deadlineSrc: "RBI draft MRM",
    },
  ] satisfies Region[],
};

export const SECURITY = {
  eyebrow: "Security & sovereignty",
  titleLead: "Enterprise-grade, examiner-ready, ",
  titleAccent: "in your control.",
  dek: "The reason banks trust an agent with vendor and model risk: it never gives up control.",
  cards: [
    {
      icon: "lock" as IconKey,
      title: "On-prem / VPC / air-gapped",
      body: "Deploy inside your infrastructure or in-country. Data residency for DORA, DPDP, SAMA & CBUAE out of the box.",
    },
    {
      icon: "key" as IconKey,
      title: "BYOK · SOC 2 · ISO 27001",
      body: "Bring your own keys; SOC 2 Type II, ISO 27001 & ISO 42001-aligned AI management. Encrypted in transit and at rest.",
    },
    {
      icon: "doc" as IconKey,
      title: "Immutable decision ledger",
      body: "Every agent action and human decision is cited, timestamped and tamper-evident — the exam pack writes itself.",
    },
    {
      icon: "stop" as IconKey,
      title: "Human-in-the-loop & kill-switch",
      body: "Recommend-then-act policy bands; a tested kill-switch on any model — matching RBI & CBUAE mandates.",
    },
    {
      icon: "plug" as IconKey,
      title: "Integrates, doesn't rip-and-replace",
      body: "Sits on top of SAP, ServiceNow, Archer, ratings feeds and your ERP — augmenting, not replacing, the estate.",
    },
    {
      icon: "globe" as IconKey,
      title: "Sovereign AI, your models",
      body: "Run open or private models inside your boundary. No vendor lock-in, no data leaving the perimeter.",
    },
  ],
};

/** Source animated counters → static figures (motion law). */
export const STATS = [
  {
    value: "73%",
    label: "of banks run vendor risk with ≤2 FTEs vs 300+ vendors",
    source: "Ncontracts 2025",
  },
  {
    value: "267d",
    label: "to contain a third-party breach · $4.91M average",
    source: "IBM 2025",
  },
  {
    value: "14%",
    label: "of firms trust their questionnaires reflect real risk",
    source: "RiskRecon / Cyentia",
  },
  {
    value: "~3 in 4",
    label: "banks unprepared on an AI kill-switch / failure reporting",
    source: "Wolters Kluwer / Am. Banker",
  },
];

export const CTA = {
  titleLead: "Be the bank that's ",
  titleAccent: "un-removable",
  titleTail: " on risk.",
  sub: "See Madison run your vendor risk, govern your vendors' AI, and prove a tested exit — on your own infrastructure. Design-partner slots are open across NA, EU, Gulf & India.",
  actions: [
    { label: "Book a demo", href: "/#contact" },
    { label: "Talk to the team", href: "/#contact", variant: "outline" as const },
  ],
};
