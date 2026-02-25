# Documentação da API — Zeno app candidatos

**Base URL:** `http://localhost:3001/api`

Todas as respostas são em **JSON**. Erros devolvem sempre `{ "erro": "mensagem" }`.

---

## Candidatos

As rotas de candidatos usam `multipart/form-data` (não JSON) para suportar o upload de foto.

### Listar todos
```
GET /api/candidatos
```
Devolve todos os candidatos com as suas formações incluídas.

---

### Buscar um
```
GET /api/candidatos/:id
```
Devolve o candidato com as suas formações e candidaturas.

---

### Criar
```
POST /api/candidatos
Content-Type: multipart/form-data
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `nomeCompleto` | string | Sim |
| `email` | string | Sim |
| `telefone` | string | Sim |
| `dataNascimento` | string (YYYY-MM-DD) | Sim |
| `genero` | string | Sim |
| `provincia` | string | Sim |
| `bilheteIdentidade` | string | Não |
| `estadoCivil` | string | Não |
| `anosExperienciaInt` | number | Não |
| `observacoes` | string | Não |
| `foto` | ficheiro (imagem, máx. 5MB) | Não |

> O campo `provincia` aceita qualquer string — ex: `"Luanda"`, `"Huíla"`, `"Lunda Sul"`.

---

### Actualizar
```
PUT /api/candidatos/:id
Content-Type: multipart/form-data
```
Mesmos campos do criar, todos opcionais. Se enviar uma nova `foto`, a anterior é removida do Cloudinary automaticamente.

---

### Remover
```
DELETE /api/candidatos/:id
```
Remove o candidato, as suas formações e candidaturas. A foto é removida do Cloudinary.

**Resposta: 204** (sem corpo)

---

## Formações

As formações são geridas dentro do módulo de candidatos.

### Listar formações de um candidato
```
GET /api/candidatos/:id/formacoes
```

### Adicionar formação
```
POST /api/candidatos/:id/formacoes
Content-Type: application/json
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `instituicao` | string | Sim |
| `grau` | string | Sim |
| `curso` | string | Sim |
| `anoInicio` | number | Sim |
| `anoConclusao` | number | Não |
| `aFrequentar` | boolean | Não |
| `pais` | string | Não (padrão: `"Angola"`) |

### Actualizar formação
```
PUT /api/candidatos/:id/formacoes/:formacaoId
Content-Type: application/json
```
Mesmos campos do adicionar, todos opcionais.

### Remover formação
```
DELETE /api/candidatos/:id/formacoes/:formacaoId
```
**Resposta: 204** (sem corpo)

---

## Vagas

### Listar todas
```
GET /api/vagas
```

### Buscar uma
```
GET /api/vagas/:id
```
Inclui as candidaturas associadas à vaga.

### Criar
```
POST /api/vagas
Content-Type: application/json
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `titulo` | string | Sim |
| `departamento` | string | Sim |
| `descricao` | string | Não |

### Actualizar
```
PUT /api/vagas/:id
Content-Type: application/json
```
Mesmos campos do criar, todos opcionais.

### Remover
```
DELETE /api/vagas/:id
```
**Resposta: 204** (sem corpo)

---

## Candidaturas

### Listar todas
```
GET /api/candidaturas
```
Cada candidatura inclui os dados resumidos do candidato e da vaga.

### Buscar uma
```
GET /api/candidaturas/:id
```

### Criar
```
POST /api/candidaturas
Content-Type: application/json
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `candidatoId` | string (uuid) | Sim |
| `vagaId` | string (uuid) | Sim |
| `estado` | string | Não (padrão: `"Em análise"`) |

### Actualizar
```
PUT /api/candidaturas/:id
Content-Type: application/json
```

Aceita apenas estes campos — campos extras como `candidato`, `vaga`, `id` ou `criadoEm` são ignorados:

| Campo | Tipo |
|-------|------|
| `candidatoId` | string (uuid) |
| `vagaId` | string (uuid) |
| `estado` | string |

**Exemplo, alterar apenas o estado:**
```json
{ "estado": "Aprovado" }
```

### Remover
```
DELETE /api/candidaturas/:id
```
**Resposta: 204** (sem corpo)

---

## Códigos de resposta

| Código | Significado |
|--------|-------------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `204` | Operação concluída sem conteúdo (DELETE) |
| `400` | Dados inválidos ou campos obrigatórios em falta |
| `404` | Registo não encontrado |
| `409` | Conflito, ex: email já existe |
| `500` | Erro interno do servidor |

---

## Estados da candidatura

| Valor | Descrição |
|-------|-----------|
| `Em análise` | Valor padrão ao criar |
| `Aprovado` | Candidato aprovado |
| `Reprovado` | Candidato reprovado |