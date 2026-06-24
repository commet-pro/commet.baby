# 🤝 Contribuindo — Commet Baby

> Guia de contribuição para o time de desenvolvimento.

---

## 📋 Workflow de Desenvolvimento

### Git Flow

```
main ─────────────────────────────────── produção
  └── develop ────────────────────────── integração
        ├── feature/auth-login ────────── feature branches
        ├── feature/content-player
        ├── fix/stripe-webhook
        └── hotfix/critical-bug ───────── hotfixes direto em main
```

### Branches

| Tipo | Padrão | Exemplo | Base |
|---|---|---|---|
| Feature | `feature/<modulo>-<descricao>` | `feature/auth-login` | `develop` |
| Fix | `fix/<modulo>-<descricao>` | `fix/billing-webhook` | `develop` |
| Hotfix | `hotfix/<descricao>` | `hotfix/login-crash` | `main` |

### Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` — Nova feature
- `fix` — Correção de bug
- `docs` — Documentação
- `style` — Formatação (sem mudança de código)
- `refactor` — Refatoração
- `test` — Testes
- `chore` — Tarefas de manutenção

**Scopes:** `auth`, `content`, `billing`, `profile`, `analytics`, `admin`, `shared`, `db`

**Exemplos:**
```
feat(auth): implement JWT refresh token rotation
fix(billing): handle Stripe webhook signature validation
docs(api): add content endpoint documentation
chore(db): add seed data for development
```

## 🏗️ Estrutura de PR

### Template de PR

```markdown
## O que mudou
<!-- Descreva as mudanças -->

## Por que mudou
<!-- Contexto e motivação -->

## Como testar
<!-- Passos para validação -->

## Screenshots (se UI)
<!-- Capturas de tela -->

## Checklist
- [ ] Testes passando
- [ ] Tipos compartilhados atualizados (@commet/shared)
- [ ] Documentação atualizada
- [ ] Sem console.log/debugger
```

### Code Review

- PRs precisam de **1 aprovação** para merge
- Autor faz merge após aprovação
- Squash merge em `develop`, merge commit em `main`

## 📁 Convenções de Código

### Naming

| Item | Convenção | Exemplo |
|---|---|---|
| Arquivos (component) | PascalCase | `StoryCard.tsx` |
| Arquivos (util/hook) | camelCase | `useAuth.ts` |
| Arquivos (route) | kebab-case | `forgot-password/` |
| Variáveis/Funções | camelCase | `getUserProfile()` |
| Tipos/Interfaces | PascalCase | `UserProfile` |
| Constantes | UPPER_SNAKE_CASE | `MAX_PROFILES` |
| Enums | PascalCase (key & name) | `AgeGroup.NEWBORN_12M` |
| CSS classes | kebab-case | `.story-card` |
| DB tables | snake_case (plural) | `baby_profiles` |

### Imports

Ordem de imports (automático via ESLint):
1. External packages
2. `@commet/*` packages
3. Relative imports
4. Styles

### Responsabilidades

| Camada | Frontend (apps/web) | Backend (apps/api) |
|---|---|---|
| **Controller** | — | Recebe request, valida, delega ao service |
| **Service** | — | Lógica de negócio, acesso ao DB |
| **Routes** | — | Definição de rotas, middlewares |
| **Pages** | App Router pages | — |
| **Components** | UI components | — |
| **Hooks** | Custom hooks | — |
| **Shared** | Tipos + Validators | Tipos + Validators |

## 🧪 Testes

### Frontend (Vitest + Testing Library)
```bash
pnpm --filter web test        # unit tests
pnpm --filter web test:e2e    # Playwright e2e
```

### Backend (Jest)
```bash
pnpm --filter api test        # unit tests
pnpm --filter api test:int    # integration tests
```

### Coverage mínimo
- Services: 80%
- Utils: 90%
- Components: 60%

## 🔧 Setup Local

```bash
# 1. Clone
git clone https://github.com/commet-pro/commet.baby.git
cd commet.baby

# 2. Instale dependências
pnpm install

# 3. Configure .env
cp .env.example .env.local

# 4. Setup database
pnpm --filter database db:push
pnpm --filter database db:seed

# 5. Rode o dev server
pnpm dev
```
