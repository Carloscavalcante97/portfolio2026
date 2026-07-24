# Spec: Fundação visual do portfólio (temas, tokens, fontes, shell, grain, seções)

## Open Questions
None.

Decisões tomadas pelo Planner (documentadas, não perguntas):
- Display font = **Instrument Serif** — é a única das sugestões do CLAUDE.md disponível no Google Fonts (Clash Display e General Sans são Fontshare). Só existe em weight 400 (normal + italic), o que serve para o contraste editorial pedido.
- Corpo = **Geist** (já no scaffold, permitido pelo pedido). Mono = **JetBrains Mono** (substitui Geist Mono).
- next-themes com `enableSystem={false}` e `defaultTheme="dark"` — CLAUDE.md diz "dark é o padrão", então o padrão é determinístico, não o sistema.
- Ícones (sol/lua, WhatsApp) como SVG inline — nenhuma lib de ícones está instalada e adicionar dependência para 3 glifos não se justifica agora (Lucide entra quando as seções reais precisarem de um set).
- Grain via `body::after` com SVG `feTurbulence` em data-URI (CSS puro, zero componentes, zero requests).
- Toggle PT/EN é markup estático dentro do Header (sem arquivo próprio, sem estado).

## Goal
Estabelecer a fundação visual do site: sistema dark/light com next-themes (dark default `#0a0e14`), design tokens da paleta backend (roxo .NET, vermelho NestJS, laranja Java) integrados ao Tailwind v4, as três famílias tipográficas via `next/font/google`, o shell de layout (header liquid glass fixo + botão flutuante de WhatsApp), grain sutil no fundo, `::selection` na cor primária e uma `page.tsx` provisória com as 6 seções ancoráveis para validar scroll.

## Files to create / modify
- `src/app/globals.css` — **reescrever**: custom variant dark, blocos de tokens `:root`/`.dark`, `@theme inline`, classe `.glass`, `::selection`, grain, transições de tema, smooth scroll.
- `src/app/layout.tsx` — **modificar**: fontes (Geist + JetBrains Mono + Instrument Serif), `lang="pt-BR"`, `suppressHydrationWarning`, metadata real, `ThemeProvider`, render de `<Header />`, `{children}` e `<WhatsAppButton />`.
- `src/app/page.tsx` — **reescrever**: 6 `<section>` vazias com ids e altura mínima.
- `src/components/header.tsx` — **criar**: header fixo liquid glass (server component) com nome, `<ThemeToggle />` e toggle PT/EN placeholder.
- `src/components/theme-toggle.tsx` — **criar**: client component com `useTheme`.
- `src/components/whatsapp-button.tsx` — **criar**: botão flutuante fixo (server component).

Nenhum outro arquivo. Não criar `theme-provider.tsx` wrapper: next-themes ≥0.3 já embute `"use client"` no pacote, então `ThemeProvider` pode ser importado direto no layout server (docs: https://github.com/pacocoursey/next-themes — seção "With App").

## Function / API signatures

### `src/app/layout.tsx`
```tsx
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",        // Instrument Serif não é variável; só tem 400
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Antonio Cavalcante — Full-stack Engineer",
  description: "Full-stack engineer com alma de backend — C#, Java e NestJS.",
};
```
- Remover `Geist_Mono` (substituída por JetBrains Mono).
- `<html lang="pt-BR" suppressHydrationWarning className={...as 3 font vars + "h-full antialiased"}>` — `suppressHydrationWarning` é obrigatório (next-themes muta `class` do html antes da hidratação).
- Dentro do `<body className="min-h-full flex flex-col">`:
```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
  <Header />
  {children}
  <WhatsAppButton />
</ThemeProvider>
```
- **Não** passar `disableTransitionOnChange` — a transição suave de cores é desejada.

### `src/app/globals.css` (estrutura exata, na ordem)
```css
@import "tailwindcss";

/* Tailwind v4 usa prefers-color-scheme por padrão; next-themes usa classe.
   Obrigatório para dark: funcionar via .dark no html: */
@custom-variant dark (&:where(.dark, .dark *));

:root {              /* light — neutro claro, mesmos acentos */
  --background: #f8fafc;                 /* slate-50 */
  --foreground: #0f172a;                 /* slate-900 */
  --muted: #475569;                      /* slate-600 */
  --primary: #512BD4;                    /* roxo .NET */
  --cta: #E0234E;                        /* vermelho NestJS */
  --secondary: #f89820;                  /* laranja Java */
  --glass-bg: rgba(255, 255, 255, 0.55);
  --glass-border: rgba(15, 23, 42, 0.08);
  --glass-highlight: rgba(255, 255, 255, 0.9);
}

.dark {
  --background: #0a0e14;                 /* quase-preto azulado */
  --foreground: #e2e8f0;                 /* slate-200 */
  --muted: #94a3b8;                      /* slate-400 */
  /* acentos iguais nos dois temas */
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-highlight: rgba(255, 255, 255, 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-primary: var(--primary);
  --color-cta: var(--cta);
  --color-secondary: var(--secondary);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-jetbrains-mono);
  --font-display: var(--font-instrument-serif);
}
```
Depois dos blocos acima, ainda em `globals.css`:
- `html { scroll-behavior: smooth; }`
- `body { background: var(--background); color: var(--foreground); font-family: var(--font-geist-sans), sans-serif; transition: background-color 300ms ease, color 300ms ease; }` (remover o `font-family: Arial` do scaffold).
- `::selection { background: var(--primary); color: #fff; }`
- Grain: `body::after` com `content: ""; position: fixed; inset: 0; z-index: 9999; pointer-events: none; opacity: 0.04;` e `background-image: url("data:image/svg+xml,...")` contendo um SVG com `<filter><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter>` aplicado a um `<rect>` (URL-encodar o SVG). `background-repeat: repeat; background-size: 180px 180px` (ou dimensão do SVG).
- Classe `.glass`:
```css
.glass {
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid var(--glass-border);
  position: relative;
  transition: background-color 300ms ease, border-color 300ms ease;
}
/* highlight especular no topo */
.glass::before {
  content: ""; position: absolute; inset: 0 0 auto 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--glass-highlight), transparent);
  pointer-events: none;
}
```
- Reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  body, .glass { transition: none; }
}
```

### `src/components/header.tsx` — server component
```tsx
export function Header(): React.JSX.Element
```
- `<header className="glass fixed inset-x-0 top-0 z-50">` com conteúdo em barra horizontal (`flex items-center justify-between`, padding horizontal, altura ~`h-14`). No caso do header, a borda deve ser só inferior (`border-0 border-b` sobrescrevendo `.glass`, ou aplicar via classes utilitárias) — decidir no CSS, mas o resultado obrigatório é: **borda de 1px semi-transparente apenas na base + linha de highlight no topo**.
- Esquerda: nome `Antonio Cavalcante` (usar `font-display`, ~`text-lg`).
- Direita (`flex items-center gap-*`): toggle PT/EN placeholder + `<ThemeToggle />`.
- Toggle PT/EN placeholder: markup estático inline no header, em `font-mono text-xs` — dois rótulos `PT` (estilo ativo, `text-foreground`) e `EN` (`text-muted`), dentro de um `<button type="button" aria-disabled="true" aria-label="Mudar idioma (em breve)">` sem onClick. Sem estado, sem arquivo próprio.

### `src/components/theme-toggle.tsx` — client component
```tsx
"use client";
export function ThemeToggle(): React.JSX.Element
```
- `const { resolvedTheme, setTheme } = useTheme()` de `next-themes`.
- Guard de hidratação obrigatório: `const [mounted, setMounted] = useState(false)` + `useEffect(() => setMounted(true), [])`; antes de `mounted`, renderizar o mesmo `<button>` com um placeholder do mesmo tamanho (evita mismatch e layout shift).
- `onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}`.
- Ícone: SVG inline sol (no dark, indica ir para light) / lua (no light), `stroke="currentColor" strokeWidth={1.5} fill="none"`, ~20px.
- `aria-label={resolvedTheme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}`; botão focável por teclado (é `<button>`, basta não quebrar isso) com `focus-visible` visível.

### `src/components/whatsapp-button.tsx` — server component
```tsx
export function WhatsAppButton(): React.JSX.Element
```
- `<a href="https://wa.me/5511947832280" target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp">`.
- `fixed bottom-6 right-6 z-50`, círculo ~`size-12`, fundo `bg-cta` (o CLAUDE.md define vermelho/rosa NestJS para CTAs), glifo do WhatsApp em SVG inline branco (path oficial do logo, `fill="currentColor"`), `shadow` discreto customizado (não usar sombras default grandes do Tailwind), leve `hover:scale`/`transition`.

### `src/app/page.tsx`
- Remover todo o conteúdo do scaffold (inclusive `next/image` e os SVGs de Next/Vercel).
- Estrutura:
```tsx
const SECTIONS = [
  { id: "hero", label: "01 / hero" },
  { id: "about", label: "02 / about" },
  { id: "destaques", label: "03 / destaques" },
  { id: "projetos", label: "04 / projetos" },
  { id: "skills", label: "05 / skills" },
  { id: "contato", label: "06 / contato" },
];
```
- Render: `<main>` com `map` de `SECTIONS` → `<section id={id} className="min-h-svh scroll-mt-14 ...">` para `hero` e `min-h-[60svh] scroll-mt-14` para as demais. Dentro de cada uma, apenas o `label` em `font-mono text-xs text-muted` (estética "número de seção" do CLAUDE.md) — serve como marcador visual de validação, sem conteúdo real.
- `scroll-mt-14` compensa o header fixo de `h-14` nas âncoras.
- Server component, sem `"use client"`.

## Acceptance criteria
1. `npm run build` completa sem erros de tipo ou lint.
2. No primeiro load sem localStorage, `<html>` tem a classe `dark` e `getComputedStyle(document.body).backgroundColor` é `rgb(10, 14, 20)` (`#0a0e14`).
3. O elemento `<html>` renderizado no server contém `suppressHydrationWarning` e `lang="pt-BR"`; o console do browser não exibe warning de hydration mismatch ao carregar.
4. Clicar no toggle de tema troca a classe do `<html>` entre `dark` e (ausente/`light`), muda o fundo para o tema claro neutro (`#f8fafc`), e após reload da página o tema escolhido persiste (chave `theme` no localStorage, comportamento default do next-themes).
5. A troca de tema não é um flash: `body` tem `transition: background-color 300ms` computada (exceto sob `prefers-reduced-motion: reduce`, quando é `none`).
6. As utilities Tailwind `text-primary`, `text-cta`, `text-secondary`, `text-muted`, `bg-background`, `text-foreground` existem e resolvem para `#512BD4`, `#E0234E`, `#f89820` e os tons slate definidos (verificável aplicando a classe e inspecionando a cor computada).
7. Selecionar texto qualquer mostra fundo `#512BD4` com texto branco (`::selection`).
8. `document.body` usa Geist (`font-family` computada começa com Geist); um elemento com `font-display` usa Instrument Serif; um com `font-mono` usa JetBrains Mono. As três fontes são servidas por `next/font` (sem `<link>` para fonts.googleapis.com no HTML).
9. O header é `position: fixed` no topo, permanece visível após scroll, e tem `backdrop-filter` computado contendo `blur` e `saturate`, borda inferior de 1px semi-transparente e uma linha de gradiente claro→transparente no topo (`.glass::before`).
10. O header contém o texto "Antonio Cavalcante", o botão de tema e o placeholder PT/EN; o placeholder tem `aria-disabled="true"` e clicá-lo não muda nada.
11. O botão flutuante de WhatsApp é `position: fixed`, visível em qualquer posição de scroll, e é um `<a>` com `href="https://wa.me/5511947832280"`, `target="_blank"` e `rel` contendo `noopener`.
12. `page.tsx` renderiza exatamente 6 `<section>` com ids `hero`, `about`, `destaques`, `projetos`, `skills`, `contato`; a página tem scroll vertical (altura total > viewport) e navegar para `/#contato` posiciona a seção contato sem que o header fixo a cubra.
13. O overlay de grain existe (`body::after` com `background-image` SVG feTurbulence), tem `pointer-events: none` e não impede cliques no toggle de tema nem no botão de WhatsApp.
14. Com o toggle de tema, ambos os temas mantêm contraste AA entre `--foreground` e `--background` (slate-200 sobre #0a0e14 e slate-900 sobre #f8fafc — ambos > 12:1).

## Edge cases to cover
- **Primeiro paint sem JS / antes da hidratação**: nada de flash branco — o script inline do next-themes aplica `dark` antes do paint; não renderizar cores hardcoded de light fora dos tokens.
- **ThemeToggle antes de `mounted`**: renderizar placeholder de mesmo tamanho — nunca ler `resolvedTheme` para decidir o ícone no primeiro render (é `undefined` no server → mismatch).
- **prefers-reduced-motion**: smooth scroll e transições de cor desligados.
- **Grain sobre elementos interativos**: `z-index` do grain acima do conteúdo exige `pointer-events: none` — testar clique no WhatsApp e no toggle.
- **`backdrop-filter` no Safari**: incluir o prefixo `-webkit-backdrop-filter` na `.glass`.
- **Laranja `#f89820` no tema claro**: contraste insuficiente para texto sobre `#f8fafc` (~2:1) — nesta entrega ele não é usado como texto; deixar comentário no CSS avisando que em light ele é só decorativo/precisa de variante escura quando virar texto.
- **SVG data-URI**: `#` e `<>` do SVG devem ser URL-encodados ou o background quebra silenciosamente em alguns browsers.

## Existing pattern to follow
- **Fontes**: seguir o padrão já presente em `src/app/layout.tsx` (`next/font/google` com `variable: "--font-*"`, vars aplicadas no `className` do `<html>`).
- **Tokens**: seguir o padrão já presente em `src/app/globals.css` — vars puras em `:root`, mapeadas em `@theme inline` para virar utilities (`--color-x` → `bg-x`/`text-x`, `--font-x` → `font-x`). Trocar apenas o mecanismo de dark: de `@media (prefers-color-scheme)` para bloco `.dark` + `@custom-variant`.
- **Componentes**: não existe `src/components/` ainda — criar com arquivos kebab-case e exports nomeados, RSC por padrão e `"use client"` só no `theme-toggle` (regra do CLAUDE.md).
- **Referências externas**: next-themes v0.4 App Router (`attribute="class"`, `suppressHydrationWarning`, guard `mounted`): https://github.com/pacocoursey/next-themes#with-app. Tailwind v4 dark via classe (`@custom-variant dark`): https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually.

## Out of scope
- Cena 3D / React Three Fiber (nem importar `three` em lugar nenhum).
- Conteúdo real das seções (textos, cards, projetos) — só os marcadores `01 / hero` etc.
- i18n funcional — o toggle PT/EN é puramente visual e inerte.
- Framer Motion, reveals de scroll, botões magnéticos, cursor customizado, tilt de cards, refração por displacement filter (linguagem visual futura; aqui só o glass estático do header).
- Nav de âncoras no header, favicon/OG images, SEO além de `title`/`description`.
- Instalar qualquer dependência nova (ícones incluídos).
