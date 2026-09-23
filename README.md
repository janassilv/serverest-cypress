# ServeRest – Testes automatizados com Cypress

Projeto de automação de testes **E2E (frontend)** e de **API** da aplicação [ServeRest](https://serverest.dev/), desenvolvido com **Cypress + JavaScript**.

- Frontend: https://front.serverest.dev/
- API (Swagger): https://serverest.dev/

## Stack

- [Cypress](https://www.cypress.io/) – framework de testes
- [@faker-js/faker](https://fakerjs.dev/) – geração de massa de dados dinâmica
- GitHub Actions – execução contínua dos testes

## Padrões e boas práticas adotados

| Prática | Onde | Por quê |
|---|---|---|
| **Page Object** | `cypress/support/pages` | Isola seletores e ações de tela; os testes descrevem comportamento, não detalhes de UI |
| **Service Object (camada de API)** | `cypress/support/api` | Centraliza endpoints; reaproveitado nos testes de API e nas pré-condições do frontend |
| **Factory / Data Builder** | `cypress/support/factories` | Massa de dados única a cada execução, com `overrides` para cenários específicos |
| **Custom Commands** | `cypress/support/commands.js` | Pré-condições reutilizáveis (criar usuário, criar admin autenticado) |
| **Constantes de mensagens** | `cypress/support/constants` | Evita strings mágicas espalhadas nas assertivas |
| **Setup via API** | testes de frontend | Pré-condições rápidas e estáveis; a UI é usada apenas no que está sendo testado |
| **Independência e limpeza de dados** | hooks `afterEach` | Cada teste cria e remove a própria massa, sem depender de ordem de execução |
| **Seletores `data-testid`** | Page Objects | Seletores resilientes a mudanças de layout/estilo |
| **Interceptação de rede (`cy.intercept`)** | CT-FE-04 | Valida o contrato entre frontend e API e sincroniza o teste com a resposta real, sem esperas fixas |
| **Validação cruzada UI + API** | CT-FE-04 | Confirma que a ação feita na tela teve efeito real no backend |

## Estrutura

```
cypress/
├── e2e/
│   ├── api/
│   │   ├── produtos.api.cy.js
│   │   └── usuarios.api.cy.js
│   └── frontend/
│       ├── cadastro-produto.cy.js
│       ├── cadastro-usuario.cy.js
│       ├── exclusao-produto.cy.js
│       ├── lista-de-compras.cy.js
│       └── login.cy.js
└── support/
    ├── api/            # camada de serviços da API
    ├── constants/      # mensagens esperadas
    ├── factories/      # geração de massa de dados
    ├── pages/          # Page Objects
    ├── commands.js
    └── e2e.js
```

## Cenários automatizados

### Frontend (E2E)

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT-FE-01 | Cadastro de novo usuário comum | Mensagem de sucesso e redirecionamento para a home da loja |
| CT-FE-02 | Login com senha inválida | Mensagem "Email e/ou senha inválidos" e permanência na tela de login |
| CT-FE-03 | Administrador cadastra produto | Produto exibido na listagem com nome, preço, descrição e quantidade |
| CT-FE-04 *(extra)* | Administrador exclui produto pela listagem | Requisição `DELETE` interceptada com `200`, produto removido da tela e inexistente na API |
| CT-FE-05 *(extra)* | Cliente pesquisa produto e adiciona à lista de compras | Produto exibido em "Minha lista de produtos" com quantidade 1 |

> O desafio pede 3 cenários de frontend. Os cenários CT-FE-04 e CT-FE-05 foram adicionados para cobrir o ciclo completo do produto (cadastro → exclusão) e a jornada do perfil comprador, além de demonstrar o uso de `cy.intercept` para validar a comunicação entre frontend e API.

### API

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT-API-01 | `POST /usuarios` com dados válidos | `201`, mensagem de sucesso e dados consistentes em `GET /usuarios/{id}` |
| CT-API-02 | `POST /usuarios` com e-mail já cadastrado | `400` e mensagem "Este email já está sendo usado" |
| CT-API-03 | `POST /produtos` com token de administrador | `201`, mensagem de sucesso e dados consistentes em `GET /produtos/{id}` |

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org/) (versão LTS) e Git.

```bash
git clone https://github.com/janassilv/serverest-cypress.git
cd serverest-cypress
npm install
```

| Comando | Descrição |
|---|---|
| `npm run cy:open` | Abre o Cypress no modo interativo |
| `npm test` | Executa todos os testes em modo headless |
| `npm run test:api` | Executa apenas os testes de API |
| `npm run test:frontend` | Executa apenas os testes de frontend |

## Integração contínua

A cada push na `main` e em pull requests, o workflow `.github/workflows/cypress.yml` executa a suíte completa no GitHub Actions. Em caso de falha, os screenshots ficam disponíveis como artefato da execução.

## Observações

- A ServeRest é um ambiente público e compartilhado; por isso toda massa de dados é gerada dinamicamente e removida ao final de cada teste.
