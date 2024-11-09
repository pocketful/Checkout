import { useEffect, useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@/utils/validation'
import amex from '@/assets/cards/card-amex.svg'
import visa from '@/assets/cards/card-visa.svg'
import mastercard from '@/assets/cards/card-mastercard.svg'
import diners from '@/assets/cards/card-diners-club.svg'
import discover from '@/assets/cards/card-discover.svg'
import lock from '@/assets/UI/lock.svg'
import Button from '@/components/UI/Button/Button'
import Input from '@/components/UI/Input/Input'
import RadioInput from '@/components/UI/RadioInput/RadioInput'
import { getStatesByCountry, getCountryByCode } from '@/utils/transformCountry'
import style from './OrderForm.module.scss'
import { FormattedProduct } from '@/utils/transformProduct'
import { useOrderContext } from '@/context/OrderContext'
import { FormValues } from '@/types/orderForm'
import {
  formatCardNumber,
  formatExpirationDate,
  formatSecurityCode,
  formatAccountName,
} from '@/utils/formatPayment/formatPayment'
import { DeliverySection } from './DeliverySection/DeliverySection'

interface OrderFormProps {
  product: FormattedProduct
}

const OrderForm = ({ product }: OrderFormProps) => {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const initialStateOptions = useMemo(() => getStatesByCountry('US'), [])
  const [stateOptions, setStateOptions] = useState(initialStateOptions)

  const initialStateValue = initialStateOptions[0]?.value || ''

  const { warranty } = useOrderContext()

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      state: initialStateValue,
      zip: '',
      country: 'US',
      card_number: '',
      expiration_date: '',
      security_code: '',
      account_name: '',
      payment_method: 'Credit Card',
    },
  })

  const paymentMethod = watch('payment_method')
  const selectedCountry = watch('country')

  useEffect(() => {
    try {
      const country = getCountryByCode(selectedCountry)
      const newStateOptions = country ? getStatesByCountry(country.isoCode) : []
      setStateOptions(newStateOptions)
      setValue('state', newStateOptions[0]?.value ?? '')
    } catch (error) {
      console.error('Error updating state options:', error)
    }
  }, [selectedCountry, setValue])

  const onSubmit = (data: FormValues) => {
    try {
      const orderData = {
        ...data,
        warranty,
        product,
      }
      localStorage.setItem('orderData', JSON.stringify(orderData))
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <section className={style.orderForm}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Contact Section */}
        <section className={style.formSection}>
          <h2>Contact</h2>
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Email Address"
              error={errors.email?.message}
            />
          </div>
        </section>

        <DeliverySection register={register} errors={errors} stateOptions={stateOptions} />

        {/* Payment Section */}
        <section className={`${style.formSection} ${style.paymentSection}`}>
          <h2>Payment</h2>
          <p className={style.subtitle}>All transactions are secure and encrypted.</p>
          <div className={style.card}>
            <div className={style.cardHeading}>
              <div className={style.selectCardWrapper}>
                <RadioInput
                  {...register('payment_method')}
                  value="Credit Card"
                  aria-label="Pay with Credit Card"
                />
                <span>{paymentMethod}</span>
              </div>
              <div className={style.cardIcons}>
                <img className={style.cardIcon} src={visa} alt="visa card" />
                <img className={style.cardIcon} src={mastercard} alt="mastercard card" />
                <img className={style.cardIcon} src={amex} alt="amex card" />
                <img className={style.cardIcon} src={diners} alt="diners card " />
                <img className={style.cardIcon} src={discover} alt="discover card " />
              </div>
            </div>
            <div className={style.paymentInputs}>
              <div>
                <Controller
                  name="card_number"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Card number"
                      maxLength={19}
                      onFocus={() => setFocusedField('card_number')}
                      onBlur={() => {
                        setFocusedField(null)
                        field.onBlur()
                      }}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        field.onChange(formatted)
                      }}
                      error={focusedField !== 'card_number' ? error?.message : undefined}
                    />
                  )}
                />
              </div>
              <div className={style.coupleInputs}>
                <Controller
                  name="expiration_date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="MM/YY"
                      maxLength={5}
                      onFocus={() => setFocusedField('expiration_date')}
                      onBlur={() => {
                        setFocusedField(null)
                        field.onBlur()
                      }}
                      onChange={(e) => {
                        const formatted = formatExpirationDate(e.target.value)
                        field.onChange(formatted)
                      }}
                      error={focusedField !== 'expiration_date' ? error?.message : undefined}
                    />
                  )}
                />
                <Controller
                  name="security_code"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Security code"
                      maxLength={4}
                      onFocus={() => setFocusedField('security_code')}
                      onBlur={() => {
                        setFocusedField(null)
                        field.onBlur()
                      }}
                      onChange={(e) => {
                        const formatted = formatSecurityCode(e.target.value)
                        field.onChange(formatted)
                      }}
                      error={focusedField !== 'security_code' ? error?.message : undefined}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="account_name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Name on card"
                      onFocus={() => setFocusedField('account_name')}
                      onBlur={() => {
                        setFocusedField(null)
                        field.onChange(field.value.trim())
                        field.onBlur()
                      }}
                      onChange={(e) => {
                        const formatted = formatAccountName(e.target.value)
                        field.onChange(formatted)
                      }}
                      error={focusedField !== 'account_name' ? error?.message : undefined}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Button type="submit">Complete Order</Button>
          <div className={style.secureWrapper}>
            <img className={style.lockIcon} src={lock} alt="lock" />
            <span>All transactions are secure and encrypted</span>
          </div>
        </section>
      </form>
    </section>
  )
}
export default OrderForm
