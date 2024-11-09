import { forwardRef, InputHTMLAttributes } from 'react'
import style from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className={className ?? ''} data-testid="input-wrapper">
        <input
          type={type}
          className={`${style.input} ${error ? style.errInput : ''}`}
          ref={ref}
          {...props}
        />
        {error && <p className={style.errText}>{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
