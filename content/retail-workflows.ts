/**
 * Retail Banking → Workflows page copy — extracted verbatim in meaning from
 * Lyzr_A_Agent_Catalog_and_Workflows.pdf (Doc A: Agent Catalog & Workflow
 * Blueprints, July 2026; ~/Desktop/Research/Demo_build/). Four of the nine
 * workflow blueprints (1–4) plus the autonomy ladder, shared assets, and the
 * day-in-the-life narrative. "The Lyzr Agentic Workbench" is rendered as
 * "Madison" per site brand. No per-agent pricing appears in the source and
 * none is invented here. KPIs and "why it wins" lines unchanged.
 */

export const META = {
  title: "Retail Banking Workflows — From Signal to Done",
  description:
    "Four end-to-end Madison workflows for retail banking — how a live signal becomes a completed revenue action, with your banker in the lead at every decisive step.",
};

export const HERO = {
  eyebrow: "Madison for Retail Banking · Workflows",
  headlineLead: "From signal, ",
  headlineItalic: "to done.",
  subhead:
    "The workbench is not a set of disconnected bots. It is one operating loop — Sense → Judge → Engage → Execute → Learn — with a governance spine through every step. Agents are specialists stationed along the loop; they hand each other structured work items, never raw guesses.",
  subheadEmphasis:
    "One inbox of live revenue moments — pre-researched, pre-qualified, compliance-gated, one click from done.",
  primaryCta: { label: "Book a working session", href: "/#contact" },
  secondaryCta: { label: "Follow a banker's day", href: "#day" },
  stats: [
    { label: "Agent concepts, six pods", value: "39" },
    { label: "Workflow blueprints", value: "9" },
    { label: "Autonomy, set per agent", value: "L0–L4" },
  ],
};

export type RunStep = {
  name: string;
  detail: string;
  state: "done" | "running" | "queued";
};

export const RUN = {
  chip: "Workflow run · Life-Event Cross-Sell",
  status: "In progress",
  steps: [
    {
      name: "Sense",
      detail: "Competitor auto-loan payment detected · window scored",
      state: "done",
    },
    {
      name: "Judge",
      detail: "Genuine-need test passed · rationale logged",
      state: "done",
    },
    {
      name: "Engage",
      detail: "One-page brief → J. Whitfield, 9:10 walk-in",
      state: "done",
    },
    {
      name: "Banker",
      detail: "Conversation in progress · refi pre-qualified",
      state: "running",
    },
    {
      name: "Execute",
      detail: "Open from KYC on file · switch direct deposit",
      state: "queued",
    },
    {
      name: "Learn",
      detail: "Outcome feeds detection · pipeline updated",
      state: "queued",
    },
  ] satisfies RunStep[],
  footer: "Every step: logged · replayable · examinable",
};

export const LADDER = {
  label: "The autonomy ladder",
  note: "Every agent ships at a default rung — promote or demote any agent per policy. Autonomy is a configuration, not an architecture change.",
  rungs: [
    { level: "L0", name: "Observe & draft" },
    { level: "L1", name: "Brief the banker" },
    { level: "L2", name: "Act with approval" },
    { level: "L3", name: "Act within bounds" },
    { level: "L4", name: "Autonomous, logged" },
  ],
};

export type WorkflowStep = {
  agent: string;
  level: string;
  body: string;
  /** true = the banker is the actor — highlighted in the rail */
  human?: boolean;
};

export type Workflow = {
  num: string;
  tag: string;
  title: string;
  job: string;
  steps: WorkflowStep[];
  kpis: string;
  wins: string;
};

export const WORKFLOWS = {
  eyebrow: "Four blueprints, end to end",
  title: "Watch a signal become a completed action.",
  dek: "Each workflow below is a real blueprint from the Madison catalog: which agent acts at each step, at what autonomy, and exactly where your banker is in the loop. The highlighted rows are the moments a human leads.",
  items: [
    {
      num: "01",
      tag: "The core ask",
      title: "The Life-Event Cross-Sell Loop",
      job: "Act on a product need inside the window it's live. 58% of customers who bought elsewhere last year were on the bank's own transaction data first.",
      steps: [
        {
          agent: "Signal Sentinel",
          level: "L4",
          body: "A competitor mortgage payment starts, a payroll raise lands, a $40k balance sits idle. Urgency and decay window scored; written to the Signal Ledger.",
        },
        {
          agent: "Wallet-Gap Mapper + Readiness Underwriter",
          level: "L4",
          body: "Household context attached — what's held elsewhere, what the customer pre-qualifies for today, at what terms. The offer math is done before any human looks.",
        },
        {
          agent: "Fit Gate",
          level: "L4",
          body: "The genuine-need test: right for this customer, at fair value, right now? Fail parks the signal with a logged reason. Pass proceeds.",
        },
        {
          agent: "Capacity Router",
          level: "L3",
          body: "Channel chosen by value and preference — high-value moments to a banker as a briefed task; simple, digital-first moments to an in-app offer.",
        },
        {
          agent: "Your banker",
          level: "L1",
          body: "A one-page brief in the inbox: context, why-now, talking points, objections, pre-qualified terms. One click opens the script and the application.",
          human: true,
        },
        {
          agent: "Opening Concierge",
          level: "L2–L4",
          body: "On a yes, the account opens in minutes from KYC on file; funding, sweep, or direct-deposit switch executes within pre-authorized bounds.",
        },
        {
          agent: "Scribe + Action Log",
          level: "L3",
          body: "CRM updated, follow-ups created, fair-value rationale archived. The outcome — accepted, declined, ignored — tunes detection.",
        },
      ],
      kpis: "Products added per household · signal→action latency · offer acceptance · % signals expired unactioned",
      wins: "Detection-only tools have produced 7× response lifts. This closes the half of the loop — execution — that they leave open.",
    },
    {
      num: "02",
      tag: "Land here",
      title: "Deposit Defense — the Silent-Attrition Win-Back",
      job: "See the ~90% of deposit attrition reporting misses, and own the win-back nobody owns. An institution leaking 10% of an $800M book has an $80M-a-year problem.",
      steps: [
        {
          agent: "Deposit Defense",
          level: "L4",
          body: "A per-account watch on direct-deposit loss, recurring transfers out, drain velocity, and fintech sweep destinations. Soft-switching risk scored daily.",
        },
        {
          agent: "Risk triage",
          level: "L4",
          body: "Saves segmented by balance value and cause — rate-seeking, service failure, or life change. Each gets a different play.",
        },
        {
          agent: "Fit Gate + Offer Composer",
          level: "L2",
          body: "The retention action composed within CFO-set bounds — rate match, product bundle, fee relief, or a conversation — with fair value logged.",
        },
        {
          agent: "Your banker",
          level: "L2",
          body: "High-value saves arrive as a full context brief with a suggested opening line. Lower balances execute digitally, within the bounds you set.",
          human: true,
        },
        {
          agent: "DD-Switch Concierge",
          level: "L4",
          body: "When the save lands, primacy is re-anchored — one-tap direct-deposit re-switch and bill-pay migration.",
        },
        {
          agent: "Learn",
          level: "L3",
          body: "Every save and loss trains the risk model. The CFO dashboard reports deposits saved versus leaked.",
        },
      ],
      kpis: "Deposit dollars retained · save rate by segment · detection lead-time · cost per save (5–7× cheaper than acquisition)",
      wins: "The sharpest named pain in banking — deposit growth — with essentially no community-FI incumbent, and outcome reporting the CFO can audit.",
    },
    {
      num: "03",
      tag: "Fastest proof",
      title: "Onboarding Rescue & 60-Day Primacy",
      job: "Stop forfeiting thousands of accounts a year to abandonment, and convert opened accounts into primary relationships inside the decisive first 60 days.",
      steps: [
        {
          agent: "Onboarding Rescue",
          level: "L4",
          body: "Stall and abandon events detected in the application funnel in real time — 60% happen at identity verification.",
        },
        {
          agent: "KYC Exception Resolver",
          level: "L4",
          body: "Resolvable exceptions — document retries, data mismatches — cleared automatically. True failures packaged for human review in minutes, not days.",
        },
        {
          agent: "Re-engagement",
          level: "L3",
          body: "The applicant resumed across SMS, email, and voice with a saved application and a human-help option. Contact frequency fit-gated.",
        },
        {
          agent: "Primacy Journey Manager",
          level: "L3",
          body: "On opening, the 60-day sequence runs — direct deposit, card activation, bill pay, alerts — personalized by observed behavior, not a fixed drip.",
        },
        {
          agent: "Activation Sentinel → your banker",
          level: "L1",
          body: "Never-funded and never-activated accounts — a 40% baseline — flagged for a save nudge or a banker call.",
          human: true,
        },
        {
          agent: "Scribe",
          level: "L3",
          body: "The full journey logged; activation lift reported per cohort. Engaged customers hand off to the cross-sell loop.",
        },
      ],
      kpis: "Rescued applications · activation rate · direct-deposit capture in 60 days · 90-day retention",
      wins: "The fastest measurable proof — weeks, not quarters — and it feeds every other workflow with activated customers.",
    },
    {
      num: "04",
      tag: "Most predictable",
      title: "Maturity & Rate-Watch Retention",
      job: "The CD maturity, promo roll-off, or final loan payment is the most predictable churn-or-cross-sell moment in banking — and most institutions handle it with a monthly report and a mail merge.",
      steps: [
        {
          agent: "Maturity & Rate-Watch",
          level: "L4",
          body: "A rolling 90/30/7-day horizon on every maturing instrument and roll-off, enriched with the customer's rate sensitivity and wallet context.",
        },
        {
          agent: "Strategy select",
          level: "L2",
          body: "Renew, upgrade, ladder, or consolidate-from-competitor options — priced within your treasury's bounds.",
        },
        {
          agent: "Your banker",
          level: "L2",
          body: "Large balances arrive as a banker brief; small balances go digital-first. A payoff triggers a graduation conversation — freed cash flow toward an investment, a HELOC, or a savings goal.",
          human: true,
        },
        {
          agent: "Learn",
          level: "L3",
          body: "Renewals and defections sharpen the rate-sensitivity model. Treasury gets repricing intelligence as a by-product.",
        },
      ],
      kpis: "Renewal rate · balance retained at maturity · upgrade rate · margin vs. rate-match cost",
      wins: "Uses data every core already exposes; the manual workaround — maturity reports — proves the demand.",
    },
  ] satisfies Workflow[],
};

export const DAY = {
  eyebrow: "The journey, lived",
  title: "One banker's Tuesday.",
  dek: "The same workflows, seen from the chair they were built for.",
  beats: [
    {
      time: "8:45",
      title: "The huddle",
      body: "Three appointments, briefs attached. Six live signals ranked by window decay. Two maturities over $100k this week. One integrity-clear notice.",
    },
    {
      time: "9:10",
      title: "The walk-in",
      body: "A competitor auto-loan payment signal is active; the banker raises it naturally. The refi is already pre-qualified. Account opened in 11 minutes.",
    },
    {
      time: "11:30",
      title: "The save",
      body: "A $220k relationship shows drain velocity. The brief suggests a rate match within bounds — and a service-failure apology, root cause attached. The banker calls; the save lands; direct deposit re-anchors.",
    },
    {
      time: "2:00",
      title: "The graduation",
      body: "A business-banking meeting the Scout booked last week. The credit memo draft is attached. The meeting is a conversation, not an interrogation.",
    },
    {
      time: "4:45",
      title: "The close",
      body: "Every note written, every follow-up created, nothing owed to memory. The banker spent the day in dialogue.",
    },
  ],
  coda: "Bankers spend 25–30% of their day in actual client dialogue. That number is the thing this product exists to break.",
};

export const COMPOUND = {
  eyebrow: "Why workflows compound",
  title: "Land with one agent. The workbench assembles itself.",
  dek: "Each workflow is sellable alone — fixed scope, outcome-metered. Every one you add compounds the others, because they all read and write the same three assets:",
  assets: [
    {
      name: "Live Customer State",
      body: "One always-current picture of every household — balances, products, signals, and conversations — instead of five tabs.",
    },
    {
      name: "Signal Ledger",
      body: "Every detected moment, scored and time-stamped with its decay window — and whether it was acted on before it expired.",
    },
    {
      name: "Action Log",
      body: "Every decision, approval, and outcome, append-only. The audit trail your examiners read from.",
    },
  ],
  note: "Agents hand each other structured work items, never raw guesses.",
};

export const CLOSING = {
  eyebrow: "Next step",
  title: "Watch one workflow run on your data.",
  dek: "The same 45-minute working session — bring one month of your attrition or onboarding numbers, and we'll trace exactly which of these workflows would have fired, step by step.",
  actions: [
    { label: "Book the working session", href: "/#contact" },
    { label: "Meet the agents", href: "/retail-cross-sell#agents" },
  ],
  expect: {
    label: "What to expect",
    items: [
      "Your numbers traced through the four blueprints, live",
      "Every step tagged with its autonomy rung — and where your banker leads",
      "The governance spine walked end to end with your compliance lead",
      "A fixed 60–90 day scope for the workflow that fires most",
    ],
  },
};
