class HomeLojaPage {
  get campoPesquisa() { return cy.get('[data-testid="pesquisar"]') }
  get btnPesquisar() { return cy.get('[data-testid="botaoPesquisar"]') }

  cardDoProduto(nome) {
    return cy.contains('.card', nome)
  }

  validarPagina() {
    cy.location('pathname').should('eq', '/home')
    cy.contains('h1', 'Serverest Store').should('be.visible')
  }

  pesquisar(termo) {
    this.campoPesquisa.clear().type(termo)
    this.btnPesquisar.click()
  }

  adicionarNaLista(nome) {
    this.cardDoProduto(nome).find('[data-testid="adicionarNaLista"]').click()
  }
}

export default new HomeLojaPage()
