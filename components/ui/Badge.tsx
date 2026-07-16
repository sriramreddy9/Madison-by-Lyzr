import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

const tones: Record<Tone, string> = {
  neutral: "border-border bg-transparent text-muted-foreground",
  brand: "border-brand/30 bg-brand-soft text-brand-text",
  success: "border-success/25 bg-success-soft text-success-text",
  warning: "border-warning/25 bg-warning-soft text-warning-text",
  danger: "border-danger/25 bg-danger-soft text-danger-text",
  info: "border-info/25 bg-info-soft text-info-text",
};

/** Chip / pill / compliance badge. Feedback hues are soft tints only. */
export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
