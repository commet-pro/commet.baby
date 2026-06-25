# 🚀 Commet Baby — API Backend

> API REST da plataforma Commet Baby, construída com **Node.js + Fastify + Prisma + TypeScript**.  
> Responsável: **Gustavo**

---

## 📋 Índice

- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Setup do Ambiente](#setup-do-ambiente)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Banco de Dados](#banco-de-dados)
- [Arquitetura e Padrões](#arquitetura-e-padrões)
- [Módulos e Rotas](#módulos-e-rotas)
- [Autenticação](#autenticação)
- [Tratamento de Erros](#tratamento-de-erros)
- [Regras de Commit](#regras-de-commit)
- [Fluxo de Trabalho com Git](#fluxo-de-trabalho-com-git)

---

## Tecnologias

| Tecnologia | Versão | Papel |
|---|---|---|
| **Node.js** | >= 20 | Runtime |
| **Fastify** | ^4.26 | Framework HTTP |
| **TypeScript** | ^5.3 | Linguagem |
| **Prisma** | ^5.10 | ORM / Banco de Dados |
| **PostgreSQL** | >= 14 | Banco de Dados |
| **Zod** | ^3.24 | Validação de schemas |
| **bcrypt** | ^5.1 | Hash de senhas |
| **@fastify/jwt** | ^8.0 | Autenticação JWT |
| **@fastify/cors** | ^9.0 | CORS |
| **@fastify/rate-limit** | ^9.1 | Rate limiting |
| **tsx** | ^4.7 | Execução TypeScript em dev |

---

## Estrutura de Pastas

```
apps/api/
├── src/
│   ├── server.ts              # Entrypoint — inicia o servidor na porta 4000
│   ├── app.ts                 # Monta o Fastify (plugins, middlewares, rotas)
│   ├── routes.ts              # Registro central de todas as rotas
│   ├── plugins/
│   │   ├── prisma.ts          # Decorator fastify.prisma (PrismaClient)
│   │   └── auth.ts            # Decorators fastify.authenticate e fastify.requireAdmin
│   └── modules/
│       ├── health/            # GET /health — healthcheck público
│       ├── auth/              # POST /api/v1/auth/* — registro, login, tokens
│       ├── users/             # /api/v1/users/me — perfil do usuário logado
│       ├── profiles/          # /api/v1/profiles — CRUD de perfis de bebê
│       ├── content/           # /api/v1/content — catálogo e player
│       ├── billing/           # /api/v1/billing — Stripe e assinaturas
│       ├── analytics/         # /api/v1/analytics — métricas parentais
│       └── admin/             # /api/v1/admin — CRUD admin (role ADMIN)
├── package.json
├── tsconfig.json
└── README.md                  # (este arquivo)
```

Cada módulo segue a estrutura:

```
módulo/
├── modulo.routes.ts       # Define as rotas Fastify e aplica middlewares
├── modulo.controller.ts   # Recebe o request, valida e chama o service (a implementar)
└── modulo.service.ts      # Lógica de negócio e acesso ao banco (a implementar)
```

---

## Setup do Ambiente

### Pré-requisitos

- **Node.js** >= 20 — [nodejs.org](https://nodejs.org)
- **pnpm** >= 10 — instale com `npm install -g pnpm`
- **PostgreSQL** >= 14 — local ou via Docker

### 1. Clone e instale as dependências

```bash
# Clone o monorepo na raiz
git clone https://github.com/commet-pro/commet.baby.git
cd commet.baby

# Instale todas as dependências do monorepo
pnpm install
```

### 2. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo na raiz
cp .env.example .env.local

# Edite o .env.local com suas configurações
```

> ⚠️ O arquivo `.env.local` é lido pelo `dotenv` no `server.ts`. Nunca comite esse arquivo.

### 3. Suba o banco de dados (Docker — recomendado)

```bash
# Suba um PostgreSQL local com Docker
docker run --name commet-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=commet_baby \
  -p 5432:5432 \
  -d postgres:16
```

Ou configure sua própria instância e ajuste o `DATABASE_URL` no `.env.local`.

### 4. Aplique o schema no banco

```bash
# Aplica o schema Prisma diretamente no banco (sem migrations, para dev)
pnpm --filter @commet/database db:push

# Ou gere uma migration formal
pnpm --filter @commet/database db:migrate
```

### 5. Inicie a API

```bash
# Somente a API (hot reload com tsx)
pnpm --filter api dev

# Ou todos os apps do monorepo de uma vez
pnpm dev
```

A API estará disponível em: **http://localhost:4000**

Valide com:
```bash
curl http://localhost:4000/health
# {"success":true,"data":{"status":"ok",...}}
```

---

## Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do monorepo com as seguintes variáveis:

```env
# ========================
# Banco de Dados
# ========================
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/commet_baby?schema=public

# ========================
# Auth (JWT)
# ========================
JWT_SECRET=troque-por-uma-string-segura-em-producao
JWT_REFRESH_SECRET=troque-por-outra-string-segura-em-producao
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# ========================
# Stripe (modo Test)
# ========================
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_COMETA_MONTHLY=price_...
STRIPE_PRICE_ESTRELA_MONTHLY=price_...
STRIPE_PRICE_GALAXIA_MONTHLY=price_...
STRIPE_PRICE_BILINGUAL_MONTHLY=price_...

# ========================
# Storage (S3 / Cloudflare R2)
# ========================
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
STORAGE_BUCKET=commet-baby-assets

# ========================
# Email (Resend)
# ========================
RESEND_API_KEY=re_...

# ========================
# App
# ========================
PORT=4000
HOST=0.0.0.0
```

---

## Scripts Disponíveis

Execute a partir da **raiz do monorepo** com `pnpm --filter api <script>`, ou dentro de `apps/api/` com `pnpm <script>`.

| Script | Comando | Descrição |
|---|---|---|
| `dev` | `tsx watch src/server.ts` | Inicia com hot reload |
| `build` | `tsc` | Compila TypeScript para `dist/` |
| `start` | `node dist/server.js` | Inicia a build compilada (produção) |
| `clean` | `rimraf dist` | Limpa a pasta `dist/` |

### Scripts do banco de dados

Execute a partir da raiz com `pnpm --filter @commet/database <script>`:

| Script | Descrição |
|---|---|
| `db:push` | Aplica o schema no banco sem criar migration (dev) |
| `db:migrate` | Gera e aplica uma migration formal |
| `db:studio` | Abre o Prisma Studio (GUI do banco) na porta 5555 |
| `db:seed` | Popula o banco com dados de exemplo |

---

## Banco de Dados

O schema Prisma está em `packages/database/prisma/schema.prisma`.

### Modelos

| Modelo | Descrição |
|---|---|
| `User` | Conta do pai/mãe |
| `Session` | Sessões JWT com refresh token rotation |
| `BabyProfile` | Perfis dos bebês (até 3 por usuário) |
| `Subscription` | Assinaturas via Stripe |
| `Content` | Vídeos e músicas do catálogo |
| `LearningGoal` | Metas de desenvolvimento infantil |
| `ContentLearningGoal` | Relação N:N entre conteúdo e metas |
| `LearningGoalProgress` | Progresso de cada perfil nas metas |
| `WatchHistory` | Histórico de visualizações por perfil |
| `Playlist` | Playlists curadas (rotinas, temáticas) |
| `PlaylistItem` | Itens de uma playlist com ordem |

### Workflow com Prisma

```bash
# 1. Edite o schema em packages/database/prisma/schema.prisma
# 2. Gere e aplique a migration
pnpm --filter @commet/database db:migrate

# 3. Regenere o client (necessário após mudanças no schema)
pnpm --filter @commet/database exec prisma generate --schema=./prisma/schema.prisma
```

---

## Arquitetura e Padrões

### Response Format

Todas as respostas seguem o mesmo contrato:

```json
// Sucesso
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "perPage": 20, "total": 100 }
}

// Erro
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "E-mail ou senha inválidos",
    "statusCode": 401
  }
}
```

### Responsabilidades por Camada

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| **Routes** | `modulo.routes.ts` | Definir endpoints, aplicar `preHandler` de auth, chamar controller |
| **Controller** | `modulo.controller.ts` | Receber `request`, validar body com Zod, chamar service, montar response |
| **Service** | `modulo.service.ts` | Lógica de negócio, acesso ao `fastify.prisma`, regras de domínio |
| **Plugin** | `plugins/*.ts` | Decorar a instância Fastify com helpers globais (prisma, authenticate) |

### Validação

Use sempre os schemas do `@commet/shared` para validar o body dos requests:

```typescript
import { RegisterInputSchema } from '@commet/shared';

// Dentro do controller:
const body = RegisterInputSchema.parse(request.body);
```

### Convenções de Nomenclatura

| Item | Convenção | Exemplo |
|---|---|---|
| Arquivos | `kebab-case` | `auth.routes.ts` |
| Funções/variáveis | `camelCase` | `getUserById()` |
| Tipos/Interfaces | `PascalCase` | `UserPayload` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_PROFILES` |
| Tabelas no banco | `snake_case` (plural) | `baby_profiles` |

---

## Módulos e Rotas

Base URL: `http://localhost:4000/api/v1`

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `GET` | `/health` | — | Healthcheck |
| `POST` | `/auth/register` | — | Cadastro |
| `POST` | `/auth/login` | — | Login |
| `POST` | `/auth/logout` | JWT | Logout |
| `POST` | `/auth/refresh` | — | Renovar token |
| `POST` | `/auth/forgot-password` | — | Recuperar senha |
| `POST` | `/auth/reset-password` | — | Resetar senha |
| `GET` | `/users/me` | JWT | Perfil do usuário |
| `PATCH` | `/users/me` | JWT | Editar perfil |
| `DELETE` | `/users/me` | JWT | Deletar conta |
| `GET` | `/profiles` | JWT | Listar perfis de bebê |
| `POST` | `/profiles` | JWT | Criar perfil |
| `PATCH` | `/profiles/:id` | JWT | Editar perfil |
| `DELETE` | `/profiles/:id` | JWT | Deletar perfil |
| `GET` | `/profiles/:id/progress` | JWT | Progresso de aprendizagem |
| `GET` | `/content` | JWT | Listar conteúdos (com filtros) |
| `GET` | `/content/featured` | JWT | Destaques |
| `GET` | `/content/history` | JWT | Histórico |
| `GET` | `/content/:slug` | JWT | Detalhes do conteúdo |
| `POST` | `/content/:id/watch` | JWT | Registrar progresso |
| `GET` | `/billing/plans` | — | Listar planos (público) |
| `POST` | `/billing/checkout` | JWT | Criar sessão Stripe |
| `POST` | `/billing/portal` | JWT | Portal do cliente Stripe |
| `GET` | `/billing/subscription` | JWT | Status da assinatura |
| `POST` | `/billing/addon/bilingual` | JWT | Toggle add-on bilíngue |
| `POST` | `/billing/webhooks/stripe` | Stripe Sig. | Webhook do Stripe |
| `GET` | `/analytics/usage` | JWT | Tempo de uso |
| `GET` | `/analytics/goals` | JWT | Metas de aprendizagem |
| `GET` | `/admin/content` | ADMIN | Listar todo conteúdo |
| `POST` | `/admin/content` | ADMIN | Criar conteúdo |
| `PATCH` | `/admin/content/:id` | ADMIN | Editar conteúdo |
| `DELETE` | `/admin/content/:id` | ADMIN | Deletar conteúdo |
| `POST` | `/admin/content/:id/publish` | ADMIN | Publicar conteúdo |
| `GET` | `/admin/users` | ADMIN | Listar usuários |
| `GET` | `/admin/dashboard` | ADMIN | Métricas de negócio |

---

## Autenticação

A API usa **JWT com refresh token rotation**.

- **Access token** — expira em 15 minutos.
- **Refresh token** — expira em 7 dias. Ao usar, um novo é gerado e o antigo invalidado.
- **Reuse detection** — se um refresh token já usado for apresentado, toda a família de tokens é invalidada.

### Usando os decorators

```typescript
// Rota protegida (qualquer usuário autenticado)
fastify.get('/me', { preHandler: [fastify.authenticate] }, handler);

// Rota restrita a admins
fastify.get('/dashboard', { preHandler: [fastify.requireAdmin] }, handler);

// Ou via addHook para proteger todo o escopo
fastify.addHook('preHandler', fastify.authenticate);
```

### Header de autenticação

```
Authorization: Bearer <access_token>
```

---

## Tratamento de Erros

O handler global em `src/app.ts` captura todos os erros lançados nas rotas e devolve no formato padrão.

Para lançar um erro com status e código customizados:

```typescript
import { createError } from '@fastify/error';

const NotFoundError = createError('NOT_FOUND', 'Recurso não encontrado', 404);
throw new NotFoundError();
```

Ou diretamente:

```typescript
reply.status(404).send({
  success: false,
  error: {
    code: 'CONTENT_NOT_FOUND',
    message: 'Conteúdo não encontrado',
    statusCode: 404
  }
});
```

---

## Regras de Commit

Seguimos o padrão **Conventional Commits**:

```
<type>(<scope>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

### Types

| Type | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Refatoração sem mudança de comportamento |
| `test` | Adição ou correção de testes |
| `docs` | Apenas documentação |
| `chore` | Tarefas de manutenção (deps, build) |
| `style` | Formatação, sem mudança de lógica |
| `perf` | Melhoria de performance |

### Scopes do Backend

`auth` · `profiles` · `content` · `billing` · `analytics` · `admin` · `db` · `shared`

### Exemplos

```bash
feat(auth): implement JWT refresh token rotation
fix(billing): handle Stripe webhook signature validation error
refactor(content): extract watch history logic to service layer
chore(db): add seed data for content and learning goals
docs(api): document billing module endpoints
test(auth): add unit tests for login service
```

### Regras

- ✅ Use **inglês** para as mensagens de commit
- ✅ Primeira letra do `<descrição>` em **minúsculo**
- ✅ Sem ponto final na descrição curta
- ✅ Máximo de **72 caracteres** na linha do subject
- ❌ Não comite diretamente em `main` ou `develop`
- ❌ Não agrupe mudanças não relacionadas no mesmo commit

O Husky + Commitlint no monorepo vai rejeitar commits que não sigam o padrão.

---

## Fluxo de Trabalho com Git

### Branches

```
main ─────────────────────────── produção
  └── develop ─────────────────── integração
        ├── feature/auth-login ── features do backend
        ├── fix/billing-webhook
        └── hotfix/jwt-expiry ─── hotfix direto em main
```

| Tipo | Padrão | Base | Merge em |
|---|---|---|---|
| Feature | `feature/<scope>-<descricao>` | `develop` | `develop` |
| Fix | `fix/<scope>-<descricao>` | `develop` | `develop` |
| Hotfix | `hotfix/<descricao>` | `main` | `main` + `develop` |

### Workflow diário

```bash
# 1. Sempre parta do develop atualizado
git checkout develop
git pull origin develop

# 2. Crie sua branch
git checkout -b feature/auth-register

# 3. Desenvolva, commit frequente
git add .
git commit -m "feat(auth): add register endpoint with bcrypt hash"

# 4. Ao finalizar, atualize com develop antes do PR
git fetch origin
git rebase origin/develop

# 5. Abra o Pull Request para develop
```

### Checklist antes de abrir PR

- [ ] Testes passando (quando implementados)
- [ ] Nenhum `console.log` ou `debugger` no código
- [ ] Tipos do `@commet/shared` atualizados se necessário
- [ ] Sem conflitos com `develop`
- [ ] Variáveis de ambiente novas adicionadas ao `.env.example`

---

> **Dúvidas?** Fale com o Gustavo ou abra uma issue com a label `owner:backend`.
