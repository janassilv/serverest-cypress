import { ProdutosApi } from '../../support/api/produtosApi'
import { UsuariosApi } from '../../support/api/usuariosApi'
import { buildProduct } from '../../support/factories/productFactory'
import { MESSAGES } from '../../support/constants/messages'

describe('API | Produtos', () => {
  let admin
  let produtoId

  beforeEach(() => {
    cy.criarAdminAutenticado().then((adminCriado) => {
      admin = adminCriado
    })
  })

  afterEach(() => {
    if (produtoId) ProdutosApi.delete(produtoId, admin.token)
    UsuariosApi.delete(admin._id)
    produtoId = undefined
  })

  it('CT-API-03 - Administrador autenticado deve cadastrar um produto com sucesso', () => {
    const produto = buildProduct()

    ProdutosApi.create(produto, admin.token).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.message).to.eq(MESSAGES.CADASTRO_SUCESSO)
      expect(res.body._id).to.be.a('string').and.not.be.empty
      produtoId = res.body._id

      ProdutosApi.getById(produtoId).then((consulta) => {
        expect(consulta.status).to.eq(200)
        expect(consulta.body).to.include({
          _id: produtoId,
          nome: produto.nome,
          preco: produto.preco,
          descricao: produto.descricao,
          quantidade: produto.quantidade,
        })
      })
    })
  })
})
