import { AmitOnboarding } from './AmitOnboarding.tsx'
import styles from './BaseCamp.module.css'

/** The first screen is the onboarding itself: the promise on the left, a conversation with Amit on the right. */
export function BaseCamp({ product = false }: { product?: boolean }) {
  return <section id="base-camp" className={styles.hero} data-stage="Meet your Eigi" aria-labelledby="hero-title">
    <svg className={styles.contours} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <path key={i} transform={`translate(${-i * 26} ${i * 24})`} d="M-150 640C80 700 175 510 110 370S75 180 220 150 305-50 240-100M1180 980C1080 740 1430 770 1340 500S1330 275 1520 205" />)}
    </svg>
    <div className={styles.copy}>
      <p className="eyebrow">For founders doing ten jobs at once</p>
      <h1 id="hero-title">Everyone sold you AI.<br /> Nobody <em>showed you&nbsp;how.</em></h1>
      <p className={styles.subhead}>Eigi gives your business AI teammates that do real work, and a sherpa, a real engineer, who sets them up with you and stays until it sticks.</p>
      <p className={styles.proof}><span aria-hidden="true">↳</span> Amit is an Eigi too. Talking to him is the demo.</p>
      <a className={styles.discover} href={product ? '#how-computer-works' : '#sound-familiar'}>{product ? 'See how it works' : 'Sound familiar?'} <span aria-hidden="true">↓</span></a>
    </div>
    <div id="talk" className={styles.onboarding}><AmitOnboarding /></div>
  </section>
}
