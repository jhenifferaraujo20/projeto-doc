# Documentação módulo brands

### 1. Visão Geral do Módulo
O módulo Brands é responsável pelo gerenciamento das marcas (brands) dentro do sistema OneDash. Cada marca representa uma entidade que contém orçamentos gerais e específicos para campanhas, vinculada a um CMO (Chief Marketing Officer), além de relacionar redes sociais, campanhas e insights associados.

Este módulo deve permitir operações CRUD (Create, Read, Update, Delete) para que os CMOs possam criar, visualizar, editar e deletar suas próprias marcas.

### 2. Passo a passo para entender o código (por onde começar)
Se você é novo, siga esta ordem para entender e trabalhar no módulo:

1. Routes (Rotas): onde definimos os endereços web que o sistema “escuta” (ex: /api/brands/create). É o ponto de entrada das requisições.

2. Controllers (Controladores): recebem o pedido das rotas e pegam os dados enviados. Depois, mandam para o próximo passo.

3. Application (Aplicação): aqui está a “cabeça” do módulo, a parte que sabe as regras de negócio e verifica se o usuário pode ou não fazer algo.

4. Repositories (Repositórios): fazem a ponte entre a aplicação e o banco de dados (Firestore). Eles “guardam” e “buscam” os dados.

5. Validators (Validadores): checam se os dados que chegaram são válidos antes de deixar o sistema usar.

### 3. Modelo de dados
```
| Campo              | Tipo         | Descrição                                   |
|--------------------|--------------|---------------------------------------------|
| `nome`             | string       | Nome da marca                               |
| `orcamentGeral`    | number       | Orçamento geral da marca                     |
| `orçamentoCampaign`| number       | Orçamento específico para campanhas         |
| `cmoId`            | string       | ID do CMO que criou a marca (dono)          |
| `acessIdList`      | string[]     | Lista de IDs com acesso (opcional)           |
| `socialMediaIds`   | string[]     | Lista de IDs de redes sociais associadas     |
| `insightsMarcasIDs`| string[]     | Lista de IDs dos insights da marca           |
| `campanhaList`     | string[]     | Lista de campanhas associadas                 |
```
Dica: O Firestore cria o ID automaticamente para cada marca nova. Não precisa criar manualmente!

### 4. Estrutura de pastas
```
brands/
├─ application/                # Camada de aplicação, que orquestra regras de negócio (serviço)
│   └─ brands.application.ts  # Classe/serviço para lógica do módulo
├─ controllers/                # Controladores HTTP, recebem request e chamam a aplicação
│   └─ brands.controller.ts
├─ interfaces/                 # Interfaces e contratos do módulo (tipos, DTOs, interfaces de repositório)
│   ├─ brands.interface.ts
│   └─ brands.repository.int.ts
├─ repositories/               # Implementações de acesso a dados (Firestore)
│   └─ brands.repository.ts
├─ routes/                    # Definição das rotas Express do módulo
│   └─ brands.routes.ts
├─ validators/                # Validação de dados (validação DTOs com Joi)
│   └─ brands.validators.ts
```
#### Estrutura de pastas e analogia para facilitar o entendimento
```
| Pasta           | O que faz                             | Analogia simples                   |
| --------------- | ------------------------------------- | ---------------------------------- |
| `routes/`       | Define as URLs da API                 | Porta de entrada do restaurante    |
| `controllers/`  | Recebe pedidos e responde             | Garçom que anota seu pedido        |
| `application/`  | Faz as regras e decisões do negócio   | Chef que decide o que será feito   |
| `repositories/` | Acessa o banco de dados               | Cozinha que guarda os ingredientes |
| `validators/`   | Verifica se os dados estão corretos   | Fiscal que checa os ingredientes   |
| `interfaces/`   | Define formatos e contratos do código | Receita padrão que todos seguem    |
```
## 5. Como funciona esse padrão na prática
Application: Aqui fica a lógica principal do módulo, as regras de negócio, que vão chamar os repositórios para acessar dados.

Controllers: São responsáveis só por receber a requisição HTTP, extrair dados e chamar o Application. Tratam erros e retornam respostas HTTP.

Interfaces: Define tipos, contratos e interfaces de dependência, como a interface do repositório.

Repositories: Implementação concreta que acessa o banco Firestore (ou outro).

Validators: Funções para validar a entrada (req.body), separando essa lógica para manter controllers limpos.

Routes: Definem os endpoints e ligam os controllers, aplicando middleware.

## 6. Fluxograma
```text
   ┌──────────────┐
   │   Request    │
   │ (HTTP/API)   │
   └─────┬────────┘
         │
         ▼
┌────────────────────┐
│  brands.routes.ts  │
│ - Define endpoints │
│ - Aponta p/ ctrl   │
└─────┬──────────────┘
      │
      ▼
┌──────────────────────┐
│ brands.controller.ts │
│ - Recebe req/res     │
│ - Chama aplicação    │
└─────┬────────────────┘
      │
      ▼
┌─────────────────────────┐
│ brands.application.ts   │
│ - Lógica de negócio     │
│ - Valida permissões     │
│ - Chama repository      │
└─────┬───────────────────┘
      │
      ▼
┌─────────────────────────┐
│ brands.repository.ts    │
│ - Comunicação c/ DB     │
│ - CRUD no Firestore     │
└─────┬───────────────────┘
      │
      ▼
┌─────────────────────────┐
│ Firestore (brands)      │
│ - Guarda dados          │
└─────────────────────────┘

```

#### 💡 Explicação resumida:

Request — vem de um cliente (frontend, API externa, Postman…).

Routes — mapeia a URL e o método HTTP para um controller.

Controller — recebe os dados da requisição, chama o application e envia a resposta.

Application — concentra a lógica de negócio (validações, regras, permissões).

Repository — lida com o banco de dados (Firestore).

Firestore — armazena as brands.

### 📝 Especificações das Tasks
Cada dev ficará responsável por uma operação CRUD.
O módulo precisa conter:

Create: Criar nova marca (POST /api/brands/create)

Update: Editar marca existente (PUT /api/brands/update/:id)

Get by ID: Buscar marca pelo ID (GET /api/brands/getById/:id)

Get All by CMO: Listar todas as marcas criadas por um CMO (GET /api/brands/list?cmoId=...)

Delete: Excluir marca (DELETE /api/brands/delete/:id)

Regra de permissão:
O CMO só pode ver, editar ou excluir marcas criadas por ele mesmo.
