"use client";

import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { useLanguage } from "@/components/language-provider";

// Zigzag rows of 7+5, 5+7, 7+5 — never 3 equal columns
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-7", "md:col-span-5"];

export function ProjectsSection(): React.JSX.Element {
  const { t } = useLanguage();
  const p = t.projects;

  return (
    <section id="projetos" className="scroll-mt-14 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="02" label={p.label} heading={p.heading} />
        <Reveal delay={0.12}>
          <p className="-mt-6 md:-mt-10 mb-12 max-w-2xl text-muted text-lg">{p.intro}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {p.items.map((item, i) => {
            const featured = i === 0;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.06} className={SPANS[i] ?? "md:col-span-6"}>
                <TiltCard className={`h-full flex flex-col gap-5 ${featured ? "p-7 md:p-9" : "p-6 md:p-7"}`}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    <span className="text-cta-ink">{String(i + 1).padStart(2, "0")}</span> · {item.domain}
                  </span>

                  <div className="flex flex-col gap-2">
                    <h3 className={`font-display text-foreground leading-tight ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                      {item.title}
                    </h3>
                    <p className="text-muted leading-relaxed">{item.summary}</p>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                        <span aria-hidden="true" className="font-mono text-primary-ink">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-4">
                    {item.metric && (
                      <div className="flex items-end gap-3">
                        <CountUp
                          to={item.metric.value}
                          prefix={item.metric.prefix}
                          suffix={item.metric.suffix}
                          className="font-display text-5xl leading-none text-primary-ink"
                        />
                        <span className="font-mono text-xs text-muted pb-1">{item.metric.caption}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--glass-border)] pt-4">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="font-mono text-xs text-secondary-ink">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-[11px] text-muted">
                        {p.roleLabel}: <span className="text-foreground">{item.role}</span>
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
