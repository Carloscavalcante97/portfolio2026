"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function MagneticButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}): React.JSX.Element {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 150, damping: 15 });
  const y = useSpring(rawY, { stiffness: 150, damping: 15 });

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(clamp(e.clientX - cx, -8, 8));
    rawY.set(clamp(e.clientY - cy, -8, 8));
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const baseClass = `rounded-full px-6 py-3 font-mono text-sm inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
    variant === "primary"
      ? "bg-cta text-white shadow-[0_4px_14px_rgba(4,120,87,0.3)]"
      : "glass text-foreground border border-[var(--glass-border)] hover:border-cta-ink transition-colors"
  } ${className ?? ""}`;

  if (reduced) {
    return (
      <a
        href={href}
        className={baseClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={baseClass}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}
