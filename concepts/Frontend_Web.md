---
title: Frontend Web (apps/web) — Estado & Estrutura
category: concept
tags: [frontend, web, nextjs]
summary: Estado e estrutura do app Next.js (apps/web) — rotas entregues, camada de integração, mock layer e dependência do backend.
sources: ['apps/web', 'PRs #38/#40/#41/#42 + Sprint 2']
created: 2026-06-25
updated: 2026-07-03
---

# 🌐 Frontend Web — Commet Baby

App Next.js 14 (App Router, TypeScript) em `apps/web`, construído sobre o [[Design_System]] e
consumindo o contrato da API do backend. Segue o [[Fluxo_de_Trabalho]] e o plano [[Passo_0_Implementacao]].

## Rotas entregues

| Rota                                    | Arquivo                            | Issue       | O quê                                                                                                     |
| --------------------------------------- | ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `/`                                     | `app/page.tsx`                     | #12         | Landing de conversão/SEO (hero, planos, personagens, selo, CTA)                                           |
| `/login` `/register` `/forgot-password` | `app/(auth)/*`                     | #9          | Autenticação (forms + validação Zod)                                                                      |
| `/home`                                 | `app/(main)/home/page.tsx`         | #15         | Catálogo de conteúdo (grid + filtros faixa/categoria/busca, destaques)                                    |
| `/story/[slug]`                         | `app/(main)/story/[slug]/page.tsx` | #15 #16 #17 | Detalhe do conteúdo com player: YouTube privacy-enhanced + modo áudio (Media Session), toggle vídeo↔áudio |
| `/profiles`                             | `app/(main)/profiles/page.tsx`     | #11         | CRUD de perfis do bebê (Avatar, idade, idioma)                                                            |
| `/plans`                                | `app/(main)/plans/page.tsx`        | #19         | Planos + checkout (ciclo mensal/anual, add-on bilíngue, redirect Stripe)                                  |
| `/design-system`                        | `app/design-system/page.tsx`       | —           | Showcase do DS (tokens + componentes)                                                                     |

As rotas autenticadas vivem no grupo `(main)` com um shell comum (`AppHeader` em `app/(main)/layout.tsx`).

## Camada de integração

- `src/lib/api.ts` — client `fetch` tipado para o envelope `{ success, data, error }` (`ApiError`, bearer token do store). Helpers: `authApi`, `profilesApi`, `contentApi`.
- **Mock layer (frontend-only):** `src/lib/mock/` (fixtures + dispatcher) ativado por `NEXT_PUBLIC_API_MOCK=1` — serve conteúdo de exemplo **sem** o backend rodando. Quando `=0`/ausente, o client bate na API real.
- `src/stores/auth.store.ts` — sessão Zustand (`user` + `accessToken`) persistida em `localStorage`.
- `src/lib/form.ts` — issues do Zod → erros por campo. `src/lib/age.ts` — rótulo de idade.
- Config: `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`) + `NEXT_PUBLIC_API_MOCK`. Ver `apps/web/.env.example`.

## Padrões adotados

- **Estilização:** CSS variables + inline styles (sem Tailwind). Componentes interativos são `'use client'`.
- **Validação:** schemas Zod de `@commet/shared` (fonte única de verdade compartilhada com o backend).
- **Stub-ready:** telas que exigem auth/dados degradam com avisos amigáveis e ficam prontas para a API real — sem mudança de código quando ela subir. Telas com dados usam o mock layer para desenvolver/demonstrar.

## Dependência do backend (raia do Gustavo)

O fluxo end-to-end de auth, perfis e conteúdo depende das issues `owner:backend` (#5–#8 auth, #10 perfis, #13 db/seed, #14 content). Não tocamos em `apps/api` nem `packages/database`; tratamos o contrato (rotas, envelope, `@commet/shared` e schema Prisma) como **read-only**.
Doc do backend (mantido pelo Gustavo): [apps/api/README.md](../apps/api/README.md).

## Status

- ✅ **Sprint 1 (Foundation):** Design system (#38), Auth (#9), Landing (#12), Perfis (#11).
- 🟢 **Sprint 2 (Core, em andamento):** Home/catálogo + mock (#15) ✅ · players (#16/#17) ✅ · planos + checkout (#19) ✅. Restante da sprint depende do backend (#18 webhooks, #20 acesso por plano, #21 admin).
