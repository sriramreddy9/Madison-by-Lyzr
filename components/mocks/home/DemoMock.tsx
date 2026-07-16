import { PlayIcon } from "@/components/icons";

/**
 * Placeholder for an embedded product-demo video: a dark workspace mock of
 * the dispute-resolution agent mid-task (rebuilt token-driven from the
 * master page's SVG placeholder). Swap for a real capture when available.
 */
export function DemoMock({ caption }: { caption: string }) {
  return (
    <div className="dark relative overflow-hidden rounded-md border bg-background text-foreground">
      {/* Title bar */}
      <div className="flex items-center gap-4 border-b bg-card px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full bg-muted-foreground/40" />
          <i className="size-2 rounded-full bg-muted-foreground/40" />
          <i className="size-2 rounded-full bg-muted-foreground/40" />
        </span>
        <span className="mx-auto font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Madison — Dispute Resolution Agent
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr]">
        {/* Main panel */}
        <div className="border-b p-5 md:border-b-0 md:border-r">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-foreground">
              Case #DR-88214 · Card dispute
            </span>
            <span className="rounded-xs border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Step 3/5
            </span>
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/5 bg-brand" aria-hidden />
          </div>
          <ul className="mt-4 text-[13px] text-muted-foreground">
            <li className="border-b border-border/70 py-2.5">
              Reviewed transaction history and merchant records.
            </li>
            <li className="border-b border-border/70 py-2.5">
              Matched dispute reason to Reg E provisional credit rule.
            </li>
            <li className="py-2.5">
              Drafted resolution letter — awaiting approval.
            </li>
          </ul>
          <div className="mt-2 space-y-2 rounded-sm border bg-card p-4" aria-hidden>
            <div className="h-2 w-full rounded-full bg-muted" />
            <div className="h-2 w-full rounded-full bg-muted" />
            <div className="h-2 w-2/3 rounded-full bg-muted" />
          </div>
          <div className="mt-4 flex gap-2.5">
            <span className="rounded-xs bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
              Approve &amp; send
            </span>
            <span className="rounded-xs border px-4 py-2 text-xs text-muted-foreground">
              Edit draft
            </span>
          </div>
        </div>

        {/* Audit trail */}
        <div className="p-5">
          <p className="border-b pb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Audit trail
          </p>
          <ul className="mt-3 space-y-3 text-xs">
            {[
              { text: "Read case #DR-88214", done: true },
              { text: "Queried merchant network", done: true },
              { text: "Applied Reg E policy v4.2", done: true },
              { text: "Drafted resolution letter", done: false },
              { text: "Awaiting human approval", done: false },
            ].map((entry) => (
              <li key={entry.text} className="flex items-center gap-2.5">
                <span
                  className={
                    entry.done
                      ? "size-1.5 shrink-0 rounded-full bg-brand"
                      : "size-1.5 shrink-0 rounded-full bg-muted-foreground/40"
                  }
                  aria-hidden
                />
                <span
                  className={
                    entry.done ? "text-foreground" : "text-muted-foreground"
                  }
                >
                  {entry.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Play affordance + caption */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 items-center justify-center rounded-full border border-foreground/30 bg-background/70 text-foreground backdrop-blur-sm">
          <PlayIcon size={22} />
        </span>
      </div>
      <span className="absolute bottom-3 right-4 font-mono text-[11px] text-muted-foreground">
        {caption}
      </span>
    </div>
  );
}
