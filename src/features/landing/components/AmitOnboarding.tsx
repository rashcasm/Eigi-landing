import { useEffect, useReducer, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import amit from '../../../assets/mascot/eigi-sherpa.png'
import { DEFAULT_TERMS, chatConfig, getAgent } from '../../meet-eigi/api.ts'
import { useEigiChat } from '../../meet-eigi/useEigiChat.ts'
import { initialOnboardingState, onboardingReducer, type OnboardingState } from '../../meet-eigi/utils/onboarding.ts'
import type { VoiceCall } from '../../meet-eigi/voice.ts'
import { AMIT_DISPLAY, AMIT_TEL } from '../utils/amit.ts'
import { FIRST_JOBS, firstJobFor } from '../utils/first-job.ts'
import { heroOnboardingLink } from '../utils/hero-demo.ts'
import styles from './AmitOnboarding.module.css'

const TERMS_URL = 'https://eigi.ai/terms-of-service'
const MIC_ERRORS = ['NotAllowedError', 'NotFoundError', 'NotReadableError', 'SecurityError']

function statusLabel({ status, speaking, muted }: OnboardingState) {
  switch (status) {
    case 'idle': return 'Ready to talk'
    case 'requesting-mic': return 'Waiting for your mic'
    case 'connecting': return 'Calling Amit…'
    case 'live': return speaking ? 'Amit is speaking' : muted ? 'You’re muted' : 'Amit is listening'
    case 'ended': return 'Call ended'
    case 'chat': return 'Chatting'
    case 'mic-denied': return 'Mic is off'
    case 'unavailable': return 'On WhatsApp'
  }
}

function Glyph({ name }: { name: 'mic' | 'mic-off' | 'end' | 'send' }) {
  const paths = {
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
    'mic-off': <><path d="M15 9.5V6a3 3 0 0 0-5.7-1.3M9 9v2a3 3 0 0 0 4.6 2.5M5 11a7 7 0 0 0 11.2 5.6M19 11a7 7 0 0 1-.5 2.6M12 18v3M4 4l16 16" /></>,
    end: <path d="M3.5 14.5c4.7-4.3 12.3-4.3 17 0l-2.2 2.6-3.3-1.4v-2.4a10 10 0 0 0-6 0v2.4l-3.3 1.4Z" />,
    send: <path d="M5 12h14m-6-6 6 6-6 6" />,
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

/** The hero is the onboarding: a visitor talks to Amit, the website agent, by voice or text. */
export function AmitOnboarding() {
  const [state, dispatch] = useReducer(onboardingReducer, chatConfig.agentId !== '', initialOnboardingState)
  const [terms, setTerms] = useState(DEFAULT_TERMS)
  const [draft, setDraft] = useState('')
  const chat = useEigiChat()
  const audioRef = useRef<HTMLAudioElement>(null)
  const call = useRef<VoiceCall | null>(null)
  const request = useRef<AbortController | null>(null)
  const chatInput = useRef<HTMLInputElement>(null)
  // Voice stays the first and only offer; a failed probe only decides what happens after the visitor taps Talk.
  const reachable = useRef(true)
  const { status, task } = state
  const plan = task ? firstJobFor(task) : null

  // Find out quietly whether the agent can take a call, so a tap on Talk never waits on a dead line.
  useEffect(() => {
    const controller = new AbortController()
    getAgent(chatConfig, controller.signal)
      .then(agent => { reachable.current = true; if (agent.terms) setTerms(agent.terms) })
      .catch(() => { if (!controller.signal.aborted) reachable.current = false })
    return () => controller.abort()
  }, [])

  // Release the microphone and the call whenever the visitor leaves.
  useEffect(() => {
    const hangUp = () => { request.current?.abort(); void call.current?.disconnect(); call.current = null }
    window.addEventListener('pagehide', hangUp)
    return () => { window.removeEventListener('pagehide', hangUp); hangUp() }
  }, [])

  useEffect(() => { if (status === 'chat') chatInput.current?.focus() }, [status])

  async function talk() {
    const audio = audioRef.current
    if (!audio) return
    if (!reachable.current) { dispatch({ type: 'unavailable' }); return }
    request.current?.abort()
    const controller = new AbortController()
    request.current = controller
    dispatch({ type: 'talk' })
    try {
      const { connectVoice } = await import('../../meet-eigi/voice.ts')
      call.current = await connectVoice({ config: chatConfig, task, signal: controller.signal, audio, onEvent: dispatch })
    } catch (error) {
      if (controller.signal.aborted) return
      const name = (error as { name?: string } | null)?.name ?? ''
      dispatch({ type: MIC_ERRORS.includes(name) ? 'mic-denied' : 'unavailable' })
    }
  }

  function endCall() {
    request.current?.abort()
    void call.current?.disconnect()
    call.current = null
    dispatch({ type: 'end' })
  }

  function openChat() {
    setDraft(task ? `I’d like help with: ${task}` : '')
    dispatch({ type: 'chat' })
  }

  async function sendChat(event: FormEvent) {
    event.preventDefault()
    if (await chat.send(draft)) setDraft('')
  }

  function backToStart() {
    chat.reset()
    dispatch({ type: 'reset' })
  }

  const inCall = status === 'requesting-mic' || status === 'connecting' || status === 'live'
  const whatsapp = heroOnboardingLink(task)
  const level = { '--level': state.level.toFixed(3) } as CSSProperties

  return <div className={styles.card} data-status={status} data-speaking={state.speaking}>
    <audio ref={audioRef} autoPlay hidden />
    <div className={styles.persona}>
      <div className={styles.orb} style={level}><img src={amit} width="720" height="480" alt="" fetchPriority="high" /></div>
      <p className={styles.name}>Amit</p>
      <p className={styles.role}>Eigi onboarding guide <span>AI agent</span></p>
      <p className={styles.trait}>Patient. Curious. Plain-spoken.</p>
    </div>

    <div className={styles.panel}>
      <p className={styles.status} role="status"><span aria-hidden="true" />{statusLabel(state)}</p>

      {(status === 'idle' || status === 'ended' || status === 'mic-denied' || status === 'unavailable') && <>
        <h2 className={styles.title}>{status === 'ended' ? 'Thanks for talking with Amit.' : status === 'mic-denied' ? 'Amit needs your microphone to talk.' : status === 'unavailable' ? 'Talk to Amit on WhatsApp.' : 'Talk to Amit. He’ll find your first job.'}</h2>
        {status === 'idle' && <p className={styles.body}>Two minutes. Amit asks about your business and finds the first job we can take off your plate.</p>}
        {status === 'mic-denied' && <p className={styles.body}>You can chat with him instead, or allow the microphone and try again.</p>}
        {status === 'unavailable' && <p className={styles.body}>Two minutes. Amit asks about your business, finds the first job we can take off your plate, and introduces you to your sherpa.</p>}
        {status === 'ended' && plan && <div className={styles.plan}>
          <p>Here’s how a sherpa would set up <strong>{plan.task.toLowerCase()}</strong>:</p>
          <ol>{plan.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <small>An example plan. We shape it around your business.</small>
        </div>}
        {status === 'ended' && !plan && <p className={styles.body}>A sherpa picks up from here. Continue on WhatsApp so we can follow up.</p>}

        {status !== 'ended' && <div className={styles.topics}>
          <p id="amit-topics">Start with a job:</p>
          <div role="group" aria-labelledby="amit-topics">{FIRST_JOBS.map(job => <button type="button" key={job.task} aria-pressed={task === job.task} onClick={() => dispatch({ type: 'select-task', task: task === job.task ? '' : job.task })}>{job.task}</button>)}</div>
        </div>}

        <div className={styles.actions}>
          {status === 'unavailable'
            ? <a className={styles.primary} href={whatsapp} target="_blank" rel="noopener noreferrer">Message Amit on WhatsApp <span aria-hidden="true">↗</span></a>
            : status === 'ended'
              ? <a className={styles.primary} href={whatsapp} target="_blank" rel="noopener noreferrer">Continue on WhatsApp <span aria-hidden="true">↗</span></a>
              : <button type="button" className={styles.primary} onClick={talk}><Glyph name="mic" />{task ? 'Talk to Amit about this' : 'Talk to Amit'}</button>}
          {status === 'ended' && <button type="button" className={styles.secondary} onClick={talk}>Talk again</button>}
          {status === 'unavailable'
            ? <a className={styles.secondary} href={AMIT_TEL}>Call {AMIT_DISPLAY}</a>
            : status !== 'idle' && <button type="button" className={styles.secondary} onClick={openChat}>Chat with Amit</button>}

        </div>
      </>}

      {inCall && <>
        <h2 className={styles.title}>{status === 'live' ? 'You’re talking to Amit.' : status === 'connecting' ? 'Calling Amit…' : 'Allow your microphone to talk to Amit.'}</h2>
        <div className={styles.transcript} aria-live="polite">
          {state.turns.length ? state.turns.map(turn => <p key={turn.id} data-role={turn.role}><b>{turn.role === 'user' ? 'You' : 'Amit'}</b>{turn.text}</p>)
            : <p className={styles.hint}>{status === 'live' ? 'Say hello. Amit will take it from there.' : 'This takes a moment.'}</p>}
        </div>
        <div className={styles.actions}>
          {status === 'live' && <button type="button" className={styles.control} aria-pressed={state.muted} onClick={() => call.current?.mute(!state.muted)}><Glyph name={state.muted ? 'mic-off' : 'mic'} />{state.muted ? 'Unmute' : 'Mute'}</button>}
          <button type="button" className={`${styles.control} ${styles.end}`} onClick={endCall}><Glyph name="end" />End call</button>
        </div>
      </>}

      {status === 'chat' && <>
        <div className={styles.transcript} aria-live="polite">
          {chat.messages.map(message => <p key={message.id} data-role={message.role}><b>{message.role === 'user' ? 'You' : 'Amit'}</b>{message.text}</p>)}
          {chat.pending && <p data-role="assistant"><b>Amit</b>{chat.streaming || <span className={styles.typing} aria-label="Amit is replying">•••</span>}</p>}
          {!chat.messages.length && !chat.pending && <p className={styles.hint}>Tell Amit what your business does, or the job you’d like to hand over.</p>}
          {chat.error && <p className={styles.error}>{chat.error} <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></p>}
        </div>
        <form className={styles.composer} onSubmit={sendChat}>
          <label className={styles.srOnly} htmlFor="amit-chat">Message Amit</label>
          <input ref={chatInput} id="amit-chat" value={draft} maxLength={400} autoComplete="off" placeholder="Tell Amit what your business does" onChange={event => setDraft(event.target.value)} />
          <button type="submit" disabled={!draft.trim() || chat.pending} aria-label="Send"><Glyph name="send" /></button>
        </form>
        <div className={styles.actions}><button type="button" className={styles.secondary} onClick={backToStart}>Back</button><button type="button" className={styles.secondary} onClick={talk}>Talk instead</button></div>
      </>}

      <p className={styles.notice}>{status === 'unavailable' ? 'Amit is an AI agent built on Eigi.' : <>You’re talking to an AI agent built on Eigi. Your mic is used only during the call. {terms} <a href={TERMS_URL} target="_blank" rel="noopener noreferrer">Read the terms</a></>}</p>
    </div>
  </div>
}
