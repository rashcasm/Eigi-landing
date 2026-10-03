import { motion, useReducedMotion } from 'motion/react'
import styles from './ConnectedApps.module.css'

const APPS = [
  { name: 'Slack', detail: 'Text it in a thread', icon: 'slack' },
  { name: 'Microsoft Teams', detail: 'Text it in a chat', icon: 'teams' },
  { name: 'Email', detail: 'Forward it a thread', icon: 'email' },
  { name: 'Claude', detail: 'Call it from a chat', icon: 'claude' },
  { name: 'ChatGPT', detail: 'Call it from a chat', icon: 'chatgpt' },
  { name: 'Your browser', detail: 'Where it does work', icon: 'browser' },
] as const

type AppIconName = typeof APPS[number]['icon']

function AppIcon({ name }: { name: AppIconName }) {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden="true">
    {name === 'slack' && <><path d="M13 5v8M5 19h8" stroke="#36c5f0" strokeWidth="5" strokeLinecap="round" /><path d="M19 5h.01M19 11h8" stroke="#2eb67d" strokeWidth="5" strokeLinecap="round" /><path d="M27 19h.01M19 19v8" stroke="#ecb22e" strokeWidth="5" strokeLinecap="round" /><path d="M13 27h-.01M5 11h.01M11 19v8" stroke="#e01e5a" strokeWidth="5" strokeLinecap="round" /></>}
    {name === 'teams' && <><circle cx="23.5" cy="8" r="3.5" fill="#7b83eb" /><rect x="15" y="13" width="14" height="13" rx="4" fill="#7b83eb" /><rect x="3" y="8" width="18" height="18" rx="3.5" fill="#5059c9" /><path d="M8 13h8m-4 0v9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></>}
    {name === 'email' && <g stroke="#537661" strokeWidth="1.5" strokeLinejoin="round"><rect x="3" y="7" width="26" height="18" rx="4" /><path d="m4 9 12 9 12-9" /></g>}
    {name === 'claude' && <path d="M16 4v24M4 16h24M7.5 7.5l17 17m0-17-17 17" stroke="#d97757" strokeWidth="3.2" strokeLinecap="round" />}
    {name === 'chatgpt' && <><circle cx="16" cy="16" r="14" fill="#1d1d1f" /><g stroke="#fff" strokeWidth="1.6">{[0, 60, 120].map(angle => <ellipse key={angle} cx="16" cy="16" rx="8.5" ry="3.8" transform={`rotate(${angle} 16 16)`} />)}</g></>}
    {name === 'browser' && <g stroke="#537661" strokeWidth="1.5"><rect x="3" y="5" width="26" height="22" rx="4" /><path d="M3 11h26M7 8h1m3 0h1" /><circle cx="16" cy="19" r="5" /><path d="M11 19h10m-5-5c-3 3-3 7 0 10 3-3 3-7 0-10Z" /></g>}
  </svg>
}

const DESKTOP_PATHS = ['M150 65H270Q300 65 300 95V150Q300 180 340 180H440', 'M150 180H440', 'M150 295H270Q300 295 300 265V210Q300 180 340 180H440', 'M730 65H610Q580 65 580 95V150Q580 180 540 180H440', 'M730 180H440', 'M730 295H610Q580 295 580 265V210Q580 180 540 180H440']
const MOBILE_PATHS = ['M50 58V95Q50 115 75 115H125Q150 115 150 140V190', 'M150 58V190', 'M250 58V95Q250 115 225 115H175Q150 115 150 140V190', 'M50 322V285Q50 265 75 265H125Q150 265 150 240V190', 'M150 322V190', 'M250 322V285Q250 265 225 265H175Q150 265 150 240V190']

/** A responsive, labeled diagram: three ways in, one memory, and the browser as the place work happens. */
export function ConnectedApps() {
  const reduced = useReducedMotion()
  return <figure className={styles.figure} aria-label="Text Eigi Computer in Slack or Microsoft Teams, forward it email, or call it from Claude or ChatGPT. It does the work in your browser.">
    <motion.div className={styles.diagram} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .3 }}>
      <div className={styles.halo} aria-hidden="true" />
      {[{ paths: DESKTOP_PATHS, viewBox: '0 0 880 360', className: styles.desktopLines }, { paths: MOBILE_PATHS, viewBox: '0 0 300 380', className: styles.mobileLines }].map(({ paths, viewBox, className }) => <svg key={viewBox} className={`${styles.lines} ${className}`} viewBox={viewBox} preserveAspectRatio="none" fill="none" aria-hidden="true">{paths.map((d, index) => <g key={d}><path d={d} stroke="#e1e8e2" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><motion.path d={d} stroke="#8fac98" strokeWidth="1.5" vectorEffect="non-scaling-stroke" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: reduced ? 0 : 1.2, delay: reduced ? 0 : index * .1 } } }} /></g>)}</svg>)}
      {APPS.map(({ name, detail, icon }, index) => <motion.div key={name} className={`${styles.app} ${styles[icon]}`} variants={{ hidden: { opacity: 0, scale: .9 }, visible: { opacity: 1, scale: 1, transition: { duration: reduced ? 0 : .45, delay: reduced ? 0 : index * .08 } } }}><span className={styles.appIcon}><AppIcon name={icon} /></span><div><strong>{name}</strong><span className={styles.detail}>{detail}</span></div><span className={styles.port} aria-hidden="true" /></motion.div>)}
      <div className={styles.hub}><div className={styles.device}><img src="/favicon.jpg" alt="" width="76" height="76" /><span className={styles.indicator} aria-hidden="true" /></div><strong>Eigi Computer</strong><span>One company memory</span></div>
    </motion.div>
    <figcaption><strong>Different tools, different jobs.</strong> Ask it in Slack, Teams, or email. Call it from inside Claude or ChatGPT. It works in the browser.</figcaption>
  </figure>
}
