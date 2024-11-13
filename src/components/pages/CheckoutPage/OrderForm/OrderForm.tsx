import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useOrderContext } from '@/context/OrderContext'
import { FormValues } from '@/types/orderForm'
import { ContactSection } from './ContactSection/ContactSection'
import { DeliverySection } from './DeliverySection/DeliverySection'
import { PaymentSection, PaymentFieldName } from './PaymentSection/PaymentSection'
import { getStatesByCountry, getCountryByCode } from '@/utils/transformCountry'
import { FormattedProduct } from '@/utils/transformProduct'
import { validationSchema } from '@/utils/validation'
import style from './OrderForm.module.scss'
import { SubmissionStatus } from '@/components/UI/StatusMessage/StatusMessage'

interface OrderFormProps {
  product: FormattedProduct
}

const OrderForm = ({ product }: OrderFormProps) => {
  const [focusedField, setFocusedField] = useState<PaymentFieldName>(null)
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null)

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
      setSubmissionStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionStatus('error')
    }
  }

  return (
    <article className={style.orderForm}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContactSection register={register} errors={errors} />
        <DeliverySection register={register} errors={errors} stateOptions={stateOptions} />
        <PaymentSection
          register={register}
          control={control}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          paymentMethod={paymentMethod}
          submissionStatus={submissionStatus}
        />
      </form>
    </article>
  )
}
export default OrderForm
