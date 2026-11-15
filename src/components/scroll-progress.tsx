"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin reading-progress bar in the accent color, pinned under the header
export function ScrollProgress(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-cta-ink"
      style={{ scaleX }}
    />
  );
}
