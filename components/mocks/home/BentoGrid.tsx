import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { StatusTag } from "@/components/mocks/chrome";
import { ArrowRightIcon } from "@/components/icons";
import { TEAMS } from "@/content/nav";

/**
 * Solutions bento — ten cards, 1:1 with the ICP router, each carrying the
 * master page's miniature data-module readout. Content verbatim from
 * Madison Landing 2/index.html §Solutions.
 */

function teamHref(label: string) {
  return TEAMS.find((t) => t.label === label);
}

function BentoIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-9 items-center justify-center rounded-sm border text-foreground">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </span>
  );
}

function BentoCard({
  team,
  title,
  desc,
  icon,
  seeLabel,
  className,
  children,
}: {
  team: string;
  title: string;
  desc?: string;
  icon: React.ReactNode;
  seeLabel: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const nav = teamHref(team);
  const comingSoon = nav?.comingSoon ?? false;

  const body = (
    <>
      <div className="flex items-start justify-between">
        <BentoIcon>{icon}</BentoIcon>
        {comingSoon ? (
          <Badge tone="neutral">Coming soon</Badge>
        ) : (
          <ArrowRightIcon
            size={16}
            className="text-muted-foreground transition-colors duration-180 ease-standard group-hover:text-brand-text"
          />
        )}
      </div>
      <div className="mt-4 font-sans text-h3 text-foreground">{title}</div>
      {desc ? (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {desc}
        </p>
      ) : null}
      <div className="mt-4 flex-1">{children}</div>
      {!comingSoon ? (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          {seeLabel}
          <span aria-hidden>→</span>
        </span>
      ) : null}
    </>
  );

  const cardClasses = cn(
    "group flex flex-col rounded-md border bg-card p-6 text-card-foreground",
    !comingSoon &&
      "transition-all duration-180 ease-standard hover:-translate-y-0.5 hover:border-input hover:shadow-md",
    className,
  );

  if (comingSoon || !nav) {
    return <div className={cardClasses}>{body}</div>;
  }
  return (
    <Link href={nav.href} className={cardClasses}>
      {body}
    </Link>
  );
}

function ModuleShell({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-sm border bg-background", className)} {...rest}>
      {children}
    </div>
  );
}

function ModuleRow({
  left,
  right,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 px-3.5 py-2 text-[13px] last:border-b-0">
      <span className="text-foreground">{left}</span>
      {right}
    </div>
  );
}

function ModuleFoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3.5 py-2 font-mono text-[11px] text-muted-foreground">
      {children}
    </div>
  );
}

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
      {/* 01 · Commercial Banking — RM (large, agent fleet) */}
      <BentoCard
        team="Commercial Banking"
        title="Commercial Banking — RM"
        desc="Meeting prep, portfolio watch, and outbound briefs for every relationship manager on the desk."
        seeLabel="See Commercial Banking"
        className="sm:col-span-2 lg:col-span-7"
        icon={<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />}
      >
        <ModuleShell
          role="img"
          aria-label="Agent fleet: meeting brief done, portfolio watch running, outbound scan queued"
        >
          <ModuleRow
            left="Meeting-brief agent"
            right={<StatusTag status="done">Done</StatusTag>}
          />
          <ModuleRow
            left="Portfolio-watch agent"
            right={<StatusTag status="running">Running</StatusTag>}
          />
          <ModuleRow
            left="Outbound-scan agent"
            right={<StatusTag status="queued">Queued</StatusTag>}
          />
        </ModuleShell>
      </BentoCard>

      {/* Underwriting (tall, decision card) */}
      <BentoCard
        team="Underwriting"
        title="Underwriting"
        desc="Credit decisioning end to end — analyst-grade memos, model scores, and a human at the gate."
        seeLabel="See Underwriting"
        className="lg:col-span-5 lg:row-span-2"
        icon={
          <>
            <path d="M4 4h12l4 4v12H4z" />
            <path d="M8 12h8M8 16h5" />
          </>
        }
      >
        <ModuleShell
          role="img"
          aria-label="Underwriting decision: application U-4021 approved, 92 percent model confidence"
        >
          <div className="flex items-center justify-between border-b border-border/70 px-3.5 py-2.5">
            <span className="font-mono text-xs text-muted-foreground">
              Application #U-4021
            </span>
            <StatusTag status="done">Approved</StatusTag>
          </div>
          <div className="px-3.5 pt-2 text-[13px] text-muted-foreground">
            Small business · 24-month term
          </div>
          <div className="px-3.5 py-2">
            <div className="flex items-baseline justify-between border-b border-border/70 py-1.5 text-[13px]">
              <span className="text-foreground">Debt-service coverage</span>
              <span className="font-mono text-xs text-foreground">1.42×</span>
            </div>
            <div className="flex items-baseline justify-between py-1.5 text-[13px]">
              <span className="text-foreground">Model confidence</span>
              <span className="font-mono text-xs text-foreground">92%</span>
            </div>
          </div>
          <ModuleFoot>Analyst memo → sent to committee</ModuleFoot>
        </ModuleShell>
      </BentoCard>

      {/* Reconciliations (small, ring) */}
      <BentoCard
        team="Reconciliations"
        title="Reconciliations"
        seeLabel="See Reconciliations"
        className="lg:col-span-3"
        icon={<path d="M3 3v18h18M7 15l4-5 3 3 5-7" />}
      >
        <div className="flex items-center gap-4">
          <span className="relative inline-flex size-16 shrink-0 items-center justify-center">
            <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden>
              <circle
                cx="32"
                cy="32"
                r="26"
                pathLength="100"
                fill="none"
                strokeWidth="5"
                className="stroke-border"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                pathLength="100"
                fill="none"
                strokeWidth="5"
                strokeDasharray="94 100"
                strokeLinecap="round"
                className="stroke-brand"
              />
            </svg>
            <span className="absolute font-mono text-sm text-foreground">
              94%
            </span>
          </span>
          <span className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Matched today
            </span>
            <span className="mt-1 text-[13px] text-foreground">
              1,204 of 1,207 lines
            </span>
          </span>
        </div>
      </BentoCard>

      {/* Dispute Resolution (small, exception queue) */}
      <BentoCard
        team="Dispute Resolution"
        title="Dispute Resolution"
        seeLabel="See Dispute Resolution"
        className="lg:col-span-4"
        icon={
          <>
            <rect x="3" y="6" width="18" height="12" rx="1.5" />
            <path d="M3 10h18M8 14h3" />
          </>
        }
      >
        <ModuleShell>
          <ModuleRow
            left={<span className="font-mono text-xs">#DR-4824</span>}
            right={<StatusTag status="done">Resolved</StatusTag>}
          />
          <ModuleRow
            left={<span className="font-mono text-xs">#DR-4825</span>}
            right={<StatusTag status="running">In review</StatusTag>}
          />
          <ModuleFoot>86% auto-settled · 14% routed to adjuster</ModuleFoot>
        </ModuleShell>
      </BentoCard>

      {/* Risk & Compliance (tall, governance log) */}
      <BentoCard
        team="Risk & Compliance"
        title="Risk & Compliance"
        desc="TPRM, Vendor-AI, and Model-Risk Governance — one governed pass, evidence-ready."
        seeLabel="See Risk & Compliance"
        className="lg:col-span-5 lg:row-span-2"
        icon={
          <>
            <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
          </>
        }
      >
        <ModuleShell
          role="img"
          aria-label="Governance log: TPRM refresh due, model drift flagged, vendor AI intakes in review"
        >
          <ModuleRow
            left={
              <span className="font-mono text-[11px] uppercase tracking-wide text-brand-text">
                TPRM
              </span>
            }
            right={
              <span className="text-[13px] text-muted-foreground">
                Vendor Aspen · refresh due in 30d
              </span>
            }
          />
          <ModuleRow
            left={
              <span className="font-mono text-[11px] uppercase tracking-wide text-brand-text">
                MRG
              </span>
            }
            right={
              <span className="text-[13px] text-muted-foreground">
                Model M-241 · drift flagged
              </span>
            }
          />
          <ModuleRow
            left={
              <span className="font-mono text-[11px] uppercase tracking-wide text-brand-text">
                Vendor-AI
              </span>
            }
            right={
              <span className="text-[13px] text-muted-foreground">
                3 intakes in review · SOC 2 verified
              </span>
            }
          />
          <ModuleFoot>Evidence packs — exportable to auditors</ModuleFoot>
        </ModuleShell>
      </BentoCard>

      {/* Retail — Cross-sell (medium, assistant snippet) */}
      <BentoCard
        team="Retail Banking"
        title="Retail — Cross-sell"
        seeLabel="See Retail Cross-sell"
        className="lg:col-span-7"
        icon={
          <>
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />
          </>
        }
      >
        <div className="space-y-2">
          <div className="max-w-9/10 rounded-sm border bg-muted px-3.5 py-2 text-[13px] text-foreground">
            Which card earns the most on travel?
          </div>
          <div className="ml-auto max-w-9/10 rounded-sm border bg-background px-3.5 py-2 text-[13px] text-muted-foreground">
            The Sterling Travel card — 3× on flights, no FX fees.
          </div>
        </div>
      </BentoCard>

      {/* Compliant Marketing (medium, brief to compliant launch) */}
      <BentoCard
        team="Compliant Marketing"
        title="Compliant Marketing"
        desc="One brief in, a compliant, launch-ready campaign out, built on your own data with a human approving every step."
        seeLabel="See Compliant Marketing"
        className="lg:col-span-4"
        icon={<path d="M4 19l6-11 4 7 3-4 3 8H4z" />}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Reg DD &amp; Reg Z checked</Badge>
          <Badge tone="neutral">Human-approved</Badge>
          <Badge tone="neutral">Audit trail</Badge>
        </div>
      </BentoCard>

      {/* Deal Intelligence (medium, target pipeline) */}
      <BentoCard
        team="Deal Intelligence"
        title="Deal Intelligence"
        seeLabel="See Deal Intelligence"
        className="lg:col-span-3"
        icon={<path d="M4 5h16M4 12h16M4 19h10" />}
      >
        <ModuleShell>
          <ModuleRow
            left={<span className="text-[13px]">MedTech · Series C</span>}
            right={
              <span className="font-mono text-[11px] text-warning-text">
                2 flags
              </span>
            }
          />
          <ModuleRow
            left={
              <span className="text-[13px]">Enterprise SaaS · PE roll-up</span>
            }
            right={
              <span className="font-mono text-[11px] text-success-text">
                IC ready
              </span>
            }
          />
          <ModuleFoot>14 targets tracked · weekly memo drafted</ModuleFoot>
        </ModuleShell>
      </BentoCard>

      {/* KYC (medium, compact stat rows) */}
      <BentoCard
        team="KYC"
        title="KYC"
        seeLabel="See KYC"
        className="lg:col-span-4"
        icon={
          <>
            <circle cx="10" cy="8" r="3" />
            <path d="M4 20c0-3.3 2.7-6 6-6" />
            <path d="M14 17l2 2 4-4" />
          </>
        }
      >
        <ModuleShell>
          <ModuleRow
            left="Auto-clear rate"
            right={<span className="font-mono text-xs text-foreground">96%</span>}
          />
          <ModuleRow
            left="Cleared today"
            right={<span className="font-mono text-xs text-foreground">412</span>}
          />
          <ModuleRow
            left="Escalated to analyst"
            right={<span className="font-mono text-xs text-foreground">18</span>}
          />
        </ModuleShell>
      </BentoCard>

      {/* HR (wide, orchestration flow) */}
      <BentoCard
        team="HR"
        title="HR"
        desc="The full employee journey, orchestrated end to end."
        seeLabel="See HR"
        className="sm:col-span-2 lg:col-span-8"
        icon={
          <>
            <circle cx="9" cy="8" r="3" />
            <path d="M2 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" />
            <circle cx="18" cy="8" r="2.4" />
            <path d="M16.5 14.6c2.6.5 4.5 2.3 4.5 5.4" />
          </>
        }
      >
        <div
          aria-hidden
          className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 flex-col gap-1.5 text-[13px] text-muted-foreground sm:text-right">
            <span>Hire</span>
            <span>Onboard</span>
            <span>Learn &amp; develop</span>
          </div>
          <span className="hidden h-px flex-1 bg-border sm:block" />
          <div className="rounded-sm border border-brand/40 bg-brand-soft px-4 py-3 text-center">
            <span className="block text-sm font-semibold text-brand-text">
              Agentic OS
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Orchestrating
            </span>
          </div>
          <span className="hidden h-px flex-1 bg-border sm:block" />
          <div className="flex flex-1 flex-col gap-1.5 text-[13px] text-muted-foreground">
            <span>Review</span>
            <span>Reward</span>
            <span>Exit interview</span>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}
