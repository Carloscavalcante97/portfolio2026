import { Reveal } from "@/components/reveal";

export function SectionHeading({
  index,
  label,
  heading,
}: {
  index: string;
  label: string;
  heading: string;
}): React.JSX.Element {
  return (
    <div className="mb-12 md:mb-16 flex flex-col gap-3">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-cta-ink">{index}</span> / {label}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05]">
          {heading}
        </h2>
      </Reveal>
    </div>
  );
}
