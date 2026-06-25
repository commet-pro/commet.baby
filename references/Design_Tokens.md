---
title: Design Tokens — Commet Baby
category: reference
tags: [design-system, tokens, css, referencia]
summary: Referência dos design tokens — cores, tipografia, espaçamento, raios, sombras, movimento e fontes.
sources: ['Commet Baby Design System (bundle)']
created: 2026-06-25
updated: 2026-06-25
---

# 🎛️ Design Tokens — Commet Baby

Referência dos tokens (CSS custom properties). Fonte: `apps/web/src/styles/tokens/`.
Visão geral em [[Design_System]]; componentes que os consomem em [[UI_Components]].

---

## Cores — paleta de marca (`tokens/colors.css`)

| Token               | Hex       | Uso                              |
| ------------------- | --------- | -------------------------------- |
| `--commet-ink`      | `#0B0D14` | near-black navy — logo, headings |
| `--commet-orange`   | `#FF7A00` | o cometa — ação primária         |
| `--commet-lavender` | `#BDA3F7` | marca secundária, "B" em BABY    |
| `--commet-sky`      | `#7FC8F8` | azul-céu                         |
| `--commet-mint`     | `#7EDBC6` | acento menta/teal                |
| `--commet-yellow`   | `#FFD77A` | amarelo-estrela                  |
| `--commet-peach`    | `#FFB49A` | coral/pêssego, afeto             |
| `--commet-cream`    | `#FFF6E6` | background canvas                |

### Tints & shades (hovers/fills)

`--orange-700 #E06A00` · `--orange-600 #FF7A00` · `--orange-200 #FFD8B0` · `--orange-100 #FFE9D6`
`--lavender-600 #A687F2` · `--lavender-200 #E4DAFB` · `--lavender-100 #F1EBFD`
`--sky-600 #5BB7F2` · `--sky-200 #CFEBFC` · `--sky-100 #E7F5FE`
`--mint-600 #5FCBB2` · `--mint-200 #D2F2EA` · `--mint-100 #EBF9F5`
`--yellow-200 #FFEFC4` · `--peach-200 #FFE0D4`

### Neutros (warm-tinted, nunca cinza puro)

`--ink-900 #0B0D14` · `--ink-700 #2C3140` · `--ink-500 #5B6072` · `--ink-300 #9AA0B2` · `--ink-200 #C9CDD9` · `--ink-100 #E7E9F0` · `--paper #FFFFFF`

### Aliases semânticos

`--bg-canvas` (creme) · `--bg-canvas-alt #FFFCF5` · `--surface-card` (paper) · `--surface-sunk #FBF7EE`
`--text-strong` (ink-900) · `--text-body` (ink-700) · `--text-muted` (ink-500) · `--text-onbrand #FFF` · `--text-link` (orange-700)
`--border-soft` (ink-100) · `--border-card #F0EBDF`
`--action-primary` (orange) / `--action-primary-hover` (orange-700) · `--action-secondary` (lavender) / `--action-secondary-hover` (lavender-600)

### Status (amigável, não alarmante)

`--success #4FB286` · `--warning #FFB02E` · `--danger #F47272` · `--info` (sky)

### Acentos de personagem

`--c-cometinho` (orange) · `--c-lila` (lavender) · `--c-dino #8BC98A` · `--c-nina` (yellow) · `--c-nuvito` (sky)

---

## Tipografia (`tokens/typography.css`)

- **Famílias:** `--font-sans` / `--font-display` = `'Nunito', ui-rounded, 'Segoe UI', system-ui, sans-serif`
- **Pesos:** `--fw-regular 400` · `--fw-medium 500` · `--fw-semibold 600` · `--fw-bold 700` · `--fw-extrabold 800` · `--fw-black 900`
- **Escala:** `--fs-display 3.5rem` (56) · `--fs-h1 2.5rem` (40) · `--fs-h2 2rem` (32) · `--fs-h3 1.5rem` (24) · `--fs-h4 1.25rem` (20) · `--fs-lg 1.125rem` (18) · `--fs-body 1rem` (16) · `--fs-sm .875rem` (14) · `--fs-xs .75rem` (12)
- **Line-height:** `--lh-tight 1.1` · `--lh-snug 1.25` · `--lh-normal 1.5` · `--lh-relaxed 1.65`
- **Letter-spacing:** `--ls-display .04em` · `--ls-normal 0` · `--ls-label .08em` (eyebrows uppercase)

---

## Espaçamento, raio & layout (`tokens/spacing.css`)

- **Espaço (base 4px):** `--space-1 4` · `2 8` · `3 12` · `4 16` · `5 20` · `6 24` · `8 32` · `10 40` · `12 48` · `16 64` · `20 80` (px)
- **Raio:** `--radius-xs 6` · `--radius-sm 10` · `--radius-md 16` (controle padrão) · `--radius-lg 24` (cards) · `--radius-xl 32` · `--radius-pill 999`
- **Containers:** `--container-sm 640` · `--container-md 880` · `--container-lg 1140`
- **Altura de controle (touch-friendly):** `--control-h-sm 36` · `--control-h-md 48` · `--control-h-lg 56`

---

## Elevação, sombras & movimento (`tokens/effects.css`)

- **Sombras:** `--shadow-xs/sm/md/lg` (quentes, baixo contraste)
- **Glow colorido (luz do cometa):** `--shadow-orange` · `--shadow-lavender` · `--shadow-sky`
- **Foco:** `--ring` (laranja) · `--ring-lavender`
- **Easing:** `--ease-soft cubic-bezier(0.22,0.61,0.36,1)` · `--ease-pop cubic-bezier(0.34,1.56,0.64,1)`
- **Duração:** `--dur-fast 0.14s` · `--dur-base 0.22s` · `--dur-slow 0.4s`

---

## Fontes (`tokens/fonts.css`)

Nunito self-hosted em `apps/web/public/fonts/` (referenciada por caminho absoluto `/fonts/*`):
400, 500, 600, 700, 800, 900 normal + 400/600 itálico. Licença SIL OFL (`/fonts/OFL.txt`).
