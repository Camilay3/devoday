# Devoday

> Devocionais simples para criar constância na Palavra.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=20232A)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-5FA04E?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

O Devoday é uma aplicação para apoiar novos cristãos na prática de devocionais e
lectio divina. A plataforma também ajuda quem já possui uma rotina de estudos
bíblicos, mas precisa de mais constância.

## Funcionalidades

- Cadastro e login com confirmação de email.
- Autenticação por access token e refresh token.
- Sugestões diárias de leitura e reflexão.
- Registro da constância nos estudos.
- Conquistas para acompanhar a evolução.
- Interface responsiva e acessível para uso diário.

## Stack

### Frontend

<img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind" alt="React, TypeScript, Vite e Tailwind CSS" />

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,express,prisma,postgres" alt="Node.js, Express, Prisma e PostgreSQL" />

### Ferramentas e infraestrutura

<img src="https://skillicons.dev/icons?i=docker,nginx" alt="Docker e Nginx" />

Também são utilizados React Router, React Hook Form, Zod, Axios, Motion, JWT,
bcrypt, Nodemailer, OpenAPI e Swagger UI.

## Como executar

### Pré-requisitos

- Node.js 22 ou superior
- Docker e Docker Compose

### Com Docker Compose

1. Copie o arquivo de variáveis:

   ```bash
   cp .env.example .env
   ```

2. Preencha no `.env` os segredos, o banco de dados, a origem do frontend e as
   credenciais do email.

3. Inicie os serviços:

   ```bash
   docker compose up --build
   ```

O frontend ficará disponível em `http://localhost:5173` e a API em
`http://localhost:3003`.

### Executando separadamente

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

Nesse caso, é necessário ter um PostgreSQL disponível e configurar o
`DATABASE_URL` no ambiente do backend.

## API

A documentação interativa da API está disponível em:

```text
http://localhost:3003/api-docs
```

As rotas incluem autenticação, confirmação de email e gerenciamento da conta do
usuário. As entradas são validadas no backend, e as rotas de autenticação
possuem proteção contra excesso de tentativas.

## Variáveis de ambiente

Consulte [`.env.example`](./.env.example) para a lista completa de variáveis
necessárias para banco de dados, frontend, autenticação e envio de emails.

Para gerar segredos seguros para os tokens:

```bash
openssl rand -base64 32
```

Execute o comando duas vezes e use os resultados em `ACCESS_TOKEN_SECRET` e
`REFRESH_TOKEN_SECRET`. Também é possível gerar um segredo com o Node.js:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

## Créditos

- Código: [Camila Azevedo](https://github.com/Camilay3)
