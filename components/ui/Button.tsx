import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  // Monochrome action ladder — hierarchy by fill/weight, never color.
  primary:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/88",
  outline: "border-input bg-transparent text-foreground hover:bg-accent",
  ghost:
    "border-transparent bg-transparent text-muted-foreground hover:text-foreground",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-5 text-sm font-medium",
  md: "h-12 px-7 text-btn",
  lg: "h-13 px-8 text-base font-medium",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        "href" | "className" | "children"
      >)
    | ({ href?: undefined } & Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >)
  );

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs border font-sans transition-colors duration-180 ease-standard",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as { href: string } & Record<
      string,
      unknown
    >;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
