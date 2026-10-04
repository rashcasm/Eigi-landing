# Eigi landing

Marketing site for [eigi.ai](https://eigi.ai), built with React, Vite, TypeScript, CSS Modules, and Motion.

The page is written for early-stage US founders running teams under ten. It moves from recognition to action: talk to Amit (the hero is the onboarding), “Sound familiar?”, why the work is still on your plate, what Eigi is, how an Eigi works, the first jobs to hand over, how sherpas set it up, real stories, the founders, questions, and a closing ask.

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

The visual system comes from Pawan's “Ascent” work, reconciled with the onboarding hero:

- Two families from Fontshare: Sentient (variable serif) for headlines, with one unbreakable italic phrase per headline; Satoshi (variable sans) for reading, UI and tracked-caps labels. Headline measures are set in `em` so lines break on phrases. Tokens live in `src/styles/global.css`.
- Warm paper white with ink, and one terracotta accent taken from the red panda. A `.dark` class repaints the same tokens for the Eigi equation and the closing footer.
- Hairline borders, topographic contours in the hero, a dashed rope between the four camps of an engagement.
- The Open Peeps crowd closes the page in the footer: everyone still carrying everything themselves. The sprite loads only when the footer is near.
- Statistics are limited to two verified, cited sources in the problem section. Examples are labelled illustrative; stories are real client and community work.

## Structure

- `src/pages/HomePage.tsx`: service page composition and navigation destinations.
- `src/pages/ComputerPage.tsx`: standalone Eigi Computer page at `/computer/`. `computer/index.html` is a second Vite entry so static hosts can serve it directly.
- `src/features/computer/components/`: shared product demonstration with the AI team roster, entry-point diagram, and approval rules. Demonstrations are illustrative, run once on entry, and can be replayed or switched between three jobs handed to different team members. Positioning lives in `docs/design-apple-hig.md`.
- `src/features/landing/components/`: section components with colocated CSS Modules. `AmitOnboarding.tsx` is the hero's voice/chat card; `Recognition.tsx` and `FirstJobs.tsx` hold the founder questions and first jobs.
- `src/features/landing/components/Radio.tsx`: the contact dialog. Any button marked `data-amit` opens it. Native dialog behavior handles modal focus, Escape, and focus restoration. The QR dependency loads only when the dialog opens.
- `src/features/landing/utils/amit.ts`: public contact details and contextual WhatsApp messages, with unit tests.
- `src/components/layout/`: shared navigation and footer.
- `src/styles/global.css`: tokens, typography, shared buttons, responsive and accessibility defaults.
- `src/assets/`: existing Eigi logo and founder portraits.

Earlier expedition animations remain in source for reference but are not mounted on the redesigned page. Pure simulation tests are retained.

## Credits

The earlier crowd implementation is adapted from Skiper UI “Skiper 39” (attribution required on its free tier), inspired by [this CodePen](https://codepen.io/zadvorsky/pen/xxwbBQV). Its illustrations are from [Open Peeps](https://openpeeps.com) (CC0). The redesigned active page uses original SVG/CSS diagrams and the existing Eigi portraits and logo.
