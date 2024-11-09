import { Product, product } from '@/data/product'
import { formatCurrency } from '@/utils/formatCurrency'

export interface FormattedProduct extends Product {
  formattedPrice: string
  formattedSubtotal: string
  formattedTotal: string
}

export const transformProduct = (initialProduct: Product): FormattedProduct => ({
  ...initialProduct,
  formattedPrice: formatCurrency(initialProduct.price, initialProduct.currency),
  formattedSubtotal: formatCurrency(
    initialProduct.price * initialProduct.quantity,
    initialProduct.currency,
  ),
  formattedTotal: formatCurrency(
    initialProduct.price * initialProduct.quantity,
    initialProduct.currency,
  ),
})

export const formattedProduct: FormattedProduct = transformProduct(product)
