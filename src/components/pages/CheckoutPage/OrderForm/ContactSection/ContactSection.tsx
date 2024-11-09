import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormValues } from '@/types/orderForm'
import Input from '@/components/UI/Input/Input'

interface ContactSectionProps {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

export const ContactSection = ({ register, errors }: ContactSectionProps) => (
  <section>
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
)

export default ContactSection
