export const formatCardNumber = (value: string): string => {
  if (!value) return ''
  const onlyDigits = value.replace(/\D/g, '').slice(0, 16)
  const groupsOfFour = onlyDigits.match(/.{1,4}/g)
  return groupsOfFour ? groupsOfFour.join(' ') : onlyDigits
}

export const formatExpirationDate = (value: string): string => {
  if (!value) return ''
  const onlyDigits = value.replace(/\D/g, '').slice(0, 4)

  if (onlyDigits.length >= 2) {
    return `${onlyDigits.slice(0, 2)}/${onlyDigits.slice(2, 4)}`
  }
  return onlyDigits
}
