class MinhaListaPage {
  itemDaLista(nome) {
    return cy.contains('[data-testid="shopping-cart-product-name"]', nome)
  }

  get quantidade() { return cy.get('[data-testid="shopping-cart-product-quantity"]') }

  validarProdutoNaLista(nome, quantidadeEsperada = 1) {
    cy.location('pathname').should('eq', '/minhaListaDeProdutos')
    this.itemDaLista(nome).should('be.visible')
    this.quantidade.should('contain.text', String(quantidadeEsperada))
  }
}

export default new MinhaListaPage()
