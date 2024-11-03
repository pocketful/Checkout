import style from './Benefits.module.scss'
import cachback from '../../../../assets/benefits/cashback.svg'
import customerService from '../../../../assets/benefits/customer-service.svg'
import rating from '../../../../assets/benefits/rating.svg'
import BenefitItem from './BenefitItem/BenefitItem'

const Benefits = () => {
  return (
    <section className={style.benefits}>
      <div className={style.titleWrapper}>
        <span className={style.title}>Why Choose LogoIpsum</span>
      </div>
      <div>
        <BenefitItem
          icon={cachback}
          subtitle="90-Day Money Back Guarantee"
          text="We love our products and we’re confident you will too! If you’re not in love with your
              LogoIpsum product, our easy return and refund policy is designed to make things as
              easy as possible for you."
        />
        <BenefitItem
          icon={rating}
          subtitle="Over 75,000+ Happy Customer"
          text="Everyone that tries LogoIpsum says it’s a must-have. We invest a lot of love and care
              into making our products, so you can enjoy seeing results when using it."
        />
        <BenefitItem
          icon={customerService}
          subtitle="Professional Customer Support"
          text="Our customer service works 24/7 for your satisfaction. Feel free to reach out to us
              anytime."
        />
      </div>
    </section>
  )
}

export default Benefits
