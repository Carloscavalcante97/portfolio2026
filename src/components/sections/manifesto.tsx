"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

type Word = { text: string; em: boolean };

// Each word sits in the muted color (always readable, ≥4.5:1) and a
// full-color copy fades in on top as the statement scrolls through view.
function LitWord({
  word,
  index,
  total,
  progress,
}: {
  word: Word;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0, 1]);
  const cls = word.em ? "type-accent text-cta-ink" : "type-heavy";

  return (
    <span className="relative inline-block mr-[0.22em]">
      <span className={`${cls} text-muted`}>{word.text}</span>
      <motion.span aria-hidden="true" className={`${cls} absolute inset-0 ${word.em ? "" : "text-foreground"}`} style={{ opacity }}>
        {word.text}
      </motion.span>
    </span>
  );
}

export function ManifestoSection(): React.JSX.Element {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const words: Word[] = t.manifesto.parts.flatMap((part) =>
    part.text.split(" ").map((text) => ({ text, em: Boolean(part.em) })),
  );

  return (
    <section aria-label={t.manifesto.label} className="py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <span className="eyebrow block mb-8">{t.manifesto.label}</span>
        <p ref={ref} className="leading-[0.95]" style={{ fontSize: "clamp(2.75rem, 7.5vw, 7rem)" }}>
          {reduced
            ? words.map((w, i) => (
                <span key={i} className={`${w.em ? "type-accent text-cta-ink" : "type-heavy text-foreground"} mr-[0.22em]`}>
                  {w.text}
                </span>
              ))
            : words.map((w, i) => (
                <LitWord key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
              ))}
        </p>
      </div>
    </section>
  );
}
