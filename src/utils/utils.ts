export const formatCurrency = (
  amount: number,
  currency: string,
  position: 'before' | 'after' = 'before',
): string => {
  const formattedAmount = amount.toFixed(2)
  return position === 'before' ? `${currency}${formattedAmount}` : `${formattedAmount}${currency}`
}
