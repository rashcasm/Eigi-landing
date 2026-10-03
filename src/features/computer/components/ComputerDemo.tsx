import { motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { WorkIcon } from '../../landing/components/WorkIcon.tsx'
import styles from './ComputerDemo.module.css'

type Job = { label: string; place: string; mention: boolean; ask: string; ack: string; work: string; steps: readonly string[]; reply: string; actions?: readonly string[]; note: string }

const JOBS: readonly Job[] = [
  { label: 'Catch up', place: '#sales', mention: true, ask: 'can you catch me up on Acme before tomorrow’s renewal call? And update their account notes.', ack: 'On it. Give me a few minutes.', work: 'Worked in the browser', steps: ['Read this thread and past emails with Acme', 'Checked who owns the account', 'Updated their account notes'], reply: 'You’re caught up. Acme wants to talk seat pricing, and Priya owns the account. Their notes are updated.', note: 'Every step is in the audit trail.' },
  { label: 'Browser task', place: 'Eigi', mention: false, ask: 'Hey, can you fill in the supplier form Globex sent us? Use our usual company details.', ack: 'Sure. Pulling our details from company memory.', work: 'Worked in the browser', steps: ['Found your company details in memory', 'Opened the supplier portal', 'Filled in every field'], reply: 'Done. It’s filled in but not submitted yet. Want me to send it?', actions: ['Submit', 'I’ll review first'], note: 'Submitting needs your approval.' },
  { label: 'Memory', place: '#support', mention: true, ask: 'who ran onboarding for Acme, and what did we agree on?', ack: 'Let me check.', work: 'Checked company memory', steps: ['Searched past emails and threads', 'Found the onboarding notes'], reply: 'Priya ran it in March. You agreed to a 30-day pilot with two seats. The email is from March 4.', note: 'Answered from shared company knowledge.' },
]

const CHANNELS = ['#general', '#sales', '#support']

/** An illustrative Slack-style conversation; replay and scenario selection are controlled by the visitor. */
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
  const eigi = (time: string) => <p className={styles.meta}><strong>Eigi</strong><span className={styles.badge}>AI co-worker</span><time>{time}</time></p>

  return (
    <div className={styles.demo}>
      <div className={styles.choices} role="group" aria-label="Choose an example conversation">
        {JOBS.map(({ label }, index) => <button key={label} type="button" aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)}>{label}</button>)}
      </div>
      <div id={panelId} className={styles.window} role="region" aria-label={`${job.label} example in Slack`} aria-live="polite">
        <div className={styles.toolbar}><span className={styles.lights} aria-hidden="true"><i /><i /><i /></span><span className={styles.search} aria-hidden="true">Search Acme</span><span className={styles.exampleLabel}>Illustrative example</span></div>
        <div className={styles.workspace} key={`${selected}-${replay}`}>
          <aside className={styles.sidebar} aria-hidden="true">
            <strong className={styles.workspaceName}>Acme <span>⌄</span></strong>
            <small>Channels</small>
            {CHANNELS.map(channel => <span key={channel} className={channel === job.place ? styles.active : undefined}><b>#</b>{channel.slice(1)}</span>)}
            <small>Direct messages</small>
            <span className={job.place === 'Eigi' ? styles.active : undefined}><img src="/favicon.jpg" alt="" width="18" height="18" />Eigi<i className={styles.presence} /></span>
            <span><b className={styles.initial}>P</b>Priya</span>
          </aside>
          <div className={styles.channel}>
            <p className={styles.channelName}>{job.place === 'Eigi' ? <><img src="/favicon.jpg" alt="" width="20" height="20" />Eigi<i className={styles.presence} /></> : <># {job.place.slice(1)}</>}</p>
            <div className={styles.messages}>
              <motion.div className={styles.message} {...arrive(0)}>
                <span className={styles.you} aria-hidden="true"><WorkIcon name="person" /></span>
                <div>
                  <p className={styles.meta}><strong>You</strong><time>9:41 AM</time></p>
                  <p>{job.mention && <><span className={styles.mention}>@Eigi</span> </>}{job.ask}</p>
                  <motion.span className={styles.reaction} aria-hidden="true" {...arrive(.5)}>👀 1</motion.span>
                </div>
              </motion.div>
              <motion.div className={styles.message} {...arrive(.9)}>
                <img className={styles.avatar} src="/favicon.jpg" alt="" width="36" height="36" />
                <div>
                  {eigi('9:41 AM')}
                  <p>{job.ack}</p>
                  <div className={styles.work}>
                    <p className={styles.workLabel}><WorkIcon name={job.work.includes('browser') ? 'browser' : 'operations'} />{job.work}</p>
                    <ol>{job.steps.map((step, index) => <motion.li key={step} {...arrive(1.3 + index * .45)}><WorkIcon name="check" />{step}</motion.li>)}</ol>
                  </div>
                </div>
              </motion.div>
              <motion.div className={styles.message} {...arrive(2.8)}>
                <img className={styles.avatar} src="/favicon.jpg" alt="" width="36" height="36" />
                <div>
                  {eigi('9:44 AM')}
                  <p>{job.reply}</p>
                  {job.actions && <div className={styles.actions}>{job.actions.map((action, index) => <span key={action} className={index === 0 ? styles.primary : undefined}>{action}</span>)}</div>}
                  <p className={styles.note}><WorkIcon name="check" />{job.note}</p>
                </div>
              </motion.div>
            </div>
            <div className={styles.composer} aria-hidden="true"><span>Message {job.place}</span><span className={styles.send}>↑</span></div>
          </div>
        </div>
      </div>
      <div className={styles.caption}><p>Message it like a teammate. It does the work in the browser and reports back.</p><button type="button" onClick={() => setReplay(value => value + 1)}><span aria-hidden="true">↻</span> Replay example</button></div>
    </div>
  )
}
