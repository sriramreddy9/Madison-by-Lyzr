import { cn } from "@/lib/utils";

/**
 * Shared DNA for every product-mock visual (live briefs, decision inboxes,
 * cockpit screens, bento readouts). Mocks carry verbatim proof content, so
 * each page builds its own — but always out of these primitives.
 */

/** Bordered panel with a mono title bar. */
export function PanelFrame({
  title,
  status,
  className,
  children,
}: {
  title: string;
  status?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border bg-card text-card-foreground",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        {status}
      </div>
      {children}
    </div>
  );
}

/** Label / value row divided by hairlines. */
export function KVRow({
  label,
  value,
  className,
}: {
  label: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-border/70 px-4 py-2.5 text-sm last:border-b-0",
        className,
      )}
    >
      <span className="text-foreground">{label}</span>
      {value !== undefined ? (
        <span className="shrink-0 font-mono text-xs text-muted-foreground">
          {value}
        </span>
      ) : null}
    </div>
  );
}

type Status = "done" | "running" | "queued" | "flagged" | "waiting";

const statusTone: Record<Status, string> = {
  done: "text-success-text",
  running: "text-brand-text",
  queued: "text-muted-foreground",
  flagged: "text-warning-text",
  waiting: "text-muted-foreground",
};

/** Small mono status label with an optional pulse dot (the one motion allowed). */
export function StatusTag({
  status,
  children,
  className,
}: {
  status: Status;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide",
        statusTone[status],
        className,
      )}
    >
      {status === "running" ? (
        <span className="size-1.5 animate-pulse rounded-full bg-brand motion-reduce:animate-none" />
      ) : null}
      {children}
    </span>
  );
}
