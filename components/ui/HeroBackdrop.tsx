import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Full-bleed grayscale hero backdrop with a Vault scrim — the one sanctioned
 * home for atmospheric hero-band photography (professionals, boardrooms,
 * office towers). Content images still go through `Figure`; this exists only
 * for the dark hero LCP background, matching the homepage treatment.
 *
 * Place as the first child of a `relative overflow-hidden` dark hero section,
 * then wrap the hero content in a `relative` container so it sits above.
 */
export function HeroBackdrop({
  src,
  priority = false,
  scrim = "from-background/88 via-background/72 to-background/96",
  className,
}: {
  src: string;
  /** set on the homepage hero / above-the-fold LCP image only */
  priority?: boolean;
  /** gradient stops for the scrim; darker = more legible text */
  scrim?: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)} aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover grayscale contrast-105"
      />
      <div className={cn("absolute inset-0 bg-linear-to-b", scrim)} />
    </div>
  );
}
