export function SectionHeading({
  label,
  heading,
}: {
  label: string;
  heading: string;
}): React.JSX.Element {
  return (
    <div className="mb-12 md:mb-16 flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
      <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05]">{heading}</h2>
    </div>
  );
}
