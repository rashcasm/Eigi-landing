import aman from '../../../assets/founders/aman-khandelwal.webp'
import mrunmay from '../../../assets/founders/mrunmay-chichkhede.webp'
import styles from './Founders.module.css'

const FOUNDERS = [
  { name: 'Aman Khandelwal', role: 'Founder & CEO', img: aman, line: 'Helping small business owners use AI.' },
  { name: 'Mrunmay Chichkhede', role: 'Co-founder', img: mrunmay, line: 'Building Eigi’s real-time systems.' },
]

export function Founders() {
  return (
    <section id="founders" className={styles.founders} data-stage="Our people">
      <div className={styles.intro}><p className="eyebrow">The founders</p><h2>Meet Aman<br />and Mrunmay.</h2><p className="lead">We’re building Eigi for founders who want to do more without growing their team.</p><a className="text-link" href="mailto:buddy@eigi.ai">Say hello to the team <span aria-hidden="true">↗</span></a></div>
      <ul className={styles.list}>
        {FOUNDERS.map(({ name, role, img, line }) => <li key={name} className={styles.person}><img src={img} alt={name} width="320" height="400" loading="lazy" decoding="async" /><h3>{name}</h3><p className={styles.role}>{role}</p><p className={styles.bio}>{line}</p></li>)}
      </ul>
    </section>
  )
}
