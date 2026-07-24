"use client";

// No mounted guard needed: server and client both start with lang="pt",
// so PT is active and EN is muted on first render in both environments.

import { useLanguage } from "@/components/language-provider";

export function LanguageToggle(): React.JSX.Element {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        aria-label="Português"
        className={`font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
          lang === "pt" ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        PT
      </button>
      <span className="text-muted font-mono text-xs">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={`font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
          lang === "en" ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}
