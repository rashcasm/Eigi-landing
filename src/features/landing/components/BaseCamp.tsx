import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { Crowd } from './Crowd.tsx'
import { StartAscent } from './StartAscent.tsx'
import styles from './BaseCamp.module.css'

export function BaseCamp() {
  return (
    <section id="base-camp" className={styles.hero} data-stage="Base camp">
      <motion.p className="eyebrow" {...reveal}>§ 01 · Base camp</motion.p>
      <motion.h1 {...reveal}>AI is here.<br /><em>Adoption</em> isn’t.</motion.h1>
      <motion.p className="lead" {...reveal}>
        Most teams have tried the AI tools and are still circling base camp. Eigi’s sherpas walk you up the
        mountain, so a two‑person company climbs like twenty.
      </motion.p>
      <StartAscent />
      <Crowd />
    </section>
  )
}
