class AdminHomePage {
  get titulo() { return cy.get('h1') }
  get btnCadastrarProdutos() { return cy.get('[data-testid="cadastrar-produtos"]') }
  get btnListarProdutos() { return cy.get('[data-testid="listar-produtos"]') }

  validarBoasVindas(nome) {
    cy.location('pathname').should('eq', '/admin/home')
    this.titulo.should('contain.text', 'Bem Vindo').and('contain.text', nome)
  }

  irParaCadastroDeProdutos() {
    this.btnCadastrarProdutos.click()
  }

  irParaListagemDeProdutos() {
    this.btnListarProdutos.click()
  }
}

export default new AdminHomePage()
