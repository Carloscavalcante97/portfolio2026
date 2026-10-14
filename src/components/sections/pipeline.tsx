"use client";

import { CountUp } from "@/components/count-up";
import { PipelineTerminal } from "@/components/pipeline-terminal";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { LINKS } from "@/content/site";

// Arrow SVG — inline, thin stroke, Lucide-style
function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export function PipelineSection(): React.JSX.Element {
  const { t } = useLanguage();
  const p = t.pipeline;

  return (
    <section id="pipeline" className="scroll-mt-14 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="03" label={p.label} heading={p.heading} />

        {/* Featured panel: the pitch on the left, the live run on the right */}
        <Reveal>
          <div className="glass rounded-3xl p-7 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-3xl md:text-4xl text-foreground leading-tight">{p.title}</h3>
                <p className="text-muted leading-relaxed">{p.body}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {p.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                    <span aria-hidden="true" className="font-mono text-primary-ink">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-end gap-3">
                  <CountUp
                    to={p.metric.value}
                    prefix={p.metric.prefix}
                    suffix={p.metric.suffix}
                    className="font-display text-7xl md:text-8xl leading-none text-primary-ink"
                  />
                  <span className="font-mono text-sm text-muted pb-2">{p.metric.caption}</span>
                </div>
                <a
                  href={LINKS.pipelineRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-cta-ink hover:underline inline-flex items-center gap-1.5 pb-2"
                >
                  {p.linkLabel}
                  <ArrowIcon />
                </a>
              </div>
            </div>
            <div className="md:col-span-6">
              <PipelineTerminal command={p.terminal.command} done={p.terminal.done} />
            </div>
          </div>
        </Reveal>

        {/* Open-source list — editorial rows, not a card grid */}
        <Reveal delay={0.08}>
          <h3 className="mt-16 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{p.ossHeading}</h3>
        </Reveal>
        <div className="flex flex-col border-t border-[var(--glass-border)]">
          {p.oss.map((repo, i) => (
            <Reveal key={repo.url} delay={i * 0.06}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-5 border-b border-[var(--glass-border)] transition-colors hover:bg-[var(--glass-bg)]"
              >
                <span className="md:col-span-4 font-display text-2xl text-foreground inline-flex items-center gap-2">
                  {repo.name}
                  <span className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </span>
                <span className="md:col-span-5 text-muted text-sm leading-relaxed">{repo.pitch}</span>
                <span className="md:col-span-3 flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                  {repo.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-secondary-ink">
                      {tag}
                    </span>
                  ))}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-cta-ink hover:underline"
          >
            {p.all}
            <ArrowIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
