/**
 * House icon set — Phosphor-style regular-stroke inline SVGs (1.6px stroke,
 * currentColor). Site chrome and marketing sections use ONLY these; the
 * /demo product UI may use lucide-react.
 */
type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function Svg({
  size = 20,
  className,
  strokeWidth = 1.6,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function ShieldIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
    </Svg>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="5" y="11" width="14" height="9" rx="1" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Svg>
  );
}

export function UserCheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 20v-1a6 6 0 0 1 12 0v1" />
      <circle cx="10" cy="8" r="3.2" />
      <path d="M16.5 11.5l2 2 3.5-4" />
    </Svg>
  );
}

export function AuditTrailIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 4h14v16H5z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </Svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function ChevronLeftIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 6l-6 6 6 6" />
    </Svg>
  );
}

export function ChevronRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12l5 5L20 6" />
    </Svg>
  );
}

export function MinusIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 12h14" />
    </Svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function PlayIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 5.5v13l11-6.5z" />
    </Svg>
  );
}

export function GlobeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </Svg>
  );
}

export function BuildingIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 21V5l8-2v18M12 21V9l8 2v10M4 21h16" />
      <path d="M7 9h2M7 13h2M15 14h2M15 17h2" />
    </Svg>
  );
}

export function CpuIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M7 3v3M17 3v3M7 18v3M17 18v3" />
    </Svg>
  );
}

export function LayersIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Svg>
  );
}

export function PlugIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6z" />
      <path d="M12 17v4" />
    </Svg>
  );
}
