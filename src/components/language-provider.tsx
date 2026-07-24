"use client";

// i18n decision: the server always renders PT (initial state = "pt").
// After hydration, a useEffect reads localStorage and switches to EN if needed.
// A brief PT→EN flash on first paint for EN users is acceptable for a static
// site — it is the only way to avoid hydration mismatch without /en routes.

import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, type SiteContent, site } from "@/content/site";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: SiteContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  // Always start with "pt" — same as the server render. Never read localStorage
  // here to avoid hydration mismatch.
  const [lang, setLangState] = useState<Lang>("pt");

  // On mount: restore persisted preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "pt" || stored === "en") {
        setLangState(stored);
      }
    } catch {
      // localStorage blocked (Safari private / cookies off) — stay in PT
    }
  }, []);

  // Keep <html lang> in sync
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      // localStorage blocked — toggle works in session, just won't persist
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: site[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
