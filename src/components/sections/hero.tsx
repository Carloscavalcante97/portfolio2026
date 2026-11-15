"use client";

import Image from "next/image";
import { CountUp } from "@/components/count-up";
import { MagneticButton } from "@/components/magnetic-button";
import { useLanguage } from "@/components/language-provider";
import { LINKS } from "@/content/site";

export function HeroSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative scroll-mt-14 pt-28 md:pt-32 pb-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end">
          <div className="md:col-span-8 flex flex-col items-start gap-8">
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="inline-flex size-1.5 rounded-full bg-cta-ink" />
              {t.hero.status}
            </span>

            <h1 className="text-foreground" style={{ fontSize: "clamp(4.5rem, 10.5vw, 10rem)" }}>
              <span className="type-heavy block">Antônio</span>
              <span className="type-accent block text-cta-ink leading-[0.9] -mt-[0.04em]">Cavalcante</span>
            </h1>

            <div className="flex flex-col gap-3 max-w-xl">
              <p className="text-xl md:text-2xl text-foreground">{t.hero.title}</p>
              <p className="text-muted text-base md:text-lg leading-relaxed">{t.hero.sub}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href={LINKS.email} variant="primary">
                {t.hero.ctaTalk}
              </MagneticButton>
              <MagneticButton href="#projetos" variant="ghost">
                {t.hero.ctaProjects}
              </MagneticButton>
            </div>
          </div>

          {/* Editorial photo: small, captioned, no frame */}
          <figure className="md:col-span-4 relative w-full max-w-[280px] md:max-w-[320px] md:ml-auto">
            <Image
              src="/antonio.jpg"
              alt={t.hero.photoAlt}
              width={800}
              height={1000}
              priority
              sizes="(min-width: 768px) 320px, 280px"
              className="aspect-[4/5] w-full object-cover rounded-[3px]"
            />
            <figcaption className="eyebrow text-[11px] mt-3 flex justify-between gap-4">
              <span>{t.hero.photoCaption}</span>
              <span className="text-cta-ink">Souv</span>
            </figcaption>
          </figure>
        </div>

        {/* Metrics — giant condensed numbers, hairline separated */}
        <dl className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 border-t border-line">
          {t.hero.metrics.map((m, i) => (
            <div
              key={m.caption}
              className={`flex flex-col-reverse justify-end gap-3 pt-6 pb-2 pr-4 border-line ${
                i % 2 === 1 ? "pl-4 border-l" : ""
              } ${i > 0 ? "md:pl-6 md:border-l" : ""}`}
            >
              <dt className="font-mono text-xs text-muted leading-snug max-w-[26ch]">{m.caption}</dt>
              <dd className="type-heavy text-foreground" style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}>
                <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
