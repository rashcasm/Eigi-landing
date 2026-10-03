import { motion, useReducedMotion } from 'motion/react'
import styles from './ConnectedApps.module.css'

const APPS = [
  { name: 'Gmail', detail: 'Your inbox', icon: 'gmail' },
  { name: 'Slack', detail: 'Your team', icon: 'slack' },
  { name: 'Notion', detail: 'Your knowledge', icon: 'notion' },
  { name: 'WhatsApp', detail: 'Stay in touch', icon: 'whatsapp' },
  { name: 'Telegram', detail: 'Pick up anywhere', icon: 'telegram' },
  { name: 'Your browser', detail: 'The rest of the web', icon: 'browser' },
] as const

type AppIconName = typeof APPS[number]['icon']

function AppIcon({ name }: { name: AppIconName }) {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden="true">
    {name === 'gmail' && <><path d="M5 25V9l11 8L27 9v16" stroke="#4285f4" strokeWidth="4" strokeLinejoin="round" /><path d="M5 25V9" stroke="#34a853" strokeWidth="4" /><path d="m5 9 11 8L27 9" stroke="#ea4335" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M27 9v16" stroke="#fbbc04" strokeWidth="4" /></>}
    {name === 'slack' && <><path d="M13 5v8M5 19h8" stroke="#36c5f0" strokeWidth="5" strokeLinecap="round" /><path d="M19 5h.01M19 11h8" stroke="#2eb67d" strokeWidth="5" strokeLinecap="round" /><path d="M27 19h.01M19 19v8" stroke="#ecb22e" strokeWidth="5" strokeLinecap="round" /><path d="M13 27h-.01M5 11h.01M11 19v8" stroke="#e01e5a" strokeWidth="5" strokeLinecap="round" /></>}
    {name === 'notion' && <><rect x="4" y="3" width="24" height="26" rx="3" fill="#fff" stroke="#1d1d1f" strokeWidth="1.5" /><path d="M9 24V8h3l10 16V8M7 8h7m5 0h6M7 24h6m6 0h5" stroke="#1d1d1f" strokeWidth="2" strokeLinejoin="round" /></>}
    {name === 'whatsapp' && <><path d="M27 15.5A11.5 11.5 0 0 1 10 25.6L4 27l1.5-5.7A11.5 11.5 0 1 1 27 15.5Z" fill="#26b868" /><path d="m11 9 2 4-1.5 1.5c1 2.4 2.5 4 5 5l1.5-1.5 4 2c-1 5-9 1-12-4-2-3-2-6 1-7Z" fill="#fff" /></>}
    {name === 'telegram' && <><circle cx="16" cy="16" r="13" fill="#2aabee" /><path d="m7 15 18-7-4 17-6-5-3 3 1-6 9-6-11 5Z" fill="#fff" strokeLinejoin="round" /></>}
    {name === 'browser' && <g stroke="#537661" strokeWidth="1.5"><rect x="3" y="5" width="26" height="22" rx="4" /><path d="M3 11h26M7 8h1m3 0h1" /><circle cx="16" cy="19" r="5" /><path d="M11 19h10m-5-5c-3 3-3 7 0 10 3-3 3-7 0-10Z" /></g>}
  </svg>
}

const DESKTOP_PATHS = ['M150 65H270Q300 65 300 95V150Q300 180 340 180H440', 'M150 180H440', 'M150 295H270Q300 295 300 265V210Q300 180 340 180H440', 'M730 65H610Q580 65 580 95V150Q580 180 540 180H440', 'M730 180H440', 'M730 295H610Q580 295 580 265V210Q580 180 540 180H440']
const MOBILE_PATHS = ['M50 58V95Q50 115 75 115H125Q150 115 150 140V190', 'M150 58V190', 'M250 58V95Q250 115 225 115H175Q150 115 150 140V190', 'M50 322V285Q50 265 75 265H125Q150 265 150 240V190', 'M150 322V190', 'M250 322V285Q250 265 225 265H175Q150 265 150 240V190']

/** A responsive, labeled diagram; connections draw once, without implying live account access. */
export function ConnectedApps() {
  const reduced = useReducedMotion()
  return <figure className={styles.figure} aria-label="Eigi Computer connects with Gmail, Slack, Notion, WhatsApp, Telegram, and your browser.">
    <motion.div className={styles.diagram} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .3 }}>
      <div className={styles.halo} aria-hidden="true" />
      {[{ paths: DESKTOP_PATHS, viewBox: '0 0 880 360', className: styles.desktopLines }, { paths: MOBILE_PATHS, viewBox: '0 0 300 380', className: styles.mobileLines }].map(({ paths, viewBox, className }) => <svg key={viewBox} className={`${styles.lines} ${className}`} viewBox={viewBox} preserveAspectRatio="none" fill="none" aria-hidden="true">{paths.map((d, index) => <g key={d}><path d={d} stroke="#e1e8e2" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><motion.path d={d} stroke="#8fac98" strokeWidth="1.5" vectorEffect="non-scaling-stroke" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: reduced ? 0 : 1.2, delay: reduced ? 0 : index * .1 } } }} /></g>)}</svg>)}
      {APPS.map(({ name, detail, icon }, index) => <motion.div key={name} className={`${styles.app} ${styles[icon]}`} variants={{ hidden: { opacity: 0, scale: .9 }, visible: { opacity: 1, scale: 1, transition: { duration: reduced ? 0 : .45, delay: reduced ? 0 : index * .08 } } }}><span className={styles.appIcon}><AppIcon name={icon} /></span><div><strong>{name}</strong><span className={styles.detail}>{detail}</span></div><span className={styles.port} aria-hidden="true" /></motion.div>)}
      <div className={styles.hub}><div className={styles.device}><img src="/favicon.jpg" alt="" width="76" height="76" /><span className={styles.indicator} aria-hidden="true" /></div><strong>Eigi Computer</strong><span>Your work, connected.</span></div>
    </motion.div>
    <figcaption><strong>Connect your tools.</strong> If an app has no connector, your Eigi can use its website.</figcaption>
  </figure>
}
