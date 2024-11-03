import { useState } from 'react'
import arrowDown from '@/assets/UI/arrow-down.svg'
import { Product } from '@/data/product'
import style from './Summary.module.scss'
import { useProductPricing } from '@/hooks/useProductPricing'

interface SummaryProps {
  product: Product
}

const Summary = ({ product }: SummaryProps) => {
  const { title, price, quantity, currency, image } = product

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const { formattedPrice, formattedSubtotal, formattedTotal } = useProductPricing({
    price,
    quantity,
    currency,
  })

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
              <img
                src={image.small}
                srcSet={`${image.small} 180w, ${image.medium} 240w`}
                sizes="(min-width: 768px) 240px, 180px"
                alt={image.alt}
              ></img>
              <span className={style.productAmount}>{quantity}</span>
            </div>
            <div className={style.productName}>{title} + Warranty</div>
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
