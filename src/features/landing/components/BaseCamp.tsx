import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { Crowd } from './Crowd.tsx'
import { StartAscent } from './StartAscent.tsx'
import styles from './BaseCamp.module.css'

export function BaseCamp() {
  return (
    <section id="base-camp" className={styles.hero} data-stage="Base camp">
      <motion.p className="eyebrow" {...reveal}>Base camp</motion.p>
      <motion.h1 {...reveal}>AI is here.<br /><em>Adoption</em> isn’t.</motion.h1>
      <motion.p className="lead" {...reveal}>
        Eigi’s engineers join your team and set up AI agents that answer calls, handle chats and clear the
        busywork. A two‑person company climbs like twenty.
      </motion.p>
      <StartAscent />
      <Crowd />
    </section>
  )
}
