"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { LINKS } from "@/content/site";

export function HeroSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-svh scroll-mt-14 overflow-hidden flex items-end md:items-center"
    >

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 md:pb-0">
        <div className="md:ml-[8%] flex flex-col items-start gap-6">

          <Reveal delay={0.08}>
            <h1
              className="font-display text-foreground leading-[0.95]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              Antonio
              <br />
              Cavalcante
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="font-mono text-sm md:text-base text-muted max-w-xl">
              {t.hero.title}
            </p>
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
      </div>
    </section>
  );
}
