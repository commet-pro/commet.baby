---
title: Modelo de Negócio — Commet Baby
category: doc
summary: Modelo de negócio — planos, streams de receita, KPIs e estratégia de conversão.
updated: 2026-06-25
---

# 💰 Modelo de Negócio — Commet Baby

> Documento de referência para o modelo de negócio e estratégia de monetização.

---

## Proposta de Valor

**"Conteúdo direcionado que transforma tempo de tela em tempo de aprendizagem."**

Commet Baby é uma plataforma de streaming educacional para bebês de RN até 3 anos, que oferece histórias, músicas e vídeos com metas de aprendizagem por faixa etária, opção bilíngue (PT-BR / EN), e monetização dual (assinaturas + YouTube Ads).

## Diferencial Competitivo

| Aspecto               | Commet Baby              | Concorrentes              |
| --------------------- | ------------------------ | ------------------------- |
| Faixa etária          | 0-3 anos (inclui RN)     | Maioria começa em 2+ anos |
| Bilíngue como add-on  | PT-BR ↔ EN modular       | Fixo ou inexistente       |
| Metas de aprendizagem | Rastreamento por marco   | Conteúdo genérico         |
| Dual revenue          | Assinatura + YouTube Ads | Apenas um modelo          |
| Modo áudio            | Reprodução em background | Raro nessa faixa          |

## Streams de Receita

| Stream                  | % da Receita | Detalhes                                   |
| ----------------------- | ------------ | ------------------------------------------ |
| **Assinaturas**         | ~80%         | Planos mensais/anuais por faixa etária     |
| **YouTube Ads**         | ~15%         | CPM contextual em conteúdo "made for kids" |
| **Parcerias/Afiliados** | ~5%          | Produtos infantis, cursos para pais        |

## Planos de Assinatura

### Tabela de Preços

| Plano                  | Faixa Etária | Mensal (BRL)  | Anual (BRL)          | Perfis | Bilíngue |
| ---------------------- | ------------ | ------------- | -------------------- | ------ | -------- |
| 🌟 **Cometa**          | 0–12 meses   | R$ 19,90      | R$ 189,90 (~20% off) | 1      | Não      |
| ⭐ **Estrela**         | 1–2 anos     | R$ 24,90      | R$ 239,90 (~20% off) | 1      | Não      |
| 🌌 **Galáxia**         | 0–3 anos     | R$ 34,90      | R$ 329,90 (~21% off) | 3      | Não      |
| 🌍 **Add-on Bilíngue** | Qualquer     | +R$ 14,90/mês | +R$ 139,90/ano       | -      | Sim      |

### O que cada plano inclui

**Cometa (0-12m)**

- Conteúdo para 0-12 meses (estimulação sensorial, canções de ninar, sons)
- 1 perfil de bebê
- Modo áudio
- Conteúdo em PT-BR
- Metas de aprendizagem básicas

**Estrela (1-2a)**

- Conteúdo para 1-2 anos (histórias simples, cores, números, rotinas)
- 1 perfil de bebê
- Modo áudio
- Conteúdo em PT-BR
- Metas de aprendizagem intermediárias

**Galáxia (0-3a) — All Access**

- Todo o conteúdo de todas as faixas
- 3 perfis de bebê (ideal para gêmeos ou irmãos próximos)
- Modo áudio
- Conteúdo em PT-BR
- Metas de aprendizagem completas
- Acesso antecipado a novos conteúdos

**Add-on Bilíngue**

- Conteúdo em inglês (EN) com pronúncia nativa
- Toggle de idioma por conteúdo
- Metas de aprendizagem de linguagem bilíngue
- Pode ser adicionado a qualquer plano

### Trial

- **7 dias gratuitos** em qualquer plano
- Acesso completo durante o trial
- Cartão necessário para iniciar (Stripe gerencia a cobrança automática)

## Funil de Conversão

```
Landing Page (SEO + Social)
    └── Cadastro Gratuito (7 dias trial)
        └── Onboarding (Data de nascimento → faixa auto)
            └── Conteúdo Trial (acesso completo por 7 dias)
                ├── Conversão → Assinante Ativo
                │       └── Upsell Bilíngue (after 30 days)
                └── Não Converteu → Email Nurturing
```

## Métricas Target (KPIs)

| Métrica                | Mês 1-3 | Mês 6    | Mês 12    |
| ---------------------- | ------- | -------- | --------- |
| Usuários registrados   | 500     | 3.000    | 15.000    |
| Conversão trial → pago | 8%      | 12%      | 18%       |
| Churn mensal           | 15%     | 10%      | 7%        |
| ARPU (Receita/usuário) | R$ 22   | R$ 26    | R$ 30     |
| MRR                    | R$ 880  | R$ 9.360 | R$ 81.000 |

## Estimativa YouTube Ads

| Usuários Ativos | Views/mês | CPM $2 | Receita/mês |
| --------------- | --------- | ------ | ----------- |
| 1.000           | 90.000    | $2     | ~$180       |
| 10.000          | 900.000   | $2     | ~$1.800     |
| 50.000          | 4.500.000 | $2     | ~$9.000     |

> ⚠️ CPM para conteúdo "made for kids" é mais baixo ($1-3) por usar apenas ads contextuais (COPPA compliance). Essa é receita **complementar**, não primária.

## Personas

### Persona 1: Mariana (Mãe de Primeira Viagem)

- **Idade:** 28 anos | **Bebê:** 4 meses
- **Dor:** "Não sei o que é conteúdo seguro para o meu bebê"
- **Plano ideal:** Cometa (0-12m) → upgrade para Estrela quando crescer

### Persona 2: Rafael (Pai Tech-Savvy)

- **Idade:** 33 anos | **Bebê:** 18 meses
- **Dor:** "Quero que meu filho aprenda inglês desde cedo"
- **Plano ideal:** Estrela (1-2a) + Add-on Bilíngue

### Persona 3: Avó Dona Teresa

- **Idade:** 62 anos | **Neto:** 2 anos
- **Dor:** "Preciso de algo seguro pra entreter enquanto cuido dele"
- **Plano ideal:** Gift subscription Galáxia
