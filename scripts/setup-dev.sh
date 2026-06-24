#!/bin/bash
echo -e "\033[1;36mIniciando Setup do Commet Baby (Mac/Linux)...\033[0m"

if ! command -v node &> /dev/null; then
    echo -e "\033[1;31mNode.js não encontrado. Por favor, instale o Node.js v20+ antes de continuar.\033[0m"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo -e "\033[1;33mInstalando pnpm...\033[0m"
    npm install -g pnpm
fi

echo -e "\033[1;33mInstalando dependências do projeto (Turbo, Husky, etc)...\033[0m"
pnpm install

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo -e "\033[1;33mCriando arquivo .env a partir de .env.example...\033[0m"
        cp .env.example .env
    else
        echo "OBSIDIAN_VAULT_PATH=." > .env
    fi
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
    if ! command -v obsidian &> /dev/null && ! [ -d "/Applications/Obsidian.app" ]; then
        echo -e "\033[1;33mObsidian não encontrado. Instalando via Homebrew...\033[0m"
        if ! command -v brew &> /dev/null; then
            echo -e "\033[1;31mHomebrew não encontrado. Instale o Obsidian manualmente: https://obsidian.md\033[0m"
        else
            brew install --cask obsidian
        fi
    fi
    echo -e "\033[1;32mSetup concluído! Abrindo o Obsidian no vault do projeto...\033[0m"
    open "obsidian://open?path=$PWD"
else
    echo -e "\033[1;32mSetup concluído! (Para Linux, baixe o Obsidian em https://obsidian.md e abra a pasta atual como vault).\033[0m"
fi
