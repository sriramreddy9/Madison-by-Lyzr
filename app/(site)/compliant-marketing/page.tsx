import type { Metadata } from "next";
import { Fragment } from "react";
import { JsonLd, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { StepRail } from "@/components/ui/StepRail";
import { PanelFrame, KVRow, StatusTag } from "@/components/mocks/chrome";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  ArrowRightIcon,
  CheckIcon,
  MinusIcon,
  LockIcon,
  ShieldIcon,
  BuildingIcon,
  UserCheckIcon,
  LayersIcon,
} from "@/components/icons";
import {
  META,
  HERO,
  HERO_RUN,
  HERO_METRICS,
  TRUST_BAR,
  TRUST_CHIPS,
  PROBLEM,
  POSITIONING,
  WHAT_IT_IS,
  FOUNDATIONS,
  AGENTS,
  AUTONOMY,
  GOVERNANCE,
  SECURITY,
  WEEK_ONE,
  GTM_ROADMAP,
  USE_CASES,
  WHY_MADISON,
  INTEGRATIONS,
  BIGGER_PICTURE,
  SEE_IT_WORK,
  WHAT_TO_EXPECT,
  WHO_IT_FITS,
  FAQ,
  type RunStageState,
} from "@/content/compliant-marketing";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: "/compliant-marketing" },
  openGraph: {
    url: "/compliant-marketing",
    title: META.title,
    description: META.description,
  },
};

const STAGE_STATUS: Record<RunStageState, "done" | "waiting" | "queued"> = {
  done: "done",
  waiting: "waiting",
  queued: "queued",
};

const STAGE_TAG: Record<RunStageState, string> = {
  done: "Done",
  waiting: "Awaiting you",
  queued: "Queued",
};

const SEC_TILE_ICONS = {
  lock: LockIcon,
  shield: ShieldIcon,
  building: BuildingIcon,
  userCheck: UserCheckIcon,
  layers: LayersIcon,
} as const;

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
                name: "Madison for Marketing",
                serviceType: "Agentic compliant marketing for banks and credit unions",
                provider: { "@type": "Organization", name: "Madison by Lyzr" },
                areaServed: "United States",
                description: META.description,
              },
              verticalBreadcrumbs("Compliant Marketing", "/compliant-marketing"),
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
        <HeroBackdrop src="/images/editorial/collaboration.jpg" priority />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
              {HERO.headline}
            </h1>
            <p className="mt-6 max-w-xl text-dek text-muted-foreground">
              {HERO.subhead}
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
          <Reveal>
            <PanelFrame
              title={HERO_RUN.title}
              status={<StatusTag status="running">{HERO_RUN.liveLabel}</StatusTag>}
              className="shadow-lg"
            >
              <div className="border-b bg-muted px-4 py-3 text-[13px] italic leading-relaxed text-foreground">
                {HERO_RUN.brief}
              </div>
              <ol>
                {HERO_RUN.stages.map((stage) => (
                  <li
                    key={stage.name}
                    className="border-b border-border/70 px-4 py-3 last:border-b-0"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {stage.name}
                      </span>
                      <StatusTag status={STAGE_STATUS[stage.state]}>
                        {STAGE_TAG[stage.state]}
                      </StatusTag>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                      {stage.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </PanelFrame>
          </Reveal>
        </div>
        {/* Hero metric strip */}
        <div className="relative mx-auto mt-14 max-w-6xl px-6">
          <dl className="grid grid-cols-2 gap-px border-t border-foreground/30 bg-border/40 lg:grid-cols-4">
            {HERO_METRICS.map((m) => (
              <div key={m.value} className="bg-background pt-6 pr-4">
                <dd className="font-serif text-h3 text-foreground">{m.value}</dd>
                <dt className="mt-2 text-xs text-muted-foreground">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto mt-10 max-w-6xl px-6">
          <div className="flex flex-wrap gap-2 border-t border-foreground/20 pt-6">
            {TRUST_BAR.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* The problem */}
      <Section id="problem">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Eyebrow>{PROBLEM.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {PROBLEM.title}
            </h2>
            <div className="mt-5 space-y-4 text-dek text-muted-foreground">
              {PROBLEM.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-6 border-l-2 border-brand pl-4 font-serif text-h3 text-foreground">
              {PROBLEM.quote}
            </blockquote>
          </div>
          <div className="rounded-md border bg-card p-6">
            <div className="flex flex-wrap gap-2">
              {PROBLEM.diagram.lobs.map((lob) => (
                <Badge key={lob}>{lob}</Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <ArrowRightIcon size={14} className="rotate-90" />
            </div>
            <div className="rounded-md border bg-muted p-4">
              <div className="text-sm font-semibold text-foreground">
                {PROBLEM.diagram.marketing.name}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {PROBLEM.diagram.marketing.sub}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <ArrowRightIcon size={14} className="rotate-90" />
            </div>
            <div className="rounded-md border border-brand/30 bg-brand-soft p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-brand-text">
                  {PROBLEM.diagram.gate.name}
                </span>
                <span className="font-mono text-xs text-brand-text">
                  {PROBLEM.diagram.gate.duration}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <ArrowRightIcon size={14} className="rotate-90" />
            </div>
            <div className="rounded-md border bg-card p-4">
              <div className="text-sm font-semibold text-foreground">
                {PROBLEM.diagram.launch.name}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {PROBLEM.diagram.launch.sub}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Positioning triad */}
      <Section id="positioning">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Eyebrow>{POSITIONING.eyebrow}</Eyebrow>
          <Stagger className="grid gap-px border bg-border">
            {POSITIONING.cards.map((card) => (
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
                  {card.good ? <CheckIcon size={16} /> : <MinusIcon size={16} />}
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

      {/* What it is */}
      <Section tone="sunken" bordered>
        <SectionHeader
          eyebrow={WHAT_IT_IS.eyebrow}
          title={WHAT_IT_IS.title}
          dek={WHAT_IT_IS.dek}
        />
        <Stagger className="mt-10 grid gap-6 lg:grid-cols-3">
          <StaggerItem>
            <PanelFrame
              title={WHAT_IT_IS.assets.email.kicker}
              status={<Badge tone="success">{WHAT_IT_IS.disclosureBadge}</Badge>}
            >
              <div className="px-4 py-3.5">
                <div className="text-sm font-semibold text-foreground">
                  {WHAT_IT_IS.assets.email.subject}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {WHAT_IT_IS.assets.email.body}
                </p>
                <p className="mt-3 border-t pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {WHAT_IT_IS.assets.email.disclosure}
                </p>
              </div>
            </PanelFrame>
          </StaggerItem>
          <StaggerItem>
            <PanelFrame
              title={WHAT_IT_IS.assets.landing.kicker}
              status={<Badge tone="success">{WHAT_IT_IS.disclosureBadge}</Badge>}
            >
              <div className="px-4 py-3.5">
                <div className="font-serif text-h3 text-foreground">
                  {WHAT_IT_IS.assets.landing.headline}
                </div>
                <span className="mt-4 inline-flex items-center rounded-xs border border-transparent bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                  {WHAT_IT_IS.assets.landing.cta}
                </span>
                <p className="mt-3 border-t pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {WHAT_IT_IS.assets.landing.disclosure}
                </p>
              </div>
            </PanelFrame>
          </StaggerItem>
          <StaggerItem>
            <PanelFrame title={WHAT_IT_IS.assets.social.kicker}>
              <div className="px-4 py-3.5">
                <p className="text-[13px] leading-relaxed text-foreground">
                  {WHAT_IT_IS.assets.social.post}
                </p>
                <p className="mt-3 border-t pt-3 text-xs text-muted-foreground">
                  {WHAT_IT_IS.assets.social.note}
                </p>
              </div>
            </PanelFrame>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Foundations */}
      <Section id="foundations">
        <Eyebrow>{FOUNDATIONS.eyebrow}</Eyebrow>
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-serif text-section lg:text-section-lg">
              {FOUNDATIONS.brain.title}
            </h2>
            <p className="mt-5 text-dek text-muted-foreground">
              {FOUNDATIONS.brain.body}
            </p>
            <div className="mt-8 rounded-md border bg-card p-6 text-center">
              <div className="mx-auto inline-flex flex-col items-center rounded-md border border-brand/30 bg-brand-soft px-6 py-3">
                <span className="font-serif text-h3 text-brand-text">
                  {FOUNDATIONS.brain.hub}
                </span>
                <span className="font-mono text-xs text-brand-text">
                  {FOUNDATIONS.brain.hubSub}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {FOUNDATIONS.brain.fragments.map((f) => (
                  <Badge key={f}>{f}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-section lg:text-section-lg">
              {FOUNDATIONS.work.title}
            </h2>
            <p className="mt-5 text-dek text-muted-foreground">
              {FOUNDATIONS.work.body}
            </p>
            <PanelFrame
              title={FOUNDATIONS.work.panelTitle}
              status={<StatusTag status="waiting">{FOUNDATIONS.work.gate}</StatusTag>}
              className="mt-8"
            >
              <ul>
                {FOUNDATIONS.work.trail.map((step) => (
                  <li
                    key={step.text}
                    className="border-b border-border/70 px-4 py-3 last:border-b-0"
                  >
                    <Badge tone={step.kind === "flag" ? "warning" : "success"}>
                      {step.label}
                    </Badge>
                    <p className="mt-2 text-[13px] leading-relaxed text-foreground">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ul>
            </PanelFrame>
          </div>
        </div>
      </Section>

      {/* The agents */}
      <Section tone="sunken" bordered>
        <SectionHeader eyebrow={AGENTS.eyebrow} title={AGENTS.title} dek={AGENTS.dek} />
        <div className="mt-10 font-mono text-overline uppercase tracking-overline text-muted-foreground">
          {AGENTS.stockHeading}
        </div>
        <Stagger className="mt-4 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AGENTS.stock.map((agent) => (
            <StaggerItem key={agent.name} className="bg-background p-5">
              <h3 className="font-sans text-sm font-semibold text-foreground">
                {agent.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {agent.desc}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 grid gap-8 rounded-md border bg-card p-6 lg:grid-cols-[1.3fr_1fr] lg:items-center md:p-8">
          <div>
            <h3 className="font-serif text-h3 text-foreground">
              {AGENTS.composer.heading}
            </h3>
            <p className="mt-3 text-dek text-muted-foreground">
              {AGENTS.composer.body}
            </p>
          </div>
          <PanelFrame title={AGENTS.composer.panelTitle}>
            <div className="px-4 py-3.5">
              <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                {AGENTS.composer.fragmentsLabel}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {AGENTS.composer.fragments.map((f) => (
                  <Badge key={f}>{f}</Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center text-muted-foreground">
                <ArrowRightIcon size={16} className="rotate-90" />
              </div>
              <div className="mt-4 rounded-md border border-brand/30 bg-brand-soft px-4 py-3">
                <div className="text-sm font-semibold text-brand-text">
                  {AGENTS.composer.agent.name}
                </div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-brand-text">
                  {AGENTS.composer.agent.tag}
                </div>
              </div>
            </div>
          </PanelFrame>
        </div>
      </Section>

      {/* Autonomy */}
      <Section id="autonomy">
        <SectionHeader eyebrow={AUTONOMY.eyebrow} title={AUTONOMY.title} dek={AUTONOMY.dek} />
        <div className="mt-10 grid gap-px border bg-border md:grid-cols-3">
          {AUTONOMY.tiers.map((tier) => (
            <div key={tier.name} className="bg-background p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-muted font-mono text-sm text-foreground">
                  {tier.badge}
                </span>
                <h3 className="font-serif text-h3 text-foreground">{tier.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tier.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-wide text-brand-text">
          {AUTONOMY.gate}
        </p>
      </Section>

      {/* Security and governance — Vault band (visual, slimmed) */}
      <Section tone="dark" id="governance">
        <SectionHeader
          eyebrow={SECURITY.eyebrow}
          title={GOVERNANCE.title}
          dek={SECURITY.intro}
        />

        {/* Trust principle as three chips with arrows between */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {TRUST_CHIPS.map((chip, i) => (
            <Fragment key={chip}>
              {i > 0 ? (
                <ArrowRightIcon
                  size={16}
                  className="shrink-0 text-muted-foreground/60"
                />
              ) : null}
              <span className="rounded-full border border-brand/30 bg-brand-soft px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-brand-text">
                {chip}
              </span>
            </Fragment>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Block A — compliance checklist over a reused campaign-asset mockup */}
          <div>
            <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
              {SECURITY.blockA.title}
            </div>
            <div className="mt-5 overflow-hidden rounded-md border bg-card shadow-lg">
              <div className="border-b bg-muted px-4 py-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {SECURITY.blockA.asset.kicker}
                </div>
                <div className="mt-1 font-serif text-h3 text-foreground">
                  {SECURITY.blockA.asset.headline}
                </div>
              </div>
              <Stagger className="grid gap-px bg-border sm:grid-cols-2">
                {SECURITY.blockA.checks.map((check) => (
                  <StaggerItem key={check.label} className="bg-card">
                    <div
                      title={check.cite}
                      className="flex h-full cursor-help items-center gap-2.5 px-4 py-3"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-background">
                        <CheckIcon size={12} strokeWidth={2.4} />
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {check.label}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {SECURITY.blockA.caption}
            </p>
          </div>

          {/* Block B — Madison's own security: badges + icon tiles + audit log */}
          <div>
            <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
              {SECURITY.blockB.title}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {SECURITY.blockB.badges.map((b) => (
                <Badge key={b.label} tone={b.inProgress ? "warning" : "neutral"}>
                  {b.label}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {SECURITY.blockB.tiles.map((tile) => {
                const Icon = SEC_TILE_ICONS[tile.icon];
                return (
                  <span
                    key={tile.label}
                    className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium text-foreground"
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.6}
                      className="shrink-0 text-brand-text"
                    />
                    {tile.label}
                  </span>
                );
              })}
            </div>
            <PanelFrame
              title={GOVERNANCE.audit.panelTitle}
              status={
                <span className="font-mono text-[11px] uppercase tracking-wide text-brand-text">
                  {GOVERNANCE.audit.exportLabel}
                </span>
              }
              className="mt-6"
            >
              <ul>
                {GOVERNANCE.audit.rows.map((row, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[3rem_1fr] gap-3 border-b border-border/70 px-4 py-2 last:border-b-0"
                  >
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {row.t}
                    </span>
                    <span className="text-[13px] leading-relaxed">
                      <span className="font-medium text-foreground">
                        {row.actor}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        — {row.action}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="border-t px-4 py-2.5 text-[11px] text-muted-foreground">
                {SECURITY.blockB.auditCaption}
              </p>
            </PanelFrame>
          </div>
        </div>
      </Section>

      {/* Week one to expansion — daily-brief visual + weeks-based roadmap */}
      <Section id="week-one">
        <SectionHeader eyebrow={WEEK_ONE.eyebrow} title={WEEK_ONE.title} dek={WEEK_ONE.lead} />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <PanelFrame
            title={WEEK_ONE.feed.panelTitle}
            status={<Badge tone="info">{WEEK_ONE.feed.badge}</Badge>}
          >
            {WEEK_ONE.feed.rows.map((row) => (
              <KVRow
                key={row.name}
                label={
                  <span>
                    <span className="text-foreground">{row.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {row.detail}
                    </span>
                  </span>
                }
                value={row.rate}
              />
            ))}
            <p className="border-t bg-muted px-4 py-3 text-[13px] leading-relaxed text-brand-text">
              {WEEK_ONE.feed.opening}
            </p>
          </PanelFrame>
          <StepRail steps={GTM_ROADMAP.steps} />
        </div>
      </Section>

      {/* Use cases */}
      <Section tone="sunken" bordered>
        <SectionHeader eyebrow={USE_CASES.eyebrow} title={USE_CASES.title} />
        <Stagger className="mt-10 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.items.map((item) => (
            <StaggerItem key={item.name} className="bg-background p-5">
              <h3 className="font-sans text-sm font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Why Madison */}
      <Section id="why">
        <SectionHeader eyebrow={WHY_MADISON.eyebrow} title={WHY_MADISON.title} dek={WHY_MADISON.dek} />
        <Reveal>
          <ComparisonTable
            className="mt-10"
            columns={WHY_MADISON.columns}
            highlightCol={3}
            rows={WHY_MADISON.rows.map((r) => ({
              label: r.capability,
              cells: r.cells,
            }))}
          />
        </Reveal>
        <p className="mt-8 max-w-3xl text-dek text-muted-foreground">
          {WHY_MADISON.moat}
        </p>
      </Section>

      {/* Works with your stack — named integrations */}
      <Section id="integrations">
        <SectionHeader
          eyebrow={INTEGRATIONS.eyebrow}
          title={INTEGRATIONS.title}
          dek={INTEGRATIONS.dek}
        />
        <div className="mt-10 grid gap-px border bg-border sm:grid-cols-2">
          {INTEGRATIONS.groups.map((group) => (
            <div key={group.name} className="bg-background p-6">
              <h3 className="font-mono text-overline uppercase tracking-overline text-brand-text">
                {group.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {group.systems}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          {INTEGRATIONS.note}
        </p>
      </Section>

      {/* The bigger picture */}
      <Section id="bigger-picture">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{BIGGER_PICTURE.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {BIGGER_PICTURE.title}
            </h2>
            <p className="mt-5 text-dek text-muted-foreground">
              {BIGGER_PICTURE.body}
            </p>
          </div>
          <PanelFrame title={BIGGER_PICTURE.panelTitle}>
            <div className="grid grid-cols-2 gap-px bg-border">
              {BIGGER_PICTURE.nodes.map((node) => (
                <div
                  key={node.label}
                  className="flex items-center justify-between gap-2 bg-background px-4 py-4"
                >
                  <span className="text-sm font-medium text-foreground">
                    {node.label}
                  </span>
                  <Badge tone={node.tag === "live" ? "brand" : "neutral"}>
                    {node.tag}
                  </Badge>
                </div>
              ))}
            </div>
          </PanelFrame>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="sunken" bordered id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader eyebrow={FAQ.eyebrow} title={FAQ.title} />
          <FaqAccordion items={FAQ.items} />
        </div>
      </Section>

      {/* See it work — Vault closing band with what to expect */}
      <Section tone="dark" id="contact">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{SEE_IT_WORK.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-section lg:text-section-lg">
              {SEE_IT_WORK.title}
            </h2>
            <p className="mt-4 max-w-md text-dek text-muted-foreground">
              {SEE_IT_WORK.line}
            </p>
            <p className="mt-4 max-w-md text-sm text-foreground">
              {WHAT_TO_EXPECT.cohort}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SEE_IT_WORK.actions.map((action) => (
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
          <div className="flex flex-col gap-6">
            <div className="rounded-md border bg-card/60 p-6">
              <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
                {WHAT_TO_EXPECT.label}
              </div>
              <ul className="mt-5 flex flex-col gap-px border-t">
                {WHAT_TO_EXPECT.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b py-3.5 text-sm text-muted-foreground"
                  >
                    <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-text" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border bg-card/60 p-6">
              <div className="font-mono text-overline uppercase tracking-overline text-muted-foreground">
                {WHO_IT_FITS.label}
              </div>
              <dl className="mt-5 flex flex-col gap-px border-t">
                {WHO_IT_FITS.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b py-3"
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
        </div>
      </Section>
    </>
  );
}
