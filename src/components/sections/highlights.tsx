"use client";

import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
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

export function HighlightsSection(): React.JSX.Element {
  const { t } = useLanguage();
  const h = t.highlights;

  return (
    <section id="destaques" className="scroll-mt-14 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Label + heading */}
        <div className="mb-12 flex flex-col gap-4">
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              {h.heading}
            </h2>
          </Reveal>
        </div>

        {/* Asymmetric grid: pipeline spans 7 cols + 2 rows; others fill naturally */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Pipeline card — featured, col-span-7 row-span-2 */}
          <Reveal delay={0} className="md:col-span-7 md:row-span-2">
            <div className="glass rounded-xl p-6 md:p-8 h-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl text-foreground">{h.pipeline.title}</h3>
                <p className="text-muted">{h.pipeline.body}</p>
              </div>

              <div className="flex items-end gap-3">
                <CountUp
                  to={75}
                  prefix="&#x2212;"
                  suffix="%"
                  className="font-display text-7xl md:text-8xl text-primary leading-none"
                />
                <span className="font-mono text-sm text-muted pb-2">
                  {h.pipeline.metricCaption}
                </span>
              </div>

              <a
                href={LINKS.pipelineRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-cta-ink hover:underline inline-flex items-center gap-1.5 mt-auto"
              >
                {h.pipeline.linkLabel}
                <ArrowIcon />
              </a>
            </div>
          </Reveal>

          {/* Quality card */}
          <Reveal delay={0.08} className="md:col-span-5">
            <div className="glass rounded-xl p-6 md:p-8 h-full flex flex-col gap-2">
              <h3 className="font-display text-2xl text-foreground">{h.quality.title}</h3>
              <p className="text-muted">{h.quality.body}</p>
            </div>
          </Reveal>

          {/* Events card */}
          <Reveal delay={0.16} className="md:col-span-5">
            <div className="glass rounded-xl p-6 md:p-8 h-full flex flex-col gap-2">
              <h3 className="font-display text-2xl text-foreground">{h.events.title}</h3>
              <p className="text-muted">{h.events.body}</p>
            </div>
          </Reveal>

          {/* .NET card — third, flows to bottom-right naturally */}
          <Reveal delay={0.24} className="md:col-span-5">
            <div className="glass rounded-xl p-6 md:p-8 h-full flex flex-col gap-2">
              <h3 className="font-display text-2xl text-foreground">{h.dotnet.title}</h3>
              <p className="text-muted">{h.dotnet.body}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
