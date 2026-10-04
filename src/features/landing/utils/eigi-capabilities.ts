/** Approved homepage capability copy. Keep claims and illustrative details together. */
export const EIGI_CAPABILITIES = {
  eyebrow: 'Meet your Eigi',
  headline: 'A teammate with its own computer.',
  description: 'Your Eigi has its own browser, files and memory. You message it like a person. It does the work on its computer, and checks with you before anything goes out in your name.',
  exampleLabel: 'Illustrative example.',
  chapters: [
    { id: 'ask', title: 'Ask where you already talk.', description: 'Send a message in WhatsApp, Slack or the web app. No prompts to perfect.' },
    { id: 'computer', title: 'It works on its own computer.', description: 'Your Eigi opens a browser, does the research and fills a sheet. Watch it, or get on with your day.' },
    { id: 'memory', title: 'It remembers your business.', description: 'Tell it once. It keeps your prices, your tone and your rules, and gets better every week.' },
    { id: 'approval', title: 'It asks before it acts.', description: 'Anything with your name or money on it waits for one tap. Every step is logged.' },
  ],
  channels: ['WhatsApp', 'Slack', 'Web app'],
  request: 'Find 20 dental clinics in Austin with no online booking. Draft a short intro for each.',
  computerTitle: 'Your Eigi’s computer',
  tabs: ['Browser', 'Files', 'Memory'],
  log: ['Searched maps', 'Checked 34 websites', '20 match', 'Drafted 20 intros'],
  memories: ['Tone: warm, short, no jargon', 'Never promise a start date', 'Offer the free 30-minute audit'],
  approval: 'Send 20 intro emails from you@yourstudio.com?',
  draft: 'Hi there — I noticed your clinic doesn’t offer online booking. Would a free 30-minute audit be useful?',
  bridge: {
    title: 'And you never set it up alone.',
    description: 'A sherpa connects your tools, writes the rules with you and checks the first results. Then they stay on call.',
  },
} as const
