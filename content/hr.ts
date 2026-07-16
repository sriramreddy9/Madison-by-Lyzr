/**
 * HR & People page copy — extracted verbatim from
 * sub-landing/HR-banking.html (764 lines, single file).
 * See docs/content-map/hr.md for the section-by-section source map and
 * notes on the few intentional adaptations (re-tokenization, static
 * waveform, FAQ surfaced from JSON-LD).
 */

export const META = {
  title: "HR — Agentic HR for Banks",
  description:
    "Madison runs the people work inside your bank: candidate intake and scoring, an early screening call, an employee desk that acts in your HRMS, and exit through offboarding. Deployed in your perimeter. Your team keeps every regulated decision.",
  ogDescription:
    "The employee journey, run end to end by governed agents. Your team keeps every regulated decision. Deployed in your perimeter.",
};

export const HERO = {
  eyebrow: "HR & People",
  headline: "The people work in your bank, run end to end.",
  lede: "Governed agents run the work between the decisions. Your team keeps every regulated call.",
  primaryCta: { label: "Request a demo", href: "/#contact" },
  secondaryCta: { label: "See the use cases", href: "#solutions" },
  trust: [
    "Runs in your perimeter",
    "Human in the loop",
    "Exportable audit trail",
  ],
};

/** The signature hero visual: the early phone-screen agent on a live call. */
export const CALL_CARD = {
  ariaLabel: "Early phone screen in progress",
  agent: "Phone Screen Agent",
  status: "On call",
  time: "02:14",
  candidate: {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "Teller · REQ-2048",
  },
  transcript: [
    {
      speaker: "Agent",
      line: "Walk me through the cash handling you did day to day.",
      candidate: false,
    },
    {
      speaker: "Sarah",
      line: "I ran the teller drawer and balanced it at end of day…",
      candidate: true,
    },
  ],
  blockLabel: "Checking the resume, live",
  toneTag: "Clear · specific",
  claims: [
    { claim: "5 years retail banking", verdict: "Consistent", ok: true },
    { claim: "Led a 6-person team", verdict: "Probing", ok: false },
    { claim: "Cash-handling detail", verdict: "Confirmed", ok: true },
  ],
  foot: { left: "Evidence goes to the recruiter.", right: "A person decides." },
};

export const DELIVERS = {
  eyebrow: "What Madison delivers",
  title: "Faster hiring, an emptier desk, and exits that close clean.",
  dek: "Three flows where agents carry the volume and your team keeps the call, so a lean HR team runs at the standard a bank is held to.",
  cards: [
    {
      title: "Cleaner shortlists, faster",
      body: "Every applicant scored against the role with the reasoning written out, and an early phone screen that tests the CV before you spend interview time. Your recruiter advances, always.",
      outcome: "Shorter time to hire · fewer wasted interviews",
    },
    {
      title: "A help desk that acts",
      body: "Answers policy from your handbook with the source cited, then completes the task in the HRMS: leave, payslips, tickets. Anything sensitive routes to a person.",
      outcome: "Most desk volume handled · team freed for judgment",
    },
    {
      title: "Exits that close with evidence",
      body: "Captures why someone left, runs the handover, and chases access withdrawal to completion, so the file closes with the evidence an examiner asks for.",
      outcome: "Access provably closed · audit-ready exits",
    },
  ],
};

export const VALUE = {
  eyebrow: "The value",
  title: "Run HR at the standard of a global bank, with the team you have.",
  cards: [
    {
      title: "Capacity",
      body: "The volume work, intake, screening, the desk, offboarding, is carried by agents. Your team spends its hours on judgment, not throughput.",
    },
    {
      title: "Control",
      body: "Every regulated call stays with a person. The agent prepares the decision and hands it over with the reasoning attached. It never advances, rejects, or makes an offer.",
    },
    {
      title: "Provable",
      body: "Every action is written to an exportable log as it happens. When the examiner asks how a decision was reached, the trail already exists.",
    },
  ],
};

export type JourneyChip = { label: string; owned?: boolean };

export const JOURNEY = {
  eyebrow: "The employee journey",
  title: "Orchestrated end to end, on one core.",
  dek: "Not a point tool bolted onto your HRMS. Madison runs the full arc, hire, employ, exit, on the bank's own data. The steps a person owns are marked; everything else the agents carry.",
  stages: [
    {
      num: "01",
      name: "Hire",
      line: "From a candidate entering the pipeline to a productive first day.",
      chips: [
        { label: "Unified intake" },
        { label: "Scoring & rationale" },
        { label: "Early phone screen" },
        { label: "Who advances", owned: true },
        { label: "Scheduling" },
        { label: "The interview", owned: true },
        { label: "Offer letter" },
        { label: "Onboarding" },
      ] as JourneyChip[],
    },
    {
      num: "02",
      name: "Employ",
      line: "The desk that answers, and then acts, inside the HRMS.",
      chips: [
        { label: "Policy, cited" },
        { label: "Leave & balances" },
        { label: "Payslips" },
        { label: "Tickets" },
        { label: "Escalation", owned: true },
        { label: "Learning & certs" },
        { label: "Workforce analytics" },
      ] as JourneyChip[],
    },
    {
      num: "03",
      name: "Exit",
      line: "From notice to a closed file, with the evidence attached.",
      chips: [
        { label: "Notice", owned: true },
        { label: "Exit interview" },
        { label: "Handover" },
        { label: "Access withdrawal" },
        { label: "Deregistration" },
        { label: "HR sign-off", owned: true },
      ] as JourneyChip[],
    },
  ],
};

export type AgentStatus = "done" | "running" | "queued";

export const AGENTS = {
  eyebrow: "The agents",
  title: "Agents built for the HR floor.",
  dek: "Each one runs a real flow, shows its work, and stops where a person must decide.",
  recruitment: {
    title: "Recruitment",
    body: "Every channel into one queue, scored against the role with the reasoning written out. The recruiter advances, always.",
    rows: [
      { label: "Intake & dedup agent", status: "done", tag: "Done" },
      { label: "Scoring & rationale agent", status: "running", tag: "Running" },
      { label: "Phone screen agent", status: "queued", tag: "Queued" },
    ] as { label: string; status: AgentStatus; tag: string }[],
  },
  desk: {
    title: "Employee desk",
    body: "Policy answered from your handbook with the source shown, then the transaction completed in the HRMS. Human in the loop, full audit trail.",
    timeline: [
      { time: "09:41", line: "Leave applied · 4 days, approved balance" },
      { time: "09:39", line: "Payslip retrieved · March, ID verified" },
      { time: "09:36", line: "Grievance · escalated to a person" },
    ],
  },
  exit: {
    title: "Exit & offboarding",
    body: "Notice to a closed file: the exit conversation, the handover, and provable evidence that access was withdrawn.",
    ring: {
      percent: 88,
      label: "Access closed this quarter",
      detail: "44 of 50 leavers, evidenced",
    },
  },
  learning: {
    title: "Learning & certification",
    body: "You load the regulator-mandated courses. The agent follows up with each employee to complete them, tracks who is done, and flags certifications about to lapse, with the audit pack ready.",
    rows: [
      { label: "AML refresher · 1,204 staff", value: "98% done", dot: false },
      { label: "NMLS renewals · 38 MLOs", value: "6 due", dot: true },
      { label: "Code of conduct · new joiners", value: "Tracking", dot: false },
    ],
  },
};

export const AT_WORK = {
  eyebrow: "See it at work",
  title: "One requisition, scored and evidenced.",
  dek: "Watch a governed agent take a live req from a stack of applications to a shortlist the recruiter can trust, or overrule.",
  screen: {
    title: "Madison — Candidate Intake Agent",
    step: "Req REQ-2048 · Teller, Columbus OH · Step 4 of 5",
    lines: [
      { text: "Parsed 214 applications across four channels.", dim: false },
      { text: "Scored each against the role rubric.", dim: false },
      { text: "Wrote a rationale for every score.", dim: false },
      {
        text: "Flagged 3 resume claims to verify — awaiting recruiter.",
        dim: true,
      },
    ],
    gate: { primary: "Advance shortlist", secondary: "Adjust rubric" },
    auditLabel: "Audit trail",
    audit: [
      { text: "Read req REQ-2048", waiting: false },
      { text: "Ingested 214 applications", waiting: false },
      { text: "Applied rubric v3.1", waiting: false },
      { text: "Generated 214 rationales", waiting: false },
      { text: "Awaiting human decision", waiting: true },
    ],
  },
  rail: [
    { num: "01", line: "A pipeline scored end to end." },
    { num: "02", line: "Every score carries its reasoning." },
    { num: "03", line: "The recruiter advances or overrules." },
  ],
  cta: { label: "Request a live demo", href: "/#contact" },
};

export const DEPLOYMENT = {
  eyebrow: "Deployment & data",
  title: "It runs where your data already lives.",
  dek: "The first question a bank asks is where the data goes. The answer is nowhere. Madison installs inside your environment and operates above the systems you already run.",
  cells: [
    {
      title: "On-prem or air-gapped",
      body: "Your own data centre, your private cloud, or fully air-gapped. Employee data never leaves the building.",
    },
    {
      title: "Redacted & private",
      body: "Personal data is redacted before any model call, and nothing you hold is used to train a model.",
    },
    {
      title: "Auditable by construction",
      body: "Every prompt, source, model, and approval written to an exportable log, ready before the examiner asks.",
    },
  ],
};

export const COMPLIANCE = {
  eyebrow: "Security & compliance",
  line: "Held to the standards a bank's own vendors are measured against.",
  badges: [
    "GDPR Compliant",
    "SOC 2 Type II",
    "ISO 27001 Certified",
    "HIPAA Compliant",
    "CCPA",
  ],
};

/** Verbatim from the source page's JSON-LD FAQPage (rendered visibly here). */
export const FAQ = {
  eyebrow: "FAQ",
  title: "Frequently asked questions",
  items: [
    {
      question: "Does Madison HR source candidates?",
      answer:
        "No. Sourcing remains with the bank. Madison integrates with the channels already in use and begins once candidates enter the pipeline.",
    },
    {
      question: "Does an agent decide who is hired?",
      answer:
        "No. The agent scores each candidate against the role and writes out the reasoning so a recruiter can agree or overrule. Every override is recorded with its reason.",
    },
    {
      question: "Where does employee data sit?",
      answer:
        "Inside your perimeter, in your region. Madison deploys on premise, in your private cloud or fully air-gapped. Personal data is redacted before it reaches any model.",
    },
    {
      question: "How does Madison HR handle the EU AI Act?",
      answer:
        "AI used in recruitment and performance evaluation is high risk under the Act. Madison assists rather than acts, a person makes every decision, activity is logged, workers are informed, and outputs are explainable.",
    },
  ],
};

export const CLOSING_CTA = {
  title: "See Madison run on your own HR.",
  line: "Book a demo and see the agents run hiring, the help desk, and exits, with every regulated decision left to your team.",
  actions: [
    { label: "Book a demo", href: "/#contact" },
    { label: "Talk to our team", href: "/#contact", variant: "outline" as const },
  ],
};

/** Verbatim SoftwareApplication fields from the source JSON-LD graph. */
export const SOFTWARE_APP_JSONLD = {
  name: "Madison HR",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Human resources for banking",
  operatingSystem:
    "On premise, private cloud or air-gapped, inside the institution",
  description:
    "Governed AI agents for banking HR. Unified candidate intake with scoring and written rationale, an early screening call, an employee service desk connected to the HRMS, interview coordination, onboarding, learning and exit. Deployed in the bank's perimeter with a full audit trail. Every regulated decision is made by the bank.",
  featureList: [
    "Early phone screen",
    "Employee HR helpdesk on the HRMS",
    "Unified candidate intake with scoring and rationale",
    "Interview coordination",
    "Onboarding",
    "Exit and offboarding",
    "Learning and certification tracking",
    "Workforce analytics",
  ],
  isPartOf: {
    name: "Madison",
    description:
      "The Agentic Banking OS by Lyzr: governed AI agents across every banking function.",
  },
};
