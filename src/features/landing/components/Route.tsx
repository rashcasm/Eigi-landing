import styles from './Route.module.css'

const STEPS = [
  { title: 'Choose the first job.', body: 'We sit with you, learn the business, and find the repetitive work worth solving first.', output: 'A first job to automate' },
  { title: 'Connect your tools.', body: 'We choose the tools, connect your systems, and build your first working AI workflow.', output: 'A workflow in your real tools' },
  { title: 'Test it with your team.', body: 'We test it with your team, handle the edge cases, and show everyone how to use it.', output: 'A team that knows how to use it' },
  { title: 'Keep improving it.', body: 'We stay on call, improve the workflow, and help you choose what to automate next.', output: 'Ongoing help from your sherpa' },
]

export function Route() {
  return (
    <section id="route" className={styles.route} data-stage="How it works">
      <div className={styles.heading}><p className="eyebrow">How it works</p><h2>Start with one job.</h2><p className="lead">Tell us what takes up your week. We’ll work out what to automate and set it up with you.</p></div>
      <ol className={styles.steps}>
        {STEPS.map(({ title, body, output }, index) => <li key={title}><span className={styles.number}>{index + 1}</span><h3>{title}</h3><p>{body}</p><span className={styles.output}>{output}</span></li>)}
      </ol>
      <div className={styles.invitation}><button className="btn" type="button" data-amit>Talk through your first job <span aria-hidden="true">↗</span></button></div>
    </section>
  )
}
