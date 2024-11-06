import { forwardRef, InputHTMLAttributes } from 'react'
import style from './RadioInput.module.scss'

type RadioInputProps = InputHTMLAttributes<HTMLInputElement>

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>((props, ref) => {
  return (
    <label className={style.radio}>
      <input type="radio" ref={ref} hidden {...props} />
    </label>
  )
})

RadioInput.displayName = 'RadioInput'

export default RadioInput
