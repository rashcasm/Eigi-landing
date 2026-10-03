import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { ComputerPage } from './ComputerPage.tsx'
import { HomePage } from './HomePage.tsx'

it('gives the standalone product valid anchors and a route back to Eigi', () => {
  const html = renderToStaticMarkup(<ComputerPage />)
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) expect(ids).toContain(anchor)
  expect(new Set(ids).size).toBe(ids.length)
  expect(html.match(/<h1\b/g)).toHaveLength(1)
  expect(html).toContain('href="/"')
  expect(html).toContain('aria-current="page"')
  expect(html).toContain('Can I use Eigi Computer on its own?')
})

it('connects both pages to the product and the requested Studio destination', () => {
  for (const Page of [HomePage, ComputerPage]) {
    const html = renderToStaticMarkup(<Page />)
    expect(html).toMatch(/href="https:\/\/studio\.eigi\.ai\/"[^>]*>Go to Studio/)
    expect(html).toContain('href="/computer/"')
    expect(html).toContain('Illustrative example')
    expect(html).toContain('Replay example')
  }
})
