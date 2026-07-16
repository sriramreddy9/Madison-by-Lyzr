/**
 * Deal Intelligence page copy — extracted verbatim from
 * sub-landing/madison-spotlight/index.html
 * ("Madison / Spotlight — Deal Intelligence for Banks").
 * See docs/content-map/deal-intelligence.md for the section-by-section map.
 *
 * LEGAL NOTE (code comment only — never surface on the page): every partner
 * name/wordmark referenced below — the data sources (PitchBook, S&P Capital
 * IQ, AlphaSense, CB Insights, Crunchbase, FactSet, Bloomberg, LSEG /
 * Refinitiv), the system integrators, banking innovation networks,
 * core/digital-banking marketplaces, and cloud platforms — is pending
 * Legal / Partner-Marketing clearance per the source README
 * (sub-landing/madison-spotlight/README.md): "Do not publish the partner
 * section externally until logo usage and name-drops have been cleared
 * with each named partner."
 */

export type SplitTitle = { main: string; thin: string };
export type DecisionWord = { text: string; accent?: boolean; muted?: boolean };

export const HERO = {
  eyebrow:
    "CorpDev / Strategy / Ventures / Innovation / Partnerships / Investment Banking",
  headline: "Deal Intelligence for Banks.",
  subhead:
    "Evaluate companies, partners, targets, and pitch opportunities with evidence, context, and institutional memory.",
  descriptionLead: "Madison / Spotlight",
  descriptionRest:
    " helps banks turn fragmented market data, internal documents, relationship history, and prior evaluations into decision-ready intelligence.",
  description2:
    "Built for CorpDev, Strategy, Strategic Partnerships, Ventures, Innovation, and Investment Banking teams, Madison / Spotlight helps banks answer:",
  decision: {
    label: "Every opportunity resolves to one call",
    words: [
      { text: "Partner.", accent: true },
      { text: "Invest." },
      { text: "Acquire." },
      { text: "Monitor." },
      { text: "Pass.", muted: true },
    ] as DecisionWord[],
  },
  evidenceLine:
    "With evidence-backed recommendations, human approval, and permissioned deal memory.",
  primaryCta: { label: "Request a Demo", href: "/#contact" },
  secondaryCta: { label: "Explore Integrations", href: "#stack" },
};

export const DATA_SOURCES = {
  eyebrow: "Built for how banks already work",
  title: {
    main: "An intelligence layer",
    thin: "that works with the systems banks already trust.",
  } as SplitTitle,
  copy: "Banks do not need another disconnected AI tool. Madison / Spotlight connects external market intelligence, internal bank context, and human decision workflows into one secure evaluation layer — designed to work with leading market and financial intelligence sources.",
  logos: [
    "PitchBook",
    "S&P Capital IQ",
    "AlphaSense",
    "CB Insights",
    "Crunchbase",
    "FactSet",
    "Bloomberg",
    "LSEG / Refinitiv",
  ],
  note: "Integrations depend on each bank's existing subscriptions, data licenses, and approved connector setup.",
};

export const WHITESPACE = {
  eyebrow: "01 · The white space",
  title: {
    main: "Banks have data.",
    thin: "They do not have decision intelligence.",
  } as SplitTitle,
  paragraphs: [
    "CorpDev, Strategy, Ventures, Strategic Partnerships, and Investment Banking teams already use market data platforms, research tools, CRM systems, internal decks, SharePoint folders, and prior memos.",
    "But the workflow is fragmented.",
  ],
  table: {
    head: ["Current State", "Business Impact"],
    rows: [
      [
        "External data sits in PitchBook, CapIQ, AlphaSense, CB Insights, and filings",
        "Analysts still have to manually connect the dots",
      ],
      [
        "Internal context sits in CRM, SharePoint, email, and prior decks",
        "Teams miss previous evaluations, relationships, and decisions",
      ],
      [
        "Memos and pitch decks are rebuilt from scratch",
        "High-value teams spend time formatting instead of deciding",
      ],
      [
        "Prior rejections, approvals, and leadership feedback are not reusable",
        "The next evaluation starts from zero",
      ],
      [
        "AI tools summarize documents but do not understand bank-specific decision history",
        "Outputs are faster, but not necessarily smarter",
      ],
    ],
  },
  punchLead: "Madison / Spotlight solves the missing layer — ",
  punchStrong: "the bank's own permissioned Deal Intelligence system.",
};

export const AGENT = {
  eyebrow: "02 · What Madison / Spotlight does",
  title: {
    main: "One brief in.",
    thin: "Decision-ready output out.",
  } as SplitTitle,
  brief:
    "“Evaluate this payments fintech as a potential partner for our commercial banking business.”",
  steps: [
    { num: "01", title: "Builds the company profile." },
    { num: "02", title: "Pulls external market and financial context." },
    {
      num: "03",
      title: "Maps the opportunity to the bank's strategic priorities.",
    },
    {
      num: "04",
      title: "Checks prior evaluations, memos, and relationship history.",
    },
    { num: "05", title: "Surfaces risks, objections, and unknowns." },
    {
      num: "06",
      title: "Recommends partner / invest / acquire / monitor / pass.",
    },
    {
      num: "07",
      title: "Produces a memo, one-pager, evidence pack, or pitch-style deck.",
    },
    { num: "08", title: "Sends the output for human review." },
    { num: "09", title: "Stores the decision in permissioned memory." },
  ],
  close:
    "The next evaluation starts smarter because the bank remembers the last one.",
};

export const WORKFLOWS = {
  eyebrow: "03 · Core workflows",
  title: {
    main: "Five banking deal-intelligence",
    thin: "workflows. One decision brain.",
  } as SplitTitle,
  head: ["Workflow", "Who Uses It", "What It Produces", "Why It Matters"],
  rows: [
    [
      "Strategic Company Evaluation",
      "CorpDev, Strategy, Ventures, Innovation",
      "Company profile, strategic fit, partner / invest / acquire / monitor recommendation",
      "Helps teams evaluate fintechs, vendors, targets, and ecosystem partners faster",
    ],
    [
      "Investment Banking Workbench",
      "Investment Banking, M&A, Capital Markets, Analysts",
      "Research synthesis, market landscape, buyer universe, pitch-style deck",
      "Reduces analyst effort in research-heavy pitch and deal-prep workflows",
    ],
    [
      "Bank-to-Bank Partnership Intelligence",
      "Strategy, Partnerships, CEO Office, CorpDev",
      "Bank profile, partnership thesis, synergy map, risk context",
      "Helps banks evaluate other banks for partnership, expansion, or collaboration",
    ],
    [
      "Vendor / Fintech Evaluation",
      "Digital Banking, CIO, COO, Innovation, Procurement",
      "Vendor brief, risk summary, strategic relevance, next action",
      "Supports modernization decisions across AI, payments, lending, fraud, risk, and regtech",
    ],
    [
      "Credit & Counterparty Evidence Support",
      "Risk, Credit, Treasury, Partnerships",
      "Ratings summary, counterparty brief, credit-readiness evidence pack",
      "Supports adjacent risk review without replacing the bank's credit-risk function",
    ],
  ],
};

export const STACK = {
  eyebrow: "04 · Designed around the banking stack",
  title: {
    main: "Not a replacement.",
    thin: "An intelligence layer that sits above.",
  } as SplitTitle,
  lede: "Madison / Spotlight reads across the systems banks already run — and produces outputs that ship back into those same systems.",
  head: ["Layer", "Systems", "Role"],
  rows: [
    [
      "Market & deal data",
      "PitchBook, S&P Capital IQ, CB Insights, Crunchbase, FactSet, Bloomberg, LSEG",
      "Company profiles, funding history, financials, deals, investors, comps, market signals",
    ],
    [
      "Research & knowledge",
      "AlphaSense, filings, analyst reports, news, expert calls",
      "Market synthesis, competitor intelligence, sector landscape, diligence context",
    ],
    [
      "CRM & relationships",
      "Salesforce, nCino, Microsoft Dynamics, HubSpot",
      "Prior relationships, relationship owners, deal status, account notes, outreach history",
    ],
    [
      "Documents & memory",
      "SharePoint, OneDrive, Box, Google Drive, Confluence, Notion",
      "Prior memos, board decks, evaluation notes, IC materials, strategy documents",
    ],
    [
      "Data infrastructure",
      "Snowflake, Databricks, BigQuery, Redshift",
      "Internal performance data, portfolio data, vendor data, strategic datasets",
    ],
    [
      "Outputs",
      "PowerPoint, Word, PDF, Excel, CRM records, watchlists",
      "Board-ready decks, memos, evidence packs, pipeline updates, structured reports",
    ],
    [
      "Governance",
      "SSO, RBAC, audit logs, data residency, model-risk controls",
      "Permissioned access, human approval, traceability, procurement readiness",
    ],
  ],
};

export const PARTNERS = {
  eyebrow: "05 · Implementation & ecosystem",
  title: {
    main: "Built with the partners",
    thin: "banks already trust.",
  } as SplitTitle,
  lede: "For enterprise and regulated banking deployments, implementation confidence matters as much as product capability. Madison / Spotlight is designed to be implemented with banking technology partners, system integrators, cloud providers, and ecosystem networks already serving financial institutions.",
  head: ["Partner Type", "Example Organizations", "How They Help"],
  rows: [
    [
      "Enterprise System Integrators",
      "Accenture, Deloitte, KPMG, PwC, EY, Capgemini, TCS, Infosys, Cognizant, Wipro, HCLTech, NTT DATA",
      "Enterprise deployment, banking transformation, data integration, model-risk alignment, change management",
    ],
    [
      "Regional / Mid-Market Advisors",
      "Slalom, Cornerstone Advisors, Datos Insights, community bank technology advisors",
      "Regional bank strategy, technology selection, implementation support, executive validation",
    ],
    [
      "Banking Innovation Networks",
      "Alloy Labs, BankTech Ventures, ICBA ThinkTECH, Finovate, Plug and Play Fintech",
      "Design partners, validation, bank introductions, fintech showcase opportunities",
    ],
    [
      "Core / Digital Banking Ecosystems",
      "Fiserv AppMarket, Jack Henry VIP, Q2 Innovation Studio, Temenos Exchange, nCino Partner Ecosystem, Backbase",
      "Distribution, embedded workflows, platform integrations, marketplace credibility",
    ],
    [
      "Cloud & Data Platforms",
      "AWS, Microsoft Azure, Google Cloud, Snowflake, Databricks",
      "Secure deployment, governed data access, bank-controlled infrastructure, analytics integration",
    ],
  ],
  note: "Partner availability, certification, and marketplace listings may vary by region, bank stack, and implementation phase.",
};

export const DIFFERENTIATION = {
  eyebrow: "06 · What makes Madison / Spotlight different",
  title: {
    main: "Ten capabilities.",
    thin: "One place they all live.",
  } as SplitTitle,
  columns: [
    "Market Data Tools",
    "Generic AI Tools",
    "Consulting Decks",
    "Madison / Spotlight",
  ],
  highlightCol: 3,
  rows: [
    { label: "External market data", cells: ["Yes", "Partial", "Yes", "Yes"] },
    { label: "Internal bank context", cells: ["No", "Limited", "Manual", "Yes"] },
    { label: "Prior evaluation memory", cells: ["No", "No", "No", "Yes"] },
    {
      label: "Partner / Invest / Acquire / Monitor recommendation",
      cells: ["No", "Weak", "Manual", "Yes"],
    },
    {
      label: "Evidence-backed memo",
      cells: ["Partial", "Partial", "Yes", "Yes"],
    },
    {
      label: "Pitch-style deck generation",
      cells: ["No", "Partial", "Yes", "Yes"],
    },
    {
      label: "Human approval workflow",
      cells: ["No", "Limited", "Manual", "Yes"],
    },
    { label: "Permissioned deal memory", cells: ["No", "No", "No", "Yes"] },
    {
      label: "Works across bank systems",
      cells: ["Limited", "No", "Manual", "Yes"],
    },
    {
      label: "Built for banking governance",
      cells: ["Partial", "Weak", "Manual", "Yes"],
    },
  ],
  bottom:
    "External data can be bought. Internal decision memory has to be earned, protected, and compounded.",
};

export const GOVERNANCE = {
  eyebrow: "07 · Governance-first by design",
  title: {
    main: "Explainable. Permissioned.",
    thin: "Reviewable.",
  } as SplitTitle,
  lede: "Madison / Spotlight is designed for regulated banking environments where AI must be explainable, permissioned, and reviewable — and where procurement, model-risk, and audit review are part of the buying process.",
  head: ["Governance Need", "Madison / Spotlight Approach"],
  rows: [
    [
      "Access control",
      "Role-based access, source-level permissions, retrieval-time checks",
    ],
    [
      "Internal data protection",
      "Bank-controlled data access, no cross-domain memory leakage",
    ],
    [
      "Human accountability",
      "Human review and approval before decisions are acted on",
    ],
    [
      "Auditability",
      "Every recommendation carries evidence, rationale, source trail, and approval state",
    ],
    [
      "Model-risk support",
      "Explainable reasoning, confidence indicators, review logs",
    ],
    [
      "Procurement readiness",
      "Designed for SOC 2, TPRM, deployment, and data residency review",
    ],
    [
      "Domain isolation",
      "CorpDev, IB, Risk, and Marketing memory remain separated",
    ],
  ],
  punch: "Reuse the rails. Protect the memory.",
};

export const DEPLOYMENT = {
  eyebrow: "08 · Deployment path",
  title: {
    main: "Start without integration.",
    thin: "Scale into the bank's environment.",
  } as SplitTitle,
  lede: "Madison / Spotlight can be deployed against uploaded documents and public data on day one, and grow into a fully integrated permissioned Deal Intelligence OS across the bank.",
  getsLabel: "The bank gets",
  phases: [
    {
      num: "Phase 01",
      title: "Design Partner Pilot",
      focus:
        "Uploaded documents, approved external data exports, public filings, sample workflows.",
      gets: "Company evaluation, memo, evidence pack, pitch-style deck.",
    },
    {
      num: "Phase 02",
      title: "Data Integration",
      focus: "PitchBook, CapIQ, AlphaSense, CRM, and SharePoint connectors.",
      gets: "Automated company profiles, prior evaluation retrieval, relationship context.",
    },
    {
      num: "Phase 03",
      title: "Workflow Integration",
      focus:
        "CRM write-back, deal watchlists, approval workflows, PowerPoint / PDF / Word outputs.",
      gets: "Repeatable decision workflow across CorpDev, Strategy, and IB.",
    },
    {
      num: "Phase 04",
      title: "Enterprise Deployment",
      focus:
        "SI-led implementation, cloud / VPC / on-prem options, governance controls.",
      gets: "Bank-wide permissioned Deal Intelligence OS.",
    },
  ],
};

export const DISTRIBUTION = {
  eyebrow: "09 · Distribution & channels",
  title: {
    main: "Where banks meet",
    thin: "Madison / Spotlight.",
  } as SplitTitle,
  lede: "Madison / Spotlight reaches banks through the innovation networks, data platforms, marketplaces, and system integrators they already work with — not cold email.",
  head: ["Motion", "Channel", "Purpose"],
  rows: [
    [
      "Design Partner Validation",
      "Alloy Labs, BankTech Ventures, ICBA ThinkTECH, Accenture",
      "Secure early bank feedback and pilot workflows",
    ],
    [
      "Data Integration Credibility",
      "PitchBook, S&P Capital IQ, AlphaSense, CB Insights",
      "Make evaluations trusted and source-backed",
    ],
    [
      "Marketplace Distribution",
      "Fiserv AppMarket, Q2 Innovation Studio, Jack Henry VIP, Temenos Exchange",
      "Reach banks through platforms they already use",
    ],
    [
      "Enterprise Implementation",
      "Accenture, Deloitte, KPMG, Capgemini, TCS, Infosys, Slalom",
      "Support enterprise deployments and procurement-heavy environments",
    ],
    [
      "Thought Leadership",
      "ABA, BAI, Finovate, The Financial Brand",
      "Build category awareness around Deal Intelligence for Banks",
    ],
  ],
};

export const START = {
  eyebrow: "10 · Start with one workflow",
  title: {
    main: "Strategic Company Evaluation.",
    thin: "The recommended starting point.",
  } as SplitTitle,
  briefLabel: "One brief in",
  brief: "“Evaluate this fintech, vendor, bank, or target.”",
  returnsLabel: "Madison / Spotlight returns",
  returns: [
    "Company profile",
    "Strategic fit analysis",
    "Risks and objections",
    "Recommendation",
    "Memo",
    "Evidence pack",
    "Pitch-style deck",
    "Next-action plan",
  ],
  expandLabel: "Then expand into",
  expandTitle: "The full Deal Intelligence OS.",
  expands: [
    "Investment Banking Workbench",
    "Bank-to-Bank Partnership Intelligence",
    "Vendor / Fintech Evaluation",
    "Credit and Counterparty Evidence Support",
    "Persistent institutional deal memory",
  ],
};

export const CLOSING_CTA = {
  eyebrow: "Design partner program · Now open",
  title: "Build your bank's Deal Intelligence layer.",
  sub: "Start with one workflow. Prove the loop. Expand into a full permissioned Deal Intelligence OS.",
  steps: [
    { num: "Step 01", title: "Start with one workflow." },
    { num: "Step 02", title: "Prove the loop." },
    { num: "Step 03", title: "Expand into Deal Intelligence OS." },
  ],
  actions: [
    { label: "Request a Demo", href: "/#contact" },
    {
      label: "Become a Design Partner",
      href: "/#contact",
      variant: "outline" as const,
    },
  ],
  punch: "The next deal should be smarter than the last.",
};
