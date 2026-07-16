import type { Metadata } from "next";
import { JsonLd, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CheckIcon } from "@/components/icons";
import {
  HERO,
  DATA_SOURCES,
  WHITESPACE,
  AGENT,
  WORKFLOWS,
  STACK,
  PARTNERS,
  DIFFERENTIATION,
  GOVERNANCE,
  DEPLOYMENT,
  DISTRIBUTION,
  START,
  CLOSING_CTA,
  type SplitTitle,
} from "@/content/deal-intelligence";

export const metadata: Metadata = {
  title: "Deal Intelligence — Evidence-Backed Deal Intelligence for Banks",
  description:
    "Madison / Spotlight turns fragmented market data, internal documents, and relationship history into decision-ready intelligence — partner, invest, acquire, monitor, or pass.",
  alternates: { canonical: "/deal-intelligence" },
  openGraph: {
    url: "/deal-intelligence",
    title: "Deal Intelligence for Banks — Madison / Spotlight",
    description:
      "Evaluate companies, partners, targets, and pitch opportunities with evidence, context, and institutional memory.",
  },
};

function Title({ value }: { value: SplitTitle }) {
  return (
    <>
      {value.main} <span className="text-muted-foreground">{value.thin}</span>
    </>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Madison / Spotlight — Deal Intelligence for Banks",
                serviceType: "Deal intelligence and evaluation for banking teams",
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
                areaServed: "Global",
                description:
                  "An intelligence layer that turns market data, internal documents, and relationship history into decision-ready evaluations with human approval and permissioned deal memory.",
              },
              verticalBreadcrumbs("Deal Intelligence", "/deal-intelligence"),
            ],
          } as never
        }
      />

      {/* Hero — Vault band */}
      <section className="dark relative overflow-hidden bg-background py-16 text-foreground md:py-24">
        <HeroBackdrop src="/images/editorial/boardroom.jpg" priority />
        <div className="relative mx-auto max-w-6xl px-6">
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
            {HERO.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-dek text-muted-foreground">
            {HERO.subhead}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {HERO.descriptionLead}
                </span>
                {HERO.descriptionRest}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {HERO.description2}
              </p>
            </div>
            <div className="rounded-md border bg-card/60 p-5">
              <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                {HERO.decision.label}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-serif text-h3">
                {HERO.decision.words.map((w) => (
                  <span
                    key={w.text}
                    className={
                      w.accent
                        ? "text-brand-text"
                        : w.muted
                          ? "text-muted-foreground/60"
                          : "text-foreground"
                    }
                  >
                    {w.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
            {HERO.evidenceLine}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={HERO.primaryCta.href} size="lg">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="outline" size="lg">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* Data sources */}
      <Section tone="sunken" bordered>
        <Eyebrow>{DATA_SOURCES.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={DATA_SOURCES.title} />
        </h2>
        <p className="mt-5 max-w-3xl text-dek text-muted-foreground">
          {DATA_SOURCES.copy}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y py-6">
          {DATA_SOURCES.logos.map((logo) => (
            <span
              key={logo}
              className="font-serif text-lg text-muted-foreground"
            >
              {logo}
            </span>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {DATA_SOURCES.note}
        </p>
      </Section>

      {/* 01 White space */}
      <Section id="white-space">
        <Eyebrow>{WHITESPACE.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={WHITESPACE.title} />
        </h2>
        <div className="mt-5 max-w-3xl space-y-3 text-dek text-muted-foreground">
          {WHITESPACE.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Reveal>
          <DataTable
            className="mt-10"
            head={WHITESPACE.table.head}
            rows={WHITESPACE.table.rows}
          />
        </Reveal>
        <p className="mt-8 max-w-3xl text-dek text-foreground">
          {WHITESPACE.punchLead}
          <strong className="font-semibold">{WHITESPACE.punchStrong}</strong>
        </p>
      </Section>

      {/* 02 What it does */}
      <Section tone="sunken" bordered>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{AGENT.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              <Title value={AGENT.title} />
            </h2>
            <blockquote className="mt-6 border-l-2 border-brand pl-4 font-serif text-h3 text-foreground">
              {AGENT.brief}
            </blockquote>
            <p className="mt-6 text-dek text-muted-foreground">{AGENT.close}</p>
          </div>
          <Stagger className="border-t">
            {AGENT.steps.map((step) => (
              <StaggerItem
                key={step.num}
                className="flex items-baseline gap-4 border-b py-4"
              >
                <span className="font-mono text-sm text-brand-text">
                  {step.num}
                </span>
                <span className="text-base text-foreground">{step.title}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 03 Core workflows */}
      <Section id="workflows">
        <Eyebrow>{WORKFLOWS.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={WORKFLOWS.title} />
        </h2>
        <Reveal>
          <DataTable className="mt-10" head={WORKFLOWS.head} rows={WORKFLOWS.rows} />
        </Reveal>
      </Section>

      {/* 04 The stack */}
      <Section id="stack" tone="sunken" bordered>
        <Eyebrow>{STACK.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={STACK.title} />
        </h2>
        <p className="mt-5 max-w-3xl text-dek text-muted-foreground">
          {STACK.lede}
        </p>
        <Reveal>
          <DataTable className="mt-10" head={STACK.head} rows={STACK.rows} />
        </Reveal>
      </Section>

      {/* 05 Partners */}
      <Section id="partners">
        <Eyebrow>{PARTNERS.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={PARTNERS.title} />
        </h2>
        <p className="mt-5 max-w-3xl text-dek text-muted-foreground">
          {PARTNERS.lede}
        </p>
        <Reveal>
          <DataTable className="mt-10" head={PARTNERS.head} rows={PARTNERS.rows} />
        </Reveal>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {PARTNERS.note}
        </p>
      </Section>

      {/* 06 Differentiation */}
      <Section tone="sunken" bordered>
        <Eyebrow>{DIFFERENTIATION.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={DIFFERENTIATION.title} />
        </h2>
        <Reveal>
          <ComparisonTable
            className="mt-10"
            columns={DIFFERENTIATION.columns}
            rows={DIFFERENTIATION.rows}
            highlightCol={DIFFERENTIATION.highlightCol}
          />
        </Reveal>
        <p className="mt-8 max-w-3xl text-dek text-foreground">
          {DIFFERENTIATION.bottom}
        </p>
      </Section>

      {/* 07 Governance — Vault band */}
      <Section tone="dark" id="governance">
        <Eyebrow>{GOVERNANCE.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={GOVERNANCE.title} />
        </h2>
        <p className="mt-5 max-w-3xl text-dek text-muted-foreground">
          {GOVERNANCE.lede}
        </p>
        <Reveal>
          <DataTable className="mt-10" head={GOVERNANCE.head} rows={GOVERNANCE.rows} />
        </Reveal>
        <p className="mt-8 font-serif text-h3 text-brand-text">
          {GOVERNANCE.punch}
        </p>
      </Section>

      {/* 08 Deployment */}
      <Section id="deployment">
        <Eyebrow>{DEPLOYMENT.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={DEPLOYMENT.title} />
        </h2>
        <p className="mt-5 max-w-3xl text-dek text-muted-foreground">
          {DEPLOYMENT.lede}
        </p>
        <Stagger className="mt-10 grid gap-px border bg-border md:grid-cols-2">
          {DEPLOYMENT.phases.map((phase) => (
            <StaggerItem key={phase.num} className="bg-background p-6">
              <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
                {phase.num}
              </div>
              <h3 className="mt-2 font-serif text-h3 text-foreground">
                {phase.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {phase.focus}
              </p>
              <div className="mt-4 border-t pt-3">
                <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {DEPLOYMENT.getsLabel}
                </span>
                <p className="mt-1 text-sm text-foreground">{phase.gets}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 09 Distribution */}
      <Section tone="sunken" bordered>
        <Eyebrow>{DISTRIBUTION.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={DISTRIBUTION.title} />
        </h2>
        <p className="mt-5 max-w-3xl text-dek text-muted-foreground">
          {DISTRIBUTION.lede}
        </p>
        <Reveal>
          <DataTable
            className="mt-10"
            head={DISTRIBUTION.head}
            rows={DISTRIBUTION.rows}
          />
        </Reveal>
      </Section>

      {/* 10 Start with one workflow */}
      <Section id="start">
        <Eyebrow>{START.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-section lg:text-section-lg">
          <Title value={START.title} />
        </h2>
        <div className="mt-10 grid gap-px border bg-border lg:grid-cols-2">
          <div className="bg-background p-6 md:p-8">
            <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
              {START.briefLabel}
            </div>
            <blockquote className="mt-3 font-serif text-h3 text-foreground">
              {START.brief}
            </blockquote>
            <div className="mt-6 font-mono text-overline uppercase tracking-overline text-brand-text">
              {START.returnsLabel}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {START.returns.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckIcon size={15} className="mt-0.5 shrink-0 text-brand-text" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted p-6 md:p-8">
            <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
              {START.expandLabel}
            </div>
            <h3 className="mt-3 font-serif text-h3 text-foreground">
              {START.expandTitle}
            </h3>
            <ul className="mt-5 flex flex-col gap-px border-t">
              {START.expands.map((item) => (
                <li
                  key={item}
                  className="border-b py-3 text-sm text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Closing — Vault band */}
      <Section tone="dark" id="contact">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{CLOSING_CTA.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-section lg:text-section-lg">
            {CLOSING_CTA.title}
          </h2>
          <p className="mt-4 text-dek text-muted-foreground">{CLOSING_CTA.sub}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-px border bg-border sm:grid-cols-3">
          {CLOSING_CTA.steps.map((step) => (
            <div key={step.num} className="bg-background p-5 text-center">
              <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
                {step.num}
              </div>
              <div className="mt-2 text-sm font-medium text-foreground">
                {step.title}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CLOSING_CTA.actions.map((action) => (
            <Button
              key={action.label}
              href={action.href}
              variant={"variant" in action ? action.variant : "primary"}
              size="lg"
            >
              {action.label}
            </Button>
          ))}
        </div>
        <p className="mt-10 text-center font-serif text-h3 text-brand-text">
          {CLOSING_CTA.punch}
        </p>
      </Section>
    </>
  );
}
