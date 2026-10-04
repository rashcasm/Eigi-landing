import { WorkIcon } from './WorkIcon.tsx'
import styles from './Problem.module.css'

export function Problem() {
  return (
    <section id="problem" className={styles.problem} data-stage="Why Eigi">
      <div>
        <p className="eyebrow">Your Eigi sherpas</p>
        <h2>We help your team<br />use what we build.</h2>
        <p className="lead">We learn how you work, connect your tools, and show your team how to use Eigi for the jobs you choose.</p>
      </div>
      <div className={styles.promise}>
        <div className={styles.team}><WorkIcon name="people" /><span>Your Eigi team</span><span>Setup and support</span></div>
        <h3>Engineers who work with you.</h3>
        <p>We work with your team from the first setup through day-to-day use.</p>
        <ul>
          <li><WorkIcon name="check" />We learn how your business runs.</li>
          <li><WorkIcon name="check" />We connect Eigi to your existing tools.</li>
          <li><WorkIcon name="check" />We help your team use the workflow.</li>
        </ul>
        <a className="text-link" href="#route">See how we work <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
