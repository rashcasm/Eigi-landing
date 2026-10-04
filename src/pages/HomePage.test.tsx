import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { HomePage } from './HomePage.tsx'

it('preserves Eigi’s protected brand copy', () => {
  const text = renderToStaticMarkup(<HomePage />).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
  for (const line of [
    'Gateway to singularity',
    'Our vision of singularity: the distance between an idea and making it happen gets smaller, every day.',
    'Good people. Powerful AI. Your business, moving forward.',
    'Keep the ambition. Lose the busywork.',
    'Meet your AI sherpas.',
    'Real people. In your corner.',
    'Everyone sold you AI. Nobody showed you how.',
  ]) expect(text).toContain(line)
})

it('keeps every page navigation destination valid after shortening the landing page', () => {
  const html = renderToStaticMarkup(<HomePage />)
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
  const destinations = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1])
  expect(new Set(ids).size).toBe(ids.length)
  expect(destinations.length).toBeGreaterThan(0)
  for (const destination of destinations) expect(ids).toContain(destination)
  expect(html.match(/<h1\b/g)).toHaveLength(1)
})

it('opens on onboarding with Amit, with the AI disclosure and terms beside the actions', () => {
  const html = renderToStaticMarkup(<HomePage />)
  const sections = [...html.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map(match => match[1])
  expect(sections.slice(0, 2)).toEqual(['base-camp', 'meet-your-eigi'])
  expect(sections).not.toContain('computer')
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
  expect(text).toContain('Talk to Amit')
  expect(text).toContain('You’re talking to an AI agent built on Eigi.')
  expect(text).toContain('agree to the terms and conditions')
  expect(html).toContain('role="status"')
})
