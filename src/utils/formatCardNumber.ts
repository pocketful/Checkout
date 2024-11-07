export const formatCardNumber = (value: string): string => {
  if (!value) return ''
  const onlyDigits = value.replace(/\D/g, '').slice(0, 16)
  const groupsOfFour = onlyDigits.match(/.{1,4}/g)
  return groupsOfFour ? groupsOfFour.join(' ') : onlyDigits
}
