import productImage from '../assets/img/product-test.png'

export interface Product {
  image: string
  alt: string
  name: string
  price: number
  currency: string
  quantity: number
}

export const product: Product = {
  image: productImage,
  alt: 'product image',
  name: 'LogoIpsum IPL',
  price: 299.97,
  currency: '$',
  quantity: 3,
}

export const updateProduct = (newDetails: Partial<Product>) => {
  Object.assign(product, newDetails)
}
