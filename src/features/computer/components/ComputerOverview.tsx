import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { COMPUTER_URL, DOCS_URL, STUDIO_URL } from '../../../components/layout/Nav.tsx'
import { WorkIcon } from '../../landing/components/WorkIcon.tsx'
import { ConnectedApps } from './ConnectedApps.tsx'
import { ComputerDemo } from './ComputerDemo.tsx'
import styles from './ComputerOverview.module.css'

/** Shared introduction connects the service homepage to the standalone product. */
export function ComputerOverview({ standalone = false }: { standalone?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const rotateX = useTransform(scrollYProgress, [0, .85], [7, 0])
  const y = useTransform(scrollYProgress, [0, .85], [36, 0])
  const Heading = standalone ? 'h1' : 'h2'

  return (
    <section ref={ref} id="computer" className={`${styles.overview} ${standalone ? styles.hero : ''}`} aria-labelledby="computer-title">
      <div className={styles.heading}>
        <p className={`eyebrow ${styles.productIdentity}`}><img src="/favicon.jpg" alt="" width="32" height="32" />Meet Eigi Computer</p>
        <Heading id="computer-title">A co-worker.<br />With a computer of its own.</Heading>
        <p className="lead">Give it a job. It works in your apps, remembers your business, and checks with you when it needs approval. Even after you close your laptop.</p>
        <div className={styles.actions}>
          <a className="btn" href={standalone ? STUDIO_URL : COMPUTER_URL}>{standalone ? 'Go to Studio' : 'Meet Eigi Computer'} <span aria-hidden="true">↗</span></a>
          <a className="text-link" href={standalone ? '#how-computer-works' : '#route'}>{standalone ? 'See how it works' : 'Set it up with our engineers'} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <motion.div className={styles.stage} style={reduced ? undefined : { rotateX, y }}><ComputerDemo /></motion.div>
      <div className={styles.productNote}><img src="/favicon.jpg" alt="" width="24" height="24" /><p>Use Eigi Computer on its own.<br className={styles.mobileBreak} /> Or bring in Eigi’s engineers to build around it.</p></div>
    </section>
  )
}

const CAPABILITIES = [
  { icon: 'computer', title: 'Its own computer. Always on.', body: 'A browser, files, and a terminal on a computer reserved for your account. Long tasks and scheduled jobs keep going after you leave.' },
  { icon: 'operations', title: 'Your context comes with it.', body: 'Customers, prices, preferences, and how you like things done. Your Eigi remembers. You can read and edit what it knows.' },
  { icon: 'support', title: 'Your apps. Your conversation.', body: 'Give it work in Slack, WhatsApp, or the dashboard. Connected channels share its memory, so you can pick up where you left off.' },
] as const

export function ComputerCapabilities() {
  return (
    <section id="how-computer-works" className={styles.capabilities}>
      <div className={styles.sectionHeading}><p className="eyebrow">Built to do the work.</p><h2>More than a place<br />to ask questions.</h2><p className="lead">No code to write. No workflow builder to learn.<br />Just tell your Eigi what needs doing.</p></div>
      <div className={styles.features}>{CAPABILITIES.map(({ icon, title, body }) => <article key={title}><span className={styles.featureIcon}><WorkIcon name={icon} /></span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <ConnectedApps />
    </section>
  )
}

export function ComputerControl() {
  return (
    <section id="your-control" className={styles.control}>
      <div><p className="eyebrow">Independent. Within your boundaries.</p><h2>It does the work.<br />You make the calls.</h2><p className="lead">Start in Careful mode. Your Eigi asks before it sends, deletes, buys, or posts. Let specific tasks run on their own as you build trust.</p><a className="text-link" href={DOCS_URL}>Explore the documentation <span aria-hidden="true">↗</span></a></div>
      <div className={styles.permissions}>
        <p>Permissions & approvals</p>
        <div><WorkIcon name="check" /><span>Read connected knowledge</span><strong>Allowed</strong></div>
        <div><WorkIcon name="check" /><span>Prepare a draft</span><strong>Allowed</strong></div>
        <div><span className={styles.ask} aria-hidden="true">↳</span><span>Email a customer</span><strong>Ask first</strong></div>
        <div><span className={styles.ask} aria-hidden="true">↳</span><span>Delete a file</span><strong>Ask first</strong></div>
        <small>Example rules. You choose what needs approval.</small>
      </div>
      <div className={styles.controlNotes}><p><strong>See what happened.</strong> Every action is recorded in session history.</p><p><strong>Keep access deliberate.</strong> Your team’s Eigis collaborate only with the access you grant.</p></div>
    </section>
  )
}
