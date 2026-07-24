"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}): React.JSX.Element {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (reduced || !inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(v) + suffix;
        }
      },
    });
    return () => ctrl.stop();
  }, [inView, reduced, to, prefix, suffix, duration]);

  // Reduced motion: final value immediately.
  // Animated: start at 0 so no 75→0→75 flash when element enters viewport at 50%.
  return (
    <span ref={ref} className={className}>
      {reduced ? <>{prefix}{to}{suffix}</> : <>{prefix}0{suffix}</>}
    </span>
  );
}
