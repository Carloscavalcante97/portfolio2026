"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function SkillsSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="skills" className="scroll-mt-14 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4">
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              {t.skills.heading}
            </h2>
          </Reveal>
        </div>

        {/* Editorial top-5 list */}
        <div className="flex flex-col">
          {t.skills.top.map((name, i) => (
            <Reveal key={name} delay={i * 0.08}>
              <div className="flex items-baseline gap-4 border-b border-[var(--glass-border)] py-4">
                <span className="font-mono text-xs text-muted w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl md:text-4xl text-foreground">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rest — mono badges */}
        <Reveal delay={0.48}>
          <div className="flex flex-wrap gap-2 mt-8">
            {t.skills.rest.map((badge) => (
              <span
                key={badge}
                className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--glass-border)] text-muted"
              >
                {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
