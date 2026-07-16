import type { Metadata } from "next";
import { JsonLd, SITE_URL, verticalBreadcrumbs } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Madison — Book a demo",
  description:
    "Book a demo of Madison by Lyzr or request the security & compliance pack. Enterprise engagements begin with a bounded design-partner pilot, live in weeks.",
  alternates: { canonical: "/contact", types: { "text/markdown": "/contact.md" } },
  openGraph: { url: "/contact", title: "Contact Madison by Lyzr" },
};

const EXPECT = [
  "A 30-minute working session on one of your real workflows",
  "A live agent run on masked or synthetic data that mirrors your book",
  "Reference architecture for your CISO and second line",
  "A scoping document within 48 hours",
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
                "@type": "ContactPage",
                url: `${SITE_URL}/contact`,
                name: "Contact Madison by Lyzr",
                about: { "@id": `${SITE_URL}/#organization` },
              },
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "Madison by Lyzr",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "hello@lyzr.ai",
                  url: `${SITE_URL}/contact`,
                },
              },
              verticalBreadcrumbs("Contact", "/contact"),
            ],
          } as never
        }
      />

      <section className="dark bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Get started</Eyebrow>
            <h1 className="mt-5 font-serif text-hero-sm sm:text-hero">
              Talk to the Madison team.
            </h1>
            <p className="mt-6 max-w-xl text-dek text-muted-foreground" data-speakable>
              Book a demo or request the security &amp; compliance pack. Madison
              is an enterprise, quote-based product; engagements begin with a
              bounded, below-tender design-partner pilot on one workflow, live in
              weeks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="mailto:hello@lyzr.ai?subject=Madison%20demo%20request" size="lg">
                Email hello@lyzr.ai
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                See pricing
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Prefer the site walkthrough? Explore the{" "}
              <a href="/demo" className="text-brand-text underline underline-offset-4">
                live demo
              </a>
              .
            </p>
          </div>
          <div className="rounded-md border bg-card p-6">
            <div className="font-mono text-overline uppercase tracking-overline text-brand-text">
              What to expect
            </div>
            <ul className="mt-5 flex flex-col gap-px border-t">
              {EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b py-3.5 text-sm text-muted-foreground">
                  <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-text" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
