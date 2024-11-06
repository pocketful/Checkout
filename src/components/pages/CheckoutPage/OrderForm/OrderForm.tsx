/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
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
import RadioButton from '@/components/UI/RadioButton/RadioButton'
import Select from '@/components/UI/Select/Select'
import { states } from '@/data/states'
import { countries } from '@/data/countries'
import style from './OrderForm.module.scss'
import { useState } from 'react'
import { useProductPricing } from '@/hooks/useProductPricing'
import { Product } from '@/data/product'
import { useOrderContext } from '@/context/OrderContext'
import { FormValues } from '@/types/orderForm'

// simulate async
// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
interface OrderFormProps {
  product: Product
}

type PaymentMethod = 'Credit Card'

const OrderForm = ({ product }: OrderFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Credit Card')

  const { warranty } = useOrderContext()

  const { formattedPrice, formattedSubtotal, formattedTotal } = useProductPricing({
    price: product.price,
    quantity: product.quantity,
    currency: product.currency,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    // mode: 'onTouched'
    mode: 'onChange',
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      selectedState: '',
      zip: '',
      selectedCountry: '',
      card_number: '',
      expiration_date: '',
      security_code: '',
      account_name: '',
    },
  })

  console.log(' errors: ', errors)
  console.log('orderData from localStorage', localStorage.getItem('orderData'))

  const onSubmit = (data: FormValues) => {
    // const onSubmit = async (data: FormValues) => {
    // await sleep(2000)
    try {
      const orderData = {
        ...data,
        warranty,
        paymentMethod,
        product,
        formattedPrice,
        formattedSubtotal,
        formattedTotal,
      }

      console.log('orderData: ', orderData)

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

        {/* Delivery Section */}
        <section className={`${style.formSection} ${style.deliverySection}`}>
          <h2>Delivery</h2>
          <div className={style.deliveryInputs}>
            <div className={style.fullNameGroup}>
              <Input
                {...register('first_name')}
                type="text"
                placeholder="First Name"
                error={errors.first_name?.message}
              />
              <Input
                {...register('last_name')}
                type="text"
                placeholder="Last Name"
                error={errors.last_name?.message}
              />
            </div>
            <Input
              {...register('address')}
              type="text"
              placeholder="Address"
              error={errors.address?.message}
            />
            <div className={style.locationGroup}>
              <Input
                className={style.cityInput}
                {...register('city')}
                type="text"
                placeholder="City"
                error={errors.city?.message}
              />
              <Select
                className={style.stateInput}
                {...register('selectedState')}
                label="State / Province"
                options={states}
                error={errors.selectedState?.message}
              />
              <Input
                className={style.zipInput}
                {...register('zip')}
                type="text"
                placeholder="ZIP / Postal Code"
                minLength={3}
                maxLength={10}
                error={errors.zip?.message}
              />
              <Select
                className={style.countryInput}
                {...register('selectedCountry')}
                label="Country"
                options={countries}
                error={errors.selectedCountry?.message}
              />
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section className={`${style.formSection} ${style.paymentSection}`}>
          <h2>Payment</h2>
          <p className={style.subtitle}>All transactions are secure and encrypted.</p>
          <div className={style.card}>
            <div className={style.cardHeading}>
              <div className={style.selectCardWrapper}>
                <RadioButton
                  onClick={() => setPaymentMethod('Credit Card')}
                  isSelected={paymentMethod === 'Credit Card'}
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
                <Input
                  {...register('card_number')}
                  type="tel"
                  placeholder="Card number"
                  maxLength={19}
                  error={errors.card_number?.message}
                />
              </div>
              <div className={style.coupleInputs}>
                <Input
                  {...register('expiration_date')}
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  maxLength={5}
                  error={errors.expiration_date?.message}
                />
                <Input
                  {...register('security_code')}
                  type="tel"
                  placeholder="Security code"
                  maxLength={4}
                  error={errors.security_code?.message}
                />
              </div>
              <div>
                <Input
                  {...register('account_name')}
                  type="text"
                  placeholder="Name on card"
                  error={errors.account_name?.message}
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
