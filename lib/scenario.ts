// The scripted demo scenarios. Deterministic, streamed to feel live.
// Scripted and live-LLM modes share these types so the UI never changes shape.

export interface TurnOutput {
  headline: string;
  details: string[];
  badge?: string;
}

export type GateKind = "marketer" | "compliance" | "launch";

export interface Turn {
  kind: "turn";
  id: string;
  agentId: string;
  title: string;
  brainReads: string[]; // One Brain node labels shown as chips
  reasoning: string[];
  output: TurnOutput;
  requiresApproval?: GateKind;
}

export interface Gate {
  kind: "gate";
  id: string;
  gate: GateKind;
  title: string;
  description: string;
}

export type TimelineItem = Turn | Gate;

export interface AssetSet {
  emailSubject: string;
  emailBody: string;
  sms: string;
  banner: string;
  disclosure?: string;
}

export interface Scenario {
  id: string;
  label: string;
  brief: string;
  campaignName: string;
  segmentSize: number;
  channels: string[];
  citations: string[];
  fairnessSummary: string;
  draftAssets: AssetSet;
  finalAssets: AssetSet;
  measurementMetrics: { label: string; value: string }[];
  composedAgent: {
    id: string;
    name: string;
    icon: string;
    oneLiner: string;
    description: string;
    composedFrom: string[];
  };
  items: TimelineItem[];
}

export const HY_SAVINGS_SCENARIO: Scenario = {
  id: "hy-savings",
  label: "High-yield savings, idle balances",
  brief:
    "Launch a campaign for our new 4.25% APY high-yield savings to members with idle checking balances over $10,000, for Q3.",
  campaignName: "HY Savings Idle-Balance Reactivation",
  segmentSize: 4182,
  channels: ["Email", "SMS", "In-app", "Web banner"],
  citations: [
    "Reg DD / Truth-in-Savings, 12 CFR 1030.8: advertisements stating a rate of return must state it as 'annual percentage yield' using that term",
    "Reg DD, 12 CFR 1030.8(c): minimum balance required to obtain the advertised APY must be disclosed",
    "Reg DD, 12 CFR 1030.8(c)(6): a statement that fees could reduce earnings",
    "NCUA advertising rule, 12 CFR 740: official insurance statement on deposit advertising",
  ],
  fairnessSummary:
    "Segment built on balance and activity only. Disparate-impact ratios across protected classes fall between 0.86 and 1.07, inside the 0.80 review threshold. No geographic pattern that proxies for a protected class.",
  draftAssets: {
    emailSubject: "Your money has been sitting still. 4.25% APY says move.",
    emailBody:
      "Hi {first_name},\n\nYou keep a healthy balance in checking. It deserves to earn more. Our new high-yield savings pays 4.25% APY, and moving money takes about a minute in the app.\n\nOpen your high-yield savings today.",
    sms: "Willamette CU: Your new high-yield savings is here. 4.25% APY. Open in the app in about a minute.",
    banner: "4.25% APY high-yield savings. Put idle money to work.",
  },
  finalAssets: {
    emailSubject: "Your money has been sitting still. 4.25% APY says move.",
    emailBody:
      "Hi {first_name},\n\nYou keep a healthy balance in checking. It deserves to earn more. Our new high-yield savings pays 4.25% APY (Annual Percentage Yield), and moving money takes about a minute in the app.\n\nOpen your high-yield savings today.",
    sms: "Willamette CU: Your new high-yield savings is here. 4.25% APY. Open in the app in about a minute. Terms: willamettecu.example/hys",
    banner: "4.25% APY high-yield savings. Put idle money to work.",
    disclosure:
      "APY = Annual Percentage Yield, accurate as of 07/08/2026. $1,000 minimum balance required to obtain the advertised APY. Fees could reduce earnings on the account. Rate may change after account opening. Insured by NCUA.",
  },
  measurementMetrics: [
    { label: "Delivered", value: "4,168 of 4,182" },
    { label: "Open rate", value: "42% [Modeled]" },
    { label: "Click rate", value: "9.1% [Modeled]" },
    { label: "New HY savings accounts", value: "312 [Modeled]" },
    { label: "Balances moved", value: "$18.4M [Modeled]" },
    { label: "Attributed lift vs holdout", value: "+3.1x [Modeled]" },
  ],
  composedAgent: {
    id: "hy-idle-reactivation",
    name: "HY Savings Idle-Balance Reactivation",
    icon: "sparkles",
    oneLiner: "Willamette-tuned agent, composed from this campaign's full run.",
    description:
      "Composed for Willamette Community CU from this campaign. Re-runs the whole flow, segment logic, Reg DD disclosures, brand voice, and sign-off chain included, whenever the savings rate changes.",
    composedFrom: [
      "Willamette rulebook (Reg DD, NCUA advertising)",
      "Brand kit (warm, community-first voice)",
      "Segment logic: idle checking over $10,000",
      "Approval chain: Marketer, Compliance Officer",
      "Outcome: HY savings Q3 results",
    ],
  },
  items: [
    {
      kind: "turn",
      id: "t1",
      agentId: "campaign-production",
      title: "Brief Structurer",
      brainReads: ["Product catalog", "Rate table"],
      reasoning: [
        "Objective: grow high-yield savings balances in Q3.",
        "Product matched in the catalog: high-yield savings at 4.25% APY, $1,000 minimum to obtain the APY.",
        "Audience: members holding idle checking balances over $10,000.",
        "Channels selected from member consent data: email, SMS, in-app, web banner.",
      ],
      output: {
        headline: "Structured brief ready",
        details: [
          "Objective: grow HY savings balances",
          "Product: 4.25% APY high-yield savings",
          "Audience: idle checking over $10,000",
          "Timing: Q3 launch",
          "Channels: email, SMS, in-app, web banner",
        ],
      },
    },
    {
      kind: "turn",
      id: "t2",
      agentId: "fair-lending-segmentation",
      title: "Fair-lending Segmentation",
      brainReads: ["Core data", "Member data summary", "Rulebook: fair lending"],
      reasoning: [
        "Query: checking balance over $10,000 with under 3 debits per month for 90+ days.",
        "Candidate segment: 4,182 members.",
        "Disparate-impact check across protected classes: ratios 0.86 to 1.07, inside the 0.80 review threshold.",
        "No geography, age, or proxy variable drives selection. Segment is balance-and-activity only.",
      ],
      output: {
        headline: "Segment of 4,182 members, fairness check cleared",
        details: [
          "4,182 members match the idle-balance criteria",
          "Disparate-impact ratios: 0.86 to 1.07 across protected classes",
          "No redlining-pattern geography detected",
          "Queued for human review before use",
        ],
        badge: "Fairness: cleared",
      },
    },
    {
      kind: "turn",
      id: "t3",
      agentId: "rate-intel",
      title: "Competitive and Rate Intel",
      brainReads: ["Competitor signals (public)", "Market signals"],
      reasoning: [
        "Scanned public rate sheets for the metro: First Cascade 3.80%, Rose City CU 4.00% (with a $25,000 minimum), Meridian National 3.65%.",
        "Our 4.25% APY is top-quartile in-market, and our $1,000 minimum undercuts the nearest rate rival.",
        "Recommendation: lead every asset with the rate.",
      ],
      output: {
        headline: "4.25% APY is top-quartile in-market. Lead with the rate.",
        details: [
          "Best competing APY: 4.00% at a $25,000 minimum",
          "Our minimum to obtain: $1,000",
          "Suggested angle: rate-led, minimum-friendly",
        ],
        badge: "No integration required",
      },
    },
    {
      kind: "turn",
      id: "t4",
      agentId: "content-optimization",
      title: "Content and Language Optimization",
      brainReads: ["Brand kit", "Outcome history", "Persado scoring"],
      reasoning: [
        "Drafted 6 subject lines, 3 bodies, 2 SMS, 2 banners in the Willamette voice: warm, community-first, no urgency-bait.",
        "Outcome history says rate-led subjects beat benefit-led by 22% for savings offers here.",
        "Scored all variants through the Persado integration for predicted engagement.",
        "Selected the rate-led set with a predicted lift of 14% over the house baseline [Modeled].",
      ],
      output: {
        headline: "Creative set selected, predicted lift +14% [Modeled]",
        details: [
          "Winner: 'Your money has been sitting still. 4.25% APY says move.'",
          "Runner-up: 'A raise for your savings: 4.25% APY.'",
          "Runner-up: 'Idle money is expensive. Fix it in a minute.'",
          "Email, SMS, in-app, and banner drafted to match",
        ],
        badge: "Persado-integrated scoring",
      },
    },
    {
      kind: "turn",
      id: "t5",
      agentId: "compliance-precheck",
      title: "Compliance Pre-check",
      brainReads: ["Rulebook: Reg DD", "Compliance history", "Approval history"],
      reasoning: [
        "The draft states a 4.25% rate. Under Reg DD (12 CFR 1030.8) an advertised rate must be stated as 'annual percentage yield' with required disclosures.",
        "Missing: minimum balance to obtain the advertised APY, and the statement that fees could reduce earnings.",
        "Inserted the standard Willamette Reg DD disclosure block (last revised 2026-03) and the NCUA insurance statement.",
        "Result: first-pass clean. A human still decides.",
      ],
      output: {
        headline: "Disclosures inserted, first-pass clean",
        details: [
          "Added: '$1,000 minimum balance required to obtain the advertised APY'",
          "Added: 'Fees could reduce earnings on the account'",
          "Added: APY term statement and 'Insured by NCUA'",
          "Citations: Reg DD 12 CFR 1030.8, NCUA 12 CFR 740",
        ],
        badge: "First-pass clean",
      },
      requiresApproval: "marketer",
    },
    {
      kind: "gate",
      id: "g1",
      gate: "marketer",
      title: "Marketer approval",
      description:
        "Review the package: segment, creative, and inserted disclosures. Approving routes it to the Compliance Queue for a second, independent human review.",
    },
    {
      kind: "gate",
      id: "g2",
      gate: "compliance",
      title: "Compliance Officer approval",
      description:
        "A second, independent human review in the Compliance Queue, with the full reasoning trail and rule citations. Launch stays locked until this clears.",
    },
    {
      kind: "gate",
      id: "g3",
      gate: "launch",
      title: "Launch",
      description:
        "Both humans have approved. Hand the package to the credit union's send tools.",
    },
    {
      kind: "turn",
      id: "t6",
      agentId: "campaign-production",
      title: "Launch",
      brainReads: ["CRM: consent flags", "Send-tool connection"],
      reasoning: [
        "Package handed to Salesforce Marketing Cloud with Braze and Banno as configured alternates.",
        "Consent and do-not-contact flags enforced at send time: 14 members suppressed.",
        "Nothing sent itself. Two humans approved first.",
      ],
      output: {
        headline: "Launched to 4,182 members across 4 channels",
        details: [
          "Email and SMS queued via Salesforce Marketing Cloud",
          "In-app message published via Banno",
          "Web banner live on the rates page",
        ],
        badge: "Human-approved x2",
      },
    },
    {
      kind: "turn",
      id: "t7",
      agentId: "measurement",
      title: "Measurement and Attribution",
      brainReads: ["Send-tool results", "Core data", "Outcome history"],
      reasoning: [
        "Tracking opens, clicks, and account openings against a 5% holdout.",
        "Attributing balance movement to the campaign window.",
        "Writing results back into One Brain as a new outcome node.",
      ],
      output: {
        headline: "Outcomes attributed and written back to One Brain",
        details: [
          "42% open rate, 9.1% click rate [Modeled]",
          "312 new HY savings accounts [Modeled]",
          "$18.4M in balances moved [Modeled]",
          "New node: 'Outcome: HY savings Q3' added to the brain",
        ],
        badge: "Memory updated",
      },
    },
    {
      kind: "turn",
      id: "t8",
      agentId: "campaign-production",
      title: "Compose Dynamic Agent",
      brainReads: ["This campaign's full trail", "Rulebook", "Brand kit", "Approval chain"],
      reasoning: [
        "This flow, segment logic, disclosures, voice, and sign-off chain, is now a reusable pattern for Willamette.",
        "Proposing a bank-specific dynamic agent that re-runs it whenever the savings rate changes.",
      ],
      output: {
        headline: "Save this as a reusable agent for Willamette CU?",
        details: [
          "Name: HY Savings Idle-Balance Reactivation",
          "Composed from: rulebook, brand kit, segment logic, approval chain, this campaign's outcome",
          "Tuned to Willamette's disclosures, tone, and sign-off chain",
        ],
        badge: "Dynamic agent",
      },
    },
  ],
};

export const AUTO_LOAN_SCENARIO: Scenario = {
  id: "auto-loan",
  label: "Auto-loan rate-drop reactivation",
  brief:
    "Our auto-loan rate just dropped to 5.49% APR. Re-engage members who financed their car elsewhere or have a promo rate expiring this quarter.",
  campaignName: "Auto-Loan Rate-Drop Reactivation",
  segmentSize: 2914,
  channels: ["Email", "SMS", "In-app"],
  citations: [
    "Reg Z / Truth-in-Lending, 12 CFR 1026.24: rate advertising must state the rate as 'annual percentage rate' using that term",
    "Reg Z, 12 CFR 1026.24(d): triggering terms require disclosure of repayment terms",
    "UDAAP: comparative savings claims must be substantiated",
    "NCUA advertising rule, 12 CFR 740",
  ],
  fairnessSummary:
    "Segment built on loan status and payment data only. Disparate-impact ratios between 0.84 and 1.05, inside the review threshold. No proxy variables for protected classes.",
  draftAssets: {
    emailSubject: "Your car loan just got a better offer: 5.49% APR.",
    emailBody:
      "Hi {first_name},\n\nRates moved, and this time in your favor. Refinance your auto loan at 5.49% APR and keep more of every payment. Most members finish the application in under ten minutes.\n\nCheck your rate today.",
    sms: "Willamette CU: Auto refi at 5.49% APR is live. Check your rate in the app.",
    banner: "Refinance at 5.49% APR. Ten minutes, done.",
  },
  finalAssets: {
    emailSubject: "Your car loan just got a better offer: 5.49% APR.",
    emailBody:
      "Hi {first_name},\n\nRates moved, and this time in your favor. Refinance your auto loan at 5.49% APR (Annual Percentage Rate) and keep more of every payment. Most members finish the application in under ten minutes.\n\nCheck your rate today.",
    sms: "Willamette CU: Auto refi at 5.49% APR is live. Check your rate in the app. Terms: willamettecu.example/auto",
    banner: "Refinance at 5.49% APR. Ten minutes, done.",
    disclosure:
      "APR = Annual Percentage Rate, accurate as of 07/08/2026, for qualified borrowers on terms up to 60 months. Example: $25,000 for 60 months at 5.49% APR is about $477 per month. Rate depends on credit and term. Membership required. Insured by NCUA.",
  },
  measurementMetrics: [
    { label: "Delivered", value: "2,899 of 2,914" },
    { label: "Open rate", value: "38% [Modeled]" },
    { label: "Rate checks started", value: "641 [Modeled]" },
    { label: "Loans refinanced", value: "187 [Modeled]" },
    { label: "Balances recaptured", value: "$5.2M [Modeled]" },
  ],
  composedAgent: {
    id: "auto-rate-reactivation",
    name: "Auto-Loan Rate-Change Reactivation",
    icon: "car",
    oneLiner: "Fires the full refi flow whenever Willamette's auto rate moves.",
    description:
      "Composed for Willamette Community CU. Watches the rate table, rebuilds the eligible segment, redrafts Reg Z-clean creative, and routes it through the human sign-off chain whenever the auto rate changes.",
    composedFrom: [
      "Rate table: auto-loan APR",
      "Willamette rulebook (Reg Z, UDAAP)",
      "Segment logic: external auto loans and expiring promos",
      "Approval chain: Marketer, Compliance Officer",
    ],
  },
  items: [
    {
      kind: "turn",
      id: "a1",
      agentId: "campaign-production",
      title: "Brief Structurer",
      brainReads: ["Product catalog", "Rate table"],
      reasoning: [
        "Objective: recapture auto-loan balances after the rate drop to 5.49% APR.",
        "Audience: members with an external auto loan visible in transaction data, plus members with a promo rate expiring this quarter.",
        "Channels from consent data: email, SMS, in-app.",
      ],
      output: {
        headline: "Structured brief ready",
        details: [
          "Objective: auto-loan refinance recapture",
          "Product: auto refinance at 5.49% APR",
          "Audience: external auto loans and expiring promos",
          "Channels: email, SMS, in-app",
        ],
      },
    },
    {
      kind: "turn",
      id: "a2",
      agentId: "fair-lending-segmentation",
      title: "Fair-lending Segmentation",
      brainReads: ["Core data", "Member data summary", "Rulebook: fair lending"],
      reasoning: [
        "Query: recurring external auto-loan payments in transaction data, or internal promo rate expiring within 90 days.",
        "Candidate segment: 2,914 members.",
        "Disparate-impact ratios 0.84 to 1.05, inside the review threshold. No proxy variables used.",
      ],
      output: {
        headline: "Segment of 2,914 members, fairness check cleared",
        details: [
          "2,341 with external auto-loan payments",
          "573 with promo rates expiring this quarter",
          "Fairness ratios inside threshold, queued for human review",
        ],
        badge: "Fairness: cleared",
      },
    },
    {
      kind: "turn",
      id: "a3",
      agentId: "rate-intel",
      title: "Competitive and Rate Intel",
      brainReads: ["Competitor signals (public)"],
      reasoning: [
        "Public sheets: Umpqua Valley Bank from 5.99% APR, Meridian National from 6.24%, captive lenders averaging 6.9% on used.",
        "Our 5.49% APR beats every listed local competitor.",
        "Recommendation: lead with the rate and the ten-minute application.",
      ],
      output: {
        headline: "5.49% APR beats all listed local competitors",
        details: [
          "Nearest competitor: 5.99% APR",
          "Angle: rate-led with a friction-free application",
        ],
        badge: "No integration required",
      },
    },
    {
      kind: "turn",
      id: "a4",
      agentId: "content-optimization",
      title: "Content and Language Optimization",
      brainReads: ["Brand kit", "Outcome history", "Persado scoring"],
      reasoning: [
        "Drafted 5 subjects, 2 bodies, 2 SMS in the Willamette voice.",
        "Scored variants through the Persado integration.",
        "Selected the rate-led set with a predicted lift of 11% over baseline [Modeled].",
      ],
      output: {
        headline: "Creative set selected, predicted lift +11% [Modeled]",
        details: [
          "Winner: 'Your car loan just got a better offer: 5.49% APR.'",
          "Runner-up: 'Keep the car. Shrink the payment.'",
          "Email, SMS, and in-app drafted to match",
        ],
        badge: "Persado-integrated scoring",
      },
    },
    {
      kind: "turn",
      id: "a5",
      agentId: "compliance-precheck",
      title: "Compliance Pre-check",
      brainReads: ["Rulebook: Reg Z", "Compliance history"],
      reasoning: [
        "The draft states 5.49% APR. Under Reg Z (12 CFR 1026.24) the rate must be stated as 'annual percentage rate' and triggering terms require repayment disclosures.",
        "Missing: representative example with term and payment, and qualification language.",
        "Inserted the standard Reg Z example block and the NCUA insurance statement. Removed an unsubstantiated 'lowest rate in town' phrase flagged under UDAAP.",
        "Result: first-pass clean. A human still decides.",
      ],
      output: {
        headline: "Disclosures inserted, one UDAAP flag fixed",
        details: [
          "Added: APR term statement and representative payment example",
          "Added: qualification and term language, 'Insured by NCUA'",
          "Removed: unsubstantiated comparative claim",
          "Citations: Reg Z 12 CFR 1026.24, UDAAP, NCUA 12 CFR 740",
        ],
        badge: "First-pass clean",
      },
      requiresApproval: "marketer",
    },
    {
      kind: "gate",
      id: "ag1",
      gate: "marketer",
      title: "Marketer approval",
      description:
        "Review the package. Approving routes it to the Compliance Queue for a second, independent human review.",
    },
    {
      kind: "gate",
      id: "ag2",
      gate: "compliance",
      title: "Compliance Officer approval",
      description:
        "Second, independent human review with the full trail and Reg Z citations. Launch stays locked until this clears.",
    },
    {
      kind: "gate",
      id: "ag3",
      gate: "launch",
      title: "Launch",
      description: "Both humans have approved. Hand the package to the send tools.",
    },
    {
      kind: "turn",
      id: "a6",
      agentId: "campaign-production",
      title: "Launch",
      brainReads: ["CRM: consent flags", "Send-tool connection"],
      reasoning: [
        "Package handed to Salesforce Marketing Cloud, in-app via Banno.",
        "Consent flags enforced: 15 members suppressed.",
      ],
      output: {
        headline: "Launched to 2,914 members across 3 channels",
        details: [
          "Email and SMS queued via Salesforce Marketing Cloud",
          "In-app message published via Banno",
        ],
        badge: "Human-approved x2",
      },
    },
    {
      kind: "turn",
      id: "a7",
      agentId: "measurement",
      title: "Measurement and Attribution",
      brainReads: ["Send-tool results", "Core data"],
      reasoning: [
        "Tracking rate checks and funded refinances against a holdout.",
        "Writing results back into One Brain.",
      ],
      output: {
        headline: "Outcomes attributed and written back to One Brain",
        details: [
          "38% open rate, 641 rate checks started [Modeled]",
          "187 loans refinanced, $5.2M recaptured [Modeled]",
        ],
        badge: "Memory updated",
      },
    },
    {
      kind: "turn",
      id: "a8",
      agentId: "campaign-production",
      title: "Compose Dynamic Agent",
      brainReads: ["This campaign's full trail", "Rate table", "Approval chain"],
      reasoning: [
        "Rate changes are recurring events. This flow can fire itself, with humans still at every gate.",
        "Proposing a Willamette-specific agent that watches the auto rate.",
      ],
      output: {
        headline: "Save this as a reusable agent for Willamette CU?",
        details: [
          "Name: Auto-Loan Rate-Change Reactivation",
          "Composed from: rate table, rulebook, segment logic, approval chain",
          "Fires on rate change, pauses at every human gate",
        ],
        badge: "Dynamic agent",
      },
    },
  ],
};

export const SCENARIOS: Scenario[] = [HY_SAVINGS_SCENARIO, AUTO_LOAN_SCENARIO];

export function scenarioById(id: string): Scenario {
  return SCENARIOS.find((s) => s.id === id) ?? HY_SAVINGS_SCENARIO;
}
