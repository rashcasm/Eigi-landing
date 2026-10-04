# Hero and Meet your Eigi

## Frontend scope

The homepage now leads with the supplied “Everyone sold you AI” copy and a visitor-started first-job example. Both the Eigi reply and the sherpa setup plan come from `src/features/landing/utils/first-job.ts`. Custom jobs are trimmed to 80 characters, rendered as text, and passed to the existing WhatsApp handoff. No hero requests are made. The example labels remain visible throughout.

`MeetYourEigi` follows the hero and replaces the homepage `ComputerOverview`. Four chapters explain messaging, the computer, memory, and approval. Desktop uses a sticky visual with ordinary scrolling; mobile shows each visual beside its chapter in the document flow. Approve and Edit first work locally and explicitly say that no emails are sent. Approved capability copy lives in `EIGI_CAPABILITIES`.

The existing `/computer/` product sections remain. Its shared `BaseCamp` also receives the updated hero. The live-chat feature folder, `.env.example`, runtime dependencies, remaining homepage sections, and global design tokens are unchanged.

## Design decisions

Use the existing white, ink, green, sage, and system type. The headline carries one italic phrase. Quiet contour lines frame the hero, and the red panda leans toward the results after a visitor submits. Keep the first-job handoff visible within a 1440 × 900 viewport, including the longest allowed custom job. No automatic hero playback. Reduced motion displays the finished example immediately after input.

The supplied FigJam board was unavailable to the connected account. The written reference directions and existing brand assets supplied the visual basis.

## Verification

- `npm run lint`, `npm test` (29 tests), and `npm run build` pass.
- Chrome checks at 320, 768, 1024, and 1440px: no horizontal page overflow on either route.
- All three chips, custom text, the 80-character limit, literal markup input, skipping playback, reset and input focus verified.
- Natural playback updates the polite live region once with the full reply, rather than every letter.
- Keyboard navigation and visible focus verified. Reduced motion verified for every preset and custom input.
- Each desktop chapter activates the matching visual. Local draft editing, saving, and illustrative approval verified.
- Zero hero network requests. Production console has no errors or warnings. WhatsApp URL contents inspected without opening the link or sending messages.
- Development mode logs Motion’s expected reduced-motion notice; the production build does not.
