import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type CtaAction = {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "ghost";
};

/** Closing Vault band: serif headline, one primary action repeated site-wide. */
export function CtaBand({
  id = "contact",
  eyebrow,
  title,
  line,
  actions,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  line?: React.ReactNode;
  actions: CtaAction[];
}) {
  return (
    <Section id={id} tone="dark">
      <div className="mx-auto max-w-160 text-center">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-4 font-serif text-section lg:text-section-lg">
          {title}
        </h2>
        {line ? (
          <p className="mt-4 text-dek text-muted-foreground">{line}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              href={action.href}
              variant={action.variant ?? "primary"}
              size="lg"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </Section>
  );
}
