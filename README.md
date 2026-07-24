# Portfólio — Antonio Cavalcante

Portfólio profissional: Next.js (App Router) + Three.js/React Three Fiber + Tailwind v4 + Framer Motion. Dark mode por padrão, liquid glass, i18n PT/EN client-side sem dependências.

**Construído de ponta a ponta com meu próprio pipeline de entrega assistido por IA** ([pipeline-Claude](https://github.com/Carloscavalcante97/pipeline-Claude)): Planner → Coder → Simplifier → Tester → Reviewer, com gates entre estágios. Os handoffs de cada run estão em [`.pipeline/history/`](.pipeline/history/) — spec, changes, test results e review de cada feature.

## Stack

- **Next.js 16** (App Router, RSC por padrão, site 100% estático)
- **Three.js / R3F** — campo de partículas shader-based no hero, lazy-loaded (`ssr: false`), pausado fora do viewport, desligado sob `prefers-reduced-motion`
- **Tailwind CSS v4** — design tokens via CSS vars (`@theme inline`), dark/light com `@custom-variant`
- **Framer Motion** — reveals por scroll, botões magnéticos, tilt cards com highlight especular, count-up
- **next-themes** — dark default, toggle persistido

## Rodar

```bash
pnpm install
pnpm dev
```

## Deploy

Vercel — `pnpm build` gera tudo estático.
