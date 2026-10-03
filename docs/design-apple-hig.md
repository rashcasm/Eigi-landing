# Eigi: Apple-informed landing page

## Design contract

Help a US founder with fewer than ten teammates understand Eigi in one screen: engineers join the business, connect AI to real work, and help the team adopt it. The primary action opens the existing Amit onboarding conversation; email remains available for direct human contact.

- Lead with the founder's ambition and explain the service in plain language.
- Use a quiet, centered hero with one original visual: the founder, Eigi's people, and connected business functions. This illustrates a service, not a fictional software dashboard.
- Follow with the adoption gap, an animated Eigi equation, selectable workflow examples, the four engagement steps, the real founders, and contact.
- The equation visibly combines you, forward-deployed engineers, and Eigi computer into a gateway to singularity. Staggered arrivals open the portal once on entry; a replay control lets visitors see it again. Reduced-motion users see the complete scene. Singularity is framed as Eigi's vision, not a claim of achieved AGI.
- Preserve the existing logo, founder portraits, contact details, and onboarding links. Retain old expedition modules in source, but remove their scroll choreography from the active page.
- Use system sans-serif typography, near-black `#1d1d1f`, white `#ffffff`, silver `#f5f5f7`, secondary gray `#626268`, and deep green `#32664d`. Pale sage `#edf4ee` supports the human-service story. Capsule shapes identify actions; grouping and spacing establish hierarchy.
- Desktop navigation stays visible. Narrow screens use a simple native disclosure. Sections scroll normally. All content works without animation; no scroll locks or pinned storytelling.
- Workflow examples are explicitly illustrative. No invented customers, outcomes, delivery guarantees, or integration partnerships.
- Verify at 320, 768, 1024, and 1440 CSS pixels, including keyboard operation, contact opening/closing, workflow switching, contrast, and overflow. Run lint, existing tests, and a production build.

## Reference findings

Apple's [design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) prioritize purpose, agency, flexibility, simplicity, craft, and delight. The practical translation here is a service visitors can understand immediately, navigation they control, and graphics that explain the relationship between people and AI.

Apple's [Get to know the new design system](https://developer.apple.com/videos/play/wwdc2025/356/) supports hierarchy through layout and grouping. Translucency is reserved for navigation; content stays on solid surfaces. Nested corner radii, consistent spacing, and restrained color make related elements feel connected.

[Grok Bot](https://x.ai/bot) uses direct task language and concrete examples of work. [DevRev](https://devrev.ai/) explains increasing levels of assistance and human handoffs. Borrow the clarity of those explanations while keeping Eigi's distinctive offer: engineers who implement and support adoption.

## Implementation choices

The earlier expedition metaphor makes visitors traverse several pinned sections before reaching the service. Keep the sherpa idea in the copy and human support, with a conventional page structure. Avoid a decorative mountain, abstract AI orb, logo wall implying partnerships, and an invented productivity multiplier. Build the graphics from lightweight SVG and CSS using the existing React stack; no new dependency or external font request.

## Verification

- Browser checks at 320, 768, 1024, and 1440 CSS pixels: no page or navigation overflow. Corrected the narrow-phone headline, header action, and overlapping diagram labels.
- Gateway reaches its open state and replays. The equation is also named for assistive technology. The reduced-motion path skips transitions and uses the final pose.
- Workflow selection changes the example and its accessible state; keyboard activation works.
- FAQ disclosures work from the keyboard. All in-page links resolve; founder portraits load.
- Contact opens as a native modal, confines focus, closes with Escape, and restores focus to the triggering control. Desktop QR generation succeeds. WhatsApp, phone, and email destinations retain the existing contact details. No external message was sent during testing.
- Reviewed core text contrast pairs, all at least 4.7:1. Visible focus styles and 44px minimum action targets remain in place.
- Lint, 13 unit checks (including page-anchor integrity and contextual contact messages), and the production build pass. No dependencies added. Earlier crowd assets are excluded from the active build.

## Eigi Computer and motion — apple-v2

Keep the existing type, palette, spacing, and Eigi service positioning. Add a Product disclosure linking to a standalone `/computer/` page and a persistent Go to Studio action. Eigi Computer copy follows the interface positioning below, not the older `eigi-computer-intro.html`. Product examples are illustrations, not live activity or verified outcomes.

Adapt the large product demonstrations and progressive storytelling of [Meet Computer](https://devrev.ai/meet-computer) into Eigi's visual language. Animate the homepage network connections, give workflow selections a short staged response, and use scroll progress to reveal an illustrative Computer task. Keep normal scrolling; use no scroll interception. Motion must have an immediate, complete reduced-motion state, and any continuous decorative motion must be pausable. Use the installed Motion package and CSS; add no dependency.

Acceptance: both pages and their links work on direct load; Product and mobile navigation work by keyboard; Studio uses https://studio.eigi.ai/; original contact behavior remains available; responsive layouts work down to 320px; lint, tests, and production build pass. Inspect the rendered pages in an available browser.

### Verification for this update

- Both pages render in Chrome. Inspected the desktop homepage, the standalone Computer hero and completed demo, and the Computer page at 320px.
- At 320px, the measured viewport and document widths are both 320px. Studio remains visible; mobile navigation exposes the product, documentation, and contact. Contact opens and closes; selecting Investor update changes both the pressed state and example content.
- The product build emits `dist/computer/index.html` as well as the homepage, with separate page titles and descriptions.
- Reduced-motion paths render the new demos immediately and disable the network loop and scroll transforms. The network pauses offscreen and has a manual pause control.
- Lint and all 15 tests pass. Browser console inspection showed a warning from an installed extension; no application error appeared during the inspected interactions. Intermediate viewport widths and reduced-motion emulation were reviewed in source but not exhaustively exercised in the browser.

## Eigi Computer positioning — an AI C-suite for lean founding teams

Source of truth: Eigi Computer gives a small, deliberately lean founding team an AI executive team (Chief of Staff, Chief of Sales, Chief of Marketing, Chief of Operations) they hire, brief, and manage like people. The page should read as a team founders hire, not software a company deploys. Core line: small team, full C-suite, build at AI pace. Avoid enterprise SaaS and platform language (co-worker, company controls, consumer vs. company) and solo-founder framing; speak to the founders directly. Say "founders" or "founding team" for the people and "AI team" for Eigi, never a bare "team" where it could mean either. The Computer page follows one progression: small team, full C-suite → the demo (a founder and co-founder Sam briefing AI team members in a Slack-style workspace) → where to reach them → they move fast, you make the calls.

- Entry points have different roles. Slack, Microsoft Teams, and email are where the founder asks. Claude and ChatGPT are where someone calls (invokes) the team mid-conversation; this is never a voice call. The browser is where they do the work.
- Supported capabilities are only: the entry points above, one shared memory of the business, browser work, approval rules, and an audit trail. Role descriptions are examples of browser work (CRM updates, drafts, forms). Do not describe dedicated infrastructure, scheduled jobs, payments, named permission modes, or channels outside this list.
- Demo conversations are illustrative: Acme is the founder's company, Globex a prospect. No invented customers, quotes, outcomes, or productivity numbers ("100x", "a third of their time"). Restore numbers only with a cited source.
- Eigi is the engineering service that implements and integrates AI; Eigi Computer is a product that is also available on its own. Studio stays at https://studio.eigi.ai/ and `public/favicon.jpg` remains the product mark for every team member.
