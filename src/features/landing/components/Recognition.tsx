import { useState } from 'react'
import styles from './Recognition.module.css'

const QUESTIONS = [
  { area: 'Hiring', text: 'Hiring for growth, or for broken systems?' },
  { area: 'Follow-ups', text: 'Nothing moves until you chase it.' },
  { area: 'Your week', text: 'You ran the company this week. You didn’t build it.' },
  { area: 'Tools', text: 'Five tools to avoid one hire. Now you manage five tools.' },
  { area: 'Growth', text: 'Customers double. Team doesn’t. What breaks?' },
] as const

/** Recognition before explanation: the founder's week, asked back to them. */
export function Recognition() {
  const [mine, setMine] = useState<ReadonlySet<number>>(new Set())
  const toggle = (index: number) => setMine(current => {
    const next = new Set(current)
    if (!next.delete(index)) next.add(index)
    return next
  })

  return <section id="sound-familiar" className={styles.section} data-stage="Why Eigi" aria-labelledby="familiar-title">
    <div className={styles.heading}>
      <p className="eyebrow">Sound familiar?</p>
      <h2 id="familiar-title">You started a company. Somehow you became its <em>operations team.</em></h2>
    </div>
    <ol className={styles.questions}>
      {QUESTIONS.map(({ area, text }, index) => <li key={area} data-mine={mine.has(index)}>
        <span className={styles.area}>{String(index + 1).padStart(2, '0')} · {area}</span>
        <p>{text}</p>
        <button type="button" aria-pressed={mine.has(index)} onClick={() => toggle(index)}><span className="sr-only">{text} </span>{mine.has(index) ? 'That’s us ✓' : 'That’s us'}</button>
      </li>)}
    </ol>
    <div className={styles.close}>
      <p>None of this means you need more people yet. It means the work needs a system that doesn’t run through <em>you</em>.</p>
      <p className={styles.tally} aria-live="polite">{mine.size === 0 ? 'Tap the ones that sound like your company.' : <>{mine.size} of {QUESTIONS.length}. <a href="#talk">Tell Amit which one hurts most ↑</a></>}</p>
    </div>
  </section>
}
