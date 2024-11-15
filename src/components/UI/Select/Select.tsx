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
    const defaultProps = {
      ...props,
      defaultValue: props.defaultValue ?? (options.length > 0 ? options[0].value : ''),
    }

    return (
      <div className={`${style.selectGroup} ${className ?? ''}`}>
        {label && <span className={style.label}>{label}</span>}
        <select
          className={`${style.select} ${error ? style.errSelect : ''}`}
          ref={ref}
          {...defaultProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className={style.errText}>{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'

export default Select
