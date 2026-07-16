/**
 * Compliant Marketing — all page copy, verbatim from the
 * "Madison for Marketing" landing variant:
 *
 * - sub-landing/marketing-banking/app/landing-page/page.tsx (section order, meta)
 * - sub-landing/marketing-banking/components/madison/Hero.tsx (hero, trust bar)
 * - sub-landing/marketing-banking/components/madison/HeroConsole.tsx (live-run stages)
 * - sub-landing/marketing-banking/components/madison/Problem.tsx (problem, bottleneck)
 * - sub-landing/marketing-banking/components/madison/WhatItIs.tsx (flow, sample assets)
 * - sub-landing/marketing-banking/components/madison/Foundations.tsx (brain, trail)
 * - sub-landing/marketing-banking/components/madison/Agents.tsx (agents, composer, tiers)
 * - sub-landing/marketing-banking/components/madison/Governance.tsx (chips, audit, week one)
 * - sub-landing/marketing-banking/components/madison/UseCases.tsx (use cases, table)
 * - sub-landing/marketing-banking/components/madison/Ecosystem.tsx (stack, bigger picture)
 * - sub-landing/marketing-banking/components/madison/Closing.tsx (see it work, FAQ)
 *
 * See docs/content-map/compliant-marketing.md for line refs and adaptations.
 */

export const META = {
  title: "Compliant Marketing — Madison for Marketing",
  description:
    "Madison for Marketing turns a one-line brief into a compliant, launch-ready campaign, built on your own data, with a human approving every step.",
};

export const HERO = {
  eyebrow: "Madison for Marketing · The Agentic Banking OS",
  headline: "The marketing team you could never afford to hire.",
  subhead:
    "Madison for Marketing turns a one-line brief into a compliant, launch-ready campaign, built on your own data, with a human approving every step. Campaigns that took weeks now take days.",
  primaryCta: { label: "Request a demo", href: "/#contact" },
  secondaryCta: { label: "See a live run", href: "/demo" },
};

export type RunStageState = "done" | "waiting" | "queued";

export const HERO_RUN = {
  title: "Madison for Marketing · Live run",
  liveLabel: "Live",
  brief:
    "Launch our new 4.25% APY savings to customers and members with idle balances, Q3.",
  stages: [
    {
      name: "Brief Structurer",
      detail: "Objective, product, audience, and timing parsed from one line.",
      state: "done" as RunStageState,
    },
    {
      name: "Fair-lending Segmentation",
      detail:
        "4,182 customers and members matched, with fair-lending guardrails.",
      state: "done" as RunStageState,
    },
    {
      name: "Content Optimization",
      detail: "Six variants scored, the winner selected.",
      state: "done" as RunStageState,
    },
    {
      name: "Compliance Pre-check",
      detail: "Reg DD disclosure inserted before any human review.",
      state: "done" as RunStageState,
    },
    {
      name: "Human approves",
      detail: "Marketer first, then compliance, independently.",
      state: "waiting" as RunStageState,
    },
    {
      name: "Launch",
      detail: "Queued to your own send tools.",
      state: "queued" as RunStageState,
    },
  ],
};

export const TRUST_BAR = [
  "Runs inside your perimeter",
  "Reg DD and Reg Z checked on every asset",
  "A human approves every regulated step",
  "Exportable audit trail",
];

export const PROBLEM = {
  eyebrow: "The problem",
  title: "Same rulebook as the biggest banks. None of the staff.",
  paragraphs: [
    "Your marketing team is two to ten people. Every line of business, deposits, lending, cards, wealth, sends it work. Marketing produces every asset for every channel. And anything that states a rate or a term has to clear compliance and legal before it ships.",
    "So one campaign takes four to five weeks to reach launch. The delay is not creativity. It is coordination and clearance. You are running the same regulatory gauntlet as a hundred-billion-dollar bank, with a fraction of the people and no dedicated data analyst or compliance desk of your own.",
  ],
  quote: "The bottleneck is not the work. It is getting the work through the gate.",
  diagram: {
    lobs: ["Deposits", "Lending", "Cards", "Wealth", "Commercial"],
    marketing: { name: "Marketing", sub: "every asset, every channel" },
    gate: { name: "Compliance and Legal", duration: "4 to 5 weeks" },
    launch: { name: "Launch", sub: "one campaign finally clears" },
  },
};

export const REG_DD =
  "$1,000 minimum balance required to obtain the advertised APY. Fees could reduce earnings on the account. Insured by NCUA.";

export const WHAT_IT_IS = {
  eyebrow: "What it is",
  title: "One line in. A compliant, launch-ready campaign out.",
  dek: "Madison for Marketing takes a one-line brief and produces a segmented, multi-channel campaign that is already checked against your own compliance rulebook, built on your own customer and member data. Your team reviews and approves. Nothing regulated sends itself.",
  stages: [
    { name: "Brief", micro: "One line from the business." },
    { name: "Segment", micro: "Your data, with fair-lending guardrails." },
    { name: "Draft", micro: "On-brand copy for every channel." },
    {
      name: "Pre-clear",
      micro: "Checked against your rulebook, disclosures inserted.",
    },
    {
      name: "Human approves",
      micro: "Marketer, then compliance. Independently.",
    },
    { name: "Launch", micro: "Through the tools you already send from." },
  ],
  disclosureBadge: "Disclosure inserted",
  assets: {
    email: {
      kicker: "Email",
      subject: "Your money has been sitting still. 4.25% APY says move.",
      body: "You keep a healthy balance in checking. It deserves to earn more. Our new high-yield savings pays 4.25% APY (Annual Percentage Yield)...",
      disclosure: REG_DD,
    },
    landing: {
      kicker: "Landing hero",
      headline: "4.25% APY high-yield savings. Put idle money to work.",
      cta: "Open your savings",
      disclosure: REG_DD,
    },
    social: {
      kicker: "Social post",
      post: "Willamette CU: Your new high-yield savings is here. 4.25% APY. Open in the app in about a minute. Terms: willamettecu.example/hys",
      note: "In-app and social, same rulebook.",
    },
  },
};

export const FOUNDATIONS = {
  eyebrow: "The foundations",
  brain: {
    title: "One brain. Every agent reads it and writes back to it.",
    body: "Madison runs on one shared data layer for your institution: your CRM, your brand kit, your compliance rulebook, and the history of every campaign, approval, and outcome. Every agent works from the same source. There are no disconnected tools holding stale copies of your data.",
    hub: "One Brain",
    hubSub: "Shared data layer",
    fragments: [
      "Core data",
      "CRM",
      "Brand kit",
      "Policy and rulebook",
      "Campaign history",
      "Approval history",
      "Compliance history",
      "Outcome history",
    ],
  },
  work: {
    title: "It shows its work. You approve every regulated decision.",
    body: "Madison does not hand you a finished asset and ask you to trust it. It shows the full reasoning trail, step by step: what it checked, what it changed, and why. A human approves every regulated step, and every decision is logged for the exam.",
    panelTitle: "Reasoning trail",
    trail: [
      {
        kind: "flag" as const,
        label: "Flagged",
        text: "Draft states 4.25% APY without the Reg DD minimum-balance disclosure.",
      },
      {
        kind: "insert" as const,
        label: "Inserted",
        text: "$1,000 minimum balance required to obtain the advertised APY.",
      },
      {
        kind: "insert" as const,
        label: "Inserted",
        text: "Fees could reduce earnings on the account.",
      },
    ],
    gate: "Waiting on marketer approval",
  },
};

export const AGENTS = {
  eyebrow: "The agents",
  title: "Not one agent. An operating system of them.",
  dek: "Madison ships with a working set of marketing agents on day one. Over time it composes new ones from your own history, tuned to your disclosures, your tone, and your sign-off chain.",
  stockHeading: "Ships with the platform.",
  stock: [
    {
      name: "Campaign Production",
      desc: "Brief to compliant, launch-ready, multi-channel campaign.",
    },
    {
      name: "Compliance Pre-check",
      desc: "First-pass-clean drafts against your own rulebook.",
    },
    {
      name: "Fair-lending Segmentation",
      desc: "Audience segments with disparate-impact guardrails built in.",
    },
    {
      name: "Content and Language Optimization",
      desc: "On-brand, compliance-aware copy, scored and selected.",
    },
    {
      name: "Competitive and Rate Intelligence",
      desc: "A daily brief of local competitor rates, offers, and creative. No integration needed.",
    },
    {
      name: "Measurement and Attribution",
      desc: "Tracks outcomes, attributes lift, writes results back to the brain.",
    },
    {
      name: "Social and Reputation",
      desc: "Monitors and drafts responses within brand and compliance guardrails.",
    },
    {
      name: "Board and Exam Reporting",
      desc: "Exam-ready reporting straight from live activity.",
    },
  ],
  composer: {
    panelTitle: "Dynamic agent composer",
    heading: "Composed for your institution.",
    body: "Madison builds agents on the fly from your brain: your rulebook, brand kit, product catalog, past campaigns, approval chains, and outcome history. These compound with every campaign you run and are specific to your institution. The longer you run Madison, the more it knows that no competitor can copy.",
    fragmentsLabel: "Composed from brain fragments",
    fragments: [
      "Rulebook",
      "Brand kit",
      "Past campaigns",
      "Approval chain",
      "Outcome history",
    ],
    agent: {
      name: "Rate-change reactivation",
      tag: "dynamic agent · yours alone",
    },
  },
};

export const AUTONOMY = {
  eyebrow: "Autonomy",
  title: "Agentic up to the decision. Human at the decision.",
  dek: "You choose how much each agent does on its own, function by function. Madison keeps a human in the loop wherever it matters.",
  tiers: [
    {
      badge: "A",
      name: "Assist",
      desc: "A copilot to your team. It helps, you drive.",
    },
    {
      badge: "R",
      name: "Recommend",
      desc: "It prepares and drafts. Your team decides.",
    },
    {
      badge: "Au",
      name: "Automate",
      desc: "It runs end to end, with your team on exceptions and every regulated step still gated by a human approval.",
    },
  ],
  gate: "The human-approval gate is present across the range.",
};

export const GOVERNANCE = {
  eyebrow: "Governance and trust",
  title: "Built for the way you are regulated.",
  lead: "Trust is not a feature we added. It is the foundation. Every Madison agent runs with role-based access control, identity integration, and a native, exportable audit trail of what it read, what it did, and why. Nothing leaves your perimeter.",
  chipGroups: [
    {
      label: "United States",
      chips: ["SOC 2 Type II", "GLBA", "Model-risk aligned (SR 11-7)"],
    },
    {
      label: "Deployment",
      chips: [
        "Cloud, on-premises, or fully air-gapped",
        "VPC and isolated environments supported",
      ],
    },
    {
      label: "Marketing-specific",
      chips: [
        "Reg DD and disclosure checks",
        "Fair-lending disparate-impact guardrails",
        "UDAAP-aware language review",
      ],
    },
  ],
  cards: [
    {
      title: "Deploy on your terms.",
      body: "Your data and your inference stay inside your boundary.",
    },
    {
      title: "Exam-ready by default.",
      body: "Every send, edit, and approval is logged and exportable, so the trail an examiner asks for already exists.",
    },
  ],
  audit: {
    panelTitle: "Decision record",
    sub: "what it read, what it did, and why",
    exportLabel: "Export",
    rows: [
      {
        t: "10:02",
        actor: "Compliance Pre-check",
        action: "Read: rulebook (Reg DD), compliance history",
      },
      {
        t: "10:02",
        actor: "Compliance Pre-check",
        action: "Changed: inserted 2 disclosures, APY term statement",
      },
      {
        t: "10:04",
        actor: "Jordan Lee (Marketer)",
        action: "Approved package, routed to compliance",
      },
      {
        t: "10:09",
        actor: "Dana Okafor (Compliance)",
        action: "Second approval granted, launch unlocked",
      },
      {
        t: "10:10",
        actor: "Campaign Production",
        action: "Launched to 4,182 customers and members",
      },
      {
        t: "10:31",
        actor: "Measurement and Attribution",
        action: "Outcome written back to the brain",
      },
    ],
    foot: "Logged for exam readiness. The trail an examiner asks for already exists.",
  },
};

export const WEEK_ONE = {
  eyebrow: "Week one",
  title: "Value in week one. No integration to start.",
  lead: "You do not connect a single system to see Madison work. On day zero, the Competitive and Rate Intelligence agent runs against public data and delivers a daily brief of local competitor rates, offers, and creative. It is useful immediately, and it earns the trust to go deeper: on-data segmentation, compliant campaign production, and launch through your own tools.",
  ladder: [
    {
      name: "Land",
      desc: "Public competitor and rate intelligence. No integration, value in week one.",
    },
    {
      name: "Prove",
      desc: "Return weeks to your team, with a visible trail that de-risks the exam.",
    },
    {
      name: "Deepen",
      desc: "Connect your CRM and send tools. Campaigns move from brief to compliant launch inside Madison.",
    },
  ],
  feed: {
    panelTitle: "Daily brief · scanning public rate sheets",
    badge: "No integration required",
    rows: [
      {
        name: "First Cascade Bank",
        detail: "savings promo, unchanged 6 days",
        rate: "3.80% APY",
      },
      {
        name: "Rose City CU",
        detail: "$25,000 minimum to obtain",
        rate: "4.00% APY",
      },
      {
        name: "Meridian National",
        detail: "plus a $200 checking bonus, new this week",
        rate: "3.65% APY",
      },
      {
        name: "Umpqua Valley Bank",
        detail: "auto loans, billboard creative refreshed",
        rate: "5.99% APR",
      },
    ],
    opening:
      "Opening detected: a 4.25% APY offer would lead this market at a $1,000 minimum.",
  },
};

export const USE_CASES = {
  eyebrow: "What you can run",
  title: "The campaigns you already run, without the four-week wait.",
  items: [
    {
      name: "Deposit and rate campaigns",
      desc: "New APY, CD specials, money-market offers, with Reg DD disclosures inserted before you see the draft.",
    },
    {
      name: "Lending and loan promotions",
      desc: "HELOC, auto, mortgage refi, with fair-lending guardrails on every segment.",
    },
    {
      name: "Seasonal and always-on",
      desc: "Tax season, back-to-school, holiday, running on schedule without a scramble.",
    },
    {
      name: "Competitor rate response",
      desc: "A daily read on local rates and offers, so you react in a day, not a cycle.",
    },
    {
      name: "Compliance pre-clearance",
      desc: "First-pass-clean drafts against your own rulebook, before compliance ever opens them.",
    },
    {
      name: "Fair-lending-aware targeting",
      desc: "Segments built with disparate-impact checks so targeting is safe by construction.",
    },
    {
      name: "Board and exam reporting",
      desc: "Reporting generated from live activity, ready for the board packet and the examiner.",
    },
    {
      name: "Social and reputation",
      desc: "Monitored and drafted within your brand and compliance guardrails.",
    },
  ],
};

export const WHY_MADISON = {
  eyebrow: "Why Madison",
  title: "The only system that owns brief to compliant launch.",
  dek: "General AI writers generate copy. Marketing clouds send it. Compliance tools check it after it exists. Each owns a slice. Madison owns the job: brief to compliant launch, on your own data, with the reasoning shown and a human at every regulated decision.",
  columns: [
    "General AI writers",
    "Marketing cloud platforms",
    "Compliance-copy tools",
    "Madison for Marketing",
  ],
  rows: [
    {
      capability: "Generate on-brand content",
      cells: ["Yes", "Partial", "Partial", "Yes"],
    },
    {
      capability: "Review against your compliance rulebook",
      cells: ["No", "No", "Yes", "Yes"],
    },
    {
      capability: "Run the full brief-to-launch workflow",
      cells: ["No", "Partial", "No", "Yes"],
    },
    {
      capability: "Work on your own data, inside your perimeter",
      cells: ["No", "Partial", "No", "Yes"],
    },
    {
      capability: "Memory that compounds per institution",
      cells: ["No", "No", "No", "Yes"],
    },
    {
      capability: "Shows its reasoning, human approves each step",
      cells: ["No", "No", "Partial", "Yes"],
    },
    {
      capability: "Built for a $1B to $10B institution",
      cells: ["Partial", "No", "Partial", "Yes"],
    },
  ],
  moat: "A competitor can copy a workflow in a quarter. No one can copy your institution's own accumulated reasoning: every campaign, approval, and compliance decision, compounding on data that only you have. Add sovereign and on-premises deployment, and the case for ripping Madison out gets harder every month it runs.",
};

export const STACK = {
  eyebrow: "Works with your stack",
  title: "We integrate the tools you already trust.",
  dek: "Madison plugs into the systems your team and your examiners already know. It owns the workflow around them: strategy, brief, on-data segmentation, orchestration, and memory.",
  groups: [
    {
      name: "Your data and CRM",
      desc: "the systems of record you already run.",
    },
    {
      name: "Your send tools",
      desc: "Salesforce Marketing Cloud, Braze, Banno, and the platforms you launch from today.",
    },
    {
      name: "Specialist copy scoring",
      desc: "plugs into predictive language tools where you already trust them, inside the Madison flow.",
    },
    {
      name: "Distribution",
      desc: "available through the core-banking marketplaces where you already shop for software.",
    },
  ],
};

export const BIGGER_PICTURE = {
  eyebrow: "The bigger picture",
  title: "Marketing is where you start. Madison runs the rest of the bank too.",
  body: "Madison for Marketing runs on the same governed foundation that powers Madison across the institution: one shared brain, agent orchestration, and deployment inside your perimeter. Start with marketing, and the same platform extends to sales, service, and commerce, with no separate data forks and no second vendor to vet.",
  panelTitle: "Madison core · one governed foundation",
  nodes: [
    { label: "Marketing", tag: "live" as const },
    { label: "Sales", tag: "next" as const },
    { label: "Service", tag: "next" as const },
    { label: "Commerce", tag: "next" as const },
  ],
};

export const SEE_IT_WORK = {
  eyebrow: "See it work",
  title: "This is not a mockup. See it work.",
  line: "Type a brief, watch the agents produce a compliant, launch-ready campaign, and approve each step yourself. No setup, no integration, running on illustrative data for a demonstration market.",
  actions: [
    { label: "Request a demo", href: "/#contact" },
    { label: "See a live run", href: "/demo", variant: "outline" as const },
  ],
};

export const FAQ = {
  eyebrow: "FAQ",
  title: "The questions your compliance team will ask.",
  items: [
    {
      question: "Which model powers it?",
      answer:
        "Yours. BYO-LLM against your Azure OpenAI, AWS Bedrock, or a private deployment. Your keys, your logs, your controls.",
    },
    {
      question: "How is our data isolated?",
      answer:
        "Single-tenant deployment in your region. No cross-tenant training, ever. Your data is never used to train shared models.",
    },
    {
      question: "Can it send anything on its own?",
      answer:
        "No. The rules decide, the model drafts and explains, and a marketer then a compliance officer approve independently. You set the autonomy level per function.",
    },
    {
      question: "Do we replace our stack?",
      answer:
        "No. Madison is the layer on top of the core, CRM, and send tools you already run.",
    },
    {
      question: "Does our data leave our environment?",
      answer:
        "No. Madison runs inside your perimeter, in the cloud, on-premises, or fully air-gapped. Your data and your inference stay inside your boundary.",
    },
    {
      question: "Can an agent send a campaign on its own?",
      answer:
        "No regulated step sends itself. A marketer approves, then a compliance officer approves, independently. You set the autonomy level for every function, and a human stays in the loop wherever it matters.",
    },
    {
      question: "How fast do we see value?",
      answer:
        "Week one, with no integration. The Competitive and Rate Intelligence agent runs on public data from day zero. Deeper campaign production follows once you connect your CRM and send tools.",
    },
    {
      question: "What does this do for our exam?",
      answer:
        "Every send, edit, and approval is logged in a native, exportable audit trail of what each agent read, what it did, and why. The record an examiner asks for already exists.",
    },
    {
      question: "Does it replace our team or our agency?",
      answer:
        "No. It gives a two-to-ten-person team the output of a much larger one, and it returns the weeks you currently lose to coordination and clearance.",
    },
    {
      question: "How does it handle fair lending?",
      answer:
        "Segments are built with disparate-impact guardrails in place, so targeting is safe by construction rather than reviewed after the fact.",
    },
    {
      question: "What does it integrate with?",
      answer:
        "Your CRM and systems of record, your send tools such as Salesforce Marketing Cloud, Braze, and Banno, and specialist copy-scoring tools where you already use them.",
    },
  ],
};

/* ---- Credibility layer (added: hero metrics, positioning, business case,
   security depth, named integrations, weeks-based roadmap, what to expect).
   Writing rules: no em dashes, ranges use "to", inclusive "customers and
   members", no "pilot" (use "design-partner engagement"). ---- */

export const HERO_METRICS = [
  { value: "Weeks to days", label: "Campaign clearance" },
  { value: "1 brief", label: "In. A full compliant campaign out." },
  { value: "Week 1", label: "First value, zero integration" },
  { value: "Every send", label: "Human-approved before launch" },
];

export const TRUST_PRINCIPLE =
  "The rules decide. The model drafts and explains. A human approves.";

export const POSITIONING = {
  eyebrow: "Where Madison fits",
  cards: [
    { k: "Not", v: "Another AI content writer", good: false },
    { k: "Not", v: "A marketing cloud you rip and replace", good: false },
    {
      k: "Is",
      v: "The orchestration layer from brief to compliant launch, on your own data",
      good: true,
    },
  ],
};

export const BUSINESS_CASE = {
  eyebrow: "The business case",
  title: "Measured. Attributed. Defensible.",
  intro:
    "Agree the baseline before deployment. Measure the change in production. Expand when the numbers make the case.",
  tiles: [
    { value: "Weeks to days", label: "Time from brief to cleared launch" },
    {
      value: "Output of a larger team",
      label: "A team of two to ten ships like a big one",
    },
    {
      value: "Every regulated send gated",
      label: "Marketer, then compliance, independently",
    },
    { value: "Week one", label: "First value, with zero integration" },
  ],
  footnote:
    "Illustrative until baselined with your team. We measure against agreed outcomes in production.",
};

export const SECURITY = {
  eyebrow: "Security and governance",
  reviewerLine:
    "Built to pass second-line review. Your compliance team reads landing pages too, so we wrote this part for them.",
  blockA: {
    title: "Compliance checked on every asset",
    intro:
      "Each item is checked by the Compliance Pre-check agent before a human sees the draft.",
    checks: [
      "Truth in Savings: APY, minimum-balance, fee, and variable-rate disclosures (Reg DD for banks, Part 707 for credit unions).",
      "Truth in Lending: trigger-term detection for rate, payment, and term, with the required APR and repayment disclosures at equal prominence and close proximity (Reg Z, open-end and closed-end).",
      "UDAAP screening for unfair, deceptive, or abusive language.",
      "The FDIC Member statement and official digital sign for banks, the NCUA insured statement for credit unions, and non-deposit product disclosures where they apply.",
      "Fair-lending-aware segmentation with disparate-impact guardrails, and targeting that respects platform Special Ad Category limits for credit and housing ads (ECOA, Reg B, Fair Housing).",
      "CAN-SPAM for email and consent handling for SMS and calls (TCPA), per channel.",
      "WCAG accessibility checks on digital assets.",
    ],
    closer:
      "Every check is logged with the rule cited, so the trail an examiner asks for already exists.",
  },
  blockB: {
    title: "How Madison itself is secured",
    badges: [
      { label: "SOC 2 Type II" },
      { label: "ISO 27001" },
      { label: "GLBA" },
      { label: "Model-risk aligned (SR 11-7)" },
      { label: "PCI DSS (in scope, in progress)", inProgress: true },
    ],
    items: [
      "BYO-LLM: bring your Azure OpenAI, AWS Bedrock, or private deployment. Your keys, your logs, your controls.",
      "Zero training on your data. Ever.",
      "Single-tenant deployment in your region. No cross-tenant training.",
      "Role-based access control, SSO and identity (SAML, OIDC, SCIM), encryption in transit and at rest.",
      "Deploy in the cloud, in your VPC, on-premises, or fully air-gapped.",
    ],
  },
};

export const INTEGRATIONS = {
  eyebrow: "Works with your stack",
  title: "We integrate the tools you already trust.",
  dek: "Madison is the layer on top of the systems your team and your examiners already know. It owns the workflow around them: strategy, brief, on-data segmentation, orchestration, and memory.",
  groups: [
    {
      name: "Core banking",
      systems:
        "Fiserv, Jack Henry (SilverLake, CIF 20/20, Symitar Episys for credit unions), FIS, Finastra",
    },
    { name: "Digital banking", systems: "Banno, Q2, Alkami" },
    {
      name: "CRM and marketing",
      systems:
        "Salesforce Financial Services Cloud and Marketing Cloud, HubSpot, Total Expert, Braze, Adobe and Marketo",
    },
    { name: "Data and warehouse", systems: "Snowflake, Databricks" },
    {
      name: "Rate and competitive intelligence",
      systems:
        "Curinos, Competiscan, Mintel Comperemedia, plus Madison's own zero-integration public-data brief on day zero",
    },
    {
      name: "Copy scoring",
      systems: "Persado, inside the Madison flow where you already use it",
    },
    {
      name: "Your models",
      systems:
        "BYO-LLM against Azure OpenAI, AWS Bedrock, or a private deployment",
    },
    { name: "Distribution", systems: "the Fiserv and Jack Henry marketplaces" },
  ],
  note: "Madison sits on top of the estate you already run, never replacing it. Connectors are provisioned per engagement; availability depends on your existing subscriptions, data licenses, and approved connector setup.",
};

export const GTM_ROADMAP = {
  eyebrow: "Go to market",
  title: "Land in week one. Expand from proof.",
  dek: "Start with public intelligence and no integration, connect your stack, prove the numbers against a baseline, then expand.",
  steps: [
    {
      num: "01",
      meta: "Weeks 1 to 2 · Land",
      title: "Land",
      body: "Public competitor and rate intelligence. No integration, value in week one.",
    },
    {
      num: "02",
      meta: "Weeks 3 to 4 · Connect",
      title: "Connect",
      body: "Connect your CRM and send tools. First governed campaign, brief to compliant launch.",
    },
    {
      num: "03",
      meta: "Weeks 5 to 8 · Prove",
      title: "Prove",
      body: "Measure clearance time and output against the baseline. A visible trail that de-risks the exam.",
    },
    {
      num: "04",
      meta: "Week 8 onward · Expand",
      title: "Expand",
      body: "More channels, and dynamic agents that compound per institution.",
    },
  ],
};

export const WHAT_TO_EXPECT = {
  label: "What to expect",
  cohort: "We work with a small number of institutions per cohort.",
  items: [
    "A 30-minute working session with a marketer on your team",
    "A live run on one of your real, masked campaigns",
    "A reference architecture for your CISO",
    "A scoping document within 48 hours",
  ],
};
