"use client";

import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { useLanguage } from "@/components/language-provider";

// Asymmetric col-spans: [7,5, 5,7, 7,5] — two rows of 7+5, never 3 equal cols
const SPANS = [7, 5, 5, 7, 7, 5] as const;

// Arrow SVG for card corner
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

export function ProjectsSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="projetos" className="scroll-mt-14 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4">
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              {t.projects.heading}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {t.projects.items.map((project, i) => (
            <Reveal
              key={project.url}
              delay={i * 0.06}
              className={SPANS[i] === 7 ? "md:col-span-7" : "md:col-span-5"}
            >
              <TiltCard className="p-6 h-full">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-3 h-full"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-xl text-foreground">
                      {project.name}
                    </span>
                    <span className="text-muted shrink-0 mt-1">
                      <ArrowIcon />
                    </span>
                  </div>
                  <p className="text-muted text-sm flex-1">{project.pitch}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-secondary-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
