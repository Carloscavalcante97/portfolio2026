// Content is always rendered visible. Scroll-triggered reveals were removed:
// jumping to a section from the nav left the viewport blank until the
// animation fired, which reads as broken to someone skimming quickly.
// The `delay` prop is kept so call sites stay unchanged.
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}): React.JSX.Element {
  return <div className={className}>{children}</div>;
}
