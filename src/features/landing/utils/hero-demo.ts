import { whatsappLink } from './amit.ts'

export function heroOnboardingLink(task: string) {
  return whatsappLink(`Hi Amit, I’d like to meet my Eigi. The first job I want help with: ${task}\n\nref: meet-your-eigi`)
}
