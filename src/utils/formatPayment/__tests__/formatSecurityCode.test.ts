import { formatSecurityCode } from '../formatPayment'

describe('formatSecurityCode', () => {
  it('handles empty or invalid inputs', () => {
    expect(formatSecurityCode('')).toBe('')
    expect(formatSecurityCode('abc')).toBe('')
    expect(formatSecurityCode('!@#')).toBe('')
  })

  it('removes non-digit characters', () => {
    expect(formatSecurityCode('1-2-3')).toBe('123')
    expect(formatSecurityCode('1a2b3')).toBe('123')
    expect(formatSecurityCode('1 2 3')).toBe('123')
  })

  it('handles partial input', () => {
    expect(formatSecurityCode('1')).toBe('1')
    expect(formatSecurityCode('12')).toBe('12')
    expect(formatSecurityCode('123')).toBe('123')
    expect(formatSecurityCode('1234')).toBe('1234')
  })

  it('limits to 4 digits', () => {
    expect(formatSecurityCode('12345')).toBe('1234')
    expect(formatSecurityCode('123456')).toBe('1234')
  })

  it('maintains correct format for Yup validation', () => {
    const result = formatSecurityCode('123')
    expect(result).toMatch(/^\d{3,4}$/)
  })
})
