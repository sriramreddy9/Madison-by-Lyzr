/**
 * "For your team" — the ten teams from the master page, grouped by function
 * type: revenue → risk → ops → corporate. Items without a shipped page stay
 * listed (master design intent) but render non-clickable as "Coming soon".
 *
 * Source: sub-landing/Madison Landing 2/index.html (nav dropdown + ICP router).
 * The Dispute Resolution description reflects the shipped mortgage-servicing
 * dispute-resolution page (client decision), replacing the master's
 * "Payment exceptions end to end" placeholder.
 */
export type TeamNavItem = {
  label: string;
  /** short role line shown in the dropdown (mono) */
  role: string;
  /** longer line used in the homepage ICP router */
  routerLine: string;
  href: string;
  comingSoon?: boolean;
};

export const TEAMS: TeamNavItem[] = [
  {
    label: "Commercial Banking",
    role: "Relationship management",
    routerLine: "Relationship management for the commercial book.",
    href: "/commercial-banking-rm",
  },
  {
    label: "Retail Banking",
    role: "Cross-sell to existing clients",
    routerLine: "Cross-sell to existing consumers and members.",
    href: "/retail-cross-sell",
    comingSoon: true,
  },
  {
    label: "Deal Intelligence",
    role: "M&A · CVC · PE · VC",
    routerLine: "Target scanning across M&A, CVC, PE, and VC.",
    href: "/deal-intelligence",
  },
  {
    label: "Compliant Marketing",
    role: "Brief to compliant launch",
    routerLine: "One brief in, a compliant, launch-ready campaign out.",
    href: "/compliant-marketing",
  },
  {
    label: "Underwriting",
    role: "Credit decisioning at scale",
    routerLine: "Credit decisioning end to end, human in the loop.",
    href: "/underwriting",
    comingSoon: true,
  },
  {
    label: "KYC",
    role: "Identity, sanctions, PEP, UBO",
    routerLine: "Identity, sanctions, PEP, and UBO — one governed pass.",
    href: "/kyc",
    comingSoon: true,
  },
  {
    label: "Risk & Compliance",
    role: "TPRM · Vendor-AI · Model-Risk Governance",
    routerLine: "TPRM, Vendor-AI, and Model-Risk Governance.",
    href: "/risk-compliance",
  },
  {
    label: "Reconciliations",
    role: "Match, break, resolve",
    routerLine: "Match, break, and resolve — every rail, every day.",
    href: "/reconciliations",
    comingSoon: true,
  },
  {
    label: "Dispute Resolution",
    role: "Mortgage servicing, RESPA-ready",
    routerLine: "Servicing disputes investigated, drafted, and closed.",
    href: "/dispute-resolution",
  },
  {
    label: "HR",
    role: "Employee journey, orchestrated",
    routerLine: "The full employee journey, orchestrated.",
    href: "/hr",
  },
];

export const NAV_LINKS = [
  { label: "Platform", href: "/#platform" },
  { label: "Coverage", href: "/#coverage" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Governance", href: "/#governance" },
];
