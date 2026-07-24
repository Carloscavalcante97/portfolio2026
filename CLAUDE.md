# Portfólio — Antonio Carlos Cavalcante

Portfólio profissional que funciona como propaganda: o visitante entende em 10 segundos quem é o dev, o que ele entrega, e tem um botão de contato sempre à mão.

## Posicionamento

Full-stack engineer com alma de backend (C#, Java, NestJS). Constrói sistemas em produção de ponta a ponta e se importa com código que sobrevive ao contato com usuários reais. Diferencial: pipeline de desenvolvimento assistido por IA (spec-driven, 4 agentes: planner, coder, tester, reviewer) que reduziu tempo de correção em ~75%.

## Stack do site

- Next.js 14+ (App Router) + TypeScript
- Three.js via React Three Fiber + drei (cenas 3D e efeitos de scroll)
- Tailwind CSS
- Framer Motion (animações de entrada/scroll fora do canvas 3D)
- next-themes (dark/claro — **dark é o padrão**)
- Deploy: Vercel

## Design

### Tema
- **Dark (padrão):** fundo quase-preto azulado (tipo `#0a0e14` / slate-950), remetendo a terminal/IDE de backend.
- **Light:** neutro claro, mesmo sistema de acentos.
- Toggle visível no header, persistido.

### Paleta de acentos (remete ao ecossistema backend)
- Roxo `#512BD4` (roxo .NET/C#) — cor primária
- Verde esmeralda `#047857` (ink claro `#34d399` no dark) — CTAs e destaques
- Laranja `#f89820` (Java) — acentos secundários/detalhes
- Texto em tons de slate; código/mono com fonte tipo JetBrains Mono

### Direção visual — moderno, minimalista, liquid glass
- **Liquid glass** como linguagem central: superfícies translúcidas com `backdrop-filter: blur + saturate`, borda de 1px semi-transparente com brilho especular no topo (gradiente claro→transparente), leve refração via SVG displacement filter nos cards principais. Vidro sobre o fundo escuro azulado — não glassmorphism 2020 genérico (blur chapado); o vidro reage: highlight especular acompanha o mouse, cards inclinam sutilmente (tilt ≤ 3°).
- **Minimalismo real**: muito espaço negativo, poucas cores por tela, hierarquia por tamanho/peso tipográfico e não por caixas coloridas. Layout assimétrico com grid editorial — **nada de tudo-centralizado**.
- Estética "dev backend" com sutileza: detalhes em mono (labels, números de seção `01/`, snippets), sem clichê (nada de Matrix, nada de emoji decorativo).
- Scroll conta uma história: hero → quem sou → o que entrego → projetos → contato.

### Anti-"cara de IA" (regras duras)
- **Proibido:** Inter como fonte única, gradientes roxo→rosa em texto de hero, emojis como ícones, cards idênticos em grid 3×N perfeitamente simétrico, sombras default do Tailwind, glow neon exagerado, hero centralizado com duas pills de botão, textos "Passionate developer crafting digital experiences".
- **Tipografia:** display com personalidade (ex.: Clash Display, General Sans ou Instrument Serif para contraste) + JetBrains Mono para acentos técnicos; corpo em uma grotesk neutra que não seja Inter (ex.: Geist ou Satoshi). Títulos grandes de verdade (clamp até ~8rem no hero).
- **Ícones:** um set consistente e fino (Lucide/Phosphor thin), nunca emoji.
- **Detalhes artesanais que vendem cuidado:** cursor customizado discreto, botões magnéticos nos CTAs, micro-interações com spring física (não ease genérico), grain/noise sutil sobre o fundo, seleção de texto com cor da marca.

### Animações
- Hero Three.js: cena shader-based leve (ex.: malha de vidro/fluido refrativa ou campo de partículas com ruído) reagindo a scroll e mouse; câmera scroll-driven entre seções.
- Reveals por scroll com stagger (Framer Motion + IntersectionObserver), parallax leve entre camadas, números que contam ao entrar em viewport (o "−75%" merece isso).
- Transição dark/light animada (não um flash — o vidro muda de tonalidade).
- `prefers-reduced-motion` respeitado e fallback estático em mobile fraco.

## Seções (uma página, scroll contínuo)

1. **Hero** — nome, título ("Full-stack Engineer — Backend em C#, Java e NestJS"), cena 3D, dois CTAs imediatos: "Fale comigo" (WhatsApp) e "Ver projetos".
2. **About** — versão enxuta do texto abaixo (fonte da verdade em `content/about`), com badges da stack.
3. **Destaques / O que venho entregando** — 4 cards:
   - Módulo full-stack de gestão da qualidade (NestJS + PostgreSQL, registros imutáveis, numeração sequencial atômica, Next.js, monorepo pnpm + Turborepo)
   - Pipeline de dev assistido por IA — 4 agentes, ~75% menos tempo de correção (destaque visual maior; é o diferencial)
   - Refatoração de backend + integração WhatsApp + CI/CD para plataforma B2B de eventos
   - Manutenção e evolução de sistemas .NET + SQL Server em produção
4. **Projetos** — cards curados do GitHub (lista abaixo), cada um com stack, descrição de 1 linha orientada a resultado, link pro repo e demo quando houver.
5. **Skills** — TypeScript, AI Integration/LLM APIs, Node.js, Docker/Cloud, Next.js (as 5 do LinkedIn) + stack completa em badges menores.
6. **Contato** — CTA forte: botões diretos WhatsApp (`https://wa.me/5511947832280`), e-mail (antonio.developer@icloud.com), LinkedIn, GitHub. Sem formulário — contato direto converte mais.

Botão flutuante de WhatsApp presente durante todo o scroll.

## Projetos curados (GitHub: Carloscavalcante97)

Apenas estes — o resto do perfil é exercício de curso e não entra:

| Repo | Pitch |
|---|---|
| `Gerenciamento-De-Produtos` | Monorepo full-stack Java 17 + Spring Boot + React + Docker Compose, entregue em desafio técnico de 2 dias |
| `CashFlow` | API C#/.NET de controle financeiro com relatórios e validações de integridade |
| `BarberBoss` | API .NET 8 com DDD para gestão de barbearias |
| `CSharp-TechLibrary` | API .NET 9, DDD, EF, FluentValidation, Swagger |
| `Api-Eventos` | API REST TypeScript de venda de ingressos com validação robusta |
| `pipeline-Claude` | Pipeline de dev com 4 agentes IA (planner/coder/tester/reviewer) — vitrine do diferencial |

> Pendência: `pipeline-Claude` precisa de README/descrição no GitHub antes do lançamento.

## Conteúdo

- Idiomas: PT-BR e EN (toggle no header; PT default). Textos-fonte do about já existem nas duas línguas.
- Tom: direto, orientado a resultado ("reduziu X em 75%"), sem jargão vazio.

## Regras de código

- Componentes React Server Components por padrão; `"use client"` só onde há interação/3D.
- Cena 3D isolada em componente próprio com `dynamic import` (sem SSR) para não travar o LCP.
- Sem CMS, sem banco: conteúdo em arquivos TS/MDX no repo. É um site estático.
- Lighthouse alvo: 90+ em performance mesmo com Three.js (lazy load do canvas, texturas leves).
- Acessibilidade: contraste AA nos dois temas, navegação por teclado, `prefers-reduced-motion`.
