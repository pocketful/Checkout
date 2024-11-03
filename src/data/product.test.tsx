import { product, updateProduct } from './product'

jest.mock('@/assets/img/product-test.png', () => 'mocked-image-small')
jest.mock('@/assets/img/product-test-text.png', () => 'mocked-image-medium')

describe('Product', () => {
  it('should have correct initial values', () => {
    expect(product.image.small).toBe('mocked-image-small')
    expect(product.image.medium).toBe('mocked-image-medium')
  })

  it('should update the product details correctly', () => {
    updateProduct({ currency: '€', quantity: 5 })
    expect(product.currency).toBe('€')
    expect(product.quantity).toBe(5)
  })
})
