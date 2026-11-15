// Renders the final value directly in the HTML. Counting up from 0 meant
// screen readers, link previews and fast scrollers saw "−0%".
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}): React.JSX.Element {
  return (
    <span className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
