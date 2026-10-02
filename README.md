# Eigi landing

Marketing site for [eigi.ai](https://eigi.ai), built with React 19, Vite 8 and TypeScript.

The page is **The Ascent**: one scroll from base camp (0 m) to the summit (8,848 m). Along the way it shows why AI adoption stalls, where Eigi stands against the alternatives, typical climbs by industry (Stories), the gateway to singularity (humans + forward-deployed engineers + Eigi computer), the four camps of an Eigi engagement, the founders, and finally contact.

## Run it locally

You need **Node.js 20.19+ or 22.12+** (Vite 8's minimum).

```sh
npm install
npm run dev
```

Then open <http://localhost:5173/>. Edits hot-reload.

## Scripts

| Command           | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload                                 |
| `npm run build`   | Type-check, then build the site into `dist/`                         |
| `npm run preview` | Serve the built `dist/` locally to check the production build        |
| `npm test`        | Run the unit tests (Vitest)                                          |
| `npm run lint`    | Lint with oxlint                                                     |

Run `npm run lint && npm test && npm run build` before opening a PR.

## Deploy

`npm run build` writes a fully static site to `dist/`. Any static host works (Vercel, Netlify, S3 + CloudFront, GitHub Pages) and needs no server or rewrites.

## Project layout

The code follows the Eigi frontend standards: a thin page composes feature components, and shared pieces live outside the feature.

```text
index.html                   entry HTML → src/main.tsx
public/favicon.jpg           favicon, served as-is
src/
  main.tsx                   mounts the app; app-wide providers (MotionConfig: respect reduced motion)
  pages/HomePage.tsx         "/": lays out the sections, no logic of its own
  features/landing/          everything specific to The Ascent
    index.ts                 the feature's public surface (what pages may import)
    components/              one component per section, each with a scoped *.module.css
    hooks/                   browser work: crowd canvas, singularity canvas, the sherpa that joins your cursor in the sherpas section
    utils/                   pure logic: crowd and singularity simulations (unit-tested), sprite-sheet helpers, altitude formatting
  components/layout/Nav.tsx  shared nav: logo, Start your ascent (fixed on desktop, tucks away on phones) and the full-screen section menu (sections, Documentation, Studio, email)
  components/layout/Footer.tsx  contact section + site footer
  hooks/                     shared browser behaviour: page lock while the menu is open
  styles/global.css          design tokens, reset, type scale, shared classes (.eyebrow, .lead, .btn, .mono)
  styles/motion.ts           motion presets (the scroll-reveal fade-up)
  utils/                     framework-free helpers (clamp/lerp/colour mix, contour paths, cx)
  assets/                    logo and the Open Peeps sprite, bundled by Vite
```

### Design system

The look is a founder's field manual: technical instruments plus an editorial expedition journal. Everything comes from tokens in `src/styles/global.css`, so use those instead of one-off values.

- **Type.** Archivo for headlines and buttons (`--font-display`; h1/h2 slightly expanded), Newsreader for reading text (`--font-serif`, the body default) and Martian Mono for labels and readouts (`--font-mono`). Sizes come only from the scale: `--fs-label`, `--fs-small`, `--fs-body`, `--fs-lead`, `--fs-h4`, `--fs-h3`, `--fs-h2`, `--fs-h1`.
- **Labels.** One style everywhere: mono, `--fs-label`, uppercase, `letter-spacing: var(--track-label)`. A section's eyebrow is its name as it appears in the menu, nothing more. No counters (01, 02…) on cards or lists.
- **Colour.** Black and white, plus one sage accent, `--signal`, used only on things you can act on (buttons) and on where you are (live dot, altimeter fill, hiker, the "you are here" marker, Eigi's flag). Never use it for decoration or body text. Focus rings stay black/white because sage is too soft against white.
- **Shape and spacing.** Radii are `--radius-sm` (chips, tags, photos), `--radius` (cards) and `--radius-lg` (panels), plus fully round pills for buttons. A card is always a hairline border, `--radius` and `--pad-card` padding. Cards that aren't clickable have no hover effect. `--gap-content` separates a section's heading from its content, and `--gap-card` sits between cards.
- **Materials.** Once you scroll, the top bar becomes a translucent layer the page scrolls under, and turns solid for people who ask for reduced transparency. Everything else is solid. There's no decorative texture.
- **Behaviour** (from Apple's Human Interface Guidelines: design principles, designing for macOS, foundations):
  - Every pinned, scroll-driven section has a `.skip-section` link to the next one. Don't trap people in a flow.
  - Controls stay where people left them. The top bar is fixed on desktop and tucks away only on phones.
  - System cursors only. Buttons get a pressed state, and touch targets are at least 44px.
  - Type sizes are in rem, so they follow the reader's text-size setting. Nothing is smaller than 11px.
  - Motion confirms rather than performs. Reveals are 0.6s, and everything respects reduced motion.
  - Content stops widening at 1440px (`--gutter`); on bigger screens the margins grow instead.
  - Nothing is sent that people can't see: Amit's card shows the whole pre-written message, ref tag included.

Page colours are CSS variables (`--bg`, `--fg`, `--muted`, `--line`, `--accent`) defined in `src/styles/global.css`. As you scroll, `Atmosphere.tsx` changes them, flipping the page from white to black as you reach the sherpas. Anything coloured with them, including the nav, follows along. Two exceptions: the gateway section repaints the tokens locally (a black portal in the white page), and while the menu is open the nav bar is white and difference-blended so it always inverts whatever is behind it.

The altimeter's stage label comes from each section's `data-stage` attribute, and the sky flip is tied to the sherpas section itself, so adding or resizing sections needs no retuning.

Scroll-driven effects use [`motion`](https://motion.dev) (`useScroll`, `useTransform`, `whileInView`).

### Where new code goes

- **A new section** goes in `features/landing/components/`. Export it from `features/landing/index.ts` and place it in `pages/HomePage.tsx`.
- **Listeners, timers, canvas or `requestAnimationFrame`** go in a hook under `features/landing/hooks/`, with cleanup, never inline in a component.
- **Pure logic** goes in `utils/`, with a colocated `*.test.ts`.
- **A call to action** is a `<button className="btn" data-amit>`. `Radio.tsx` opens Amit's card for anything marked `data-amit`, so onboarding stays a WhatsApp chat or a call with Amit, never a form.
- **Something a second feature needs** moves up to `src/components/` (UI) or `src/utils/` (logic).

## Credits

The base-camp crowd is adapted from Skiper UI "Skiper 39", which requires attribution on the free tier. That was itself inspired by [codepen.io/zadvorsky/pen/xxwbBQV](https://codepen.io/zadvorsky/pen/xxwbBQV). Illustrations are from [Open Peeps](https://openpeeps.com) (CC0).
