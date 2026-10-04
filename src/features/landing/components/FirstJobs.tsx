import { useState } from 'react'
import { heroOnboardingLink } from '../utils/hero-demo.ts'
import styles from './FirstJobs.module.css'

/** Illustrative first jobs, grouped by the hire a founder is putting off. */
const ROLES = [
  { role: 'Operations', jobs: [
    { task: 'Confirm tomorrow’s bookings', detail: 'Text tomorrow’s customers, offer cancelled slots to the waitlist, and flag anyone who hasn’t replied.' },
    { task: 'Chase a supplier update', detail: 'Read the purchase order and draft a request for the delivery date.' },
    { task: 'Prepare for the morning', detail: 'Review the inbox and calendar, then list what needs a decision from you.' },
  ] },
  { role: 'Customer support', jobs: [
    { task: 'Answer repeat questions', detail: 'Draft answers from your help docs and past replies. The tricky ones come to you.' },
    { task: 'Find a missing order', detail: 'Check the order history and prepare a useful reply for the customer.' },
    { task: 'Catch up on Discord', detail: 'Gather unanswered questions and flag the ones that need you.' },
  ] },
  { role: 'Sales', jobs: [
    { task: 'Reply to new leads in minutes', detail: 'Draft a reply in your tone with two times you’re free, ready for one tap.' },
    { task: 'Keep the CRM current', detail: 'Turn meeting notes into deal updates, ready for your approval.' },
    { task: 'Turn a brief into a proposal', detail: 'Use your scope and pricing notes to prepare a first draft.' },
  ] },
  { role: 'Finance & admin', jobs: [
    { task: 'Chase unpaid invoices', detail: 'Find what’s overdue and draft a friendly nudge for each one.' },
    { task: 'Check a supplier invoice', detail: 'Compare the invoice with the purchase order before you pay.' },
    { task: 'Get the weekly update ready', detail: 'Pull project notes into a client update you can review.' },
  ] },
] as const

export function FirstJobs() {
  const [active, setActive] = useState(0)
  const { role, jobs } = ROLES[active]

  return <section id="first-jobs" className={styles.section} data-stage="Business stories" aria-labelledby="first-jobs-title">
    <div className={styles.heading}>
      <div>
        <p className="eyebrow">Picture it in your week</p>
        <h2 id="first-jobs-title">Before you hire for it, <em>hand it to an Eigi.</em></h2>
      </div>
      <p className="lead">A first ops or support hire usually starts as a pile of repeat work. Start with the pile.</p>
    </div>
    <div className={styles.roles}>
      <p id="first-jobs-roles">The hire you’re putting off</p>
      <div role="group" aria-labelledby="first-jobs-roles">{ROLES.map((item, index) => <button type="button" key={item.role} aria-pressed={active === index} onClick={() => setActive(index)}>{item.role}</button>)}</div>
    </div>
    <ol className={styles.jobs} key={role} aria-label={`First jobs for ${role.toLowerCase()}`}>
      {jobs.map(({ task, detail }, index) => <li key={task}>
        <span className={styles.number}>Job {String(index + 1).padStart(2, '0')}</span>
        <h3>{task}</h3>
        <p>{detail}</p>
        <a href={heroOnboardingLink(task)} target="_blank" rel="noopener noreferrer">Start with this job <span aria-hidden="true">↗</span></a>
      </li>)}
    </ol>
    <p className={styles.note}>Illustrative examples. Your Eigi checks with you before anything goes out in your name.</p>
  </section>
}
