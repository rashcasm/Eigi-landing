import styles from './Route.module.css'

const PRINCIPLES = [
  { title: 'Embedded, not outsourced', body: 'Your sherpa joins your Slack, your standups and your chaos.' },
  { title: 'Moves at AI speed', body: 'Working steps every week, not a quarter-long project.' },
  { title: 'Built for small teams', body: 'Made for teams of two to ten, not enterprises of two thousand.' },
]

const STEPS = [
  { title: 'Find the right starting point.', body: 'We sit with you, learn the business, and find the repetitive work worth solving first.', output: 'A clear opportunity map' },
  { title: 'Build around your business.', body: 'We choose the tools, connect your systems, and build your first working AI workflow.', output: 'A workflow in your real tools' },
  { title: 'Make it second nature.', body: 'We test it with your team, handle the edge cases, and show everyone how to use it.', output: 'A team ready to take the reins' },
  { title: 'Keep moving forward.', body: 'We stay close, improve what’s working, and help you take on the next opportunity.', output: 'Support as your business grows' },
]

export function Route() {
  return (
    <section id="route" className={styles.route} data-stage="How it works" aria-labelledby="route-title">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">The human half</p>
          <h2 id="route-title">Meet your AI sherpas.</h2>
          <p className="lead">Forward-deployed engineers who work alongside your team, from “where do we start?” to “how did we work without this?”</p>
        </div>
        <ul className={styles.principles}>{PRINCIPLES.map(({ title, body }) => <li key={title}><strong>{title}</strong>{body}</li>)}</ul>
      </div>
      <ol className={styles.steps}>
        {STEPS.map(({ title, body, output }, index) => <li key={title} style={{ ['--rise' as string]: index }}>
          <span className={styles.camp}>Camp {['I', 'II', 'III', 'IV'][index]}</span>
          <h3>{title}</h3><p>{body}</p><span className={styles.output}>{output}</span>
        </li>)}
      </ol>
      <div className={styles.invitation}><p>You don’t need an AI roadmap to start. One workflow is a good place to begin.</p><a className="btn" href="#talk">Let’s find yours <span aria-hidden="true">↑</span></a></div>
    </section>
  )
}
