# FocusFlow — API (Node.js + Fastify + TypeScript + Prisma + PostgreSQL)

FocusFlow é um sistema de produtividade assistido por IA, focado em organização pessoal, gestão de tarefas e acompanhamento de hábitos.
Este repositório contém a API backend construída com uma arquitetura modular e escalável.

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io)
- [PostgreSQL](https://www.postgresql.org)
- [Zod](https://zod.dev/)
- [JWT (JsonWebToken)](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

---

## Estrutura do projeto

```
src/
├── database/
│   └── prisma.ts
├── middlewares/
│   └── auth.middleware.ts
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schema.ts
│   │   └── auth.service.ts
│   └── user/
│       ├── user.controller.ts
│       ├── user.routes.ts
│       └── user.service.ts
└── index.ts
```

Arquitetura organizada por módulos, facilitando escalabilidade e leitura.

---

## Funcionalidades atuais

**Registro de usuario**
`POST /auth/register`

**Login**
`POST /auth/login`

**Autenticação via JWT (Bearer Token)**

---

## Instalação

1. Clone o repositório
```sh
git clone https://github.com/matheustorsani/FocusFlow-API.git
cd FocusFlow-API
```

2. Instale as dependências
```js
npm install
```

3. Crie o arquivo `.env`
```sh
DATABASE_URL="postgresql://usuario:senha@localhost:5432/focusflow"
JWT_SECRET="sua_chave_secreta_aqui"
```

> Recomendo que use [Essa ferramenta](https://github.com/matheustorsani/qrcode-password-generator) para gerar o JWT_SECRET.

---

## Configure banco + Prisma

1. Gere o client:
```sh
npx prisma generate
```

2. Rode migrations: 
```sh
npx prisma migrate dev
```

---

## Rode o servidor

```js
npm run dev
```

Servidor sobe em `http://localhost:3333`

---

## Endpoints Principais

- Registro
```json
POST /auth/register
{
  "name": "Nome",
  "email": "email@exemplo.com",
  "password": "123456" 
}
```

- Login
```json
POST /auth/login
{
  "email": "email@example.com",
  "password": "123456"
}
```

---

## Próximos passos do projeto

- Implementar módulo de usuario (/user/me)
- Criar CRUD de tarefas
- Criar sistema de categorias e hábitos
- Criar refresh tokens
- Adicionar documentação Swagger (OpenAPI)
- Adicionar testes unitários (Vitest)

---

## Licença

MIT - Livre para o uso, modificação e distribuição.