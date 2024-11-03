import { product, updateProduct } from './product'

describe('Product', () => {
  it('should update the product details correctly', () => {
    updateProduct({ currency: '€', quantity: 5 })
    expect(product.currency).toBe('€')
    expect(product.quantity).toBe(5)
  })
})
