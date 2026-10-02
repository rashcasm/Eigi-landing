import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import styles from './StartAscent.module.css'

/** The page's main call to action. `data-amit` makes it open Amit's card (Radio): onboarding is a conversation, not a form. */
export function StartAscent() {
  return (
    <motion.div className={styles.cta} {...reveal}>
      <button type="button" className="btn" data-amit>
        Start your ascent <span aria-hidden="true">→</span>
      </button>
      <p className={cx(styles.note, 'mono')}>
        Quick questions on WhatsApp or a call.<br />No forms, no sign-up.
      </p>
    </motion.div>
  )
}
