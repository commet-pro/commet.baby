# GEMINI.md — Commet Baby

> Regras **obrigatórias** para agentes que leem `GEMINI.md` (Google **Antigravity**, Gemini CLI).
> Fonte canônica das convenções: [`AGENTS.md`](AGENTS.md) (raiz). Este arquivo replica as regras inegociáveis.

**Antes de qualquer trabalho, leia e siga:**

1. [`AGENTS.md`](AGENTS.md) — convenções do projeto (vocabulário, idioma/estilo, frontmatter, raias).
2. [`.agents/AGENTS.md`](.agents/AGENTS.md) — framework do brain (wiki LLM) + skills em `.agents/skills/`. Regras de workspace do Antigravity em [`.agents/rules/`](.agents/rules/).
3. O **brain** (este repositório É o vault Obsidian): `index.md`, `hot.md`, e páginas em `concepts/ references/ projects/ …`.

## Regras inegociáveis

- **Spec-First:** não escreva código sem a spec correspondente no brain (`projects/commet.baby/` ou `concepts/`). Cheque o brain primeiro.
- **Brain Sync:** após mudanças relevantes, atualize as páginas do brain + `index.md` / `log.md` / `hot.md`. Frontmatter obrigatório em toda página do vault: `title, category, tags (≤5), summary, sources, created, updated`.
- **Issue Sync:** mantenha as issues do GitHub em dia (`Closes/Refs #N` no PR, comente progresso). Ver [[Fluxo_de_Trabalho]].
- **Raias:** front = `apps/web`; backend = `apps/api` + `packages/database`. O contrato (`@commet/shared`, schema Prisma, rotas) é **read-only** entre as raias.
- **Conventional Commits + Git Flow:** branch `feature|fix|hotfix/<descricao>` a partir de `develop`; PR para `develop` (squash). Hooks (husky + commitlint) bloqueiam commit direto em `main`/`develop`.

Detalhes em [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).
