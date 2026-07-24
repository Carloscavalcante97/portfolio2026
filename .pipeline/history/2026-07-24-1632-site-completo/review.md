# Review: Complete site — hero 3D, i18n PT/EN, sections, animations, SEO

## Verdict: NEEDS WORK

## Findings

- **[major]** `src/components/tilt-card.tsx:48` — The specular highlight can never appear. The overlay div has both `pointer-events-none` and `hover:opacity-[0.35]` on itself; an element with `pointer-events: none` is excluded from hit testing, so its own `:hover` never matches (hover on the card's children does not propagate to a sibling overlay). The highlight stays at opacity 0 permanently — the `--mx`/`--my` vars update but the gradient is invisible. This breaks AC 20 and the spec's "highlight especular acompanha o mouse". Fix: add `group` to the card's class and use `group-hover:opacity-[0.35]` on the overlay (or drive opacity from the existing pointer handlers).
- **[major]** `src/components/count-up.tsx:39-43` — Initial render is the final value (`{prefix}{to}{suffix}` → "−75%"), directly violating AC 17's first clause ("com o card do pipeline fora do viewport o valor não está em 75"). Worse, since `useInView` uses `amount: 0.5`, the user scrolling in sees "−75%" while the card is 0–50% visible, then it snaps to "−0%" and counts back up — a visible glitch on the flagship metric. This deviation is not listed in changes.md, and the Tester recorded the SSR "−75%" as a PASS for AC 17, which actually contradicts the criterion. Fix: render `0` initially when motion is allowed (keep the final value only under reduced-motion, as spec'd).
- **[minor]** `src/components/sections/highlights.tsx:98` — `md:col-start-8` on the .NET card stacks all three small cards in a tidy right column. Spec explicitly asked for natural flow with "o terceiro desalinhado abaixo — assimetria proposital; **não** normalizar". AC 16 still passes, but this softens the intended editorial asymmetry; dropping `md:col-start-8` restores the spec'd layout.
- **[minor]** `src/components/tilt-card.tsx:41` — `rotateX`/`rotateY` are applied without any perspective (`transformStyle: "preserve-3d"` alone adds none, and framer-motion only adds it via `transformPerspective`). At ±3° the tilt renders as a flat orthographic squash rather than a depth tilt. Adding `transformPerspective: 800` to the style is a one-line improvement.

Everything else checked out: i18n provider follows the hydration-safe pattern exactly (PT initial state, localStorage only in effects, try/catch, validated values, `document.documentElement.lang` sync); reduced-motion gates the three chunk entirely (`{!reduced && <HeroScene />}` in `hero-canvas.tsx:35`); listeners have cleanup and `scroll` is passive; `frameloop` pauses off-screen; dpr capped at 1.5; copy matches the spec dictionary verbatim including U+2212; all hrefs, `rel="noopener noreferrer"`, mailto-without-blank, `aria-pressed`, `scroll-mt-14`, `--secondary-ink` tokens, OG metadata, and the LinkedIn TODO are correct; `"use client"` only where spec'd; no emojis; no new dependencies; CLAUDE.md anti-AI rules respected (left-aligned hero, asymmetric grids, inline thin SVG icons).

## Summary

The implementation is faithful to a demanding spec in nearly every static detail, and the build/test pass is real — but the two flagship micro-interactions the spec sells hardest are both broken in ways only a browser would reveal: the tilt-card specular highlight is dead code (a `pointer-events-none` element can't receive `:hover`), and the −75% count-up violates its acceptance criterion by rendering 75 before entering the viewport, producing a visible 75→0→75 flash on the site's key metric. Both are small, well-localized fixes in `tilt-card.tsx` and `count-up.tsx`; the `col-start-8` asymmetry tweak can ride along. Fix those, re-verify AC 17 and AC 20 in a browser, and this ships.

---

# Review (2nd pass): Fix cycle — tilt highlight, count-up initial value, highlights asymmetry

## Verdict: SHIP

## Findings
- [minor] `src/components/count-up.tsx:41` — Under `prefers-reduced-motion`, the server-rendered text is "−0%" (framer-motion's `useReducedMotion` returns `null` during SSR) while the client's first render produces "−75%", a text hydration mismatch React recovers from with a dev-console warning. Non-reduced clients (the common case) hydrate consistently, and reduced-motion users still see the correct final value immediately, so behavior matches AC 17. If the warning bothers anyone, `suppressHydrationWarning` on the span silences it; not worth a cycle.

## Summary
All four findings from the first review are genuinely resolved in code, not just in prose: `tilt-card.tsx:40,48` adds `group` on the card and `group-hover:opacity-[0.35]` on the overlay (which keeps `pointer-events-none` and `aria-hidden`, and now sits inside a `position: relative` `.glass` ancestor, so the specular highlight can actually appear where it should); `tilt-card.tsx:41` adds `transformPerspective: 800` alongside the existing spring tilt so the ±3° rotation reads as depth; `count-up.tsx:41` renders `{prefix}0{suffix}` initially when motion is allowed — eliminating the 75→0→75 flash that violated AC 17 — while preserving the immediate final value under reduced motion; and `highlights.tsx:98` drops `md:col-start-8`, restoring the spec's intentional asymmetry. The fix-cycle re-test evidence matches the diff, no collateral changes crept in, and the single remaining item is a dev-only hydration warning in the reduced-motion path. Ship it.
