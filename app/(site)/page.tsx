import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LogoWall } from "@/components/ui/LogoWall";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BentoGrid } from "@/components/mocks/home/BentoGrid";
import { DemoMock } from "@/components/mocks/home/DemoMock";
import { AdvisorCarousel } from "@/components/mocks/home/AdvisorCarousel";
import {
  ShieldIcon,
  LockIcon,
  UserCheckIcon,
  AuditTrailIcon,
  ArrowRightIcon,
  GlobeIcon,
  CpuIcon,
  CheckIcon,
} from "@/components/icons";
import { JsonLd, SITE_URL, ORGANIZATION } from "@/lib/seo";
import { TEAMS } from "@/content/nav";
import {
  HERO,
  PROOF,
  COVERAGE,
  ICP_ROUTER,
  SOLUTIONS,
  DEMO,
  GOVERNANCE,
  PLATFORM,
  ADVISORY,
  CLOSING_CTA,
} from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const heroChipIcons = [ShieldIcon, LockIcon, UserCheckIcon, AuditTrailIcon];
const governanceBadgeIcons = [
  ShieldIcon,
  GlobeIcon,
  CpuIcon,
  ShieldIcon,
  LockIcon,
  CheckIcon,
];

function IcpRow({
  team,
  index,
}: {
  team: (typeof TEAMS)[number];
  index: number;
}) {
  const inner = (
    <>
      <span className="font-mono text-sm text-brand-text">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-base font-semibold text-foreground">
          {team.label}
        </span>
        <span className="mt-0.5 text-sm text-muted-foreground">
          {team.routerLine}
        </span>
      </span>
      {team.comingSoon ? (
        <Badge tone="neutral" className="shrink-0 self-center">
          Coming soon
        </Badge>
      ) : (
        <ArrowRightIcon
          size={16}
          className="shrink-0 self-center text-muted-foreground transition-transform duration-180 ease-standard group-hover:translate-x-0.5 group-hover:text-brand-text"
        />
      )}
    </>
  );

  if (team.comingSoon) {
    return <div className="flex gap-4 border-b py-4 opacity-75">{inner}</div>;
  }
  return (
    <Link
      href={team.href}
      className="group flex gap-4 border-b py-4 transition-colors duration-120 ease-standard hover:bg-accent/60"
    >
      {inner}
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={
          {
            "@context": "https://schema.org",
            "@graph": [
              ORGANIZATION,
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: "Madison — The Agentic Banking OS by Lyzr",
                publisher: { "@id": `${SITE_URL}/#organization` },
              },
            ],
          } as never
        }
      />
      {/* ============================ HERO ============================ */}
      <section
        id="top"
        className="dark relative overflow-hidden bg-background text-foreground"
      >
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={HERO.image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale contrast-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/85 via-background/60 to-background/95" />
        </div>
        <Container className="relative py-24 md:py-36">
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-serif text-hero-sm sm:text-hero lg:text-hero-lg">
            {HERO.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground sm:text-xl">
            {HERO.subhead}
          </p>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">
            {HERO.support}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={HERO.primaryCta.href} size="lg">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} size="lg" variant="outline">
              {HERO.secondaryCta.label}
            </Button>
          </div>
          <div className="mt-6">
            <Link
              href={HERO.jump.href}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-120 ease-standard hover:text-foreground"
            >
              {HERO.jump.label} <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
            {HERO.chips.map((chip, i) => {
              const Icon = heroChipIcons[i];
              return (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 text-sm text-foreground"
                >
                  <Icon size={16} className="text-muted-foreground" />
                  {chip}
                </span>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================= PROOF BAND ========================= */}
      <Section tight className="border-b">
        <Reveal>
          <Eyebrow className="text-center">{PROOF.eyebrow}</Eyebrow>
          <LogoWall
            names={PROOF.names}
            caption={PROOF.caption}
            className="mt-6"
          />
        </Reveal>
      </Section>

      {/* ==================== FRONT-TO-BACK COVERAGE ==================== */}
      <Section id="coverage">
        <Reveal>
          <SectionHeader
            eyebrow={COVERAGE.eyebrow}
            title={COVERAGE.title}
            dek={COVERAGE.dek}
          />
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {COVERAGE.pillars.map((pillar) => (
            <StaggerItem key={pillar.name} className="bg-background p-6">
              <div className="font-mono text-sm text-brand-text">
                {pillar.index}
              </div>
              <h3 className="mt-3 font-sans text-h3 text-foreground">
                {pillar.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {pillar.role}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pillar.chips.map((chip) => (
                  <Badge key={chip}>{chip}</Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 border bg-card p-6 sm:p-8">
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            Our agents work at the right level of autonomy for each function —
            they <em className="text-foreground">assist</em>,{" "}
            <em className="text-foreground">recommend</em>, or{" "}
            <em className="text-foreground">automate</em>. You set the level;
            Madison keeps a human in the loop wherever it matters.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {COVERAGE.autonomy.map((item) => (
              <div key={item.name} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center border font-serif text-base text-brand-text">
                  {item.badge}
                </span>
                <span>
                  <span className="block font-sans text-base font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {item.line}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ========================== ICP ROUTER ========================== */}
      <Section id="for-your-team" tight className="border-y">
        <Reveal>
          <SectionHeader
            eyebrow={ICP_ROUTER.eyebrow}
            title={ICP_ROUTER.title}
            dek={ICP_ROUTER.dek}
          />
        </Reveal>
        <Reveal className="mt-8">
          <div className="grid grid-cols-1 border-t md:grid-cols-2 md:gap-x-12">
            {TEAMS.map((team, i) => (
              <IcpRow key={team.label} team={team} index={i} />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* =========================== SOLUTIONS =========================== */}
      <Section id="solutions" tone="sunken">
        <Reveal>
          <SectionHeader
            eyebrow={SOLUTIONS.eyebrow}
            title={SOLUTIONS.title}
            dek={SOLUTIONS.dek}
          />
        </Reveal>
        <Reveal className="mt-12">
          <BentoGrid />
        </Reveal>
      </Section>

      {/* ============================= DEMO ============================= */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={DEMO.eyebrow}
            title={DEMO.title}
            dek={DEMO.dek}
          />
        </Reveal>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.7fr_1fr]">
          <Reveal>
            <DemoMock caption={DEMO.caption} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-t">
              {DEMO.highlights.map((highlight) => (
                <div key={highlight.num} className="flex gap-5 border-b py-5">
                  <span className="font-mono text-sm text-brand-text">
                    {highlight.num}
                  </span>
                  <p className="font-serif text-lg text-foreground">
                    {highlight.line}
                  </p>
                </div>
              ))}
            </div>
            <Button href={DEMO.cta.href} className="mt-8">
              {DEMO.cta.label}
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* ==================== GOVERNANCE & SOVEREIGNTY ==================== */}
      <Section id="governance" tone="dark">
        <Reveal>
          <SectionHeader eyebrow={GOVERNANCE.eyebrow} title={GOVERNANCE.title} />
          <p className="mt-5 max-w-3xl text-dek text-muted-foreground">
            {GOVERNANCE.lead}
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="flex items-center gap-4">
            <Eyebrow>{GOVERNANCE.badgesLabel}</Eyebrow>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {GOVERNANCE.badges.map((badge, i) => {
              const Icon = governanceBadgeIcons[i];
              return (
                <div
                  key={badge}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="flex size-16 items-center justify-center rounded-full border text-muted-foreground">
                    <Icon size={26} strokeWidth={1.3} />
                  </span>
                  <span className="text-sm leading-snug text-foreground">
                    {badge}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border bg-border sm:grid-cols-2">
          {GOVERNANCE.cards.map((card) => (
            <div key={card.title} className="bg-background p-6 sm:p-8">
              <h3 className="font-sans text-h3 text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ==================== PLATFORM BENEATH MADISON ==================== */}
      <Section id="platform">
        <Reveal>
          <SectionHeader
            eyebrow={PLATFORM.eyebrow}
            title={PLATFORM.title}
            dek={PLATFORM.dek}
          />
          <span className="mt-5 inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-xs text-muted-foreground">
            <ShieldIcon size={14} />
            {PLATFORM.mark}
          </span>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-px border bg-border md:grid-cols-3">
          {PLATFORM.cards.map((card) => (
            <StaggerItem key={card.title} className="bg-background p-6 sm:p-8">
              <div className="font-mono text-sm text-brand-text">
                {card.idx}
              </div>
              <h3 className="mt-3 font-sans text-h3 text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {card.chips.map((chip) => (
                  <Badge key={chip}>{chip}</Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ========================= ADVISORY BOARD ========================= */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeader
            eyebrow={ADVISORY.eyebrow}
            title={ADVISORY.title}
            dek={ADVISORY.dek}
          />
        </Reveal>
        <Reveal className="mt-10">
          <AdvisorCarousel advisors={ADVISORY.advisors} />
        </Reveal>
      </Section>

      {/* ========================== CLOSING CTA ========================== */}
      <CtaBand
        title={CLOSING_CTA.title}
        line={CLOSING_CTA.line}
        actions={CLOSING_CTA.actions}
      />
    </>
  );
}
