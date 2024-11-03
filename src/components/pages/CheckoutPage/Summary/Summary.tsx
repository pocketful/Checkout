import { useState } from 'react'
import arrowDown from '@/assets/UI/arrow-down.svg'
import { formatCurrency } from '@/utils/formatCurrency'
import { Product } from '@/data/product'
import style from './Summary.module.scss'

interface SummaryProps {
  product: Product
}

const Summary = ({ product }: SummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const subtotal = product.price * product.quantity
  // const subtotal = PRODUCT_PRICE // TEMP
  const total = subtotal

  const formattedPrice = formatCurrency(product.price, product.currency)
  const formattedTotal = formatCurrency(total, product.currency)
  const formattedSubtotal = formatCurrency(subtotal, product.currency)

  return (
    <section className={`${style.summary} ${isExpanded ? style.expanded : ''}`}>
      {/* Only mobile */}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <span className={style.title}>Order overview</span>
          <img className={style.arrowIcon} src={arrowDown} alt="arrow" />
        </div>
        <span className={style.price}>{formattedTotal}</span>
      </button>
      {/* Only mobile expanded / Desktop  */}
      <div className={style.orderExpanded}>
        <div className={style.productGroup}>
          <article className={style.productCard}>
            <div className={style.productImgWrapper}>
              <img src={product.image} alt={product.alt}></img>
              <span className={style.productAmount}>{product.quantity}</span>
            </div>
            <div className={style.productName}>
              {product.name}
              <span className={style.warranty}> + Warranty</span>
            </div>
            <span className={style.price}>{formattedPrice}</span>
          </article>
        </div>
        <div className={style.subtotalGroup}>
          <span>Subtotal</span>
          <span>{formattedSubtotal}</span>
        </div>
        <div className={style.totalGroup}>
          <span>Total</span>
          <span>{formattedTotal}</span>
        </div>
      </div>
    </section>
  )
}

export default Summary
