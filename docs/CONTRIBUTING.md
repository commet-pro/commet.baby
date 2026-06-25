# 🤝 Contribuindo — Commet Baby

> Guia de contribuição para o time de desenvolvimento.

---

## 📋 Workflow de Desenvolvimento (Spec-First)

Nós adotamos a filosofia **Spec-First** + **Brain Sync**. Nenhuma linha de código deve ser escrita antes da especificação existir no Obsidian Wiki.

### O Ciclo de Vida da Feature

1. **Spec Phase:** Abra a pasta `projects/commet.baby/` no Obsidian e crie/atualize o arquivo `.md` detalhando o que será feito (plano de implementação).
2. **Code Phase:** Crie a branch seguindo o padrão, implemente o código e faça commits semânticos.
3. **Brain Sync:** Após a conclusão, a documentação e os requisitos no Obsidian (o Brain) devem refletir as decisões finais tomadas durante o código. A Spec deixa de ser um "plano" e vira "documentação da realidade".
4. **Issue Sync:** Mantenha as issues do GitHub em dia como parte do fluxo — não como passo opcional. Ao abrir o PR, referencie a issue no corpo (`Closes #N` para fechar automaticamente no merge, `Refs #N` para apenas vincular). Conforme o trabalho avança, comente o progresso na própria issue; e quando uma entrega **desbloqueia** outras issues, deixe um comentário nelas linkando o PR. Vale igualmente para devs humanos **e** para agentes.

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

| Tipo    | Padrão                         | Exemplo               | Base      |
| ------- | ------------------------------ | --------------------- | --------- |
| Feature | `feature/<modulo>-<descricao>` | `feature/auth-login`  | `develop` |
| Fix     | `fix/<modulo>-<descricao>`     | `fix/billing-webhook` | `develop` |
| Hotfix  | `hotfix/<descricao>`           | `hotfix/login-crash`  | `main`    |

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

## Issues relacionadas

<!-- Closes #N (fecha no merge) · Refs #N (apenas vincula) -->

## Checklist

- [ ] Issue(s) referenciada(s) (Closes/Refs #N) e atualizada(s)
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

| Item                 | Convenção               | Exemplo                |
| -------------------- | ----------------------- | ---------------------- |
| Arquivos (component) | PascalCase              | `StoryCard.tsx`        |
| Arquivos (util/hook) | camelCase               | `useAuth.ts`           |
| Arquivos (route)     | kebab-case              | `forgot-password/`     |
| Variáveis/Funções    | camelCase               | `getUserProfile()`     |
| Tipos/Interfaces     | PascalCase              | `UserProfile`          |
| Constantes           | UPPER_SNAKE_CASE        | `MAX_PROFILES`         |
| Enums                | PascalCase (key & name) | `AgeGroup.NEWBORN_12M` |
| CSS classes          | kebab-case              | `.story-card`          |
| DB tables            | snake_case (plural)     | `baby_profiles`        |

### Imports

Ordem de imports (automático via ESLint):

1. External packages
2. `@commet/*` packages
3. Relative imports
4. Styles

### Responsabilidades

| Camada         | Frontend (apps/web) | Backend (apps/api)                        |
| -------------- | ------------------- | ----------------------------------------- |
| **Controller** | —                   | Recebe request, valida, delega ao service |
| **Service**    | —                   | Lógica de negócio, acesso ao DB           |
| **Routes**     | —                   | Definição de rotas, middlewares           |
| **Pages**      | App Router pages    | —                                         |
| **Components** | UI components       | —                                         |
| **Hooks**      | Custom hooks        | —                                         |
| **Shared**     | Tipos + Validators  | Tipos + Validators                        |

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

## 🔧 Setup Local (Onboarding)

Nós automatizamos o setup para que você não precise instalar as coisas na mão. Temos um script que instala o **pnpm**, as dependências do projeto e o **Obsidian** na sua máquina.

### No Windows (PowerShell)

Abra o PowerShell como Administrador e rode:

```powershell
# 1. Clone o repositório
git clone https://github.com/commet-pro/commet.baby.git
cd commet.baby

# 2. Rode o script de setup (ele instalará o Obsidian via winget, se necessário)
.\scripts\setup-dev.ps1
```

### No Mac/Linux (Terminal)

```bash
# 1. Clone o repositório
git clone https://github.com/commet-pro/commet.baby.git
cd commet.baby

# 2. Rode o script de setup (ele instalará o Obsidian via Homebrew/Snap)
chmod +x scripts/setup-dev.sh
./scripts/setup-dev.sh
```

**Próximos passos após rodar o script:**

1. Configure o `.env` gerado localmente.
2. Inicie o banco de dados (`pnpm --filter database db:push` / `db:seed`).
3. Rode `pnpm dev` para iniciar o projeto.
4. O Obsidian abrirá automaticamente com o vault do projeto, leia o `Passo_0_Implementacao.md`!
