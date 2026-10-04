import { whatsappLink } from './amit.ts'

export function heroOnboardingLink(task: string) {
  const job = task.trim()
  return whatsappLink(job
    ? `Hi Amit, I’d like to meet my Eigi. The first job I want help with: ${job}\n\nref: meet-your-eigi`
    : 'Hi Amit, I’d like to meet my Eigi and find the first job to hand over.\n\nref: meet-your-eigi')
}
