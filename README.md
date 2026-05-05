# Sistema de Corridas
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
