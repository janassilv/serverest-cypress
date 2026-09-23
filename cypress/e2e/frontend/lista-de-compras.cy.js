import LoginPage from '../../support/pages/LoginPage'
import HomeLojaPage from '../../support/pages/HomeLojaPage'
import MinhaListaPage from '../../support/pages/MinhaListaPage'
import { ProdutosApi } from '../../support/api/produtosApi'
import { UsuariosApi } from '../../support/api/usuariosApi'
import { buildUser } from '../../support/factories/userFactory'
import { buildProduct } from '../../support/factories/productFactory'

describe('Frontend | Lista de compras (usuário comum)', () => {
  let admin
  let cliente
  let produto

  beforeEach(() => {
    produto = buildProduct()

    // Pré-condições via API: produto cadastrado por um admin e um cliente comum
    cy.criarAdminAutenticado().then((adminCriado) => {
      admin = adminCriado
      ProdutosApi.create(produto, admin.token).then((res) => {
        expect(res.status, 'pré-condição: produto criado via API').to.eq(201)
      })
    })
    cy.criarUsuarioViaApi(buildUser()).then((usuario) => {
      cliente = usuario
    })

    LoginPage.visitar()
  })

  afterEach(() => {
    ProdutosApi.findByName(produto.nome).then((res) => {
      res.body.produtos?.forEach(({ _id }) => ProdutosApi.delete(_id, admin.token))
    })
    UsuariosApi.delete(cliente._id)
    UsuariosApi.delete(admin._id)
  })

  it('CT-FE-05 - Usuário comum deve pesquisar um produto e adicioná-lo à lista de compras', () => {
    LoginPage.login(cliente.email, cliente.password)
    HomeLojaPage.validarPagina()

    HomeLojaPage.pesquisar(produto.nome)
    HomeLojaPage.cardDoProduto(produto.nome).should('be.visible')

    HomeLojaPage.adicionarNaLista(produto.nome)

    MinhaListaPage.validarProdutoNaLista(produto.nome, 1)
  })
})
