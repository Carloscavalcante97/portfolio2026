import { MARQUEE } from "@/content/site";

// Pure CSS loop: the list is rendered twice and the track slides by -50%.
// Reduced motion stops the animation (see .marquee-track in globals.css).
export function Marquee(): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-[var(--glass-border)] py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="marquee-track flex w-max">
        {[...MARQUEE, ...MARQUEE].map((name, i) => (
          <span key={i} className="font-mono text-sm text-muted whitespace-nowrap flex items-center gap-10 pr-10">
            {name}
            <span className="size-1 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
