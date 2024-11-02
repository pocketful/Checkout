import style from './About.module.scss'
import cachback from '../../../assets/advantages/cashback.svg'
import customerService from '../../../assets/advantages/customer-service.svg'
import rating from '../../../assets/advantages/rating.svg'
import InfoItem from './InfoItem/InfoItem'

const About = () => {
  return (
    <section className={style.about}>
      <div className={style.titleWrapper}>
        <span className={style.title}>Why Choose LogoIpsum</span>
      </div>
      <div>
        <InfoItem
          icon={cachback}
          subtitle="90-Day Money Back Guarantee"
          text="We love our products and we’re confident you will too! If you’re not in love with your
              LogoIpsum product, our easy return and refund policy is designed to make things as
              easy as possible for you."
        />
        <InfoItem
          icon={rating}
          subtitle="Over 75,000+ Happy Customer"
          text="Everyone that tries LogoIpsum says it’s a must-have. We invest a lot of love and care
              into making our products, so you can enjoy seeing results when using it."
        />
        <InfoItem
          icon={customerService}
          subtitle="Professional Customer Support"
          text="Our customer service works 24/7 for your satisfaction. Feel free to reach out to us
              anytime."
        />
      </div>
    </section>
  )
}

export default About
