# Content Map — provenance & adaptations

Every page's copy is preserved **verbatim in meaning** from a single source in
`../sub-landing/`. Light SEO rephrasing of a heading or meta description is the
only editorial change; claims, stats, and their sources are never altered.
Each `content/<slug>.ts` module carries a header comment citing its exact
source file; this file is the index over all of them plus the documented
adaptations required by the master design system.

## Routes → sources

| Route | Source (in `sub-landing/`) | Product mock |
|---|---|---|
| `/` | `Madison Landing 2/index.html` | bento grid, demo mock, advisor carousel |
| `/commercial-banking-rm` | `commercial-banking/src/routes/index.tsx` (+ `__root.tsx` meta) | LiveBriefCard, ContextFlow |
| `/compliant-marketing` | `marketing-banking/components/madison/*` + `app/landing-page/page.tsx` | inline run console, sample assets, reasoning trail, composer, audit log, rate feed |
| `/deal-intelligence` | `madison-spotlight/index.html` | editorial (DataTable / ComparisonTable) |
| `/dispute-resolution` | `madison-mortgage-servicing-landing/index.html` | DecisionInbox, see-it-run panel |
| `/hr` | `HR-banking.html` | CallCard, AtWorkScreen |
| `/retail-cross-sell` | `Lyzr_E_Client_Facing_Overview.pdf` (repo root, July 2026) | OpportunityInbox, SenseLoop |
| `/retail-cross-sell/workflows` | `Lyzr_A_Agent_Catalog_and_Workflows.pdf` (Doc A, July 2026, `~/Desktop/Research/Demo_build/`) | WorkflowRun |
| `/risk-compliance` | `Madison-Banking-Site/index.html` | RiskCockpit, ScreenPanel ×2, exit screen |
| `/demo` | `marketing-banking/app/demo` + `app/api/agent` + `components/{demo,brand,landing}` + `lib/{scenario,orchestrator,brain,agents}` | ported near-verbatim (fenced sub-app) |

Underwriting, KYC, and Reconciliations have **no source content**; per the
product decision they stay in the "For your team" menu as non-clickable
**Coming soon** items (labels/descriptions from the master page's nav + ICP
router). They have no routes and are absent from `sitemap.ts`.

## Adaptations (design-law driven, meaning preserved)

The master motion law bans autoplay, looping animation, counters, marquees, and
parallax; the master visual law bans hardcoded color. Where a source used one
of those, it is rendered statically or re-tokenized. Nothing meaning-bearing
was dropped.

- **`/risk-compliance`** — the source's animated **compliance marquee** →
  static badge row (`COMPLIANCE_BADGES`); its animated **stat counters** →
  static figures (`STATS`, and the feature stat blocks). Journey rail, the
  comparison table, and the region panels were **JS-injected template literals**
  in the source (`<script>` block, lines 515–671); they are hand-lifted into
  typed consts (`JOURNEY`, `COMPARE`, `REGIONS`). Inline `<b>` / `<span
  class="big">` emphasis flattened to plain text; the teal/navy palette and all
  `#hex` values re-expressed as semantic tokens (oxblood accent / neutrals).
  The interactive region **tabs** render as a static 4-card grid (all content
  shown at once) — no meaning lost.
- **`/compliant-marketing`** — the live-run console, week-one rate feed, and
  audit log render as static panels (no autoplay); the "See it work" CTA points
  to `/demo`.
- **`/hr`** — the source's animated call **waveform** → static; the single
  allowed pulse dot marks the "On call" status. Blue accent `#1E4B7A`
  re-tokenized to brand/success (the design system carries no blue). The
  visible FAQ is surfaced from the source page's JSON-LD `FAQPage`; the source's
  `SoftwareApplication` + `FAQPage` + `Breadcrumb` JSON-LD is ported.
- **`/commercial-banking-rm`** — TanStack Router route plumbing dropped for Next
  metadata; `max-w-7xl` normalized to the 1152px container; teal accents →
  brand/neutral. The animated relationship-workflow visual → static
  `ContextFlow`.
- **`/retail-cross-sell`** — sourced from the client-facing PDF (not
  `sub-landing/`): "The Lyzr Agentic Workbench" is rendered as "Madison" /
  "the workbench" per site brand; the PDF's Sense→Judge→Engage→Execute→Learn
  table and flagship-agent cards are hand-lifted into typed consts (`HOW`,
  `AGENTS`); stats, pricing meters, and governance claims unchanged. The
  continuous loop renders as the static `SenseLoop` panel (motion law).
- **`/retail-cross-sell/workflows`** — sourced from Doc A of the 5-doc series
  (agent catalog + nine workflow blueprints). Carries blueprints 1–4 (the four
  that map to the parent page's flagship agents), the L0–L4 autonomy ladder,
  the three shared assets, and the day-in-the-life narrative; KPIs and
  "why it wins" lines verbatim. Doc A states **no per-agent pricing** — none
  invented. Doc A's physical page 6 (Pods 2–3, agents #11–21) is missing from
  the source PDF; Blueprint-3 agent names are used as cited in the blueprint,
  not the catalog. "SMB Graduation" (Doc A) = "Business-Banking Graduation"
  (Doc E / parent page); parent naming kept. One live workflow run renders as
  the static `WorkflowRun` panel (motion law).
- **`/dispute-resolution`** — the menu description was updated from the master's
  "Payment exceptions end to end" to mortgage-servicing dispute-resolution
  wording (product decision). `<b>` runs preserved as a typed `RichText` type.
- **CTAs** — `mailto:` placeholders in the sources route to `/#contact` (the
  homepage contact band). The two demo CTAs point to `/demo`.

## Imagery & legal notes

- Advisor photos, institution wordmarks, and hero imagery are **illustrative
  placeholders, not production-licensed** — swap before launch. All imagery is
  grayscale-by-default via `components/ui/Figure`.
- **`/deal-intelligence`** name-drops market-data vendors, system integrators,
  banking innovation networks, and cloud platforms. Per the source's README
  these are **pending Legal / Partner-Marketing clearance** ("do not publish the
  partner section externally until logo usage and name-drops are cleared with
  each named partner"). The names are kept verbatim; clear before launch.

## Verification

- `npm run build` — green; all 8 app routes prerender (6 verticals + home +
  demo) with `/api/agent` as a dynamic route.
- No hex outside `app/globals.css`; no `rounded-xl+`/`lucide-react`/raw `<img>`
  outside `components/demo` (the fenced sub-app).
- One `<h1>` per page (verified on all six verticals).
- One-token test: editing `--brand` in `globals.css` repaints every page;
  brand is defined only in `:root` / `.dark` / `.light` and bridged via
  `@theme inline`.
- Internal link check: every in-app `href` resolves 200; coming-soon items
  render as text, not anchors.
- `/demo` runs the full scripted scenario with **zero env vars**
  (`/api/agent` returns `mode: "scripted"` when `ANTHROPIC_API_KEY` is unset).
