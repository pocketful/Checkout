import { Product } from '@/data/product'
import { formatCurrency } from '@/utils/formatCurrency'

export interface FormattedProduct extends Product {
  formattedPrice: string
  formattedSubtotal: string
  formattedTotal: string
}

export const transformProduct = (initialProduct: Product, currency: string): FormattedProduct => ({
  ...initialProduct,
  formattedPrice: formatCurrency(initialProduct.price, currency),
  formattedSubtotal: formatCurrency(initialProduct.price * initialProduct.quantity, currency),
  formattedTotal: formatCurrency(initialProduct.price * initialProduct.quantity, currency),
})
