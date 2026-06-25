---
title: Fluxo de Trabalho — Spec-First, Brain Sync & Issue Sync
tags: [processo, workflow, github, brain, commet.baby]
---

# 🔁 Fluxo de Trabalho — Commet Baby

Como o time (devs humanos **e** agentes) leva uma feature do plano à entrega.
Fonte normativa: `docs/CONTRIBUTING.md`. Relacionado a [[Passo_0_Implementacao]] e [[Design_System]].

## O ciclo de vida da feature

1. **Spec Phase** — a especificação existe no brain (`projects/commet.baby/`) antes do código.
2. **Code Phase** — branch no padrão `feature|fix|hotfix/<...>`, commits Conventional, PR para `develop`.
3. **Brain Sync** — ao concluir, a wiki reflete as decisões reais (a spec vira "documentação da realidade").
4. **Issue Sync** — as issues do GitHub são mantidas em dia como parte do fluxo.

## Issue Sync (a parte nova)

> Não é um passo opcional nem um bot: faz parte do que **nós** fazemos ao subir trabalho.

- **Referenciar no PR:** `Closes #N` (fecha no merge) ou `Refs #N` (apenas vincula), no corpo do PR.
- **Comentar progresso:** atualizações relevantes vão como comentário na própria issue.
- **Desbloqueio:** quando uma entrega habilita outras issues, comentar nelas com o link do PR.
- **Vale para agentes:** tanto o agente do frontend quanto o do backend seguem isto ao abrir/mergear PRs.

### Exemplo aplicado

A fundação do Design System (PR #38) é fundacional e não fechou uma issue dedicada, mas foi
sinalizada com comentário nas P0 de frontend que ela desbloqueia: #9, #11, #12, #15, #16, #17, #19.

## Não confundir

Isto é uma **convenção manual** seguida pelos agentes/devs — **não** há automação (GitHub Actions /
CI / agente agendado) no repositório. Ver [[Design_System]] para o que já foi entregue.
