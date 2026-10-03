import { useEffect, useRef } from 'react'
import styles from './Nav.module.css'

export const DOCS_URL = 'https://docs.eigi.ai/'
export const STUDIO_URL = 'https://studio.eigi.ai/'
export const COMPUTER_URL = '/computer/'

type NavProps = { links: readonly { href: string; label: string }[]; computer?: boolean }

export function Nav({ links, computer = false }: NavProps) {
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDetailsElement>(null)
  const productRef = useRef<HTMLDetailsElement>(null)
  const close = () => {
    if (menuRef.current) menuRef.current.open = false
    if (productRef.current) productRef.current.open = false
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
        const open = productRef.current?.open ? productRef.current : menuRef.current
        close()
        open?.querySelector('summary')?.focus()
      }
    }}>
      <a href={computer ? '/' : '#top'} className={styles.logo} aria-label={computer ? 'Eigi home' : 'Eigi, back to top'} onClick={close} />
      <nav className={styles.desktop} aria-label="Main navigation">
        {links.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
        <details ref={productRef} className={styles.product}>
          <summary>Product <span aria-hidden="true">⌄</span></summary>
          <div className={styles.productMenu}>
            <a href={COMPUTER_URL} aria-current={computer ? 'page' : undefined} onClick={close}>
              <img className={styles.productIcon} src="/favicon.jpg" alt="" width="40" height="40" />
              <span><strong>Eigi Computer</strong><small>An AI executive team for lean founding teams.</small></span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href={DOCS_URL} onClick={close}>Explore the documentation <span aria-hidden="true">↗</span></a>
          </div>
        </details>
      </nav>
      <div className={styles.actions}>
        <button type="button" className={styles.talk} data-amit onClick={close}>Let’s talk</button>
        <a href={STUDIO_URL} className={styles.start}>Go to Studio <span aria-hidden="true">↗</span></a>
        <details ref={menuRef} className={styles.mobile}>
          <summary aria-label="Navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {links.map(({ href, label }) => <a key={href} href={href} onClick={close}>{label}</a>)}
            <span className={styles.productLabel}>Product</span>
            <a href={COMPUTER_URL} aria-current={computer ? 'page' : undefined} onClick={close}>Eigi Computer <span aria-hidden="true">↗</span></a>
            <a href={DOCS_URL}>Documentation <span aria-hidden="true">↗</span></a>
            <button type="button" data-amit onClick={close}>Let’s talk <span aria-hidden="true">↗</span></button>
          </nav>
        </details>
      </div>
    </header>
  )
}
