import { cn } from "@/lib/utils";

/**
 * Overline label. Oxblood by default — this is a band's designated accent
 * moment. Use `tone="muted"` when the band already spends its oxblood.
 */
export function Eyebrow({
  tone = "brand",
  className,
  children,
}: {
  tone?: "brand" | "muted";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-sans text-overline tracking-overline uppercase",
        tone === "brand" ? "text-brand-text" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
