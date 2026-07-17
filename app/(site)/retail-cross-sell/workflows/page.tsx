import type { Metadata } from "next";
import { JsonLd, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CheckIcon } from "@/components/icons";
import { WorkflowRun } from "@/components/mocks/retail-cross-sell/WorkflowRun";
import { cn } from "@/lib/utils";
import {
  META,
  HERO,
  LADDER,
  WORKFLOWS,
  DAY,
  COMPOUND,
  CLOSING,
} from "@/content/retail-workflows";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: "/retail-cross-sell/workflows" },
  openGraph: {
    url: "/retail-cross-sell/workflows",
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
                name: "Madison for Retail Banking — Workflows",
                serviceType:
                  "Agentic AI workflow blueprints for retail banking",
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
                areaServed: "Global",
                description: META.description,
              },
              verticalBreadcrumbs(
                "Retail Banking Workflows",
                "/retail-cross-sell/workflows",
              ),
              {
                "@type": "ItemList",
                name: "Retail banking workflow blueprints",
                itemListElement: WORKFLOWS.items.map((w, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: w.title,
                })),
              },
            ],
          } as never
        }
      />

      {/* Hero — Vault band */}
      <section className="dark relative overflow-hidden bg-background py-16 text-foreground md:py-24">
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
            <WorkflowRun />
          </Reveal>
        </div>
      </section>

      {/* Autonomy ladder strip */}
      <Section tone="sunken" tight bordered>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm shrink-0">
            <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
              {LADDER.label}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {LADDER.note}
            </p>
          </div>
          <Stagger className="grid flex-1 grid-cols-2 gap-px border bg-border sm:grid-cols-5">
            {LADDER.rungs.map((rung) => (
              <StaggerItem key={rung.level} className="bg-background px-3 py-3">
                <div className="font-mono text-sm text-brand-text">
                  {rung.level}
                </div>
                <div className="mt-1 text-xs font-medium text-foreground">
                  {rung.name}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* The four blueprints */}
      <Section id="workflows">
        <SectionHeader
          eyebrow={WORKFLOWS.eyebrow}
          title={WORKFLOWS.title}
          dek={WORKFLOWS.dek}
        />
        <div className="mt-14 flex flex-col gap-10">
          {WORKFLOWS.items.map((workflow) => (
            <Stagger key={workflow.num}>
              <article className="border bg-background">
                <header className="border-b">
                  <StaggerItem className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.5fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-brand-text">
                        {workflow.num}
                      </span>
                      <Badge>{workflow.tag}</Badge>
                    </div>
                    <h3 className="mt-3 font-serif text-h3 text-foreground">
                      {workflow.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {workflow.job}
                    </p>
                  </div>
                  <div className="lg:border-l lg:pl-6">
                    <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
                      Why it wins
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {workflow.wins}
                    </p>
                  </div>
                  </StaggerItem>
                </header>
                <ol>
                  {workflow.steps.map((step, i) => (
                    <li
                      key={step.agent}
                      className={cn(
                        "border-b",
                        step.human && "bg-brand-soft/40",
                      )}
                    >
                      <StaggerItem className="grid gap-1.5 px-6 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6 md:px-8">
                      <div className="flex items-baseline gap-3 sm:block">
                        <span className="font-mono text-xs text-muted-foreground">{`${i + 1}.`}</span>
                        <div className="sm:mt-0.5">
                          <div
                            className={cn(
                              "font-mono text-[11px] uppercase tracking-wide",
                              step.human
                                ? "text-brand-text"
                                : "text-foreground",
                            )}
                          >
                            {step.agent}
                          </div>
                          <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                            {step.level}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                      </StaggerItem>
                    </li>
                  ))}
                </ol>
                <footer className="px-6 py-3.5 font-mono text-xs text-muted-foreground md:px-8">
                  Measured by: {workflow.kpis}
                </footer>
              </article>
            </Stagger>
          ))}
        </div>
      </Section>

      {/* Day in the life — Vault band */}
      <Section tone="dark" id="day">
        <SectionHeader eyebrow={DAY.eyebrow} title={DAY.title} dek={DAY.dek} />
        <Stagger className="mt-14 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {DAY.beats.map((beat) => (
            <StaggerItem key={beat.time} className="bg-background p-6">
              <div className="font-mono text-stat text-brand-text">
                {beat.time}
              </div>
              <h3 className="mt-3 font-serif text-h3 text-foreground">
                {beat.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {beat.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-h3 italic text-foreground">
          {DAY.coda}
        </p>
      </Section>

      {/* Why workflows compound */}
      <Section tone="sunken" bordered>
        <SectionHeader
          eyebrow={COMPOUND.eyebrow}
          title={COMPOUND.title}
          dek={COMPOUND.dek}
        />
        <Stagger className="mt-12 grid gap-px border bg-border sm:grid-cols-3">
          {COMPOUND.assets.map((asset) => (
            <StaggerItem key={asset.name} className="bg-background p-6">
              <h3 className="font-sans text-base font-semibold text-foreground">
                {asset.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {asset.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {COMPOUND.note}
        </p>
      </Section>

      {/* Closing — Vault band */}
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
