# Zeno candidata - API

API REST para a App Zeno candidato, desenvolvida com **Express.js**, **PostgreSQL** e **Prisma ORM**. Com upload de fotos de candidatos via **Cloudinary**.

## Tecnologias

- Node.js + Express.js
- PostgreSQL + Prisma ORM
- Cloudinary + Multer (upload de fotos)

## Instalação

**1. Clonar o repositório**

```bash
git clone https://github.com/Ximana/zeno-candidata-api.git
cd zeno-candidata-api
```

**2. Instalar dependências**

```bash
npm install
```

**3. Configurar o `.env`**

```bash
cp .env.example .env
```

Preenche o `.env` com os teus dados:

```env
DATABASE_URL="postgresql://utilizador:password@localhost:5432/recrutaapp"
PORT=3001
CLOUDINARY_CLOUD_NAME="o_teu_cloud_name"
CLOUDINARY_API_KEY="a_tua_api_key"
CLOUDINARY_API_SECRET="o_teu_api_secret"
```

> As credenciais do Cloudinary encontras em **cloudinary.com**.

**4. Criar as tabelas na base de dados**

```bash
npm run db:migrate
```

**5. Popular com dados de exemplo (opcional)**

```bash
npm run db:seed
```

**6. Iniciar o servidor**

```bash
npm run dev      # desenvolvimento
npm start        # produção
```

Servidor disponível em `http://localhost:3001`

## Estrutura

```
zeno-candidata-api/
|
├── prisma/
│   ├── schema.prisma          # Definição dos modelos da base de dados
│   └── seed.js                # Script para popular a base de dados
│
├── src/
│   ├── config/
│   │   ├── database.js        # Instância do PrismaClient
│   │   └── cloudinary.js      # Configuração do Cloudinary
│   │
│   ├── middlewares/
│   │   ├── erros.js           # Tratamento de erros
│   │   └── validacao.js       # Validação dos dados recebidos
│   │
│   ├── modulos/
│   │   ├── candidatos/
│   │   │   ├── candidato.rotas.js
│   │   │   ├── candidato.controlador.js
│   │   │   └── candidato.servico.js
│   │   ├── vagas/
│   │   │   ├── vaga.rotas.js
│   │   │   ├── vaga.controlador.js
│   │   │   └── vaga.servico.js
│   │   └── candidaturas/
│   │       ├── candidatura.rotas.js
│   │       ├── candidatura.controlador.js
│   │       └── candidatura.servico.js
│   │
│   └── app.js                 # Configuração do Express
│
├── server.js                  # Ponto de entrada
├── .env.example               # Modelo das variáveis de ambiente
├── .gitignore
└── package.json
```
