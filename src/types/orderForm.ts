export type PaymentMethod = 'Credit Card'

export type FormValues = {
  email: string
  first_name: string
  last_name: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  card_number: string
  expiration_date: string
  security_code: string
  account_name: string
  payment_method: PaymentMethod
}
