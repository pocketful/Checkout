import { SelectHTMLAttributes, forwardRef } from 'react'
import style from './Select.module.scss'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  className?: string
  options?: SelectOption[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options = [], className, error, ...props }, ref) => {
    return (
      <div className={`${style.selectGroup} ${className ?? ''}`}>
        {label && <span className={style.label}>{label}</span>}
        <select className={`${style.select} ${error ? style.errSelect : ''}`} ref={ref} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={style.errText}>{error}</span>}
      </div>
    )
  },
)

Select.displayName = 'Select'

export default Select
