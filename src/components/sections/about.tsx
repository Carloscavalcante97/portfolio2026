"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { STACK_BADGES } from "@/content/site";

export function AboutSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-14 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Text — 7 cols */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl md:text-5xl text-foreground">
                {t.about.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-muted text-lg leading-relaxed max-w-prose">
                {t.about.body}
              </p>
            </Reveal>
          </div>

          {/* Badges — 4 cols starting at 9 */}
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-2">
                {STACK_BADGES.map((badge) => (
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
        </div>
      </div>
    </section>
  );
}
