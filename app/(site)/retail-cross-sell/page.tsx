import type { Metadata } from "next";
import { JsonLd, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatBand } from "@/components/ui/Stat";
import { StepRail } from "@/components/ui/StepRail";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CheckIcon, MinusIcon } from "@/components/icons";
import { OpportunityInbox } from "@/components/mocks/retail-cross-sell/OpportunityInbox";
import { SenseLoop } from "@/components/mocks/retail-cross-sell/SenseLoop";
import { cn } from "@/lib/utils";
import {
  META,
  HERO,
  TRUST_STRIP,
  PROBLEM,
  HOW,
  WEDGE,
  AGENTS,
  GOVERNANCE,
  ENGAGEMENT,
  FAQ,
  CLOSING,
} from "@/content/retail-cross-sell";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: "/retail-cross-sell" },
  openGraph: {
    url: "/retail-cross-sell",
    title: META.title,
    description: META.description,
  },
};

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
                name: "Madison for Retail Banking",
                serviceType:
                  "Agentic AI for retail banking cross-sell, retention, and onboarding",
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
                areaServed: "Global",
                description: META.description,
              },
              verticalBreadcrumbs("Retail Banking", "/retail-cross-sell"),
              {
                "@type": "FAQPage",
                mainEntity: FAQ.items.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              },
            ],
          } as never
        }
      />

      {/* Hero — Vault band */}
      <section className="dark relative overflow-hidden bg-background py-16 text-foreground md:py-24">
        <HeroBackdrop src="/images/editorial/corridor.jpg" priority />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>{HERO.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
                {HERO.headlineLead}
                <em className="text-brand-text">{HERO.headlineItalic}</em>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-dek text-muted-foreground">
                {HERO.subhead}
              </p>
              <p className="mt-4 max-w-xl text-dek font-medium text-foreground">
                {HERO.subheadEmphasis}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={HERO.primaryCta.href} size="lg">
                  {HERO.primaryCta.label}
                </Button>
                <Button
                  href={HERO.secondaryCta.href}
                  variant="outline"
                  size="lg"
                >
                  {HERO.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <dl className="mt-12 grid grid-cols-3 gap-px border-t border-foreground/30 bg-border/40">
                {HERO.stats.map((s) => (
                  <div key={s.label} className="bg-background pt-6 pr-4">
                    <dd className="font-mono text-stat text-foreground">
                      {s.value}
                    </dd>
                    <dt className="mt-2 text-xs text-muted-foreground">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:pl-6">
            <OpportunityInbox />
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <Section tone="sunken" tight bordered>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="shrink-0 font-mono text-overline uppercase tracking-overline text-muted-foreground">
            {TRUST_STRIP.label}
          </span>
          <div className="flex flex-wrap gap-2">
            {TRUST_STRIP.items.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* The problem you already know */}
      <Section id="problem">
        <div className="max-w-160">
          <Eyebrow>{PROBLEM.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-section lg:text-section-lg">
            {PROBLEM.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-dek text-muted-foreground">{PROBLEM.dek}</p>
        </div>
        <Reveal>
          <StatBand items={PROBLEM.stats} className="mt-12" />
        </Reveal>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {PROBLEM.baseline}
        </p>
      </Section>

      {/* The loop — stages + mock */}
      <Section tone="sunken" bordered id="how">
        <SectionHeader eyebrow={HOW.eyebrow} title={HOW.title} dek={HOW.dek} />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Stagger className="grid gap-px border bg-border sm:grid-cols-2">
            {HOW.stages.map((stage, i) => (
              <StaggerItem
                key={stage.num}
                className={cn(
                  "bg-background p-6",
                  i === HOW.stages.length - 1 && "sm:col-span-2",
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-brand-text">
                    {stage.num}
                  </span>
                  <span className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                    {stage.stage}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-h3 text-foreground">
                  {stage.headline}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stage.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <SenseLoop />
          </Reveal>
        </div>
      </Section>

      {/* Where the workbench fits — the wedge */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>{WEDGE.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {WEDGE.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-dek text-muted-foreground">
              {WEDGE.dek}
            </p>
          </div>
          <Stagger className="grid gap-px border bg-border">
            {WEDGE.cards.map((card) => (
              <StaggerItem
                key={card.v}
                className="flex items-center gap-4 bg-background p-5"
              >
                <span
                  className={
                    card.good
                      ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-text"
                      : "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                  }
                >
                  {card.good ? (
                    <CheckIcon size={16} />
                  ) : (
                    <MinusIcon size={16} />
                  )}
                </span>
                <div>
                  <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                    {card.k}
                  </div>
                  <div className="mt-0.5 font-sans text-base font-medium text-foreground">
                    {card.v}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* The flagship agents */}
      <Section tone="sunken" bordered id="agents">
        <SectionHeader
          eyebrow={AGENTS.eyebrow}
          title={AGENTS.title}
          dek={AGENTS.dek}
        />
        <Stagger className="mt-14 grid gap-px border bg-border sm:grid-cols-2">
          {AGENTS.items.map((agent) => (
            <StaggerItem key={agent.num} className="bg-background p-6 md:p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-brand-text">
                  {agent.num}
                </span>
                <h3 className="font-serif text-h3 text-foreground">
                  {agent.name}
                </h3>
              </div>
              <div className="mt-2 font-mono text-overline uppercase tracking-overline text-muted-foreground">
                {agent.meter}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {agent.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {agent.signals.map((signal) => (
                  <Badge key={signal}>{signal}</Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 flex justify-center">
          <Button href={AGENTS.cta.href} variant="outline" size="md">
            {AGENTS.cta.label}
          </Button>
        </div>
      </Section>

      {/* Governance — Vault band */}
      <Section tone="dark" id="governance">
        <SectionHeader
          eyebrow={GOVERNANCE.eyebrow}
          title={GOVERNANCE.title}
          dek={GOVERNANCE.dek}
        />
        <div className="mt-14 grid gap-x-12 sm:grid-cols-2">
          {GOVERNANCE.items.map((item) => (
            <div key={item.h} className="border-t py-5">
              <h3 className="font-sans text-base font-semibold text-foreground">
                {item.h}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.b}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-5 rounded-md border bg-card p-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl font-serif text-h3 italic text-foreground">
            {GOVERNANCE.pledge.quote}
          </p>
          <Button
            href={GOVERNANCE.pledge.cta.href}
            variant="outline"
            size="md"
            className="shrink-0"
          >
            {GOVERNANCE.pledge.cta.label}
          </Button>
        </div>
      </Section>

      {/* How an engagement works */}
      <Section id="engagement">
        <div className="max-w-160">
          <Eyebrow>{ENGAGEMENT.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-section lg:text-section-lg">
            {ENGAGEMENT.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-dek text-muted-foreground">
            {ENGAGEMENT.dek}
          </p>
        </div>
        <StepRail
          className="mt-12"
          steps={ENGAGEMENT.steps.map((s) => ({
            num: s.num,
            title: s.title,
            meta: s.meta,
            body: s.body,
          }))}
        />
      </Section>

      {/* FAQ */}
      <Section tone="sunken" bordered id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader eyebrow={FAQ.eyebrow} title={FAQ.title} />
          <FaqAccordion items={FAQ.items} />
        </div>
      </Section>

      {/* Closing — Vault band with what-to-expect list */}
      <Section tone="dark" id="contact">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{CLOSING.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {CLOSING.title}
            </h2>
            <p className="mt-5 max-w-md text-dek text-muted-foreground">
              {CLOSING.dek}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {CLOSING.actions.map((action, i) => (
                <Button
                  key={action.label}
                  href={action.href}
                  variant={i === 0 ? "primary" : "outline"}
                  size="lg"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
          <Card className="bg-card/60">
            <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
              {CLOSING.expect.label}
            </div>
            <ul className="mt-5 flex flex-col gap-px border-t">
              {CLOSING.expect.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b py-3.5 text-sm text-muted-foreground"
                >
                  <CheckIcon
                    size={16}
                    className="mt-0.5 shrink-0 text-brand-text"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
