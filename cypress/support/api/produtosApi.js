const baseUrl = () => `${Cypress.env('apiUrl')}/produtos`

export const ProdutosApi = {
  create: (product, token) =>
    cy.request({
      method: 'POST',
      url: baseUrl(),
      headers: { Authorization: token },
      body: product,
      failOnStatusCode: false,
    }),

  getById: (id) =>
    cy.request({ method: 'GET', url: `${baseUrl()}/${id}`, failOnStatusCode: false }),

  findByName: (nome) =>
    cy.request({ method: 'GET', url: baseUrl(), qs: { nome }, failOnStatusCode: false }),

  delete: (id, token) =>
    cy.request({
      method: 'DELETE',
      url: `${baseUrl()}/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    }),
}
