import { useEffect, useRef, useState } from 'react'
import { STUDIO_URL } from '../../../components/layout/Nav.tsx'
import { EIGI_CAPABILITIES as copy } from '../utils/eigi-capabilities.ts'
import { EigiChapterVisual } from './EigiChapterVisual.tsx'
import styles from './MeetYourEigi.module.css'

export function MeetYourEigi() {
  const [active, setActive] = useState(0)
  const chaptersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chapters = chaptersRef.current?.querySelectorAll<HTMLElement>('[data-chapter-text]')
    if (!chapters) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapterText))
      }
    }, { rootMargin: '-25% 0px -45% 0px', threshold: 0 })
    chapters.forEach(chapter => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  return <section id="meet-your-eigi" className={styles.section} aria-labelledby="meet-eigi-title" data-stage="Meet your Eigi">
    <header className={styles.heading}><p className="eyebrow">{copy.eyebrow}</p><h2 id="meet-eigi-title">{copy.headline}</h2><p className="lead">{copy.description}</p></header>
    <div className={styles.walkthrough}>
      <div className={styles.chapters} ref={chaptersRef}>{copy.chapters.map((chapter, index) => <div className={styles.chapter} key={chapter.id} data-chapter-text={index} data-active={active === index}>
        <div className={styles.chapterText}><span className={styles.chapterNumber}>0{index + 1}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></div>
        <div className={styles.mobileVisual}><EigiChapterVisual chapter={index} /></div>
      </div>)}</div>
      <div className={styles.desktopVisual}><EigiChapterVisual key={active} chapter={active} /></div>
    </div>
    <div className={styles.bridge}><div><p className="eyebrow">With you, from day one</p><h3>{copy.bridge.title}</h3><p>{copy.bridge.description}</p></div><div className={styles.bridgeLinks}><a className="btn" href="#route">Meet your sherpa <span aria-hidden="true">↗</span></a><a className="text-link" href={STUDIO_URL}>Open Eigi Studio ↗</a></div></div>
  </section>
}
