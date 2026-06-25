---
title: Hot Cache
updated: 2026-06-25
---

# Hot Cache

_A ~500-word semantic snapshot of recent activity. Updated after every major write operation._

## Recent Activity

- [2026-06-25] Design System da Commet Baby importado para `apps/web` (tokens, 9 componentes, Nunito self-hosted, assets de marca, showcase em `/design-system`).
- [2026-06-25] Corrigido `pnpm-workspace.yaml` (UTF-16 → UTF-8) e instalado pnpm 10.12.1; workspace agora resolve apps/api, packages/database, packages/shared.
- [2026-06-24] INIT — vault criado.

## Active Threads

- Fundação do frontend (`apps/web`, Next.js 14 App Router) sobre o Design System.
- Passo 0 de Implementação do Commet Baby.

## Key Takeaways

- O Design System vive em `apps/web`: tokens em `src/styles/tokens/`, componentes em `src/components/ui/`, assets em `public/brand/`, fontes em `public/fonts/`. Ver [[Design_System]], [[Design_Tokens]], [[UI_Components]].
- Estilização é CSS variables + inline styles (sem Tailwind). Componentes são `'use client'`.
- Marca: canvas creme, laranja-cometa como ação primária, pastéis, tudo arredondado, Nunito.
- Stack: monorepo pnpm + turbo, Next.js 14, Fastify, Prisma.
