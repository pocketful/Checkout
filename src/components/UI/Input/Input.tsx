import style from './Input.module.scss'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  classStyle?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ classStyle, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`${style.input} ${classStyle ? style[classStyle] : ''}`}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input
