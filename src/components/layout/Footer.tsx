import { COMPUTER_URL, DOCS_URL, STUDIO_URL } from './Nav.tsx'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

const QUESTIONS = [
  { question: 'Do I need to be technical?', answer: 'No. We help you choose what to automate, connect your tools, and show your team how to use Eigi.' },
  { question: 'Is Eigi another AI tool to manage?', answer: 'An Eigi is an AI teammate you give work to. Your Eigis remember your business, work in the browser, and bring decisions back to you. Eigi engineers can help connect them to your tools and show your staff how to work with them.' },
  { question: 'Can we start with one workflow?', answer: 'Yes. We’ll agree on the scope and what success looks like, then test the workflow with your team before taking on more.' },
  { question: 'What happens after the first conversation?', answer: 'Amit, our AI onboarding guide, asks about your business and connects you with the team. We’ll discuss the work, scope, and pricing before any work begins. You can also email us directly.' },
]

const COMPUTER_QUESTIONS = [
  { question: 'Can I hire an Eigi on its own?', answer: 'Yes. Hire your AI team in Studio and give them their first job. If you want help wiring them into your business, Eigi’s engineers can work alongside you.' },
  { question: 'Can my co-founders use it too?', answer: 'Yes. Everyone on the founding team can brief the same AI team and works from one shared memory of the business, within the access you set.' },
  { question: 'Where do we talk to them?', answer: 'Wherever you already are. Message them in Slack or Teams, forward them emails, or call them from Claude or ChatGPT. They do the work in your browser.' },
  { question: 'What does “call them from Claude or ChatGPT” mean?', answer: 'You can bring your AI team into a Claude or ChatGPT conversation. They use what they know about your business and do the work without you switching apps. It isn’t a phone or voice call.' },
  { question: 'How is this different from using ChatGPT?', answer: 'Your Eigis remember your business and do work in the browser. You choose which actions need approval, and you can check the record of what they did. Eigi engineers can help connect them to your business processes.' },
]

export function Footer({ computer = false }: { computer?: boolean }) {
  return (
    <footer id="contact" className={styles.footer} data-stage="Let’s talk">
      <div className={styles.faq}>
        <div><p className="eyebrow">Before you start</p><h2>Common questions</h2></div>
        <div className={styles.questions}>{(computer ? COMPUTER_QUESTIONS : QUESTIONS).map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </div>
      <div className={styles.contact}>
        <p className="eyebrow">{computer ? 'Build at AI pace.' : 'Talk to Eigi'}</p>
        <h2>{computer ? <>Stay lean.<br />Hire the rest.</> : <>What would you<br />like to hand over?</>}</h2>
        <p className="lead">{computer ? <>Set up your AI team in Studio.<br />Then hand them the first job.</> : <>Tell Amit about the job. He’ll ask a few questions and introduce you to the team.</>}</p>
        {computer ? <a className="btn" href={STUDIO_URL}>Go to Studio <span aria-hidden="true">↗</span></a> : <button type="button" className="btn" data-amit>Find your first AI workflow <span aria-hidden="true">↗</span></button>}
        {computer && <p className={styles.note}>Eigi’s engineers can help you set it up.</p>}
        <a className="text-link" href="mailto:buddy@eigi.ai">Prefer email? Say hello <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.bottom}>
        <div className={styles.brandRow}><a className={styles.logo} href="#top" aria-label="Eigi, back to top" /></div>
        <div className={styles.linksRow}><span>© {YEAR} Eigi AI</span><nav aria-label="Footer"><a href={COMPUTER_URL}>Meet your Eigi</a><a href={DOCS_URL}>Documentation</a><a href={STUDIO_URL}>Studio</a><a href="https://eigi.ai/privacy-policy">Privacy</a><a href="https://eigi.ai/terms-of-service">Terms</a><a href="https://eigi.ai/data-deletion">Data deletion</a><a href="tel:+919823172692">Call the team</a></nav></div>
      </div>
    </footer>
  )
}
