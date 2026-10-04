import styles from './Problem.module.css'

const TRIED = [
  { who: 'AI subscriptions', what: 'Powerful, and a blank chat box. Working out where it fits is still your job.' },
  { who: 'Single-task AI bots', what: 'One bot, one job. Nobody rethinks how the work actually flows.' },
  { who: 'Automation agencies', what: 'Build it, hand it over, leave. It breaks the week your process changes.' },
  { who: 'Consultancies', what: 'Thorough, at enterprise prices and enterprise pace.' },
] as const

const EVIDENCE = [
  {
    figure: '<20%', claim: 'of US businesses with four or fewer employees use AI. Among firms with 250 or more, it’s 37%.',
    source: 'US Census Bureau, Business Trends and Outlook Survey, May 2026', href: 'https://www.census.gov/library/stories/2026/05/ai-use-businesses.html',
  },
  {
    figure: '67%', claim: 'of AI projects bought from specialist partners succeeded. Projects built in-house succeeded far less often.',
    source: 'MIT NANDA, “The GenAI Divide: State of AI in Business 2025”', href: 'https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/',
  },
] as const

/** Why the work is still on the founder's plate: the gap is adoption, not intelligence. */
export function Problem() {
  return (
    <section id="problem" className={styles.problem} data-stage="Why Eigi" aria-labelledby="problem-title">
      <div className={styles.top}>
        <div>
          <p className="eyebrow">The missing piece is adoption.</p>
          <h2 id="problem-title">AI is everywhere. Making it work? <em>That takes people.</em></h2>
          <p className="lead">The tools are one login away. What’s missing is someone who learns how your company actually runs, wires AI into it, and stays until your team relies on it.</p>
        </div>
        <div className={styles.tried}>
          <p className={styles.label}>What you’ve probably tried</p>
          <ul>
            {TRIED.map(({ who, what }) => <li key={who}><span>{who}</span>{what}</li>)}
            <li className={styles.us}><span>Eigi</span>AI teammates that do the work, and an engineer inside your company who sets them up and stays. Built for teams under ten.</li>
          </ul>
        </div>
      </div>
      <div className={styles.evidence}>
        {EVIDENCE.map(({ figure, claim, source, href }) => <figure key={figure}>
          <p className={styles.figure}>{figure}</p>
          <figcaption><p>{claim}</p><a href={href} target="_blank" rel="noopener noreferrer">{source} <span aria-hidden="true">↗</span></a></figcaption>
        </figure>)}
        <p className={styles.closing}>Big companies hire forward-deployed engineers to make AI stick. We built Eigi so a team of two gets the same.</p>
      </div>
    </section>
  )
}
