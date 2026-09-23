import LoginPage from '../../support/pages/LoginPage'
import CadastroUsuarioPage from '../../support/pages/CadastroUsuarioPage'
import HomeLojaPage from '../../support/pages/HomeLojaPage'
import { buildUser } from '../../support/factories/userFactory'
import { MESSAGES } from '../../support/constants/messages'

describe('Frontend | Cadastro de usuário', () => {
  beforeEach(() => {
    LoginPage.visitar()
  })

  it('CT-FE-01 - Deve cadastrar um novo usuário comum e redirecioná-lo para a home da loja', () => {
    const usuario = buildUser()

    LoginPage.irParaCadastro()
    cy.location('pathname').should('eq', '/cadastrarusuarios')

    CadastroUsuarioPage.cadastrar(usuario)

    cy.contains(MESSAGES.CADASTRO_SUCESSO).should('be.visible')
    HomeLojaPage.validarPagina()
  })
})
