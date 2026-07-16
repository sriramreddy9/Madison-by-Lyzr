import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type Tone = "paper" | "sunken" | "dark";

/**
 * Page band. `tone="dark"` re-scopes every token inside to "the Vault" —
 * components keep using the same semantic classes and invert automatically.
 */
export function Section({
  id,
  tone = "paper",
  tight = false,
  bordered = false,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  tight?: boolean;
  /** hairline top+bottom rules — used when adjacent bands share a background */
  bordered?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        tight ? "py-16" : "py-16 md:py-24",
        tone === "sunken" && "bg-muted",
        tone === "dark" && "dark bg-background text-foreground",
        tone === "paper" && "bg-background",
        bordered && "border-y",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
