import { ButtonHTMLAttributes } from 'react'
import style from './RadioButton.module.scss'

interface RadioButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  isSelected?: boolean
}

const RadioButton = ({ onClick, isSelected, ...props }: RadioButtonProps) => {
  return (
    <button
      type="button"
      className={`${style.radioOuter} ${isSelected ? style.radioOuterSelected : ''}`}
      onClick={onClick}
      role="radio"
      aria-checked={isSelected}
      {...props}
    >
      {isSelected && <span className={style.radioInner} data-testid="radio-inner" />}
    </button>
  )
}

export default RadioButton
