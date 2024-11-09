import { UseFormRegister, Control, Controller } from 'react-hook-form'
import { FormValues, PaymentMethod } from '@/types/orderForm'
import Input from '@/components/UI/Input/Input'
import RadioInput from '@/components/UI/RadioInput/RadioInput'
import Button from '@/components/UI/Button/Button'
import amex from '@/assets/cards/card-amex.svg'
import visa from '@/assets/cards/card-visa.svg'
import mastercard from '@/assets/cards/card-mastercard.svg'
import diners from '@/assets/cards/card-diners-club.svg'
import discover from '@/assets/cards/card-discover.svg'
import lock from '@/assets/UI/lock.svg'
import {
  formatCardNumber,
  formatExpirationDate,
  formatSecurityCode,
  formatAccountName,
} from '@/utils/formatPayment/formatPayment'
import style from './PaymentSection.module.scss'

export type PaymentFieldName =
  | 'card_number'
  | 'expiration_date'
  | 'security_code'
  | 'account_name'
  | null

interface PaymentSectionProps {
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  focusedField: PaymentFieldName
  setFocusedField: (field: PaymentFieldName) => void
  paymentMethod: PaymentMethod
}

export const PaymentSection = ({
  register,
  control,
  focusedField,
  setFocusedField,
  paymentMethod,
}: PaymentSectionProps) => (
  <section>
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
                placeholder="Expiration (MM/YY)"
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
    {/* move to OrderForm */}
    <Button type="submit">Complete Order</Button>
    <div className={style.secureWrapper}>
      <img className={style.lockIcon} src={lock} alt="lock" />
      <span>All transactions are secure and encrypted</span>
    </div>
  </section>
)
export default PaymentSection
