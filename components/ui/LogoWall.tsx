import { cn } from "@/lib/utils";

/** Text wordmark wall (proof strip). Static — nothing scrolls by itself. */
export function LogoWall({
  names,
  caption,
  className,
}: {
  names: string[];
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <ul className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-4">
        {names.map((name) => (
          <li
            key={name}
            className="font-serif text-lg text-muted-foreground"
          >
            {name}
          </li>
        ))}
      </ul>
      {caption ? (
        <p className="mt-6 font-mono text-xs text-muted-foreground/80">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
