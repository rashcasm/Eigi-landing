export const FIRST_JOBS = [
  {
    task: 'Reply to new leads in minutes',
    reply: 'New lead from your website: Sarah wants a quote for a kitchen redesign. I drafted a reply in your tone with two times you\'re free this week. Send it, or edit first?',
    steps: ['Connect your inbox and website form.', 'Write your reply rules together: tone, prices, what needs you.', 'Check the first 20 replies with you, then step back.'],
  },
  {
    task: 'Chase unpaid invoices',
    reply: '3 invoices are past due, $4,850 in total. The oldest is 21 days late. I drafted a friendly nudge for each. Send now, or check them first?',
    steps: ['Connect your books and email.', 'Agree when to nudge and what to say.', 'Review the first round with you before anything sends.'],
  },
  {
    task: 'Confirm tomorrow\'s bookings',
    reply: '14 bookings tomorrow. 12 confirmed by text. The 2:30 cancelled, so I offered it to your waitlist and Leo took it. One person hasn\'t replied; I\'ll text again at 8am.',
    steps: ['Connect your calendar and texts.', 'Set rules for cancellations and the waitlist.', 'Watch the first week with you.'],
  },
] as const

export type FirstJob = { task: string; reply: string; steps: readonly string[] }

/** Share the same bounded, plain-text task with the reply and handoff. */
export function firstJobFor(input: string): FirstJob | null {
  const task = input.trim().slice(0, 80)
  if (!task) return null
  return FIRST_JOBS.find(job => job.task === task) ?? {
    task,
    reply: `Got it: “${task}”. Here's how I'd start: learn how you do this today, draft the first round for you, and check with you before anything goes out. What tool do you use for this now?`,
    steps: ['Map how this job runs today, on a 30-minute call.', 'Connect the tools it touches.', 'Check the first results with you.'],
  }
}
