import { motion } from 'motion/react'
import type { Ref } from 'react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import styles from './Sherpas.module.css'

const POINTS = [
  ['Inside your team', 'A sherpa joins your Slack and your standups, and sees the mess first-hand.'],
  ['Ship at AI speed', 'Days to the first agent. Weeks until agents handle whole workflows.'],
  ['Small-team pricing', 'Built and priced for founders running a company of two.'],
]

export function Sherpas({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <section id="sherpas" ref={ref} data-stage="With your sherpa">
      <motion.p className="eyebrow" {...reveal}>§ 07 · Sherpas</motion.p>
      <motion.h2 {...reveal}>You never climb alone.</motion.h2>
      <motion.p className="lead" {...reveal}>
        Our engineers stay roped to your team for the whole climb.
      </motion.p>
      <motion.ol className={styles.grid} {...reveal}>
        {POINTS.map(([title, body], i) => (
          <li key={title}>
            <div className={cx(styles.index, 'mono')}>{String(i + 1).padStart(2, '0')}</div>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </motion.ol>
    </section>
  )
}
