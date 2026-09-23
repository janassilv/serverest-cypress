class CadastroProdutoPage {
  get nome() { return cy.get('[data-testid="nome"]') }
  get preco() { return cy.get('[data-testid="preco"]') }
  get descricao() { return cy.get('[data-testid="descricao"]') }
  get quantidade() { return cy.get('[data-testid="quantity"]') }
  // Obs.: o data-testid do botão na aplicação é "cadastarProdutos" (com o erro de digitação original)
  get btnCadastrar() { return cy.get('[data-testid="cadastarProdutos"]') }

  cadastrar({ nome, preco, descricao, quantidade }) {
    this.nome.type(nome)
    this.preco.type(String(preco))
    this.descricao.type(descricao)
    this.quantidade.type(String(quantidade))
    this.btnCadastrar.click()
  }
}

export default new CadastroProdutoPage()
