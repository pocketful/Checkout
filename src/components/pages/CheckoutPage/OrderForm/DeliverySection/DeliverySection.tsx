import { FieldErrors, UseFormRegister } from 'react-hook-form'
import Input from '@/components/UI/Input/Input'
import Select, { SelectOption } from '@/components/UI/Select/Select'
import { FormValues } from '@/types/orderForm'
import { countries } from '@/utils/transformCountry'
import style from './DeliverySection.module.scss'

interface DeliverySectionProps {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  stateOptions: SelectOption[]
}

export const DeliverySection = ({ register, errors, stateOptions }: DeliverySectionProps) => (
  <section>
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
          {...register('state')}
          label="State / Province"
          options={stateOptions}
          error={errors.state?.message}
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
          {...register('country')}
          label="Country"
          options={countries}
          error={errors.country?.message}
        />
      </div>
    </div>
  </section>
)

export default DeliverySection
