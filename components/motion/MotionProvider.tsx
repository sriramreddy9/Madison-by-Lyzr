"use client";

import { MotionConfig } from "motion/react";

/** App-wide motion policy: respect the user's reduced-motion preference. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
