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
