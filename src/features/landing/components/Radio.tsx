import { useEffect, useRef, useState } from 'react'
import { AMIT_DISPLAY, AMIT_TEL, messageFor, whatsappLink } from '../utils/amit.ts'
import { readStage } from '../utils/climb.ts'
import styles from './Radio.module.css'

type Call = { message: string; link: string }

/** All data-amit actions open the same native dialog; nothing is sent until WhatsApp confirms it. */
export function Radio() {
  const [call, setCall] = useState<Call | null>(null)
  const [qr, setQr] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('[data-amit]')) return
      const message = messageFor(readStage(), '')
      setQr('')
      setCall({ message, link: whatsappLink(message) })
      dialogRef.current?.showModal()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!call) return
    let live = true
    import('qrcode')
      .then(({ toString }) => toString(call.link, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#1d1d1f', light: '#ffffff' } }))
      .then((svg) => { if (live) setQr(svg) })
      .catch(() => { if (live) setQr('') })
    return () => { live = false }
  }, [call])

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="contact-title" onClose={() => setCall(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}>
      <div className={styles.card}>
        <button type="button" className={styles.close} aria-label="Close conversation options" onClick={() => dialogRef.current?.close()}>×</button>
        <p className="eyebrow">Talk to Amit</p>
        <h2 id="contact-title">Tell us about<br />your first job.</h2>
        <p className={styles.who}>Amit is our AI onboarding guide. He asks about your business, then introduces you to the team.</p>
        {call && <>
          <div className={styles.message}><p>Your first message</p><blockquote>{call.message.split('\n\nref:')[0]}</blockquote><small>Page context included: {call.message.split('\n\nref: ')[1]}</small></div>
          <a className="btn" href={call.link} target="_blank" rel="noopener noreferrer">Continue on WhatsApp <span aria-hidden="true">↗</span></a>
          <a className={styles.phone} href={AMIT_TEL}>Or call Amit at {AMIT_DISPLAY}</a>
          {qr && <div className={styles.scan}><div className={styles.qr} role="img" aria-label="QR code to open this conversation on WhatsApp" dangerouslySetInnerHTML={{ __html: qr }} /><p>Scan to open this conversation<br />on your phone.</p></div>}
          <p className={styles.direct}>Prefer a person? <a href="mailto:buddy@eigi.ai">Email the team.</a></p>
        </>}
      </div>
    </dialog>
  )
}
