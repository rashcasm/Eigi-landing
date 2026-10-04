# Prompt for GPT 6 Astra: Eigi hero + "Meet your Eigi" section

Copy everything below the line into Astra.

---

You are working in the Eigi landing repo (React 19, Vite 8, TypeScript, CSS Modules, `motion` already installed). Your job is to rebuild **two sections only**: the homepage **hero** and a new **"Meet your Eigi"** section on the homepage. The words below are final. The visual design is yours: make it beautiful, calm and memorable.

## 0. Branch and safety

- The current branch is `codex/meet-your-eigi` and has **uncommitted work** (new hero, mascot assets, `src/features/meet-eigi/*`, `PRODUCT.md`, `docs/meet-your-eigi.md`). Do not discard or reset it.
- Run `git switch -c astra/hero-why` so the uncommitted work comes with you. Commit in small steps on that branch. Do not push or merge.
- **Frontend only.** No backend, no API calls, no live agent. Leave `src/features/meet-eigi/*` and `.env.example` untouched and unused.
- No new runtime dependencies. No secrets in code or `.env` files.

## 1. Read these first

1. `PRODUCT.md` and `docs/meet-your-eigi.md`: brand decisions. "Eigi" is the main name. An agent is "your Eigi" and the plural is "Eigis". "Computer" is something an Eigi *has*, not the product name. Nav says "Meet your Eigi". **Where `PRODUCT.md` asks for a live agent response, this brief wins for now:** the hero uses clearly labeled example replies, started by the visitor, until the backend is connected.
2. `src/features/landing/components/BaseCamp.tsx`: the current hero. Replace its content; keep `id="base-camp"` and the `BaseCamp` export name.
3. `src/features/landing/utils/hero-demo.ts` (`heroOnboardingLink`) and `amit.ts` (`whatsappLink`): the WhatsApp handoff to Amit.
4. `src/features/computer/components/ComputerOverview.tsx` and `ComputerDemo.tsx`: the current product section. The new "Meet your Eigi" section replaces `ComputerOverview` on the **homepage only**. The `/computer/` page must keep working.
5. `src/styles/global.css`: design tokens. Mascot: `src/assets/mascot/eigi-sherpa.png` (red panda sherpa).
6. Visual references (FigJam board with three earlier designs): https://www.figma.com/board/Q4hSjjvoJHbmDYu0wMZdSq/Eigi-Landing-Page

## 2. The "why", which is what this page sells

The hero must sell **why Eigi exists**, not a feature list. The belief:

> AI is ready. Small businesses are not set up to use it. The missing piece isn't a smarter model; it's someone who sets it up with you and stays until it sticks. Big companies hire forward-deployed engineers for this. Small teams get a login and a help doc. Eigi gives a team of two the same help: AI teammates that do the work (the **interface**: your Eigi and its computer) and a sherpa, a real engineer, who handholds the adoption (the **adoption**: Eigi sherpas).

Who we're talking to: early-stage US founders and solo operators. Teams under 10, often non-technical, often service businesses (clinics, agencies, consultants). They need to ship fast and want to stay lean. Use US English and USD.

Tone: a calm guide, not a hype machine. Short sentences, plain words, active voice. We teach and handhold; we never talk down.

## 3. Hero (exact copy)

**Eyebrow:** For small teams that need to move fast

**Headline:** Everyone sold you AI. Nobody showed you how.
(You may set "showed you how" in an accent style. Keep the words.)

**Subhead:** Eigi gives your business AI teammates that do real work, and a sherpa, a real engineer, who sets them up with you and stays until it sticks.

### The 15-second hook: "Give your Eigi its first job"

Goal: in about 15 seconds a visitor *feels* both halves of Eigi, the AI doing the work and a human making it stick.

| Time | What the visitor does and sees |
|---|---|
| 0–3s | Reads the headline and subhead. |
| 3–5s | Taps a chip or types one job. |
| 5–12s | Card A: an example Eigi reply types in. Card B: the sherpa's 3-step setup plan for that job ticks in at the same time. The red panda turns toward the cards. |
| 12–15s | Payoff line appears, then the CTA. |

**Input label:** Give your Eigi its first job
**Input placeholder:** What's eating your week?
**Submit button:** Ask my Eigi
**Chips (sending one fills the input and submits):**
- Reply to new leads in minutes
- Chase unpaid invoices
- Confirm tomorrow's bookings

**Card A, title "Your Eigi"**, with a small tag **"Example reply"** that is always visible
- First ~1s: "Reading your job…"
- Then the example reply types in (about 4–5s; any click or key skips to the full text):
  - *Reply to new leads in minutes:* "New lead from your website: Sarah wants a quote for a kitchen redesign. I drafted a reply in your tone with two times you're free this week. Send it, or edit first?"
  - *Chase unpaid invoices:* "3 invoices are past due, $4,850 in total. The oldest is 21 days late. I drafted a friendly nudge for each. Send now, or check them first?"
  - *Confirm tomorrow's bookings:* "14 bookings tomorrow. 12 confirmed by text. The 2:30 cancelled, so I offered it to your waitlist and Leo took it. One person hasn't replied; I'll text again at 8am."
  - *Anything typed:* "Got it: “{their words}”. Here's how I'd start: learn how you do this today, draft the first round for you, and check with you before anything goes out. What tool do you use for this now?"
- Footer: "An example of how your Eigi replies. Tell us your real job and we'll set it up with you."
- Card A replies are static data in the same data file as Card B. Trim typed input to 80 characters and render it as plain text, never as HTML.

**Card B, title "Your sherpa"**, intro: "Here's how we'd set this up with you:"
- *Reply to new leads in minutes*
  1. Connect your inbox and website form.
  2. Write your reply rules together: tone, prices, what needs you.
  3. Check the first 20 replies with you, then step back.
- *Chase unpaid invoices*
  1. Connect your books and email.
  2. Agree when to nudge and what to say.
  3. Review the first round with you before anything sends.
- *Confirm tomorrow's bookings*
  1. Connect your calendar and texts.
  2. Set rules for cancellations and the waitlist.
  3. Watch the first week with you.
- *Anything typed*
  1. Map how this job runs today, on a 30-minute call.
  2. Connect the tools it touches.
  3. Check the first results with you.
- Footer: "An example plan. We shape it around your business."

Card B content is static data too (put both in one pure data file next to `hero-demo.ts`, e.g. `utils/first-job.ts`).

**Payoff line (fades in once the reply finishes):** Your Eigi does the work. Your sherpa makes it stick.

**Primary CTA:** Set this up with a sherpa. Opens `heroOnboardingLink(task)` (WhatsApp to Amit, prefilled with the job).
**Secondary CTA:** Try another job. Clears the cards and focuses the input.

### "Why we started Eigi" strip (directly under the hook, still part of the hero area)

Title: **Why we started Eigi**

1. **AI is ready.** It can already research, draft, reply and schedule.
2. **Small businesses aren't using it.** Fewer than 1 in 5 US businesses with 4 or fewer people use AI. *(US Census Bureau, May 2026)*
3. **Tools alone don't stick.** 95% of companies saw no measurable return from their AI pilots. *(MIT NANDA, 2025)*
4. **Help changes that.** AI bought from specialist partners reaches production twice as often as AI built in-house: 67% vs 33%. *(MIT NANDA, 2025)*

Closing line: **Big companies hire forward-deployed engineers to make AI stick. We built Eigi so a team of two gets the same.**

Source links (small, below the strip):
- https://www.census.gov/library/stories/2026/05/ai-use-businesses.html
- https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/
- https://aimagazine.com/news/mit-why-95-of-enterprise-ai-investments-fail-to-deliver

## 4. "Meet your Eigi" section (exact copy)

Put it right after the hero (`id="meet-your-eigi"`). It shows the **interface** half: an Eigi is a teammate with its own computer.

**Eyebrow:** Meet your Eigi
**Headline:** A teammate with its own computer.
**Subhead:** Your Eigi has its own browser, files and memory. You message it like a person. It does the work on its computer, and checks with you before anything goes out in your name.

Four chapters. Use a sticky visual (CSS `position: sticky`) with the chapter text scrolling beside it on desktop; stack them on mobile. Never hijack or lock scrolling. Each chapter changes the visual as it scrolls into view. Label the visual "Illustrative example."

1. **Ask where you already talk.**
   Send a message in WhatsApp, Slack or the web app. No prompts to perfect.
   *Visual:* a chat bubble from the founder: "Find 20 dental clinics in Austin with no online booking. Draft a short intro for each."
2. **It works on its own computer.**
   Your Eigi opens a browser, does the research and fills a sheet. Watch it, or get on with your day.
   *Visual:* "Your Eigi's computer", a window with browser tabs, a sheet filling rows 1→20 and a step log: "Searched maps · Checked 34 websites · 20 match · Drafted 20 intros".
3. **It remembers your business.**
   Tell it once. It keeps your prices, your tone and your rules, and gets better every week.
   *Visual:* memory notes: "Tone: warm, short, no jargon" · "Never promise a start date" · "Offer the free 30-minute audit".
4. **It asks before it acts.**
   Anything with your name or money on it waits for one tap. Every step is logged.
   *Visual:* approval card: "Send 20 intro emails from you@yourstudio.com?" with buttons "Approve" and "Edit first", plus a short activity log.

**Bridge (end of section):**
**And you never set it up alone.**
A sherpa connects your tools, writes the rules with you and checks the first results. Then they stay on call.
Links: "Meet your sherpa" → `#route` · "Open Eigi Studio ↗" → `STUDIO_URL`

Keep every capability claim in **one constant** (e.g. `EIGI_CAPABILITIES` in a data file) so the team can edit it in one place. Use only: own browser, files, memory, WhatsApp / Slack / web app, approval before acting, activity log. Do not add Telegram, Instagram, Teams, phone calls, Claude/ChatGPT entry points or "dedicated pods" unless told to.

## 5. Design direction (yours to beautify)

- Keep the existing tokens in `global.css` (white, ink `#1d1d1f`, green `#32664d`, sage `#edf4ee`) and system type. You may add one italic accent style for a single phrase per headline.
- Pull these good ideas from the FigJam board:
  - from Pawan's design: the mountain metaphor and faint topographic contour lines as texture;
  - from Design 3 ("Rope Team"): the warm sherpa language and big confident headlines with one italic word;
  - from Rashmin's design: calm white space and one clear primary action.
- The red panda sherpa is the guide character. It reacts (turns or leans toward the cards) when the hook runs. Keep it abstract and friendly. No other mascots.
- The hero must fit one desktop screen at 1440×900, hook included. The "why" strip may sit just below the fold.
- Motion: subtle and purposeful (cards rise in, steps tick in one by one, reply types in). The hook only runs when the visitor taps or submits; nothing autoplays. Respect `prefers-reduced-motion`: show final states instantly.

## 6. Rules

- Never present the example replies as live AI. The "Example reply" tag and footer stay visible at all times. No fake "typing…" from a named person, no fake timestamps.
- No invented customers, testimonials, logos, user counts or results.
- Accessibility: the Card A reply sits in `aria-live="polite"` (announce the full reply once, not every typed letter), chips are real buttons, everything is keyboard-reachable, focus is visible, contrast ≥ 4.5:1.
- Mobile: no horizontal scroll at 320px; cards stack.
- Follow repo conventions: named exports, single quotes, CSS Modules colocated, pure data in `utils/`, a unit test for any new pure function (e.g. picking the sherpa plan for a chip or free text).
- Update `HomePage.tsx`: order is `BaseCamp` (hero) → `MeetYourEigi` → the rest as today, without the homepage `ComputerOverview`. Update nav links if section ids change.

## 7. Done when

- `npm run lint && npm test && npm run build` pass.
- Checked in a browser at 320, 768, 1024 and 1440px, keyboard only, and with reduced motion on. All three chips and a typed job work. No network requests from the hero. No console errors.
- No WhatsApp messages are sent during testing (check the link text only).
- Write a short summary of what changed and attach screenshots of both sections at 1440px and 375px.
