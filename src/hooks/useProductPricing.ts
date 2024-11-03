import { useMemo } from 'react'
import { formatCurrency } from '@/utils/formatCurrency'

interface ProductPricing {
  price: number
  quantity: number
  currency: string
}

export const useProductPricing = ({ price, quantity, currency }: ProductPricing) => {
  return useMemo(
    () => ({
      formattedPrice: formatCurrency(price, currency),
      formattedSubtotal: formatCurrency(price * quantity, currency),
      formattedTotal: formatCurrency(price * quantity, currency),
    }),

    [price, quantity, currency],
  )
}
