"use client";

import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

// Editorial rows, same rhythm as Experience: area on the left, story on the right
export function BeyondSection(): React.JSX.Element {
  const { t } = useLanguage();
  const b = t.beyond;

  return (
    <section id="alem" className="scroll-mt-14 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label={b.label} heading={b.heading} />
        <p className="-mt-6 md:-mt-10 mb-12 max-w-2xl text-muted text-lg">{b.intro}</p>

        <div className="flex flex-col border-t border-[var(--glass-border)]">
          {b.items.map((item) => (
            <article
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-7 border-b border-[var(--glass-border)]"
            >
              <span className="md:col-span-3 font-mono text-xs uppercase tracking-[0.18em] text-muted pt-1.5">
                {item.area}
              </span>
              <div className="md:col-span-9 flex flex-col gap-2">
                <h3 className="font-display text-2xl md:text-3xl text-foreground leading-snug">{item.title}</h3>
                <p className="text-muted leading-relaxed max-w-3xl">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
