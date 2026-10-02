import { useRef } from 'react'
import styles from './Nav.module.css'

export const DOCS_URL = 'https://docs.eigi.ai/'
export const STUDIO_URL = 'https://studio.eigi.ai/'

type NavProps = { links: readonly { href: `#${string}`; label: string }[] }

export function Nav({ links }: NavProps) {
  const menuRef = useRef<HTMLDetailsElement>(null)
  const close = () => { if (menuRef.current) menuRef.current.open = false }

  return (
    <header className={styles.nav}>
      <a href="#top" className={styles.logo} aria-label="Eigi, back to top" onClick={close} />
      <nav className={styles.desktop} aria-label="Main navigation">
        {links.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className={styles.actions}>
        <button type="button" className={styles.start} data-amit onClick={close}>Let’s talk <span aria-hidden="true">↗</span></button>
        <details ref={menuRef} className={styles.mobile} onKeyDown={(e) => {
          if (e.key === 'Escape') {
            close()
            menuRef.current?.querySelector('summary')?.focus()
          }
        }}>
          <summary aria-label="Navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {links.map(({ href, label }) => <a key={href} href={href} onClick={close}>{label}</a>)}
            <a href={DOCS_URL}>Documentation <span aria-hidden="true">↗</span></a>
          </nav>
        </details>
      </div>
    </header>
  )
}
