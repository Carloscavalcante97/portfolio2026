"use client";

import Image from "next/image";
import { CountUp } from "@/components/count-up";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { LINKS } from "@/content/site";

export function HeroSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative scroll-mt-14 overflow-hidden pt-28 md:pt-36 pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          <div className="md:col-span-7 flex flex-col items-start gap-6">
            <Reveal>
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs text-muted">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-cta-ink opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-cta-ink" />
                </span>
                {t.hero.status}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="font-display text-foreground leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
              >
                Antônio
                <br />
                <span className="italic text-foreground/90">Cavalcante</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex flex-col gap-3 max-w-xl">
                <p className="text-xl md:text-2xl text-foreground">{t.hero.title}</p>
                <p className="text-muted text-base md:text-lg leading-relaxed">{t.hero.sub}</p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href={LINKS.whatsapp} external variant="primary">
                  {t.hero.ctaTalk}
                </MagneticButton>
                <MagneticButton href="#projetos" variant="ghost">
                  {t.hero.ctaProjects}
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.32} className="md:col-span-5">
            {/* Portrait with an offset outline frame and a soft brand glow behind it */}
            <div className="relative mx-auto md:ml-auto md:mr-0 w-full max-w-[280px] md:max-w-[380px]">
              <div
                aria-hidden="true"
                className="absolute -inset-10 rounded-full bg-primary/30 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-[var(--glass-border)]"
              />
              <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem] p-1.5">
                <Image
                  src="/antonio.jpg"
                  alt={t.hero.photoAlt}
                  width={800}
                  height={1000}
                  priority
                  sizes="(min-width: 768px) 380px, 280px"
                  className="size-full rounded-[1.6rem] object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Metrics strip — hairline separated, no cards */}
        <Reveal delay={0.4}>
          <dl className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-[var(--glass-border)]">
            {t.hero.metrics.map((m, i) => (
              <div
                key={m.caption}
                className={`flex flex-col-reverse justify-end gap-2 pt-6 pb-2 pr-4 border-[var(--glass-border)] ${
                  i % 2 === 1 ? "pl-4 border-l" : ""
                } ${i > 0 ? "md:pl-6 md:border-l" : ""}`}
              >
                <dt className="font-mono text-xs text-muted leading-snug max-w-[26ch]">{m.caption}</dt>
                <dd className="font-display text-5xl md:text-6xl leading-none text-foreground">
                  <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
