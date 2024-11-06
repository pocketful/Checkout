import * as Yup from 'yup'

export const validationSchema = Yup.object({
  // Contact section
  email: Yup.string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must not exceed 100 characters')
    .lowercase()
    .required('Email is required'),

  // Delivery section
  first_name: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),

  last_name: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),

  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must not exceed 100 characters')
    .required('Address is required'),

  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters')
    .required('City is required'),

  state: Yup.string().required('Please select a state'),

  zip: Yup.string()
    .min(3, 'ZIP / Postal code must be at least 3 characters')
    .max(10, 'ZIP / Postal code must be at least 3 characters')
    .required('Zip code is required'),

  country: Yup.string().required('Please select a country'),

  // Payment section
  card_number: Yup.string()
    .min(13, 'Invalid card number')
    .max(19, 'Invalid card number')
    .required('Card number is required'),

  expiration_date: Yup.string()
    .min(4, 'Invalid expiration date')
    .max(5, 'Invalid expiration date')
    .required('Expiration date is required'),

  security_code: Yup.string()
    .min(3, 'Invalid security code')
    .max(4, 'Invalid security code')
    .required('Security code is required'),

  account_name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Name on card is required'),

  payment_method: Yup.string()
    .oneOf(['Credit Card'], 'Invalid payment method')
    .required('Payment method is required'),
})
