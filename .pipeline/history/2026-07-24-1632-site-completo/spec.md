# Spec: Site completo — hero 3D, i18n PT/EN, conteúdo real, animações, SEO

## Open Questions
None.

Decisões tomadas pelo Planner (documentadas, não perguntas):

- **LinkedIn**: URL não confirmada → constante `LINKS.linkedin = "https://www.linkedin.com/in/SEU-LINKEDIN"` em `site.ts` com comentário `// TODO: confirmar URL real do LinkedIn antes do lançamento`. O botão renderiza normalmente com esse href.
- **i18n server-rendered em PT**: o HTML estático é sempre PT (estado inicial do contexto = `"pt"`); após a hidratação, um `useEffect` lê `localStorage` e troca para EN se for o caso. Usuário EN vê um flash breve de PT no primeiro paint — aceitável para site estático, e é a única forma de evitar hydration mismatch sem rotas `/en`. Documentar em comentário no `LanguageProvider`.
- **Seções são client components**: a troca de idioma client-side exige que todo texto traduzível seja lido de um React context. A regra "RSC por padrão" do CLAUDE.md continua respeitada no espírito: `layout.tsx`, `page.tsx` e `header.tsx` seguem server; as seções viram client porque i18n + reveals **são** interação. Sem `useState`/`useEffect` desnecessários dentro delas além do contexto.
- **Cena 3D**: campo de partículas com `ShaderMaterial` custom (sem drei — não é necessário para pontos + shader; menos código, menos bundle). Cor dominante `#512BD4`.
- **Fallback do canvas sempre presente**: o gradiente estático fica **atrás** do canvas permanentemente (não só durante o loading). Se WebGL falhar ou o chunk não carregar, o hero continua elegante sem branch de erro.
- **Laranja `#f89820` como texto**: novo token `--secondary-ink` (light: `#b45309`, ~4.8:1 sobre `#f8fafc`; dark: `#f89820`, ~9:1 sobre `#0a0e14`). Qualquer uso de laranja como texto usa `text-secondary-ink`; `--secondary` segue existindo para uso decorativo.
- **Labels de seção traduzidos** ("02 / sobre" ↔ "02 / about"), mas os **ids das âncoras não mudam** (`hero|about|destaques|projetos|skills|contato`) — âncoras estáveis nas duas línguas.
- **Footer dentro de `contact.tsx`** (precisa de texto traduzido e do ano em runtime; evita um 16º arquivo).
- **Ícones**: continuar SVG inline fino (`stroke`, `strokeWidth 1.5`) como no `theme-toggle.tsx` — nenhuma lib de ícones instalada, nenhuma dependência nova permitida. Ícones necessários: seta/arrow para links de card, glifos simples de mail/github/linkedin no contato (paths simples estilo Lucide, inline).

## Goal

Transformar o shell atual (header glass, temas, tokens, 6 seções vazias) no site completo pronto para publicar: hero com cena Three.js de partículas reagindo a mouse/scroll, i18n PT/EN client-side sem dependências, todo o conteúdo real nas duas línguas (about, 4 destaques com count-up de −75%, 6 projetos com tilt, skills, contato com 4 canais + footer), reveals por scroll com Framer Motion, botões magnéticos, metadata/OG e as regras de performance e acessibilidade do CLAUDE.md.

## Files to create / modify

Modificar:
- `src/app/layout.tsx` — adicionar `<LanguageProvider>` dentro do `<ThemeProvider>`; metadata completa com `openGraph`.
- `src/app/page.tsx` — substituir o map de seções placeholder pela composição das 6 seções reais (continua server component).
- `src/app/globals.css` — adicionar token `--secondary-ink` (`:root` + `.dark` + `@theme inline` como `--color-secondary-ink`).
- `src/components/header.tsx` — substituir o botão PT/EN placeholder por `<LanguageToggle />` (header continua server component).

Criar:
- `src/content/site.ts` — tipos, `LINKS`, `STACK_BADGES` e dicionário `site: Record<Lang, SiteContent>` com TODO o copy PT/EN (transcrito abaixo — o Coder não escreve copy).
- `src/components/language-provider.tsx` — context de idioma (client).
- `src/components/language-toggle.tsx` — toggle PT/EN funcional (client).
- `src/components/reveal.tsx` — reveal por scroll reutilizável (client).
- `src/components/magnetic-button.tsx` — CTA com efeito magnético (client).
- `src/components/tilt-card.tsx` — card glass com tilt ≤3° + highlight especular (client).
- `src/components/count-up.tsx` — número animado ao entrar no viewport (client).
- `src/components/hero-canvas.tsx` — wrapper client com `next/dynamic` `ssr: false` + fallback + gate de reduced-motion.
- `src/components/hero-scene.tsx` — a cena R3F em si (client, só carregada via dynamic import).
- `src/components/sections/hero.tsx`
- `src/components/sections/about.tsx`
- `src/components/sections/highlights.tsx`
- `src/components/sections/projects.tsx`
- `src/components/sections/skills.tsx`
- `src/components/sections/contact.tsx` (inclui o `<footer>`)

Nenhum outro arquivo. Nenhuma dependência nova (verificar que `package.json` não muda).

## Function / API signatures

### `src/content/site.ts` (sem `"use client"` — só dados e tipos)

```ts
export type Lang = "pt" | "en";

export const LINKS = {
  whatsapp: "https://wa.me/5511947832280",
  email: "mailto:antonio.developer@icloud.com",
  github: "https://github.com/Carloscavalcante97",
  // TODO: confirmar URL real do LinkedIn antes do lançamento
  linkedin: "https://www.linkedin.com/in/SEU-LINKEDIN",
  pipelineRepo: "https://github.com/Carloscavalcante97/pipeline-Claude",
} as const;

/** Stack completa — badges mono, iguais nas duas línguas */
export const STACK_BADGES = [
  "TypeScript", "C#", ".NET", "Java", "Spring Boot", "NestJS", "Node.js",
  "React", "Next.js", "PostgreSQL", "SQL Server", "EF Core", "Docker",
  "CI/CD", "LLM APIs",
] as const;

export interface Project {
  name: string;
  pitch: string;
  tags: string[];
  url: string;
}

export interface Highlight {
  title: string;
  body: string;
}

export interface SiteContent {
  hero: { label: string; title: string; ctaTalk: string; ctaProjects: string };
  about: { label: string; heading: string; body: string };
  highlights: {
    label: string;
    heading: string;
    quality: Highlight;
    pipeline: Highlight & { metricCaption: string; linkLabel: string };
    events: Highlight;
    dotnet: Highlight;
  };
  projects: { label: string; heading: string; items: Project[] };
  skills: { label: string; heading: string; top: string[]; rest: string[] };
  contact: {
    label: string;
    heading: string;
    sub: string;
    whatsapp: string;
    email: string;
    github: string;
    linkedin: string;
  };
  footer: { madeWith: string };
}

export const site: Record<Lang, SiteContent> = { pt: { ... }, en: { ... } };
```

**Conteúdo integral do dicionário** (transcrever literalmente; usar U+2212 "−" no sinal de menos do −75%):

**`site.pt`:**
- `hero`: label `"01 / hero"`; title `"Full-stack Engineer — backend em C#, Java e NestJS"`; ctaTalk `"Fale comigo"`; ctaProjects `"Ver projetos"`.
- `about`: label `"02 / sobre"`; heading `"Quem sou"`; body `"Sou engenheiro full-stack com alma de backend. Construo sistemas em produção de ponta a ponta — C#, Java e NestJS no servidor, Next.js na frente — e me importo com código que sobrevive ao contato com usuários reais. Meu diferencial é um pipeline de desenvolvimento assistido por IA com 4 agentes (planner, coder, tester, reviewer) que reduziu meu tempo de correção em ~75%. Hoje mantenho e evoluo sistemas .NET e Node.js em produção, do banco ao deploy."`
- `highlights`: label `"03 / destaques"`; heading `"O que venho entregando"`;
  - quality: title `"Gestão da qualidade industrial"`; body `"Módulo full-stack em NestJS + PostgreSQL com registros imutáveis e numeração sequencial atômica — auditoria sem furos, concorrência sob controle."`
  - pipeline: title `"Pipeline de dev com 4 agentes de IA"`; body `"Spec-driven: planner, coder, tester e reviewer com contextos isolados, passando o bastão por arquivos. O resultado no tempo de correção:"`; metricCaption `"no tempo de correção"`; linkLabel `"Ver no GitHub"`.
  - events: title `"Plataforma B2B de eventos"`; body `"Refatoração de backend, integração com WhatsApp e esteira de CI/CD para uma plataforma B2B de eventos."`
  - dotnet: title `".NET em produção"`; body `"Manutenção e evolução de sistemas .NET + SQL Server em produção — o tipo de código que não pode parar."`
- `projects`: label `"04 / projetos"`; heading `"Projetos selecionados"`; items (nesta ordem):
  1. name `"Gerenciamento-De-Produtos"`; pitch `"Monorepo full-stack entregue em desafio técnico de 2 dias."`; tags `["Java 17", "Spring Boot", "React", "Docker Compose"]`; url `"https://github.com/Carloscavalcante97/Gerenciamento-De-Produtos"`.
  2. name `"CashFlow"`; pitch `"API de controle financeiro com relatórios e validações de integridade."`; tags `["C#", ".NET"]`; url `"https://github.com/Carloscavalcante97/CashFlow"`.
  3. name `"BarberBoss"`; pitch `"API para gestão de barbearias com arquitetura DDD."`; tags `[".NET 8", "DDD"]`; url `"https://github.com/Carloscavalcante97/BarberBoss"`.
  4. name `"CSharp-TechLibrary"`; pitch `"API de biblioteca técnica com DDD, EF e documentação Swagger."`; tags `[".NET 9", "EF Core", "FluentValidation", "Swagger"]`; url `"https://github.com/Carloscavalcante97/CSharp-TechLibrary"`.
  5. name `"Api-Eventos"`; pitch `"API REST de venda de ingressos com validação robusta."`; tags `["TypeScript", "REST"]`; url `"https://github.com/Carloscavalcante97/Api-Eventos"`.
  6. name `"pipeline-Claude"`; pitch `"Pipeline de dev com 4 agentes de IA — o diferencial, em código aberto."`; tags `["IA", "Agentes", "Spec-driven"]`; url `"https://github.com/Carloscavalcante97/pipeline-Claude"`.
- `skills`: label `"05 / skills"`; heading `"Skills"`; top `["TypeScript", "AI Integration / LLM APIs", "Node.js", "Docker & Cloud", "Next.js"]`; rest `["C#", ".NET", "Java", "Spring Boot", "NestJS", "React", "PostgreSQL", "SQL Server", "EF Core", "CI/CD", "Git", "Swagger/OpenAPI"]`.
- `contact`: label `"06 / contato"`; heading `"Precisa de alguém que entrega de ponta a ponta?"`; sub `"Sem formulário, sem fricção — me chame direto no canal que preferir."`; whatsapp `"Chamar no WhatsApp"`; email `"Enviar e-mail"`; github `"GitHub"`; linkedin `"LinkedIn"`.
- `footer`: madeWith `"feito com Next.js + Three.js"`.

**`site.en`:**
- `hero`: label `"01 / hero"`; title `"Full-stack Engineer — backend in C#, Java and NestJS"`; ctaTalk `"Get in touch"`; ctaProjects `"See projects"`.
- `about`: label `"02 / about"`; heading `"Who I am"`; body `"I'm a full-stack engineer with a backend soul. I build production systems end to end — C#, Java and NestJS on the server, Next.js up front — and I care about code that survives contact with real users. My edge is an AI-assisted development pipeline with 4 agents (planner, coder, tester, reviewer) that cut my fix time by ~75%. Today I maintain and evolve .NET and Node.js systems in production, from database to deploy."`
- `highlights`: label `"03 / highlights"`; heading `"What I've been shipping"`;
  - quality: title `"Industrial quality management"`; body `"Full-stack module in NestJS + PostgreSQL with immutable records and atomic sequential numbering — airtight auditing, concurrency under control."`
  - pipeline: title `"Dev pipeline with 4 AI agents"`; body `"Spec-driven: planner, coder, tester and reviewer with isolated contexts, handing off through files. The impact on fix time:"`; metricCaption `"in fix time"`; linkLabel `"View on GitHub"`.
  - events: title `"B2B events platform"`; body `"Backend refactoring, WhatsApp integration and a CI/CD pipeline for a B2B events platform."`
  - dotnet: title `".NET in production"`; body `"Maintenance and evolution of .NET + SQL Server systems in production — the kind of code that can't go down."`
- `projects`: label `"04 / projects"`; heading `"Selected projects"`; items (mesma ordem, mesmos `name`/`tags`/`url` do PT):
  1. pitch `"Full-stack monorepo delivered in a 2-day technical challenge."`
  2. pitch `"Personal finance API with reports and integrity validations."`
  3. pitch `"Barbershop management API built on DDD."`
  4. pitch `"Tech library API with DDD, EF and Swagger docs."`
  5. pitch `"Ticket-sales REST API with robust validation."`
  6. pitch `"Dev pipeline with 4 AI agents — the differentiator, in the open."`
- `skills`: label `"05 / skills"`; heading `"Skills"`; top e rest **idênticos ao PT** (nomes de tecnologia não se traduzem).
- `contact`: label `"06 / contact"`; heading `"Need someone who ships end to end?"`; sub `"No forms, no friction — reach me on whichever channel you prefer."`; whatsapp `"Message me on WhatsApp"`; email `"Send an email"`; github `"GitHub"`; linkedin `"LinkedIn"`.
- `footer`: madeWith `"built with Next.js + Three.js"`.

### `src/components/language-provider.tsx`

```tsx
"use client";
export function LanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element
export function useLanguage(): { lang: Lang; setLang: (l: Lang) => void; t: SiteContent }
```
- `useState<Lang>("pt")` — **nunca** ler localStorage no initializer (hydration mismatch).
- `useEffect` no mount: ler `localStorage.getItem("lang")` dentro de try/catch; se for `"pt"` ou `"en"`, aplicar; qualquer outro valor → ignorar.
- `setLang` persiste em `localStorage.setItem("lang", l)` (try/catch) e atualiza o estado.
- `useEffect` reagindo a `lang`: `document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"`.
- `t = site[lang]`. `useLanguage` fora do provider → `throw new Error("useLanguage must be used within LanguageProvider")`.
- Comentário no topo documentando a decisão do server-render em PT (ver Decisões).

### `src/components/language-toggle.tsx`

```tsx
"use client";
export function LanguageToggle(): React.JSX.Element
```
- Dois `<button type="button">` ("PT" e "EN") em `font-mono text-xs`, separados por `<span className="text-muted">/</span>`.
- Ativo: `text-foreground`; inativo: `text-muted hover:text-foreground transition-colors`.
- `aria-pressed={lang === "pt"}` / `aria-pressed={lang === "en"}`; `aria-label="Português"` / `aria-label="English"`; `focus-visible` no padrão do `theme-toggle.tsx`.
- Não precisa de guard `mounted`: server e client renderizam o mesmo estado inicial ("pt" ativo).

### `src/components/reveal.tsx`

```tsx
"use client";
export function Reveal({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}): React.JSX.Element
```
- `motion.div` com `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, `transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay }}`.
- `useReducedMotion()` true → `initial={false}` (conteúdo visível imediatamente, sem transform).
- Stagger é feito pelo chamador passando `delay={i * 0.08}` nos filhos de listas/grids.

### `src/components/magnetic-button.tsx`

```tsx
"use client";
export function MagneticButton({ href, children, variant = "primary", external = false, className }: {
  href: string; children: React.ReactNode;
  variant?: "primary" | "ghost"; external?: boolean; className?: string;
}): React.JSX.Element
```
- Renderiza `motion.a`; se `external`, adicionar `target="_blank" rel="noopener noreferrer"`.
- Efeito magnético: `useMotionValue(0)` para x/y + `useSpring(v, { stiffness: 150, damping: 15 })`; em `onPointerMove` calcular offset do cursor ao centro do elemento via `getBoundingClientRect`, aplicar `clamp` a **±8px**; `onPointerLeave` → zerar (spring traz de volta).
- `useReducedMotion()` true → sem motion values, `<a>` estático (mesmo estilo).
- Estilos: `variant="primary"` → `bg-cta text-white` (sombra discreta no padrão do `whatsapp-button.tsx`, nunca `shadow-lg` default); `variant="ghost"` → `glass text-foreground` com hover de borda `border-[var(--glass-border)]` → primary. Ambos `rounded-full px-6 py-3 font-mono text-sm inline-flex items-center gap-2` + `focus-visible:outline-2 outline-primary outline-offset-2`.

### `src/components/tilt-card.tsx`

```tsx
"use client";
export function TiltCard({ children, className }: {
  children: React.ReactNode; className?: string;
}): React.JSX.Element
```
- Wrapper `motion.div` com classe `glass` + `className` + `rounded-xl` (o chamador adiciona padding).
- Tilt: `useMotionValue` rotateX/rotateY passados por `useSpring({ stiffness: 200, damping: 20 })`; em `onPointerMove`, mapear posição relativa (0..1) para rotateY ∈ [−3°, 3°] e rotateX ∈ [3°, −3°]; `onPointerLeave` → 0. Máximo absoluto **3°**.
- Highlight especular: `onPointerMove` também seta CSS vars no elemento (`--mx`, `--my` em `%`); um `<div aria-hidden>` absoluto interno com `background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), var(--glass-highlight), transparent 70%)`, `opacity: 0` → `opacity` ~0.35 no hover, `pointer-events: none`, `transition: opacity 300ms`.
- `useReducedMotion()` true → sem tilt (rotate fixo 0); highlight pode permanecer (não é motion essencial, mas se simplificar, desligar ambos é aceitável).
- Touch (sem pointer move de mouse): card fica estático — nenhum handler quebra.

### `src/components/count-up.tsx`

```tsx
"use client";
export function CountUp({ to, prefix = "", suffix = "", duration = 1.2, className }: {
  to: number; prefix?: string; suffix?: string; duration?: number; className?: string;
}): React.JSX.Element
```
- `useInView(ref, { once: true, amount: 0.5 })` (framer-motion). Ao entrar: `animate(0, to, { duration, ease: "easeOut", onUpdate: v => ... })` escrevendo `Math.round(v)` no texto (state ou `ref.current.textContent`). Guardar o retorno de `animate` e chamar `.stop()` no cleanup do effect.
- `useReducedMotion()` true → renderizar direto `prefix + to + suffix`.
- Render: `<span ref={ref} className={className}>{prefix}{valor}{suffix}</span>`.
- Uso no pipeline card: `<CountUp to={75} prefix="−" suffix="%" />` (U+2212).

### `src/components/hero-canvas.tsx`

```tsx
"use client";
const HeroScene = dynamic(() => import("@/components/hero-scene").then(m => m.HeroScene), { ssr: false });
export function HeroCanvas(): React.JSX.Element
```
- **Obrigatório** que este arquivo seja client component: no App Router, `next/dynamic` com `ssr: false` só é permitido dentro de client components (docs: https://nextjs.org/docs/app/guides/lazy-loading).
- Render: `<div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">` contendo:
  1. Fallback **sempre presente** (atrás): `<div>` absoluto com `background: radial-gradient(ellipse 60% 50% at 30% 40%, rgba(81,43,212,0.25), transparent 70%)` (gradiente elegante do roxo primário; funciona nos dois temas).
  2. `{!reducedMotion && <HeroScene />}` — `useReducedMotion()` de framer-motion. Sob reduced-motion o chunk de three **nem é baixado** (o componente dynamic nunca renderiza).
- Rastrear visibilidade do hero com `useInView` (framer-motion) num ref do container e passar `frameloop={inView ? "always" : "never"}` como prop para `HeroScene` — a animação para quando o hero sai da tela.

### `src/components/hero-scene.tsx`

```tsx
"use client";
export function HeroScene({ frameloop = "always" }: { frameloop?: "always" | "never" }): React.JSX.Element
```
- `<Canvas frameloop={frameloop} dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>` (fundo transparente — o gradiente/tema aparece por trás).
- Cena: componente interno `ParticleField` — `<points>` com `BufferGeometry`:
  - ~2500 partículas (mobile-safe), distribuídas num plano ~14×8 (x,y) com jitter em z (±1.5), atributos `position` e `aSeed` (float aleatório por partícula), gerados uma vez com `useMemo`.
  - `ShaderMaterial` com `transparent: true`, `depthWrite: false`, `blending: THREE.AdditiveBlending`.
  - Uniforms: `uTime` (s), `uScroll` (0..1), `uColor` (`new THREE.Color("#512BD4")`), `uOpacity` (float), `uSize` (float ~26).
  - Vertex shader: deslocamento suave pseudo-noise por senos — ex.: `pos.y += sin(uTime * 0.3 + aSeed * 6.2831) * 0.25; pos.x += cos(uTime * 0.2 + aSeed * 12.566) * 0.15;` — e `gl_PointSize = uSize * (1.0 / -mvPosition.z)` (atenuação por distância). `// ponytail: pseudo-noise por senos; trocar por simplex se aparecer padrão visível`.
  - Fragment shader: ponto circular soft — `d = distance(gl_PointCoord, vec2(0.5)); alpha = smoothstep(0.5, 0.1, d);` → `gl_FragColor = vec4(uColor, alpha * uOpacity * (1.0 - uScroll * 0.6));`.
- **Mouse (parallax leve)**: listener `pointermove` na `window` (adicionado em `useEffect`, removido no cleanup) gravando posição normalizada (−1..1) num ref; no `useFrame`, interpolar (`THREE.MathUtils.lerp`, fator ~0.05) a rotação de um `<group>` pai: `rotation.x → mouse.y * 0.06`, `rotation.y → mouse.x * 0.12`.
- **Scroll**: listener `scroll` na `window` (`{ passive: true }`, cleanup) → `uScroll = clamp(scrollY / innerHeight, 0, 1)`; além do fade no fragment, `group.position.y = uScroll * 1.2` (as partículas sobem levemente — parallax entre camada 3D e o texto).
- **Tema**: `useTheme()` (next-themes) → `uOpacity = resolvedTheme === "light" ? 0.35 : 0.6` (o additive blending sobre fundo claro precisa de opacidade menor para não lavar).
- Valores numéricos de tuning (amplitudes, fatores de lerp, tamanho) podem variar ±30%; o comportamento (sutil, roxo dominante, reage a mouse e scroll) é o critério.
- Referências: R3F v9 `Canvas`/`useFrame`/`frameloop` — https://r3f.docs.pmnd.rs/api/canvas ; three r185 `Points`/`ShaderMaterial` — https://threejs.org/docs/#api/en/objects/Points.

### `src/components/sections/hero.tsx`

```tsx
"use client";
export function HeroSection(): React.JSX.Element
```
- `<section id="hero" className="relative min-h-svh scroll-mt-14 overflow-hidden flex items-end md:items-center">` com `<HeroCanvas />` como primeira child (absoluto, atrás).
- Conteúdo em container `mx-auto w-full max-w-6xl px-6 pb-24 md:pb-0` — **layout assimétrico, alinhado à esquerda, nunca centralizado**:
  - `<span className="font-mono text-xs text-muted">{t.hero.label}</span>`
  - `<h1>` em `font-display text-foreground leading-[0.95]` com `font-size: clamp(3.5rem, 10vw, 8rem)` contendo "Antonio Cavalcante" — o nome é invariante (não vem do dicionário). Quebrar em duas linhas (`Antonio` / `Cavalcante`) é permitido para reforçar o layout editorial.
  - `<p className="font-mono text-sm md:text-base text-muted max-w-xl">{t.hero.title}</p>`
  - CTAs: `<MagneticButton href={LINKS.whatsapp} external variant="primary">{t.hero.ctaTalk}</MagneticButton>` e `<MagneticButton href="#projetos" variant="ghost">{t.hero.ctaProjects}</MagneticButton>`, lado a lado com `gap`, alinhados à esquerda.
  - Assimetria: aplicar offset do bloco (ex.: `md:ml-[8%]` no bloco de texto ou grid 12 col com conteúdo em `col-start-2`), título e CTAs à esquerda, espaço negativo à direita.
- Envolver label/h1/p/CTAs em `<Reveal>` com delays escalonados (0 / 0.08 / 0.16 / 0.24).

### `src/components/sections/about.tsx`

```tsx
"use client";
export function AboutSection(): React.JSX.Element
```
- `<section id="about" className="scroll-mt-14 py-24 md:py-32">`, container `mx-auto max-w-6xl px-6`.
- Grid assimétrico 12 col em md+: texto em `md:col-span-7` (label mono + heading `font-display text-4xl md:text-5xl` + body `text-muted text-lg leading-relaxed max-w-prose`), badges em `md:col-span-4 md:col-start-9`.
- Badges: `STACK_BADGES.map` → `<span className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--glass-border)] text-muted">` em flex-wrap. Sem emoji, sem ícone.
- Tudo dentro de `<Reveal>` (texto e bloco de badges com delays diferentes).

### `src/components/sections/highlights.tsx`

```tsx
"use client";
export function HighlightsSection(): React.JSX.Element
```
- `<section id="destaques" className="scroll-mt-14 py-24 md:py-32">`, container `max-w-6xl`.
- Label + heading no padrão do about.
- Grid: `grid grid-cols-1 md:grid-cols-12 gap-4`:
  - Card pipeline (destaque): `md:col-span-7 md:row-span-2` — title, body, `<CountUp to={75} prefix="−" suffix="%" className="font-display text-7xl md:text-8xl text-primary" />` + `metricCaption` em mono ao lado/abaixo, e `<a href={LINKS.pipelineRepo} target="_blank" rel="noopener noreferrer">` com `linkLabel` + seta SVG inline (`font-mono text-sm text-cta hover:underline`).
  - Cards quality, events, dotnet: `md:col-span-5` cada (fluxo natural: dois à direita do pipeline, o terceiro desalinhado abaixo — assimetria proposital; **não** normalizar para grade simétrica).
- Cada card usa a classe `glass rounded-xl p-6 md:p-8` (estáticos — tilt é só nos projetos), title em `font-display text-2xl`, body em `text-muted`.
- Cards envolvidos em `<Reveal delay={i * 0.08}>`.

### `src/components/sections/projects.tsx`

```tsx
"use client";
export function ProjectsSection(): React.JSX.Element
```
- `<section id="projetos" ...>` mesmo padrão de container/label/heading.
- Grid assimétrico: `grid grid-cols-1 md:grid-cols-12 gap-4`; spans por índice: `[7, 5, 5, 7, 7, 5]` (linhas 7+5 / 5+7 / 7+5 — **proibido** 3×2 uniforme).
- Cada card: `<Reveal delay={i * 0.06}><TiltCard className="p-6 h-full">` contendo:
  - O card inteiro é um `<a href={p.url} target="_blank" rel="noopener noreferrer">` (área de clique maior — preferido), com o nome do repo em `font-display text-xl` + seta SVG fina no canto.
  - pitch em `text-muted text-sm`.
  - tags em `font-mono text-xs text-secondary-ink` (flex-wrap) — laranja Java como acento, já com contraste AA nos dois temas.

### `src/components/sections/skills.tsx`

```tsx
"use client";
export function SkillsSection(): React.JSX.Element
```
- `<section id="skills" ...>` mesmo padrão.
- Top 5 como lista editorial (não cards): para cada `t.skills.top[i]`, uma linha `flex items-baseline gap-4 border-b border-[var(--glass-border)] py-4` com índice mono `0${i+1}` em `text-muted text-xs` e o nome em `font-display text-3xl md:text-4xl text-foreground`.
- Demais (`t.skills.rest`) abaixo em badges mono pequenas (mesmo estilo dos badges do about).
- Reveals com stagger nas linhas.

### `src/components/sections/contact.tsx`

```tsx
"use client";
export function ContactSection(): React.JSX.Element
```
- `<section id="contato" className="scroll-mt-14 py-24 md:py-32">`, container `max-w-6xl`.
- Label mono + heading gigante `font-display` com `clamp(2.5rem, 6vw, 5rem)` alinhado à esquerda + sub em `text-muted`.
- Botões grandes em flex-wrap com gap:
  - `<MagneticButton href={LINKS.whatsapp} external variant="primary">{t.contact.whatsapp}</MagneticButton>`
  - `<MagneticButton href={LINKS.email} variant="ghost">{t.contact.email}</MagneticButton>` (mailto não usa `external`/target blank)
  - `<MagneticButton href={LINKS.github} external variant="ghost">{t.contact.github}</MagneticButton>`
  - `<MagneticButton href={LINKS.linkedin} external variant="ghost">{t.contact.linkedin}</MagneticButton>`
- Footer no fim do mesmo arquivo, logo após o bloco de botões:
```tsx
<footer className="mt-24 border-t border-[var(--glass-border)] py-8 font-mono text-xs text-muted flex flex-wrap gap-2 justify-between">
  <span>Antonio Cavalcante · {new Date().getFullYear()}</span>
  <span>{t.footer.madeWith}</span>
</footer>
```

### `src/app/page.tsx` (server component — sem `"use client"`)

```tsx
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <HighlightsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
```
- Remover `SECTIONS` e o map placeholder.

### `src/app/layout.tsx`

- Envolver: `<ThemeProvider ...><LanguageProvider><Header />{children}<WhatsAppButton /></LanguageProvider></ThemeProvider>`.
- Metadata:
```tsx
export const metadata: Metadata = {
  title: "Antonio Cavalcante — Full-stack Engineer",
  description:
    "Full-stack engineer com alma de backend — C#, Java e NestJS. Sistemas em produção de ponta a ponta e pipeline de desenvolvimento assistido por IA que reduziu o tempo de correção em ~75%.",
  openGraph: {
    title: "Antonio Cavalcante — Full-stack Engineer",
    description:
      "Full-stack engineer com alma de backend — C#, Java e NestJS. Sistemas em produção de ponta a ponta e pipeline de desenvolvimento assistido por IA.",
    type: "website",
    locale: "pt_BR",
    siteName: "Antonio Cavalcante",
  },
};
```
- Sem OG image custom, sem `metadataBase` (sem domínio definido). `lang="pt-BR"` continua no server; o `LanguageProvider` atualiza `document.documentElement.lang` no client.

### `src/app/globals.css`

- Adicionar em `:root`: `--secondary-ink: #b45309;` (comentário: laranja Java escurecido p/ texto no light — AA sobre #f8fafc).
- Adicionar em `.dark`: `--secondary-ink: #f89820;`.
- Adicionar em `@theme inline`: `--color-secondary-ink: var(--secondary-ink);`.
- Nada mais muda em CSS (tilt/highlight/magnetic são inline/motion; `.glass` já existe).

## Acceptance criteria

1. `npm run build` completa sem erros de tipo; `package.json` não ganhou nenhuma dependência.
2. A home renderiza as 6 sections com os mesmos ids de antes (`hero`, `about`, `destaques`, `projetos`, `skills`, `contato`), todas com `scroll-mt-14`; `/#projetos` posiciona a seção sem o header cobri-la.
3. No HTML servido (view-source, antes de JS), todo o texto está em PT — ex.: contém "Full-stack Engineer — backend em C#, Java e NestJS" e **não** contém "backend in C#".
4. Hero: `h1` contém "Antonio Cavalcante" em `font-display` (Instrument Serif computada); em viewport de 1440px, `font-size` computado do h1 = `128px` (clamp atinge o teto de 8rem); o bloco é alinhado à esquerda (não centralizado).
5. Hero: existem exatamente 2 CTAs — anchor com `href="https://wa.me/5511947832280"`, `target="_blank"`, `rel` contendo `noopener`; e anchor com `href="#projetos"` que rola até a seção projetos.
6. Botões magnéticos: mover o ponteiro sobre um CTA altera seu `transform` (translate ≤ 8px em cada eixo); ao sair, ele retorna à posição original. Com `prefers-reduced-motion: reduce` emulado, o `transform` não muda no hover.
7. Canvas 3D: o HTML servido **não** contém `<canvas>`; após a hidratação (sem reduced-motion), um `<canvas>` aparece dentro de `#hero`, dentro de um wrapper com `aria-hidden="true"` e `pointer-events: none` — clicar "através" da área do canvas nos CTAs funciona.
8. Canvas 3D: mover o mouse altera a rotação da cena (parallax perceptível mas sutil); rolar a página desloca/esmaece as partículas; o roxo `#512BD4` é a cor dominante das partículas nos dois temas.
9. Com `prefers-reduced-motion: reduce` emulado antes do load, **nenhum** `<canvas>` é montado e nenhum chunk de three é baixado (verificável na aba Network); o fallback com gradiente radial roxo está visível no hero.
10. O fallback de gradiente existe no DOM mesmo com o canvas ativo (atrás dele) — se WebGL for desabilitado, o hero ainda mostra o gradiente sem erro em tela.
11. i18n: primeiro load sem localStorage → PT ativo ("PT" em `text-foreground`, "EN" em `text-muted`). Clicar "EN": (a) o título do hero vira "Full-stack Engineer — backend in C#, Java and NestJS", heading do about vira "Who I am", heading do contato vira "Need someone who ships end to end?"; (b) `localStorage.lang === "en"`; (c) `document.documentElement.lang === "en"`; (d) o estado ativo do toggle troca; (e) após reload, a página exibe EN depois da hidratação.
12. i18n: `localStorage.lang` com valor inválido (ex.: `"xx"`) → site carrega em PT sem erro no console.
13. Não há warning de hydration mismatch no console em nenhum cenário (PT default, EN persistido, dark/light).
14. Toggle de idioma: os dois botões têm `aria-pressed` refletindo o estado e são operáveis por teclado (Tab + Enter troca o idioma).
15. About: renderiza o parágrafo exato do dicionário e os 15 badges de `STACK_BADGES` em mono.
16. Destaques: 4 cards `.glass`; em viewport ≥ 768px o card do pipeline tem `offsetWidth` e `offsetHeight` maiores que qualquer um dos outros 3 (col-span-7 + row-span-2); o grid não é uma grade uniforme de colunas iguais.
17. Count-up: com o card do pipeline fora do viewport o valor não está em 75; ao entrar no viewport, anima até exatamente "−75%" (U+2212) em ~1.2s e não reanima em scrolls subsequentes. Com reduced-motion, "−75%" aparece imediatamente sem animação.
18. O card do pipeline contém link para `https://github.com/Carloscavalcante97/pipeline-Claude` com `target="_blank"`.
19. Projetos: 6 cards, cada um linkando para a URL exata do repo listada no dicionário (`target="_blank"`, `rel` com `noopener`), com pitch e tags renderizados; os spans seguem `[7,5,5,7,7,5]` em md+ (nunca 3 colunas iguais).
20. TiltCard: mover o mouse sobre um card muda `transform` com rotação máxima de 3° em cada eixo e o highlight radial segue a posição do cursor (CSS vars `--mx`/`--my` mudam); ao sair, rotação volta a 0. Com reduced-motion, sem tilt.
21. Skills: 5 linhas editoriais com índices `01`–`05` e os nomes exatos do dicionário; os 12 itens de `rest` aparecem como badges mono menores.
22. Contato: 4 anchors com hrefs exatos — `https://wa.me/5511947832280`, `mailto:antonio.developer@icloud.com`, `https://github.com/Carloscavalcante97`, `https://www.linkedin.com/in/SEU-LINKEDIN` — e `site.ts` contém o comentário TODO do LinkedIn.
23. Footer: contém "Antonio Cavalcante", o ano corrente (via `new Date().getFullYear()`, não hardcoded — verificável no fonte) e "Next.js + Three.js".
24. Reveals: seções abaixo da dobra entram com fade+translate ao rolar, uma única vez (`once`); com reduced-motion emulado, todo o conteúdo fica visível imediatamente, sem opacity 0 residual.
25. Tags laranja usam `text-secondary-ink`: cor computada `#b45309` no light e `#f89820` no dark (ambas AA sobre os respectivos fundos).
26. `<head>` contém `og:title`, `og:description`, `og:type=website`, `og:locale=pt_BR` e `og:site_name`; `<title>` = "Antonio Cavalcante — Full-stack Engineer".
27. Nenhum emoji em texto renderizado ou como ícone (todos os glifos são SVG inline).
28. `"use client"` aparece somente nos arquivos listados como client neste spec — `page.tsx`, `layout.tsx` e `header.tsx` continuam sem a diretiva.

## Edge cases to cover

- **localStorage bloqueado** (Safari privado / cookies off): try/catch em leitura e escrita — o toggle funciona na sessão, só não persiste; zero erros no console.
- **Hydration**: estado inicial de idioma sempre `"pt"` no primeiro render client (igual ao server); localStorage só no `useEffect`. Flash PT→EN é aceito e documentado.
- **WebGL indisponível / contexto perdido**: fallback de gradiente permanece atrás do canvas; nenhuma tela branca nem crash de página.
- **Reduced-motion ligado no meio da sessão**: `useReducedMotion` é reativo — o canvas desmonta (o hero volta ao fallback) e os efeitos param.
- **Hero fora da tela**: `frameloop="never"` — sem trabalho de GPU/rAF enquanto o usuário lê as outras seções.
- **Listeners**: `pointermove`/`scroll` na window sempre com cleanup no unmount; `scroll` com `{ passive: true }`.
- **Count-up desmontado no meio da animação** (troca rápida de idioma re-renderiza a árvore): `.stop()` no cleanup; sem setState em componente desmontado.
- **Troca de idioma após o count-up já ter rodado**: o valor final "−75%" deve permanecer correto — se o remount zerar o `useInView`, o novo mount reanima ou mostra o valor final; nunca exibir 0 permanente.
- **Touch devices**: sem hover/pointer fino — tilt e magnetismo ficam inertes, mas cards e botões continuam links normais clicáveis.
- **Textos EN vs PT com larguras diferentes**: headings com `clamp` + `max-w` — nada de overflow horizontal em 360px de largura em nenhum idioma (testar hero e contato).
- **`mailto:`** não recebe `target="_blank"` (comportamento nativo).
- **dpr alto (retina)**: `dpr={[1, 1.5]}` limita o custo; partículas ≤ 3000.
- **Additive blending no tema claro**: opacidade reduzida (`uOpacity` 0.35) para as partículas não sumirem/lavarem sobre `#f8fafc`.
- **Âncora `#projetos` com header fixo**: `scroll-mt-14` preservado em todas as sections.

## Existing pattern to follow

- **Tokens/tema**: `src/app/globals.css` — vars em `:root`/`.dark` mapeadas em `@theme inline` (novo token `--secondary-ink` segue exatamente esse padrão). `.glass` já existe em `@layer components`; reutilizar, não duplicar.
- **Componentes**: `src/components/*` — kebab-case, exports nomeados, tipo de retorno `React.JSX.Element` explícito, `"use client"` só onde há interação (padrão de `theme-toggle.tsx`).
- **Guard de hidratação**: `theme-toggle.tsx` (mounted guard) — para idioma o guard não é necessário porque server e client começam iguais ("pt"); documentar isso em comentário.
- **Links externos**: padrão de `whatsapp-button.tsx` (`target="_blank" rel="noopener noreferrer"`, `aria-label`, sombra custom discreta em vez de shadow default).
- **A11y de botões**: `focus-visible:outline-2 outline-primary outline-offset-2` como em `theme-toggle.tsx`.
- **Referências externas**: `next/dynamic` `ssr:false` exige client component (https://nextjs.org/docs/app/guides/lazy-loading); framer-motion 12 `whileInView`/`useInView`/`useReducedMotion`/`useSpring`/`animate` (https://motion.dev/docs/react-scroll-animations, https://motion.dev/docs/react-accessibility); R3F v9 Canvas/frameloop (https://r3f.docs.pmnd.rs/api/canvas); next-themes `useTheme` (https://github.com/pacocoursey/next-themes).

## Out of scope

- Instalar qualquer dependência (ícones, i18n libs, lenis/scroll libs — nada).
- OG image custom, favicon novo, sitemap/robots, analytics.
- Rotas `/en` ou i18n por URL/middleware — a troca é 100% client-side por decisão documentada.
- Câmera scroll-driven atravessando seções (a cena 3D vive só no hero e reage ao scroll localmente).
- Refração via SVG displacement filter e cursor customizado (linguagem visual futura; o glass atual + tilt + highlight cobrem esta entrega).
- Nav de âncoras no header e menu mobile.
- README do repo `pipeline-Claude` no GitHub (pendência externa ao site, já anotada no CLAUDE.md).
- Tradução do `<title>`/metadata por idioma (metadata é estática PT — o site é indexado em PT; EN é toggle de leitura).
- Novos frameworks de teste — o Tester valida os critérios acima com o setup existente.
