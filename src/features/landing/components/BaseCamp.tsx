import { useRef, useState } from 'react'
import sherpa from '../../../assets/mascot/eigi-sherpa.png'
import styles from './BaseCamp.module.css'

type IconName = 'shop' | 'service' | 'person' | 'mail' | 'document' | 'calendar' | 'box' | 'check' | 'arrow'

function Icon({ name, className }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    shop: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10c0 3 4 3 4 0 0 3 5 3 5 0 0 3 5 3 5 0 0 3 4 3 4 0M9 20v-6h6v6" /></>,
    service: <><rect x="4" y="7" width="16" height="13" rx="3" /><path d="M8 7V4h8v3M4 12c5 3 11 3 16 0M10 13v3h4v-3" /></>,
    person: <><circle cx="12" cy="7" r="3" /><path d="M5 20v-2a7 7 0 0 1 14 0v2M9 16l3 3 3-3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
    document: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4M17 3v4M3 11h18m-13 5 3 3 5-5" /></>,
    box: <><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Z" /><path d="m3 8 9 5 9-5M12 13v9M7 5.8l9 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  }
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

type Workflow = {
  label: string; icon: IconName; title: string; source: string; sourceNote: string;
  action: string; outcome: string; outcomeNote: string; help: string
}
type Business = { label: string; short: string; icon: IconName; workflows: Workflow[] }

const BUSINESSES: Business[] = [
  {
    label: 'I sell a service', short: 'Your service business', icon: 'service', workflows: [
      { label: 'Following up with leads', icon: 'mail', title: 'Keep the next conversation moving.', source: 'A new enquiry', sourceNote: 'In the inbox you already use', action: 'Eigi prepares the follow-up', outcome: 'A reply to review', outcomeNote: 'In your voice. With your OK.', help: 'Your sherpa connects your inbox, learns your sales process, and checks the first replies with you.' },
      { label: 'Scheduling clients', icon: 'calendar', title: 'Make booking the easy part.', source: 'A booking request', sourceNote: 'From a new or returning client', action: 'Eigi checks the options', outcome: 'A time to confirm', outcomeNote: 'Around your availability', help: 'Your sherpa connects your calendar, sets your booking rules, and helps you handle the exceptions.' },
      { label: 'Keeping clients updated', icon: 'document', title: 'Keep clients in the loop.', source: 'Your project notes', sourceNote: 'Across your existing tools', action: 'Eigi brings the update together', outcome: 'An update to review', outcomeNote: 'Ready for your client', help: 'Your sherpa connects the project tools you use and helps Eigi learn what each client needs to know.' },
    ],
  },
  {
    label: 'I sell products', short: 'Your product business', icon: 'shop', workflows: [
      { label: 'Customer questions', icon: 'mail', title: 'Give customers a useful answer.', source: '“Where’s my order?”', sourceNote: 'A customer gets in touch', action: 'Eigi checks the order', outcome: 'A reply to review', outcomeNote: 'With the right order details', help: 'Your sherpa connects your orders and support inbox, teaches Eigi your policies, and tests the handoff with you.' },
      { label: 'Keeping track of stock', icon: 'box', title: 'Know what needs restocking.', source: 'Your stock records', sourceNote: 'The sheet or system you use', action: 'Eigi checks stock levels', outcome: 'A restock shortlist', outcomeNote: 'You choose what to order', help: 'Your sherpa connects your inventory, sets your stock rules, and checks the first reports with you.' },
      { label: 'Supplier paperwork', icon: 'document', title: 'Catch the details before you pay.', source: 'A supplier invoice', sourceNote: 'Alongside your purchase order', action: 'Eigi compares the details', outcome: 'Mismatches flagged', outcomeNote: 'Payment stays with you', help: 'Your sherpa connects your documents and shows Eigi what to check before an invoice reaches you.' },
    ],
  },
  {
    label: 'I work for myself', short: 'Your solo business', icon: 'person', workflows: [
      { label: 'An overflowing inbox', icon: 'mail', title: 'Start with what needs you.', source: 'Your busy inbox', sourceNote: 'Clients, questions, follow-ups', action: 'Eigi sorts what needs attention', outcome: 'A clearer starting point', outcomeNote: 'The decisions stay with you', help: 'Your sherpa learns what matters to your business and helps you build an inbox routine around it.' },
      { label: 'Writing proposals', icon: 'document', title: 'Get the first draft off your plate.', source: 'A client brief', sourceNote: 'Plus your services and pricing', action: 'Eigi prepares a first draft', outcome: 'A proposal to review', outcomeNote: 'Your judgment. Your final say.', help: 'Your sherpa brings your past proposals and pricing together, then helps Eigi learn how you work.' },
      { label: 'Staying on top of admin', icon: 'calendar', title: 'Give your day a starting point.', source: 'Your notes and calendar', sourceNote: 'The work you’re juggling', action: 'Eigi gathers the loose ends', outcome: 'A plan to work from', outcomeNote: 'With space for your decisions', help: 'Your sherpa connects the tools you already use and helps you decide what to hand over first.' },
    ],
  },
]

/** Frontend-only, visitor-led introduction to the work of an Eigi sherpa. */
export function BaseCamp({ product = false }: { product?: boolean }) {
  const [businessIndex, setBusinessIndex] = useState<number | null>(null)
  const [workflowIndex, setWorkflowIndex] = useState<number | null>(null)
  const [attention, setAttention] = useState(0)
  const questionRef = useRef<HTMLHeadingElement>(null)
  const business = businessIndex === null ? null : BUSINESSES[businessIndex]
  const workflow = business && workflowIndex !== null ? business.workflows[workflowIndex] : null
  const stage = workflow ? 'result' : business ? 'work' : 'business'

  function chooseBusiness(index: number | null) {
    setBusinessIndex(index)
    setWorkflowIndex(null)
    setAttention(0)
    requestAnimationFrame(() => questionRef.current?.focus({ preventScroll: true }))
  }

  function chooseWorkflow(index: number) {
    setWorkflowIndex(index)
    setAttention(0)
    requestAnimationFrame(() => questionRef.current?.focus({ preventScroll: true }))
  }

  return (
    <section id="base-camp" className={styles.hero} data-stage="Meet your Eigi" aria-labelledby="hero-title">
      <div className={styles.intro}>
        <h1 id="hero-title">You don’t have to<br />figure AI out alone.</h1>
        <p>Your Eigi sherpa helps you put AI to work in your business.</p>
      </div>

      <div className={styles.experience} data-step={stage}>
        <div className={styles.scene}>
          {workflow && <div className={`${styles.workNode} ${styles.sourceNode}`}>
            <span className={styles.nodeIcon}><Icon name={workflow.icon} /></span>
            <strong>{workflow.source}</strong><span>{workflow.sourceNote}</span>
          </div>}
          {workflow && <svg className={styles.connections} viewBox="0 0 800 220" fill="none" aria-hidden="true"><path d="M175 120C245 120 260 165 325 165M475 165C540 165 555 120 625 120" /><path className={styles.connectionTrace} d="M175 120C245 120 260 165 325 165M475 165C540 165 555 120 625 120" /></svg>}
          <div className={styles.mascot} data-look={attention} key={stage}>
            <img src={sherpa} alt="Your Eigi sherpa: a little glowing red-panda face with two helping paws" width="720" height="480" fetchPriority="high" />
          </div>
          {workflow && <div className={`${styles.workNode} ${styles.resultNode}`}>
            <span className={`${styles.nodeIcon} ${styles.readyIcon}`}><Icon name="check" /></span>
            <strong>{workflow.outcome}</strong><span>{workflow.outcomeNote}</span>
          </div>}
          {workflow && <p className={styles.action}>{workflow.action}</p>}
        </div>

        <div className={styles.guide}>
          <div className={styles.breadcrumb}>
            {business ? <button type="button" onClick={() => chooseBusiness(null)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg>{business.short}</button> : <span>Meet your Eigi</span>}
            <span aria-label={workflow ? 'Your starting point' : `Step ${business ? 2 : 1} of 2`}>{workflow ? 'Your starting point' : `${business ? '2' : '1'} of 2`}</span>
          </div>
          <h2 ref={questionRef} tabIndex={-1} className={styles.question}>{workflow ? workflow.title : business ? 'What takes up too much of your day?' : 'First, what do you do?'}</h2>
          {workflow ? <div className={styles.resultContent}>
            <p>{workflow.help}</p>
            <div className={styles.resultActions}><button type="button" className={styles.primary} data-amit>Set this up with my sherpa <Icon name="arrow" /></button><button type="button" className={styles.tryAgain} onClick={() => chooseBusiness(businessIndex)}>Try another task</button></div>
          </div> : <div className={styles.choices} role="group" aria-label={business ? 'Choose the work you want help with' : 'Choose your kind of business'} onPointerLeave={() => setAttention(0)}>
            {(business ? business.workflows : BUSINESSES).map((choice, index) => <button type="button" key={choice.label} onPointerEnter={() => setAttention(index - 1)} onFocus={() => setAttention(index - 1)} onBlur={() => setAttention(0)} onClick={() => business ? chooseWorkflow(index) : chooseBusiness(index)}><Icon name={choice.icon} /><span>{choice.label}</span><Icon name="arrow" className={styles.choiceArrow} /></button>)}
          </div>}
        </div>
        <p className={styles.previewNote}>{workflow ? 'A starting-point example. We shape it around your business, together.' : 'Find a starting point in two taps.'}</p>
      </div>
      <a className={styles.more} href={product ? '#how-computer-works' : '#route'}>How our sherpas help<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 5v14m-5-5 5 5 5-5" /></svg></a>
    </section>
  )
}
