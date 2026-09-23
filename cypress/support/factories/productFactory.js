import { faker } from '@faker-js/faker'

/**
 * Gera um produto válido. O nome recebe um timestamp porque
 * a ServeRest não permite produtos com nomes repetidos.
 */
export const buildProduct = (overrides = {}) => ({
  nome: `${faker.commerce.productName()} ${Date.now()}`,
  preco: faker.number.int({ min: 10, max: 5000 }),
  descricao: faker.commerce.productDescription().slice(0, 100),
  quantidade: faker.number.int({ min: 1, max: 100 }),
  ...overrides,
})
