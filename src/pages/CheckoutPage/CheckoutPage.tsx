import style from './CheckoutPage.module.scss'

const CheckoutPage = () => {
  return (
    <>
      <header className={style.header}></header>
      <main className={style.container}>
        <section className={style.orderOverview}>orderOverview</section>
        <div className={style.orderForm}>orderForm</div>
        <section className={style.about}>about</section>
      </main>
    </>
  )
}

export default CheckoutPage
