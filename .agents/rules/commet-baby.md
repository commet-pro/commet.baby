# Commet Baby — Workspace Rules (Antigravity)

> Regras de workspace do projeto. **Aplicam-se sempre** (always on) a qualquer tarefa neste repositório.
> Fonte canônica: [`AGENTS.md`](../../AGENTS.md) na raiz. Estas regras espelham as convenções inegociáveis.

## Sempre

- **Spec-First:** nenhuma linha de código sem a spec no brain (`projects/commet.baby/` ou `concepts/`). Cheque o brain antes de implementar.
- **Brain Sync:** após mudanças relevantes, atualize as páginas do brain e `index.md` / `log.md` / `hot.md`. Frontmatter obrigatório em toda página do vault: `title, category, tags (≤5), summary, sources, created, updated`.
- **Issue Sync:** mantenha as issues do GitHub em dia — `Closes/Refs #N` no PR e comentários de progresso.
- **Raias:** front = `apps/web`; backend = `apps/api` + `packages/database`. O contrato (`@commet/shared`, schema Prisma, rotas) é **read-only** — não mexa na raia do outro.
- **Git:** Conventional Commits; branch `feature|fix|hotfix/<descricao>` a partir de `develop`; PR para `develop` (squash). Sem commit direto em `main`/`develop` (hooks bloqueiam).

## Stack & domínio

- Monorepo pnpm + turbo. Front: Next.js 14 (App Router, TS), estilização por CSS variables + inline styles (sem Tailwind), Zustand, Zod. Back: Fastify + Prisma + PostgreSQL.
- Produto: streaming educacional para bebês 0–3 anos; bilíngue PT-BR/EN; modo áudio. Planos: Cometa / Estrela / Galáxia + add-on Bilíngue. Personagens: Cometinho (guia), Lila, Dino, Nina, Nuvito.

Detalhes completos em [`AGENTS.md`](../../AGENTS.md), [`.agents/AGENTS.md`](../AGENTS.md) e `docs/CONTRIBUTING.md`.
