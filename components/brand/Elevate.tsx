"use client";

// Sage brand motif: concentric hairline rings, monochrome, one quiet teal arc.
export function SageRings({
  className = "",
  size = 560,
  animate = true,
}: {
  className?: string;
  size?: number;
  animate?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 560 560"
        width={size}
        height={size}
        className={animate ? "animate-slow-spin" : ""}
        style={{ transformOrigin: "50% 50%" }}
      >
        <rect x="20" y="20" width="520" height="520" rx="260" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <rect x="90" y="90" width="380" height="380" rx="190" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <rect x="160" y="160" width="240" height="240" rx="120" fill="none" stroke="hsl(var(--foreground) / 0.12)" strokeWidth="1.5" />
      </svg>
      <svg
        viewBox="0 0 560 560"
        width={size}
        height={size}
        className={`absolute inset-0 ${animate ? "animate-slow-spin-rev" : ""}`}
        style={{ transformOrigin: "50% 50%" }}
      >
        <path
          d="M 280 40 A 240 240 0 0 1 520 280"
          fill="none"
          stroke="hsl(var(--brand))"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="280" cy="280" r="5" fill="hsl(var(--foreground) / 0.2)" />
      </svg>
    </div>
  );
}

// Sage wordmark: sans, ink, teal dot as the brand mark.
export function SageLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-foreground ${className}`}>
      <svg width="24" height="24" viewBox="0 0 26 26" aria-hidden="true">
        <rect x="1" y="1" width="24" height="24" rx="12" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
        <rect x="6.5" y="6.5" width="13" height="13" rx="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="13" cy="13" r="2.6" fill="hsl(var(--brand))" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[-0.01em]">
        Agentic OS <span className="font-medium text-muted-foreground">for Banking</span>
      </span>
    </span>
  );
}
