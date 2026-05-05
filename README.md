# Sistema de Corridas

API REST de um sistema de corridas feito com Node.js, Express, Sequelize e PostgreSQL.

## Como rodar

1. Ter o PostgreSQL rodando com o banco `banco1` criado
2. Instalar dependencias: `npm install`
3. Rodar: `node index.js`

O servidor roda na porta 3000.

## Rotas

### Categorias

- POST /categorias - criar categoria
- GET /categorias - listar categorias
- GET /categorias/:id - buscar por id
- PUT /categorias/:id - atualizar
- DELETE /categorias/:id - deletar

### Corridas

- POST /corridas - criar corrida (valor calculado automaticamente)
- GET /corridas - listar corridas
- GET /corridas/:id - buscar por id
- PUT /corridas/:id - atualizar (recalcula valor)
- DELETE /corridas/:id - deletar

## Regra de negocio

O valor da corrida é calculado assim:

`valorTotal = valorBase + (valorPorKm * distancia)`

Quando cria ou atualiza uma corrida o sistema busca a categoria e calcula automaticamente.
