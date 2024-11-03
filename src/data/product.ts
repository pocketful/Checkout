import productImage from '@/assets/img/product-test.png'
import productImageWithText from '@/assets/img/product-test-text.png'

export interface Product {
  title: string
  price: number
  quantity: number
  currency: string
  image: {
    small: string
    medium: string
    alt: string
  }
}

export const product: Product = {
  title: 'LogoIpsum IPL',
  price: 299.97,
  quantity: 3,
  currency: '$',
  image: {
    small: productImage,
    medium: productImageWithText,
    alt: 'product image',
  },
}

export const updateProduct = (newDetails: Partial<Product>) => {
  Object.assign(product, newDetails)
}
