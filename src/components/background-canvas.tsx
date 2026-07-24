"use client";

// next/dynamic with ssr:false requires a client component — see:
// https://nextjs.org/docs/app/guides/lazy-loading

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const BackgroundScene = dynamic(
  () => import("@/components/background-scene").then((m) => m.BackgroundScene),
  { ssr: false },
);

export function BackgroundCanvas(): React.JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    >
      {/* Gradient fallback — always present behind the canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(81,43,212,0.25), transparent 70%)",
        }}
      />
      {/* Three.js scene — skipped entirely under reduced-motion.
          Fixed full-viewport background: always on screen, so no
          in-view frameloop gating needed anymore. */}
      {!reduced && <BackgroundScene />}
    </div>
  );
}
