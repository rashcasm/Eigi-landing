import { describe, expect, it } from 'vitest'
import { initialOnboardingState, onboardingReducer as reduce, type OnboardingEvent } from './onboarding.ts'

const live = () => [{ type: 'talk' }, { type: 'connecting' }, { type: 'ready' }].reduce((state, event) => reduce(state, event as OnboardingEvent), initialOnboardingState(true))

describe('Amit onboarding state machine', () => {
  it('starts offline when no public agent is configured', () => {
    const state = initialOnboardingState(false)
    expect(state.status).toBe('unavailable')
    expect(reduce(state, { type: 'talk' })).toBe(state)
  })
  it('selects a topic without requesting a microphone', () => {
    const state = reduce(initialOnboardingState(true), { type: 'select-task', task: 'Chase unpaid invoices' })
    expect(state).toMatchObject({ status: 'idle', task: 'Chase unpaid invoices' })
  })
  it('requires a valid call sequence and ignores duplicate starts or late events', () => {
    const idle = initialOnboardingState(true)
    expect(reduce(idle, { type: 'ready' })).toBe(idle)
    const state = live()
    expect(state.status).toBe('live')
    expect(reduce(state, { type: 'talk' })).toBe(state)
    expect(reduce(state, { type: 'chat' })).toBe(state)
    const ended = reduce(state, { type: 'end' })
    expect(reduce(ended, { type: 'ready' })).toBe(ended)
    expect(reduce(ended, { type: 'transcript', role: 'assistant', text: 'Late reply' })).toBe(ended)
  })
  it('offers chat after microphone denial, and retains the topic when retrying', () => {
    let state = reduce(initialOnboardingState(true), { type: 'select-task', task: 'Something else' })
    state = reduce(state, { type: 'talk' })
    state = reduce(state, { type: 'mic-denied' })
    expect(reduce(state, { type: 'chat' }).status).toBe('chat')
    expect(reduce(state, { type: 'talk' })).toMatchObject({ status: 'requesting-mic', task: 'Something else' })
  })
  it('keeps the last four actual turns and joins bot sentences', () => {
    let state = live()
    for (let i = 0; i < 6; i++) state = reduce(state, { type: 'transcript', role: i % 2 ? 'assistant' : 'user', text: `Turn ${i}` })
    state = reduce(state, { type: 'transcript', role: 'assistant', text: 'Next sentence.' })
    expect(state.turns).toHaveLength(4)
    expect(state.turns[0].text).toBe('Turn 2')
    expect(state.turns[3].text).toBe('Turn 5 Next sentence.')
    expect(reduce(state, { type: 'transcript', role: 'user', text: ' ' })).toBe(state)
    expect(reduce(reduce(state, { type: 'end' }), { type: 'talk' }).turns).toEqual([])
  })
  it('uses actual levels for the active speaker and ignores muted local audio', () => {
    let state = reduce(live(), { type: 'level', source: 'user', level: .4 })
    expect(state.level).toBe(.4)
    state = reduce(state, { type: 'mic', enabled: false })
    expect(reduce(state, { type: 'level', source: 'user', level: .8 }).level).toBe(0)
    state = reduce(state, { type: 'speaking', speaking: true })
    expect(reduce(state, { type: 'level', source: 'assistant', level: 3 }).level).toBe(1)
    expect(reduce(state, { type: 'level', source: 'assistant', level: NaN }).level).toBe(0)
    expect(reduce(state, { type: 'end' })).toMatchObject({ level: 0, speaking: false })
  })
  it('returns to the start from chat or a finished call, never mid-call', () => {
    const chat = reduce(initialOnboardingState(true), { type: 'chat' })
    expect(reduce(chat, { type: 'reset' }).status).toBe('idle')
    expect(reduce(reduce(live(), { type: 'end' }), { type: 'reset' }).status).toBe('idle')
    expect(reduce(live(), { type: 'reset' }).status).toBe('live')
    expect(reduce(initialOnboardingState(false), { type: 'reset' }).status).toBe('unavailable')
  })
  it('makes API failures unavailable from voice and chat', () => {
    for (const state of [live(), reduce(initialOnboardingState(true), { type: 'chat' })]) {
      expect(reduce(state, { type: 'unavailable' })).toMatchObject({ status: 'unavailable', level: 0 })
    }
  })
})
