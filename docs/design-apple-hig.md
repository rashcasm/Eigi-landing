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
