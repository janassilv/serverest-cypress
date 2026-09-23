import { UsuariosApi } from './api/usuariosApi'
import { LoginApi } from './api/loginApi'
import { buildAdmin } from './factories/userFactory'

/**
 * Cria um usuário via API (pré-condição rápida e estável).
 * Retorna o usuário com o _id gerado.
 */
Cypress.Commands.add('criarUsuarioViaApi', (user) => {
  return UsuariosApi.create(user).then((res) => {
    expect(res.status, 'pré-condição: usuário criado via API').to.eq(201)
    return { ...user, _id: res.body._id }
  })
})

/**
 * Cria um administrador via API e já retorna o token de autenticação.
 */
Cypress.Commands.add('criarAdminAutenticado', () => {
  return cy.criarUsuarioViaApi(buildAdmin()).then((admin) => {
    return LoginApi.login(admin.email, admin.password).then((res) => {
      expect(res.status, 'pré-condição: admin autenticado').to.eq(200)
      return { ...admin, token: res.body.authorization }
    })
  })
})
