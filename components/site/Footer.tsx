import Link from "next/link";
import { ShieldIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";

const columns: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Platform",
      links: [
        { label: "Platform", href: "/platform" },
        { label: "Solutions", href: "/#solutions" },
        { label: "Governance", href: "/#governance" },
        { label: "Live demo", href: "/demo" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Pricing", href: "/pricing" },
        { label: "Privacy", href: "/privacy" },
        { label: "For developers", href: "/llms.txt" },
      ],
    },
    {
      heading: "Get in touch",
      links: [
        { label: "Book a demo", href: "/contact" },
        { label: "Talk to our team", href: "/contact" },
        { label: "Security overview", href: "/#governance" },
      ],
    },
  ];

export function Footer() {
  return (
    <footer className="dark border-t bg-background py-16 text-foreground">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-xl font-semibold">Madison by Lyzr</p>
            <p className="mt-3 max-w-72 text-sm leading-relaxed text-muted-foreground">
              The Agentic Banking OS — governed AI agents for banks and credit
              unions.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-xs text-muted-foreground">
              <ShieldIcon size={13} />
              Built on Lyzr
            </span>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-overline tracking-overline uppercase text-brand-text">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-120 ease-standard hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t pt-6 text-xs text-muted-foreground">
          <span>© 2026 Madison. All rights reserved.</span>
          <span>
            Madison is built on the Lyzr platform. Compliance labels reflect
            audit status at time of publication.
          </span>
        </div>
      </Container>
    </footer>
  );
}
