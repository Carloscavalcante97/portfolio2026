"use client";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

export function ExperienceSection(): React.JSX.Element {
  const { t } = useLanguage();
  const e = t.experience;

  return (
    <section id="experiencia" className="scroll-mt-14 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="04" label={e.label} heading={e.heading} />

        <div className="flex flex-col border-t border-[var(--glass-border)]">
          {e.items.map((r, i) => (
            <Reveal key={`${r.company}-${r.period}`} delay={i * 0.06}>
              <article className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-[var(--glass-border)]">
                <div className="md:col-span-4 flex flex-col gap-1.5">
                  <span className="font-mono text-xs text-muted inline-flex items-center gap-2">
                    {r.period}
                    {r.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] px-2 py-0.5 text-cta-ink">
                        <span className="size-1.5 rounded-full bg-cta-ink" />
                        {e.current}
                      </span>
                    )}
                  </span>
                  <span className="font-display text-2xl text-foreground">{r.company}</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-3">
                  <h3 className="text-lg md:text-xl text-foreground">{r.role}</h3>
                  <ul className="flex flex-col gap-2">
                    {r.points.map((p) => (
                      <li key={p} className="text-muted leading-relaxed flex gap-3">
                        <span aria-hidden="true" className="font-mono text-primary-ink pt-0.5">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
