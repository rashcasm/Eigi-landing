import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { WorkIcon } from './WorkIcon.tsx'
import styles from './Gateway.module.css'

const INGREDIENTS = [
  { icon: 'person', title: 'You', description: 'Choose the jobs and approve the work.', style: 'human' },
  { icon: 'people', title: 'Your sherpa', description: 'Connect your tools and check the setup.', style: 'engineers' },
  { icon: 'computer', title: 'Your Eigis', description: 'Research, draft, and report back.', style: 'computer' },
] as const

/** A finite, replayable equation. Reduced motion renders the complete, open gateway immediately. */
export function Gateway() {
  const reducedMotion = useReducedMotion()
  const [replay, setReplay] = useState(0)
  const arrive = {
    hidden: { opacity: 0, y: 18 },
    visible: (index: number) => ({ opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : index * 0.22 } }),
  }
  const door = (direction: number) => ({
    hidden: { x: '0%' },
    visible: { x: `${direction * 102}%`, transition: { duration: reducedMotion ? 0 : 1.5, delay: reducedMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] as const } },
  })

  return (
    <section id="gateway" className={styles.gateway} data-stage="The gateway" aria-labelledby="gateway-title">
      <div className={styles.heading}>
        <p className="eyebrow">Who does what</p>
        <h2 id="gateway-title">You, your sherpa,<br />and your Eigis.</h2>
        <p>You know the business. Your sherpa connects the tools.<br />Your Eigis handle the jobs you give them.</p>
      </div>
      <motion.div key={replay} className={styles.equation} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.3 }} role="group" aria-label="You, your sherpa, and your Eigis work together to set up an AI workflow.">
        <div className={styles.ingredients}>
          {INGREDIENTS.map(({ icon, title, description, style }, index) => (
            <motion.div key={title} className={styles.ingredient} variants={arrive} custom={index}>
              {index > 0 && <span className={styles.plus} aria-hidden="true">+</span>}
              <div className={`${styles.object} ${styles[style]}`}><>{icon === 'computer' ? <img className={styles.computerLogo} src="/favicon.jpg" alt="" width="64" height="64" /> : <WorkIcon name={icon} />}</><span className={styles.objectFloor} /></div>
              <h3>{title}</h3><p>{description}</p>
            </motion.div>
          ))}
        </div>
        <motion.span className={styles.equals} variants={arrive} custom={3} aria-hidden="true">=</motion.span>
        <motion.div className={styles.destination} variants={arrive} custom={3}>
          <div className={styles.portal} aria-hidden="true">
            <div className={styles.portalGlow} />
            <div className={styles.frame}>
              <div className={styles.inside}>
                <div className={styles.horizon} />
                <div className={styles.infinity}>∞</div>
                <motion.div className={styles.doorLeft} variants={door(-1)} />
                <motion.div className={styles.doorRight} variants={door(1)} />
              </div>
            </div>
            <div className={styles.reflection} />
          </div>
          <h3>A working AI workflow.</h3><p>In the tools you already use.</p>
        </motion.div>
      </motion.div>
      <div className={styles.foot}>
        <button type="button" className={styles.replay} onClick={() => setReplay((value) => value + 1)}><span aria-hidden="true">↻</span> Replay</button>
      </div>
    </section>
  )
}
