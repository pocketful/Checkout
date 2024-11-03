import style from './CheckoutPage.module.scss'
import Header from '../../Header/Header'
import Summary from './Summary/Summary'
import OrderForm from './OrderForm/OrderForm'
import Benefits from './Benefits/Benefits'
import { product } from '../../../data/product'

function CheckoutPage() {
  return (
    <>
      <Header />
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
    </>
  )
}

export default CheckoutPage
