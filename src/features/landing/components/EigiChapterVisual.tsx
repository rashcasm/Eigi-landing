import { useState } from 'react'
import { EIGI_CAPABILITIES as copy } from '../utils/eigi-capabilities.ts'
import styles from './MeetYourEigi.module.css'

type Props = { chapter: number }

export function EigiChapterVisual({ chapter }: Props) {
  const [approval, setApproval] = useState<'waiting' | 'editing' | 'saved' | 'approved'>('waiting')
  const [draft, setDraft] = useState<string>(copy.draft)
  return <div className={styles.visual} data-chapter={chapter}>
    <div className={styles.windowBar}><span className={styles.windowDots} aria-hidden="true">● ● ●</span><span>{chapter === 1 ? copy.computerTitle : 'Your Eigi'}</span><span className={styles.example}>{copy.exampleLabel}</span></div>
    <div className={styles.visualBody} key={chapter}>
      {chapter === 0 && <div className={styles.chatScene}>
        <div className={styles.channels}>{copy.channels.map(channel => <span key={channel}>{channel}</span>)}</div>
        <p className={styles.you}>You</p>
        <p className={styles.bubble}>{copy.request}</p>
        <div className={styles.chatDivider}><span>e.</span><p>One message.<br /><strong>A clear starting point.</strong></p></div>
        <div className={styles.chatComposer} aria-hidden="true">Message your Eigi <span>↑</span></div>
      </div>}
      {chapter === 1 && <div className={styles.computerScene}>
        <div className={styles.tabs}>{copy.tabs.map((tab, index) => <span data-active={index === 1} key={tab}>{tab}</span>)}</div>
        <div className={styles.sheetTitle}><strong>Austin · dental clinics</strong><span>20 matches</span></div>
        <div className={styles.sheet} tabIndex={0} role="region" aria-label="Example sheet of 20 clinic matches">
          <table><thead><tr><th scope="col">#</th><th scope="col">Clinic</th><th scope="col">Online booking</th><th scope="col">Intro</th></tr></thead><tbody>{Array.from({ length: 20 }, (_, i) => <tr key={i} style={{ animationDelay: `${i * 60}ms` }}><td>{i + 1}</td><td>Clinic {String(i + 1).padStart(2, '0')}</td><td>Not found</td><td>Drafted <span aria-hidden="true">✓</span></td></tr>)}</tbody></table>
        </div>
        <ol className={styles.activity}>{copy.log.map(step => <li key={step}><span aria-hidden="true">✓</span>{step}</li>)}</ol>
      </div>}
      {chapter === 2 && <div className={styles.memoryScene}>
        <div className={styles.memoryHeading}><span aria-hidden="true">≡</span><div><p>Business memory</p><strong>The way you work.</strong></div></div>
        {copy.memories.map((memory, i) => <div key={memory} className={styles.memoryNote}><small>0{i + 1}</small><p>{memory}</p><span aria-hidden="true">✓</span></div>)}
      </div>}
      {chapter === 3 && <div className={styles.approvalScene}>
        <span className={styles.reviewLabel}>Your review</span>
        <h4>{copy.approval}</h4>
        <p className={styles.draftCount}>20 drafts · Ready for your review</p>
        {approval === 'editing' ? <form className={styles.editForm} onSubmit={event => { event.preventDefault(); setApproval('saved') }}>
          <label>Example intro<textarea value={draft} onChange={event => setDraft(event.target.value)} maxLength={400} rows={4} /></label>
          <button type="submit" className={styles.approve} disabled={!draft.trim()}>Save example draft</button>
          <button type="button" onClick={() => setApproval('waiting')}>Cancel</button>
        </form> : <>
          {approval === 'saved' && <blockquote className={styles.savedDraft}>{draft}</blockquote>}
          <div className={styles.approvalActions}><button type="button" className={styles.approve} onClick={() => setApproval('approved')} disabled={approval === 'approved'}>{approval === 'approved' ? 'Approved ✓' : 'Approve'}</button><button type="button" onClick={() => setApproval('editing')}>Edit first</button></div>
        </>}
        <p className={styles.approvalStatus} role="status">{approval === 'approved' ? 'Example approved. No emails were sent.' : approval === 'saved' ? 'Example draft saved. Still waiting for your approval.' : 'Try the example. Nothing will be sent.'}</p>
        <div className={styles.approvalLog}><p>Activity log</p><ol className={styles.activity}>{copy.approvalLog.map(step => <li key={step}><span aria-hidden="true">✓</span>{step}</li>)}<li><span aria-hidden="true">{approval === 'approved' ? '✓' : '○'}</span>{approval === 'approved' ? 'Example approval recorded' : copy.waiting}</li></ol></div>
      </div>}
    </div>
    <div className={styles.visualFooter}><span>0{chapter + 1} / 04</span><span>{copy.captions[chapter]}</span></div>
  </div>
}
