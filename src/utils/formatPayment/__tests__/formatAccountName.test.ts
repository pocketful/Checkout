import { formatAccountName } from '../formatPayment'

describe('formatAccountName', () => {
  it('handles empty or invalid inputs', () => {
    expect(formatAccountName('')).toBe('')
    expect(formatAccountName('123')).toBe('')
    expect(formatAccountName('!@#')).toBe('')
  })

  it('removes non-letter characters', () => {
    expect(formatAccountName('Hermione123')).toBe('Hermione')
    expect(formatAccountName('Luna!')).toBe('Luna')
    expect(formatAccountName('Bellatrix-Lestrange')).toBe('BellatrixLestrange')
  })

  it('handles multiple spaces', () => {
    expect(formatAccountName('Luna   Lovegood')).toBe('Luna Lovegood')
    expect(formatAccountName('Hermione    Jean    Granger')).toBe('Hermione Jean Granger')
  })

  it('limits to 50 characters', () => {
    const longName = 'Hermione Jean Granger Order of Merlin First Class Minister for Magic'
    expect(formatAccountName(longName).length).toBeLessThanOrEqual(50)
  })

  it('maintains correct format for Yup validation', () => {
    const result = formatAccountName('Hermione Granger')
    expect(result).toMatch(/^[a-zA-Z\s]*$/)
  })
})
