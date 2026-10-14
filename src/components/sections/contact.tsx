"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { LINKS } from "@/content/site";

// Inline SVG icons — thin stroke, Lucide-style, no icon lib
function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function ContactSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="contato" className="scroll-mt-14 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 mb-12">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-cta-ink">06</span> / {t.contact.label}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display text-foreground leading-[1.02]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {t.contact.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-muted text-lg">{t.contact.sub}</p>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={LINKS.whatsapp} external variant="primary">
              <WhatsappIcon />
              {t.contact.whatsapp}
            </MagneticButton>
            {/* mailto does not use external/target blank */}
            <MagneticButton href={LINKS.email} variant="ghost">
              <MailIcon />
              {t.contact.email}
            </MagneticButton>
            <MagneticButton href={LINKS.github} external variant="ghost">
              <GithubIcon />
              {t.contact.github}
            </MagneticButton>
            <MagneticButton href={LINKS.linkedin} external variant="ghost">
              <LinkedinIcon />
              {t.contact.linkedin}
            </MagneticButton>
          </div>
        </Reveal>

        <footer className="mt-24 border-t border-[var(--glass-border)] py-8 font-mono text-xs text-muted flex flex-wrap gap-2 justify-between">
          <span>Antônio Cavalcante · {new Date().getFullYear()}</span>
          <span>{t.footer.madeWith}</span>
        </footer>
      </div>
    </section>
  );
}
