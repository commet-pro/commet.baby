---
title: Frontend Web (apps/web) — Estado & Estrutura
tags: [frontend, web, nextjs, commet.baby]
---

# 🌐 Frontend Web — Commet Baby

App Next.js 14 (App Router, TypeScript) em `apps/web`, construído sobre o [[Design_System]] e
consumindo o contrato da API do backend. Segue o [[Fluxo_de_Trabalho]] e o plano [[Passo_0_Implementacao]].

## Rotas entregues

| Rota                                    | Arquivo                        | Issue | O quê                                                           |
| --------------------------------------- | ------------------------------ | ----- | --------------------------------------------------------------- |
| `/`                                     | `app/page.tsx`                 | #12   | Landing de conversão/SEO (hero, planos, personagens, selo, CTA) |
| `/login` `/register` `/forgot-password` | `app/(auth)/*`                 | #9    | Autenticação (forms + validação Zod)                            |
| `/profiles`                             | `app/(main)/profiles/page.tsx` | #11   | CRUD de perfis do bebê (Avatar, idade, idioma)                  |
| `/design-system`                        | `app/design-system/page.tsx`   | —     | Showcase do DS (tokens + componentes)                           |

## Camada de integração

- `src/lib/api.ts` — client `fetch` tipado para o envelope do backend `{ success, data, error }`
  (`ApiError`, bearer token do store). Helpers: `authApi`, `profilesApi`.
- `src/stores/auth.store.ts` — sessão Zustand (`user` + `accessToken`) persistida em `localStorage`.
- `src/lib/form.ts` — issues do Zod → erros por campo. `src/lib/age.ts` — rótulo de idade.
- Base da API: `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`).

## Padrões adotados

- **Estilização:** CSS variables + inline styles (sem Tailwind). Componentes interativos são `'use client'`.
- **Validação:** schemas Zod de `@commet/shared` (fonte única de verdade compartilhada com o backend).
- **Stub-ready:** como o backend ainda é stub (não emite token / não persiste), as telas que exigem auth
  degradam com avisos amigáveis e ficam prontas para a API real — sem mudança de código quando ela subir.

## Dependência do backend (raia do Gustavo)

O fluxo end-to-end de auth e perfis depende das issues `owner:backend` (#5–#8 auth, #10 perfis, #13 db/seed).
Não tocamos em `apps/api` nem `packages/database`; tratamos o contrato (rotas, envelope, `@commet/shared` e schema Prisma) como **read-only**.

## Status (Sprint 1 — Foundation: frontend completo)

✅ Design system (#38) · ✅ Auth pages (#9) · ✅ Landing (#12) · ✅ Perfis (#11).
Próximo (Sprint 2): Home com grid de conteúdo (#15), players (#16/#17), planos+checkout (#19).
