import { motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { WorkIcon } from './WorkIcon.tsx'
import styles from './Stories.module.css'

const WORKFLOWS = [
  {
    name: 'Customer care', icon: 'support', title: 'Be there. Even when you’re not.',
    description: 'Give customers a useful first response, without building an entire support department.',
    request: 'Can I move my appointment to Friday?',
    source: 'A customer gets in touch',
    steps: ['Understand the request', 'Check your calendar and policies', 'Confirm the change or ask your team'],
    result: 'A customer helped. Your focus intact.',
    human: 'Your Eigi engineer connects your channels and knowledge, sets the boundaries, and tests the handoff to your team.',
    tools: 'Your inbox', destination: 'Your calendar',
  },
  {
    name: 'Sales & growth', icon: 'sales', title: 'Keep the conversation moving.',
    description: 'Turn incoming interest into a clear next step, while you focus on the conversations that matter.',
    request: 'We’d love to learn more. Is this a fit for us?',
    source: 'A new prospect reaches out',
    steps: ['Gather the company’s context', 'Draft a relevant follow-up', 'Get your approval and update the CRM'],
    result: 'Less follow-up work. More time to connect.',
    human: 'Your Eigi engineer maps your sales process, connects your CRM, and builds in your voice and approval rules.',
    tools: 'Your website', destination: 'Your CRM',
  },
  {
    name: 'Operations', icon: 'operations', title: 'The little things. Taken care of.',
    description: 'Bring the work scattered across your inbox, documents, and spreadsheets into one reliable flow.',
    request: 'Here’s the invoice for this month’s project.',
    source: 'An invoice lands in your inbox',
    steps: ['Read and organize the invoice', 'Match it to the project', 'Prepare the record for your review'],
    result: 'An organized business. A clearer head.',
    human: 'Your Eigi engineer connects the tools you use, handles the exceptions, and keeps financial approvals with you.',
    tools: 'Your email', destination: 'Your records',
  },
] as const

/** Selectable examples, deliberately labeled as illustrations rather than live product activity. */
export function Stories() {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState(0)
  const panelId = useId()
  const workflow = WORKFLOWS[selected]

  return (
    <section id="stories" className={styles.stories} data-stage="What we do">
      <div className={styles.heading}>
        <div><p className="eyebrow">Less busywork. More business.</p><h2>Make room for<br />your next big thing.</h2></div>
        <p className="lead">Start with the work that slows you down.<br />We’ll help you find a better way to do it.</p>
      </div>
      <div className={styles.choices} role="group" aria-label="Explore example workflows">
        {WORKFLOWS.map(({ name, icon }, index) => (
          <button key={name} type="button" aria-pressed={index === selected} aria-controls={panelId} onClick={() => setSelected(index)}><WorkIcon name={icon} />{name}</button>
        ))}
      </div>
      <motion.div initial={reduced ? false : { opacity: .6, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} id={panelId} className={styles.panel} role="region" aria-label={`${workflow.name} workflow example`} aria-live="polite" aria-atomic="true">
        <div className={styles.explanation}>
          <span className={styles.category}><WorkIcon name={workflow.icon} />{workflow.name}</span>
          <h3>{workflow.title}</h3>
          <p>{workflow.description}</p>
          <div className={styles.human}><WorkIcon name="people" /><div><strong>Built with you, by us.</strong><p>{workflow.human}</p></div></div>
        </div>
        <div key={selected} className={styles.example}>
          <p className={styles.caption}>An example of what we can build together</p>
          <div className={styles.request}><span className={styles.avatar}>C</span><div><span>{workflow.source}</span><p>“{workflow.request}”</p></div></div>
          <motion.div className={styles.workflow} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: reduced ? 0 : .15 }}>
            <div className={styles.workflowTitle}><span className={styles.eigiMark} /><span>A little intelligence goes a long way.</span></div>
            <ol>{workflow.steps.map((step, index) => <motion.li key={step} initial={reduced ? false : { opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: reduced ? 0 : .45 + index * .3 }}><WorkIcon name="check" />{step}</motion.li>)}</ol>
          </motion.div>
          <motion.div initial={reduced ? false : { opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .45, delay: reduced ? 0 : 1.45 }} className={styles.result}><WorkIcon name="check" /><span>{workflow.result}</span></motion.div>
          <div className={styles.tools}><span>{workflow.tools}</span><span aria-hidden="true">↔</span><span>Eigi</span><span aria-hidden="true">↔</span><span>{workflow.destination}</span></div>
        </div>
      </motion.div>
      <p className={styles.beyond}>Already exploring Claude, GPT, or AI agents? <span>We help make the right tools work together.</span></p>
    </section>
  )
}
