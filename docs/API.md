---
title: API — Commet Baby
category: doc
summary: Documentação da API REST — endpoints, contratos de request/response e convenções.
updated: 2026-06-25
---

# 🔌 API — Commet Baby

> Contrato da API REST entre Frontend e Backend. Este documento é a fonte de verdade para integração.

---

## Base URL

| Ambiente   | Base URL                                 |
| ---------- | ---------------------------------------- |
| Local      | `http://localhost:4000/api/v1`           |
| Staging    | `https://api.staging.commet.baby/api/v1` |
| Production | `https://api.commet.baby/api/v1`         |

## Autenticação

Todos os endpoints protegidos requerem o header:

```
Authorization: Bearer <access_token>
```

Tokens JWT com expiração de 15 minutos. Refresh tokens com rotação automática.

## Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 100
  }
}
```

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Email ou senha inválidos",
    "statusCode": 401
  }
}
```

---

## 🔐 Auth Endpoints

### `POST /auth/register`

Registrar novo usuário.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123!",
  "name": "Nome do Pai/Mãe"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "name": "..." },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### `POST /auth/login`

Login com credenciais.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123!"
}
```

### `POST /auth/logout`

🔒 Logout e invalidação do token.

### `POST /auth/refresh`

Renovar access token.

**Body:**

```json
{
  "refreshToken": "..."
}
```

### `POST /auth/forgot-password`

Solicitar reset de senha.

**Body:**

```json
{
  "email": "user@example.com"
}
```

### `POST /auth/reset-password`

Resetar senha com token.

**Body:**

```json
{
  "token": "...",
  "newPassword": "newSecurePassword!"
}
```

### `GET /auth/verify-email/:token`

Verificar email via link enviado.

---

## 👤 User Endpoints

### `GET /users/me` 🔒

Retorna o perfil do usuário autenticado.

### `PATCH /users/me` 🔒

Atualizar perfil do usuário.

**Body:**

```json
{
  "name": "Novo Nome",
  "avatarUrl": "..."
}
```

### `DELETE /users/me` 🔒

Deletar conta (LGPD right to erasure).

---

## 👶 Baby Profile Endpoints

### `GET /profiles` 🔒

Listar perfis do usuário.

### `POST /profiles` 🔒

Criar perfil do bebê.

**Body:**

```json
{
  "name": "Bebê",
  "birthDate": "2026-01-15",
  "avatarId": "avatar_star",
  "languagePref": "PT_BR"
}
```

### `GET /profiles/:id` 🔒

Detalhes do perfil.

### `PATCH /profiles/:id` 🔒

Atualizar perfil.

### `DELETE /profiles/:id` 🔒

Deletar perfil.

### `GET /profiles/:id/progress` 🔒

Progresso de aprendizagem do perfil.

---

## 📚 Content Endpoints

### `GET /content` 🔒

Listar conteúdos com filtros.

**Query Params:**
| Param | Tipo | Exemplo | Descrição |
|---|---|---|---|
| `ageGroup` | enum | `NEWBORN_12M` | Filtrar por faixa |
| `category` | enum | `STORY` | Filtrar por categoria |
| `language` | enum | `PT_BR` | Filtrar por idioma |
| `search` | string | `cores` | Busca textual |
| `page` | number | `1` | Paginação |
| `perPage` | number | `20` | Itens por página |

### `GET /content/featured` 🔒

Conteúdos em destaque.

### `GET /content/:slug` 🔒

Detalhes do conteúdo. Valida acesso pelo plano do usuário.

### `GET /content/history` 🔒

Histórico de visualização.

### `POST /content/:id/watch` 🔒

Registrar visualização/progresso.

**Body:**

```json
{
  "profileId": "...",
  "watchedSeconds": 120,
  "completed": false,
  "language": "PT_BR",
  "mode": "VIDEO"
}
```

---

## 🎵 Playlist Endpoints

### `GET /playlists` 🔒

Listar playlists.

### `GET /playlists/:slug` 🔒

Detalhes da playlist com conteúdos.

---

## 💳 Billing Endpoints

### `GET /billing/plans`

Listar planos disponíveis (público).

### `POST /billing/checkout` 🔒

Criar Stripe Checkout Session.

**Body:**

```json
{
  "planId": "ESTRELA",
  "billingCycle": "MONTHLY",
  "hasBilingualAddon": false,
  "successUrl": "https://commet.baby/checkout/success",
  "cancelUrl": "https://commet.baby/plans"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.stripe.com/..."
  }
}
```

### `POST /billing/portal` 🔒

Criar sessão do Stripe Customer Portal.

### `GET /billing/subscription` 🔒

Status da assinatura atual.

### `POST /billing/addon/bilingual` 🔒

Adicionar/remover add-on bilíngue.

### `POST /webhooks/stripe`

Webhook handler do Stripe. **Não requer auth JWT** (validação por signature).

---

## 📊 Analytics Endpoints

### `GET /analytics/usage` 🔒

Tempo de uso diário/semanal.

**Query Params:** `profileId`, `period` (`daily` | `weekly`)

### `GET /analytics/goals` 🔒

Progresso nas metas de aprendizagem.

**Query Params:** `profileId`

---

## 🔧 Admin Endpoints

> 🔒 Requer `role: ADMIN`

### `GET /admin/content`

Listar todos os conteúdos (incluindo drafts).

### `POST /admin/content`

Criar conteúdo.

### `PATCH /admin/content/:id`

Editar conteúdo.

### `DELETE /admin/content/:id`

Deletar conteúdo.

### `POST /admin/content/:id/publish`

Publicar conteúdo (DRAFT → PUBLISHED).

### `GET /admin/users`

Listar usuários.

### `GET /admin/dashboard`

Métricas de negócio (MRR, churn, MAU).

### `POST /admin/upload`

Upload de arquivo (audio/thumbnail) para S3/R2.

---

## Enums Reference

```typescript
enum AgeGroup {
  NEWBORN_12M = 'NEWBORN_12M', // 0-12 meses
  TODDLER_1_2Y = 'TODDLER_1_2Y', // 1-2 anos
  PRESCHOOL_2_3Y = 'PRESCHOOL_2_3Y', // 2-3 anos
}

enum ContentCategory {
  STORY = 'STORY',
  MUSIC = 'MUSIC',
  LULLABY = 'LULLABY',
  SENSORY = 'SENSORY',
  ROUTINE = 'ROUTINE',
  LEARNING = 'LEARNING',
  NATURE = 'NATURE',
}

enum Language {
  PT_BR = 'PT_BR',
  EN = 'EN',
}

enum SubscriptionPlan {
  COMETA = 'COMETA',
  ESTRELA = 'ESTRELA',
  GALAXIA = 'GALAXIA',
}

enum BillingCycle {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

enum PlayMode {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}
```
