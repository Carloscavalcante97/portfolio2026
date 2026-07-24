# Test Results

## Status
PASS (all statically-verifiable criteria pass; browser-only criteria marked NOT VERIFIED)

## Test command

```
# Build
pnpm build

# Serve and curl
pnpm next start -p 3999 &
curl -s http://localhost:3999/

# Static source analysis (grep, node -e)
# CSS analysis (.next/static/chunks/2vql4w3ig5s08.css, *.js chunks)
```

## Tests added

No test framework exists in the project and the spec explicitly states "No new frameworks de teste". Verification was performed via:

- `pnpm build` (TypeScript compiler + Next.js static generation)
- `curl` against a running `next start` production server on port 3999
- Python3 inline scripts for HTML parsing and pattern matching
- `grep` on source files and compiled `.next/` artifacts

## Coverage

| Spec item (criterion / edge case) | Test | Result |
|---|---|---|
| AC 1 — `npm run build` passes; no new deps in package.json | `pnpm build` succeeded without errors; `package.json` deps compared against allowed list | PASS |
| AC 2 — 6 sections with correct ids, all with `scroll-mt-14` | SSR HTML contains all 6 ids (`hero`,`about`,`destaques`,`projetos`,`skills`,`contato`); `scroll-mt-14` appears 6 times | PASS |
| AC 3 — SSR HTML in PT (not EN) | `Full-stack Engineer — backend em C#, Java e NestJS` present; `backend in C#` absent | PASS |
| AC 4 — h1 contains "Antonio Cavalcante"; `font-display`; `clamp(3.5rem, 10vw, 8rem)` | h1 present with `font-display` class and `font-size:clamp(3.5rem, 10vw, 8rem)` inline style; computed size at 1440px NOT VERIFIED (manual) | PASS (static); NOT VERIFIED (1440px compute) |
| AC 5 — Two CTAs: `href="https://wa.me/5511947832280"` with `target="_blank"` + `rel` noopener; `href="#projetos"` without blank target | Both anchors found in hero with correct attributes; `#projetos` has no `target="_blank"` | PASS |
| AC 6 — Magnetic button pointer move ≤8px; reduced-motion no transform | NOT VERIFIED (manual — requires browser pointer events) | NOT VERIFIED (manual) |
| AC 7 — No `<canvas>` in SSR HTML; after hydration canvas inside `aria-hidden` wrapper with `pointer-events: none` | SSR HTML: no `<canvas>`; `aria-hidden="true"` + `pointer-events-none` wrapper present in hero HTML; canvas mount after hydration NOT VERIFIED (manual) | PASS (SSR); NOT VERIFIED (post-hydration) |
| AC 8 — Mouse parallax; scroll fade; purple `#512BD4` dominant | NOT VERIFIED (manual — requires browser rendering) | NOT VERIFIED (manual) |
| AC 9 — `prefers-reduced-motion`: no `<canvas>`, no THREE chunk downloaded | Source: `{!reduced && <HeroScene />}` — dynamic import never fires under reduced; THREE chunk (`1pgyeb9w9iivg.js`) not in initial HTML; no-canvas with reduced motion NOT VERIFIED (manual browser emulation) | PASS (source/static); NOT VERIFIED (network tab) |
| AC 10 — Gradient fallback always in DOM even with canvas active | Source: gradient `<div>` is unconditional sibling of `{!reduced && <HeroScene />}`; `radial-gradient(ellipse 60% 50%...` present in SSR HTML | PASS |
| AC 11 — i18n toggle: PT→EN switches all copy, localStorage, html lang, aria-pressed | NOT VERIFIED (manual — requires browser click interaction) | NOT VERIFIED (manual) |
| AC 12 — Invalid `localStorage.lang` → PT with no error | Source: `if (stored === "pt" || stored === "en")` guard before applying; all localStorage access in try/catch | PASS (source) |
| AC 13 — No hydration mismatch warning | NOT VERIFIED (manual — requires console inspection in browser) | NOT VERIFIED (manual) |
| AC 14 — `aria-pressed` on both language toggle buttons; keyboard operable | SSR HTML shows `aria-pressed="true"` and `aria-pressed="false"` on the two buttons; keyboard operability NOT VERIFIED (manual) | PASS (aria-pressed); NOT VERIFIED (keyboard) |
| AC 15 — About: exact PT body text; 15 STACK_BADGES in mono | PT body `Sou engenheiro full-stack...` present; 15 `font-mono text-xs px-2.5` spans in `#about` section | PASS |
| AC 16 — Highlights: 4 glass cards; pipeline `md:col-span-7 md:row-span-2`; not uniform grid | `md:col-span-7`, `md:row-span-2`, `md:col-span-5` all present in `#destaques` section HTML | PASS (static); offsetWidth comparison NOT VERIFIED (manual) |
| AC 17 — Count-up: animates to `−75%`; once only; immediate with reduced-motion | U+2212 `−` present in SSR span (`>−<!-- -->75<!-- -->%</span>`); `useInView once:true` in source; reduced-motion renders final value immediately (source); animation timing NOT VERIFIED (manual) | PASS (static); NOT VERIFIED (animation timing) |
| AC 18 — Pipeline card links to `https://github.com/Carloscavalcante97/pipeline-Claude` with `target="_blank"` | `href="https://github.com/Carloscavalcante97/pipeline-Claude"` with `target="_blank"` present in HTML | PASS |
| AC 19 — 6 project cards with exact repo URLs, noopener, pitches, tags; spans `[7,5,5,7,7,5]` | 6 project anchor tags found with `noopener`; in `#projetos`: `md:col-span-7` × 3 and `md:col-span-5` × 3 confirming `[7,5,5,7,7,5]` pattern | PASS |
| AC 20 — TiltCard: ≤3° rotation; `--mx`/`--my` follow cursor; returns to 0; no tilt reduced-motion | NOT VERIFIED (manual — requires browser pointer events) | NOT VERIFIED (manual) |
| AC 21 — Skills: 5 editorial lines `01`–`05` with exact names; 12 rest badges | Indices `01`–`05` present in `#skills`; all 5 top names (`TypeScript`, `AI Integration`, `Node.js`, `Docker & Cloud`, `Next.js`) found; 12 rest badge spans confirmed | PASS |
| AC 22 — Contact: 4 anchors with exact hrefs; LinkedIn TODO comment in site.ts | All 4 hrefs present in HTML (`wa.me`, `mailto:antonio.developer@icloud.com`, `github.com/Carloscavalcante97`, `linkedin.com/in/SEU-LINKEDIN`); TODO comment at line 7 of site.ts | PASS |
| AC 23 — Footer: "Antonio Cavalcante"; current year (runtime); "Next.js + Three.js" | `Antonio Cavalcante · <!-- -->2026` and `feito com Next.js + Three.js` present in HTML; `new Date().getFullYear()` in source (not hardcoded) | PASS |
| AC 24 — Reveals: fade+translate on scroll; once; no opacity-0 residual with reduced-motion | Source: `viewport={{ once: true }}`; `initial={reduced ? false : { opacity: 0, y: 24 }}`; visual behavior NOT VERIFIED (manual) | PASS (source); NOT VERIFIED (visual) |
| AC 25 — Tags `text-secondary-ink`; computed `#b45309` light / `#f89820` dark; AA contrast | `text-secondary-ink` class on project tags in HTML; compiled CSS contains `--secondary-ink: #b45309` (`:root`) and `#f89820` (`.dark`) and `--color-secondary-ink` utility; computed color NOT VERIFIED (manual DevTools) | PASS (tokens/class); NOT VERIFIED (computed color) |
| AC 26 — OG meta: `og:title`, `og:description`, `og:type=website`, `og:locale=pt_BR`, `og:site_name` | All 5 OG properties found in SSR `<head>` | PASS |
| AC 27 — No emoji in rendered output | Python regex over full HTML found no emoji characters (U+2600–U+27BF, U+10000+) | PASS |
| AC 28 — `"use client"` absent from `page.tsx`, `layout.tsx`, `header.tsx`, `site.ts` | `grep "use client"` returned no matches in all 4 files | PASS |
| Edge: localStorage blocked (Safari private) | try/catch on both `getItem` and `setItem`; catch blocks silent with no rethrow | PASS (source) |
| Edge: Hydration mismatch — `useState("pt")` initial, localStorage only in useEffect | Source confirms: `useState<Lang>("pt")`, localStorage only read in `useEffect` | PASS (source); NOT VERIFIED (browser console) |
| Edge: WebGL unavailable — gradient fallback stays | Gradient `<div>` is unconditional; Three.js error cannot crash fallback | PASS (source) |
| Edge: Reduced-motion mid-session — canvas unmounts | `{!reduced && <HeroScene />}` is reactive to `useReducedMotion()` hook | PASS (source) |
| Edge: Hero out of viewport — `frameloop="never"` | `useInView` drives `frameloop` prop; passed to `<HeroScene frameloop={inView ? "always" : "never"} />` | PASS (source) |
| Edge: Event listener cleanup | `hero-scene.tsx`: both `pointermove` and `scroll` listeners return cleanup removing them | PASS (source) |
| Edge: Count-up unmounted mid-animation | `return () => ctrl.stop()` in useEffect cleanup | PASS (source) |
| Edge: mailto no target=_blank | `href="mailto:..."` anchor has no `target="_blank"` in HTML (verified with 200-char context window) | PASS |
| Edge: Projects col-span via ternary (not template literal) | Source uses `SPANS[i] === 7 ? "md:col-span-7" : "md:col-span-5"` — static strings, Tailwind v4 detects reliably; compiled CSS confirms both classes present | PASS |
| Edge: dpr capped at 1.5 | `dpr={[1, 1.5]}` in `<Canvas>` | PASS (source) |
| Edge: scroll passive listener | `window.addEventListener("scroll", onScroll, { passive: true })` in hero-scene | PASS (source) |

## Results

**All statically-verifiable criteria: PASS.**

Build: `pnpm build` completed with 0 TypeScript errors and 0 compilation errors.

Criteria not verifiable without a real browser (marked NOT VERIFIED — manual):
- AC 6: Magnetic button pointer physics (≤8px translate, spring return, no motion under reduced-motion)
- AC 7 partial: Canvas mount after hydration
- AC 8: Mouse parallax rotation; scroll particle fade; purple dominance in canvas
- AC 9 partial: Network tab confirming THREE chunk not fetched under reduced-motion
- AC 11: Full i18n toggle flow (click EN → copy switches, localStorage set, html lang changes, reload restores)
- AC 13: No hydration mismatch warning in browser console
- AC 14 partial: Keyboard Tab+Enter switches language
- AC 16 partial: `offsetWidth`/`offsetHeight` of pipeline card larger than siblings at ≥768px
- AC 17 partial: Animation timing (~1.2s), no reanimation on subsequent scrolls
- AC 20: TiltCard rotation ≤3°, `--mx`/`--my` update, reset on leave, no tilt under reduced-motion
- AC 24 partial: Visual fade+translate on scroll; no opacity-0 residual with reduced-motion emulated
- AC 25 partial: Computed color values in DevTools (#b45309 light / #f89820 dark)

No failures recorded.

---

## Fix cycle re-test

## Status
PASS

### Criteria verified and evidence

| Criterion | Result | Evidence |
|---|---|---|
| `tilt-card.tsx` outer class contains `group` | PASS | Source line 40: `` className={`group glass rounded-xl ${className ?? ""}` } `` |
| Overlay uses `group-hover:opacity-[0.35]` (no self `hover:`) | PASS | Source line 48: `group-hover:opacity-[0.35]`; no bare `hover:opacity-[0.35]` anywhere in file |
| Motion style includes `transformPerspective: 800` | PASS | Source line 41: `transformPerspective: 800` in style object |
| Overlay keeps `pointer-events-none` | PASS | Source line 48: `pointer-events-none` class present |
| Overlay keeps `aria-hidden` | PASS | Source line 47: `aria-hidden="true"` |
| `count-up.tsx` non-reduced initial render is `prefix+0+suffix` | PASS | Source line 41: `{reduced ? <>{prefix}{to}{suffix}</> : <>{prefix}0{suffix}</>}` |
| Reduced-motion branch still renders final value | PASS | Same expression: `{prefix}{to}{suffix}` under `reduced` |
| `animate`/`.stop()` logic intact | PASS | Source lines 25, 34: `animate(0, to, ...)` and `return () => ctrl.stop()` |
| `highlights.tsx` — `md:col-start-8` gone | PASS | Not present in source; confirmed absent from served HTML (0 occurrences) |
| Three small cards still `md:col-span-5` | PASS | Source: 3 `md:col-span-5` occurrences on quality/events/.NET Reveal wrappers |
| `pnpm build` green | PASS | Build output: "Compiled successfully in 2.7s", 0 TypeScript errors, 0 compilation errors |
| Served HTML count-up span shows `−0%` (U+2212) | PASS | Served HTML at `http://localhost:3999/`: `−<!-- -->0<!-- -->%</span>` — U+2212 minus sign, then 0, then `%` |
| `group-hover:opacity-[0.35]` present in served HTML | PASS | 6 occurrences in served HTML (one per TiltCard instance across projects/highlights) |
| `col-start-8` absent from served HTML | PASS | 0 occurrences in served HTML |

### Build command run
```
pnpm build
```
Output: `Compiled successfully in 2.7s` / `Finished TypeScript in 3.5s` / `✓ Generating static pages (4/4)`

### Server command run
```
pnpm next start -p 3999
curl -s http://localhost:3999/
```
Server started in 91ms, HTML fetched successfully, server killed after curl.
