import { useState } from 'react'
import style from './OrderOverview.module.scss'
import arrowDown from '../../../assets/UI/arrow-down.svg'
import { PRODUCT_IMAGE, PRODUCT_ALT, PRODUCT_NAME, PRODUCT_PRICE } from '../../../data/product'

const OrderOverview = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  // const [quantity, setQuantity] = useState(3)
  const quantity = 3 // TEMP

  // const subtotal = (PRODUCT_PRICE * quantity).toFixed(2)
  const price = PRODUCT_PRICE.toFixed(2)
  const subtotal = PRODUCT_PRICE // TEMP
  const total = subtotal
  const current = '$'

  return (
    <section className={`${style.orderOverview} ${isExpanded ? style.expanded : ''}`}>
      {/* Only mobile */}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <span className={style.title}>Order overview</span>
          <img className={style.arrowIcon} src={arrowDown} alt="arrow" />
        </div>
        <span className={style.price}>
          {current}
          {total}
        </span>
      </button>
      {/* Only mobile expanded / Desktop  */}
      <div className={style.orderExpanded}>
        <div className={style.productGroup}>
          <article className={style.productCard}>
            <div className={style.productImgWrapper}>
              <img src={PRODUCT_IMAGE} alt={PRODUCT_ALT}></img>
              <span className={style.productAmount}>{quantity}</span>
            </div>
            <div className={style.productName}>
              {PRODUCT_NAME}
              <span className={style.warranty}> + Warranty</span>
            </div>
            <span className={style.price}>
              {current}
              {price}
            </span>
          </article>
        </div>
        <div className={style.subtotalGroup}>
          <span>Subtotal</span>
          <span>
            {current}
            {subtotal}
          </span>
        </div>
        <div className={style.totalGroup}>
          <span>Total</span>
          <span>
            {current}
            {total}
          </span>
        </div>
      </div>
    </section>
  )
}

export default OrderOverview
