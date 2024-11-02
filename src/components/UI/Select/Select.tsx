import style from './Select.module.scss'
import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  classStyle?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, classStyle, ...props }, ref) => {
    return (
      <div className={style.selectGroup}>
        {label && <span className={style.label}>{label}</span>}
        <select
          className={`${style.select} ${classStyle ? style[classStyle] : ''}`}
          ref={ref}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  },
)

Select.displayName = 'Select'

export default Select
