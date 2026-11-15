"use client";

import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

// Mirrors "No código": area on the left, the story on the right
export function BeyondSection(): React.JSX.Element {
  const { t } = useLanguage();
  const b = t.beyond;

  return (
    <section id="alem" className="scroll-mt-14 py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading label={b.label} heading={b.heading} />
        <p className="-mt-4 md:-mt-6 mb-14 max-w-2xl text-muted text-lg">{b.intro}</p>

        <div className="flex flex-col border-t border-line">
          {b.items.map((item) => (
            <article
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 border-b border-line"
            >
              <span className="md:col-span-4 eyebrow text-cta-ink pt-2">{item.area}</span>
              <div className="md:col-span-8 flex flex-col gap-3">
                <h3 className="type-heavy text-foreground" style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)", lineHeight: 0.95 }}>
                  {item.title}
                </h3>
                <p className="text-muted text-lg leading-relaxed max-w-2xl">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
