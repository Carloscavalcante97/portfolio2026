"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Solid rectangular buttons with a subtle magnetic pull on pointer devices
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
    rawX.set(clamp(e.clientX - (rect.left + rect.width / 2), -6, 6));
    rawY.set(clamp(e.clientY - (rect.top + rect.height / 2), -6, 6));
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const baseClass = `rounded-[3px] px-6 py-3.5 type-heavy text-[15px] tracking-wide inline-flex items-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-cta-ink focus-visible:outline-offset-2 ${
    variant === "primary"
      ? "bg-cta text-cta-contrast hover:brightness-110"
      : "text-foreground border border-line hover:border-cta-ink hover:text-cta-ink"
  } ${className ?? ""}`;

  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (reduced) {
    return (
      <a href={href} className={baseClass} {...linkProps}>
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
      {...linkProps}
    >
      {children}
    </motion.a>
  );
}
