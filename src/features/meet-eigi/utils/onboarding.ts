export type OnboardingStatus = 'idle' | 'requesting-mic' | 'connecting' | 'live' | 'ended' | 'chat' | 'mic-denied' | 'unavailable'
export type Turn = { id: number; role: 'user' | 'assistant'; text: string }
export type OnboardingState = {
  status: OnboardingStatus; task: string; muted: boolean; speaking: boolean; level: number; turns: Turn[]; nextId: number
}
export type OnboardingEvent =
  | { type: 'select-task'; task: string }
  | { type: 'talk' | 'connecting' | 'ready' | 'end' | 'chat' | 'reset' | 'mic-denied' | 'unavailable' }
  | { type: 'mic'; enabled: boolean }
  | { type: 'speaking'; speaking: boolean }
  | { type: 'level'; source: 'user' | 'assistant'; level: number }
  | { type: 'transcript'; role: Turn['role']; text: string }

export function initialOnboardingState(configured: boolean): OnboardingState {
  return { status: configured ? 'idle' : 'unavailable', task: '', muted: false, speaking: false, level: 0, turns: [], nextId: 0 }
}

/** UI transitions only. Network, microphone, and timers stay outside the reducer. */
export function onboardingReducer(state: OnboardingState, event: OnboardingEvent): OnboardingState {
  const inCall = ['requesting-mic', 'connecting', 'live'].includes(state.status)
  switch (event.type) {
    case 'select-task':
      return inCall || state.status === 'chat' ? state : { ...state, task: event.task }
    case 'talk':
      return inCall || state.status === 'unavailable' ? state : { ...state, status: 'requesting-mic', muted: false, speaking: false, level: 0, turns: [] }
    case 'connecting':
      return state.status === 'requesting-mic' ? { ...state, status: 'connecting' } : state
    case 'ready':
      return state.status === 'connecting' ? { ...state, status: 'live' } : state
    case 'end':
      return inCall ? { ...state, status: 'ended', speaking: false, level: 0 } : state
    case 'reset':
      return inCall || state.status === 'unavailable' ? state : { ...state, status: 'idle', turns: [] }
    case 'chat':
      return inCall || state.status === 'unavailable' ? state : { ...state, status: 'chat', level: 0 }
    case 'unavailable':
      return { ...state, status: 'unavailable', speaking: false, level: 0 }
    case 'mic-denied':
      return inCall ? { ...state, status: 'mic-denied', speaking: false, level: 0 } : state
    case 'mic':
      return state.status === 'live' ? { ...state, muted: !event.enabled, level: 0 } : state
    case 'speaking':
      return state.status === 'live' ? { ...state, speaking: event.speaking, level: 0 } : state
    case 'level': {
      if (state.status !== 'live' || (state.speaking ? event.source !== 'assistant' : event.source !== 'user' || state.muted)) return state
      return { ...state, level: Number.isFinite(event.level) ? Math.max(0, Math.min(1, event.level)) : 0 }
    }
    case 'transcript': {
      if (state.status !== 'live' || !event.text.trim()) return state
      const last = state.turns.at(-1)
      // Bot transcripts are sentence-aggregated by RTVI; group consecutive sentences into a turn.
      const turns = last?.role === event.role
        ? [...state.turns.slice(0, -1), { ...last, text: `${last.text} ${event.text.trim()}` }]
        : [...state.turns, { id: state.nextId, role: event.role, text: event.text.trim() }]
      return { ...state, turns: turns.slice(-4), nextId: state.nextId + 1 }
    }
  }
}
