# Execução local do backend do Commet Baby

Este guia explica como o ambiente local funciona e reúne os comandos necessários para iniciar, verificar e encerrar o banco de dados do projeto.

## Visão geral

O backend usa PostgreSQL como banco de dados e Prisma como camada de acesso e definição do schema.

```text
Aplicação / Prisma
       |
       | 127.0.0.1:5432
       v
Docker Desktop
       |
       v
Container PostgreSQL 16
       |
       v
Volume postgres_data
```

O Docker executa o PostgreSQL de forma isolada. A porta `5432` do container é publicada na mesma porta do computador, permitindo que a API e o Prisma acessem o banco por `127.0.0.1:5432`.

Os dados não ficam armazenados dentro do container. Eles ficam no volume Docker `postgres_data`, portanto continuam disponíveis quando o container é parado ou recriado.

## Arquivos envolvidos

### `docker-compose.yml`

Define a infraestrutura local:

- imagem `postgres:16-alpine`;
- banco `commet_baby`;
- usuário e senha locais `postgres`;
- porta `5432`;
- volume persistente;
- healthcheck para confirmar que o banco está pronto.

Essas credenciais servem apenas para desenvolvimento local. Produção deve usar credenciais fortes e armazenadas em um gerenciador de segredos.

### `.env`

Contém as variáveis usadas pela aplicação. Ele é ignorado pelo Git para evitar o versionamento de segredos.

A conexão local do banco é:

```dotenv
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/commet_baby?schema=public
```

Use `127.0.0.1` em vez de `localhost`: no Windows, algumas versões do engine do Prisma podem resolver `localhost` via IPv6 e não alcançar corretamente a porta publicada pelo Docker Desktop.

### `packages/database/.env`

O comando `pnpm --filter @commet/database ...` é executado com `packages/database` como diretório de trabalho. Por isso, o Prisma carrega o `.env` desse pacote em vez do arquivo da raiz.

A `DATABASE_URL` desse arquivo deve permanecer igual à do `.env` principal. Os dois arquivos são ignorados pelo Git.

### `packages/database/prisma/schema.prisma`

É a fonte de verdade da estrutura do banco. Ele descreve tabelas, colunas, relacionamentos, enums, índices e restrições utilizados pela aplicação.

## Primeira execução

Na raiz do projeto, execute:

```powershell
pnpm --filter @commet/database db:push
pnpm dev
```

O primeiro comando compara o `schema.prisma` com o banco, cria ou ajusta a estrutura e gera o Prisma Client. O segundo sobe o PostgreSQL pelo Docker, aguarda o healthcheck e inicia frontend e backend pelo Turborepo.

O `db:push` é apropriado para desenvolvimento local. Para mudanças versionadas e ambientes compartilhados, prefira migrations.

## Comandos do dia a dia

Iniciar PostgreSQL, frontend e backend:

```powershell
pnpm dev
```

O frontend fica disponível em `http://localhost:3000` e o backend em `http://localhost:4000`.

Verificar o estado:

```powershell
docker compose ps
```

Ver os logs:

```powershell
docker compose logs -f postgres
```

Aplicar alterações do schema:

```powershell
pnpm --filter @commet/database db:push
```

Abrir o Prisma Studio:

```powershell
pnpm --filter @commet/database db:studio
```

Após encerrar o `pnpm dev` com `Ctrl + C`, parar os containers sem apagar os dados:

```powershell
pnpm dev:stop
```

Parar e apagar também o volume local:

```powershell
docker compose down -v
```

> Atenção: `docker compose down -v` remove permanentemente os dados locais do PostgreSQL.

## Backup e restauração

Criar um backup SQL na raiz do projeto:

```powershell
docker exec commet-baby-postgres pg_dump -U postgres -d commet_baby --clean --if-exists | Set-Content -Encoding utf8 commet_baby_backup.sql
```

Restaurar o backup com o container em execução:

```powershell
Get-Content -Raw commet_baby_backup.sql | docker exec -i commet-baby-postgres psql -U postgres -d commet_baby
```

Arquivos de backup podem conter dados sensíveis e não devem ser adicionados ao Git.

## Solução de problemas

### O Prisma informa que `DATABASE_URL` não existe

Confirme que `packages/database/.env` existe e contém a variável. O `.env` da raiz, sozinho, não é carregado automaticamente pelo Prisma quando o comando é executado pelo filtro do workspace.

### O Prisma não alcança `localhost:5432`

Use `127.0.0.1` na `DATABASE_URL` e confirme o estado do container:

```powershell
docker compose ps
Test-NetConnection 127.0.0.1 -Port 5432
```

### A porta 5432 já está em uso

Outro PostgreSQL pode estar usando a porta. Verifique no PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 5432 -State Listen
```

Pare o serviço conflitante ou altere a porta publicada no `docker-compose.yml` e na `DATABASE_URL`.

### O banco ainda não está pronto

Espere o status ficar `healthy`:

```powershell
docker compose up -d --wait
docker compose logs postgres
```

Na primeira execução, a imagem precisa ser baixada e o volume inicializado, então o processo pode demorar um pouco mais.
