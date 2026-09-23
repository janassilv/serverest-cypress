import LoginPage from '../../support/pages/LoginPage'
import { buildUser } from '../../support/factories/userFactory'
import { MESSAGES } from '../../support/constants/messages'

describe('Frontend | Login', () => {
  beforeEach(() => {
    LoginPage.visitar()
  })

  it('CT-FE-02 - Não deve permitir login com senha inválida', () => {
    cy.criarUsuarioViaApi(buildUser()).then((usuario) => {
      LoginPage.login(usuario.email, 'senhaIncorreta123')

      cy.contains(MESSAGES.LOGIN_INVALIDO).should('be.visible')
      cy.location('pathname').should('eq', '/login')
    })
  })
})
