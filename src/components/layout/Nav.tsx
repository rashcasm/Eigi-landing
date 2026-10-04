import { useEffect, useRef } from 'react'
import styles from './Nav.module.css'

export const DOCS_URL = 'https://docs.eigi.ai/'
export const STUDIO_URL = 'https://studio.eigi.ai/'
export const COMPUTER_URL = '/computer/'

type NavProps = { links: readonly { href: string; label: string }[]; computer?: boolean }

export function Nav({ links, computer = false }: NavProps) {
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDetailsElement>(null)
  const close = () => {
    if (menuRef.current) menuRef.current.open = false
  }

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) close()
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [])

  return (
    <header ref={headerRef} className={styles.nav} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) close()
    }} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        const open = menuRef.current
        close()
        open?.querySelector('summary')?.focus()
      }
    }}>
      <a href={computer ? '/' : '#top'} className={styles.logo} aria-label={computer ? 'Eigi home' : 'Eigi, back to top'} onClick={close} />
      <nav className={styles.desktop} aria-label="Main navigation">
        {computer && <a href={COMPUTER_URL} aria-current="page">Meet your Eigi</a>}
        {links.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className={styles.actions}>
        {computer
          ? <><button type="button" className={styles.talk} data-amit onClick={close}>Let’s talk</button><a href={STUDIO_URL} className={styles.start}>Go to Studio <span aria-hidden="true">↗</span></a></>
          : <><a href={STUDIO_URL} className={styles.talk}>Go to Studio <span aria-hidden="true">↗</span></a><a href="#talk" className={styles.start} onClick={close}>Talk to Amit</a></>}
        <details ref={menuRef} className={styles.mobile}>
          <summary aria-label="Navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {links.map(({ href, label }) => <a key={href} href={href} onClick={close}>{label}</a>)}
            <a href={computer ? '/' : COMPUTER_URL} onClick={close}>{computer ? 'Eigi home' : 'Meet your Eigi'} <span aria-hidden="true">↗</span></a>
            <a href={DOCS_URL}>Documentation <span aria-hidden="true">↗</span></a>
            <a href={STUDIO_URL}>Studio <span aria-hidden="true">↗</span></a>
          </nav>
        </details>
      </div>
    </header>
  )
}
