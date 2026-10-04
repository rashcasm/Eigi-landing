import styles from './Route.module.css'

const STEPS = [
  { title: 'Find the right starting point.', body: 'We sit with you, learn the business, and find the repetitive work worth solving first.', output: 'A clear opportunity map' },
  { title: 'Build around your business.', body: 'We choose the tools, connect your systems, and build your first working AI workflow.', output: 'A workflow in your real tools' },
  { title: 'Make it second nature.', body: 'We test it with your team, handle the edge cases, and show everyone how to use it.', output: 'A team ready to take the reins' },
  { title: 'Keep moving forward.', body: 'We stay close, improve what’s working, and help you take on the next opportunity.', output: 'Support as your business grows' },
]

export function Route() {
  return (
    <section id="route" className={styles.route} data-stage="How it works">
      <div className={styles.heading}><p className="eyebrow">From possibility to part of your day.</p><h2>A way forward.<br />And a team beside you.</h2><p className="lead">You don’t need an AI roadmap to start.<br />That’s what we’re here to build with you.</p></div>
      <ol className={styles.steps}>
        {STEPS.map(({ title, body, output }, index) => <li key={title}><span className={styles.number}>{index + 1}</span><h3>{title}</h3><p>{body}</p><span className={styles.output}>{output}</span></li>)}
      </ol>
      <div className={styles.invitation}><p>One workflow is a good place to begin.</p><button className="btn" type="button" data-amit>Let’s find yours <span aria-hidden="true">↗</span></button></div>
    </section>
  )
}
