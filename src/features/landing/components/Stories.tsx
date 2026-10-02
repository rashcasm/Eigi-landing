import { motion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { cx } from '../../../utils/cx.ts'
import { peepStyle } from '../utils/peeps.ts'
import styles from './Stories.module.css'

/**
 * Field notes from the climb. Industries and agents come from eigi.ai/solutions;
 * swap in named customers and real results as they are cleared for publishing.
 */
const STORIES = [
  {
    industry: 'Customer support', peep: 4, agent: 'Voice agent',
    title: 'Every call picked up',
    before: 'Calls after 7 pm went to voicemail, and most callers never tried again.',
    after: 'A voice agent picks up around the clock, solves the routine questions and hands the hard ones to a human.',
  },
  {
    industry: 'E-commerce', peep: 17, agent: 'Voice + chat agents',
    title: 'A store that talks back',
    before: 'Shoppers bounced when search could not find what they meant.',
    after: 'Shoppers ask out loud for what they mean, and track orders without leaving the store.',
  },
  {
    industry: 'Real estate', peep: 31, agent: 'Voice agent',
    title: 'Every inquiry, qualified',
    before: 'Brokers spent their mornings answering the same five questions.',
    after: 'Agents answer property inquiries, qualify the lead and book the viewing.',
  },
  {
    industry: 'Education', peep: 62, agent: 'Chat + video agents',
    title: 'Admissions at 2 a.m.',
    before: 'The helpline closed at six. Applicants did not.',
    after: 'An admissions agent and AI tutors answer students whenever they ask.',
  },
  {
    industry: 'Healthcare', peep: 77, agent: 'Voice agent',
    title: 'The front desk, handled',
    before: 'Receptionists juggled phones, walk-ins and reminders all at once.',
    after: 'An agent handles intake, booking and reminders. The desk looks after the people in the room.',
  },
  {
    industry: 'Finance & banking', peep: 90, agent: 'Voice agent',
    title: 'Answers before the hold music',
    before: 'Customers waited on hold just to check a balance.',
    after: 'Balance checks, fraud alerts and loan pre-qualification take one short call.',
  },
]

/** Pinned while the log scrolls sideways; each postcard sits a step higher than the last, like the climb. */
export function Stories() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const rope = useTransform(scrollYProgress, [0, 1], [0, 1])

  // how far the track has to travel sideways = its overflow past the viewport
  useLayoutEffect(() => {
    const track = trackRef.current!
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <section
      id="stories"
      ref={sectionRef}
      className={styles.stories}
      data-stage="Stories"
      style={{ ['--travel' as string]: `${distance}px` }}
    >
      <div className={styles.sticky}>
        <motion.div ref={trackRef} className={styles.track} style={{ x }}>
          <div className={styles.intro}>
            <p className="eyebrow">§ 04 · Stories</p>
            <h2>Field notes from the climb.</h2>
            <p className="lead">
              Typical climbs, by industry: what kept each team at base camp, and the agents that got it moving.
            </p>
            <p className={cx(styles.hint, 'mono')}>Keep scrolling →</p>
          </div>

          <ol className={styles.log}>
            {STORIES.map((s, i) => (
              <li key={s.title} className={styles.card} style={{ ['--rise' as string]: i }}>
                <header className={cx(styles.meta, 'mono')}>
                  <span>Log {String(i + 1).padStart(2, '0')}</span>
                  <span>{s.industry}</span>
                </header>
                <div className={styles.portrait}><span style={peepStyle(s.peep)} /></div>
                <h3>{s.title}</h3>
                <dl className={styles.story}>
                  <div className={styles.before}><dt className="mono">Before</dt><dd>{s.before}</dd></div>
                  <div><dt className="mono">With Eigi</dt><dd>{s.after}</dd></div>
                </dl>
                <span className={cx(styles.agent, 'mono')}>↳ {s.agent}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <div className={styles.progress} aria-hidden="true">
          <motion.i style={{ scaleX: rope }} />
        </div>
      </div>
    </section>
  )
}
