import style from './OrderOverview.module.scss'
import productTest from '../../../assets/img/product-test.png'
import arrowDown from '../../../assets/UI/arrow-down.svg'
import { useState } from 'react'

const OrderOverview = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className={`${style.orderOverview} ${isExpanded ? style.expanded : ''}`}>
      {/* Only mobile */}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <span className={style.title}>Order overview</span>
          <img className={style.arrowIcon} src={arrowDown} alt="arrow" />
        </div>
        <span className={style.price}>$299.97</span>
      </button>
      {/* Only mobile expanded / Desktop  */}
      <div className={style.orderExpanded}>
        <div className={style.productListGroup}>
          <article className={style.productCard}>
            <div className={style.productImgWrapper}>
              <img src={productTest} alt="product image"></img>
              <span className={style.productAmount}>3</span>
            </div>
            <div className={style.productName}>LogoIpsum IPL + Warranty</div>
            <span className={style.price}>$299.97</span>
          </article>
        </div>
        <div className={style.subtotalGroup}>
          <span>Subtotal</span>
          <span>$299.97</span>
        </div>
        <div className={style.totalGroup}>
          <span>Total</span>
          <span>$299.97</span>
        </div>
      </div>
    </section>
  )
}

export default OrderOverview
