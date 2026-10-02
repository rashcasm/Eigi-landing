import { DOCS_URL, STUDIO_URL } from './Nav.tsx'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

const QUESTIONS = [
  { question: 'Do I need to be technical?', answer: 'No. You bring your understanding of the business. We bring the engineering, help you choose what to automate, and show your team how to use what we build.' },
  { question: 'Is Eigi another AI tool to manage?', answer: 'Eigi is a team that helps you put AI to work. We choose and connect the tools around your business, build the workflows, and help your people adopt them.' },
  { question: 'Can we start with just one workflow?', answer: 'Yes. Starting with one useful workflow gives us a way to learn what works for your team before taking on more. We’ll agree on the scope and what success looks like together.' },
  { question: 'What happens after the first conversation?', answer: 'Amit, our AI onboarding guide, gathers some context about your business and connects you with the team. We’ll discuss the opportunity, scope, and pricing before any work begins. You can also email us directly.' },
]

export function Footer() {
  return (
    <footer id="contact" className={styles.footer} data-stage="Let’s talk">
      <div className={styles.faq}>
        <div><p className="eyebrow">A little more clarity.</p><h2>Good questions.</h2></div>
        <div className={styles.questions}>{QUESTIONS.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </div>
      <div className={styles.contact}>
        <p className="eyebrow">Your next chapter starts here.</p>
        <h2>Keep the ambition.<br />Lose the busywork.</h2>
        <p className="lead">Tell us what’s taking up your day.<br />Let’s see what we can give back.</p>
        <button type="button" className="btn" data-amit>Find your first AI workflow <span aria-hidden="true">↗</span></button>
        <p className={styles.note}>Start with Amit, our AI guide. Meet your human team next.</p>
        <a className="text-link" href="mailto:buddy@eigi.ai">Prefer email? Say hello <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.bottom}>
        <div className={styles.brandRow}><a className={styles.logo} href="#top" aria-label="Eigi, back to top" /><p>Good people. Powerful AI. Your business, moving forward.</p></div>
        <div className={styles.linksRow}><span>© {YEAR} Eigi AI</span><nav aria-label="Footer"><a href={DOCS_URL}>Documentation</a><a href={STUDIO_URL}>Studio</a><a href="https://eigi.ai/privacy-policy">Privacy</a><a href="https://eigi.ai/terms-of-service">Terms</a><a href="https://eigi.ai/data-deletion">Data deletion</a><a href="tel:+919823172692">Call the team</a></nav></div>
      </div>
    </footer>
  )
}
