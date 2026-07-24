# Review: Fundação visual — temas, tokens, fontes, shell, grain

## Verdict: SHIP

## Findings
- [minor] `.pipeline/test-results.md:72-75` — Three acceptance criteria (AC 2 computed background, AC 3 hydration console, AC 4 localStorage persistence) are NOT VERIFIED and need a browser. The justification holds: no test framework or browser automation is installed and adding one would violate the no-new-deps rule. Do one manual browser pass (load, toggle, reload, check console) before merging; the SSR HTML and inline next-themes script the tester verified make failure unlikely.
- [minor] `src/components/header.tsx:12-21` — The PT/EN placeholder is a keyboard-focusable `<button>` that does nothing (`aria-disabled="true"`, no handler). An inert control in the tab order is a mild accessibility wart, but the spec mandates this exact markup, so it is conformant. Revisit when i18n becomes functional.
- [nit] `src/components/header.tsx:5` — `border-[var(--glass-border)]` is redundant; `.glass` already sets that border-color. Harmless.
- [nit] `src/components/theme-toggle.tsx:13-25` — Pre-mount placeholder uses `disabled` + `tabIndex={-1}`, so the toggle is briefly unreachable by keyboard until hydration. Negligible window; the identical `size-8` box correctly prevents mismatch and layout shift.

## Summary
The diff implements the spec faithfully and completely: class-based dark theming with `@custom-variant`, correct `:root`/`.dark` token blocks and `@theme inline` mapping, all three fonts via `next/font` (Instrument Serif correctly pinned to weight 400), `suppressHydrationWarning` + `lang="pt-BR"`, the glass header with bottom-only border (the `@layer components` fix is the right mechanism — unlayered CSS would have beaten the `border-0 border-b` utilities in Tailwind v4), URL-encoded feTurbulence grain with `pointer-events: none`, `prefers-reduced-motion` overrides, and the six anchored sections with `scroll-mt-14` matching the `h-14` header. CLAUDE.md rules are respected: RSC by default with `"use client"` only in the theme toggle, zero new dependencies, custom shadow instead of Tailwind defaults, the `#f89820` light-theme contrast warning is in the CSS, and everything out of scope (3D, Framer Motion, real content) stayed out. Test coverage is honest about its three browser-only gaps; nothing blocks merge beyond a quick manual smoke check.
