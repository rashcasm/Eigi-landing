import { motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { WorkIcon } from '../../landing/components/WorkIcon.tsx'
import styles from './ComputerDemo.module.css'

type Job = { label: string; who: string; place?: string; ask: string; ack: string; work: string; steps: readonly string[]; reply: string; actions?: readonly string[]; note: string }

const JOBS: readonly Job[] = [
  { label: 'Morning brief', who: 'Chief of Staff', ask: 'Morning. What actually needs me today?', ack: 'Going through your inbox and calendar now.', work: 'Worked in the browser', steps: ['Sorted 38 new emails', 'Checked today’s calendar', 'Drafted the replies you owe'], reply: 'Two things need you. Globex wants a quote by Friday, and your 2 PM clashes with the investor call. I sorted the rest and drafted three replies for you to check.', note: 'Every step is in the audit trail.' },
  { label: 'Follow-ups', who: 'Chief of Sales', place: '#sales', ask: 'follow up with everyone from this week’s demo calls. Sam ran two of them.', ack: 'On it. Pulling up the call notes.', work: 'Worked in the browser', steps: ['Found five demo calls, two of them Sam’s', 'Wrote a follow-up for each, in your voice', 'Logged all five in the CRM'], reply: 'Five follow-ups are ready, two of them from Sam. Each one picks up on what that person asked about on the call. Want me to send them?', actions: ['Send all five', 'I’ll read them first'], note: 'Sending needs your approval.' },
  { label: 'Launch', who: 'Chief of Marketing', place: '#launch', ask: 'the new pricing page goes live Thursday. Can you get the launch ready?', ack: 'Yes. Starting with what changed and who it’s for.', work: 'Used company memory', steps: ['Read the pricing changes', 'Checked what customers asked about on recent calls', 'Wrote the announcement, a blog post, and four social posts'], reply: 'The launch kit is in your drafts. I led with dropping per-seat pricing, since that’s what customers asked about most.', note: 'Drafted from company memory.' },
]

const CHANNELS = ['#general', '#sales', '#launch']
const TEAM = ['Chief of Staff', 'Chief of Sales', 'Chief of Marketing', 'Chief of Operations']

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
  const eigi = (time: string) => <p className={styles.meta}><strong>{job.who}</strong><span className={styles.badge}>AI</span><time>{time}</time></p>

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
            <small>Your AI team</small>
            {TEAM.map(name => <span key={name} className={!job.place && name === job.who ? styles.active : undefined}><img src="/favicon.jpg" alt="" width="18" height="18" />{name}<i className={styles.presence} /></span>)}
            <small>Direct messages</small>
            <span><b className={styles.initial}>S</b>Sam</span>
          </aside>
          <div className={styles.channel}>
            <p className={styles.channelName}>{job.place ? <># {job.place.slice(1)}</> : <><img src="/favicon.jpg" alt="" width="20" height="20" />{job.who}<i className={styles.presence} /></>}</p>
            <div className={styles.messages}>
              <motion.div className={styles.message} {...arrive(0)}>
                <span className={styles.you} aria-hidden="true"><WorkIcon name="person" /></span>
                <div>
                  <p className={styles.meta}><strong>You</strong><time>9:41 AM</time></p>
                  <p>{job.place && <><span className={styles.mention}>@{job.who}</span> </>}{job.ask}</p>
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
            <div className={styles.composer} aria-hidden="true"><span>Message {job.place ?? job.who}</span><span className={styles.send}>↑</span></div>
          </div>
        </div>
      </div>
      <div className={styles.caption}><p>Brief them in Slack, Teams, or email. They do the work and report back.</p><button type="button" onClick={() => setReplay(value => value + 1)}><span aria-hidden="true">↻</span> Replay example</button></div>
    </div>
  )
}
