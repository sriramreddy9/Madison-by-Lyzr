"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// Streams text word by word with a cursor, so agent output reads as typed, not pasted.
export function TypeText({
  text,
  speed = 36,
  className = "",
  cursor = true,
}: {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const [n, setN] = useState(reduced ? words.length : 0);

  useEffect(() => {
    if (reduced) {
      setN(words.length);
      return;
    }
    setN(0);
    const t = setInterval(() => {
      setN((c) => {
        if (c >= words.length) {
          clearInterval(t);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced, speed]);

  return (
    <span className={className}>
      {words.slice(0, n).join(" ")}
      {cursor && n < words.length && <span className="animate-blink">▌</span>}
    </span>
  );
}
