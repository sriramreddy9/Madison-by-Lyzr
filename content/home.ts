/**
 * Homepage copy — extracted verbatim from
 * sub-landing/Madison Landing 2/index.html (see CONTENT-MAP.md).
 */

export const HERO = {
  eyebrow: "The Agentic Banking OS",
  headline: "Madison helps run your bank.",
  subhead: "Governed AI agents across every banking function.",
  support: "One platform. Your data, your perimeter, your control.",
  primaryCta: { label: "Request a demo", href: "#contact" },
  secondaryCta: { label: "Explore the platform", href: "#platform" },
  jump: { label: "Or jump to your team", href: "#for-your-team" },
  chips: [
    "Governed by design",
    "Runs in your perimeter",
    "Human in the loop",
    "Exportable audit trail",
  ],
  image: {
    src: "/images/architecture/glass-towers.jpg",
    alt: "",
  },
};

export const PROOF = {
  eyebrow: "In pilot and production",
  names: [
    "Meridian National",
    "Ashford Capital",
    "Continental Trust",
    "Harborview Credit Union",
    "Vantage Bancorp",
    "Northwind Financial",
  ],
  caption:
    "Illustrative wordmarks — customer names published only with signed approval.",
};

export const COVERAGE = {
  eyebrow: "Front-to-back coverage",
  title: "One platform, from the front office to the back.",
  dek: "Madison deploys agents across the full operating stack of a bank. Not a single point solution, but coverage end to end.",
  pillars: [
    {
      index: "01",
      name: "Front Office",
      role: "Client-facing revenue & relationships.",
      chips: ["Onboarding", "RM & advisor copilot", "Lending support", "Engagement"],
    },
    {
      index: "02",
      name: "Middle Office",
      role: "Risk, compliance & control.",
      chips: ["KYC/CDD", "AML triage", "Credit review", "Covenant & liquidity monitoring"],
    },
    {
      index: "03",
      name: "Back Office",
      role: "Processing, settlement & servicing.",
      chips: ["Reconciliation", "Disputes & chargebacks", "Payment exceptions", "Loan servicing"],
    },
    {
      index: "04",
      name: "Corporate",
      role: "Running the institution.",
      chips: ["Regulatory reporting", "Forecasting", "Vendor/TPRM review", "Contract analysis"],
    },
  ],
  autonomyLead:
    "Our agents work at the right level of autonomy for each function — they assist, recommend, or automate. You set the level; Madison keeps a human in the loop wherever it matters.",
  autonomy: [
    { badge: "A", name: "Assist", line: "A copilot to your experts." },
    { badge: "R", name: "Recommend", line: "Prepares and drafts; your team decides." },
    { badge: "Au", name: "Automate", line: "Runs end to end, humans on exceptions." },
  ],
};

export const ICP_ROUTER = {
  eyebrow: "For your team",
  title: "Find the agent built for your work.",
  dek: "Ten teams, ten destinations. Every card links to a dedicated page with the metrics, integrations, and deployment notes for that function.",
};

export const SOLUTIONS = {
  eyebrow: "Solutions",
  title: "Ten shipping teams. One governed platform.",
  dek: "Every card links to a dedicated page for that team — the metrics, integrations, and deployment notes for how Madison runs there.",
};

export const DEMO = {
  eyebrow: "Experience Madison",
  title: "See Madison at work.",
  dek: "Watch a governed agent take a real banking task from intake to a completed, audit-ready result.",
  caption: "[demo video placeholder] · 2:14",
  highlights: [
    { num: "01", line: "A dispute resolved end to end." },
    { num: "02", line: "Every step cited and logged." },
    { num: "03", line: "A human approval gate in action." },
  ],
  cta: { label: "Request a live demo", href: "#contact" },
};

export const GOVERNANCE = {
  eyebrow: "Governance & sovereignty",
  title: "Built for the way banks are regulated.",
  lead: "Trust isn't a feature we added. It's the foundation. Every Madison agent runs with role-based access control, identity integration, and a native, exportable audit trail of what it read, what it did, and why. Nothing leaves your perimeter.",
  badgesLabel: "Security & compliance",
  badges: [
    "SOC 2 Type II",
    "GDPR Compliant",
    "ISO 27001 Certified",
    "DPDP Act (India)",
    "GLBA",
    "DORA (EU)",
  ],
  cards: [
    {
      title: "Deploy on your terms",
      body: "Cloud, on-premises, or fully air-gapped — VPC, on-prem, and isolated environments so your data and inference stay inside your boundary.",
    },
    {
      title: "Production-grade from day one",
      body: "Git-driven deployment, staged promotion, automated Responsible-AI and hallucination checks, one-click compliance logs.",
    },
  ],
};

export const PLATFORM = {
  eyebrow: "The platform beneath Madison",
  title: "Madison runs on Lyzr. Extend it, deploy it, unify it.",
  dek: "Madison is a complete banking solution today, and an open platform you can build on.",
  mark: "Built on Lyzr",
  cards: [
    {
      idx: "01",
      title: "Build your own",
      body: "With Architect and Studio, your teams create custom agents and workflows in plain language, with no waiting on us for every change.",
      chips: ["Architect", "Studio"],
    },
    {
      idx: "02",
      title: "Deploy your way",
      body: "With Sovereign and Optimus, run Madison in the cloud, on-premises, or fully air-gapped, with a local agent factory for on-prem scale.",
      chips: ["Sovereign", "Optimus"],
    },
    {
      idx: "03",
      title: "Unify what you have",
      body: "With the Control Plane, bring your existing agents and AI workflows into one governed, audited operations layer.",
      chips: ["Control Plane"],
    },
  ],
};

export const ADVISORY = {
  eyebrow: "Advisory",
  title: "Shaped by industry leaders.",
  dek: "Madison is guided by senior leaders from across banking, risk, and regulation — ex-bank executives who help shape how Madison is built and governed.",
  advisors: [
    {
      name: "Marcus Halloran",
      title: "Former Group COO · Major Systemic Bank",
      line: "Twenty-five years scaling treasury and risk operations across three continents. Advises Madison on enterprise rollout.",
      previously: "Meridian National",
      photo: "/images/advisors/marcus-halloran.jpg",
    },
    {
      name: "Priya Anand",
      title: "Former Head of Model Risk · Global Asset Manager",
      line: "Built model-risk governance for a top-10 asset manager. PhD in applied probability; advises on agent reliability.",
      previously: "Ashford Capital",
      photo: "/images/advisors/priya-anand.jpg",
    },
    {
      name: "Daniel Sato",
      title: "Former Chief Risk Officer · Investment Bank",
      line: "Two decades in market and credit risk. Led a global bank's Basel III/IV implementation across its trading book.",
      previously: "Continental Trust",
      photo: "/images/advisors/daniel-sato.jpg",
    },
    {
      name: "Elena Petrova",
      title: "Former Chief Compliance Officer · National Credit Union",
      line: "Directed BSA/AML and sanctions compliance programs through two supervisory examination cycles.",
      previously: "Harborview Credit Union",
      photo: "/images/advisors/elena-petrova.jpg",
    },
    {
      name: "Robert Chen",
      title: "Former Bank Examiner · Federal Banking Agency",
      line: "Two decades shaping supervisory policy and examination standards for regulated financial institutions.",
      previously: "Federal Banking Agency",
      photo: "/images/advisors/robert-chen.jpg",
    },
    {
      name: "Sarah Whitfield",
      title: "Former CFO · Regional Bank Holding Co.",
      line: "Guided finance and treasury through multiple M&A integrations and two rounds of regulatory exams.",
      previously: "Vantage Bancorp",
      photo: "/images/advisors/sarah-whitfield.jpg",
    },
  ],
};

export const CLOSING_CTA = {
  title: "Get to production without cutting corners.",
  line: "Every agent ships through the same governed pipeline — automated testing, compliance gates, staged promotion. Move fast, keep the controls a bank cannot compromise.",
  actions: [
    { label: "Request a demo", href: "#contact", variant: "primary" as const },
    { label: "Talk to our team", href: "#contact", variant: "outline" as const },
  ],
};
