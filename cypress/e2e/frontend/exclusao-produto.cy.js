import LoginPage from '../../support/pages/LoginPage'
import AdminHomePage from '../../support/pages/AdminHomePage'
import ListaProdutosPage from '../../support/pages/ListaProdutosPage'
import { ProdutosApi } from '../../support/api/produtosApi'
import { UsuariosApi } from '../../support/api/usuariosApi'
import { buildProduct } from '../../support/factories/productFactory'
import { MESSAGES } from '../../support/constants/messages'

describe('Frontend | Exclusão de produto (administrador)', () => {
  let admin
  let produto

  beforeEach(() => {
    produto = buildProduct()

    // Pré-condição via API: admin autenticado + produto já cadastrado
    cy.criarAdminAutenticado().then((adminCriado) => {
      admin = adminCriado
      ProdutosApi.create(produto, admin.token).then((res) => {
        expect(res.status, 'pré-condição: produto criado via API').to.eq(201)
      })
    })

    LoginPage.visitar()
  })

  afterEach(() => {
    // Garante a limpeza mesmo se o teste falhar antes da exclusão
    ProdutosApi.findByName(produto.nome).then((res) => {
      res.body.produtos?.forEach(({ _id }) => ProdutosApi.delete(_id, admin.token))
    })
    UsuariosApi.delete(admin._id)
  })

  it('CT-FE-04 - Administrador deve excluir um produto pela listagem', () => {
    cy.intercept('DELETE', '**/produtos/*').as('excluirProduto')

    LoginPage.login(admin.email, admin.password)
    AdminHomePage.validarBoasVindas(admin.nome)
    AdminHomePage.irParaListagemDeProdutos()

    ListaProdutosPage.validarPagina()
    ListaProdutosPage.linhaDoProduto(produto.nome).should('be.visible')

    ListaProdutosPage.excluirProduto(produto.nome)

    // Valida a comunicação entre front e API
    cy.wait('@excluirProduto').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body.message).to.eq(MESSAGES.EXCLUSAO_SUCESSO)
    })

    // Valida o reflexo na interface
    ListaProdutosPage.validarProdutoAusente(produto.nome)

    // Validação cruzada: o produto não existe mais no backend
    ProdutosApi.findByName(produto.nome).its('body.quantidade').should('eq', 0)
  })
})
