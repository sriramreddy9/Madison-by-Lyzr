import { PanelFrame } from "@/components/mocks/chrome";
import { Badge } from "@/components/ui/Badge";

type Tone = "success" | "warning" | "danger";

export type ScreenData = {
  title: string;
  heading: string;
  chip: string;
  head: string[];
  rows: readonly (readonly string[])[];
  tones: readonly Tone[];
  kpis: readonly { value: string; label: string }[];
};

/**
 * Reusable product-screen mock for the risk feature blocks (risk radar,
 * vendor-AI governance). Renders the source "Sage" screen tables on shared
 * chrome, tokenized. The last column of each row is a status pill.
 */
export function ScreenPanel({
  data,
  className,
}: {
  data: ScreenData;
  className?: string;
}) {
  const lastCol = data.head.length - 1;
  return (
    <PanelFrame title={data.title} className={className}>
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <span className="font-sans text-sm font-semibold text-foreground">
          {data.heading}
        </span>
        <Badge tone="info">{data.chip}</Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b">
              {data.head.map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, r) => (
              <tr key={r} className="border-b border-border/60">
                {row.map((cell, c) => (
                  <td key={c} className="px-4 py-2.5 align-middle">
                    {c === lastCol ? (
                      <Badge tone={data.tones[r]}>{cell}</Badge>
                    ) : c === 0 ? (
                      <span className="font-medium text-foreground">{cell}</span>
                    ) : (
                      <span className="text-muted-foreground">{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-3 gap-px border-t bg-border">
        {data.kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card px-3 py-3">
            <div className="font-mono text-base font-semibold text-foreground">
              {kpi.value}
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}
