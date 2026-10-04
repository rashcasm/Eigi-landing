# Prompt for GPT 6 Astra: voice-first onboarding hero

Run with **GPT-6 Astra, High effort, Fast Mode off**. Copy everything below the line into Astra.

---

You are working in the Eigi landing repo (React 19, Vite 8, TypeScript, CSS Modules, `motion` installed). You are the builder; this brief is the spec. Do exactly what it says, and nothing else.

## 0. Branch

- You are on `astra/hero-why`. Create `astra/voice-onboarding` from it: `git switch -c astra/voice-onboarding`.
- Commit in small, clear steps. Do not push or merge.

## 1. First, undo the copy pass

The last commit `fc261f8` ("replace homepage slogans with concrete jobs and roles") removed Eigi's brand voice, including our tagline. Run `git revert --no-edit fc261f8` and check it applied cleanly.

**Protected copy.** These lines are brand. Never rewrite, shorten or "clean up" them:

- "Gateway to singularity" / "Your gateway to singularity." (our tagline)
- "Our vision of singularity: the distance between an idea and making it happen gets smaller, every day."
- "Good people. Powerful AI. Your business, moving forward."
- "Keep the ambition. Lose the busywork."
- "Meet your AI sherpas."
- "Real people. In your corner."
- "Everyone sold you AI. Nobody showed you how."

Do **not** run copy-editing, "no-AI-slop" or tone passes on any existing text. Change only the words this brief gives you. Add a test in `src/pages/HomePage.test.tsx` that fails if "Gateway to singularity" or "Good people. Powerful AI. Your business, moving forward." disappear from the homepage.

## 2. What we're building and why

Eigi's belief: AI is ready, but small teams aren't set up to use it. They need someone to guide them, not another tool. So the hero must **be** the onboarding, not describe it. A visitor should be talking to Eigi within about 15 seconds of landing.

The guide is **Amit**, Eigi's AI onboarding agent. He already runs on Eigi's own voice-agent platform and on WhatsApp. The hero lets a visitor talk to Amit by voice right on the page, or type to him, or move to WhatsApp. This is also proof: the onboarding itself is an Eigi agent.

References:
- **Cartesia (cartesia.ai):** the hero *is* the demo ("Talk to Skylar"), a persona card with one big Talk button.
- **8090 (8090.ai):** similar service for enterprises ("AI is a work in progress. We make it work for you."). Our angle is small teams and a guide who stays.

No backend of our own. Voice and chat run on the Eigi platform's public widget API, the same one `src/features/meet-eigi/api.ts` already uses for chat. The only setting is a public agent ID in `VITE_EIGI_AGENT_ID`.

## 3. Hero layout and exact copy

Keep `id="base-camp"`, the `BaseCamp` export name, the contour-line texture, and the `WhyEigi` strip under the first screen.

**Tagline line** (small, above the headline, next to the Eigi mark): Gateway to singularity

**Headline:** Everyone sold you AI. Nobody *showed you how.*

**Subhead:** Eigi gives your business AI teammates that do real work, and a sherpa, a real engineer, who sets them up with you and stays until it sticks.

**Onboarding card** (the centerpiece, replaces the current "Your Eigi" and "Your sherpa" example cards):

- Persona row: the red panda (`src/assets/mascot/eigi-sherpa.png`) as Amit's avatar · **Amit** · "Eigi onboarding guide" · trait line "Patient. Curious. Plain-spoken." · a small tag "AI agent".
- Primary button: **Talk to Amit** (mic icon). Large, the single most obvious action on the page.
- Helper line: "Two minutes. Amit asks about your business and finds the first job we can take off your plate."
- Topic chips, label "Start with a job:". Use the three tasks in `utils/first-job.ts` plus "Something else". Choosing one highlights it, and the button becomes **Talk to Amit about this**. Choosing a chip must not start the mic by itself.
- Secondary row: "Prefer typing? **Chat with Amit**" · "**Message on WhatsApp**" (uses `heroOnboardingLink(task)`).
- Disclosure, always visible: "You're talking to an AI agent built on Eigi. Your mic is used only during the call."

**States of the card** (one component, one state machine in a pure, tested function):

| State | What shows |
|---|---|
| `idle` | Everything above. |
| `requesting-mic` | "Allow your microphone to talk to Amit." |
| `connecting` | "Calling Amit…" and the panda gently pulses. |
| `live` | Status "Amit is listening" or "Amit is speaking". The panda reacts to audio level (breathing ring around the avatar). Live transcript with the last 4 turns, labeled "You" and "Amit", inside `aria-live="polite"`. Buttons: **Mute** / **Unmute**, **End call**. |
| `ended` | "Thanks for talking with Amit." If a topic was chosen, show "Here's how a sherpa would set up *{task}*:" with that job's 3 steps from `first-job.ts`, and the note "An example plan. We shape it around your business." Buttons: **Continue on WhatsApp** (prefilled with the task) · **Talk again**. |
| `chat` | Inline chat with Amit using the existing `useEigiChat` hook. Placeholder "Tell Amit what your business does". If a topic was chosen, prefill "I'd like help with: {task}". Show only real agent replies. |
| `mic-denied` | "Amit needs your microphone to talk. You can chat instead." with **Chat with Amit**. |
| `unavailable` | "Amit is offline right now. Message him on WhatsApp instead." with the WhatsApp button. Use this when the agent ID is empty, the API fails, or a terms gate is on. |

Never show scripted text as if Amit said it. Every line in the transcript and chat comes from the live agent.

## 4. Voice: how to connect (investigate first, then build)

1. Outside the repo (e.g. `/tmp/eigi-widget`), run `npm pack @cliniq360/eigi-widget@1.2.3` and unpack it. Read `dist/eigi-widget.js` and find exactly how the official widget starts a voice call. Look for `/v1/widgets` paths, `X-Prompt-Token`, Daily room URL and token fields, and Pipecat `PipecatClient` / `DailyTransport` setup. Write what you found (endpoints, request and response fields) in `docs/voice-onboarding.md`.
2. **Path A (preferred):** if the voice handshake is clear, build `src/features/meet-eigi/voice.ts` next to `api.ts`. It reuses `connectAgent`'s prompt-token step, then starts the call with `@pipecat-ai/client-js` and `@pipecat-ai/daily-transport` at the same major versions the widget uses. These two are the only new dependencies allowed. **Load them with a dynamic `import()` only when the visitor presses Talk**, so the first page load doesn't grow. Use the installed type definitions to wire transcripts, bot speaking start and stop, audio levels, mute and disconnect. Pass the chosen task as session metadata if the widget does, plus `source: 'eigi-homepage'`.
3. **Path B (fallback):** if you cannot verify the handshake, don't guess endpoints. Load the official `<eigi-widget agent-id="…">` on press, pinned to `@1.2.3`, from jsDelivr with Subresource Integrity, and theme it with its CSS custom properties to match our tokens. Use only open or start methods that actually exist in the bundle. Say clearly in your summary which path you took.
4. Keep the existing rule in `api.ts`: if the agent has a terms gate enabled, don't bypass it. Show `unavailable` instead.
5. Mic only after a click on Talk. Release the mic and close the connection on End, on unmount and on page hide. Voice needs HTTPS, so it works on localhost and on Vercel previews.
6. Unit tests: the state machine, and the voice connect function with `fetch` mocked (copy the style of `api.test.ts`). No real calls in tests.

## 5. Design direction

- Keep the global tokens and system type; one italic accent phrase per headline is fine.
- The onboarding card should feel like a calm, premium voice product (think Cartesia's Skylar card), not a form. The first screen at 1440×900 shows: tagline, headline, subhead and the full idle card with chips. Mobile at 320px: no horizontal scroll, and the Talk button is reachable with a thumb.
- Motion: the avatar's breathing ring follows real audio level. Everything else is subtle. With `prefers-reduced-motion`, show static states only.
- The "Meet your Eigi" section and the rest of the page stay as they are after the revert.

## 6. Rules

- No invented customers, testimonials, logos, counts or results.
- No secrets anywhere. The agent ID is public; the API base URL stays in `api.ts`.
- Accessibility: real buttons, visible focus, keyboard reachable, contrast ≥ 4.5:1, status changes announced politely.
- Follow repo conventions: named exports, single quotes, colocated CSS Modules, pure logic in `utils/` with tests.

## 7. Done when

- `npm run lint && npm test && npm run build` pass, and the protected-copy test passes.
- Checked at 320, 768, 1024 and 1440px. Keyboard-only and reduced motion checked.
- With `VITE_EIGI_AGENT_ID` empty: `unavailable` shows and WhatsApp works.
- With a real ID in `.env.local`: a voice call connects, the transcript appears, mute and end work, chat replies stream, and nothing loads until Talk or Chat is pressed. Check the Network tab.
- No WhatsApp messages sent during testing.
- Summary written in `docs/voice-onboarding.md`: which path you took (A or B), what you verified, and screenshots of idle, live and ended at 1440px and 375px.
