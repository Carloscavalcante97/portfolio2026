"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Each stage and the handoff it leaves — mirrors the real pipeline-Claude flow
const STAGES = [
  ["planner", "spec.md"],
  ["coder", "changes.md"],
  ["simplifier", "simplified"],
  ["tester", "passed"],
  ["e2e", "passed"],
  ["reviewer", "SHIP"],
] as const;

export function PipelineTerminal({
  command,
  done,
}: {
  command: string;
  done: string;
}): React.JSX.Element {
  const reduced = useReducedMotion();
  // step = number of finished stages; STAGES.length means the run is complete
  const [step, setStep] = useState(0);
  const shown = reduced ? STAGES.length : step;

  useEffect(() => {
    if (reduced) return;
    // Finished: hold the result, then replay the run
    const delay = step === 0 ? 1100 : step >= STAGES.length ? 5000 : 650;
    const id = setTimeout(() => setStep((s) => (s >= STAGES.length ? 0 : s + 1)), delay);
    return () => clearTimeout(id);
  }, [step, reduced]);

  return (
    <div className="glass rounded-2xl p-5 md:p-6 font-mono text-[13px] leading-relaxed shadow-[0_24px_80px_-24px_rgba(81,43,212,0.45)]">
      <div className="flex items-center justify-between text-[11px] text-muted mb-4">
        <span>~/app · feat/rate-limit</span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${shown >= STAGES.length ? "bg-cta-ink" : "bg-secondary animate-pulse"}`} />
          {shown >= STAGES.length ? "done" : "running"}
        </span>
      </div>

      <p className="text-foreground mb-3 break-words">
        <span className="text-cta-ink">$</span> {command}
      </p>

      <ul className="flex flex-col gap-1.5" aria-label="pipeline stages">
        {STAGES.map(([name, artifact], i) => {
          const state = i < shown ? "done" : i === shown ? "running" : "pending";
          return (
            <li key={name} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`w-3 text-center ${
                  state === "done" ? "text-cta-ink" : state === "running" ? "text-secondary-ink animate-pulse" : "text-muted/40"
                }`}
              >
                {state === "done" ? "✓" : state === "running" ? "●" : "○"}
              </span>
              <span className={state === "pending" ? "text-muted/50" : "text-foreground"}>{name}</span>
              <span
                className={`ml-auto transition-opacity duration-300 ${state === "done" ? "opacity-100" : "opacity-0"} ${
                  artifact === "SHIP" ? "text-cta-ink font-semibold" : "text-muted"
                }`}
              >
                {artifact}
              </span>
            </li>
          );
        })}
      </ul>

      <p
        className={`mt-4 pt-3 border-t border-[var(--glass-border)] text-[11px] text-muted transition-opacity duration-500 ${
          shown >= STAGES.length ? "opacity-100" : "opacity-0"
        }`}
      >
        → {done}
      </p>
    </div>
  );
}
