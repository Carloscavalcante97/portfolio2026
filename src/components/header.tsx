import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function Header(): React.JSX.Element {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 bg-background/85 backdrop-blur-md border-b border-line flex items-center justify-between px-6">
      <a href="#hero" className="leading-none text-foreground">
        <span className="type-heavy text-lg">Antônio</span>{" "}
        <span className="type-accent text-lg">Cavalcante</span>
      </a>

      <div className="flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
