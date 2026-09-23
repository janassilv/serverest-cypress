class LoginPage {
  get email() { return cy.get('[data-testid="email"]') }
  get senha() { return cy.get('[data-testid="senha"]') }
  get btnEntrar() { return cy.get('[data-testid="entrar"]') }
  get linkCadastrar() { return cy.get('[data-testid="cadastrar"]') }

  visitar() {
    cy.visit('/login')
  }

  preencherCredenciais(email, senha) {
    this.email.clear().type(email)
    this.senha.clear().type(senha, { log: false })
  }

  entrar() {
    this.btnEntrar.click()
  }

  login(email, senha) {
    this.preencherCredenciais(email, senha)
    this.entrar()
  }

  irParaCadastro() {
    this.linkCadastrar.click()
  }
}

export default new LoginPage()
