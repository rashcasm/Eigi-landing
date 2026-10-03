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
        <Heading id="computer-title">Your AI co-worker.<br />Anytime, anywhere.</Heading>
        <p className="lead">The next shift in work is the interface. Message Eigi in Slack or Teams, call it from Claude or ChatGPT, or forward it an email. Like a teammate with its own computer, it does the work.</p>
        <div className={styles.actions}>
          <a className="btn" href={standalone ? STUDIO_URL : COMPUTER_URL}>{standalone ? 'Go to Studio' : 'Meet Eigi Computer'} <span aria-hidden="true">↗</span></a>
          <a className="text-link" href={standalone ? '#how-computer-works' : '#route'}>{standalone ? 'See how it works' : 'Have our engineers integrate it'} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <motion.div className={styles.stage} style={reduced ? undefined : { rotateX, y }}><ComputerDemo /></motion.div>
      <div className={styles.productNote}><img src="/favicon.jpg" alt="" width="24" height="24" /><p>Use Eigi Computer on its own.<br className={styles.mobileBreak} /> Or bring in Eigi’s engineers to integrate it with your business.</p></div>
    </section>
  )
}

const CAPABILITIES = [
  { icon: 'support', title: 'Works where your team does.', body: 'Text it in Slack or Teams. Forward it your emails. Call it from inside Claude or ChatGPT to bring your company into the conversation.' },
  { icon: 'operations', title: 'Remembers your company.', body: 'A dynamic memory across your tools, history, and people. Less time looking for things. More context in every answer.' },
  { icon: 'browser', title: 'Does the work in the browser.', body: 'It can work directly in the browser, just like your team does. Not only an answer, but the work itself.' },
] as const

export function ComputerCapabilities() {
  return (
    <section id="how-computer-works" className={styles.capabilities}>
      <div className={styles.sectionHeading}><p className="eyebrow">Work about work.</p><h2>AI took off for consumers.<br />Work is still in pieces.</h2><p className="lead">General-purpose AI assistants are supercharging how people get things done. At work, most of the day still goes to work about work: looking for things and switching between apps.</p></div>
      <div className={styles.features}>{CAPABILITIES.map(({ icon, title, body }) => <article key={title}><span className={styles.featureIcon}><WorkIcon name={icon} /></span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <ConnectedApps />
    </section>
  )
}

export function ComputerControl() {
  return (
    <section id="your-control" className={styles.control}>
      <div><p className="eyebrow">Built for companies.</p><h2>Consumer speed.<br />Company controls.</h2><p className="lead">The productivity of a consumer AI assistant, with the controls, audit trail, and shared knowledge a company needs. You decide what it does on its own and what needs approval.</p><a className="text-link" href={DOCS_URL}>Explore the documentation <span aria-hidden="true">↗</span></a></div>
      <div className={styles.permissions}>
        <p>Company controls</p>
        <div><WorkIcon name="check" /><span>Search company memory</span><strong>Allowed</strong></div>
        <div><WorkIcon name="check" /><span>Prepare a draft</span><strong>Allowed</strong></div>
        <div><span className={styles.ask} aria-hidden="true">↳</span><span>Submit a form in the browser</span><strong>Ask first</strong></div>
        <div><span className={styles.ask} aria-hidden="true">↳</span><span>Email a customer</span><strong>Ask first</strong></div>
        <small>Example rules. You choose what needs approval.</small>
      </div>
      <div className={styles.controlNotes}><p><strong>A full audit trail.</strong> Every action is recorded, so you can see what was done.</p><p><strong>Shared knowledge.</strong> Your team works from one company memory, within the access you set.</p></div>
    </section>
  )
}
