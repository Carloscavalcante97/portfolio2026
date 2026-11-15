# Portfólio — Antônio Carlos Cavalcante

Portfólio profissional voltado a recrutadores: em 10 segundos o visitante entende quem é o dev, o que ele entrega e o que faz além do código (contratação, processo de engenharia, pílulas técnicas, propostas para clientes, mentoria). Tom visual: sóbrio, técnico e confiável.

## Posicionamento

Engenheiro de software full-stack (Pleno na Souv desde 08/2026): NestJS, Next.js e React Native no produto, Python para dados (ETL, otimização, process mining) e agentes de IA em produção. Diferencial: pipeline de entrega spec-driven com 7 agentes (planner, coder, simplifier, tester, e2e, reviewer, committer) e aprovação humana antes de commits, usado diariamente pelo time, que reduziu o tempo de correção em ~75%. Nome com acento: **Antônio**.

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

### Paleta (uma cor de destaque só)
- Verde esmeralda `#047857` (ink claro `#34d399` no dark) é a **única** cor de destaque: CTA principal, links, estado ativo, foco.
- Todo o resto em tons de slate (texto, tags, bullets, números grandes). Nada de roxo ou laranja como acento.
- Código/mono com JetBrains Mono.

### Direção visual — moderno, minimalista, liquid glass
- **Liquid glass** como linguagem central: superfícies translúcidas com `backdrop-filter: blur + saturate`, borda de 1px semi-transparente com brilho especular no topo (gradiente claro→transparente), leve refração via SVG displacement filter nos cards principais. Vidro sobre o fundo escuro azulado — não glassmorphism 2020 genérico (blur chapado); o vidro reage: highlight especular acompanha o mouse, cards inclinam sutilmente (tilt ≤ 3°).
- **Minimalismo real**: muito espaço negativo, poucas cores por tela, hierarquia por tamanho/peso tipográfico e não por caixas coloridas. Layout assimétrico com grid editorial — **nada de tudo-centralizado**.
- Estética "dev backend" com sutileza: detalhes em mono (labels, snippets), sem clichê. **Sem numeração de seções** (`01 /`), sem pontinhos pulsando, sem faixa de tecnologias rolando.
- Scroll conta uma história: hero → quem sou → o que entrego → projetos → contato.

### Anti-"cara de IA" (regras duras)
- **Proibido:** Inter como fonte única, gradientes roxo→rosa em texto de hero, emojis como ícones, cards idênticos em grid 3×N perfeitamente simétrico, sombras default do Tailwind, glow neon exagerado, hero centralizado com duas pills de botão, textos "Passionate developer crafting digital experiences".
- **Tipografia:** display com personalidade (ex.: Clash Display, General Sans ou Instrument Serif para contraste) + JetBrains Mono para acentos técnicos; corpo em uma grotesk neutra que não seja Inter (ex.: Geist ou Satoshi). Títulos grandes de verdade (clamp até ~8rem no hero).
- **Ícones:** um set consistente e fino (Lucide/Phosphor thin), nunca emoji.
- **Detalhes que vendem cuidado:** botões magnéticos discretos nos CTAs, grain/noise sutil sobre o fundo, seleção de texto com a cor de destaque.

### Fundo e animações (contenção)
- Fundo: "nebulosa contida" em shader — **um tom frio só**, opacidade baixa (~0.45 dark / ~0.35 light), gás concentrado nas bordas e coluna central limpa. **Sem** reação ao mouse, **sem** intro, **sem** estrelas, **sem** troca de cor por seção. Renderiza sob demanda (~20 fps) e para com a aba oculta.
- **Conteúdo nunca fica invisível esperando scroll**: nada de reveal com `opacity: 0`. Números aparecem já com o valor final no HTML (sem contar a partir de 0).
- Nenhuma animação em loop infinito. O terminal do pipeline roda uma vez ao entrar na tela e para em "done".
- `prefers-reduced-motion` respeitado (a cena 3D não carrega).

## Seções (uma página, scroll contínuo)

1. **Hero** — status (Engenheiro de Software Pleno na Souv · cidade), nome, título, foto (`public/antonio.jpg`), CTA principal "Entrar em contato" (e-mail) e "Ver projetos", faixa de 4 métricas (−75%, −70%, +35%, +15%).
2. **Sobre** — 2 parágrafos + ficha (cargo, base, formação com previsão 2027, idiomas).
3. **Projetos** — sistemas reais da Souv em produção, **sem citar clientes nem detalhes que os identifiquem** (nada de nome de ERP, gateway de pagamento, modelo de negócio específico ou achados de segurança). Cada card diz o papel do Antônio; trabalho de time é dito como tal.
4. **Além do código** — contratação, processo de engenharia, pílulas técnicas, propostas para clientes, mentoria. Linhas editoriais, não cards. Números só se forem reais.
5. **Pipeline** — painel com o terminal do `/pipeline` (7 agentes) + −75%, e lista de repos abertos (stack-cli, portfolio2026, Gerenciamento-De-Produtos).
6. **Experiência** — Souv (Pleno e Júnior), Denzel Eventos, Pontes Hotéis.
7. **Stack** — grupos Produto / Dados / IA e automação / Plataforma + linha "Também".
8. **Contato** — "Aberto a novas oportunidades": e-mail (principal), LinkedIn (`/in/antonio-dev-/`), GitHub e WhatsApp (`https://wa.me/5511947832280`) por último. Sem formulário.

Sem botão flutuante. Conteúdo PT/EN fica todo em `src/content/site.ts`.

## Conteúdo

- Idiomas: PT-BR e EN (toggle no header; PT default). Textos-fonte do about já existem nas duas línguas.
- Tom: direto, orientado a resultado ("reduziu X em 75%"), sem jargão vazio.

## Regras de código

- Componentes React Server Components por padrão; `"use client"` só onde há interação/3D.
- Cena 3D isolada em componente próprio com `dynamic import` (sem SSR) para não travar o LCP.
- Sem CMS, sem banco: conteúdo em arquivos TS/MDX no repo. É um site estático.
- Lighthouse alvo: 90+ em performance mesmo com Three.js (lazy load do canvas, texturas leves).
- Acessibilidade: contraste AA nos dois temas, navegação por teclado, `prefers-reduced-motion`.
