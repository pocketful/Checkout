import Header from '@/components/Header/Header'
import Summary from './Summary/Summary'
import OrderForm from './OrderForm/OrderForm'
import Benefits from './Benefits/Benefits'
import { product } from '@/data/product'
import style from './CheckoutPage.module.scss'

function CheckoutPage() {
  return (
    <>
      <Header />
      <div className={style.containerWrapper}>
        <main className={style.container}>
          <div className={style.sectionSummary}>
            <Summary product={product} />
          </div>
          <div className={style.sectionOrderForm}>
            <OrderForm />
          </div>
          <div className={style.sectionBenefits}>
            <Benefits />
          </div>
        </main>
      </div>
    </>
  )
}

export default CheckoutPage
