import { cn } from "@/lib/utils";

/** Flat, hairline-bordered surface. Never shadowed at rest. */
export function Card({
  className,
  interactive = false,
  children,
}: {
  className?: string;
  /** hover lift used on linked cards (bento) */
  interactive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-card p-6 text-card-foreground",
        interactive &&
          "transition-all duration-180 ease-standard hover:-translate-y-0.5 hover:border-input hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
