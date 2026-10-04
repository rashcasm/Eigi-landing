import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { COMPUTER_URL, DOCS_URL, STUDIO_URL } from '../../../components/layout/Nav.tsx'
import { WorkIcon } from '../../landing/components/WorkIcon.tsx'
import { ConnectedApps } from './ConnectedApps.tsx'
import { ComputerDemo } from './ComputerDemo.tsx'
import styles from './ComputerOverview.module.css'

const ROLES = ['Staff', 'Sales', 'Marketing', 'Operations']

/** Shared introduction connects the service homepage to the standalone product. */
export function ComputerOverview({ standalone = false }: { standalone?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const rotateX = useTransform(scrollYProgress, [0, .85], [7, 0])
  const y = useTransform(scrollYProgress, [0, .85], [36, 0])

  return (
    <section ref={ref} id="computer" className={styles.overview} aria-labelledby="computer-title">
      <div className={styles.heading}>
        <p className={`eyebrow ${styles.productIdentity}`}><img src="/favicon.jpg" alt="" width="32" height="32" />Hire your Eigis</p>
        <h2 id="computer-title">Small team.<br />Full C-suite.</h2>
        <p className="lead">Hire AI executives and keep your founding team as small as it is today.</p>
        <ul className={styles.roster} aria-label="Your AI team">{ROLES.map(role => <li key={role}><span className={styles.rosterAvatar}><img src="/favicon.jpg" alt="" width="32" height="32" /></span><span><small>Chief of</small><strong>{role}</strong></span></li>)}</ul>
        <div className={styles.actions}>
          <a className="btn" href={standalone ? STUDIO_URL : COMPUTER_URL}>{standalone ? 'Go to Studio' : 'Meet your AI team'} <span aria-hidden="true">↗</span></a>
          <a className="text-link" href={standalone ? '#how-computer-works' : '#route'}>{standalone ? 'See how it works' : 'Have our engineers integrate it'} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <motion.div className={styles.stage} style={reduced ? undefined : { rotateX, y }}><ComputerDemo /></motion.div>
      <div className={styles.productNote}><img src="/favicon.jpg" alt="" width="24" height="24" /><p>Hire your AI team in Studio.<br className={styles.mobileBreak} /> Or have Eigi’s engineers set it up with you.</p></div>
    </section>
  )
}

export function ComputerCapabilities() {
  return (
    <section id="how-computer-works">
      <ConnectedApps />
    </section>
  )
}

export function ComputerControl() {
  return (
    <section id="your-control" className={styles.control}>
      <div><p className="eyebrow">You’re in charge.</p><h2>AI pace.<br />Your call.</h2><p className="lead">Your AI team doesn’t wait for a standup. They look things up and write drafts on their own. Anything that goes out in your name waits for your OK.</p><a className="text-link" href={DOCS_URL}>Explore the documentation <span aria-hidden="true">↗</span></a></div>
      <div className={styles.permissions}>
        <p>Your rules</p>
        <div><WorkIcon name="check" /><span>Look things up in memory</span><strong>Allowed</strong></div>
        <div><WorkIcon name="check" /><span>Write a draft</span><strong>Allowed</strong></div>
        <div><span className={styles.ask} aria-hidden="true">↳</span><span>Submit a form in the browser</span><strong>Ask first</strong></div>
        <div><span className={styles.ask} aria-hidden="true">↳</span><span>Email a customer</span><strong>Ask first</strong></div>
        <small>Example rules. You choose what needs approval.</small>
      </div>
      <div className={styles.controlNotes}><p><strong>A record of everything.</strong> They log every action, so you can check their work the way you’d check a new hire’s.</p><p><strong>One shared memory.</strong> Your founders and your AI team work from the same picture of the business, within the access you set.</p></div>
    </section>
  )
}
