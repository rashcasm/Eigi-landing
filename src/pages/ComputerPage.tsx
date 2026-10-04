import { BaseCamp } from '../features/landing/components/BaseCamp.tsx'
import { Stories } from '../features/landing/components/Stories.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import { Radio } from '../features/landing/components/Radio.tsx'
import { ComputerCapabilities, ComputerControl, ComputerOverview } from '../features/computer/components/ComputerOverview.tsx'

const LINKS = [
  { href: '#stories', label: 'Business stories' },
  { href: '#how-computer-works', label: 'How it works' },
  { href: '#your-control', label: 'Controls' },
] as const

export function ComputerPage() {
  return <>
    <a className="skip-to-content" href="#base-camp">Skip to content</a>
    <Nav links={LINKS} computer />
    <Radio />
    <main id="top">
      <BaseCamp product />
      <Stories />
      <ComputerOverview standalone />
      <ComputerCapabilities />
      <ComputerControl />
    </main>
    <Footer computer />
  </>
}
