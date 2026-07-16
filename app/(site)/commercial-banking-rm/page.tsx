import type { Metadata } from "next";
import { JsonLd, SITE_URL, verticalBreadcrumbs } from "@/lib/seo";
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
import { LiveBriefCard } from "@/components/mocks/commercial-banking-rm/LiveBriefCard";
import { ContextFlow } from "@/components/mocks/commercial-banking-rm/ContextFlow";
import {
  META,
  HERO,
  TRUST_STRIP,
  HOW,
  WEDGE,
  WORKSPACES,
  TRUST,
  OUTCOMES,
  ROADMAP,
  FAQ,
  CLOSING,
} from "@/content/commercial-banking-rm";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: "/commercial-banking-rm" },
  openGraph: {
    url: "/commercial-banking-rm",
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
                name: "Madison for Commercial Banking",
                serviceType: "Agentic AI for commercial banking relationship management",
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
                areaServed: "Global",
                description: META.description,
              },
              verticalBreadcrumbs("Commercial Banking", "/commercial-banking-rm"),
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
        <HeroBackdrop src="/images/editorial/briefing.jpg" priority />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
              {HERO.headlineLead}
              <em className="text-brand-text">{HERO.headlineItalic}</em>
            </h1>
            <p className="mt-6 max-w-xl text-dek text-muted-foreground">
              {HERO.subhead}
            </p>
            <p className="mt-4 max-w-xl text-dek font-medium text-foreground">
              {HERO.subheadEmphasis}
            </p>
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
          </div>
          <Reveal className="lg:pl-6">
            <LiveBriefCard />
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

      {/* How it works — stages + context flow */}
      <Section id="how">
        <SectionHeader
          eyebrow={HOW.eyebrow}
          title={HOW.title}
          dek={HOW.dek}
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Stagger className="grid gap-px border bg-border sm:grid-cols-2">
            {HOW.stages.map((stage) => (
              <StaggerItem
                key={stage.num}
                className="bg-background p-6"
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
            <ContextFlow />
          </Reveal>
        </div>
      </Section>

      {/* Where Madison fits — the wedge */}
      <Section tone="sunken" bordered>
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

      {/* Workspaces */}
      <Section id="workspaces">
        <SectionHeader
          eyebrow={WORKSPACES.eyebrow}
          title={WORKSPACES.title}
          dek={WORKSPACES.dek}
        />
        <div className="mt-14 flex flex-col gap-px border bg-border">
          {WORKSPACES.items.map((ws) => (
            <div key={ws.num} className="bg-background p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-brand-text">
                      {ws.num}
                    </span>
                    <h3 className="font-serif text-h3 text-foreground">
                      {ws.title}
                    </h3>
                  </div>
                  <p className="mt-3 font-sans text-base font-medium text-foreground">
                    {ws.headline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {ws.body}
                  </p>
                </div>
                <div>
                  <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                    {ws.insideLabel}
                  </div>
                  <div className="mt-4 grid gap-px border bg-border sm:grid-cols-2">
                    {ws.capabilities.map((cap) => (
                      <div key={cap.name} className="bg-background p-4">
                        <div className="font-sans text-sm font-semibold text-foreground">
                          {cap.name}
                        </div>
                        {"headline" in cap && cap.headline ? (
                          <div className="mt-1 text-sm text-brand-text">
                            {cap.headline}
                          </div>
                        ) : null}
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {cap.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust & sovereignty — Vault band */}
      <Section tone="dark" id="trust">
        <SectionHeader
          eyebrow={TRUST.eyebrow}
          title={TRUST.title}
          dek={TRUST.dek}
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {[TRUST.governance, TRUST.sovereignty].map((col) => (
            <div key={col.title}>
              <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
                {col.title}
              </div>
              <div className="mt-5 flex flex-col gap-px border-t">
                {col.items.map((item) => (
                  <div key={item.h} className="border-b py-5">
                    <h3 className="font-sans text-base font-semibold text-foreground">
                      {item.h}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.b}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-5 rounded-md border bg-card p-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="font-serif text-h3 text-foreground">
              {TRUST.pack.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {TRUST.pack.body}
            </p>
          </div>
          <Button
            href={TRUST.pack.cta.href}
            variant="outline"
            size="md"
            className="shrink-0"
          >
            {TRUST.pack.cta.label}
          </Button>
        </div>
      </Section>

      {/* Outcomes */}
      <Section id="outcomes">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <Eyebrow>{OUTCOMES.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {OUTCOMES.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-dek text-muted-foreground">
              {OUTCOMES.dek}
            </p>
          </div>
        </div>
        <Reveal>
          <StatBand items={OUTCOMES.stats} className="mt-12" />
        </Reveal>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {OUTCOMES.baseline}
        </p>
      </Section>

      {/* Roadmap */}
      <Section tone="sunken" bordered>
        <div className="max-w-160">
          <Eyebrow>{ROADMAP.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-section lg:text-section-lg">
            {ROADMAP.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-dek text-muted-foreground">{ROADMAP.dek}</p>
        </div>
        <StepRail
          className="mt-12"
          steps={ROADMAP.steps.map((s) => ({
            num: s.num,
            title: s.title,
            meta: s.meta,
            body: s.body,
          }))}
        />
      </Section>

      {/* FAQ */}
      <Section id="faq">
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
