import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { HomePage } from './HomePage.tsx'

it('keeps every page navigation destination valid after shortening the landing page', () => {
  const html = renderToStaticMarkup(<HomePage />)
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
  const destinations = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1])
  expect(new Set(ids).size).toBe(ids.length)
  expect(destinations.length).toBeGreaterThan(0)
  for (const destination of destinations) expect(ids).toContain(destination)
  expect(html.match(/<h1\b/g)).toHaveLength(1)
})

it('introduces Eigi immediately after the hero with explicit example labels', () => {
  const html = renderToStaticMarkup(<HomePage />)
  const sections = [...html.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map(match => match[1])
  expect(sections.slice(0, 2)).toEqual(['base-camp', 'meet-your-eigi'])
  expect(sections).not.toContain('computer')
  expect(html).toContain('Example reply')
  expect(html).toContain('An example plan. We shape it around your business.')
  expect(html).toContain('aria-live="polite"')
  expect(html).toMatch(/maxlength="80"/i)
})
