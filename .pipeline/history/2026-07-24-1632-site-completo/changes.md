# Changes

## Status
implemented

## What changed

### Modified
- `src/app/globals.css` — added `--secondary-ink` token in `:root` (#b45309) and `.dark` (#f89820), plus `--color-secondary-ink` in `@theme inline`
- `src/app/layout.tsx` — wrapped children in `<LanguageProvider>`; expanded metadata with full `openGraph` block
- `src/app/page.tsx` — replaced `SECTIONS` map with the 6 real section components (still a server component, no `"use client"`)
- `src/components/header.tsx` — replaced static PT/EN placeholder button with `<LanguageToggle />`

### Created
- `src/content/site.ts` — `Lang` type, `LINKS`, `STACK_BADGES`, `Project`/`Highlight`/`SiteContent` interfaces, full `site` PT+EN dictionary with all literal copy from spec
- `src/components/language-provider.tsx` — React context; `useState("pt")` initial, `useEffect` for localStorage restore and `document.documentElement.lang` sync; try/catch on all localStorage access
- `src/components/language-toggle.tsx` — two `<button>` with `aria-pressed`, `aria-label`, font-mono xs; active = `text-foreground`, inactive = `text-muted hover:text-foreground`
- `src/components/reveal.tsx` — `motion.div` fade+translate in viewport; `useReducedMotion` disables initial animation entirely (`initial={false}`)
- `src/components/magnetic-button.tsx` — `motion.a` with ±8px spring magnetic effect on pointer; static `<a>` fallback under reduced-motion; `primary` and `ghost` variants
- `src/components/tilt-card.tsx` — `motion.div` with spring rotateX/Y clamped to ±3°; specular highlight via `--mx`/`--my` CSS vars and `radial-gradient`; reduced-motion skips tilt
- `src/components/count-up.tsx` — `useInView` + framer-motion `animate()` from 0 to target; `.stop()` cleanup; reduced-motion renders final value immediately
- `src/components/hero-canvas.tsx` — client wrapper with `next/dynamic ssr:false`; gradient fallback always in DOM; `useInView` drives `frameloop` prop; reduced-motion skips dynamic import entirely
- `src/components/hero-scene.tsx` — R3F `Canvas` with `ParticleField`; 2500-particle `BufferGeometry` with custom `ShaderMaterial` (vertex sine-wave displacement, fragment soft-circle); mouse parallax + scroll listeners with cleanup; `uOpacity` 0.35 light / 0.6 dark; `AdditiveBlending`
- `src/components/sections/hero.tsx` — `#hero` section with `HeroCanvas`, asymmetric left layout, `clamp(3.5rem,10vw,8rem)` h1, 2 `MagneticButton` CTAs, staggered `Reveal`s
- `src/components/sections/about.tsx` — 12-col grid; 7-col text block + 4-col badge cluster; all 15 `STACK_BADGES`
- `src/components/sections/highlights.tsx` — asymmetric 12-col grid; pipeline card col-span-7 row-span-2 with `CountUp` (prefix `&#x2212;`, suffix `%`); 3 remaining cards col-span-5; GitHub link with arrow SVG
- `src/components/sections/projects.tsx` — 6 cards with spans `[7,5,5,7,7,5]`; each card is a full `<TiltCard>` wrapping an `<a>` with repo link; tags in `text-secondary-ink`
- `src/components/sections/skills.tsx` — editorial top-5 list with `01`–`05` mono indices and display-font names; 12 rest badges below
- `src/components/sections/contact.tsx` — 4 `MagneticButton`s (WhatsApp `external`, mailto without `external`, GitHub `external`, LinkedIn `external`); inline SVG icons; `<footer>` with `new Date().getFullYear()`

## What the Tester should focus on

- **Hydration / i18n**: verify no hydration mismatch warning in console across PT default, EN persisted via localStorage, dark/light theme combinations. Verify flash PT→EN is present but not an error.
- **localStorage edge cases**: blocked localStorage (Safari private) — toggle must work in session without console errors. Invalid `localStorage.lang` value → site loads in PT without error.
- **Reduced-motion**: with `prefers-reduced-motion: reduce` emulated — (a) no `<canvas>` in DOM, (b) no three chunk in Network, (c) count-up shows `−75%` immediately, (d) all content visible (no opacity-0 stuck elements), (e) magnetic buttons don't move on hover.
- **Canvas behavior**: frameloop switches to `"never"` when hero scrolls out of view (check GPU usage / rAF stops); mouse rotation is perceptible but subtle; particles fade on scroll; purple `#512BD4` dominates in both themes; gradient fallback visible behind canvas and when WebGL disabled.
- **Count-up**: `−75%` uses U+2212 (not ASCII hyphen); animates once on enter, stays at 75 after; does not show `0` permanently after language switch remount.
- **Projects grid**: `md:col-span-7` and `md:col-span-5` classes applied per `[7,5,5,7,7,5]` pattern — verify in devtools that no 3-equal-column layout appears at ≥768px.
- **Contact hrefs**: exactly `https://wa.me/5511947832280`, `mailto:antonio.developer@icloud.com`, `https://github.com/Carloscavalcante97`, `https://www.linkedin.com/in/SEU-LINKEDIN` — and `mailto:` anchor has no `target="_blank"`.
- **TiltCard**: rotateX/Y ≤3° at pointer extremes; `--mx`/`--my` CSS vars update on move; rotation returns to 0 on leave; no tilt under reduced-motion.
- **Magnetic button**: pointer move yields translate ≤8px per axis; spring returns to 0 on leave; no motion under reduced-motion.
- **`aria-pressed`** on language toggle buttons reflects active state and changes on click; keyboard Tab+Enter switches language.
- **`text-secondary-ink`** on project tags: computed color `#b45309` in light, `#f89820` in dark — verify AA contrast.
- **OG tags**: `<head>` contains `og:title`, `og:description`, `og:type=website`, `og:locale=pt_BR`, `og:site_name`.
- **No emoji** anywhere in rendered output.
- **`"use client"`** absent from `page.tsx`, `layout.tsx`, `header.tsx`, `site.ts`.
- **Overflow at 360px**: hero h1 and contact heading must not overflow horizontally at narrow viewport in both languages.

## Notes / deviations

- Tailwind v4 dynamic class generation: `md:col-span-7` and `md:col-span-5` are used as string literals in the JSX class attribute inside the `SPANS` array lookup (e.g. `` `md:col-span-${SPANS[i]}` ``). Tailwind v4 with Turbopack scans template literals so these classes should be detected. If the Tester finds the grid is not applying spans correctly, the fix is to switch to a static lookup object: `{ 7: "md:col-span-7", 5: "md:col-span-5" }[SPANS[i]]`.
- The `.dark` variant in Tailwind v4 is set up via `@custom-variant dark` in globals.css — existing pattern, no change needed.
- `bufferAttribute` `args` format follows R3F v9 API (`[TypedArray, itemSize]`).
- Footer year uses `new Date().getFullYear()` at render time (static generation) — value will be correct and is not hardcoded.
- LinkedIn URL left as `https://www.linkedin.com/in/SEU-LINKEDIN` per spec decision with TODO comment in `site.ts`.

## Ponytail
Dois fixes, nenhuma gordura estrutural (componentes já mínimos, 1300 linhas totais):
- `sections/projects.tsx`: classe dinâmica `md:col-span-${SPANS[i]}` trocada por ternário estático. O scanner do Tailwind v4 não resolve template literals — funcionava por acidente (as classes existem literais em about/highlights), mas quebraria silencioso se essas seções mudassem.
- `hero-scene.tsx`: removido `useThree()`/`void camera` morto (existia só para calar o TS) e o import correspondente.
Build re-verificado verde após os fixes.

## Fix cycle

| Finding | File:line | What changed |
|---|---|---|
| [major] Specular highlight permanently invisible — `pointer-events-none` element can't receive its own `:hover` | `src/components/tilt-card.tsx:40,48` | Added `group` class to the outer `motion.div`; changed overlay from `hover:opacity-[0.35]` to `group-hover:opacity-[0.35]` so the card's pointer events fire the state change |
| [minor] Missing `transformPerspective` — rotateX/Y rendered as flat orthographic squash | `src/components/tilt-card.tsx:41` | Added `transformPerspective: 800` to the motion style object; one-liner alongside the existing tilt values |
| [major] CountUp flashes 75→0→75 — initial render showed final value before `useInView` fired | `src/components/count-up.tsx:39-43` | When motion is allowed, initial rendered content is `{prefix}0{suffix}`; reduced-motion still shows `{prefix}{to}{suffix}` immediately |
| [minor] `md:col-start-8` collapsed third small card into right column, removing intentional asymmetry | `src/components/sections/highlights.tsx:98` | Removed `md:col-start-8` from the .NET card's Reveal className; card now flows naturally in the grid |

Build confirmed green after all four fixes.

## Ponytail (fix cycle)
Nada a simplificar — os 4 fixes são pontuais e mínimos (group-hover + perspective no tilt-card, 0 inicial no count-up, remoção do col-start-8). Build verde.
