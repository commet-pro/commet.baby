---
title: Arquitetura — Commet Baby
category: doc
summary: Arquitetura técnica — camadas, monorepo, módulos, schema Prisma e contrato de API.
updated: 2026-06-25
---

# 🏗️ Arquitetura — Commet Baby

> Documento de referência para a arquitetura técnica da plataforma.

---

## Visão Geral

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  ┌───────────────┐    ┌───────────────┐                 │
│  │  Web App      │    │  PWA          │                 │
│  │  (Next.js)    │    │  (Service SW) │                 │
│  └───────┬───────┘    └───────┬───────┘                 │
│          └──────────┬─────────┘                         │
└─────────────────────┼───────────────────────────────────┘
                      │
┌─────────────────────┼───────────────────────────────────┐
│                 API LAYER                               │
│  ┌──────────────────┴──────────────────┐                │
│  │  BFF (Next.js API Routes)           │                │
│  └──────────────────┬──────────────────┘                │
│  ┌──────────────────┴──────────────────┐                │
│  │  Backend API (Node.js + Fastify)    │                │
│  └──────────────────┬──────────────────┘                │
└─────────────────────┼───────────────────────────────────┘
                      │
┌─────────────────────┼───────────────────────────────────┐
│              SERVICES LAYER                             │
│  ┌──────┐  ┌────────┐  ┌────────┐  ┌─────────┐         │
│  │ Auth │  │Content │  │Billing │  │Analytics│         │
│  └──┬───┘  └───┬────┘  └───┬────┘  └────┬────┘         │
└─────┼──────────┼────────────┼────────────┼──────────────┘
      │          │            │            │
┌─────┼──────────┼────────────┼────────────┼──────────────┐
│              DATA LAYER                                 │
│  ┌──┴──────────┴──┐  ┌─────┴──┐  ┌──────┴────┐         │
│  │  PostgreSQL    │  │ Redis  │  │ S3 / R2   │         │
│  │  (via Prisma)  │  │ Cache  │  │ Storage   │         │
│  └────────────────┘  └────────┘  └───────────┘         │
└─────────────────────────────────────────────────────────┘
                      │
┌─────────────────────┼───────────────────────────────────┐
│           EXTERNAL SERVICES                             │
│  ┌────────┐  ┌─────────┐  ┌────────┐  ┌──────────┐     │
│  │ Stripe │  │ YouTube │  │ Resend │  │Cloudflare│     │
│  └────────┘  └─────────┘  └────────┘  └──────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Princípios Arquiteturais

1. **Monorepo** — Um repositório, múltiplos pacotes. Frontend e backend compartilham tipos e validações.
2. **TypeScript Everywhere** — Tipagem estática em toda a stack para reduzir bugs e melhorar a comunicação entre os devs.
3. **Separation of Concerns** — Cada módulo (Auth, Content, Billing, Analytics) é isolado com seu próprio controller/service/routes.
4. **API-First** — O backend é uma API REST stateless. O frontend é um consumer dessa API.
5. **Privacy by Default** — LGPD/COPPA compliance desde o dia 1. Dados de menores nunca são coletados diretamente.

## Monorepo Structure

```
commet.baby/
├── apps/
│   ├── web/              # Next.js 14+ (App Router) — Frontend
│   └── api/              # Node.js + Fastify — Backend API
├── packages/
│   ├── shared/           # @commet/shared — Tipos, constantes, validators
│   └── database/         # @commet/database — Prisma schema & client
├── docs/                 # Documentação
└── .github/              # CI/CD workflows & templates
```

### Package Dependencies

```
@commet/shared ──────► apps/web
       │
       └─────────────► apps/api

@commet/database ────► apps/api
       │
       └─────────────► apps/web (apenas tipos gerados)
```

## Módulos

### Auth Module

- Registro/Login com email + senha
- OAuth (Google, Apple) — Sprint 2
- JWT com refresh token rotation
- Rate limiting em endpoints sensíveis

### Content Module

- CRUD de conteúdo (admin)
- YouTube embedded player (privacy-enhanced mode)
- Audio player com background playback
- Filtros por faixa etária, categoria, idioma
- Controle de acesso por plano de assinatura

### Billing Module

- Stripe Checkout Sessions (hosted)
- Webhooks para sincronização de estado
- Stripe Customer Portal (self-service)
- Suporte a PIX, Boleto e Cartão

### Analytics Module

- Tempo de uso (diário/semanal)
- Histórico de visualizações
- Progresso nas metas de aprendizagem
- Dashboard parental

## Decisões Técnicas

| Decisão              | Escolha              | Justificativa                                    |
| -------------------- | -------------------- | ------------------------------------------------ |
| **Monorepo tool**    | Turborepo            | Performance, cache, Vercel ecosystem             |
| **Package manager**  | pnpm                 | Mais rápido que npm/yarn, workspaces nativo      |
| **ORM**              | Prisma               | Type-safe, migrations, schema como contrato      |
| **State management** | Zustand              | Leve, simples, sem boilerplate                   |
| **Validation**       | Zod                  | Runtime + compile-time validation, compartilhado |
| **YouTube embed**    | youtube-nocookie.com | COPPA/LGPD compliance                            |

## Ambientes

| Ambiente       | URL                                 | Propósito       |
| -------------- | ----------------------------------- | --------------- |
| **Local**      | `localhost:3000` / `localhost:4000` | Desenvolvimento |
| **Staging**    | `staging.commet.baby`               | QA e testes     |
| **Production** | `commet.baby`                       | Produção        |
