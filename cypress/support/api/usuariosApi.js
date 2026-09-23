const baseUrl = () => `${Cypress.env('apiUrl')}/usuarios`

export const UsuariosApi = {
  create: (user) =>
    cy.request({ method: 'POST', url: baseUrl(), body: user, failOnStatusCode: false }),

  getById: (id) =>
    cy.request({ method: 'GET', url: `${baseUrl()}/${id}`, failOnStatusCode: false }),

  delete: (id) =>
    cy.request({ method: 'DELETE', url: `${baseUrl()}/${id}`, failOnStatusCode: false }),
}
