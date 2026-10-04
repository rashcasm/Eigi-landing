import aman from '../../../assets/founders/aman-khandelwal.webp'
import mrunmay from '../../../assets/founders/mrunmay-chichkhede.webp'
import styles from './Founders.module.css'

const FOUNDERS = [
  { name: 'Aman Khandelwal', role: 'Founder & CEO', img: aman, line: 'Making AI useful for the people building something of their own.' },
  { name: 'Mrunmay Chichkhede', role: 'Co-founder', img: mrunmay, line: 'Building the real-time systems that turn that possibility into practice.' },
]

export function Founders() {
  return (
    <section id="founders" className={styles.founders} data-stage="Our people">
      <div className={styles.intro}><p className="eyebrow">Small team. Same as you.</p><h2>Real people. <em>In your corner.</em></h2><p className="lead">We’re building Eigi for the founders who want to do more without becoming a bigger company. We know the feeling.</p><a className="text-link" href="mailto:buddy@eigi.ai">Say hello to the team <span aria-hidden="true">↗</span></a></div>
      <ul className={styles.list}>
        {FOUNDERS.map(({ name, role, img, line }) => <li key={name} className={styles.person}><img src={img} alt={name} width="320" height="400" loading="lazy" decoding="async" /><h3>{name}</h3><p className={styles.role}>{role}</p><p className={styles.bio}>{line}</p></li>)}
      </ul>
    </section>
  )
}
