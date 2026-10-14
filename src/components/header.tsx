import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function Header(): React.JSX.Element {
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 h-14 border-0 border-b border-[var(--glass-border)] flex items-center justify-between px-6">
      <span className="font-display text-lg text-foreground">
        Antônio Cavalcante
      </span>

      <div className="flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
