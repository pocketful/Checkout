import { product } from './product'

jest.mock('@/assets/img/product-test.png', () => 'mocked-image-small')
jest.mock('@/assets/img/product-test-text.png', () => 'mocked-image-medium')

describe('Product', () => {
  it('should have correct initial values', () => {
    expect(product).toEqual({
      id: 1,
      title: 'LogoIpsum IPL',
      price: 299.97,
      quantity: 3,
      image: {
        small: 'mocked-image-small',
        medium: 'mocked-image-medium',
        alt: 'product image',
      },
    })
  })
})
