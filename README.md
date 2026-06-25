# 🍼 Commet Baby

> Plataforma de entretenimento e educação infantil para bebês de 0 a 3 anos, com conteúdo bilíngue e metas de aprendizagem.

---

## 🎯 Sobre o Projeto

Commet Baby é uma plataforma de streaming educacional que transforma tempo de tela em tempo de aprendizagem. Oferecemos histórias, músicas e vídeos com metas de desenvolvimento por faixa etária, opção bilíngue (PT-BR / EN), e uma experiência segura e envolvente para pais e bebês.

### Principais Features

- 🔐 **Autenticação** — Registro, login, perfis de bebê
- 📚 **Conteúdo direcionado** — Histórias e músicas organizadas por faixa etária (RN-12m, 1-2a, 2-3a)
- ▶️ **Player integrado** — YouTube embed (privacy-enhanced) + modo áudio
- 🌍 **Bilíngue** — Conteúdo em PT-BR e EN com toggle de idioma
- 🎯 **Metas de aprendizagem** — Rastreamento de marcos de desenvolvimento
- 💳 **Assinatura** — Checkout com Stripe (PIX, Boleto, Cartão)
- 📊 **Dashboard parental** — Tempo de uso e progresso

### Planos

| Plano              | Faixa Etária   | Mensal    |
| ------------------ | -------------- | --------- |
| 🌟 Cometa          | 0–12 meses     | R$ 19,90  |
| ⭐ Estrela         | 1–2 anos       | R$ 24,90  |
| 🌌 Galáxia         | 0–3 anos       | R$ 34,90  |
| 🌍 Add-on Bilíngue | Qualquer plano | +R$ 14,90 |

## 🏗️ Estrutura do Projeto

```
commet.baby/
├── apps/
│   ├── web/          # Frontend (Next.js)
│   └── api/          # Backend API
├── packages/
│   ├── shared/       # Tipos e constantes compartilhados
│   └── database/     # Prisma schema & migrations
├── docs/             # Documentação do projeto
└── .github/          # CI/CD & templates
```

## 📖 Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Modelo de Negócio](docs/BUSINESS_MODEL.md)
- [API](docs/API.md)
- [Contribuindo](docs/CONTRIBUTING.md)
- [Deploy](docs/DEPLOYMENT.md)

## 🧠 Brain (Obsidian) & Padrões para Agentes

Este repositório **é** o vault Obsidian do projeto (o "brain"): o conhecimento vive em markdown versionado.

- **Abrir no Obsidian:** _Open folder as vault_ → selecione a **raiz do repositório** (`commet.baby/`). Não abra subpastas como vaults separados.
- **Sincronizar:** é git. `git pull` traz o brain atualizado; mudanças entram por PR para `develop`, como qualquer código.
- **Navegação:** `index.md` (catálogo), `log.md` (histórico), `hot.md` (resumo recente); páginas em `concepts/`, `references/`, `projects/`.
- **Padrões para agentes (obrigatório):** todo agente deve seguir [`AGENTS.md`](AGENTS.md) (Codex/Cursor/…), [`CLAUDE.md`](CLAUDE.md) (Claude Code) ou [`GEMINI.md`](GEMINI.md) (Google **Antigravity** / Gemini) — Spec-First, Brain Sync, Issue Sync e as raias front/back. O framework do brain e as regras de workspace do Antigravity estão em [`.agents/`](.agents/AGENTS.md) (`.agents/rules/`).

## 🚀 Getting Started

> ⚠️ Em construção — o setup será documentado conforme a stack for definida.

```bash
# Clone o repositório
git clone https://github.com/commet-pro/commet.baby.git
cd commet.baby

# Instale as dependências (após setup do monorepo)
pnpm install

# Inicie o ambiente de desenvolvimento
pnpm dev
```

## 👥 Time

- **Frontend + Full-Stack** — [Seu nome]
- **Backend** — [Nome do amigo]

## 📄 Licença

Proprietary — © 2026 Commet Baby. Todos os direitos reservados.
