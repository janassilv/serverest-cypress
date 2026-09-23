import { UsuariosApi } from '../../support/api/usuariosApi'
import { buildUser } from '../../support/factories/userFactory'
import { MESSAGES } from '../../support/constants/messages'

describe('API | Usuários', () => {
  let idsCriados = []

  afterEach(() => {
    idsCriados.forEach((id) => UsuariosApi.delete(id))
    idsCriados = []
  })

  it('CT-API-01 - Deve cadastrar um usuário com sucesso e permitir consultá-lo pelo ID', () => {
    const usuario = buildUser()

    UsuariosApi.create(usuario).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.message).to.eq(MESSAGES.CADASTRO_SUCESSO)
      expect(res.body._id).to.be.a('string').and.not.be.empty
      idsCriados.push(res.body._id)

      UsuariosApi.getById(res.body._id).then((consulta) => {
        expect(consulta.status).to.eq(200)
        expect(consulta.body).to.include({
          _id: res.body._id,
          nome: usuario.nome,
          email: usuario.email,
          administrador: usuario.administrador,
        })
      })
    })
  })

  it('CT-API-02 - Não deve permitir cadastrar usuário com e-mail já utilizado', () => {
    cy.criarUsuarioViaApi(buildUser()).then((existente) => {
      idsCriados.push(existente._id)
      const duplicado = buildUser({ email: existente.email })

      UsuariosApi.create(duplicado).then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body.message).to.eq(MESSAGES.EMAIL_DUPLICADO)
        expect(res.body).to.not.have.property('_id')
      })
    })
  })
})
