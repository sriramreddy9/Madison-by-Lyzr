/**
 * Retail Banking page copy — extracted verbatim in meaning from
 * Lyzr_E_Client_Facing_Overview.pdf (client-facing overview, July 2026;
 * repo root). "The Lyzr Agentic Workbench" is rendered as "Madison" /
 * "the workbench" per site brand. Claims, stats, and pricing meters unchanged.
 */

export const META = {
  title: "Retail Banking — Your Bankers, With the Follow-Through of a Thousand",
  description:
    "Madison for retail banking: agents that watch the signals already in your data, prepare the work your team never has time for, and finish the follow-through.",
};

export const HERO = {
  eyebrow: "Madison for Retail Banking",
  headlineLead: "Your bankers, ",
  headlineItalic: "with the follow-through of a thousand.",
  subhead:
    "Madison watches the signals already in your data — the stopped direct deposit, the maturing CD, the competitor loan payment — prepares the work your team never has time for, and completes the follow-through.",
  subheadEmphasis: "Your bankers always in the lead.",
  primaryCta: { label: "Book a working session", href: "/#contact" },
  secondaryCta: { label: "Meet the agents", href: "#agents" },
  stats: [
    { label: "First agent in production", value: "60–90d" },
    { label: "Pricing", value: "Per outcome" },
    { label: "Data prerequisites", value: "None" },
  ],
};

export type InboxItem = {
  signal: string;
  who: string;
  agent: string;
};

export const INBOX = {
  chip: "Opportunity inbox · 08:15",
  status: "3 briefs ready",
  items: [
    {
      signal: "Direct deposit stopped",
      who: "M. Alvarez · 4-year household",
      agent: "Deposit Defense",
    },
    {
      signal: "CD matures in 12 days",
      who: "R. & J. Guarin · promo roll-off",
      agent: "Maturity & Rate-Watch",
    },
    {
      signal: "Competitor mortgage payment",
      who: "D. Okafor · seen in checking",
      agent: "Life-Event Cross-Sell",
    },
  ] satisfies InboxItem[],
  note: "Maria's payroll deposit stopped two Fridays ago, after four years. Drain velocity puts the window at about three weeks. Retention play attached — suitability logged, fair value documented — with a suggested opening line.",
  footer: "Every brief: pre-researched · pre-qualified · compliance-checked",
};

export const TRUST_STRIP = {
  label: "Built for regulated institutions first",
  items: [
    "Genuine-need gate",
    "Append-only audit trail",
    "Autonomy dial",
    "Consumer Duty · UDAAP · EU AI Act",
    "Human escalation, always",
    "Examiner packs on demand",
  ],
};

export const PROBLEM = {
  eyebrow: "The problem you already know",
  titleLines: ["The signals are in your data.", "The follow-through never happens."],
  dek: "Your bankers spend the day reconciling systems and writing things up, and the signals decay before anyone can act. Cross-sell becomes what a banker does when the queue is empty. The queue is never empty.",
  stats: [
    {
      value: "2.3 / ~7",
      label: "Products held vs. owned per household",
      footnote: "Wallet you own the relationship to, but don't collect.",
    },
    {
      value: "67%",
      label: "Digital applications abandoned",
      footnote: "The young customers you want most, lost at the door.",
    },
    {
      value: "~90%",
      label: "Deposit attrition invisible to reports",
      footnote: "Balances drain quietly; reports count only closed accounts.",
    },
    {
      value: "5–25×",
      label: "Cheaper to deepen than acquire",
      footnote: "~$561 per new customer; ~$428 per member.",
    },
  ],
  baseline:
    "None of this is a data problem. Every one of these events is visible in data you already own.",
};

export const HOW = {
  eyebrow: "How the workbench works",
  title: "One inbox in front. A continuous loop behind it.",
  dek: "Every retail banker gets a single surface — one inbox of live opportunities, each arriving pre-researched, pre-qualified, and compliance-checked. Behind it, specialized agents run a continuous loop over your existing systems.",
  stages: [
    {
      num: "01",
      stage: "Sense",
      headline: "Watch the data you already own.",
      body: "Agents monitor your core, digital banking, and interaction data continuously — no data-warehouse project required. They work with your data as it is.",
    },
    {
      num: "02",
      stage: "Judge",
      headline: "Pass the genuine-need test.",
      body: "Is this right for this customer, at fair value, right now? The rationale is logged, every time.",
    },
    {
      num: "03",
      stage: "Engage",
      headline: "Arrive as a one-page brief.",
      body: "Context, why-now, talking points, pre-qualified terms. Routine digital moments can execute directly, within limits you set.",
    },
    {
      num: "04",
      stage: "Execute",
      headline: "Finish the job on a yes.",
      body: "Account opened from KYC on file, direct deposit switched, documents chased, CRM notes written. Nothing dies in a queue.",
    },
    {
      num: "05",
      stage: "Learn",
      headline: "Sharpen with every outcome.",
      body: "Detection improves, and managers get a live view of the pipeline — including which opportunities are about to expire untouched.",
    },
  ],
  loop: {
    label: "The loop · continuous",
    baseTitle: "Your systems, as they are",
    baseBody: "Core · digital banking · interactions",
    nodes: [
      { name: "Sense", hint: "watch the signals" },
      { name: "Judge", hint: "genuine-need test" },
      { name: "Engage", hint: "one-page brief" },
      { name: "Execute", hint: "finish the job" },
      { name: "Learn", hint: "sharpen detection" },
    ],
    cycle: "Learn feeds Sense · every outcome, logged",
    chips: ["Suitability logged", "Fair value documented", "Replayable"],
  },
};

export const WEDGE = {
  eyebrow: "Where the workbench fits",
  titleLines: ["Not a platform program.", "Not a pilot that never ends."],
  dek: "One agent, one measurable outcome, live in production — connected to your core and digital banking systems as they are. Your data doesn't need to be ready. It needs to be yours.",
  cards: [
    { k: "Not", v: "A data-warehouse project", good: false },
    { k: "Not", v: "Another chatbot pilot", good: false },
    { k: "Is", v: "An agentic workbench on the systems you run", good: true },
  ],
};

export type FlagshipAgent = {
  num: string;
  name: string;
  meter: string;
  body: string;
  signals: string[];
};

export const AGENTS = {
  eyebrow: "The flagship agents",
  title: "Six agents. Each owns a moment your reports can't see.",
  dek: "We start where your money is leaking fastest — for most institutions, that's Deposit Defense.",
  cta: {
    label: "See the workflows, end to end",
    href: "/retail-cross-sell/workflows",
  },
  items: [
    {
      num: "01",
      name: "Deposit Defense",
      meter: "Priced per deposit dollar retained",
      body: "Sees the silent attrition your reports can't and acts inside the window: a personalized, compliance-checked retention play, with high-value saves escalated to your bankers with full context and a suggested opening line.",
      signals: ["Direct-deposit loss", "Drain velocity", "Soft switching"],
    },
    {
      num: "02",
      name: "Onboarding Rescue & 60-Day Primacy",
      meter: "Priced per activated account",
      body: "Catches abandoning applicants in real time, clears resolvable verification exceptions in minutes, and re-engages before they're gone — then runs the first 60 days as a managed journey, the window in which primacy is won or lost.",
      signals: ["Stalled applications", "Verification exceptions", "Direct deposit · card · bill pay"],
    },
    {
      num: "03",
      name: "Life-Event Cross-Sell",
      meter: "Priced per product added",
      body: "Reads the signals your customers are already sending and turns each into a fitted, fair-value-documented conversation for your banker — or a compliant digital offer where that's what the customer prefers.",
      signals: ["Competitor mortgage payment", "Payroll change", "Large idle balance"],
    },
    {
      num: "04",
      name: "Maturity & Rate-Watch",
      meter: "The most predictable moment in banking",
      body: "Every CD maturity, promo roll-off, and loan payoff, worked ahead of the customer's shopping window — renew, upgrade, or consolidate options priced within your treasury's bounds. Finally handled like the revenue moment it is.",
      signals: ["CD maturities", "Promo roll-offs", "Loan payoffs"],
    },
    {
      num: "05",
      name: "Business-Banking Graduation",
      meter: "The stickiest deposits you can gather",
      body: "Finds the businesses hiding inside your retail accounts and hands your business banker a pre-assembled file and a warm introduction — from relationships you already hold.",
      signals: ["Invoicing income", "Merchant fees", "Fintech tool spend"],
    },
    {
      num: "06",
      name: "The Banker's Day, Returned",
      meter: "Underneath every revenue agent",
      body: "A pre-meeting brief for every appointment, live product knowledge with citations during every conversation, and automatic notes, follow-ups, and referral tracking after it. The hours your team spends on five systems come back as customer time.",
      signals: ["Pre-meeting briefs", "Cited product answers", "Auto notes & follow-ups"],
    },
  ] satisfies FlagshipAgent[],
};

export const GOVERNANCE = {
  eyebrow: "Governance",
  title: "Governance isn't a feature. It's the foundation.",
  dek: "Everything the agents do is examinable by design, because we build for regulated institutions first.",
  items: [
    {
      h: "A genuine-need gate on every offer",
      b: "No action reaches a customer without a logged suitability and fair-value rationale — your evidence under Consumer Duty, UDAAP expectations, and the EU AI Act, generated automatically.",
    },
    {
      h: "Your autonomy dial",
      b: "Every agent runs at the level you set — from “brief my banker” to “act within these bounds and show me the log.” Vulnerable customers, complaints, and high-value decisions always route to a human. Always.",
    },
    {
      h: "A replayable audit trail",
      b: "Every decision, approval, and outcome in an append-only log; examiner documentation packs assembled on demand, not the week before the exam.",
    },
    {
      h: "Conduct protection built in",
      b: "Continuous monitoring for sales-practice risk patterns — structurally designed to make the next Wells Fargo–style failure impossible, not just unlikely.",
    },
  ],
  pledge: {
    quote:
      "Our goal is simple: your compliance officer should be this product's biggest champion.",
    cta: { label: "Request the governance pack", href: "/#contact" },
  },
};

export const ENGAGEMENT = {
  eyebrow: "How an engagement works",
  titleLines: ["One agent. One number.", "Sixty to ninety days."],
  dek: "We start where your money is leaking fastest and publish the measurement methodology up front.",
  steps: [
    {
      num: "01",
      meta: "Fixed scope",
      title: "60–90 days to production",
      body: "One agent, one measurable outcome, live in production. Most institutions start with Deposit Defense.",
    },
    {
      num: "02",
      meta: "Outcome-metered",
      title: "Pay for the number that moves",
      body: "Per deposit dollar saved, per activated account, per product added. If it doesn't move the number, you don't pay for the number.",
    },
    {
      num: "03",
      meta: "No prerequisites",
      title: "Your data, as it is",
      body: "We connect to your core and digital banking systems as they are and do the enrichment ourselves. Your data doesn't need to be ready. It needs to be yours.",
    },
    {
      num: "04",
      meta: "On evidence",
      title: "Expand as results come in",
      body: "Each agent you add shares the same customer state, signals, and audit spine — the workbench assembles itself as the results come in.",
    },
  ],
};

export const FAQ = {
  eyebrow: "FAQ",
  title: "The six questions your compliance officer will ask.",
  items: [
    {
      question: "Does anything reach a customer without a human?",
      answer:
        "Only within limits you set. The autonomy dial runs each agent from “brief my banker” to “act within these bounds and show me the log.” Vulnerable customers, complaints, and high-value decisions always route to a human.",
    },
    {
      question: "How do you evidence suitability and fair value?",
      answer:
        "Every offer passes a genuine-need gate — is this right for this customer, at fair value, right now — with the rationale logged automatically. That log is your evidence under Consumer Duty, UDAAP expectations, and the EU AI Act.",
    },
    {
      question: "Do we need a data warehouse first?",
      answer:
        "No. The agents connect to your core, digital banking, and interaction data as they are; we do the enrichment ourselves.",
    },
    {
      question: "How is it priced?",
      answer:
        "Per outcome: per deposit dollar retained, per activated account, per product added — with the measurement methodology published before we start. If it doesn't move the number, you don't pay for the number.",
    },
    {
      question: "How long until it's live?",
      answer:
        "60–90 days for the first agent, in production with one measurable outcome — not a platform program, not a pilot that never ends.",
    },
    {
      question: "What about sales-practice risk?",
      answer:
        "Continuous conduct monitoring watches for sales-practice risk patterns, and every action carries a logged rationale — structurally designed to make the next Wells Fargo–style failure impossible, not just unlikely.",
    },
  ],
};

export const CLOSING = {
  eyebrow: "The ask",
  title: "Bring one month of your own numbers.",
  dek: "A 45-minute working session with your retail and compliance leadership, and a look at one month of your attrition or onboarding data. We'll show you exactly what the agents would have caught.",
  actions: [
    { label: "Book the working session", href: "/#contact" },
    { label: "Request the governance pack", href: "/#contact" },
  ],
  expect: {
    label: "What to expect",
    items: [
      "45 minutes with your retail and compliance leadership",
      "A read of one month of your real attrition or onboarding numbers",
      "Exactly what the agents would have caught — line by line",
      "A fixed 60–90 day scope for your first agent",
    ],
  },
};
