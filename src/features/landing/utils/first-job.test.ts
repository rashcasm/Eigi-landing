import { describe, expect, it } from 'vitest'
import { FIRST_JOBS, firstJobFor } from './first-job.ts'
import { heroOnboardingLink } from './hero-demo.ts'

describe('first job examples', () => {
  it.each(FIRST_JOBS)('pairs the reply and setup plan for $task', job => {
    expect(firstJobFor(`  ${job.task}  `)).toEqual(job)
  })
  it('ignores empty submissions', () => {
    expect(firstJobFor('')).toBeNull()
    expect(firstJobFor(' \n ')).toBeNull()
  })
  it('bounds free text before using it in the reply and handoff', () => {
    const job = firstJobFor('  ' + 'a'.repeat(100))!
    expect(job.task).toHaveLength(80)
    expect(job.reply).toContain(`“${job.task}”`)
    expect(job.steps).toHaveLength(3)
    expect(new URL(heroOnboardingLink(job.task)).searchParams.get('text')).toContain(job.task)
  })
  it('keeps markup and special characters as ordinary text', () => {
    const task = '<script>alert("test")</script> & invoices?'
    expect(firstJobFor(task)?.reply).toContain(task)
    expect(new URL(heroOnboardingLink(task)).searchParams.get('text')).toContain(task)
  })
})
