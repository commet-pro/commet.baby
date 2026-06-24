#!/usr/bin/env pwsh
# ============================================================
# 🍼 Commet Baby — GitHub Project Setup Script
# ============================================================
# Este script cria:
#   1. Labels customizadas
#   2. Milestones (Sprints)
#   3. Issues organizadas por módulo e sprint
#   4. GitHub Project V2 com Roadmap view
#
# Uso: ./setup-github-project.ps1
# Pré-requisito: gh auth login
# ============================================================

$ErrorActionPreference = "Stop"
$REPO = "commet-pro/commet.baby"

Write-Host "`n🍼 Commet Baby — GitHub Project Setup" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor DarkGray

# ============================================================
# 1. LABELS
# ============================================================
Write-Host "`n📌 Criando labels..." -ForegroundColor Yellow

$labels = @(
    @{ name = "module:auth";      color = "d73a4a"; description = "Módulo de Autenticação" },
    @{ name = "module:profile";   color = "0075ca"; description = "Módulo de Perfis de Bebê" },
    @{ name = "module:content";   color = "2ea44f"; description = "Módulo de Conteúdo & Player" },
    @{ name = "module:billing";   color = "e4e669"; description = "Módulo de Billing & Stripe" },
    @{ name = "module:analytics"; color = "7057ff"; description = "Módulo de Analytics" },
    @{ name = "module:admin";     color = "f9d0c4"; description = "Módulo Admin" },
    @{ name = "priority:p0";      color = "b60205"; description = "Prioridade crítica - blocker" },
    @{ name = "priority:p1";      color = "d93f0b"; description = "Prioridade alta" },
    @{ name = "priority:p2";      color = "fbca04"; description = "Prioridade média" },
    @{ name = "owner:frontend";   color = "c5def5"; description = "Responsabilidade do Frontend" },
    @{ name = "owner:backend";    color = "bfdadc"; description = "Responsabilidade do Backend" },
    @{ name = "owner:shared";     color = "d4c5f9"; description = "Responsabilidade compartilhada" },
    @{ name = "type:feature";     color = "0e8a16"; description = "Nova feature" },
    @{ name = "type:infra";       color = "006b75"; description = "Infraestrutura & DevOps" },
    @{ name = "type:docs";        color = "0075ca"; description = "Documentação" },
    @{ name = "type:design";      color = "e99695"; description = "Design & UI/UX" }
)

foreach ($label in $labels) {
    gh label create $label.name --color $label.color --description $label.description --repo $REPO --force 2>$null
    Write-Host "  ✅ $($label.name)" -ForegroundColor Green
}

# ============================================================
# 2. MILESTONES
# ============================================================
Write-Host "`n🏁 Criando milestones..." -ForegroundColor Yellow

$milestones = @(
    @{ title = "Marco 0 - Idealização & Setup";   due = "2026-07-06"; desc = "Documentação, setup do monorepo, CI/CD, design system base" },
    @{ title = "Sprint 1 - Foundation";            due = "2026-07-20"; desc = "Auth, landing page, perfil do bebê, database schema" },
    @{ title = "Sprint 2 - Core Features";         due = "2026-08-10"; desc = "Content listing, players, Stripe checkout, admin CRUD" },
    @{ title = "Sprint 3 - Enhancement";           due = "2026-08-31"; desc = "Bilíngue, metas de aprendizagem, dashboard parental" },
    @{ title = "Sprint 4 - Polish & Launch";       due = "2026-09-21"; desc = "Playlists, gift subs, email, QA, beta launch" }
)

foreach ($ms in $milestones) {
    gh api repos/$REPO/milestones -f title="$($ms.title)" -f due_on="$($ms.due)T23:59:59Z" -f description="$($ms.desc)" -f state="open" 2>$null
    Write-Host "  ✅ $($ms.title)" -ForegroundColor Green
}

# ============================================================
# 3. ISSUES
# ============================================================
Write-Host "`n📋 Criando issues..." -ForegroundColor Yellow

# Helper function
function New-Issue {
    param(
        [string]$Title,
        [string]$Body,
        [string[]]$Labels,
        [int]$Milestone
    )
    $labelStr = ($Labels | ForEach-Object { "--label `"$_`"" }) -join " "
    $cmd = "gh issue create --repo $REPO --title `"$Title`" --body `"$Body`" --milestone `"$Milestone`" $labelStr"
    
    $labelArgs = @()
    foreach ($l in $Labels) {
        $labelArgs += "--label"
        $labelArgs += $l
    }
    
    gh issue create --repo $REPO --title $Title --body $Body --milestone $Milestone @labelArgs 2>$null
    Write-Host "  ✅ $Title" -ForegroundColor Green
}

# ---------- MARCO 0 ----------
$m0 = 1  # Milestone number

New-Issue -Title "Setup monorepo com Turborepo + pnpm workspaces" `
    -Body "## Descrição`nConfigurar o monorepo com:`n- ``turbo.json```n- ``pnpm-workspace.yaml```n- ``tsconfig.base.json```n- Workspaces: ``apps/web``, ``apps/api``, ``packages/shared``, ``packages/database```n`n## Critérios de Aceite`n- [ ] ``pnpm install`` funciona na raiz`n- [ ] ``pnpm dev`` sobe os apps`n- [ ] ``pnpm lint`` roda em todos os packages`n- [ ] ``pnpm build`` compila tudo" `
    -Labels @("type:infra", "owner:shared", "priority:p0") -Milestone $m0

New-Issue -Title "Configurar CI/CD com GitHub Actions" `
    -Body "## Descrição`nCriar workflows de CI/CD:`n- ``ci.yml``: Lint + Type Check + Tests em PRs`n- ``deploy-web.yml``: Deploy frontend no Vercel`n- ``deploy-api.yml``: Deploy backend no Railway/Render`n`n## Critérios de Aceite`n- [ ] CI roda em cada PR`n- [ ] Deploy automático staging em push para develop`n- [ ] Deploy manual production em push para main" `
    -Labels @("type:infra", "owner:shared", "priority:p1") -Milestone $m0

New-Issue -Title "Configurar ESLint + Prettier + Husky" `
    -Body "## Descrição`n- ESLint com config compartilhada`n- Prettier com regras do projeto`n- Husky + lint-staged para pre-commit`n- Commitlint para conventional commits`n`n## Critérios de Aceite`n- [ ] ``pnpm lint`` funciona`n- [ ] Pre-commit hook valida lint`n- [ ] Commit messages seguem conventional commits" `
    -Labels @("type:infra", "owner:shared", "priority:p1") -Milestone $m0

New-Issue -Title "Documentação Marco 0 (docs/)" `
    -Body "## Descrição`nCommitar a documentação inicial:`n- ``ARCHITECTURE.md```n- ``BUSINESS_MODEL.md```n- ``API.md```n- ``CONTRIBUTING.md```n- ``DEPLOYMENT.md```n`n✅ Já criado neste commit inicial." `
    -Labels @("type:docs", "owner:shared", "priority:p0") -Milestone $m0

# ---------- SPRINT 1 - FOUNDATION ----------
$m1 = 2

New-Issue -Title "[AUTH] Registro com email + senha" `
    -Body "## RF-AUTH-01`n`n### Descrição`nImplementar endpoint de registro com:`n- Validação de email (formato + unicidade)`n- Hash de senha (bcrypt)`n- Criação de Stripe Customer`n- Envio de email de verificação`n`n### Endpoint`n``POST /api/v1/auth/register```n`n### Critérios de Aceite`n- [ ] Endpoint funcional com validação`n- [ ] Senha hasheada no DB`n- [ ] Stripe Customer criado`n- [ ] Retorna JWT + refresh token`n- [ ] Testes unitários" `
    -Labels @("module:auth", "owner:backend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[AUTH] Login com email + senha" `
    -Body "## RF-AUTH-02`n`n### Endpoint`n``POST /api/v1/auth/login```n`n### Critérios de Aceite`n- [ ] Validação de credenciais`n- [ ] Retorna JWT + refresh token`n- [ ] Rate limiting (5 tentativas/min)`n- [ ] Testes unitários" `
    -Labels @("module:auth", "owner:backend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[AUTH] Refresh token com rotação" `
    -Body "## RF-AUTH-05`n`n### Endpoint`n``POST /api/v1/auth/refresh```n`n### Critérios de Aceite`n- [ ] Refresh token rotation (novo token a cada uso)`n- [ ] Token antigo invalidado`n- [ ] Expiração de 7 dias`n- [ ] Detecção de reuse (invalidar família)" `
    -Labels @("module:auth", "owner:backend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[AUTH] Recuperação de senha" `
    -Body "## RF-AUTH-04`n`n### Endpoints`n``POST /api/v1/auth/forgot-password```n``POST /api/v1/auth/reset-password```n`n### Critérios de Aceite`n- [ ] Gera token de reset (expira em 1h)`n- [ ] Envia email com link`n- [ ] Reset funcional com validação de senha forte" `
    -Labels @("module:auth", "owner:backend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[AUTH] Páginas de Login/Register/Forgot Password (Frontend)" `
    -Body "## Frontend Auth Pages`n`n### Páginas`n- ``/login`` — Form de login`n- ``/register`` — Form de registro`n- ``/forgot-password`` — Form de recuperação`n`n### Critérios de Aceite`n- [ ] Design system aplicado`n- [ ] Validação client-side (Zod)`n- [ ] Loading states`n- [ ] Error handling`n- [ ] Responsivo (mobile-first)" `
    -Labels @("module:auth", "owner:frontend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[PROFILE] CRUD de perfil do bebê" `
    -Body "## RF-PROF-01 + RF-PROF-02`n`n### Endpoints`n``POST /api/v1/profiles```n``GET /api/v1/profiles```n``PATCH /api/v1/profiles/:id```n``DELETE /api/v1/profiles/:id```n`n### Critérios de Aceite`n- [ ] Criar perfil com nome, data de nascimento, avatar`n- [ ] Cálculo automático de faixa etária pela data de nascimento`n- [ ] Limite de perfis conforme plano (1 para Cometa/Estrela, 3 para Galáxia)`n- [ ] Validação de data (não futura, não > 3 anos)" `
    -Labels @("module:profile", "owner:backend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[PROFILE] Tela de perfis do bebê (Frontend)" `
    -Body "## Frontend Profile`n`n### Componentes`n- ``BabyProfileCard`` — Card com avatar, nome, idade`n- ``ProfileForm`` — Form de criação/edição`n- ``AvatarPicker`` — Seletor de avatares`n`n### Critérios de Aceite`n- [ ] Listar perfis do usuário`n- [ ] Criar novo perfil`n- [ ] Editar perfil existente`n- [ ] Deletar com confirmação" `
    -Labels @("module:profile", "owner:frontend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[WEB] Landing page" `
    -Body "## Landing Page`n`n### Seções`n- Hero com CTA de cadastro`n- Features/benefícios`n- Planos e preços`n- FAQ`n- Footer`n`n### Critérios de Aceite`n- [ ] SEO otimizado (meta tags, OG, structured data)`n- [ ] Mobile-first responsivo`n- [ ] Performance (LCP < 2.5s)`n- [ ] CTA para registro/trial" `
    -Labels @("owner:frontend", "priority:p0", "type:feature") -Milestone $m1

New-Issue -Title "[DB] Schema Prisma inicial + migrations + seed" `
    -Body "## Database Schema`n`n### Models`n- User, Session, BabyProfile`n- Content, LearningGoal, ContentLearningGoal, LearningGoalProgress`n- Playlist, PlaylistItem`n- WatchHistory`n- Subscription`n`n### Critérios de Aceite`n- [ ] Schema Prisma completo`n- [ ] Migration inicial gerada`n- [ ] Seed com dados de exemplo (conteúdos, planos)`n- [ ] ``@commet/database`` exportando Prisma Client" `
    -Labels @("owner:backend", "priority:p0", "type:infra") -Milestone $m1

# ---------- SPRINT 2 - CORE FEATURES ----------
$m2 = 3

New-Issue -Title "[CONTENT] Listagem de conteúdos com filtros" `
    -Body "## RF-CONT-01 + RF-CONT-02`n`n### Endpoint`n``GET /api/v1/content```n`n### Filtros`n- ageGroup, category, language, search, page, perPage`n`n### Critérios de Aceite`n- [ ] Paginação funcional`n- [ ] Filtros combinados`n- [ ] Ordenação por sortOrder/featured`n- [ ] Response com thumbnail, título, duração" `
    -Labels @("module:content", "owner:backend", "priority:p0", "type:feature") -Milestone $m2

New-Issue -Title "[CONTENT] Home page com grid de histórias (Frontend)" `
    -Body "## RF-CONT-01`n`n### Componentes`n- ``StoryCard`` — Card com thumbnail, título, duração, badge de faixa`n- ``StoryGrid`` — Grid responsivo de cards`n- ``FilterBar`` — Barra de filtros (faixa, categoria, busca)`n- ``FeaturedCarousel`` — Carrossel de destaques`n`n### Critérios de Aceite`n- [ ] Grid responsivo (1/2/3 colunas)`n- [ ] Filtros funcionais`n- [ ] Loading skeletons`n- [ ] Infinite scroll ou paginação" `
    -Labels @("module:content", "owner:frontend", "priority:p0", "type:feature") -Milestone $m2

New-Issue -Title "[CONTENT] YouTube embedded player (privacy-enhanced)" `
    -Body "## RF-CONT-03`n`n### Implementação`n- Usar ``youtube-nocookie.com`` (COPPA compliance)`n- YouTube IFrame API para controle`n- Responsive embed (16:9)`n- Loading state enquanto carrega`n`n### Critérios de Aceite`n- [ ] Privacy-enhanced mode ativo`n- [ ] Player responsivo`n- [ ] Controles de play/pause`n- [ ] Tracking de watchedSeconds`n- [ ] Parental gate para sair" `
    -Labels @("module:content", "owner:frontend", "priority:p0", "type:feature") -Milestone $m2

New-Issue -Title "[CONTENT] Audio player com background playback" `
    -Body "## RF-CONT-04`n`n### Implementação`n- Web Audio API ou ``<audio>`` element`n- Background playback (não pausar ao sair da tab)`n- Mini player persistente`n- Controls: play/pause, seek, volume`n`n### Critérios de Aceite`n- [ ] Reprodução de áudio funcional`n- [ ] Background playback (iOS Safari é complicado)`n- [ ] Mini player no bottom`n- [ ] Tracking de tempo ouvido" `
    -Labels @("module:content", "owner:frontend", "priority:p0", "type:feature") -Milestone $m2

New-Issue -Title "[BILLING] Stripe Checkout Session + Webhooks" `
    -Body "## RF-BILL-02 a RF-BILL-09`n`n### Endpoints`n``POST /api/v1/billing/checkout`` — Cria checkout session`n``POST /api/v1/webhooks/stripe`` — Webhook handler`n`n### Webhooks`n- ``checkout.session.completed```n- ``invoice.paid```n- ``invoice.payment_failed```n- ``customer.subscription.updated```n- ``customer.subscription.deleted```n`n### Critérios de Aceite`n- [ ] Checkout session com PIX, Boleto, Cartão`n- [ ] Trial de 7 dias`n- [ ] Webhook signature validation`n- [ ] Subscription criada/atualizada no DB`n- [ ] Idempotência nos handlers`n- [ ] Testes com Stripe CLI" `
    -Labels @("module:billing", "owner:backend", "priority:p0", "type:feature") -Milestone $m2

New-Issue -Title "[BILLING] Página de planos + checkout (Frontend)" `
    -Body "## RF-BILL-01`n`n### Componentes`n- ``PlanCard`` — Card com features e preço`n- ``PlanComparison`` — Tabela comparativa`n- ``CheckoutButton`` — Redirect para Stripe Checkout`n- ``BillingCycleToggle`` — Mensal/Anual toggle`n`n### Critérios de Aceite`n- [ ] 3 planos side-by-side`n- [ ] Toggle mensal/anual com desconto visível`n- [ ] Add-on bilíngue como checkbox`n- [ ] Redirect para Stripe Checkout`n- [ ] Success/cancel pages" `
    -Labels @("module:billing", "owner:frontend", "priority:p0", "type:feature") -Milestone $m2

New-Issue -Title "[CONTENT] Controle de acesso por plano" `
    -Body "## RF-CONT-11 + RF-CONT-12`n`n### Implementação`n- Middleware que valida subscription status + plan`n- Conteúdo filtrado pela faixa etária do plano`n- Conteúdo bilíngue bloqueado sem add-on`n- Overlay de upgrade em conteúdo bloqueado`n`n### Critérios de Aceite`n- [ ] Backend filtra conteúdo por plano`n- [ ] Frontend mostra overlay de upgrade`n- [ ] Trial tem acesso completo`n- [ ] Subscription expirada bloqueia acesso" `
    -Labels @("module:content", "module:billing", "owner:shared", "priority:p0", "type:feature") -Milestone $m2

New-Issue -Title "[ADMIN] CRUD de conteúdo" `
    -Body "## RF-ADM-01 a RF-ADM-03`n`n### Endpoints`n``POST /api/v1/admin/content```n``PATCH /api/v1/admin/content/:id```n``DELETE /api/v1/admin/content/:id```n``POST /api/v1/admin/content/:id/publish```n``POST /api/v1/admin/upload```n`n### Critérios de Aceite`n- [ ] CRUD completo`n- [ ] Upload de thumbnail e áudio (S3/R2)`n- [ ] Vincular YouTube Video ID`n- [ ] Status: Draft → Published → Archived`n- [ ] Validação de campos obrigatórios" `
    -Labels @("module:admin", "owner:backend", "priority:p0", "type:feature") -Milestone $m2

# ---------- SPRINT 3 - ENHANCEMENT ----------
$m3 = 4

New-Issue -Title "[CONTENT] Toggle bilíngue + add-on" `
    -Body "## RF-CONT-05 + RF-BILL-11`n`n### Critérios de Aceite`n- [ ] Toggle PT-BR / EN por conteúdo`n- [ ] Troca de YouTube video ID e audio URL`n- [ ] Add-on bilíngue como Stripe item`n- [ ] UI de upsell para add-on" `
    -Labels @("module:content", "module:billing", "owner:shared", "priority:p1", "type:feature") -Milestone $m3

New-Issue -Title "[CONTENT] Sistema de metas de aprendizagem" `
    -Body "## RF-CONT-07`n`n### Critérios de Aceite`n- [ ] LearningGoals CRUD (admin)`n- [ ] Vinculação conteúdo → metas`n- [ ] Tracking de progresso por perfil`n- [ ] UI com checklist visual de metas`n- [ ] Cálculo automático de progresso" `
    -Labels @("module:content", "owner:shared", "priority:p1", "type:feature") -Milestone $m3

New-Issue -Title "[CONTENT] Histórico + Continue Assistindo" `
    -Body "## RF-CONT-08`n`n### Critérios de Aceite`n- [ ] Registrar cada visualização no DB`n- [ ] Seção 'Continue Assistindo' na home`n- [ ] Retomar do ponto onde parou`n- [ ] Histórico completo na área do perfil" `
    -Labels @("module:content", "owner:shared", "priority:p1", "type:feature") -Milestone $m3

New-Issue -Title "[ANALYTICS] Dashboard parental" `
    -Body "## RF-ANAL-01 a RF-ANAL-03`n`n### Critérios de Aceite`n- [ ] Tempo de uso diário/semanal (gráfico)`n- [ ] Conteúdos mais assistidos`n- [ ] Progresso nas metas (visual)`n- [ ] Filtro por perfil de bebê" `
    -Labels @("module:analytics", "owner:shared", "priority:p1", "type:feature") -Milestone $m3

New-Issue -Title "[BILLING] Stripe Customer Portal" `
    -Body "## RF-BILL-10`n`n### Critérios de Aceite`n- [ ] Redirect para Customer Portal`n- [ ] Permitir troca de plano`n- [ ] Permitir cancelamento`n- [ ] Atualizar método de pagamento`n- [ ] Webhook synca mudanças" `
    -Labels @("module:billing", "owner:shared", "priority:p1", "type:feature") -Milestone $m3

New-Issue -Title "[AUTH] Login social (Google, Apple)" `
    -Body "## RF-AUTH-03`n`n### Critérios de Aceite`n- [ ] Google OAuth funcional`n- [ ] Apple Sign In funcional`n- [ ] Link com conta existente por email`n- [ ] Criação automática de Stripe Customer" `
    -Labels @("module:auth", "owner:backend", "priority:p1", "type:feature") -Milestone $m3

New-Issue -Title "[WEB] PWA manifest + service worker" `
    -Body "### Critérios de Aceite`n- [ ] manifest.json com ícones e cores`n- [ ] Service worker para cache básico`n- [ ] Install prompt em mobile`n- [ ] Splash screen" `
    -Labels @("owner:frontend", "priority:p1", "type:feature") -Milestone $m3

# ---------- SPRINT 4 - POLISH ----------
$m4 = 5

New-Issue -Title "[CONTENT] Playlists curadas por tema/rotina" `
    -Body "## RF-CONT-10`n`n### Critérios de Aceite`n- [ ] CRUD de playlists (admin)`n- [ ] Tipos: Curada, Rotina, Temática`n- [ ] Player em sequência`n- [ ] UI de playlist com drag-to-reorder (admin)" `
    -Labels @("module:content", "owner:shared", "priority:p2", "type:feature") -Milestone $m4

New-Issue -Title "[BILLING] Gift subscriptions" `
    -Body "## RF-BILL-13`n`n### Critérios de Aceite`n- [ ] Checkout de gift com email do destinatário`n- [ ] Email de presente enviado`n- [ ] Código de resgate funcional`n- [ ] Aplicar gift como subscription" `
    -Labels @("module:billing", "owner:shared", "priority:p2", "type:feature") -Milestone $m4

New-Issue -Title "Emails transacionais (welcome, billing, reset)" `
    -Body "### Templates`n- Welcome email`n- Payment receipt`n- Payment failed`n- Password reset`n- Trial ending soon (D-2)`n`n### Critérios de Aceite`n- [ ] Templates HTML responsivos`n- [ ] Integração com Resend/SendGrid`n- [ ] Variáveis dinâmicas (nome, plano, etc)" `
    -Labels @("owner:backend", "priority:p2", "type:feature") -Milestone $m4

New-Issue -Title "[ADMIN] Dashboard de métricas de negócio" `
    -Body "## RF-ADM-05`n`n### Métricas`n- MRR (Monthly Recurring Revenue)`n- Churn rate`n- MAU (Monthly Active Users)`n- Conversão trial → pago`n- Top conteúdos`n`n### Critérios de Aceite`n- [ ] Dashboard com gráficos`n- [ ] Filtro por período`n- [ ] Export CSV" `
    -Labels @("module:admin", "owner:shared", "priority:p2", "type:feature") -Milestone $m4

New-Issue -Title "[ANALYTICS] Timer parental (limite de tela)" `
    -Body "## RF-ANAL-04`n`n### Critérios de Aceite`n- [ ] Configurar limite diário por perfil`n- [ ] Aviso em 5 min antes de acabar`n- [ ] Bloqueio suave com parental gate`n- [ ] Configurações na área do perfil" `
    -Labels @("module:analytics", "owner:frontend", "priority:p2", "type:feature") -Milestone $m4

New-Issue -Title "QA completo + bug fixes pré-launch" `
    -Body "### Checklist`n- [ ] Testar todos os fluxos em mobile`n- [ ] Testar checkout Stripe (PIX, Boleto, Cartão)`n- [ ] Testar YouTube embeds em iOS/Android`n- [ ] Testar audio em background (iOS Safari)`n- [ ] Testar rate limiting`n- [ ] Performance audit (Lighthouse)`n- [ ] Acessibilidade audit`n- [ ] LGPD compliance check`n- [ ] Security headers check`n- [ ] Cross-browser testing" `
    -Labels @("priority:p0") -Milestone $m4

# ============================================================
# 4. GITHUB PROJECT V2
# ============================================================
Write-Host "`n📊 Criando GitHub Project..." -ForegroundColor Yellow

$projectOutput = gh project create --owner commet-pro --title "Commet Baby — Roadmap" --format json 2>$null
if ($projectOutput) {
    $project = $projectOutput | ConvertFrom-Json
    $projectNumber = $project.number
    Write-Host "  ✅ Project criado: #$projectNumber" -ForegroundColor Green
    Write-Host "  📎 URL: $($project.url)" -ForegroundColor Cyan
    
    # Add all issues to the project
    Write-Host "`n📎 Adicionando issues ao project..." -ForegroundColor Yellow
    $issues = gh issue list --repo $REPO --limit 50 --json number | ConvertFrom-Json
    foreach ($issue in $issues) {
        gh project item-add $projectNumber --owner commet-pro --url "https://github.com/$REPO/issues/$($issue.number)" 2>$null
        Write-Host "  ✅ Issue #$($issue.number) adicionada" -ForegroundColor Green
    }
    
    Write-Host "`n🎉 Projeto configurado!" -ForegroundColor Green
    Write-Host "`n⚠️  PRÓXIMOS PASSOS MANUAIS:" -ForegroundColor Yellow
    Write-Host "  1. Abra o project: $($project.url)" -ForegroundColor White
    Write-Host "  2. Clique em '+' para adicionar uma view 'Roadmap'" -ForegroundColor White
    Write-Host "  3. Configure o campo de data: Start Date = milestone start, End Date = milestone due" -ForegroundColor White
    Write-Host "  4. Agrupe por Milestone para ver o Gantt" -ForegroundColor White
} else {
    Write-Host "  ⚠️  Não foi possível criar o project via CLI." -ForegroundColor Yellow
    Write-Host "  Crie manualmente em: https://github.com/orgs/commet-pro/projects/new" -ForegroundColor White
}

Write-Host "`n✨ Setup completo!" -ForegroundColor Cyan
Write-Host "  📋 Issues criadas com milestones e labels" -ForegroundColor White
Write-Host "  🏷️  Labels customizadas configuradas" -ForegroundColor White
Write-Host "  🏁 Milestones por sprint configurados" -ForegroundColor White
Write-Host "`n" -ForegroundColor White
