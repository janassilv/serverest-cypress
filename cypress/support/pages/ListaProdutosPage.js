class ListaProdutosPage {
  linhaDoProduto(nome) {
    return cy.contains('table tbody tr', nome)
  }

  validarPagina() {
    cy.location('pathname').should('eq', '/admin/listarprodutos')
  }

  validarProdutoListado({ nome, preco, descricao, quantidade }) {
    this.validarPagina()
    this.linhaDoProduto(nome)
      .should('be.visible')
      .within(() => {
        cy.contains('td', String(preco)).should('exist')
        cy.contains('td', descricao).should('exist')
        cy.contains('td', String(quantidade)).should('exist')
      })
  }

  excluirProduto(nome) {
    this.linhaDoProduto(nome).within(() => {
      cy.contains('button', 'Excluir').click()
    })
  }

  validarProdutoAusente(nome) {
    cy.contains('table tbody tr', nome).should('not.exist')
  }
}

export default new ListaProdutosPage()
