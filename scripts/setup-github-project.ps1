#!/usr/bin/env pwsh
# ============================================================
# Commet Baby - GitHub Project Setup Script
# ============================================================
$ErrorActionPreference = "Continue"
$REPO = "commet-pro/commet.baby"

Write-Host "`nCommet Baby - GitHub Project Setup" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor DarkGray

# ============================================================
# 1. LABELS
# ============================================================
Write-Host "`nCriando labels..." -ForegroundColor Yellow

$labels = @(
    "module:auth|d73a4a|Modulo de Autenticacao",
    "module:profile|0075ca|Modulo de Perfis de Bebe",
    "module:content|2ea44f|Modulo de Conteudo e Player",
    "module:billing|e4e669|Modulo de Billing e Stripe",
    "module:analytics|7057ff|Modulo de Analytics",
    "module:admin|f9d0c4|Modulo Admin",
    "priority:p0|b60205|Prioridade critica",
    "priority:p1|d93f0b|Prioridade alta",
    "priority:p2|fbca04|Prioridade media",
    "owner:frontend|c5def5|Responsabilidade do Frontend",
    "owner:backend|bfdadc|Responsabilidade do Backend",
    "owner:shared|d4c5f9|Responsabilidade compartilhada",
    "type:feature|0e8a16|Nova feature",
    "type:infra|006b75|Infraestrutura e DevOps",
    "type:docs|0075ca|Documentacao",
    "type:design|e99695|Design e UI/UX"
)

foreach ($l in $labels) {
    $parts = $l -split '\|'
    gh label create $parts[0] --color $parts[1] --description $parts[2] --repo $REPO --force 2>$null
    Write-Host "  OK $($parts[0])" -ForegroundColor Green
}

# ============================================================
# 2. MILESTONES
# ============================================================
Write-Host "`nCriando milestones..." -ForegroundColor Yellow

$ms_data = @(
    @{ t = "Marco 0 - Idealizacao e Setup"; d = "2026-07-06T23:59:59Z"; desc = "Documentacao, setup monorepo, CI/CD" },
    @{ t = "Sprint 1 - Foundation"; d = "2026-07-20T23:59:59Z"; desc = "Auth, landing page, perfil bebe, DB schema" },
    @{ t = "Sprint 2 - Core Features"; d = "2026-08-10T23:59:59Z"; desc = "Content listing, players, Stripe checkout, admin" },
    @{ t = "Sprint 3 - Enhancement"; d = "2026-08-31T23:59:59Z"; desc = "Bilingue, metas, dashboard parental" },
    @{ t = "Sprint 4 - Polish e Launch"; d = "2026-09-21T23:59:59Z"; desc = "Playlists, gift subs, email, QA, beta" }
)

foreach ($ms in $ms_data) {
    gh api repos/$REPO/milestones -f title="$($ms.t)" -f due_on="$($ms.d)" -f description="$($ms.desc)" -f state="open" 2>$null
    Write-Host "  OK $($ms.t)" -ForegroundColor Green
}

# ============================================================
# 3. ISSUES (via temp files to avoid escaping hell)
# ============================================================
Write-Host "`nCriando issues..." -ForegroundColor Yellow

function Create-Issue {
    param([string]$Title, [string]$BodyFile, [string[]]$Labels, [string]$Milestone)
    
    $labelArgs = @()
    foreach ($lb in $Labels) {
        $labelArgs += "--label"
        $labelArgs += $lb
    }
    
    gh issue create --repo $REPO --title $Title --body-file $BodyFile --milestone $Milestone @labelArgs 2>$null
    Write-Host "  OK $Title" -ForegroundColor Green
}

$tmpDir = Join-Path $env:TEMP "commet-issues"
New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

# --- MARCO 0 ---
$ms0 = "Marco 0 - Idealizacao e Setup"

@"
## Descricao
Configurar o monorepo com:
- turbo.json
- pnpm-workspace.yaml
- tsconfig.base.json
- Workspaces: apps/web, apps/api, packages/shared, packages/database

## Criterios de Aceite
- [ ] pnpm install funciona na raiz
- [ ] pnpm dev sobe os apps
- [ ] pnpm lint roda em todos os packages
- [ ] pnpm build compila tudo
"@ | Set-Content "$tmpDir/01.md"
Create-Issue "Setup monorepo com Turborepo + pnpm workspaces" "$tmpDir/01.md" @("type:infra", "owner:shared", "priority:p0") $ms0

@"
## Descricao
Criar workflows de CI/CD:
- ci.yml: Lint + Type Check + Tests em PRs
- deploy-web.yml: Deploy frontend no Vercel
- deploy-api.yml: Deploy backend

## Criterios de Aceite
- [ ] CI roda em cada PR
- [ ] Deploy automatico staging em push para develop
- [ ] Deploy manual production em push para main
"@ | Set-Content "$tmpDir/02.md"
Create-Issue "Configurar CI/CD com GitHub Actions" "$tmpDir/02.md" @("type:infra", "owner:shared", "priority:p1") $ms0

@"
## Descricao
- ESLint com config compartilhada
- Prettier com regras do projeto
- Husky + lint-staged para pre-commit
- Commitlint para conventional commits

## Criterios de Aceite
- [ ] pnpm lint funciona
- [ ] Pre-commit hook valida lint
- [ ] Commit messages seguem conventional commits
"@ | Set-Content "$tmpDir/03.md"
Create-Issue "Configurar ESLint + Prettier + Husky" "$tmpDir/03.md" @("type:infra", "owner:shared", "priority:p1") $ms0

@"
## Descricao
Commitar a documentacao inicial:
- ARCHITECTURE.md
- BUSINESS_MODEL.md
- API.md
- CONTRIBUTING.md
- DEPLOYMENT.md

Ja criado no commit inicial (Marco 0).
"@ | Set-Content "$tmpDir/04.md"
Create-Issue "Documentacao Marco 0" "$tmpDir/04.md" @("type:docs", "owner:shared", "priority:p0") $ms0

# --- SPRINT 1 - FOUNDATION ---
$ms1 = "Sprint 1 - Foundation"

@"
## RF-AUTH-01

### Descricao
Implementar endpoint de registro com:
- Validacao de email formato + unicidade
- Hash de senha bcrypt
- Criacao de Stripe Customer
- Envio de email de verificacao

### Endpoint
POST /api/v1/auth/register

### Criterios de Aceite
- [ ] Endpoint funcional com validacao
- [ ] Senha hasheada no DB
- [ ] Stripe Customer criado
- [ ] Retorna JWT + refresh token
- [ ] Testes unitarios
"@ | Set-Content "$tmpDir/05.md"
Create-Issue "[AUTH] Registro com email + senha" "$tmpDir/05.md" @("module:auth", "owner:backend", "priority:p0", "type:feature") $ms1

@"
## RF-AUTH-02

### Endpoint
POST /api/v1/auth/login

### Criterios de Aceite
- [ ] Validacao de credenciais
- [ ] Retorna JWT + refresh token
- [ ] Rate limiting 5 tentativas/min
- [ ] Testes unitarios
"@ | Set-Content "$tmpDir/06.md"
Create-Issue "[AUTH] Login com email + senha" "$tmpDir/06.md" @("module:auth", "owner:backend", "priority:p0", "type:feature") $ms1

@"
## RF-AUTH-05

### Endpoint
POST /api/v1/auth/refresh

### Criterios de Aceite
- [ ] Refresh token rotation - novo token a cada uso
- [ ] Token antigo invalidado
- [ ] Expiracao de 7 dias
- [ ] Deteccao de reuse - invalidar familia
"@ | Set-Content "$tmpDir/07.md"
Create-Issue "[AUTH] Refresh token com rotacao" "$tmpDir/07.md" @("module:auth", "owner:backend", "priority:p0", "type:feature") $ms1

@"
## RF-AUTH-04

### Endpoints
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password

### Criterios de Aceite
- [ ] Gera token de reset expira em 1h
- [ ] Envia email com link
- [ ] Reset funcional com validacao de senha forte
"@ | Set-Content "$tmpDir/08.md"
Create-Issue "[AUTH] Recuperacao de senha" "$tmpDir/08.md" @("module:auth", "owner:backend", "priority:p0", "type:feature") $ms1

@"
## Frontend Auth Pages

### Paginas
- /login - Form de login
- /register - Form de registro
- /forgot-password - Form de recuperacao

### Criterios de Aceite
- [ ] Design system aplicado
- [ ] Validacao client-side com Zod
- [ ] Loading states
- [ ] Error handling
- [ ] Responsivo mobile-first
"@ | Set-Content "$tmpDir/09.md"
Create-Issue "[AUTH] Paginas Login/Register/Forgot Password - Frontend" "$tmpDir/09.md" @("module:auth", "owner:frontend", "priority:p0", "type:feature") $ms1

@"
## RF-PROF-01 + RF-PROF-02

### Endpoints
POST /api/v1/profiles
GET /api/v1/profiles
PATCH /api/v1/profiles/:id
DELETE /api/v1/profiles/:id

### Criterios de Aceite
- [ ] Criar perfil com nome, data de nascimento, avatar
- [ ] Calculo automatico de faixa etaria pela data de nascimento
- [ ] Limite de perfis conforme plano
- [ ] Validacao de data - nao futura, nao maior que 3 anos
"@ | Set-Content "$tmpDir/10.md"
Create-Issue "[PROFILE] CRUD de perfil do bebe" "$tmpDir/10.md" @("module:profile", "owner:backend", "priority:p0", "type:feature") $ms1

@"
## Frontend Profile

### Componentes
- BabyProfileCard - Card com avatar, nome, idade
- ProfileForm - Form de criacao/edicao
- AvatarPicker - Seletor de avatares

### Criterios de Aceite
- [ ] Listar perfis do usuario
- [ ] Criar novo perfil
- [ ] Editar perfil existente
- [ ] Deletar com confirmacao
"@ | Set-Content "$tmpDir/11.md"
Create-Issue "[PROFILE] Tela de perfis do bebe - Frontend" "$tmpDir/11.md" @("module:profile", "owner:frontend", "priority:p0", "type:feature") $ms1

@"
## Landing Page

### Secoes
- Hero com CTA de cadastro
- Features/beneficios
- Planos e precos
- FAQ
- Footer

### Criterios de Aceite
- [ ] SEO otimizado - meta tags, OG, structured data
- [ ] Mobile-first responsivo
- [ ] Performance LCP menor que 2.5s
- [ ] CTA para registro/trial
"@ | Set-Content "$tmpDir/12.md"
Create-Issue "[WEB] Landing page" "$tmpDir/12.md" @("owner:frontend", "priority:p0", "type:feature") $ms1

@"
## Database Schema

### Models
User, Session, BabyProfile, Content, LearningGoal, ContentLearningGoal,
LearningGoalProgress, Playlist, PlaylistItem, WatchHistory, Subscription

### Criterios de Aceite
- [ ] Schema Prisma completo
- [ ] Migration inicial gerada
- [ ] Seed com dados de exemplo
- [ ] @commet/database exportando Prisma Client
"@ | Set-Content "$tmpDir/13.md"
Create-Issue "[DB] Schema Prisma inicial + migrations + seed" "$tmpDir/13.md" @("owner:backend", "priority:p0", "type:infra") $ms1

# --- SPRINT 2 - CORE FEATURES ---
$ms2 = "Sprint 2 - Core Features"

@"
## RF-CONT-01 + RF-CONT-02

### Endpoint
GET /api/v1/content

### Filtros
ageGroup, category, language, search, page, perPage

### Criterios de Aceite
- [ ] Paginacao funcional
- [ ] Filtros combinados
- [ ] Ordenacao por sortOrder/featured
- [ ] Response com thumbnail, titulo, duracao
"@ | Set-Content "$tmpDir/14.md"
Create-Issue "[CONTENT] Listagem de conteudos com filtros" "$tmpDir/14.md" @("module:content", "owner:backend", "priority:p0", "type:feature") $ms2

@"
## RF-CONT-01

### Componentes
- StoryCard - Card com thumbnail, titulo, duracao, badge de faixa
- StoryGrid - Grid responsivo de cards
- FilterBar - Barra de filtros faixa, categoria, busca
- FeaturedCarousel - Carrossel de destaques

### Criterios de Aceite
- [ ] Grid responsivo 1/2/3 colunas
- [ ] Filtros funcionais
- [ ] Loading skeletons
- [ ] Infinite scroll ou paginacao
"@ | Set-Content "$tmpDir/15.md"
Create-Issue "[CONTENT] Home page com grid de historias - Frontend" "$tmpDir/15.md" @("module:content", "owner:frontend", "priority:p0", "type:feature") $ms2

@"
## RF-CONT-03

### Implementacao
- Usar youtube-nocookie.com - COPPA compliance
- YouTube IFrame API para controle
- Responsive embed 16:9
- Loading state enquanto carrega

### Criterios de Aceite
- [ ] Privacy-enhanced mode ativo
- [ ] Player responsivo
- [ ] Controles de play/pause
- [ ] Tracking de watchedSeconds
- [ ] Parental gate para sair
"@ | Set-Content "$tmpDir/16.md"
Create-Issue "[CONTENT] YouTube embedded player" "$tmpDir/16.md" @("module:content", "owner:frontend", "priority:p0", "type:feature") $ms2

@"
## RF-CONT-04

### Implementacao
- Web Audio API ou elemento audio
- Background playback nao pausar ao sair da tab
- Mini player persistente
- Controls: play/pause, seek, volume

### Criterios de Aceite
- [ ] Reproducao de audio funcional
- [ ] Background playback
- [ ] Mini player no bottom
- [ ] Tracking de tempo ouvido
"@ | Set-Content "$tmpDir/17.md"
Create-Issue "[CONTENT] Audio player com background playback" "$tmpDir/17.md" @("module:content", "owner:frontend", "priority:p0", "type:feature") $ms2

@"
## RF-BILL-02 a RF-BILL-09

### Endpoints
POST /api/v1/billing/checkout - Cria checkout session
POST /api/v1/webhooks/stripe - Webhook handler

### Webhooks
- checkout.session.completed
- invoice.paid
- invoice.payment_failed
- customer.subscription.updated
- customer.subscription.deleted

### Criterios de Aceite
- [ ] Checkout session com PIX, Boleto, Cartao
- [ ] Trial de 7 dias
- [ ] Webhook signature validation
- [ ] Subscription criada/atualizada no DB
- [ ] Idempotencia nos handlers
- [ ] Testes com Stripe CLI
"@ | Set-Content "$tmpDir/18.md"
Create-Issue "[BILLING] Stripe Checkout Session + Webhooks" "$tmpDir/18.md" @("module:billing", "owner:backend", "priority:p0", "type:feature") $ms2

@"
## RF-BILL-01

### Componentes
- PlanCard - Card com features e preco
- PlanComparison - Tabela comparativa
- CheckoutButton - Redirect para Stripe Checkout
- BillingCycleToggle - Mensal/Anual toggle

### Criterios de Aceite
- [ ] 3 planos side-by-side
- [ ] Toggle mensal/anual com desconto visivel
- [ ] Add-on bilingue como checkbox
- [ ] Redirect para Stripe Checkout
- [ ] Success/cancel pages
"@ | Set-Content "$tmpDir/19.md"
Create-Issue "[BILLING] Pagina de planos + checkout - Frontend" "$tmpDir/19.md" @("module:billing", "owner:frontend", "priority:p0", "type:feature") $ms2

@"
## RF-CONT-11 + RF-CONT-12

### Implementacao
- Middleware que valida subscription status + plan
- Conteudo filtrado pela faixa etaria do plano
- Conteudo bilingue bloqueado sem add-on
- Overlay de upgrade em conteudo bloqueado

### Criterios de Aceite
- [ ] Backend filtra conteudo por plano
- [ ] Frontend mostra overlay de upgrade
- [ ] Trial tem acesso completo
- [ ] Subscription expirada bloqueia acesso
"@ | Set-Content "$tmpDir/20.md"
Create-Issue "[CONTENT] Controle de acesso por plano" "$tmpDir/20.md" @("module:content", "module:billing", "owner:shared", "priority:p0", "type:feature") $ms2

@"
## RF-ADM-01 a RF-ADM-03

### Endpoints
POST /api/v1/admin/content
PATCH /api/v1/admin/content/:id
DELETE /api/v1/admin/content/:id
POST /api/v1/admin/content/:id/publish
POST /api/v1/admin/upload

### Criterios de Aceite
- [ ] CRUD completo
- [ ] Upload de thumbnail e audio para S3/R2
- [ ] Vincular YouTube Video ID
- [ ] Status: Draft, Published, Archived
- [ ] Validacao de campos obrigatorios
"@ | Set-Content "$tmpDir/21.md"
Create-Issue "[ADMIN] CRUD de conteudo" "$tmpDir/21.md" @("module:admin", "owner:backend", "priority:p0", "type:feature") $ms2

# --- SPRINT 3 - ENHANCEMENT ---
$ms3 = "Sprint 3 - Enhancement"

@"
## RF-CONT-05 + RF-BILL-11

### Criterios de Aceite
- [ ] Toggle PT-BR / EN por conteudo
- [ ] Troca de YouTube video ID e audio URL por idioma
- [ ] Add-on bilingue como Stripe item adicional
- [ ] UI de upsell para add-on
"@ | Set-Content "$tmpDir/22.md"
Create-Issue "[CONTENT] Toggle bilingue + add-on" "$tmpDir/22.md" @("module:content", "module:billing", "owner:shared", "priority:p1", "type:feature") $ms3

@"
## RF-CONT-07

### Criterios de Aceite
- [ ] LearningGoals CRUD no admin
- [ ] Vinculacao conteudo com metas
- [ ] Tracking de progresso por perfil
- [ ] UI com checklist visual de metas
- [ ] Calculo automatico de progresso
"@ | Set-Content "$tmpDir/23.md"
Create-Issue "[CONTENT] Sistema de metas de aprendizagem" "$tmpDir/23.md" @("module:content", "owner:shared", "priority:p1", "type:feature") $ms3

@"
## RF-CONT-08

### Criterios de Aceite
- [ ] Registrar cada visualizacao no DB
- [ ] Secao Continue Assistindo na home
- [ ] Retomar do ponto onde parou
- [ ] Historico completo na area do perfil
"@ | Set-Content "$tmpDir/24.md"
Create-Issue "[CONTENT] Historico + Continue Assistindo" "$tmpDir/24.md" @("module:content", "owner:shared", "priority:p1", "type:feature") $ms3

@"
## RF-ANAL-01 a RF-ANAL-03

### Criterios de Aceite
- [ ] Tempo de uso diario/semanal com grafico
- [ ] Conteudos mais assistidos
- [ ] Progresso nas metas com visual
- [ ] Filtro por perfil de bebe
"@ | Set-Content "$tmpDir/25.md"
Create-Issue "[ANALYTICS] Dashboard parental" "$tmpDir/25.md" @("module:analytics", "owner:shared", "priority:p1", "type:feature") $ms3

@"
## RF-BILL-10

### Criterios de Aceite
- [ ] Redirect para Customer Portal do Stripe
- [ ] Permitir troca de plano
- [ ] Permitir cancelamento
- [ ] Atualizar metodo de pagamento
- [ ] Webhook synca mudancas
"@ | Set-Content "$tmpDir/26.md"
Create-Issue "[BILLING] Stripe Customer Portal" "$tmpDir/26.md" @("module:billing", "owner:shared", "priority:p1", "type:feature") $ms3

@"
## RF-AUTH-03

### Criterios de Aceite
- [ ] Google OAuth funcional
- [ ] Apple Sign In funcional
- [ ] Link com conta existente por email
- [ ] Criacao automatica de Stripe Customer
"@ | Set-Content "$tmpDir/27.md"
Create-Issue "[AUTH] Login social - Google, Apple" "$tmpDir/27.md" @("module:auth", "owner:backend", "priority:p1", "type:feature") $ms3

@"
### Criterios de Aceite
- [ ] manifest.json com icones e cores
- [ ] Service worker para cache basico
- [ ] Install prompt em mobile
- [ ] Splash screen
"@ | Set-Content "$tmpDir/28.md"
Create-Issue "[WEB] PWA manifest + service worker" "$tmpDir/28.md" @("owner:frontend", "priority:p1", "type:feature") $ms3

# --- SPRINT 4 - POLISH ---
$ms4 = "Sprint 4 - Polish e Launch"

@"
## RF-CONT-10

### Criterios de Aceite
- [ ] CRUD de playlists no admin
- [ ] Tipos: Curada, Rotina, Tematica
- [ ] Player em sequencia
- [ ] UI de playlist com drag-to-reorder no admin
"@ | Set-Content "$tmpDir/29.md"
Create-Issue "[CONTENT] Playlists curadas por tema/rotina" "$tmpDir/29.md" @("module:content", "owner:shared", "priority:p2", "type:feature") $ms4

@"
## RF-BILL-13

### Criterios de Aceite
- [ ] Checkout de gift com email do destinatario
- [ ] Email de presente enviado
- [ ] Codigo de resgate funcional
- [ ] Aplicar gift como subscription
"@ | Set-Content "$tmpDir/30.md"
Create-Issue "[BILLING] Gift subscriptions" "$tmpDir/30.md" @("module:billing", "owner:shared", "priority:p2", "type:feature") $ms4

@"
### Templates
- Welcome email
- Payment receipt
- Payment failed
- Password reset
- Trial ending soon D-2

### Criterios de Aceite
- [ ] Templates HTML responsivos
- [ ] Integracao com Resend/SendGrid
- [ ] Variaveis dinamicas nome, plano, etc
"@ | Set-Content "$tmpDir/31.md"
Create-Issue "Emails transacionais" "$tmpDir/31.md" @("owner:backend", "priority:p2", "type:feature") $ms4

@"
## RF-ADM-05

### Metricas
- MRR Monthly Recurring Revenue
- Churn rate
- MAU Monthly Active Users
- Conversao trial para pago
- Top conteudos

### Criterios de Aceite
- [ ] Dashboard com graficos
- [ ] Filtro por periodo
- [ ] Export CSV
"@ | Set-Content "$tmpDir/32.md"
Create-Issue "[ADMIN] Dashboard de metricas de negocio" "$tmpDir/32.md" @("module:admin", "owner:shared", "priority:p2", "type:feature") $ms4

@"
## RF-ANAL-04

### Criterios de Aceite
- [ ] Configurar limite diario por perfil
- [ ] Aviso em 5 min antes de acabar
- [ ] Bloqueio suave com parental gate
- [ ] Configuracoes na area do perfil
"@ | Set-Content "$tmpDir/33.md"
Create-Issue "[ANALYTICS] Timer parental - limite de tela" "$tmpDir/33.md" @("module:analytics", "owner:frontend", "priority:p2", "type:feature") $ms4

@"
### Checklist
- [ ] Testar todos os fluxos em mobile
- [ ] Testar checkout Stripe PIX, Boleto, Cartao
- [ ] Testar YouTube embeds em iOS/Android
- [ ] Testar audio em background iOS Safari
- [ ] Testar rate limiting
- [ ] Performance audit Lighthouse
- [ ] Acessibilidade audit
- [ ] LGPD compliance check
- [ ] Security headers check
- [ ] Cross-browser testing
"@ | Set-Content "$tmpDir/34.md"
Create-Issue "QA completo + bug fixes pre-launch" "$tmpDir/34.md" @("priority:p0") $ms4

# Cleanup temp files
Remove-Item -Recurse -Force $tmpDir 2>$null

# ============================================================
# 4. GITHUB PROJECT V2
# ============================================================
Write-Host "`nCriando GitHub Project..." -ForegroundColor Yellow

# Check if org or user
$projectOutput = gh project create --owner commet-pro --title "Commet Baby - Roadmap" --format json 2>$null

if (-not $projectOutput) {
    # Try as user project if org fails
    $projectOutput = gh project create --title "Commet Baby - Roadmap" --format json 2>$null
}

if ($projectOutput) {
    $project = $projectOutput | ConvertFrom-Json
    $projectNumber = $project.number
    Write-Host "  OK Project criado: #$projectNumber" -ForegroundColor Green
    Write-Host "  URL: $($project.url)" -ForegroundColor Cyan
    
    # Add all issues to the project
    Write-Host "`nAdicionando issues ao project..." -ForegroundColor Yellow
    $issues = gh issue list --repo $REPO --limit 50 --state open --json number,url | ConvertFrom-Json
    foreach ($issue in $issues) {
        $owner = "commet-pro"
        gh project item-add $projectNumber --owner $owner --url $issue.url 2>$null
        if ($LASTEXITCODE -ne 0) {
            gh project item-add $projectNumber --owner rafaelpokas --url $issue.url 2>$null
        }
        Write-Host "  OK Issue #$($issue.number)" -ForegroundColor Green
    }
    
    Write-Host "`nProjeto configurado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "PROXIMOS PASSOS MANUAIS:" -ForegroundColor Yellow
    Write-Host "  1. Abra o project: $($project.url)" -ForegroundColor White
    Write-Host "  2. Adicione uma view 'Roadmap' clicando em '+'" -ForegroundColor White
    Write-Host "  3. Configure Start Date e Target Date nos fields" -ForegroundColor White
    Write-Host "  4. Agrupe por Milestone para visualizar o Gantt" -ForegroundColor White
} else {
    Write-Host "  Nao foi possivel criar o project via CLI." -ForegroundColor Yellow
    Write-Host "  Crie manualmente: https://github.com/orgs/commet-pro/projects/new" -ForegroundColor White
}

Write-Host "`nSetup completo!" -ForegroundColor Cyan
Write-Host "  Issues criadas com milestones e labels" -ForegroundColor White
Write-Host "  Labels customizadas configuradas" -ForegroundColor White
Write-Host "  Milestones por sprint configurados" -ForegroundColor White
Write-Host ""
