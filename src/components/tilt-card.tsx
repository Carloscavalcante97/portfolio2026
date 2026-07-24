"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1
    rawRotateY.set((px - 0.5) * 6);   // -3° to 3°
    rawRotateX.set((0.5 - py) * 6);   // 3° to -3° (flip so top tilts toward viewer)
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  }

  function handlePointerLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`group glass rounded-xl ${className ?? ""}`}
      style={reduced ? {} : { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Specular highlight follows cursor via CSS vars */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-[0.35]"
        style={{
          background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), var(--glass-highlight), transparent 70%)",
        }}
      />
      {children}
    </motion.div>
  );
}
