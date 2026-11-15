import type { Split } from "@/content/site";

// Two-line display heading: heavy condensed uppercase, then a serif italic line
export function SectionHeading({
  label,
  heading,
}: {
  label: string;
  heading: Split;
}): React.JSX.Element {
  return (
    <div className="mb-12 md:mb-16 flex flex-col gap-5">
      <span className="eyebrow">{label}</span>
      <h2 className="text-foreground leading-[0.88]" style={{ fontSize: "clamp(3.25rem, 9vw, 8rem)" }}>
        <span className="type-heavy block">{heading[0]}</span>
        <span className="type-accent block text-cta-ink -mt-[0.06em]">{heading[1]}</span>
      </h2>
    </div>
  );
}
