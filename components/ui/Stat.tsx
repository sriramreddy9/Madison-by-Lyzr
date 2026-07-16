import { cn } from "@/lib/utils";

export type StatItem = {
  value: string;
  label: string;
  footnote?: string;
};

/** Numeric proof point — mono figure, sourced footnote. Never animated. */
export function Stat({
  value,
  label,
  footnote,
  className,
}: StatItem & { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="font-mono text-stat text-foreground">{value}</div>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {label}
      </div>
      {footnote ? (
        <div className="mt-2 font-mono text-xs text-muted-foreground/80">
          {footnote}
        </div>
      ) : null}
    </div>
  );
}

/** Hairline-divided stat row. */
export function StatBand({
  items,
  className,
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px border-t border-foreground/80 bg-border sm:grid-cols-2 lg:grid-cols-4",
        items.length === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-background py-6 pr-6">
          <Stat {...item} />
        </div>
      ))}
    </div>
  );
}
