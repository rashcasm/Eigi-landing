import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { easeOut } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { AMIT_DISPLAY, AMIT_TEL, messageFor, whatsappLink } from '../utils/amit.ts'
import { readAltitude, readStage } from '../utils/climb.ts'
import styles from './Radio.module.css'

type Call = { message: string; link: string }

/**
 * "Radio base camp": the one way in. Amit, Eigi's AI onboarding agent, takes it from here on WhatsApp
 * or a phone call: no forms, no sign-up. Opening it reads where you are on the climb and pre-writes your
 * first message from that. Desktop gets a QR code (WhatsApp lives on the phone); phones get a straight button.
 * Besides its own badge, any element marked `data-amit` (the page's CTAs) opens it.
 */
export function Radio() {
  const [call, setCall] = useState<Call | null>(null)
  const [qr, setQr] = useState('')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const goRef = useRef<HTMLAnchorElement>(null)
  const cardId = useId()
  const open = call !== null

  const start = () => {
    const message = messageFor(readStage(), readAltitude())
    setCall({ message, link: whatsappLink(message) })
  }
  const toggle = () => (open ? setCall(null) : start())

  // the page's CTAs carry data-amit; one listener here means they need no wiring of their own
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest('[data-amit]')) start()
    }
    addEventListener('click', onClick)
    return () => removeEventListener('click', onClick)
  }, [])

  // opening moves focus into the card, so keyboard users land on the first way to reach Amit
  useEffect(() => {
    if (call) goRef.current?.focus({ preventScroll: true })
  }, [call])

  // the QR library only loads once someone actually opens the radio
  useEffect(() => {
    if (!call) return
    let live = true
    import('qrcode')
      .then(({ toString }) => toString(call.link, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#000', light: '#fff' } }))
      .then((svg) => { if (live) setQr(svg) })
      .catch(() => { if (live) setQr('') })
    return () => { live = false }
  }, [call])

  // Escape or a click elsewhere closes it
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setCall(null)
      buttonRef.current?.focus()
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element
      if (!cardRef.current?.contains(t) && !buttonRef.current?.contains(t) && !t.closest('[data-amit]')) setCall(null)
    }
    addEventListener('keydown', onKey)
    addEventListener('pointerdown', onDown)
    return () => { removeEventListener('keydown', onKey); removeEventListener('pointerdown', onDown) }
  }, [open])

  return (
    <div className={styles.radio}>
      <AnimatePresence>
        {call && (
          <motion.div
            ref={cardRef}
            id={cardId}
            className={styles.card}
            role="dialog"
            aria-label="Talk to Amit, Eigi’s onboarding agent"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <p className={cx(styles.kicker, 'mono')}><span className={styles.live} /> Radio base camp</p>
            <h3>Amit is on the line.</h3>
            <p className={styles.who}>
              Eigi’s AI onboarding agent. A few questions on WhatsApp or a call, then he hands you to a sherpa.
            </p>

            <figure className={styles.bubble}>
              <figcaption className="mono">Your first message, ready to send</figcaption>
              <p>{call.message.split('\n\nref:')[0]}</p>
              {/* the ref line is sent too, so show it and say why it is there */}
              <p className={cx(styles.ref, 'mono')}>ref: {call.message.split('\n\nref: ')[1]} · tells Amit which part of the page you came from</p>
            </figure>

            <div className={styles.scan}>
              <div className={styles.qr} aria-hidden={!qr} dangerouslySetInnerHTML={{ __html: qr }} />
              <p className="mono">Scan with your phone<br />to radio Amit</p>
            </div>

            <a ref={goRef} className={cx('btn', styles.go)} href={call.link} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp <span aria-hidden="true">→</span>
            </a>
            <a className={styles.call} href={AMIT_TEL}>Prefer to talk? Call Amit</a>
            <p className={cx(styles.number, 'mono')}>{AMIT_DISPLAY} · WhatsApp or call</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        className={cx(styles.badge, open && styles.on)}
        aria-expanded={open}
        aria-controls={open ? cardId : undefined}
        onClick={toggle}
      >
        <svg className={styles.signal} viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="13" r="1.6" />
          <path d="M6.6 9.6a4.8 4.8 0 0 1 6.8 0" />
          <path d="M4 7a8.5 8.5 0 0 1 12 0" />
        </svg>
        <span className={styles.badgeText}>
          <span className="mono">Get started</span>
          <span><i className={styles.live} /> Talk to Amit</span>
        </span>
      </button>
    </div>
  )
}
