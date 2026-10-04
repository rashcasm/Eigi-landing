import { AmitOnboarding } from './AmitOnboarding.tsx'
import { WhyEigi } from './WhyEigi.tsx'
import styles from './BaseCamp.module.css'

/** The first screen is the onboarding itself: the why, then a conversation with Amit. */
export function BaseCamp({ product = false }: { product?: boolean }) {
  return <section id="base-camp" className={styles.hero} data-stage="Meet your Eigi" aria-labelledby="hero-title">
    <div className={styles.firstScreen}>
      <svg className={styles.contours} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map(i => <path key={i} transform={`translate(${-i * 28} ${i * 26})`} d="M-150 600C80 660 175 470 110 330S75 140 220 110 305-90 240-140M1210 860C1110 620 1420 650 1330 380S1320 155 1510 85" />)}
      </svg>
      <header className={styles.intro}>
        <p className={styles.tagline}><span className={styles.mark} aria-hidden="true" />Gateway to singularity</p>
        <h1 id="hero-title">Everyone sold you AI.<br />Nobody <em>showed you how.</em></h1>
        <p className={styles.subhead}>Eigi gives your business AI teammates that do real work, and a sherpa, a real engineer, who sets them up with you and stays until it sticks.</p>
      </header>
      <div className={styles.onboarding}><AmitOnboarding /></div>
      <a className={styles.discover} href={product ? '#how-computer-works' : '#meet-your-eigi'}>Meet your Eigi <span aria-hidden="true">↓</span></a>
    </div>
    <WhyEigi />
  </section>
}
