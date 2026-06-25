Write-Host "Iniciando Setup do Commet Baby (Windows)..." -ForegroundColor Cyan

# Check Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js nao encontrado. Por favor, instale o Node.js v20+ antes de continuar." -ForegroundColor Red
    exit 1
}

# Install pnpm if missing
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "Instalando pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Run pnpm install
Write-Host "Instalando dependencias do projeto (Turbo, Husky, etc)..." -ForegroundColor Yellow
pnpm install

# Configure .env
if (!(Test-Path .env)) {
    if (Test-Path .env.example) {
        Write-Host "Criando arquivo .env a partir de .env.example..." -ForegroundColor Yellow
        Copy-Item .env.example .env
    } else {
        Set-Content .env -Value "OBSIDIAN_VAULT_PATH=."
    }
}

# Install Obsidian via Winget
if (!(Get-Command obsidian -ErrorAction SilentlyContinue)) {
    Write-Host "Verificando Obsidian... (Pode demorar alguns segundos)" -ForegroundColor Yellow
    winget install Obsidian.Obsidian --accept-source-agreements --accept-package-agreements
}

Write-Host "Setup concluido! Abrindo o Obsidian no vault do projeto..." -ForegroundColor Green
$path = $PWD.Path -replace '\\', '/'
Start-Process "obsidian://open?path=$path"
