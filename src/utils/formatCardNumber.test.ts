import { formatCardNumber } from './formatCardNumber'

describe('formatCardNumber', () => {
  it('handles empty or invalid inputs', () => {
    expect(formatCardNumber('')).toBe('')
    expect(formatCardNumber('abc')).toBe('')
    expect(formatCardNumber('!@#')).toBe('')
  })

  it('formats partial card numbers without spaces', () => {
    expect(formatCardNumber('1')).toBe('1')
    expect(formatCardNumber('12')).toBe('12')
    expect(formatCardNumber('123')).toBe('123')
  })

  it('adds space after every 4 digits', () => {
    expect(formatCardNumber('1234')).toBe('1234')
    expect(formatCardNumber('12345')).toBe('1234 5')
    expect(formatCardNumber('123456781234')).toBe('1234 5678 1234')
    expect(formatCardNumber('1234567812345678')).toBe('1234 5678 1234 5678')
  })

  it('removes non-numeric characters', () => {
    expect(formatCardNumber('1234-5678')).toBe('1234 5678')
    expect(formatCardNumber('1234 5678')).toBe('1234 5678')
    expect(formatCardNumber('1234a5678')).toBe('1234 5678')
  })

  it('limits to 16 digits', () => {
    expect(formatCardNumber('12345678901234567890')).toBe('1234 5678 9012 3456')
  })
})
