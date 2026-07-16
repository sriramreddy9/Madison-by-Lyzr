import type { Metadata } from "next";
import { JsonLd, SITE_URL, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About Madison — The Agentic Banking OS by Lyzr",
  description:
    "Madison by Lyzr is the Agentic Banking OS: governed AI agents across every banking function, deployed inside your perimeter with a human in the loop and a full audit trail.",
  alternates: { canonical: "/about", types: { "text/markdown": "/about.md" } },
  openGraph: { url: "/about", title: "About Madison by Lyzr" },
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
                "@type": "AboutPage",
                url: `${SITE_URL}/about`,
                name: "About Madison by Lyzr",
                about: { "@id": `${SITE_URL}/#organization` },
              },
              verticalBreadcrumbs("About", "/about"),
            ],
          } as never
        }
      />

      <section className="dark bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-serif text-hero-sm sm:text-hero">
            Madison helps run your bank.
          </h1>
          <p className="mt-6 max-w-2xl text-dek text-muted-foreground" data-speakable>
            Madison is the Agentic Banking OS by Lyzr — governed AI agents that
            run the work between decisions across every banking function, deployed
            inside your own perimeter with a human in the loop on every regulated
            step and a full, exportable audit trail.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="What we build"
          title="One governed platform, every banking function."
          dek="Madison is an orchestration layer on top of the core, CRM, and systems a bank already runs — additive, never a rip-and-replace. Agents assist, recommend, or automate up to the decision; your people make every regulated call."
        />
        <div className="mt-10 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["In your perimeter", "On-premises, private cloud, or air-gapped. Your data never leaves your boundary, and there is no training on your data."],
            ["Human in the loop", "No autonomous sends and no shadow decisions. Every regulated step is gated by a human approval."],
            ["Examiner-ready", "Every agent action and human decision is cited, timestamped, and exportable — the trail an examiner asks for already exists."],
            ["Bring your own LLM", "Run against Azure OpenAI, AWS Bedrock, or private models. Your keys, your logs, your controls."],
            ["Additive by design", "Madison sits on top of the estate you already run and coordinates work across it, rather than replacing infrastructure."],
            ["Built by Lyzr", "Madison is built by Lyzr, which builds enterprise agent infrastructure. Madison is its banking-specific system."],
          ].map(([h, b]) => (
            <div key={h} className="bg-background p-6">
              <h2 className="font-serif text-h3 text-foreground">{h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sunken" bordered>
        <SectionHeader eyebrow="Governance" title="Built for the way banks are regulated." />
        <div className="mt-8 flex flex-wrap gap-2">
          {["SOC 2 Type II", "ISO 27001", "EU data residency", "BYO-LLM", "Zero training on your data", "SSO / SAML", "Full audit trail"].map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
      </Section>

      <Section tone="dark" id="contact">
        <div className="mx-auto max-w-160 text-center">
          <h2 className="font-serif text-section lg:text-section-lg">See Madison on your bank&rsquo;s stack.</h2>
          <p className="mt-4 text-dek text-muted-foreground">
            Engagements begin with a bounded design-partner pilot on one workflow, live in weeks.
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
