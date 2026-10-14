"use client";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

export function AboutSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-14 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="01" label={t.about.label} heading={t.about.heading} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-7 flex flex-col gap-5">
            {t.about.body.map((p, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p className={i === 0 ? "text-foreground text-xl md:text-2xl leading-snug" : "text-muted text-lg leading-relaxed"}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24} className="md:col-span-4 md:col-start-9">
            <dl className="glass rounded-2xl p-6 flex flex-col divide-y divide-[var(--glass-border)]">
              {t.about.facts.map(({ k, v }) => (
                <div key={k} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                  <dd className="text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
