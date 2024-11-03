import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats currency with symbol before amount by default', () => {
    expect(formatCurrency(299.97, '$')).toBe('$299.97')
    expect(formatCurrency(0, '$')).toBe('$0.00')
    expect(formatCurrency(1000.5, '€')).toBe('€1000.50')
  })

  it('formats currency with symbol after amount when specified', () => {
    expect(formatCurrency(299.97, '€', 'after')).toBe('299.97€')
    expect(formatCurrency(1000.5, 'kr', 'after')).toBe('1000.50kr')
  })

  it('handles zero and decimal places correctly', () => {
    expect(formatCurrency(0.1, '$')).toBe('$0.10')
    expect(formatCurrency(0.01, '$')).toBe('$0.01')
    expect(formatCurrency(0, '$')).toBe('$0.00')
  })
})
