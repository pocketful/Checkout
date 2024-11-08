import { formatExpirationDate } from '../formatPayment'

describe('formatExpirationDate', () => {
  it('handles empty or invalid inputs', () => {
    expect(formatExpirationDate('')).toBe('')
    expect(formatExpirationDate('abc')).toBe('')
    expect(formatExpirationDate('!@#')).toBe('')
  })

  it('removes non-digit characters', () => {
    expect(formatExpirationDate('12-34')).toBe('12/34')
    expect(formatExpirationDate('12/34')).toBe('12/34')
    expect(formatExpirationDate('12a34')).toBe('12/34')
  })

  it('formats expiration date with slash', () => {
    expect(formatExpirationDate('1234')).toBe('12/34')
  })

  it('adds slash after MM', () => {
    expect(formatExpirationDate('1')).toBe('1')
    expect(formatExpirationDate('12')).toBe('12/')
    expect(formatExpirationDate('123')).toBe('12/3')
    expect(formatExpirationDate('1234')).toBe('12/34')
  })

  it('limits to 4 digits', () => {
    expect(formatExpirationDate('123456')).toBe('12/34')
  })

  it('maintains correct format for Yup validation', () => {
    const result = formatExpirationDate('1234')
    expect(result).toMatch(/^(0[1-9]|1[0-2])\/\d{2}$/)
  })
})
