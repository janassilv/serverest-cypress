import { faker } from '@faker-js/faker'

/**
 * Gera um usuário válido com dados únicos a cada execução.
 * Aceita overrides para cenários específicos (ex.: e-mail repetido).
 */
export const buildUser = (overrides = {}) => ({
  nome: faker.person.fullName(),
  email: `qa.${Date.now()}.${faker.string.alphanumeric(6)}@teste.com`.toLowerCase(),
  password: faker.internet.password({ length: 10 }),
  administrador: 'false',
  ...overrides,
})

export const buildAdmin = (overrides = {}) =>
  buildUser({ administrador: 'true', ...overrides })
