"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

const IDS = ["hero", "about", "projetos", "pipeline", "experiencia", "skills", "contato"] as const;

export function SectionNav(): React.JSX.Element {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("hero");

  const items = [
    { id: "hero", label: t.hero.label },
    { id: "about", label: t.about.label },
    { id: "projetos", label: t.projects.label },
    { id: "pipeline", label: t.pipeline.label },
    { id: "experiencia", label: t.experience.label },
    { id: "skills", label: t.skills.label },
    { id: "contato", label: t.contact.label },
  ];

  useEffect(() => {
    // Center-band scrollspy: a section is active while it crosses mid-viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const id of IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={t.hero.label === "Início" ? "Seções" : "Sections"}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1"
    >
      {items.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center justify-end gap-2.5 py-1.5"
          >
            <span
              className={`font-mono text-[11px] transition-opacity duration-200 ${
                isActive
                  ? "opacity-100 text-foreground"
                  : "opacity-0 group-hover:opacity-100 text-muted"
              }`}
            >
              {label}
            </span>
            <span
              className={`rounded-full transition-all duration-200 ${
                isActive
                  ? "size-2 bg-primary"
                  : "size-1.5 bg-muted/40 group-hover:bg-muted"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
