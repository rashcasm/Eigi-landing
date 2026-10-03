# Eigi landing

Marketing site for [eigi.ai](https://eigi.ai), built with React, Vite, TypeScript, CSS Modules, and Motion.

The page presents Eigi as a hands-on AI adoption team for founders who want to stay lean. The story moves from the founder's ambition to the adoption gap, the Eigi equation, concrete workflow examples, the engagement process, the founders, and contact.

## Run locally

Use Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open <http://localhost:5173/>. Edits hot-reload.

```sh
npm run lint
npm test
npm run build
```

`npm run build` writes a static site to `dist/`. `npm run preview` serves that production build locally.

## Design

[Design contract and sources](docs/design-apple-hig.md) documents the Apple research, audience, visual decisions, and checks.

- System typography, white and silver surfaces, deep green accents. All main design tokens live in `src/styles/global.css`.
- A custom SVG/CSS graphic connects the founder to business functions through Eigi. Connections flow and cards float while visible; visitors can pause the animation. Reduced-motion preferences disable movement.
- The gateway section animates **you + forward-deployed engineers + Eigi computer = gateway to singularity**. Motion plays once on entry; a button replays it. Reduced-motion users see the open portal immediately. Scrolling is never pinned or intercepted.
- Three selectable workflow examples describe both the agent's work and the engineer's role. These are illustrations, not customer testimonials or live activity.
- Navigation, FAQs, and the onboarding dialog use native HTML behavior. Contact stays on WhatsApp, telephone, or email; no form or backend is introduced.

## Structure

- `src/pages/HomePage.tsx`: service page composition and navigation destinations.
- `src/pages/ComputerPage.tsx`: standalone Eigi Computer page at `/computer/`. `computer/index.html` is a second Vite entry so static hosts can serve it directly.
- `src/features/computer/components/`: shared product demonstration, capabilities, entry-point diagram, and company controls. Demonstrations are illustrative, run once on entry, and can be replayed or switched between three entry points (team chat, AI assistant, email). Positioning lives in `docs/design-apple-hig.md`.
- `src/features/landing/components/`: section components with colocated CSS Modules.
- `src/features/landing/components/Radio.tsx`: the contact dialog. Any button marked `data-amit` opens it. Native dialog behavior handles modal focus, Escape, and focus restoration. The QR dependency loads only when the dialog opens.
- `src/features/landing/utils/amit.ts`: public contact details and contextual WhatsApp messages, with unit tests.
- `src/components/layout/`: shared navigation and footer.
- `src/styles/global.css`: tokens, typography, shared buttons, responsive and accessibility defaults.
- `src/assets/`: existing Eigi logo and founder portraits.

Earlier expedition animations remain in source for reference but are not mounted on the redesigned page. Pure simulation tests are retained.

## Credits

The earlier crowd implementation is adapted from Skiper UI “Skiper 39” (attribution required on its free tier), inspired by [this CodePen](https://codepen.io/zadvorsky/pen/xxwbBQV). Its illustrations are from [Open Peeps](https://openpeeps.com) (CC0). The redesigned active page uses original SVG/CSS diagrams and the existing Eigi portraits and logo.
