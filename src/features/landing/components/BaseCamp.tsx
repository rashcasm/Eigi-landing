import { WorkIcon } from './WorkIcon.tsx'
import styles from './BaseCamp.module.css'

const FUNCTIONS = [
  { icon: 'support', title: 'Customer care', detail: 'Make every reply count.' },
  { icon: 'sales', title: 'Sales & growth', detail: 'Keep opportunities moving.' },
  { icon: 'operations', title: 'Operations', detail: 'Give busywork a new home.' },
  { icon: 'product', title: 'Product', detail: 'Make room to build.' },
] as const

export function BaseCamp() {
  return (
    <section id="base-camp" className={styles.hero} data-stage="Your team">
      <div className={styles.intro}>
        <p className="eyebrow">Your ambition. Our people. AI at work.</p>
        <h1>Small team.<br />Extraordinary reach.</h1>
        <p className="lead">We bring the engineers and AI workflows that help your business do more. Set up with you. Built around you.</p>
        <div className={styles.actions}>
          <button type="button" className="btn" data-amit>Find your first AI workflow <span aria-hidden="true">↗</span></button>
          <a className="text-link" href="#gateway">See how it comes together <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <figure className={styles.ecosystem} aria-label="Your team is connected to customer care, sales, operations, and product through Eigi's engineers and AI workflows.">
        <div className={styles.network} aria-hidden="true">
          <svg className={styles.connections} viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none">
            <defs><linearGradient id="connection" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#b9d1c0" /><stop offset="1" stopColor="#d3d7d4" /></linearGradient></defs>
            <path d="M500 42V120M430 170H225Q200 170 200 145V114M570 170H775Q800 170 800 145V114M440 210H345Q320 210 320 240V266M560 210H655Q680 210 680 240V266" stroke="url(#connection)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <circle cx="280" cy="170" r="4" fill="#6e947b" /><circle cx="730" cy="170" r="4" fill="#6e947b" />
            <circle cx="320" cy="244" r="3.5" fill="#6e947b" /><circle cx="680" cy="244" r="3.5" fill="#6e947b" />
          </svg>
          <div className={styles.you}><WorkIcon name="people" /><span>You + your team</span></div>
          <div className={styles.core}>
            <div className={styles.coreFace}><span className={styles.brand} /><span>Your AI adoption team</span></div>
          </div>
          {FUNCTIONS.map(({ icon, title, detail }) => (
            <div key={icon} className={`${styles.function} ${styles[icon]}`}>
              <span className={styles.icon}><WorkIcon name={icon} /></span>
              <div><strong>{title}</strong><span>{detail}</span></div>
            </div>
          ))}
        </div>
        <figcaption>Your people at the center. A whole new capacity around them.</figcaption>
      </figure>
      <div className={styles.audience}>
        <p>Built for founders who want to stay lean.</p>
        <span>Just launched</span><i aria-hidden="true" /><span>Recently funded</span><i aria-hidden="true" /><span>Ready for what’s next</span>
      </div>
    </section>
  )
}
