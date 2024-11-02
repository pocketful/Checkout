import style from './CheckoutPage.module.scss'
import Header from '../../components/Header/Header'
import OrderOverview from './OrderOverview/OrderOverview'
import OrderForm from './OrderForm/OrderForm'
import About from './About/About'

function CheckoutPage() {
  return (
    <>
      <Header />
      <main className={style.container}>
        <div className={style.sectionOrderOverview}>
          <OrderOverview />
        </div>
        <div className={style.sectionOrderForm}>
          <OrderForm />
        </div>
        <div className={style.sectionAbout}>
          <About />
        </div>
      </main>
    </>
  )
}

export default CheckoutPage
