import { ButtonHTMLAttributes, forwardRef } from 'react'
import style from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', type = 'button', ...props }, ref) => {
    return (
      <button type={type} className={`${style.button} ${style[variant]}`} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
