import LoginPage from '../../support/pages/LoginPage'
import AdminHomePage from '../../support/pages/AdminHomePage'
import CadastroProdutoPage from '../../support/pages/CadastroProdutoPage'
import ListaProdutosPage from '../../support/pages/ListaProdutosPage'
import { ProdutosApi } from '../../support/api/produtosApi'
import { UsuariosApi } from '../../support/api/usuariosApi'
import { buildProduct } from '../../support/factories/productFactory'

describe('Frontend | Cadastro de produto (administrador)', () => {
  let admin
  const produto = buildProduct()

  beforeEach(() => {
    cy.criarAdminAutenticado().then((adminCriado) => {
      admin = adminCriado
    })
    LoginPage.visitar()
  })

  afterEach(() => {
    // Limpeza da massa criada durante o teste
    ProdutosApi.findByName(produto.nome).then((res) => {
      res.body.produtos?.forEach(({ _id }) => ProdutosApi.delete(_id, admin.token))
    })
    UsuariosApi.delete(admin._id)
  })

  it('CT-FE-03 - Administrador deve cadastrar um produto e visualizá-lo na listagem', () => {
    LoginPage.login(admin.email, admin.password)
    AdminHomePage.validarBoasVindas(admin.nome)

    AdminHomePage.irParaCadastroDeProdutos()
    cy.location('pathname').should('eq', '/admin/cadastrarprodutos')

    CadastroProdutoPage.cadastrar(produto)

    ListaProdutosPage.validarProdutoListado(produto)
  })
})
