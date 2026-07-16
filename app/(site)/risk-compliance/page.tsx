import type { Metadata } from "next";
import { JsonLd, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { StatBand } from "@/components/ui/Stat";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  CheckIcon,
  CloseIcon,
  ShieldIcon,
  CpuIcon,
  LockIcon,
  LayersIcon,
  AuditTrailIcon,
  PlugIcon,
  GlobeIcon,
} from "@/components/icons";
import { RiskCockpit } from "@/components/mocks/risk-compliance/RiskCockpit";
import { ScreenPanel } from "@/components/mocks/risk-compliance/ScreenPanel";
import {
  META,
  HERO,
  COMPLIANCE_BADGES,
  COMPLIANCE_LABEL,
  WHY,
  CORE,
  EXIT,
  JOURNEY,
  COMPARE,
  REGIONS,
  SECURITY,
  STATS,
  CTA,
  type IconKey,
} from "@/content/risk-compliance";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: "/risk-compliance" },
  openGraph: {
    url: "/risk-compliance",
    title: META.title,
    description: META.description,
  },
};

const ICONS: Record<IconKey, typeof ShieldIcon> = {
  shield: ShieldIcon,
  bolt: CpuIcon,
  lock: LockIcon,
  layers: LayersIcon,
  key: LockIcon,
  doc: AuditTrailIcon,
  stop: ShieldIcon,
  plug: PlugIcon,
  globe: GlobeIcon,
  gavel: ShieldIcon,
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
                name: "Madison for Risk & Compliance",
                serviceType:
                  "Agentic third-party risk, vendor-AI governance, and tested vendor exits for banks",
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
                areaServed: [
                  "North America",
                  "European Union",
                  "Gulf / GCC",
                  "India",
                ],
                description: META.description,
              },
              verticalBreadcrumbs("Risk & Compliance", "/risk-compliance"),
            ],
          } as never
        }
      />

      {/* Hero — Vault band */}
      <section className="dark bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
              {HERO.headlineLead}
              <span className="text-brand-text">{HERO.headlineAccent}</span>
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
              {HERO.regions.map((r) => (
                <Badge key={r}>{r}</Badge>
              ))}
            </div>
          </div>
          <Reveal>
            <RiskCockpit />
          </Reveal>
        </div>
      </section>

      {/* Compliance badges (static marquee replacement) */}
      <Section tone="sunken" tight bordered>
        <div className="text-center font-mono text-overline uppercase tracking-overline text-muted-foreground">
          {COMPLIANCE_LABEL}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {COMPLIANCE_BADGES.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </Section>

      {/* Why */}
      <Section id="why">
        <SectionHeader
          align="center"
          eyebrow={WHY.eyebrow}
          title={
            <>
              {WHY.titleLead}
              <span className="text-brand-text">{WHY.titleAccent}</span>
            </>
          }
          dek={WHY.dek}
          className="mx-auto"
        />
        <Stagger className="mt-14 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {WHY.cards.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <StaggerItem key={card.title} className="bg-background p-6">
                <span className="flex size-11 items-center justify-center rounded-md bg-brand-soft text-brand-text">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-serif text-h3 text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Core — the two feature blocks */}
      <Section id="core" tone="sunken" bordered>
        <SectionHeader
          align="center"
          eyebrow={CORE.eyebrow}
          title={
            <>
              {CORE.titleLead}
              <span className="text-brand-text">{CORE.titleAccent}</span>
            </>
          }
          dek={CORE.dek}
          className="mx-auto"
        />
        <div className="mt-14 flex flex-col gap-16">
          {CORE.features.map((feat, i) => (
            <div
              key={feat.title}
              className="grid gap-10 lg:grid-cols-2 lg:items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <h3 className="font-serif text-section text-foreground">
                  {feat.title}
                </h3>
                <p className="mt-3 text-dek text-muted-foreground">
                  {feat.oneline}
                </p>
                <div className="mt-6 grid gap-px border bg-border sm:grid-cols-3">
                  {feat.stats.map((stat) => (
                    <div key={stat.value} className="bg-background p-4">
                      <div className="font-mono text-lg font-semibold text-foreground">
                        {stat.value}
                      </div>
                      <div className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {stat.label}
                      </div>
                      <div className="mt-2 font-mono text-[10px] text-muted-foreground/80">
                        {stat.source}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 overflow-hidden rounded-md border">
                  <div className="grid grid-cols-2 border-b bg-muted">
                    <div className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-danger-text">
                      The market ships
                    </div>
                    <div className="border-l px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-brand-text">
                      Madison does
                    </div>
                  </div>
                  {feat.compare.map((row) => (
                    <div
                      key={row.us}
                      className="grid grid-cols-2 border-b last:border-b-0"
                    >
                      <div className="flex items-start gap-2 px-4 py-3 text-[13px] text-muted-foreground">
                        <CloseIcon size={14} className="mt-0.5 shrink-0" />
                        {row.them}
                      </div>
                      <div className="flex items-start gap-2 border-l bg-brand-soft/40 px-4 py-3 text-[13px] font-medium text-foreground">
                        <CheckIcon
                          size={14}
                          className="mt-0.5 shrink-0 text-brand-text"
                        />
                        {row.us}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Reveal className={i % 2 === 1 ? "lg:order-1" : undefined}>
                <ScreenPanel data={feat.screen} />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* Exit — Vault band */}
      <Section tone="dark" id="exit">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Badge tone="warning">{EXIT.tag}</Badge>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {EXIT.titleLead}
              <span className="text-brand-text">{EXIT.titleAccent}</span>
              {EXIT.titleTail}
            </h2>
            <p className="mt-5 max-w-xl text-dek text-muted-foreground">
              {EXIT.body}
            </p>
            <div className="mt-6 flex flex-col gap-px border-t">
              {EXIT.chips.map((chip) => (
                <div
                  key={chip.value}
                  className="flex items-baseline gap-4 border-b py-3"
                >
                  <span className="w-28 shrink-0 font-mono text-base font-semibold text-foreground">
                    {chip.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {chip.label}{" "}
                    <span className="font-mono text-xs text-muted-foreground/70">
                      · {chip.source}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <Button href={EXIT.cta.href} size="lg" className="mt-8">
              {EXIT.cta.label}
            </Button>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-md border bg-card text-card-foreground shadow-lg">
              <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {EXIT.screen.title}
                </span>
                <Badge tone="success">{EXIT.screen.status}</Badge>
              </div>
              <div className="border-b px-4 py-3 font-sans text-sm font-semibold text-foreground">
                {EXIT.screen.heading}
              </div>
              <div className="grid grid-cols-2 gap-px border-b bg-border sm:grid-cols-4">
                {EXIT.screen.kpis.map((kpi) => (
                  <div key={kpi.label} className="bg-card px-3 py-3">
                    <div className="font-mono text-base font-semibold text-foreground">
                      {kpi.value}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
              <ul>
                {EXIT.screen.rows.map((row) => (
                  <li
                    key={row}
                    className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5 text-[13px] text-foreground last:border-b-0"
                  >
                    <CheckIcon size={14} className="shrink-0 text-success-text" />
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Journey */}
      <Section id="journey">
        <SectionHeader
          align="center"
          eyebrow={JOURNEY.eyebrow}
          title={
            <>
              {JOURNEY.titleLead}
              <span className="text-brand-text">{JOURNEY.titleAccent}</span>
            </>
          }
          dek={JOURNEY.dek}
          className="mx-auto"
        />
        <div className="mt-14 flex flex-col gap-px border bg-border">
          {JOURNEY.steps.map((step, i) => (
            <div key={step.title} className="bg-background p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-brand-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                      {step.stage}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-h3 text-foreground">
                    {step.title}
                  </h3>
                  <div className="mt-4 font-mono text-overline uppercase tracking-overline text-muted-foreground">
                    {JOURNEY.capLabel}
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {step.cap.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:border-l lg:pl-8">
                  <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
                    {JOURNEY.diffLabel}
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {step.diff.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckIcon
                          size={15}
                          className="mt-0.5 shrink-0 text-brand-text"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Compare */}
      <Section id="compare" tone="sunken" bordered>
        <SectionHeader
          align="center"
          eyebrow={COMPARE.eyebrow}
          title={
            <>
              {COMPARE.titleLead}
              <span className="text-brand-text">{COMPARE.titleAccent}</span>
            </>
          }
          dek={COMPARE.dek}
          className="mx-auto"
        />
        <Reveal>
          <DataTable className="mt-12" head={COMPARE.head} rows={COMPARE.rows} />
        </Reveal>
      </Section>

      {/* Regions */}
      <Section id="regions">
        <SectionHeader
          align="center"
          eyebrow={REGIONS.eyebrow}
          title={
            <>
              {REGIONS.titleLead}
              <span className="text-brand-text">{REGIONS.titleAccent}</span>
            </>
          }
          dek={REGIONS.dek}
          className="mx-auto"
        />
        <div className="mt-14 grid gap-px border bg-border md:grid-cols-2">
          {REGIONS.items.map((region) => (
            <div key={region.name} className="bg-background p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {region.flag}
                </span>
                <h3 className="font-serif text-h3 text-foreground">
                  {region.name}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {region.reg}
              </p>
              <dl className="mt-5 flex flex-col gap-4">
                <div>
                  <dt className="font-mono text-overline uppercase tracking-overline text-brand-text">
                    {REGIONS.whyLabel}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {region.why}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                    {REGIONS.stakeLabel}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {region.stake}{" "}
                    <span className="font-mono text-xs text-muted-foreground/70">
                      · {region.stakeSrc}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                    {REGIONS.deadlineLabel}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {region.deadline}{" "}
                    <span className="font-mono text-xs text-muted-foreground/70">
                      · {region.deadlineSrc}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Section>

      {/* Security */}
      <Section id="security" tone="sunken" bordered>
        <SectionHeader
          align="center"
          eyebrow={SECURITY.eyebrow}
          title={
            <>
              {SECURITY.titleLead}
              <span className="text-brand-text">{SECURITY.titleAccent}</span>
            </>
          }
          dek={SECURITY.dek}
          className="mx-auto"
        />
        <Stagger className="mt-14 grid gap-px border bg-border md:grid-cols-3">
          {SECURITY.cards.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <StaggerItem key={card.title} className="bg-background p-6">
                <span className="flex size-11 items-center justify-center rounded-md bg-muted text-foreground">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-sans text-base font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Stats */}
      <Section tone="dark">
        <StatBand
          items={STATS.map((s) => ({
            value: s.value,
            label: s.label,
            footnote: s.source,
          }))}
        />
      </Section>

      {/* CTA — Vault closing band */}
      <Section tone="dark" id="contact" tight>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-section lg:text-section-lg">
            {CTA.titleLead}
            <span className="text-brand-text">{CTA.titleAccent}</span>
            {CTA.titleTail}
          </h2>
          <p className="mt-4 text-dek text-muted-foreground">{CTA.sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CTA.actions.map((action) => (
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
