/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
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

const validationSchema = Yup.object({
  first_name: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),
  last_name: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),
  selectedCountry: Yup.string().required('Please select a country'),
})

type FormValues = {
  first_name: string
  last_name: string
  selectedCountry: string
}

// simulate async
// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
interface OrderFormProps {
  product: Product
}

const OrderForm = ({ product }: OrderFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card')

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
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    // mode: 'onTouched'
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      selectedCountry: '',
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
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <section className={style.orderForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={`${style.formSection} ${style.contactSection}`}>
          <h2>Contact</h2>
          <div>
            <Input type="email" name="email" placeholder="Email Address" />
          </div>
        </section>

        <section className={`${style.formSection} ${style.deliverySection}`}>
          <h2>Delivery</h2>
          <div className={style.deliveryInputs}>
            <div className={style.fullNameGroup}>
              <Input
                type="text"
                {...register('first_name')}
                placeholder="First Name"
                error={errors.first_name?.message}
              />
              <Input
                type="text"
                {...register('last_name')}
                placeholder="Last Name"
                error={errors.last_name?.message}
              />
            </div>

            <Input type="text" name="address" placeholder="Address" />

            <div className={style.locationGroup}>
              <Input className={style.cityInput} type="text" name="city" placeholder="City" />
              <Select
                className={style.stateInput}
                label="State / Province"
                name="selectedState"
                options={states}
              />
              <Input
                className={style.zipInput}
                type="text"
                name="zip"
                placeholder="ZIP / Postal Code"
              />
              <Select
                {...register('selectedCountry')}
                className={style.countryInput}
                label="Country"
                name="selectedCountry"
                options={countries}
                error={errors.selectedCountry?.message}
              />
            </div>
          </div>
        </section>

        <section className={`${style.formSection} ${style.paymentSection}`}>
          <h2>Payment</h2>
          <p className={style.subtitle}>All transactions are secure and encrypted.</p>
          <div className={style.card}>
            <div className={style.cardHeading}>
              <div className={style.selectCardWrapper}>
                <RadioButton isSelected={true} />
                <span>{paymentMethod}</span>
              </div>
              <div className={style.cardIcons}>
                <img className={style.cardIcon} src={visa} alt="visa card" />
                <img className={style.cardIcon} src={mastercard} alt="mastercard card" />
                <img className={style.cardIcon} src={amex} alt="amex card" />
                <img className={style.cardIcon} src={diners} alt="diners card " />
                <img className={style.cardIcon} src={discover} alt="discover card " />
                {/* <button>+4</button type="button" className="placeholder"> */}
                {/* <div className="background picture/button">
              <span className="cards-total">+4</span>
            </div> */}
              </div>
            </div>
            <div className={style.paymentInputs}>
              <div>
                <Input type="number" name="card_number" placeholder="Card number" />
              </div>
              <div className={style.coupleInputs}>
                <Input type="text" name="expiration" placeholder="Expiration (MM/YY)" />
                <Input type="number" name="security_code" placeholder="Security code" />
              </div>
              <div>
                <Input type="text" name="name_on_card" placeholder="Name on card" />
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
