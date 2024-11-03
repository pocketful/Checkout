import logo from '@/assets/UI/logoipsum-logo.svg'
import shoppingBag from '@/assets/UI/shopping-bag.svg'
import style from './Header.module.scss'

function Header() {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <img className={style.logo} src={logo} alt="logoipsum logo" />
        <img className={style.shoppingBag} src={shoppingBag} alt="shopping bag" />
      </div>
    </header>
  )
}

export default Header
