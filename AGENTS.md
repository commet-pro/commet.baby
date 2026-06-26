# Commet Baby — Vault Conventions (owner overrides)

Convenções específicas do projeto que **sobrepõem** os defaults do framework de wiki.
O framework e as skills vivem em `.agents/` — ver [`.agents/AGENTS.md`](.agents/AGENTS.md) e `.agents/skills/`.

## Vault

- Este repositório **é** o vault (brain). Páginas em `concepts/ entities/ skills/ references/ synthesis/ journal/ projects/`.
- Navegação: `index.md` (catálogo), `log.md` (cronológico), `hot.md` (hot cache ~500 palavras), `.manifest.json` (rastreio de sources).
- Link format: wikilinks — ex.: `[[Design_System]]`.

## Idioma & estilo

- **Português do Brasil.** Títulos curtos, tom técnico e direto.
- **Frontmatter obrigatório** em toda página: `title, category, tags (≤5), summary, sources, created, updated`.
- `category` espelha a pasta (`concept` / `entity` / `skill` / `reference` / `synthesis` / `journal`).
- Datas em `AAAA-MM-DD`.

## Vocabulário de domínio

- Produto: streaming educacional para bebês **0–3 anos**; conteúdo bilíngue PT-BR/EN; modo áudio.
- Planos: **Cometa** (0–12m), **Estrela** (1–2a), **Galáxia** (0–3a, all-access) + add-on **Bilíngue**.
- Personagens: **Cometinho** (guia), **Lila**, **Dino**, **Nina**, **Nuvito**.
- Monorepo: `apps/web` (frontend — nós), `apps/api` (backend — Gustavo); pacotes `@commet/shared`, `@commet/database`.

## Regras críticas (autoritativas)

- **Spec-First:** nenhuma linha de código sem spec em `projects/commet.baby/` ou `concepts/`. Cheque o brain antes de implementar.
- **Brain Sync:** após mudanças significativas, atualize as páginas do brain e `index.md`/`log.md`/`hot.md`. O brain é a memória persistente do projeto.
- **Issue Sync:** mantenha as issues do GitHub em dia — ver [[Fluxo_de_Trabalho]] e `docs/CONTRIBUTING.md`.
- **Raias:** o front (`apps/web`) é nosso; o backend (`apps/api`, `packages/database`) é do Gustavo — o contrato (rotas, envelope, `@commet/shared`, schema Prisma) é **read-only** para nós.
