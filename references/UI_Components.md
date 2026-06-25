---
title: UI Components — Commet Baby Design System
category: reference
tags: [design-system, componentes, react, referencia]
summary: Catálogo dos 9 componentes do design system com props, estados e caminhos de import.
sources: ['Commet Baby Design System (bundle)']
created: 2026-06-25
updated: 2026-06-25
---

# 🧩 UI Components — Commet Baby

Catálogo dos 9 componentes do design system. Fonte: `apps/web/src/components/ui/`.
Tokens consumidos em [[Design_Tokens]]; visão geral em [[Design_System]].

```tsx
import { Button, Card, Badge, Input, Checkbox, Switch, Avatar, ProgressBar, Tabs } from '@/components/ui';
```

Todos são React client components (`'use client'`) com **inline styles** que referenciam as CSS variables.
São o port tipado (`.tsx`) do bundle original (`.jsx` + `.d.ts`, namespace `CommetBabyDesignSystem_978bbb`).

---

## core/

### `Button`

Pílula de ação com glow colorido e mola no clique.

- `variant?: 'primary' | 'secondary' | 'soft' | 'ghost'` (default `primary`)
- `size?: 'sm' | 'md' | 'lg'` (default `md`)
- `iconLeft? / iconRight?: ReactNode` · `fullWidth?: boolean` · `disabled?: boolean`
- estende `ButtonHTMLAttributes<HTMLButtonElement>`

### `Card`

Superfície arredondada (24px), sombra quente, borda fina; eleva 2px no hover quando `interactive`.

- `tone?: 'paper' | 'sunk' | 'lavender' | 'sky' | 'mint' | 'orange'` (default `paper`)
- `padding?: string` (default `var(--space-6)`) · `interactive?: boolean`
- estende `HTMLAttributes<HTMLDivElement>`

### `Badge`

Rótulo em pílula para status/categoria/nível.

- `tone?: 'orange' | 'lavender' | 'sky' | 'mint' | 'yellow' | 'peach' | 'neutral' | 'success'` (default `lavender`)
- `solid?: boolean` (preenchido) · `dot?: boolean` (ponto de status)
- estende `HTMLAttributes<HTMLSpanElement>`

> ⚠️ `Badge` aceita `yellow`/`peach`/`neutral`/`success` que **não** existem em `Card.tone`. Ao reusar um tom para Card + Badge, separe `cardTone` e `badgeTone`.

## forms/

### `Input`

Campo de texto em pílula com borda suave, anel de foco, label/hint/erro e ícone leading.

- `label?: string` · `hint?: string` · `error?: string` (vermelho, substitui o hint) · `iconLeft?: ReactNode`
- estende `InputHTMLAttributes<HTMLInputElement>` (exceto `style`, que é `CSSProperties`)

### `Checkbox`

Checkbox arredondado com pop ao marcar; fill laranja quando marcado. **Controlado.**

- `checked?: boolean` · `onChange?: (next: boolean) => void` · `label?: ReactNode` · `disabled?: boolean`

### `Switch`

Toggle em pílula com mola no thumb; trilho laranja quando ligado. **Controlado.**

- `checked?: boolean` · `onChange?: (next: boolean) => void` · `label?: ReactNode` · `disabled?: boolean`

## feedback/

### `Avatar`

Avatar redondo (imagem ou iniciais) com anel de marca opcional.

- `src? / alt? / name? / initials?` · `size?: 'sm' | 'md' | 'lg' | 'xl' | number` (36/48/64/88)
- `ring?: 'cometinho' | 'lila' | 'dino' | 'nina' | 'nuvito' | 'orange' | 'lavender' | 'sky' | 'mint' | 'none' | string` (default `lavender`)
- Os cinco personagens têm um tom de anel nomeado.

### `ProgressBar`

Trilho de progresso para XP, níveis e conclusão de lições.

- `value?: number` · `max?: number` (default 100) · `tone?: 'orange' | 'lavender' | 'sky' | 'mint'` (default `lavender`)
- `height?: number` (default 12) · `showLabel?: boolean` (caption "value / max XP")

### `Tabs`

Controle segmentado em pílula; aba ativa é um "lozenge" branco sobre trilho afundado.

- `tabs: (TabItem | string)[]` onde `TabItem = { id: string; label: ReactNode }`
- `value?: string` · `onChange?: (id: string) => void`

---

## Showcase

Rota `/design-system` (`apps/web/src/app/design-system/page.tsx`) renderiza tokens (cores, tipografia, raio/sombras), todos os componentes em seus estados, os assets de marca e os planos reais (`SubscriptionPlan` de `@commet/shared`).
Rodar: `pnpm --filter web dev` → http://localhost:3000/design-system
