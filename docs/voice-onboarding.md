# Voice-first onboarding hero

## What the hero does

The first screen is the onboarding. Below the tagline ("Gateway to singularity") and headline, one card lets a visitor:

- **Talk to Amit** by voice in the browser, with a live transcript, mute and end call;
- **chat** with Amit in the same card;
- or continue on **WhatsApp** (prefilled with the job they picked).

Visitors can pick a starting job first. Picking one never starts the microphone; it only changes the button to "Talk to Amit about this" and is sent to the agent as session metadata (`task`). After a call, the card shows that job's example sherpa plan and a WhatsApp follow-up.

Files: `src/features/landing/components/AmitOnboarding.tsx` (+ `.module.css`), state machine in `src/features/meet-eigi/utils/onboarding.ts`, transport in `src/features/meet-eigi/api.ts` and `voice.ts`. Pipecat and Daily load only when someone presses Talk.

## Agent and API (verified 4 Oct 2026)

- Agent: `6ac25521e59d6468337ceab9` ("# Amit: website" in Studio — rename it to "Amit: website"). Default in `api.ts`; `VITE_EIGI_AGENT_ID` overrides it.
- Agent settings: chat on, voice on, live transcript on, mute on, terms notice on.
- Endpoints, same as the official widget and Studio: `GET /v1/widgets/agents/{id}`, `POST /v1/widgets/chat/sessions`, `POST /v1/widgets/chat/messages`, `POST /v1/widgets/sessions/daily` (returns `dailyRoom` + `dailyToken`, joined with Pipecat's Daily transport). CORS is open.
- Terms: the official widget treats the terms as a notice the visitor accepts by starting a conversation (no API call). The hero shows the agent's terms text beside every Talk and Chat action.

## Blockers on the platform side (not frontend)

1. **`GET /v1/widgets/agents/{id}` no longer returns `prompt_access_token`.** Checked from studio.eigi.ai and from an unrelated origin, for Amit and for the README's sample agent. Without it, neither this hero nor the official widget can start chat or voice. Until it's back, the hero detects this on load and switches to "Message Amit on WhatsApp" / "Call". Once the API returns the token again, Talk and Chat work with no code change.
2. **`https://studio.eigi.ai/widget.js` returns the Studio app's HTML, not a script.** Studio's embed snippet is built as `${window.location.origin}/widget.js`, so the copied snippet doesn't load anything. The hero doesn't need it.

## Checks run

- TypeScript (`tsc -p tsconfig.app.json`): passes.
- All 47 unit tests pass (run with Bun's test runner in this environment; run `npm test` locally to confirm with Vitest).
- Production bundle built and checked in Chromium at 1440×900 and 390×844 for: ready, job picked, chat (mocked replies), waiting for mic, call ended, offline. No horizontal overflow; the full card and headline fit one 1440×900 screen.
- Not run here: `npm run lint` and `npm run build` (need macOS-native binaries). Run `npm run lint && npm test && npm run build` before merging.
