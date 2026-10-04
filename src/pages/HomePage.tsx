import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import {
  BaseCamp, FirstJobs, Founders, Gateway, MeetYourEigi, Problem, Radio, Recognition, Route, Stories,
} from '../features/landing/index.ts'

/** The menu's links, in page order. */
const SECTIONS = [
  { href: '#meet-your-eigi', label: 'Meet your Eigi' },
  { href: '#route', label: 'How it works' },
  { href: '#stories', label: 'Stories' },
  { href: '#founders', label: 'Our people' },
] as const

/**
 * Talk first, then: you recognise your week, why it's still on your plate, what Eigi is, how an Eigi works,
 * what you'd hand over, who sets it up, proof, the people, questions, and one last ask.
 */
export function HomePage() {
  return (
    <>
      <a className="skip-to-content" href="#base-camp">Skip to content</a>
      <Nav links={SECTIONS} />
      <Radio />
      <main id="top">
        <BaseCamp />
        <Recognition />
        <Problem />
        <Gateway />
        <MeetYourEigi />
        <FirstJobs />
        <Route />
        <Stories />
        <Founders />
      </main>
      <Footer />
    </>
  )
}
