import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import sherpa from '../../../assets/mascot/eigi-sherpa.png'
import { FIRST_JOBS, firstJobFor, type FirstJob } from '../utils/first-job.ts'
import { heroOnboardingLink } from '../utils/hero-demo.ts'
import { WhyEigi } from './WhyEigi.tsx'
import styles from './BaseCamp.module.css'

const READING_MS = 1000
const REPLY_MS = 4500

export function BaseCamp({ product = false }: { product?: boolean }) {
  const [input, setInput] = useState('')
  const [job, setJob] = useState<FirstJob | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduced = useReducedMotion()
  const complete = !!job && (reduced || elapsed >= READING_MS + REPLY_MS)
  const reading = !!job && !complete && elapsed < READING_MS
  const progress = complete ? 1 : Math.max(0, (elapsed - READING_MS) / REPLY_MS)

  useEffect(() => {
    if (!job || complete) return
    const started = performance.now()
    const timer = window.setInterval(() => setElapsed(performance.now() - started), 40)
    const skip = () => setElapsed(READING_MS + REPLY_MS)
    // The initiating event must not skip the example it just started.
    document.addEventListener('click', skip, true)
    document.addEventListener('keydown', skip, true)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('click', skip, true)
      document.removeEventListener('keydown', skip, true)
    }
  }, [job, complete])

  function submit(task: string) {
    const next = firstJobFor(task)
    if (!next) return
    setInput(next.task)
    setElapsed(0)
    setJob({ ...next })
  }

  function reset() {
    setJob(null)
    setInput('')
    setElapsed(0)
    inputRef.current?.focus()
  }

  return <section id="base-camp" className={styles.hero} data-stage="Meet your Eigi" aria-labelledby="hero-title">
    <div className={styles.firstScreen}>
      <svg className={styles.contours} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map(i => <path key={i} transform={`translate(${-i * 28} ${i * 26})`} d="M-150 600C80 660 175 470 110 330S75 140 220 110 305-90 240-140M1210 860C1110 620 1420 650 1330 380S1320 155 1510 85" />)}
      </svg>
      <header className={styles.intro}>
        <p className="eyebrow">For small teams that need to move fast</p>
        <h1 id="hero-title">Everyone sold you AI.<br />Nobody <em>showed you how.</em></h1>
        <p className={styles.subhead}>Eigi gives your business AI teammates that do real work, and a sherpa, a real engineer, who sets them up with you and stays until it sticks.</p>
      </header>
      <div className={styles.hook}>
        <div className={styles.composer}>
          <label htmlFor="first-job">Give your Eigi its first job</label>
          <form onSubmit={event => { event.preventDefault(); submit(input) }}>
            <input ref={inputRef} id="first-job" placeholder="What's eating your week?" value={input} maxLength={80} onChange={event => setInput(event.target.value)} autoComplete="off" />
            <button type="submit" disabled={!input.trim()}>Ask my Eigi <span aria-hidden="true">↗</span></button>
          </form>
          <div className={styles.chips} role="group" aria-label="Try a first job">{FIRST_JOBS.map(example => <button type="button" key={example.task} aria-pressed={job?.task === example.task} onClick={() => submit(example.task)}>{example.task}</button>)}</div>
          <img className={styles.mascot} data-working={!!job} src={sherpa} width="720" height="480" alt="A friendly red panda, your Eigi sherpa" fetchPriority="high" />
        </div>
        <div className={styles.cards} data-started={!!job}>
          <article className={styles.eigiCard}>
            <div className={styles.cardHeading}><span className={styles.avatar} aria-hidden="true">e.</span><h2>Your Eigi</h2><span className={styles.exampleTag}>Example reply</span></div>
            <div className={styles.reply}>
              <p aria-hidden="true" className={!job || reading ? styles.placeholder : undefined}>{job ? reading ? 'Reading your job…' : job.reply.slice(0, Math.ceil(job.reply.length * progress)) : 'A little less on your plate starts with one job.'}{job && !reading && !complete && <span className={styles.cursor} />}</p>
              <p className={styles.srOnly} aria-live="polite" aria-atomic="true">{complete ? job?.reply : ''}</p>
            </div>
            <p className={styles.cardFooter}>An example of how your Eigi replies. Tell us your real job and we'll set it up with you.</p>
          </article>
          <article className={styles.sherpaCard}>
            <div className={styles.cardHeading}><span className={styles.sherpaMark} aria-hidden="true">↗</span><h2>Your sherpa</h2><span className={styles.humanTag}>A real engineer</span></div>
            <p className={styles.planIntro}>Here's how we'd set this up with you:</p>
            {job ? <ol className={styles.steps}>{job.steps.map((step, index) => <li key={step} data-ready={complete || elapsed >= READING_MS + index * 1250}><span aria-hidden="true">{complete || elapsed >= READING_MS + index * 1250 ? '✓' : index + 1}</span>{step}</li>)}</ol> : <p className={styles.emptyPlan}>Your tools. Your way of working.<br />A plan we put into practice together.</p>}
            <p className={styles.cardFooter}>An example plan. We shape it around your business.</p>
          </article>
        </div>
        <div className={styles.payoff} data-visible={!!complete} inert={!complete}>
          <p>Your Eigi does the work. Your sherpa makes it stick.</p>
          <div><a className={styles.primary} href={heroOnboardingLink(job?.task ?? '')} target="_blank" rel="noopener noreferrer">Set this up with a sherpa <span aria-hidden="true">↗</span></a><button type="button" onClick={reset}>Try another job</button></div>
        </div>
      </div>
      <a className={styles.discover} href={product ? '#how-computer-works' : '#meet-your-eigi'}>Meet your Eigi <span aria-hidden="true">↓</span></a>
    </div>
    <WhyEigi />
  </section>
}
