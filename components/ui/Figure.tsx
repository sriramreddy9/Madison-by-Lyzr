import Image from "next/image";
import { cn } from "@/lib/utils";

type Ratio = "wide" | "editorial" | "portrait" | "tall" | "square";

const ratios: Record<Ratio, string> = {
  wide: "aspect-video", // 16:9
  editorial: "aspect-3/2",
  portrait: "aspect-4/5",
  tall: "aspect-5/7",
  square: "aspect-square",
};

/**
 * The ONLY way an image enters the site (IMAGERY.md). Grayscale by default;
 * `duotone` adds the band's scrim (uses the current --background channel, so
 * inside a `.dark` band the scrim is the Vault). `color` is reserved for
 * product screenshots.
 */
export function Figure({
  src,
  alt,
  ratio = "editorial",
  treatment = "grayscale",
  caption,
  credit,
  priority = false,
  sizes = "100vw",
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  treatment?: "grayscale" | "duotone" | "color";
  caption?: string;
  credit?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <div className={cn("relative overflow-hidden", ratios[ratio])}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            treatment !== "color" && "grayscale contrast-105",
            imgClassName,
          )}
        />
        {treatment === "duotone" ? (
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-b from-background/75 via-background/45 to-background/85"
          />
        ) : null}
      </div>
      {caption || credit ? (
        <figcaption className="mt-2 flex items-baseline justify-between gap-4 text-xs text-muted-foreground">
          <span>{caption}</span>
          {credit ? <span className="font-mono">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
