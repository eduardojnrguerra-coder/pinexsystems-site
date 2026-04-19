"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  durationMs?: number;
}

export function Counter({ value, suffix = "", durationMs = 1300 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    const start = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [durationMs, value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}
