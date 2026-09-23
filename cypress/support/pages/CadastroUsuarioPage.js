class CadastroUsuarioPage {
  get nome() { return cy.get('[data-testid="nome"]') }
  get email() { return cy.get('[data-testid="email"]') }
  get password() { return cy.get('[data-testid="password"]') }
  get checkboxAdmin() { return cy.get('[data-testid="checkbox"]') }
  get btnCadastrar() { return cy.get('[data-testid="cadastrar"]') }

  preencherFormulario({ nome, email, password, administrador }) {
    this.nome.type(nome)
    this.email.type(email)
    this.password.type(password, { log: false })
    if (administrador === 'true') this.checkboxAdmin.check()
  }

  submeter() {
    this.btnCadastrar.click()
  }

  cadastrar(user) {
    this.preencherFormulario(user)
    this.submeter()
  }
}

export default new CadastroUsuarioPage()
