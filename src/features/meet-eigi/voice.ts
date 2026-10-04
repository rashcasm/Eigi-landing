import { ChatError, getAgent, type ChatConfig } from './api.ts'
import type { OnboardingEvent } from './utils/onboarding.ts'

export type VoiceCall = { mute: (muted: boolean) => void; disconnect: () => Promise<void> }
type VoiceOptions = {
  config: ChatConfig; task: string; signal: AbortSignal; audio: HTMLAudioElement
  onEvent: (event: OnboardingEvent) => void
}

/** Verified against the official Eigi widget. Called only after pressing Talk, next to the agent's terms notice. */
export async function connectVoice({ config, task, signal, audio, onEvent }: VoiceOptions): Promise<VoiceCall> {
  signal.throwIfAborted()
  const { token } = await getAgent(config, signal)
  signal.throwIfAborted()
  const [{ PipecatClient }, { DailyTransport }] = await Promise.all([
    import('@pipecat-ai/client-js'), import('@pipecat-ai/daily-transport'),
  ])
  signal.throwIfAborted()
  const transport = new DailyTransport({ bufferLocalAudioUntilBotReady: false })
  const tracks = new Set<MediaStreamTrack>()
  let closed = false
  let ready = false
  let closing: Promise<void> | undefined
  const emit = (event: OnboardingEvent) => { if (!closed && !signal.aborted) onEvent(event) }
  const client = new PipecatClient({
    transport, enableMic: true, enableCam: false, enableScreenShare: false,
    callbacks: {
      onBotReady: () => { ready = true; emit({ type: 'ready' }) },
      onBotStartedSpeaking: () => emit({ type: 'speaking', speaking: true }),
      onBotStoppedSpeaking: () => emit({ type: 'speaking', speaking: false }),
      onLocalAudioLevel: level => emit({ type: 'level', source: 'user', level }),
      onRemoteAudioLevel: level => emit({ type: 'level', source: 'assistant', level }),
      onUserTranscript: data => { if (data.final) emit({ type: 'transcript', role: 'user', text: data.text }) },
      onBotTranscript: data => emit({ type: 'transcript', role: 'assistant', text: data.text }),
      onTrackStarted: (track, participant) => {
        tracks.add(track)
        if (closed || signal.aborted) { track.stop(); return }
        if (track.kind === 'audio' && participant && !participant.local) {
          audio.srcObject = new MediaStream([track])
          void audio.play().catch(fail)
        }
      },
      onTrackStopped: track => tracks.delete(track),
      onBotDisconnected: finish,
      onDisconnected: finish,
      onError: fail,
    },
  })

  function finish() {
    if (closed) return
    emit({ type: ready ? 'end' : 'unavailable' })
    void disconnect()
  }
  function fail() {
    if (closed) return
    emit({ type: 'unavailable' })
    void disconnect()
  }
  function stopTracks() {
    tracks.forEach(track => track.stop())
    // Tracks can already exist while initDevices is awaiting permissions/observers.
    try { Object.values(client.tracks().local).forEach(track => track?.stop()) } catch { /* Transport may already be destroyed. */ }
    audio.pause()
    audio.srcObject = null
  }
  function disconnect(): Promise<void> {
    closed = true
    stopTracks()
    signal.removeEventListener('abort', abort)
    if (!closing) closing = (async () => {
      try { await client.disconnect() } catch { /* Always destroy and stop media, even if leaving fails. */ }
      finally {
        stopTracks()
        await transport.dailyCallClient.destroy().catch(() => {})
      }
    })()
    return closing
  }
  function abort() { void disconnect() }
  signal.addEventListener('abort', abort, { once: true })
  try {
    signal.throwIfAborted()
    await client.initDevices()
    signal.throwIfAborted()
    if (closed) throw new ChatError('unavailable')
    emit({ type: 'connecting' })
    const response = await fetch(`${config.baseUrl}/v1/widgets/sessions/daily`, {
      method: 'POST', signal,
      headers: { 'Content-Type': 'application/json', 'X-Prompt-Token': token },
      body: JSON.stringify({
        agent_id: config.agentId, prompt_access_token: token,
        conversation_metadata: { source: 'eigi-homepage', agent_id: config.agentId, ...(task ? { task } : {}) },
        conversation_visibility: false, conversation_config_type: 'VOICE',
      }),
    })
    if (!response.ok) throw new ChatError('unavailable')
    const session = await response.json()
    if (typeof session.dailyRoom !== 'string' || !session.dailyRoom.startsWith('https://') || typeof session.dailyToken !== 'string' || !session.dailyToken) throw new ChatError('unavailable')
    signal.throwIfAborted()
    await client.connect({ url: session.dailyRoom, token: session.dailyToken })
    signal.throwIfAborted()
    if (closed) throw new ChatError('unavailable')
    return { mute: muted => {
      if (closed) return
      client.enableMic(!muted)
      emit({ type: 'mic', enabled: !muted })
    }, disconnect }
  } catch (error) {
    await disconnect()
    throw error
  }
}
