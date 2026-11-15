"use client";

import { Fragment } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

export function SkillsSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="skills" className="scroll-mt-14 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading label={t.skills.label} heading={t.skills.heading} />

        {/* Editorial rows: group on the left, stack on the right */}
        <div className="flex flex-col border-t border-line">
          {t.skills.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.08}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 border-b border-line">
                <div className="md:col-span-3 flex items-baseline">
                  <span className="eyebrow text-cta-ink">{g.name}</span>
                </div>
                <p className="md:col-span-9 font-display text-2xl md:text-3xl text-foreground leading-snug">
                  {g.items.map((item, j) => (
                    // nowrap only on the name, so lines can still break at the separators
                    <Fragment key={item}>
                      <span className="whitespace-nowrap">{item}</span>
                      {j < g.items.length - 1 && <span className="text-muted/50"> / </span>}
                    </Fragment>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-6 font-mono text-xs text-muted">{t.skills.also}</p>
        </Reveal>
      </div>
    </section>
  );
}
