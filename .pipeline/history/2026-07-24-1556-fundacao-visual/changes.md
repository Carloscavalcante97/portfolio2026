# Changes

## Status
implemented

## What changed
- `src/app/globals.css` — Full rewrite: `@custom-variant dark` for class-based theming, `:root`/`.dark` token blocks, `@theme inline` mapping tokens to Tailwind utilities, `.glass` with `-webkit-backdrop-filter` and specular `::before` highlight, `::selection` in primary purple, grain overlay via `body::after` with URL-encoded SVG `feTurbulence` data-URI, smooth scroll, `body` theme transitions, `prefers-reduced-motion` override block.
- `src/app/layout.tsx` — Replaced `Geist_Mono` with `JetBrains_Mono` and added `Instrument_Serif`; updated `metadata`; added `lang="pt-BR"` and `suppressHydrationWarning` on `<html>`; wrapped body content in `ThemeProvider` (attribute="class", defaultTheme="dark", enableSystem=false); renders `<Header />` and `<WhatsAppButton />`.
- `src/app/page.tsx` — Full rewrite: removed scaffold content; renders 6 anchored `<section>` elements from `SECTIONS` array with `scroll-mt-14`; hero gets `min-h-svh`, rest get `min-h-[60svh]`; each shows its section label in `font-mono text-xs text-muted`.
- `src/components/header.tsx` — New server component: fixed glass header `h-14`, left-side name in `font-display`, right-side PT/EN static `aria-disabled` placeholder + `<ThemeToggle />`; border overridden to bottom-only via `border-0 border-b`.
- `src/components/theme-toggle.tsx` — New client component: `mounted` guard prevents hydration mismatch; toggles between sun (dark→light) and moon (light→dark) SVG icons; proper `aria-label` and `focus-visible` ring.
- `src/components/whatsapp-button.tsx` — New server component: fixed `bottom-6 right-6` anchor to `https://wa.me/5511947832280` with `target="_blank" rel="noopener noreferrer"`; `bg-cta` circle with WhatsApp official SVG path, custom colored shadow, `hover:scale-110` transition.

## What the Tester should focus on
- **First paint without JS**: `<html>` must have class `dark` and `getComputedStyle(document.body).backgroundColor` must be `rgb(10, 14, 20)`.
- **Theme toggle hydration**: no console hydration warning on load; toggle placeholder renders at the same size before mount.
- **Theme persistence**: after toggling and reloading, `localStorage.theme` key is present and the correct theme loads.
- **Smooth vs. reduced-motion**: `body` has `transition: background-color 300ms ease` in normal mode; under `prefers-reduced-motion: reduce` it must be `none`.
- **Grain non-blocking**: with `z-index: 9999` on `body::after`, confirm clicks still register on the WhatsApp button and theme toggle (`pointer-events: none` on the grain).
- **Tailwind utilities**: verify `text-primary`, `text-cta`, `text-secondary`, `text-muted`, `bg-background`, `text-foreground` resolve to the correct hex values.
- **Glass header**: `backdrop-filter` computed contains `blur` and `saturate`; `-webkit-backdrop-filter` present; only the bottom border is visible (not all four sides); `.glass::before` gradient line at the top.
- **Font loading**: no `<link>` to `fonts.googleapis.com` in the rendered HTML; computed font-family on body starts with Geist; a `font-display` element uses Instrument Serif; a `font-mono` element uses JetBrains Mono.
- **Scroll anchor compensation**: navigating to `/#contato` must not have the fixed header overlapping the section (`scroll-mt-14` = 3.5rem = h-14).
- **`::selection`**: selected text shows `background: #512BD4` and `color: #fff`.
- **PT/EN placeholder**: `aria-disabled="true"` present; clicking does nothing; no JS event attached.
- **WhatsApp button**: `position: fixed`, visible in all scroll positions, `href` is exactly `https://wa.me/5511947832280`, `rel` contains `noopener`.

## Notes / deviations
- The spec says the header border should be "bottom only" but `.glass` applies `border: 1px solid` on all sides. Resolved by adding `border-0 border-b` utility classes on the `<header>` element, which overrides the `.glass` all-sides border to bottom-only while keeping the specular `::before` gradient at the top. This matches the spec's stated "obrigatório" requirement.
- The `--secondary` (`#f89820`) warning comment is included in globals.css as the spec requires, noting it is decorative-only in light theme due to ~2:1 contrast ratio against `#f8fafc`.
- `Instrument_Serif` style array `["normal", "italic"]` is typed as `string[]` by next/font — build passes cleanly despite TypeScript's strict mode.

## Ponytail
Um fix real, zero gordura removida (o diff já estava mínimo):
- `globals.css`: `.glass`/`.glass::before` movidos para dentro de `@layer components`. Estavam sem layer, e no Tailwind v4 CSS sem layer vence os utilities — o `border-0 border-b` do header perdia para o `border: 1px solid` do `.glass`, quebrando o requisito de borda só na base. Com o layer, utilities voltam a ganhar. Build re-verificado após o fix.
