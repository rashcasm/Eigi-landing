import { ComputerOverview } from '../features/computer/components/ComputerOverview.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import {
  BaseCamp, Founders, Gateway, Problem, Radio, Route, Stories,
} from '../features/landing/index.ts'

/** The menu's links, in page order. */
const SECTIONS = [
  { href: '#stories', label: 'Business stories' },
  { href: '#route', label: 'How it works' },
  { href: '#founders', label: 'Our people' },
] as const

/** The service, useful examples, the people behind it, and a clear next step. */
export function HomePage() {
  return (
    <>
      <a className="skip-to-content" href="#base-camp">Skip to content</a>
      <Nav links={SECTIONS} />
      <Radio />
      <main id="top">
        <BaseCamp />
        <Stories />
        <Problem />
        <Gateway />
        <ComputerOverview />
        <Route />
        <Founders />
      </main>
      <Footer />
    </>
  )
}
