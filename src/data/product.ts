import productImage from '@/assets/img/product-test.png'
import productImageWithText from '@/assets/img/product-test-text.png'

export interface Product {
  id: number
  title: string
  price: number
  quantity: number
  image: {
    small: string
    medium: string
    alt: string
  }
}

export const product: Product = {
  id: 1,
  title: 'LogoIpsum IPL',
  price: 299.97,
  quantity: 3,
  image: {
    small: productImage,
    medium: productImageWithText,
    alt: 'product image',
  },
}
