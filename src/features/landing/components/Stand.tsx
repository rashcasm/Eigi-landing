import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { PositioningMap } from './PositioningMap.tsx'
import styles from './Stand.module.css'

const WHY = [
  ['AI subscriptions', 'Powerful models and an empty chat box. Working out the rest is your job.'],
  ['AI coworker bots', 'One bot, one task. Nobody rethinks how the business runs.'],
  ['Agencies', 'They build it, hand it over and leave. It breaks the week after.'],
  ['Consultancies', 'Roped in, at enterprise prices and enterprise pace.'],
  ['Eigi', 'Engineers who join your team at AI speed and stay until it works.'],
]

export function Stand() {
  return (
    <section id="stand" data-stage="Where we stand">
      <motion.p className="eyebrow" {...reveal}>Where we stand</motion.p>
      <motion.h2 {...reveal}>Fast or hands-on. Rarely both.</motion.h2>
      <div className={styles.grid}>
        <PositioningMap />
        <ul className={styles.why}>
          {WHY.map(([who, why]) => (
            <motion.li key={who} className={cx(who === 'Eigi' && styles.us)} {...reveal}>
              <span className="mono">{who}</span>
              {why}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
