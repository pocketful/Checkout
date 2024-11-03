// Assets
import amex from '@/assets/cards/card-amex.svg'
import visa from '@/assets/cards/card-visa.svg'
import mastercard from '@/assets/cards/card-mastercard.svg'
import diners from '@/assets/cards/card-diners-club.svg'
import discover from '@/assets/cards/card-discover.svg'
import lock from '@/assets/UI/lock.svg'
import Button from '@/components/UI/Button/Button'
import Input from '@/components/UI/Input/Input'
import RadioButton from '@/components/UI/RadioButton/RadioButton'
import Select from '@/components/UI/Select/Select'
import { states } from '@/data/states'
import { countries } from '@/data/countries'
import style from './OrderForm.module.scss'

const OrderForm = () => {
  return (
    <section className={style.orderForm}>
      <form>
        <section className={`${style.formSection} ${style.contactSection}`}>
          <h2>Contact</h2>
          <div>
            <Input type="email" name="email" placeholder="Email Address" />
          </div>
        </section>

        <section className={`${style.formSection} ${style.deliverySection}`}>
          <h2>Delivery</h2>
          <div className={style.deliveryInputs}>
            <div className={style.fullNameGroup}>
              <Input type="text" name="first_name" placeholder="First Name" />
              <Input type="text" name="last_name" placeholder="Last Name" />
            </div>

            <div>
              <Input type="text" name="address" placeholder="Address" />
            </div>

            <div className={style.locationGroup}>
              <Input type="text" name="city" placeholder="City" />
              <Select label="State / Province" name="selectedState" options={states} />
              <Input type="text" name="zip" placeholder="ZIP / Postal Code" />
            </div>

            <Select label="Country" name="selectedCountry" options={countries} />
          </div>
        </section>

        <section className={`${style.formSection} ${style.paymentSection}`}>
          <h2>Payment</h2>
          <p className={style.subtitle}>All transactions are secure and encrypted.</p>
          <div className={style.card}>
            <div className={style.cardHeading}>
              <div className={style.selectCardWrapper}>
                <RadioButton isSelected={true} />
                <span>Credit Card</span>
              </div>
              <div className={style.cardIcons}>
                <img className={style.cardIcon} src={visa} alt="visa card" />
                <img className={style.cardIcon} src={mastercard} alt="mastercard card" />
                <img className={style.cardIcon} src={amex} alt="amex card" />
                <img className={style.cardIcon} src={diners} alt="diners card " />
                <img className={style.cardIcon} src={discover} alt="discover card " />
                {/* <button>+4</button type="button" className="placeholder"> */}
                {/* <div className="background picture/button">
              <span className="cards-total">+4</span>
            </div> */}
              </div>
            </div>
            <div className={style.paymentInputs}>
              <div>
                <Input type="number" name="card_number" placeholder="Card number" />
              </div>
              <div className={style.coupleInputs}>
                <Input type="text" name="expiration" placeholder="Expiration (MM/YY)" />
                <Input type="number" name="security_code" placeholder="Security code" />
              </div>
              <div>
                <Input type="text" name="name_on_card" placeholder="Name on card" />
              </div>
            </div>
          </div>
          <Button type="submit">Complete Order</Button>
          <div className={style.secureWrapper}>
            <img className={style.lockIcon} src={lock} alt="lock" />
            <span>All transactions are secure and encrypted</span>
          </div>
        </section>
      </form>
    </section>
  )
}
export default OrderForm
