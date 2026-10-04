import { Crowd } from '../../features/landing/components/Crowd.tsx'
import { AMIT_DISPLAY, AMIT_TEL } from '../../features/landing/utils/amit.ts'
import { COMPUTER_URL, DOCS_URL, STUDIO_URL } from './Nav.tsx'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

const QUESTIONS = [
  { question: 'Do I need to be technical?', answer: 'No. You bring how your business actually works. Your sherpa brings the engineering, helps you choose what to hand over first, and shows your team how to work with it.' },
  { question: 'Is Eigi another AI tool to manage?', answer: 'No. An Eigi is a teammate you give work to, not a dashboard to babysit. It works in the tools you already use, remembers your business, and brings decisions back to you.' },
  { question: 'What can my Eigi do without asking?', answer: 'Only what you allow. Anything with your name or money on it waits for your approval, and every step is logged so you can see what happened.' },
  { question: 'Can we start with just one workflow?', answer: 'Yes. One useful workflow is the best way to learn what works for your team before taking on more. We agree on the scope and what success looks like together.' },
  { question: 'What happens after the first conversation?', answer: 'Amit, our AI onboarding guide, gathers some context about your business and connects you with the team. We discuss the opportunity, scope, and pricing before any work begins. You can also email us directly.' },
]

const COMPUTER_QUESTIONS = [
  { question: 'Can I hire an Eigi on its own?', answer: 'Yes. Hire your AI team in Studio and give them their first job. If you want help wiring them into your business, Eigi’s engineers can work alongside you.' },
  { question: 'Can my co-founders use it too?', answer: 'Yes. Everyone on the founding team can brief the same AI team and works from one shared memory of the business, within the access you set.' },
  { question: 'Where do we talk to them?', answer: 'Wherever you already are. Message them in Slack or Teams, forward them emails, or call them from Claude or ChatGPT. They do the work in your browser.' },
  { question: 'What does “call them from Claude or ChatGPT” mean?', answer: 'You can bring your AI team into a Claude or ChatGPT conversation. They use what they know about your business and do the work without you switching apps. It isn’t a phone or voice call.' },
  { question: 'How is this different from using ChatGPT?', answer: 'Your Eigis remember your business and do work in the browser. You choose which actions need approval, and you can check the record of what they did. Eigi engineers can help connect them to your business processes.' },
]

/** Questions, then the dark close: one last ask, and the crowd still carrying everything at base camp. */
export function Footer({ computer = false }: { computer?: boolean }) {
  return <>
    <section id="questions" className={styles.faq} aria-labelledby="questions-title">
      <div><p className="eyebrow">Before you start</p><h2 id="questions-title">Good questions.</h2></div>
      <div className={styles.questions}>{(computer ? COMPUTER_QUESTIONS : QUESTIONS).map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>
    <footer id="contact" className={`dark ${styles.footer}`} data-stage="Let’s talk">
      <div className={styles.contact}>
        <div>
          <p className="eyebrow">{computer ? 'Build at AI pace.' : 'Your next chapter starts here.'}</p>
          <h2>{computer ? <>Stay lean.<br /> <em>Hire the rest.</em></> : <>Keep the ambition.<br /> <em>Lose the busywork.</em></>}</h2>
          <p className="lead">{computer ? 'Set up your AI team in Studio, then hand them the first job. Eigi’s engineers can help you set it up.' : 'Tell Amit what’s taking up your week. He’ll find the first job we can take off your plate, then introduce you to your sherpa.'}</p>
          <div className={styles.actions}>
            {computer ? <a className="btn" href={STUDIO_URL}>Go to Studio <span aria-hidden="true">↗</span></a> : <a className="btn" href="#talk">Talk to Amit <span aria-hidden="true">↑</span></a>}
            <button type="button" className="text-link" data-amit>Message on WhatsApp</button>
          </div>
        </div>
        <dl className={styles.details}>
          <div><dt>Email the team</dt><dd><a href="mailto:buddy@eigi.ai">buddy@eigi.ai</a></dd></div>
          <div><dt>Call Amit, our AI guide</dt><dd><a href={AMIT_TEL}>{AMIT_DISPLAY}</a></dd></div>
          <div><dt>Call the team</dt><dd><a href="tel:+919823172692">+91 98231 72692</a></dd></div>
        </dl>
      </div>
      <div className={styles.bottom}>
        <div className={styles.brandRow}><a className={styles.logo} href="#top" aria-label="Eigi, back to top" /><p>Good people. Powerful AI. Your business, moving forward.</p></div>
        <div className={styles.linksRow}><span>© {YEAR} Eigi AI</span><nav aria-label="Footer"><a href={COMPUTER_URL}>Meet your Eigi</a><a href={DOCS_URL}>Documentation</a><a href={STUDIO_URL}>Studio</a><a href="https://eigi.ai/privacy-policy">Privacy</a><a href="https://eigi.ai/terms-of-service">Terms</a><a href="https://eigi.ai/data-deletion">Data deletion</a></nav></div>
      </div>
      <div className={styles.band}>
        <p className={styles.line}>They’re still carrying everything themselves. <em>You don’t have to.</em></p>
        <div className={styles.crowd}><Crowd /></div>
        <p className={styles.credit}>Crowd adapted from Skiper UI. Illustrations by Open Peeps.</p>
      </div>
    </footer>
  </>
}
