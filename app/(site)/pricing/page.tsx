import type { Metadata } from "next";
import { JsonLd, SITE_URL, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Pricing — Enterprise, quote-based",
  description:
    "Madison by Lyzr is enterprise and quote-based. Engagements begin with a bounded design-partner pilot on one workflow and expand from proof. Deployed in your perimeter; bring your own LLM.",
  alternates: { canonical: "/pricing", types: { "text/markdown": "/pricing.md" } },
  openGraph: { url: "/pricing", title: "Madison by Lyzr — Pricing" },
};

const STAGES = [
  ["Design-partner pilot", "A bounded, below-tender pilot on one high-value workflow with a focused team, live in weeks.", "Fixed-scope pilot fee, quoted per engagement."],
  ["Production rollout", "The pilot workflow put into production, then expanded to more teams and workflows on the same deployment.", "Annual enterprise license, scoped to teams, workflows, and deployment model."],
  ["Enterprise deployment", "Bank-wide rollout across functions, with SI-led implementation and full governance controls.", "Custom enterprise agreement."],
];

const INCLUDED = [
  "In-perimeter deployment (on-prem, VPC, or air-gapped)",
  "Human-in-the-loop approval and an exportable audit trail",
  "Security & compliance pack (SOC 2 Type II, ISO 27001, model-risk docs)",
  "Bring your own LLM — inference on your existing provider contracts",
  "Design-partner onboarding and scoping",
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
                "@type": "Product",
                name: "Madison by Lyzr",
                description:
                  "The Agentic Banking OS. Enterprise, quote-based; deployed in your perimeter.",
                brand: { "@id": `${SITE_URL}/#organization` },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "USD",
                  price: "0",
                  availability: "https://schema.org/InStock",
                  url: `${SITE_URL}/pricing`,
                  description:
                    "Enterprise, quote-based. Priced per engagement via a design-partner pilot; contact for pricing.",
                },
              },
              verticalBreadcrumbs("Pricing", "/pricing"),
            ],
          } as never
        }
      />

      <section className="dark bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-serif text-hero-sm sm:text-hero">
            Enterprise, quote-based. Start with one workflow.
          </h1>
          <p className="mt-6 max-w-2xl text-dek text-muted-foreground" data-speakable>
            Madison deploys inside your perimeter and is priced per engagement —
            there is no public self-serve tier or usage-metered public API.
            Engagements begin with a bounded design-partner pilot and expand from
            proof.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">Get a quote</Button>
            <Button href="/contact" variant="outline" size="lg">Request the security pack</Button>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="How engagements work" title="Three stages, priced to the scope you deploy." />
        <DataTable
          className="mt-10"
          head={["Stage", "What it is", "What it costs"]}
          rows={STAGES}
        />
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Pricing depends on deployment model, the number of teams and workflows, and integration scope. Bring your own LLM, so model inference runs on your existing provider contracts.
        </p>
      </Section>

      <Section tone="sunken" bordered>
        <SectionHeader eyebrow="What's included" title="Every engagement, governed the same way." />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-text" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          {["SOC 2 Type II", "ISO 27001", "On-prem / VPC / air-gapped", "BYO-LLM"].map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="mx-auto max-w-160 text-center">
          <h2 className="font-serif text-section lg:text-section-lg">Get a quote for your bank.</h2>
          <p className="mt-4 text-dek text-muted-foreground">
            Pricing is provided after a short scoping session. Machine-readable pricing is at{" "}
            <a href="/pricing.md" className="text-brand-text underline underline-offset-4">/pricing.md</a>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">Book a demo</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
