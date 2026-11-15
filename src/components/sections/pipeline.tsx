"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { PipelineTerminal } from "@/components/pipeline-terminal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { LINKS } from "@/content/site";

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export function PipelineSection(): React.JSX.Element {
  const { t } = useLanguage();
  const p = t.pipeline;

  return (
    <section id="pipeline" className="scroll-mt-14">
      {/* Full-bleed band: one subject per screen */}
      <div className="bg-surface border-y border-line py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading label={p.label} heading={p.heading} />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6 flex flex-col gap-7">
              <div className="flex items-end gap-4">
                <span className="type-heavy text-cta-ink" style={{ fontSize: "clamp(6rem, 16vw, 13rem)" }}>
                  {p.metric.prefix}
                  {p.metric.value}
                  {p.metric.suffix}
                </span>
                <span className="font-mono text-sm text-muted pb-4 max-w-[12ch]">{p.metric.caption}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="type-heavy text-foreground" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", lineHeight: 0.95 }}>
                  {p.title}
                </h3>
                <p className="text-muted text-lg leading-relaxed">{p.body}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {p.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                    <span aria-hidden="true" className="font-mono text-cta-ink">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div>
                <MagneticButton href={LINKS.pipelineRepo} external variant="primary">
                  {p.linkLabel}
                  <ArrowIcon />
                </MagneticButton>
              </div>
            </div>
            <div className="md:col-span-6 md:sticky md:top-24">
              <PipelineTerminal command={p.terminal.command} done={p.terminal.done} />
            </div>
          </div>
        </div>
      </div>

      {/* Open-source list — editorial rows */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <h3 className="eyebrow mb-4">{p.ossHeading}</h3>
        <div className="flex flex-col border-t border-line">
          {p.oss.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 border-b border-line transition-colors hover:text-cta-ink"
            >
              <span className="md:col-span-4 type-heavy text-3xl inline-flex items-center gap-2">
                {repo.name}
                <span className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </span>
              <span className="md:col-span-5 text-muted leading-relaxed">{repo.pitch}</span>
              <span className="md:col-span-3 flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                {repo.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </span>
            </a>
          ))}
        </div>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-cta-ink hover:underline"
        >
          {p.all}
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
