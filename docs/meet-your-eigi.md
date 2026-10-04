# Meet your Eigi

## Brand decision

Eigi is the main brand. An Eigi is an AI teammate a business owner hires, briefs, and checks in with. The plural is Eigis. A computer and memory are things an Eigi has, not a separate product name.

| Offering | Public name | Description |
| --- | --- | --- |
| Company and main brand | Eigi | The company behind your Eigis and the people who help you use them. |
| Agent product | Your Eigi / your Eigis | AI teammates with their own computer and a memory for your business. |
| Engineering service | Eigi engineers | People who connect AI to your business and help your staff use it. |
| Voice offering | Eigi voice agents | Describe the voice capability plainly. This site does not establish a separate voice product or capabilities. |
| Workspace | Eigi Studio | Where you set up and manage your Eigis. |

Use “Meet your Eigi” in navigation. Keep `/computer/` working for existing links. Use “computer” in capability explanations. This decision supersedes the older naming and service-first hero in `design-apple-hig.md`.

## Hero contract

For a busy business owner, the first screen must answer who Eigi is, show one familiar job, and let the owner start onboarding. Lead with “Meet your Eigi.” Keep the green, white and system typography from the existing site. The supplied Cartesia screen informs the breathing room and immediate product interaction, without copying its orbs or copy.

One original pika guide, a forest-green jacket, orange scarf and field notebook carry the personality. The character is a guide, not a guru or a named fictional character. Keep the rest quiet: centred introduction, three task choices, a compact task demonstration, and a WhatsApp action. Use white #ffffff, ink #1d1d1f, green #32664d, sage #edf4ee, and muted #626268; the scarf is an asset accent.

The 12-second demonstration proceeds through reading context, preparing work, and owner review. It is explicitly illustrative, with pause, replay and immediate-result controls. Reduced-motion visitors get the result immediately. Selecting another job resets the example and updates the onboarding message. Mobile stacks the illustration and demonstration without horizontal overflow.

## Onboarding and stories

The repository is a static React site. It has Amit's public WhatsApp link, but no authenticated outbound WhatsApp endpoint. The hero therefore opens a task-specific draft to Amit; the visitor sends it in WhatsApp. Do not collect an unused phone number or claim a message was sent. Number-based outbound onboarding requires a real server endpoint, consent, validation and delivery/error handling.

Business stories describe a small agency, an online shop and a consultancy. Label them as illustrative situations, not real customers or testimonials. No invented names, revenue, time savings or customer counts. Link each story into onboarding with its specific task.

## Implementation and verification

Use the existing React, TypeScript and CSS Modules conventions, named exports, single quotes, and no new runtime dependency. Hero and stories live in `src/features/landing/components`; pure scenario data and onboarding messages live alongside the existing landing utilities. Shared navigation and metadata follow the new naming. Keep the existing service and product detail sections reachable.

Build order: hero and mascot; navigation and naming; business stories; browser checks and copy review. Validate selectors, playback and contextual onboarding links. Run `npm run lint`, `npm test`, and `npm run build`. Inspect both routes at 320, 768, 1024 and 1440 pixels, keyboard controls, reduced motion, image loading, and console errors. No real WhatsApp messages are sent during verification.

Always preserve public contact details and existing paths. Never invent testimonials, send onboarding messages during tests, or expose credentials. New services and dependencies are outside this implementation.
