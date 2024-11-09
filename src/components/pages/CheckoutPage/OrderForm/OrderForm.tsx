import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@/utils/validation'
import Input from '@/components/UI/Input/Input'
import { getStatesByCountry, getCountryByCode } from '@/utils/transformCountry'
import style from './OrderForm.module.scss'
import { FormattedProduct } from '@/utils/transformProduct'
import { useOrderContext } from '@/context/OrderContext'
import { FormValues } from '@/types/orderForm'

import { DeliverySection } from './DeliverySection/DeliverySection'
import { PaymentFieldName, PaymentSection } from './PaymentSection/PaymentSection'

interface OrderFormProps {
  product: FormattedProduct
}

const OrderForm = ({ product }: OrderFormProps) => {
  const [focusedField, setFocusedField] = useState<PaymentFieldName>(null)

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
      console.log(orderData)
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <article className={style.orderForm}>
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
        <PaymentSection
          register={register}
          control={control}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          paymentMethod={paymentMethod}
        />
      </form>
    </article>
  )
}
export default OrderForm
