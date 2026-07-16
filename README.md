# Madison by Lyzr — Unified Website

The Agentic Banking OS marketing site: the Madison homepage plus every
vertical landing page, unified under one design system.

- **Stack:** Next.js 16 (App Router, TypeScript, Turbopack), Tailwind CSS v4
  (CSS-first tokens), Motion, next/image, next/font.
- **Routes:** `/` (homepage) · `/commercial-banking-rm` ·
  `/compliant-marketing` · `/risk-compliance` · `/deal-intelligence` ·
  `/dispute-resolution` · `/hr` · `/demo` (interactive product demo,
  noindexed). Retail Banking, Underwriting, KYC, and Reconciliations appear in
  the "For your team" menu as **Coming soon** (no routes yet).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (Turbopack)
```

## How to change the brand (one file)

Every visual property on every page traces to a semantic token defined in
**`app/globals.css`** — that file is the only place brand values live.

- **Colors:** edit the channel variables in `:root` (light "paper") and
  `.dark` ("the Vault" — dark section bands). Example: change the accent by
  editing `--brand`, `--brand-soft`, `--brand-text` in both scopes. Every
  eyebrow, link, focus ring, and data-viz accent on every page updates.
- **Fonts:** swap the three `next/font` loaders in `app/layout.tsx`
  (`--font-source-serif`, `--font-public-sans`, `--font-plex-mono`). The
  `@theme inline` block in `globals.css` maps them to `font-serif` /
  `font-sans` / `font-mono` site-wide.
- **Type scale / radii / shadows / easing:** the static `@theme` block in
  `globals.css`.

Rules the codebase enforces (`docs/AGENT-BRIEF.md` has the full law): no hex
values outside `globals.css`; monochrome buttons only; oxblood is a supporting
accent; images only through `components/ui/Figure` (grayscale by default);
motion limited to fade + 12px rises, honoring `prefers-reduced-motion`.

Dark section bands work by re-scoping: `<Section tone="dark">` adds the
`.dark` class to that band, and because color tokens are registered with
`@theme inline`, every semantic utility inside flips to Vault values — no
`dark:` prefixes in components. (Note: if a runtime light/dark *site theme*
is ever added, colors must keep living as channel variables exactly like
this; do not inline raw values into `@theme`.)

## How to add a new vertical

1. Create `content/<slug>.ts` — all copy as typed consts (verbatim from the
   approved source; cite it in a header comment).
2. Create `app/(site)/<slug>/page.tsx` — assemble shared components
   (`Section`, `SectionHeader`, `StatBand`, `FaqAccordion`, `CtaBand`, …)
   from `components/ui`; export unique `metadata` (+ canonical) and a
   `JsonLd` graph (`lib/seo.tsx`).
3. Bespoke product-mock visuals go in `components/mocks/<slug>/`, composed
   from `PanelFrame` / `KVRow` / `StatusTag` (`components/mocks/chrome.tsx`).
4. Flip the vertical's entry in `content/nav.ts` (`comingSoon: false`, or add
   a new item) — the header dropdown, mobile menu, homepage ICP router, and
   bento grid all read from it.
5. Add the route to `app/sitemap.ts`.
6. Document the copy extraction in `docs/content-map/<slug>.md` and re-run
   the checks in `CONTENT-MAP.md`.

## Environment variables (optional — demo only)

The `/demo` experience runs entirely on a scripted scenario with **zero
configuration**. To enable live model calls:

```
ANTHROPIC_API_KEY=...      # server-side key for /api/agent
NEXT_PUBLIC_LIVE_AI=true   # client flag that switches the demo to live mode
```

See `.env.example`.

## Content provenance

`CONTENT-MAP.md` + `docs/content-map/*.md` record where every page's copy
came from (source file + section) and any documented adaptations
(e.g. auto-scrolling marquee → static badge row, `mailto:` placeholders →
`/#contact`). The advisor photos, institution wordmarks, and hero imagery are
**illustrative placeholders, not production-licensed** — swap before launch.
The Deal Intelligence partner/vendor name-drops are pending Legal/Partner
Marketing clearance per the source page's README.
