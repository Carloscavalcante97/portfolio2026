"use client";

import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

// Editorial rows: big index + domain on the left, the story on the right
export function ProjectsSection(): React.JSX.Element {
  const { t } = useLanguage();
  const p = t.projects;

  return (
    <section id="projetos" className="scroll-mt-14 py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading label={p.label} heading={p.heading} />
        <p className="-mt-4 md:-mt-6 mb-14 max-w-2xl text-muted text-lg">{p.intro}</p>

        <div className="flex flex-col border-t border-line">
          {p.items.map((item, i) => (
            <article
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-b border-line"
            >
              <div className="md:col-span-4 flex md:flex-col gap-4 md:gap-3 items-baseline md:items-start">
                <span className="type-heavy text-muted/40" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow text-[11px]">{item.domain}</span>
              </div>

              <div className="md:col-span-8 flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="type-heavy text-foreground" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)", lineHeight: 0.95 }}>
                    {item.title}
                  </h3>
                  <p className="text-muted text-lg leading-relaxed max-w-2xl">{item.summary}</p>
                </div>

                <ul className="flex flex-col gap-2 max-w-2xl">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                      <span aria-hidden="true" className="font-mono text-cta-ink">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {item.metric && (
                  <div className="flex items-end gap-3">
                    <span className="type-heavy text-cta-ink" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}>
                      {item.metric.prefix}
                      {item.metric.value}
                      {item.metric.suffix}
                    </span>
                    <span className="font-mono text-xs text-muted pb-2">{item.metric.caption}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    {p.roleLabel}: <span className="text-foreground">{item.role}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
