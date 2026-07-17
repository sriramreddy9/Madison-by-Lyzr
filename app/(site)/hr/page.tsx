import type { Metadata } from "next";
import { JsonLd, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PanelFrame, KVRow, StatusTag } from "@/components/mocks/chrome";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CheckIcon } from "@/components/icons";
import { CallCard } from "@/components/mocks/hr/CallCard";
import { AtWorkScreen } from "@/components/mocks/hr/AtWorkScreen";
import {
  META,
  HERO,
  DELIVERS,
  VALUE,
  JOURNEY,
  AGENTS,
  AT_WORK,
  DEPLOYMENT,
  COMPLIANCE,
  FAQ,
  CLOSING_CTA,
  SOFTWARE_APP_JSONLD,
} from "@/content/hr";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: "/hr" },
  openGraph: {
    url: "/hr",
    title: META.title,
    description: META.ogDescription,
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
                "@type": "SoftwareApplication",
                ...SOFTWARE_APP_JSONLD,
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
              },
              verticalBreadcrumbs("HR & People", "/hr"),
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
      <section className="dark relative flex min-h-svh items-center overflow-hidden bg-background py-16 text-foreground md:py-24">
        <HeroBackdrop src="/images/editorial/whiteboard.jpg" priority />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
              {HERO.headline}
            </h1>
            <p className="mt-6 max-w-xl text-dek text-muted-foreground">
              {HERO.lede}
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
              {HERO.trust.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
          <Reveal>
            <CallCard />
          </Reveal>
        </div>
      </section>

      {/* What Madison delivers */}
      <Section id="delivers">
        <SectionHeader eyebrow={DELIVERS.eyebrow} title={DELIVERS.title} dek={DELIVERS.dek} />
        <Stagger className="mt-12 grid gap-px border bg-border md:grid-cols-3">
          {DELIVERS.cards.map((card) => (
            <StaggerItem key={card.title} className="flex flex-col bg-background p-6">
              <h3 className="font-serif text-h3 text-foreground">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
              <div className="mt-5 border-t pt-4 font-mono text-xs uppercase tracking-wide text-brand-text">
                {card.outcome}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* The value */}
      <Section tone="sunken" bordered>
        <SectionHeader eyebrow={VALUE.eyebrow} title={VALUE.title} />
        <Stagger className="mt-12 grid gap-px border bg-border md:grid-cols-3">
          {VALUE.cards.map((card) => (
            <StaggerItem key={card.title} className="bg-background p-6">
              <h3 className="font-serif text-h3 text-foreground">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* The employee journey */}
      <Section id="journey">
        <SectionHeader eyebrow={JOURNEY.eyebrow} title={JOURNEY.title} dek={JOURNEY.dek} />
        <div className="mt-12 flex flex-col gap-px border bg-border">
          {JOURNEY.stages.map((stage) => (
            <div key={stage.num} className="bg-background p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-brand-text">
                      {stage.num}
                    </span>
                    <h3 className="font-serif text-h3 text-foreground">
                      {stage.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {stage.line}
                  </p>
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {stage.chips.map((chip) => (
                    <Badge key={chip.label} tone={chip.owned ? "brand" : "neutral"}>
                      {chip.owned ? (
                        <CheckIcon size={12} className="text-brand-text" />
                      ) : null}
                      {chip.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="inline-flex size-4 items-center justify-center rounded-full bg-brand-soft">
            <CheckIcon size={10} className="text-brand-text" />
          </span>
          A person owns this step
        </p>
      </Section>

      {/* The agents */}
      <Section id="solutions" tone="sunken" bordered>
        <SectionHeader eyebrow={AGENTS.eyebrow} title={AGENTS.title} dek={AGENTS.dek} />
        <div className="mt-12 grid gap-px border bg-border md:grid-cols-2">
          {/* Recruitment */}
          <div className="bg-background p-6">
            <h3 className="font-serif text-h3 text-foreground">
              {AGENTS.recruitment.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {AGENTS.recruitment.body}
            </p>
            <div className="mt-5 rounded-md border bg-card">
              {AGENTS.recruitment.rows.map((row) => (
                <KVRow
                  key={row.label}
                  label={row.label}
                  value={<StatusTag status={row.status}>{row.tag}</StatusTag>}
                />
              ))}
            </div>
          </div>

          {/* Employee desk */}
          <div className="bg-background p-6">
            <h3 className="font-serif text-h3 text-foreground">
              {AGENTS.desk.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {AGENTS.desk.body}
            </p>
            <div className="mt-5 rounded-md border bg-card">
              {AGENTS.desk.timeline.map((t) => (
                <KVRow key={t.line} label={t.line} value={t.time} />
              ))}
            </div>
          </div>

          {/* Exit & offboarding */}
          <div className="bg-background p-6">
            <h3 className="font-serif text-h3 text-foreground">
              {AGENTS.exit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {AGENTS.exit.body}
            </p>
            <div className="mt-5 flex items-center gap-5 rounded-md border bg-card p-5">
              <div className="font-mono text-stat text-foreground">
                {AGENTS.exit.ring.percent}%
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {AGENTS.exit.ring.label}
                </div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  {AGENTS.exit.ring.detail}
                </div>
              </div>
            </div>
          </div>

          {/* Learning & certification */}
          <div className="bg-background p-6">
            <h3 className="font-serif text-h3 text-foreground">
              {AGENTS.learning.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {AGENTS.learning.body}
            </p>
            <div className="mt-5 rounded-md border bg-card">
              {AGENTS.learning.rows.map((row) => (
                <KVRow
                  key={row.label}
                  label={row.label}
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      {row.dot ? (
                        <span className="size-1.5 rounded-full bg-warning" />
                      ) : null}
                      {row.value}
                    </span>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* See it at work */}
      <Section id="at-work">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <SectionHeader eyebrow={AT_WORK.eyebrow} title={AT_WORK.title} dek={AT_WORK.dek} />
            <ol className="mt-8 border-t">
              {AT_WORK.rail.map((r) => (
                <li key={r.num} className="flex items-baseline gap-4 border-b py-4">
                  <span className="font-mono text-sm text-brand-text">{r.num}</span>
                  <span className="text-sm text-muted-foreground">{r.line}</span>
                </li>
              ))}
            </ol>
            <Button href={AT_WORK.cta.href} size="lg" className="mt-8">
              {AT_WORK.cta.label}
            </Button>
          </div>
          <Reveal>
            <AtWorkScreen />
          </Reveal>
        </div>
      </Section>

      {/* Deployment & data — Vault band */}
      <Section tone="dark" id="deployment">
        <SectionHeader eyebrow={DEPLOYMENT.eyebrow} title={DEPLOYMENT.title} dek={DEPLOYMENT.dek} />
        <div className="mt-12 grid gap-px border bg-border md:grid-cols-3">
          {DEPLOYMENT.cells.map((cell) => (
            <div key={cell.title} className="bg-background p-6">
              <h3 className="font-sans text-base font-semibold text-foreground">
                {cell.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cell.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Security & compliance */}
      <Section tone="sunken" tight bordered>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <Eyebrow>{COMPLIANCE.eyebrow}</Eyebrow>
            <p className="mt-3 text-dek text-foreground">{COMPLIANCE.line}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMPLIANCE.badges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader eyebrow={FAQ.eyebrow} title={FAQ.title} />
          <FaqAccordion items={FAQ.items} />
        </div>
      </Section>

      {/* Closing — Vault band */}
      <Section tone="dark" id="contact">
        <div className="mx-auto max-w-160 text-center">
          <h2 className="font-serif text-section lg:text-section-lg">
            {CLOSING_CTA.title}
          </h2>
          <p className="mt-4 text-dek text-muted-foreground">{CLOSING_CTA.line}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
        </div>
      </Section>
    </>
  );
}
