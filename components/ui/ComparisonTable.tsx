import { cn } from "@/lib/utils";
import { CheckIcon, MinusIcon } from "@/components/icons";

export type ComparisonCell = boolean | string;

export type ComparisonRow = {
  label: string;
  cells: ComparisonCell[];
};

function Cell({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-success-text">
        <CheckIcon size={16} strokeWidth={2} />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center text-muted-foreground/60">
        <MinusIcon size={16} />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span className="text-muted-foreground">{value}</span>;
}

/**
 * Capability comparison. `highlightCol` marks the Madison column.
 * Wide content scrolls inside its own container.
 */
export function ComparisonTable({
  caption,
  columns,
  rows,
  highlightCol,
  className,
}: {
  caption?: string;
  columns: string[];
  rows: ComparisonRow[];
  highlightCol?: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-160 border-collapse text-sm">
        {caption ? (
          <caption className="sr-only">{caption}</caption>
        ) : null}
        <thead>
          <tr className="border-b border-foreground/80">
            <th className="py-3 pr-4 text-left font-sans text-overline tracking-overline uppercase text-muted-foreground">
              Capability
            </th>
            {columns.map((col, i) => (
              <th
                key={col}
                className={cn(
                  "px-4 py-3 text-left font-sans text-overline tracking-overline uppercase",
                  i === highlightCol
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b">
              <td className="py-3.5 pr-4 font-medium text-foreground">
                {row.label}
              </td>
              {row.cells.map((cell, i) => (
                <td
                  key={i}
                  className={cn("px-4 py-3.5", i === highlightCol && "bg-muted")}
                >
                  <Cell value={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
