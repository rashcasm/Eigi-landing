import { useState } from 'react'
import styles from './Recognition.module.css'

const QUESTIONS = [
  { area: 'Hiring', text: 'Are you hiring because the company is growing, or because your systems aren’t?' },
  { area: 'Follow-ups', text: 'How many things still move only when you personally follow up?' },
  { area: 'Your week', text: 'How much of this week went to running the company instead of building it?' },
  { area: 'Tools', text: 'How many tools did you add to avoid one hire, and who keeps them talking to each other?' },
  { area: 'Growth', text: 'When your customers double and your team doesn’t, what breaks first?' },
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
