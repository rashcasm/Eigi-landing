import { motion } from 'motion/react'
import { reveal } from '../../styles/motion.ts'
import { cx } from '../../utils/cx.ts'
import { DOCS_URL } from './Nav.tsx'
import styles from './Footer.module.css'

const EMAIL = 'buddy@eigi.ai'
const PHONE = '+91 98231 72692'
const YEAR = new Date().getFullYear()

const LINKS: [label: string, href: string][] = [
  ['Documentation', DOCS_URL],
  ['Privacy Policy', 'https://eigi.ai/privacy-policy'],
  ['Terms of Service', 'https://eigi.ai/terms-of-service'],
  ['Data Deletion', 'https://eigi.ai/data-deletion'],
]

/**
 * Contact (base of the summit) plus the site footer. Sits after the climb, so it stays on the black sky.
 * No form: the panel's `data-amit` button opens Amit's card, and onboarding happens on WhatsApp or a call.
 */
export function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.contact}>
        <div>
          <motion.p className="eyebrow" {...reveal}>Contact</motion.p>
          <motion.h2 {...reveal}>Talk to a person.</motion.h2>
          <motion.p className="lead" {...reveal}>
            For anything that isn’t onboarding, email or call the team directly.
          </motion.p>
          <motion.dl className={styles.details} {...reveal}>
            <div><dt className="mono">Email us</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt className="mono">Call us</dt><dd><a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a></dd></div>
            <div><dt className="mono">Location</dt><dd>India</dd></div>
          </motion.dl>
        </div>

        <motion.div className={styles.amit} {...reveal}>
          <p className="eyebrow">Get started</p>
          <h3>Start with a chat or a call.</h3>
          <p className="lead">
            Amit, our AI onboarding agent, asks a few questions on WhatsApp or over the phone, then hands you to
            a sherpa.
          </p>
          <button type="button" className="btn" data-amit>Talk to Amit <span aria-hidden="true">→</span></button>
        </motion.div>
      </div>

      <div className={styles.bottom}>
        <nav aria-label="Footer" className={styles.links}>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </nav>
        <p className={cx(styles.legal, 'mono')}>
          © {YEAR} Eigi AI · All rights reserved, India
        </p>
      </div>
    </footer>
  )
}
