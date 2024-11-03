import { SelectHTMLAttributes, forwardRef } from 'react'
import style from './Select.module.scss'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  classStyle?: string
  options?: SelectOption[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options = [], classStyle, ...props }, ref) => {
    return (
      <div className={style.selectGroup}>
        {label && <span className={style.label}>{label}</span>}
        <select
          className={`${style.select} ${classStyle ? style[classStyle] : ''}`}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  },
)

Select.displayName = 'Select'

export default Select
