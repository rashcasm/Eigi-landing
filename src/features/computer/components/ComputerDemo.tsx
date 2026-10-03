import { motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { WorkIcon } from '../../landing/components/WorkIcon.tsx'
import styles from './ComputerDemo.module.css'

const JOBS = [
  { label: 'Morning inbox', prompt: 'Sort my inbox. Draft replies to clients and flag anything from investors.', steps: ['Read the new messages', 'Check your company context', 'Prepare replies for your review'], title: 'Your morning, ready.', detail: 'Client replies drafted. Investor messages set aside.', file: 'Morning briefing', approval: 'Client replies are ready for your approval.' },
  { label: 'Customer support', prompt: 'Answer the support emails you’re confident about. Send me anything about refunds.', steps: ['Read the customer’s question', 'Find the answer in your knowledge', 'Keep refund decisions with you'], title: 'A helpful first response.', detail: 'Routine questions answered within your rules.', file: 'Support summary', approval: 'A refund request needs your decision.' },
  { label: 'Investor update', prompt: 'Draft this month’s investor update from Stripe and our signup sheet. I’ll review it.', steps: ['Gather the numbers', 'Pull context from your company memory', 'Draft the update with sources'], title: 'From numbers to narrative.', detail: 'A first draft, ready for your judgment.', file: 'Investor update', approval: 'The update stays a draft until you approve.' },
] as const

/** An illustrative, finite sequence; replay and scenario selection are controlled by the visitor. */
export function ComputerDemo() {
  const panelId = useId()
  const [selected, setSelected] = useState(0)
  const [replay, setReplay] = useState(0)
  const reduced = useReducedMotion()
  const job = JOBS[selected]
  const arrive = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay },
  })

  return (
    <div className={styles.demo}>
      <div className={styles.choices} role="group" aria-label="Choose an example task">
        {JOBS.map(({ label }, index) => <button key={label} type="button" aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)}>{label}</button>)}
      </div>
      <div id={panelId} className={styles.window} role="region" aria-label={`${job.label} example`} aria-live="polite">
        <div className={styles.toolbar}><span className={styles.lights} aria-hidden="true"><i /><i /><i /></span><span>Eigi Computer</span><span className={styles.exampleLabel}>Illustrative example</span></div>
        <div className={styles.workspace} key={`${selected}-${replay}`}>
          <aside className={styles.sidebar} aria-label="Computer capabilities">
            <img className={styles.brand} src="/favicon.jpg" alt="Eigi Computer" width="44" height="44" />
            <span className={styles.sidebarActive}><WorkIcon name="support" />Workspace</span>
            <span><WorkIcon name="computer" />Memory</span>
            <span><WorkIcon name="operations" />Your apps</span>
            <div className={styles.pod}><span className={styles.statusDot} />Your dedicated computer<small>Ready when you are.</small></div>
          </aside>
          <div className={styles.conversation}>
            <motion.div className={styles.request} {...arrive(0)}><span>You</span><p>{job.prompt}</p></motion.div>
            <div className={styles.response}>
              <motion.div className={styles.responseLabel} {...arrive(.3)}><img className={styles.mark} src="/favicon.jpg" alt="" width="28" height="28" /><strong>Eigi</strong><span>Working with your context</span></motion.div>
              <ol className={styles.steps}>{job.steps.map((step, index) => <motion.li key={step} {...arrive(.65 + index * .55)}><WorkIcon name="check" />{step}</motion.li>)}</ol>
              <motion.div className={styles.document} {...arrive(2.3)}><div className={styles.documentIcon}><WorkIcon name="operations" /></div><div><small>{job.file}</small><p className={styles.documentTitle}>{job.title}</p><p>{job.detail}</p></div></motion.div>
              <motion.div className={styles.approval} {...arrive(3)}><span aria-hidden="true">↳</span><p>{job.approval}</p><span className={styles.review}>Your call</span></motion.div>
            </div>
            <div className={styles.composer} aria-hidden="true"><span>Give your Eigi a job…</span><span>↑</span></div>
          </div>
        </div>
      </div>
      <div className={styles.caption}><p>One message. Context, action, and a clear handoff.</p><button type="button" onClick={() => setReplay(value => value + 1)}><span aria-hidden="true">↻</span> Replay example</button></div>
    </div>
  )
}
