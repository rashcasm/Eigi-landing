/** Approved homepage capability copy. Keep claims and illustrative details together. */
export const EIGI_CAPABILITIES = {
  eyebrow: 'Meet your Eigi',
  headline: 'A teammate with its own computer.',
  description: 'Your Eigi has its own browser, files and memory. You message it like a person. It does the work on its computer, and checks with you before anything goes out in your name.',
  exampleLabel: 'Illustrative example.',
  chapters: [
    { id: 'ask', title: 'Ask where you already talk.', description: 'Message it in WhatsApp, Slack or the web app. Describe the job in your own words.' },
    { id: 'computer', title: 'It works on its own computer.', description: 'Your Eigi opens a browser, does the research and fills a sheet. Watch it, or get on with your day.' },
    { id: 'memory', title: 'It remembers your business.', description: 'It keeps your prices, tone and rules, so you don’t have to explain them each time.' },
    { id: 'approval', title: 'It asks before it acts.', description: 'It asks you to approve anything sent in your name or involving your money. You can check every step in the activity log.' },
  ],
  channels: ['WhatsApp', 'Slack', 'Web app'],
  request: 'Find 20 dental clinics in Austin with no online booking. Draft a short intro for each.',
  requestSummary: 'Find 20 clinics and draft their intros.',
  computerTitle: 'Your Eigi’s computer',
  tabs: ['Browser', 'Files', 'Memory'],
  log: ['Searched maps', 'Checked 34 websites', '20 match', 'Drafted 20 intros'],
  memories: ['Tone: warm, short, no jargon', 'Never promise a start date', 'Offer the free 30-minute audit'],
  approval: 'Send 20 intro emails from you@yourstudio.com?',
  approvalLog: ['20 matches saved to files', '20 intro drafts prepared'],
  waiting: 'Waiting for your approval',
  captions: ['Your message', 'Research and drafts', 'Saved business rules', 'Your approval'],
  draft: 'Hi there. I noticed your clinic doesn’t offer online booking. Would a free 30-minute audit be useful?',
  bridge: {
    title: 'And you never set it up alone.',
    description: 'A sherpa connects your tools, writes the rules with you and checks the first results. Then they stay on call.',
  },
} as const
