import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import { Radio } from '../features/landing/components/Radio.tsx'
import { ComputerCapabilities, ComputerControl, ComputerOverview } from '../features/computer/components/ComputerOverview.tsx'

const LINKS = [
  { href: '/', label: 'Why Eigi' },
  { href: '#how-computer-works', label: 'How it works' },
  { href: '#your-control', label: 'Your control' },
] as const

export function ComputerPage() {
  return <>
    <a className="skip-to-content" href="#computer">Skip to content</a>
    <Nav links={LINKS} computer />
    <Radio />
    <main id="top">
      <ComputerOverview standalone />
      <ComputerCapabilities />
      <ComputerControl />
    </main>
    <Footer computer />
  </>
}
