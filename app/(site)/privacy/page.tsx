import type { Metadata } from "next";
import { JsonLd, SITE_URL, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy & data handling",
  description:
    "How Madison by Lyzr handles data: deployed inside your perimeter, no data egress, no training on your data, with an exportable audit trail. On-premises, private cloud, or air-gapped.",
  alternates: { canonical: "/privacy", types: { "text/markdown": "/privacy.md" } },
  openGraph: { url: "/privacy", title: "Madison by Lyzr — Privacy" },
};

const SECTIONS = [
  ["Where your data lives", "Madison deploys inside your perimeter — on-premises, in your private cloud (VPC), or fully air-gapped. Vendor, contract, model, and customer data stays inside your boundary. There is no cross-tenant training and no data egress from your environment."],
  ["No training on your data", "Your data is never used to train a shared model. Personal data is redacted before any model call, and inference runs against the LLM you bring (Azure OpenAI, AWS Bedrock, or a private deployment) under your keys and logging."],
  ["What we record", "Every agent action and human decision is written to an exportable, tamper-evident audit trail — what was read, what was done, and why — so the evidence an examiner asks for already exists. You control retention and export."],
  ["Human accountability", "No regulated step is taken autonomously. A person approves every regulated action; the agent prepares the decision and hands it over with the reasoning attached."],
  ["Security posture", "Madison is aligned to SOC 2 Type II and ISO 27001, supports SSO/SAML and role-based access control, and encrypts data in transit and at rest. A full security & compliance pack is available on request."],
  ["Contact", "For data-handling questions, a Data Processing Addendum, or the security & compliance pack, email hello@lyzr.ai or use the contact page."],
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
                "@type": "WebPage",
                url: `${SITE_URL}/privacy`,
                name: "Privacy & data handling — Madison by Lyzr",
                about: { "@id": `${SITE_URL}/#organization` },
              },
              verticalBreadcrumbs("Privacy", "/privacy"),
            ],
          } as never
        }
      />

      <Section>
        <Eyebrow>Privacy &amp; data handling</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-serif text-hero-sm sm:text-hero">
          Your data stays inside your boundary.
        </h1>
        <p className="mt-6 max-w-2xl text-dek text-muted-foreground" data-speakable>
          Madison is deployed in your perimeter, trains on nothing you hold, and
          logs every action for the exam. This page summarizes how Madison
          handles data; a full security &amp; compliance pack is available on
          request.
        </p>
        <div className="mt-12 flex flex-col gap-px border-t">
          {SECTIONS.map(([h, b]) => (
            <div key={h} className="grid gap-2 border-b py-6 lg:grid-cols-[16rem_1fr] lg:gap-8">
              <h2 className="font-serif text-h3 text-foreground">{h}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          This summary is provided for transparency and does not constitute a
          contract. Deployment-specific terms are set in your engagement
          agreement and Data Processing Addendum.
        </p>
      </Section>
    </>
  );
}
