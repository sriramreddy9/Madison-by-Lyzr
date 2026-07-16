import type { Metadata } from "next";
import { Fragment } from "react";
import { JsonLd, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatBand } from "@/components/ui/Stat";
import { StepRail } from "@/components/ui/StepRail";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PanelFrame } from "@/components/mocks/chrome";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  CheckIcon,
  PlugIcon,
  AuditTrailIcon,
  LockIcon,
  ShieldIcon,
  UserCheckIcon,
  CpuIcon,
} from "@/components/icons";
import { DecisionInbox } from "@/components/mocks/dispute-resolution/DecisionInbox";
import {
  META,
  HERO,
  TRUST_STRIP,
  CLOCK,
  OUTCOMES,
  SAFE,
  LOOP,
  RUN,
  STACK,
  FAQ,
  WHO,
  BOOK,
  type RichText,
  type StackIconKey,
} from "@/content/dispute-resolution";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: "/dispute-resolution" },
  openGraph: {
    url: "/dispute-resolution",
    title: META.title,
    description: META.description,
  },
};

const STACK_ICONS: Record<StackIconKey, typeof PlugIcon> = {
  plug: PlugIcon,
  audit: AuditTrailIcon,
  lock: LockIcon,
  eye: ShieldIcon,
  users: UserCheckIcon,
  bolt: CpuIcon,
};

function Rich({ parts }: { parts: RichText }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <strong key={i} className="font-semibold text-foreground">
            {p.strong}
          </strong>
        ),
      )}
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
                name: "Madison for Mortgage Servicing Dispute Resolution",
                serviceType: "Agentic dispute resolution for mortgage servicing",
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
                areaServed: "United States",
                description: META.description,
              },
              verticalBreadcrumbs("Dispute Resolution", "/dispute-resolution"),
              {
                "@type": "FAQPage",
                mainEntity: FAQ.items.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: f.answer
                      .map((p) => (typeof p === "string" ? p : p.strong))
                      .join(""),
                  },
                })),
              },
            ],
          } as never
        }
      />

      {/* Hero — Vault band */}
      <section className="dark bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
              {HERO.headline1}{" "}
              <span className="text-brand-text">{HERO.headline2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-dek text-muted-foreground">
              {HERO.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={HERO.primaryCta.href} size="lg">
                {HERO.primaryCta.label}
              </Button>
              <Button href={HERO.secondaryCta.href} variant="outline" size="lg">
                {HERO.secondaryCta.label}
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {HERO.microTrust.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
          <Reveal>
            <DecisionInbox />
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <Section tone="sunken" tight bordered>
        <Stagger className="flex flex-wrap gap-2">
          {TRUST_STRIP.chips.map((chip) => (
            <StaggerItem key={chip}>
              <Badge>{chip}</Badge>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-8 border-t pt-6">
          <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
            {TRUST_STRIP.regLabel}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TRUST_STRIP.regPills.map((pill) => (
              <Badge key={pill} tone="info">
                {pill}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* The clock */}
      <Section id="clock">
        <SectionHeader eyebrow={CLOCK.eyebrow} title={CLOCK.title} dek={CLOCK.dek} />
        <Stagger className="mt-12 grid gap-px border bg-border md:grid-cols-3">
          {CLOCK.pains.map((pain) => (
            <StaggerItem key={pain.lead} className="bg-background p-6">
              <h3 className="font-serif text-h3 text-foreground">{pain.lead}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pain.text}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <StatBand items={CLOCK.stats} className="mt-12" />
        </Reveal>
      </Section>

      {/* Outcomes */}
      <Section tone="sunken" bordered>
        <SectionHeader eyebrow={OUTCOMES.eyebrow} title={OUTCOMES.title} dek={OUTCOMES.dek} />
        <Stagger className="mt-12 grid gap-px border bg-border md:grid-cols-3">
          {OUTCOMES.cards.map((card) => (
            <StaggerItem key={card.figure} className="bg-background p-6">
              <div className="font-mono text-stat text-foreground">
                {card.figure}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
              <div className="mt-4 font-mono text-xs text-muted-foreground/80">
                {card.source}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* How it stays safe */}
      <Section id="safe">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeader eyebrow={SAFE.eyebrow} title={SAFE.title} dek={SAFE.dek} />
          <div>
            <StepRail steps={SAFE.steps} />
          </div>
        </div>
        <div className="mt-10 rounded-md border bg-muted p-6 text-center">
          <p className="text-dek text-foreground">
            {SAFE.govline.lead}{" "}
            <strong className="font-semibold">{SAFE.govline.strong}</strong>{" "}
            {SAFE.govline.tail}
          </p>
        </div>
      </Section>

      {/* Prevent / Resolve */}
      <Section tone="sunken" bordered>
        <SectionHeader eyebrow={LOOP.eyebrow} title={LOOP.title} dek={LOOP.dek} />
        <div className="mt-12 grid gap-px border bg-border lg:grid-cols-2">
          {LOOP.halves.map((half) => (
            <div key={half.tag} className="bg-background p-6 md:p-8">
              <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
                {half.tag}
              </div>
              <h3 className="mt-3 font-serif text-h3 text-foreground">
                {half.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {half.desc}
              </p>
              <ul className="mt-5 flex flex-col gap-px border-t">
                {half.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b py-3 text-sm text-muted-foreground"
                  >
                    <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-text" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-medium text-foreground">
                {half.foot}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-dek text-muted-foreground">
          <strong className="font-semibold text-foreground">
            {LOOP.note.strong}
          </strong>{" "}
          {LOOP.note.tail}
        </p>
      </Section>

      {/* See it run */}
      <Section id="run">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <SectionHeader eyebrow={RUN.eyebrow} title={RUN.title} dek={RUN.dek} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={RUN.primaryCta.href} size="lg">
                {RUN.primaryCta.label}
              </Button>
              <Button href={RUN.secondaryCta.href} variant="outline" size="lg">
                {RUN.secondaryCta.label}
              </Button>
            </div>
          </div>
          <Reveal>
            <PanelFrame title={RUN.panelTitle}>
              <ol>
                {RUN.steps.map((step) => (
                  <li
                    key={step.label}
                    className={
                      "flex items-baseline justify-between gap-4 border-b border-border/70 px-4 py-3 last:border-b-0" +
                      (step.highlighted ? " bg-muted" : "")
                    }
                  >
                    <span className="flex items-baseline gap-3 text-sm text-foreground">
                      <CheckIcon
                        size={14}
                        className="shrink-0 translate-y-0.5 text-success-text"
                      />
                      {step.label}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {step.status}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="border-t bg-muted px-4 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-overline uppercase tracking-overline text-brand-text">
                    {RUN.outcomeLabel}
                  </span>
                  <Badge tone="brand">{RUN.outcomeBadge}</Badge>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground">
                  {RUN.outcomeBody}
                </p>
                <div className="mt-3 font-mono text-[11px] text-muted-foreground">
                  {RUN.outcomeNote}
                </div>
                <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {RUN.recompute}
                </div>
              </div>
            </PanelFrame>
          </Reveal>
        </div>
      </Section>

      {/* Onboarding / stack */}
      <Section tone="sunken" bordered>
        <SectionHeader eyebrow={STACK.eyebrow} title={STACK.title} dek={STACK.dek} />
        <Stagger className="mt-12 grid gap-px border bg-border md:grid-cols-2 lg:grid-cols-3">
          {STACK.cards.map((card) => {
            const Icon = STACK_ICONS[card.icon];
            return (
              <StaggerItem key={card.title} className="bg-background p-6">
                <Icon size={22} className="text-brand-text" strokeWidth={1.6} />
                <h3 className="mt-4 font-sans text-base font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {card.chips.map((chip) => (
                    <Badge key={chip}>{chip}</Badge>
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader eyebrow={FAQ.eyebrow} title={FAQ.title} />
          <FaqAccordion
            items={FAQ.items.map((f) => ({
              question: f.question,
              answer: <Rich parts={f.answer} />,
            }))}
          />
        </div>
      </Section>

      {/* Is this you */}
      <Section tone="sunken" bordered>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>{WHO.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {WHO.title}
            </h2>
            <ul className="mt-8 flex flex-col gap-px border-t">
              {WHO.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b py-4 text-sm text-muted-foreground"
                >
                  <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-text" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-card p-6">
            <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
              {WHO.profileLabel}
            </div>
            <dl className="mt-5 flex flex-col gap-px border-t">
              {WHO.profile.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b py-3.5"
                >
                  <dt className="text-sm text-muted-foreground">{row.label}</dt>
                  <dd className="text-right font-mono text-xs text-foreground">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Book — Vault closing band */}
      <Section tone="dark" id="contact">
        <div className="mx-auto max-w-160 text-center">
          <Eyebrow>{BOOK.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-section lg:text-section-lg">
            {BOOK.title}
          </h2>
          <p className="mt-4 text-dek text-muted-foreground">{BOOK.line}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BOOK.actions.map((action) => (
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
        </div>
      </Section>
    </>
  );
}
