import { COMPUTER_URL, DOCS_URL, STUDIO_URL } from './Nav.tsx'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

const QUESTIONS = [
  { question: 'Do I need to be technical?', answer: 'No. You bring your understanding of the business. We bring the engineering, help you choose what to automate, and show your team how to use what we build.' },
  { question: 'Is Eigi another AI tool to manage?', answer: 'Eigi brings engineers into your business to put AI to work and help your team adopt it. Eigi Computer is our product: an AI executive team you message wherever you already work. Use it on its own, or have our engineers integrate it with your business.' },
  { question: 'Can we start with just one workflow?', answer: 'Yes. Starting with one useful workflow gives us a way to learn what works for your team before taking on more. We’ll agree on the scope and what success looks like together.' },
  { question: 'What happens after the first conversation?', answer: 'Amit, our AI onboarding guide, gathers some context about your business and connects you with the team. We’ll discuss the opportunity, scope, and pricing before any work begins. You can also email us directly.' },
]

const COMPUTER_QUESTIONS = [
  { question: 'Can I use Eigi Computer on its own?', answer: 'Yes. Hire your AI team in Studio and give them their first job. If you want help wiring them into your business, Eigi’s engineers can work alongside you.' },
  { question: 'Can my co-founders use it too?', answer: 'Yes. Everyone on the founding team can brief the same AI team and works from one shared memory of the business, within the access you set.' },
  { question: 'Where do we talk to them?', answer: 'Wherever you already are. Message them in Slack or Teams, forward them emails, or call them from Claude or ChatGPT. They do the work in your browser.' },
  { question: 'What does “call them from Claude or ChatGPT” mean?', answer: 'You can bring your AI team into a Claude or ChatGPT conversation. They use what they know about your business and do the work without you switching apps. It isn’t a phone or voice call.' },
  { question: 'How is this different from using ChatGPT?', answer: 'A chat assistant starts from zero and hands you text to paste somewhere. Your AI team remembers your business, does the work in the browser, asks before anything goes out in your name, and keeps a record of what it did.' },
]

export function Footer({ computer = false }: { computer?: boolean }) {
  return (
    <footer id="contact" className={styles.footer} data-stage="Let’s talk">
      <div className={styles.faq}>
        <div><p className="eyebrow">A little more clarity.</p><h2>Good questions.</h2></div>
        <div className={styles.questions}>{(computer ? COMPUTER_QUESTIONS : QUESTIONS).map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </div>
      <div className={styles.contact}>
        <p className="eyebrow">{computer ? 'Build at AI pace.' : 'Your next chapter starts here.'}</p>
        <h2>{computer ? <>Stay lean.<br />Hire the rest.</> : <>Keep the ambition.<br />Lose the busywork.</>}</h2>
        <p className="lead">{computer ? <>Set up your AI team in Studio.<br />Then hand them the first job.</> : <>Tell us what’s taking up your day.<br />Let’s see what we can give back.</>}</p>
        {computer ? <a className="btn" href={STUDIO_URL}>Go to Studio <span aria-hidden="true">↗</span></a> : <button type="button" className="btn" data-amit>Find your first AI workflow <span aria-hidden="true">↗</span></button>}
        <p className={styles.note}>{computer ? 'Eigi’s engineers can help you set it up.' : 'Start with Amit, our AI guide. Meet your human team next.'}</p>
        <a className="text-link" href="mailto:buddy@eigi.ai">Prefer email? Say hello <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.bottom}>
        <div className={styles.brandRow}><a className={styles.logo} href="#top" aria-label="Eigi, back to top" /><p>Good people. Powerful AI. Your business, moving forward.</p></div>
        <div className={styles.linksRow}><span>© {YEAR} Eigi AI</span><nav aria-label="Footer"><a href={COMPUTER_URL}>Eigi Computer</a><a href={DOCS_URL}>Documentation</a><a href={STUDIO_URL}>Studio</a><a href="https://eigi.ai/privacy-policy">Privacy</a><a href="https://eigi.ai/terms-of-service">Terms</a><a href="https://eigi.ai/data-deletion">Data deletion</a><a href="tel:+919823172692">Call the team</a></nav></div>
      </div>
    </footer>
  )
}
