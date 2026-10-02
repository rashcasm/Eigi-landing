import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import aman from '../../../assets/founders/aman-khandelwal.webp'
import mrunmay from '../../../assets/founders/mrunmay-chichkhede.webp'
import styles from './Founders.module.css'

/** Photos are pre-cropped to their subject in src/assets/founders. */
const FOUNDERS = [
  {
    name: 'Aman Khandelwal', role: 'Founder & CEO', img: aman,
    line: 'Working toward digital singularity, starting with voice agents that understand what people mean.',
  },
  {
    name: 'Mrunmay Chichkhede', role: 'Co-founder', img: mrunmay,
    line: 'Builds the real-time voice systems Eigi’s agents run on.',
  },
]

/** The two people behind Eigi. Sits after the climb, on the black sky, just above the footer. */
export function Founders() {
  return (
    <section id="founders" className={styles.founders} data-page>
      <motion.p className="eyebrow" {...reveal}>Founders</motion.p>
      <motion.h2 {...reveal}>Who’s behind Eigi.</motion.h2>
      <ul className={styles.list}>
        {FOUNDERS.map((f) => (
          <motion.li key={f.name} className={styles.card} {...reveal}>
            <img className={styles.photo} src={f.img} alt={`${f.name}, ${f.role}`} loading="lazy" decoding="async" />
            <div>
              <p className={cx(styles.role, 'mono')}>{f.role}</p>
              <h3>{f.name}</h3>
              <p className={styles.line}>{f.line}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
