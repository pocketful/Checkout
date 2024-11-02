import style from './InfoItem.module.scss'

interface InfoItemProps {
  icon: string
  subtitle: string
  text: string
}

const InfoItem = ({ icon, subtitle, text }: InfoItemProps) => {
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

export default InfoItem
