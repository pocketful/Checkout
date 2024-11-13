import Header from '@/components/Header/Header'
import Summary from './Summary/Summary'
import OrderForm from './OrderForm/OrderForm'
import Benefits from './Benefits/Benefits'
import { product } from '@/data/product'
import { transformProduct } from '@/utils/transformProduct'
import { useOrderContext } from '@/context/OrderContext'
import style from './CheckoutPage.module.scss'

function CheckoutPage() {
  const { currency } = useOrderContext()
  const transformedProduct = transformProduct(product, currency)

  return (
    <div className={style.pageContainer}>
      <Header />
      <div className={style.contentContainer}>
        <div className={style.leftEdge}></div>
        <main className={style.container}>
          <div className={style.sectionSummary}>
            <Summary product={transformedProduct} />
          </div>
          <div className={style.sectionOrderForm}>
            <OrderForm product={transformedProduct} />
          </div>
          <div className={style.sectionBenefits}>
            <Benefits />
          </div>
        </main>
        <div className={style.rightEdge}></div>
      </div>
    </div>
  )
}

export default CheckoutPage
