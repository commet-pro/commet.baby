# CLAUDE.md — Commet Baby

> Instruções **obrigatórias** para qualquer agente (Claude Code e afins) neste repositório.
> (Codex/Cursor/Cline leem o `AGENTS.md` da raiz — mesmo conteúdo de regras.)

**Antes de qualquer trabalho, leia e siga:**

1. **[`AGENTS.md`](AGENTS.md)** (raiz) — convenções do projeto: vocabulário de domínio, idioma/estilo, frontmatter, raias front/back.
2. **[`.agents/AGENTS.md`](.agents/AGENTS.md)** — framework do brain (wiki LLM) + roteamento das skills em `.agents/skills/`.
3. O **brain** (este repositório É o vault Obsidian): `index.md`, `hot.md`, e as páginas em `concepts/ references/ projects/ …`.

## Regras inegociáveis

- **Spec-First:** não escreva código sem a spec correspondente no brain (`projects/commet.baby/` ou `concepts/`). Cheque o brain primeiro.
- **Brain Sync:** após mudanças relevantes, atualize as páginas do brain + `index.md` / `log.md` / `hot.md`. Frontmatter obrigatório em toda página: `title, category, tags (≤5), summary, sources, created, updated`.
- **Issue Sync:** mantenha as issues do GitHub em dia (referencie no PR com `Closes/Refs #N`, comente progresso). Ver [[Fluxo_de_Trabalho]].
- **Raias:** front = `apps/web`; backend = `apps/api` + `packages/database`. O contrato (`@commet/shared`, schema Prisma, rotas) é **read-only** entre as raias — não mexa na raia do outro.
- **Conventional Commits + Git Flow:** branch `feature|fix|hotfix/<descricao>` a partir de `develop`; PR para `develop` (squash). Os hooks (husky + commitlint) validam e bloqueiam commits diretos em `main`/`develop`.

Detalhes completos em [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) e [`AGENTS.md`](AGENTS.md).
