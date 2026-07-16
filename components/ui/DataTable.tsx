import { cn } from "@/lib/utils";

/**
 * Editorial data table (deal-intelligence style): mono overline head,
 * hairline rows. Wide content scrolls inside its own container.
 */
export function DataTable({
  caption,
  head,
  rows,
  className,
}: {
  caption?: string;
  head: string[];
  rows: React.ReactNode[][];
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-160 border-collapse text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-foreground/80">
            {head.map((h) => (
              <th
                key={h}
                className="py-3 pr-6 align-bottom font-mono text-overline tracking-overline uppercase text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr key={r} className="border-b align-top">
              {cells.map((cell, c) => (
                <td
                  key={c}
                  className={cn(
                    "py-4 pr-6 leading-relaxed",
                    c === 0
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
