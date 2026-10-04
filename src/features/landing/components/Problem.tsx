import { WorkIcon } from './WorkIcon.tsx'
import styles from './Problem.module.css'

export function Problem() {
  return (
    <section id="problem" className={styles.problem} data-stage="Why Eigi">
      <div>
        <p className="eyebrow">The missing piece is adoption.</p>
        <h2>AI is everywhere.<br />Making it work?<br />That takes people.</h2>
        <p className="lead">Another subscription won’t connect the dots. You need someone who understands your business, builds the right workflows, and helps your team use them.</p>
      </div>
      <div className={styles.promise}>
        <div className={styles.team}><WorkIcon name="people" /><span>Your Eigi team</span><span>By your side</span></div>
        <h3>Meet your AI sherpas.</h3>
        <p>Forward-deployed engineers. A hands-on team that works alongside yours, from “where do we start?” to “how did we work without this?”</p>
        <ul>
          <li><WorkIcon name="check" />We learn how your business actually runs.</li>
          <li><WorkIcon name="check" />We connect the right AI to your existing tools.</li>
          <li><WorkIcon name="check" />We stay to help your people make it their own.</li>
        </ul>
        <a className="text-link" href="#route">Get to know the process <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
