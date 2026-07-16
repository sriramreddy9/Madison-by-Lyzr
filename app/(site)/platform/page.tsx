import type { Metadata } from "next";
import { JsonLd, SITE_URL, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Platform — architecture, integration & deployment",
  description:
    "How Madison by Lyzr is built: Architect and Studio to compose agents, Sovereign/Optimus as the in-perimeter runtime, and a Control Plane for governance, approvals, and the audit ledger. Integration is provisioned per engagement.",
  alternates: { canonical: "/platform", types: { "text/markdown": "/platform.md" } },
  openGraph: { url: "/platform", title: "Madison by Lyzr — Platform" },
};

const LAYERS = [
  ["Architect & Studio", "Compose agents and workflows for your institution — your rulebook, brand kit, product catalog, approval chains, and history — without stitching disconnected tools."],
  ["Sovereign / Optimus", "The runtime, deployed inside your perimeter: on-premises, private cloud (VPC), or air-gapped. Bring your own LLM; inference and data stay in your boundary."],
  ["Control Plane", "Governance for the whole estate: autonomy policy bands (assist, recommend, automate), human-approval gates on every regulated step, and a tamper-evident, exportable audit ledger."],
];

const INTEGRATIONS = [
  "Core banking, servicing platforms, and LOS (read as a layer, never replaced)",
  "CRM — Salesforce, Dynamics 365, nCino, HubSpot",
  "Productivity & documents — Microsoft 365, SharePoint, Box, Google Drive",
  "Data — Snowflake, Databricks, BigQuery, and modern data lakes",
  "Send & service tools — Salesforce Marketing Cloud, Braze, Banno, ServiceNow, Jira",
  "Identity — SSO / SAML, role-based access control",
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TechArticle",
                url: `${SITE_URL}/platform`,
                headline: "Madison platform — architecture, integration & deployment",
                about: { "@id": `${SITE_URL}/#software` },
                author: { "@id": `${SITE_URL}/#organization` },
              },
              verticalBreadcrumbs("Platform", "/platform"),
            ],
          } as never
        }
      />

      <section className="dark bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>Platform</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-serif text-hero-sm sm:text-hero">
            One governed foundation under every agent.
          </h1>
          <p className="mt-6 max-w-2xl text-dek text-muted-foreground" data-speakable>
            Madison runs on a single governed foundation: a shared data layer,
            agent orchestration, and deployment inside your perimeter. The same
            platform powers every solution, with no separate data forks and no
            second vendor to vet.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Architecture" title="Three layers, one deployment." />
        <div className="mt-10 grid gap-px border bg-border md:grid-cols-3">
          {LAYERS.map(([h, b]) => (
            <div key={h} className="bg-background p-6">
              <h2 className="font-serif text-h3 text-foreground">{h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sunken" bordered>
        <SectionHeader
          eyebrow="Integration"
          title="It rides on the stack you already run."
          dek="Madison reads across your systems of record and files results back into the tools your team and examiners already know. Connectors and API access are provisioned during an engagement — there is no public self-serve API."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {INTEGRATIONS.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          {["On-prem", "VPC", "Air-gapped", "BYO-LLM", "SSO / SAML", "Audit ledger"].map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="mx-auto max-w-160 text-center">
          <h2 className="font-serif text-section lg:text-section-lg">See the platform on your stack.</h2>
          <p className="mt-4 text-dek text-muted-foreground">
            Integration and access are scoped in a design-partner pilot. Machine-readable context for agents lives at{" "}
            <a href="/llms-full.txt" className="text-brand-text underline underline-offset-4">/llms-full.txt</a>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">Book a demo</Button>
            <Button href="/pricing" variant="outline" size="lg">See pricing</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
