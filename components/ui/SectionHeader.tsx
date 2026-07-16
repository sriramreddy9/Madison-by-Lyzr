import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Section opener: eyebrow → serif title → dek. Max measure 640px. */
export function SectionHeader({
  eyebrow,
  eyebrowTone,
  title,
  dek,
  align = "left",
  className,
}: {
  eyebrow?: string;
  eyebrowTone?: "brand" | "muted";
  title: React.ReactNode;
  dek?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-160",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 font-serif text-section lg:text-section-lg">
        {title}
      </h2>
      {dek ? (
        <p className="mt-4 text-dek text-muted-foreground">{dek}</p>
      ) : null}
    </div>
  );
}
