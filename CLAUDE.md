# Portfólio — Antônio Carlos Cavalcante

Portfólio profissional voltado a recrutadores: em 10 segundos o visitante entende quem é o dev, o que ele entrega e o que faz além do código (contratação, processo de engenharia, pílulas técnicas, propostas para clientes, mentoria). Tom visual: sóbrio, técnico e confiável.

## Posicionamento

Engenheiro de software full-stack (Pleno na Souv desde 08/2026): NestJS, Next.js e React Native no produto, Python para dados (ETL, otimização, process mining) e agentes de IA em produção. Diferencial: pipeline de entrega spec-driven com 7 agentes (planner, coder, simplifier, tester, e2e, reviewer, committer) e aprovação humana antes de commits, usado diariamente pelo time. Teste comparativo real (agente direto × /pipeline-v2): defeitos alto/médio 1→0, retrabalho 27 linhas→0, tokens +1%, tempo até o aceite +88% (9,5→17,9 min). **Não usar mais o "−75%"**: mostrar os números medidos, inclusive o tempo maior. Nome com acento: **Antônio**.

## Stack do site

- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (barra de progresso, manifesto, terminal, botões)
- `three`/`@react-three/*` ainda estão no package.json mas não são usados; remover quando o lockfile for atualizado
- next-themes (dark/claro — **dark é o padrão**)
- Deploy: Vercel

## Design

Referências: landonorris.com (tipografia mista, uma cor de destaque, títulos em duas linhas "On / Off Track") e verstappen.com (blocos de tela cheia, botões retangulares, barra de progresso). Valores abaixo são provisórios até existir um DESIGN.md.

### Tema e cor
- **Dark (padrão):** fundo quase-preto quente `#121411`, superfície `#191b17`, texto `#ebe9e2`, muted `#9c9d94`.
- **Light:** fundo `#f4f3ee`, superfície `#eae8e1`, texto `#141613`, muted `#55574f`.
- **Uma cor de destaque só:** verde (`#3ddc84` no dark, `#047857` no light). Usada em palavras-chave, CTA principal, links, foco e barra de progresso. Nada de roxo, laranja, gradiente ou glow.
- **Fundo liso + grão sutil.** Sem nebulosa, sem Three.js, sem vidro (glassmorphism).

### Tipografia (o visual é a tipografia)
- **Display:** Barlow Condensed 800, caixa alta (`.type-heavy`). Títulos enormes com `clamp()` (hero até ~12rem).
- **Destaque:** Instrument Serif itálica em verde (`.type-accent`) só nas palavras-chave.
- **Títulos de seção em duas linhas:** 1ª em grotesca pesada, 2ª em serifa itálica verde (`SectionHeading` recebe `[string, string]`). Projetos = "No / código", Além do código = "Fora do / código".
- **Corpo:** Geist. **Técnico/legendas:** JetBrains Mono (`.eyebrow`).

### Layout
- Grid editorial assimétrico, `max-w-7xl`. Linhas com divisória fina (`border-line`), não cards.
- Pipeline é um bloco de tela cheia (`bg-surface`) com o "0" gigante e a tabela do teste comparativo.
- Botões retangulares (raio 3px) com texto em grotesca pesada; magnetismo discreto.
- Foto em P&B com tom quente (duotone gerado de `#121411` a `#eee9e2`, recorte 4:5), grande no hero (5 de 12 colunas), legenda em mono abaixo. Nunca foto colorida com fundo saturado.
- Barra de progresso de leitura no topo (no lugar de pontos laterais).

### Movimento (contenção)
- **Conteúdo nunca fica invisível esperando scroll.** Números já vêm com o valor final no HTML.
- Manifesto: palavras começam em cinza legível (≥4,5:1) e acendem conforme o scroll; com `prefers-reduced-motion` já aparecem na cor final.
- Nenhuma animação em loop. Terminal do pipeline roda uma vez e para em "done". Sem tela de carregamento, sem carrossel.

### Anti-"cara de IA" (regras duras)
- **Proibido:** gradientes, glow, glassmorphism, emojis como ícones, grids de cards idênticos, pontinhos pulsando, numeração de seções (`01 /`), faixa de tecnologias rolando, botão flutuante, textos genéricos ("Passionate developer...").
- Ícones: traço fino consistente (estilo Lucide), nunca emoji.

## Seções (uma página, scroll contínuo)

1. **Hero** — status, nome gigante (ANTÔNIO em grotesca + *Cavalcante* em serifa verde), título, foto grande em duotone com legenda, CTA "Entrar em contato" (e-mail) e "Ver projetos", 4 métricas gigantes (0 retrabalho, −70%, +35%, +15%).
2. **Manifesto** — uma frase em caixa alta com 3 palavras-chave em serifa verde, acendendo com o scroll.
3. **Sobre** — 2 parágrafos + ficha (cargo, base, formação com previsão 2027, idiomas).
4. **Projetos** — sistemas reais da Souv em produção, **sem citar clientes nem detalhes que os identifiquem** (nada de nome de ERP, gateway de pagamento, modelo de negócio específico ou achados de segurança). Cada card diz o papel do Antônio; trabalho de time é dito como tal.
5. **Além do código** — contratação, processo de engenharia, pílulas técnicas, propostas para clientes, mentoria. Linhas editoriais, não cards. Números só se forem reais.
6. **Pipeline** — painel com o terminal do `/pipeline` (7 agentes), "0" de retrabalho e tabela do teste comparativo, e lista de repos abertos (stack-cli, portfolio2026, Gerenciamento-De-Produtos).
7. **Experiência** — Souv (Pleno e Júnior), Denzel Eventos, Pontes Hotéis.
8. **Stack** — grupos Produto / Dados / IA e automação / Plataforma + linha "Também".
9. **Contato** — frase de fechamento gigante ("Sempre entregando / de ponta a ponta."), depois: e-mail (principal), LinkedIn (`/in/antonio-dev-/`), GitHub e WhatsApp (`https://wa.me/5511947832280`) por último. Sem formulário.

Sem botão flutuante. Conteúdo PT/EN fica todo em `src/content/site.ts`.

## Conteúdo

- Idiomas: PT-BR e EN (toggle no header; PT default). Textos-fonte do about já existem nas duas línguas.
- Tom: direto, orientado a resultado, só com números medidos, sem jargão vazio.

## Regras de código

- Componentes React Server Components por padrão; `"use client"` só onde há interação/3D.
- Sem CMS, sem banco: conteúdo em arquivos TS/MDX no repo. É um site estático.
- Lighthouse alvo: 90+ em performance.
- Acessibilidade: contraste AA nos dois temas, navegação por teclado, `prefers-reduced-motion`.
