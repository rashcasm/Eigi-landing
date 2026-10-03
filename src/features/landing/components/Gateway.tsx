import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { WorkIcon } from './WorkIcon.tsx'
import styles from './Gateway.module.css'

const INGREDIENTS = [
  { icon: 'person', title: 'You', description: 'The vision. The judgment.', style: 'human' },
  { icon: 'people', title: 'Forward-deployed engineers', description: 'The people who make it work.', style: 'engineers' },
  { icon: 'computer', title: 'Eigi computer', description: 'Your agents. Working together.', style: 'computer' },
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
        <p className="eyebrow">The Eigi equation</p>
        <h2 id="gateway-title">Your gateway<br />to singularity.</h2>
        <p>Human ambition. Applied intelligence.<br />The possibility of both, working as one.</p>
      </div>
      <motion.div key={replay} className={styles.equation} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.3 }} role="group" aria-label="You plus forward-deployed engineers plus Eigi computer equals a gateway to singularity.">
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
          <h3>Gateway to singularity.</h3><p>Your business, AI-first.</p>
        </motion.div>
      </motion.div>
      <div className={styles.foot}>
        <p>Our vision of singularity: the distance between an idea<br className={styles.lineBreak} /> and making it happen gets smaller, every day.</p>
        <button type="button" className={styles.replay} onClick={() => setReplay((value) => value + 1)}><span aria-hidden="true">↻</span> Replay the connection</button>
      </div>
    </section>
  )
}
