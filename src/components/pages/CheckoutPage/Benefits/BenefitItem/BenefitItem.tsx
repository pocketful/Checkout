import style from './BenefitItem.module.scss'

interface BenefitItemProps {
  icon: string
  subtitle: string
  text: string
}

const BenefitItem = ({ icon, subtitle, text }: BenefitItemProps) => {
  return (
    <div className={style.item}>
      <img className={style.icon} src={icon} alt="icon" />
      <div>
        <p className={style.subtitle}>{subtitle}</p>
        <p className={style.text}>{text}</p>
      </div>
    </div>
  )
}

export default BenefitItem
