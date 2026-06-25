---
title: Hot Cache
updated: 2026-06-25
---

# Hot Cache

_A ~500-word semantic snapshot of recent activity. Updated after every major write operation._

## Recent Activity

- [2026-06-25] Sprint 1 do front concluída: auth pages (#9), landing (#12) e perfis (#11) entregues e mergeados em `develop`. App roda em http://localhost:3000. Ver [[Frontend_Web]].
- [2026-06-25] Convenção **Issue Sync** adicionada ao CONTRIBUTING + template de PR. Ver [[Fluxo_de_Trabalho]].
- [2026-06-25] Design System da Commet Baby importado para `apps/web` (tokens, 9 componentes, Nunito self-hosted, assets de marca, showcase em `/design-system`).
- [2026-06-25] Corrigido `pnpm-workspace.yaml` (UTF-16 → UTF-8) e instalado pnpm 10.12.1; workspace agora resolve apps/api, packages/database, packages/shared.
- [2026-06-24] INIT — vault criado.

## Active Threads

- Aguardando o backend (Gustavo) implementar auth e perfis reais (#5–#8, #10) para o fluxo end-to-end; o front já está pronto contra o contrato.
- Próxima fatia de front: Sprint 2 — Home com grid de conteúdo (#15), players (#16/#17), planos+checkout (#19).
- Passo 0 de Implementação do Commet Baby.

## Key Takeaways

- O Design System vive em `apps/web`: tokens em `src/styles/tokens/`, componentes em `src/components/ui/`, assets em `public/brand/`, fontes em `public/fonts/`. Ver [[Design_System]], [[Design_Tokens]], [[UI_Components]].
- Estilização é CSS variables + inline styles (sem Tailwind). Componentes são `'use client'`.
- Integração com a API: `src/lib/api.ts` (envelope `{success,data,error}`) + `src/stores/auth.store.ts` (Zustand). Backend em `NEXT_PUBLIC_API_URL`. Ver [[Frontend_Web]].
- Backend (`apps/api`, Gustavo) ainda é **scaffold + stubs**; tratamos o contrato como read-only e não tocamos na raia dele.
- Marca: canvas creme, laranja-cometa como ação primária, pastéis, tudo arredondado, Nunito.
- Stack: monorepo pnpm + turbo, Next.js 14, Fastify, Prisma.
