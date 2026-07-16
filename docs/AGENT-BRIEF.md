# Madison Website — Vertical Page Build Brief

You are building ONE vertical page for the unified Madison by Lyzr site
(`/Users/sriramreddy/lyzr/Madison-by-Lyzr/madison-website`, Next.js 16 App
Router + TypeScript + Tailwind v4 + Motion). The master design system governs
every page — zero design drift. The vertical's copy must be preserved
**verbatim in meaning** from its source (light SEO rephrasing of a heading is
acceptable; intent/claims/stats never change; never invent content).

## Non-negotiable rules

1. **Verbatim copy.** Every headline, stat (+ its source/footnote), feature,
   FAQ, CTA label from the source survives with meaning intact. No blending
   with other verticals. No invented claims.
2. **Tokens only.** Never a hex value, arbitrary color (`bg-[#...]`,
   `text-[hsl(...)]`), or non-token color anywhere. All color via the semantic
   utilities listed below. Inline SVG uses `currentColor` or token classes.
3. **One `<h1>` per page** — the vertical's hero headline. Mock/panel titles
   are styled `div`/`span`, never headings out of order.
4. **No page-local CSS files, no `<style>`, no new npm deps.**
5. **Monochrome buttons only** (use `Button`). Oxblood (`brand`) is a
   supporting accent: eyebrows, links, active states, ONE moment per band.
   Feedback colors only as soft tints (`Badge` tones / `*-soft` + `*-text`).
6. **Motion law:** only `Reveal`/`Stagger` wrappers (fade + 12px rise, once).
   NO counters, marquees, parallax, autoplay, scroll-progress bars, spinning
   things. A single small pulse dot (`StatusTag status="running"`) is the max.
   If the source had a marquee/counter → render static.
7. **Section spine:** hero → problem/pain → solution/how → capabilities →
   proof/trust → detail → FAQ (if source has one) → CTA. Use the source's
   own sections mapped onto this rhythm; do not drop meaning-bearing sections.
8. **Dark bands:** hero, governance/security-heavy band, and the closing CTA
   use `tone="dark"` (or `className="dark ..."` for custom heroes). Alternate
   paper / sunken / dark deliberately.
9. **Images:** only via `Figure`. Grayscale enforced by default. Use sparingly
   (hero band or 1 section opener). Allowed sources: local
   `/images/editorial/*.jpg`, `/images/architecture/*.jpg`, or
   `https://images.unsplash.com/...` URLs (already whitelisted). Every image
   needs meaningful `alt` (or `alt=""` if decorative).
10. **JSX copy hazards:** `<24h` must be written `{"<24h"}`; keep `—`, `·`,
    `×`, `€` characters as-is; decode HTML entities (`&amp;` → `&`).
11. **Do not modify ANY existing file.** Only create your own new files (see
    File ownership). Shared components/tokens are frozen — if something seems
    missing, compose from primitives inside your own mocks folder.

## File ownership (create exactly these)

- `content/<slug>.ts` — ALL page copy as typed exported consts, verbatim,
  with a header comment citing the source file.
- `app/(site)/<slug>/page.tsx` — the page. Server component. Exports
  `metadata` (unique `title`, `description`, `alternates.canonical`,
  `openGraph`) and renders `<JsonLd data={...}>`.
- `components/mocks/<slug>/*.tsx` — bespoke product-mock visuals (only if the
  source has them). Client component ONLY if it animates.
- `docs/content-map/<slug>.md` — the content map: every source section in
  order, with the verbatim copy you extracted and source line refs, plus notes
  on anything intentionally adapted (e.g. marquee → static) and why.

## Component API (import paths are exact)

```tsx
import { Section } from "@/components/ui/Section";
// <Section id="..." tone="paper|sunken|dark" tight bordered className containerClassName>
//   wraps children in the 1152px Container; py-24 (tight: py-16)

import { SectionHeader } from "@/components/ui/SectionHeader";
// <SectionHeader eyebrow="..." title={<>...</>} dek="..." align="left|center" />

import { Eyebrow } from "@/components/ui/Eyebrow";       // <Eyebrow tone="brand|muted">
import { Container } from "@/components/ui/Container";   // 1152px, px-6
import { Button } from "@/components/ui/Button";
// <Button href="#contact" variant="primary|outline|ghost" size="sm|md|lg">

import { Card } from "@/components/ui/Card";              // flat bordered card; interactive for hover lift
import { Badge } from "@/components/ui/Badge";
// <Badge tone="neutral|brand|success|warning|danger|info">  — chips, reg pills, status

import { Stat, StatBand, type StatItem } from "@/components/ui/Stat";
// <StatBand items={[{value:"72%", label:"...", footnote:"Source, 2024"}]} />  (1–4 items)

import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
// <FaqAccordion items={[{question:"...", answer:"..."}]} />   ("use client" inside — just render it)

import { ComparisonTable } from "@/components/ui/ComparisonTable";
// columns: string[]; rows: {label, cells: (boolean|string)[]}; highlightCol?: number

import { DataTable } from "@/components/ui/DataTable";
// head: string[]; rows: ReactNode[][]  — editorial tables (workflows, stacks, partners)

import { Tabs, type TabItem } from "@/components/ui/Tabs";  // regions etc.
import { StepRail, type StepItem } from "@/components/ui/StepRail";
// steps: {num?, title, body?, meta?, highlighted?}[] — numbered journeys/flows

import { CtaBand } from "@/components/ui/CtaBand";
// <CtaBand id="contact" eyebrow title line actions={[{label, href, variant}]} />

import { Figure } from "@/components/ui/Figure";
// <Figure src alt ratio="wide|editorial|portrait|tall|square"
//         treatment="grayscale|duotone" caption credit priority sizes />

import { Reveal } from "@/components/motion/Reveal";       // <Reveal delay={0.08}>
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

import { PanelFrame, KVRow, StatusTag } from "@/components/mocks/chrome";
// PanelFrame: bordered panel w/ mono title bar + optional status node
// KVRow: label/value hairline row · StatusTag: status="done|running|queued|flagged|waiting"

import { JsonLd, SITE_URL, ORGANIZATION, verticalBreadcrumbs } from "@/lib/seo";
import {
  ShieldIcon, LockIcon, UserCheckIcon, AuditTrailIcon, ChevronDownIcon,
  ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, CheckIcon, MinusIcon,
  MenuIcon, CloseIcon, PlayIcon, GlobeIcon, BuildingIcon, CpuIcon,
  LayersIcon, PlugIcon,
} from "@/components/icons";  // 1.6px-stroke house set; size / className / strokeWidth props
import { cn } from "@/lib/utils";
```

## Token utilities you may use

- **Color:** `bg-background bg-card bg-muted bg-popover bg-primary bg-accent
  bg-brand bg-brand-soft bg-border bg-input` · text equivalents
  (`text-foreground text-muted-foreground text-primary-foreground
  text-brand-text text-success-text text-warning-text text-danger-text
  text-info-text text-card-foreground`) · `border-border border-input
  border-brand/30` etc. Soft fills: `bg-success-soft bg-warning-soft
  bg-danger-soft bg-info-soft`. Opacity modifiers allowed (`bg-brand/10`).
- **Type:** `font-serif font-sans font-mono` ·
  steps: `text-hero-sm text-hero text-hero-lg` (hero h1, responsive:
  `text-hero-sm sm:text-hero lg:text-hero-lg`), `text-section
  lg:text-section-lg` (h2 — SectionHeader does this for you), `text-h3`,
  `text-dek`, `text-stat` (mono figures), `text-overline tracking-overline
  uppercase` (eyebrows), `text-btn`, plus standard `text-xs…text-xl`.
- **Radius:** `rounded-xs` (2px, buttons) `rounded-sm` (2px) `rounded-md`
  (4px, cards) `rounded-lg` (6px) `rounded-full` (dots only). NEVER
  `rounded-xl`+ outside /demo.
- **Shadow:** none at rest; `shadow-md` hover-lift; `shadow-lg` overlays only.
- **Motion:** `duration-120 duration-180 ease-standard ease-expressive`.
- **Layout:** container is handled by `Section`/`Container`; hairline grids:
  `grid gap-px border bg-border` with children `bg-background p-6` (or
  `bg-card`).

## Page skeleton

```tsx
import type { Metadata } from "next";
import { JsonLd, SITE_URL, verticalBreadcrumbs } from "@/lib/seo";
// ...component imports, content import from "@/content/<slug>"

export const metadata: Metadata = {
  title: "<Vertical> — <promise>",           // unique; template appends "| Madison by Lyzr"
  description: "<source meta or hero subhead, ≤160 chars>",
  alternates: { canonical: "/<slug>" },
  openGraph: { url: "/<slug>", title: "...", description: "..." },
};

export default function Page() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "Service", name: "...", serviceType: "...",
          provider: { "@type": "Organization", name: "Madison by Lyzr" },
          description: "..." },
        verticalBreadcrumbs("<Vertical>", "/<slug>"),
        // + {"@type":"FAQPage", mainEntity:[...]} if the source has FAQs
      ] } as never} />
      {/* hero: custom section with className="dark bg-background text-foreground"
          (+ optional Figure/Image treatment) OR <Section tone="dark"> */}
      {/* ...bands..., every band content-driven from content/<slug>.ts */}
      <CtaBand ... />   {/* closing dark band; primary CTA href="/#contact"
                            unless the source demands otherwise */}
    </>
  );
}
```

Note on JsonLd typing: build the object as a `Graph`
(`{"@context":"https://schema.org","@graph":[...]}`) and pass it; if schema-dts
typing fights you, cast `as never` on the prop — runtime output is what matters.

CTAs: point demo/contact CTAs to `/#contact` (homepage contact band) unless
the brief for your page says otherwise. Never `mailto:` (placeholders in the
sources) — route them to `/#contact`.

The header/footer/nav are provided by the layout — do NOT render your own nav
or footer, and do NOT duplicate the site-wide footer content from your source.
Your page starts at the hero.

## Verify before you finish

From `/Users/sriramreddy/lyzr/Madison-by-Lyzr/madison-website`:

```bash
npx tsc --noEmit          # zero errors in YOUR files
npx eslint app/\(site\)/<slug> content/<slug>.ts components/mocks/<slug> --no-error-on-unmatched-pattern
grep -rn "#[0-9a-fA-F]\{3\}" app/\(site\)/<slug> components/mocks/<slug> content/<slug>.ts   # must be EMPTY
```

Do NOT run `npm run build` or `npm run dev` (other agents are working in the
same tree).
