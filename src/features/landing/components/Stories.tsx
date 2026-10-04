import { heroOnboardingLink } from '../utils/hero-demo.ts'
import { whatsappLink } from '../utils/amit.ts'
import styles from './Stories.module.css'

const JOB_IDEAS = [
  { business: 'Agency', task: 'Follow up after a client call', detail: 'Turn the call notes into a follow-up and a list of next steps.' },
  { business: 'Online shop', task: 'Find a missing order', detail: 'Check the order history and prepare a useful customer reply.' },
  { business: 'Consultancy', task: 'Get the weekly update ready', detail: 'Pull project notes into a client update you can review.' },
  { business: 'Warehouse', task: 'Check a stock discrepancy', detail: 'Compare stock records and flag the quantities that differ.' },
  { business: 'Distributor', task: 'Chase a supplier update', detail: 'Read the purchase order and draft a request for the delivery date.' },
  { business: 'Learning business', task: 'Answer repeat questions', detail: 'Use your course material to draft answers for learners.' },
  { business: 'Community', task: 'Catch up on Discord', detail: 'Gather unanswered questions and flag the ones that need you.' },
  { business: 'Coaching business', task: 'Prepare a mock interview', detail: 'Build a practice brief around the role and the learner’s experience.' },
  { business: 'Sales team', task: 'Keep the CRM current', detail: 'Turn meeting notes into deal updates, ready for your approval.' },
  { business: 'Studio', task: 'Check a supplier invoice', detail: 'Compare the invoice with the purchase order before you pay.' },
  { business: 'Service business', task: 'Turn a brief into a proposal', detail: 'Use your scope and pricing notes to prepare a first draft.' },
  { business: 'Founding team', task: 'Prepare for the morning', detail: 'Review the inbox and calendar, then list what needs a decision.' },
] as const

export function Stories() {
  return (
    <section id="stories" className={styles.stories} data-stage="Business stories" aria-labelledby="stories-title">
      <div className={styles.heading}>
        <div><p className="eyebrow">Eigi at work</p><h2 id="stories-title">A business to run.<br />Someone to help.</h2></div>
        <p>From a founder’s customer support<br />to everyday paperwork in Khundia.</p>
      </div>
      <div className={styles.realStories}>
        <article className={styles.business}>
          <p className={styles.category}>Business story / Financial learning</p>
          <h3>One founder.<br />A lot happening behind the app.</h3>
          <p>For a financial learning business, we’re connecting the work its founder used to manage across separate systems: customer support, Discord bots, and day-to-day operations.</p>
          <p>We’re also building voice and video agents for mock interviews, alongside automation for supply-chain and warehouse processes.</p>
          <div className={styles.workList}><span>Customer support</span><span>Discord bots</span><span>Mock interviews</span><span>Business operations</span></div>
          <a href={heroOnboardingLink('I run a business and want help connecting customer support and day-to-day operations.')} target="_blank" rel="noopener noreferrer">Talk about my business <span aria-hidden="true">↗</span></a>
          <small>Ongoing client work with Eigi engineers. Client name withheld.</small>
        </article>
        <article className={styles.community}>
          <p className={styles.category}>Community story / Khundia</p>
          <h3>Meet Amit.<br />Already helping in Khundia.</h3>
          <p>People in Khundia turn to Amit on WhatsApp for help with everyday work, from filing applications to finding information about loans.</p>
          <p>Amit is also the first Eigi you’ll meet here. Tell him about your business and the job you’d like help with.</p>
          <div className={styles.message}><span>A conversation can start with</span><p>“I have an application to fill in. Can you help me work through it?”</p></div>
          <a href={whatsappLink('Hi Amit, I’d like to learn how Eigi can help with my everyday work.\n\nref: khundia-story')} target="_blank" rel="noopener noreferrer">Meet Amit on WhatsApp <span aria-hidden="true">↗</span></a>
          <small>Community work in Khundia. Message shown is illustrative.</small>
        </article>
      </div>
      <details className={styles.ideas}>
        <summary><span>What would you hand to an Eigi?<small>12 job ideas for your business. Illustrative examples.</small></span><span className={styles.expand} aria-hidden="true">+</span></summary>
        <div className={styles.ideaGrid}>{JOB_IDEAS.map(({ business, task, detail }) => <article key={task}><p>{business}</p><h3>{task}</h3><p>{detail}</p><a href={heroOnboardingLink(task)} target="_blank" rel="noopener noreferrer">Start with this job <span aria-hidden="true">↗</span></a></article>)}</div>
      </details>
    </section>
  )
}
