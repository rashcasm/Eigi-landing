import { heroOnboardingLink } from '../utils/hero-demo.ts'
import { whatsappLink } from '../utils/amit.ts'
import styles from './Stories.module.css'

export function Stories() {
  return (
    <section id="stories" className={styles.stories} data-stage="Business stories" aria-labelledby="stories-title">
      <div className={styles.heading}>
        <div><p className="eyebrow">Field notes</p><h2 id="stories-title">A business to run. <em>Someone to help.</em></h2></div>
        <p>Eigi at work right now: inside a founder’s company, and for a community in Khundia, India.</p>
      </div>
      <div className={styles.realStories}>
        <article className={styles.business}>
          <p className={styles.category}><span>Log 01 · Financial learning</span><span>Ongoing</span></p>
          <h3>One founder.<br />A lot happening behind the app.</h3>
          <p>For a financial learning business, we’re connecting the work its founder used to manage across separate systems: customer support, Discord bots, and day-to-day operations.</p>
          <p>We’re also building voice and video agents for mock interviews, alongside automation for supply-chain and warehouse processes.</p>
          <div className={styles.workList}><span>Customer support</span><span>Discord bots</span><span>Mock interviews</span><span>Business operations</span></div>
          <a href={heroOnboardingLink('I run a business and want help connecting customer support and day-to-day operations.')} target="_blank" rel="noopener noreferrer">Talk about my business <span aria-hidden="true">↗</span></a>
          <small>Ongoing client work with Eigi engineers. Client name withheld.</small>
        </article>
        <article className={styles.community}>
          <p className={styles.category}><span>Log 02 · Khundia, India</span><span>Live on WhatsApp</span></p>
          <h3>Meet Amit.<br />Already helping in Khundia.</h3>
          <p>People in Khundia turn to Amit on WhatsApp for help with everyday work, from filing applications to finding information about loans.</p>
          <p>Amit is also the first Eigi you’ll meet here. Tell him about your business and the job you’d like help with.</p>
          <div className={styles.message}><span>A conversation can start with</span><p>“I have an application to fill in. Can you help me work through it?”</p></div>
          <a href={whatsappLink('Hi Amit, I’d like to learn how Eigi can help with my everyday work.\n\nref: khundia-story')} target="_blank" rel="noopener noreferrer">Meet Amit on WhatsApp <span aria-hidden="true">↗</span></a>
          <small>Community work in Khundia. Message shown is illustrative.</small>
        </article>
      </div>
    </section>
  )
}
