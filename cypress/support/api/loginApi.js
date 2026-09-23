export const LoginApi = {
  login: (email, password) =>
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: { email, password },
      failOnStatusCode: false,
    }),
}
