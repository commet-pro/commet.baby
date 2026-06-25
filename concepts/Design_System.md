---
title: Design System — Commet Baby
category: concept
tags: [design-system, frontend, marca, ui]
summary: Marca e sistema de UI da Commet Baby — voz, fundamentos visuais, personagens e onde o DS vive no código.
sources: ['Commet Baby Design System (bundle)']
created: 2026-06-25
updated: 2026-06-25
---

# 🎨 Design System — Commet Baby

> A marca & sistema de UI da Commet Baby: seguro, afetivo e imaginativo, guiado por um
> cometa-mascote e um elenco de personagens pastel.

**Tagline:** _Pequenas **descobertas**, grandes **começos**._ · _Aprender, **sonhar** e **crescer**._
**Valores:** Seguro · Afetivo · Inteligente · Imaginativo · Crescimento.

Implementado em [[Passo_0_Implementacao]] como a fundação visual do `apps/web`.

---

## Onde vive no código

| Camada                       | Local                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Tokens (CSS variables)       | `apps/web/src/styles/tokens/*.css`                                           |
| Manifesto global             | `apps/web/src/styles/globals.css` (importado em `app/layout.tsx`)            |
| Componentes React            | `apps/web/src/components/ui/` (barrel `index.ts`)                            |
| Fontes (Nunito, self-hosted) | `apps/web/public/fonts/` (SIL OFL)                                           |
| Assets de marca              | `apps/web/public/brand/` (logos, personagens, ícones, badges, padrões, selo) |
| Showcase ao vivo             | rota `/design-system`                                                        |

Detalhe dos valores em [[Design_Tokens]]. Catálogo de componentes em [[UI_Components]].

---

## Voz & tom

- **Idioma:** Português do Brasil. Quente, gentil, encorajador — fala _para_ a família/criança.
- **Voz:** afetiva e brincalhona, porém calma; nunca alta, "vendedora" ou infantilizada além da suavidade da marca. Tranquilizadora para os pais ("Conteúdo seguro · aprovado por famílias").
- **Caixa:** sentence case no corpo e na maioria da UI. O wordmark do logo é UPPERCASE ("COMMET BABY"). Eyebrows/labels usam UPPERCASE com tracking largo (`.cb-eyebrow`).
- **Recurso de destaque:** uma ou duas palavras-chave em cor de marca — _Pequenas **descobertas**, grandes **começos**._
- **Verbos:** imperativos-convite — _Começar agora, Explorar, Saiba mais, Ouvir, Descobrir._
- **Tamanho:** curto. Títulos 2–5 palavras; linhas de apoio uma frase.
- **Emoji:** raríssimo, só como brilho de acento (✨); nunca como iconografia funcional.
- **Personagens como voz:** conteúdo enquadrado como "com a Lila" / "com o Dino". Cometinho é "nosso guia".

---

## Fundamentos visuais

- **Paleta:** canvas creme (`#FFF6E6`) ancorado por tinta profunda (`#0B0D14`) e a laranja-cometa (`#FF7A00`) como ação primária. Família pastel (lavanda, céu, menta, amarelo, pêssego) carrega o "céu de cometas" e tinge superfícies/badges. Neutros são _warm-tinted_, nunca cinza puro.
- **Tipografia:** uma única família, **Nunito** — terminais arredondados são toda a personalidade. Títulos ExtraBold (800), subtítulos SemiBold (600), corpo Regular (400).
- **Forma:** tudo arredondado e suave. Controles são pílulas (`--radius-pill`); cards usam 24px (`--radius-lg`). Sem cantos vivos.
- **Profundidade:** sombras suaves, de baixo contraste e levemente quentes. Controles primários carregam um "glow" colorido (laranja/lavanda/céu) — o motivo da luz do cometa.
- **Movimento:** gentil. Fades em ease-out (`--ease-soft`); toques/toggles em mola suave (`--ease-pop`) — um pequeno "pop", nunca um bounce agressivo. Durações 0.14–0.4s.
- **Imagem:** soft 3D / aquarela, quente, com brilho, rostos expressivos. Aconchegante, nunca flat-vetor-corporativo.

## Iconografia

- **Ícones soft-3D ilustrados** (`public/brand/icons/`) são a linguagem de ícones da marca: objetos glossy, arredondados, claymórficos. Usar os PNGs — **nunca redesenhar**.
- **Badges de conquista** (`public/brand/badges/`) — medalhões circulares (explorer, reading, music, achievement, safety) para gamificação e selos de confiança.
- Para ícones funcionais de linha (nav, busca, play, chevrons), **Phosphor** (rounded) ou **Lucide** combinam com o traço arredondado — sinalizar como substituição.

---

## Personagens

| Personagem | Quem é                | Cor (token)               |
| ---------- | --------------------- | ------------------------- |
| Cometinho  | Cometa, "nosso guia"  | `--c-cometinho` (laranja) |
| Lila       | Coruja roxa curiosa   | `--c-lila` (lavanda)      |
| Dino       | Dinossauro explorador | `--c-dino` (verde)        |
| Nina       | Coelhinha sonhadora   | `--c-nina` (amarelo)      |
| Nuvito     | Nuvem amigável        | `--c-nuvito` (céu)        |

---

## Procedência

- Construído a partir das duas pranchas de identidade enviadas pelo usuário (master brand board + assets sheet) via bundle "Commet Baby Design System".
- Nenhuma base de código de produção ou Figma foi fornecida; logos, personagens, ícones, badges, padrões e o selo são os assets oficiais da marca.
- Nunito é self-hosted (pesos 400/500/600/700/800/900 + itálico 400/600), declarada via `@font-face` e licenciada sob a SIL OFL.

## Caveats

- O bundle entrega **fundações + componentes + assets**; telas de produto devem ser construídas contra ele conforme necessário.
- Os componentes foram portados de `.jsx` para `.tsx` tipado, preservando a lógica e os inline styles que referenciam as CSS variables.
