import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { PipecatClientOptions } from '@pipecat-ai/client-js'
import { connectVoice } from './voice.ts'

const sdk = vi.hoisted(() => ({
  options: null as PipecatClientOptions | null,
  init: vi.fn(), connect: vi.fn(), disconnect: vi.fn(), destroy: vi.fn(), mic: vi.fn(), stop: vi.fn(), created: vi.fn(),
}))
vi.mock('@pipecat-ai/client-js', () => ({ PipecatClient: class {
  constructor(options: PipecatClientOptions) { sdk.options = options; sdk.created() }
  initDevices = sdk.init
  connect = sdk.connect
  disconnect = sdk.disconnect
  enableMic = sdk.mic
  tracks() { return { local: { audio: { stop: sdk.stop } } } }
} }))
vi.mock('@pipecat-ai/daily-transport', () => ({ DailyTransport: class { dailyCallClient = { destroy: sdk.destroy } } }))
const config = { agentId: 'public-agent', baseUrl: 'https://example.test' }
const settings = { prompt_access_token: 'test-prompt-token', widget_config: { widget_interface: { enable_chat: true } } }
const audio = () => ({ pause: vi.fn(), play: vi.fn().mockResolvedValue(undefined), srcObject: null }) as unknown as HTMLAudioElement
const options = (controller = new AbortController()) => ({ config, task: 'Chase unpaid invoices', signal: controller.signal, audio: audio(), onEvent: vi.fn() })

beforeEach(() => {
  vi.clearAllMocks()
  sdk.options = null
  sdk.init.mockReset().mockResolvedValue(undefined)
  sdk.connect.mockReset().mockImplementation(async () => { sdk.options?.callbacks?.onBotReady?.({ version: '1.0.0' }) })
  sdk.disconnect.mockReset().mockResolvedValue(undefined)
  sdk.destroy.mockReset().mockResolvedValue(undefined)
})
afterEach(() => vi.unstubAllGlobals())
function mockFetch() {
  const fetch = vi.fn()
    .mockResolvedValueOnce(Response.json(settings))
    .mockResolvedValueOnce(Response.json({ dailyRoom: 'https://example.daily.co/room', dailyToken: 'test-daily-token', conversation_id: 'test-call' }))
  vi.stubGlobal('fetch', fetch)
  return fetch
}

describe('verified Eigi voice transport', () => {
  it('uses the widget handshake and task metadata without creating a chat session', async () => {
    const fetch = mockFetch()
    const args = options()
    const call = await connectVoice(args)
    expect(fetch.mock.calls[0][0]).toBe('https://example.test/v1/widgets/agents/public-agent')
    expect(fetch.mock.calls[1][0]).toBe('https://example.test/v1/widgets/sessions/daily')
    const request = fetch.mock.calls[1][1]
    expect(request.signal).toBe(args.signal)
    expect(request.headers['X-Prompt-Token']).toBe('test-prompt-token')
    expect(JSON.parse(request.body)).toEqual({ agent_id: 'public-agent', prompt_access_token: 'test-prompt-token', conversation_config_type: 'VOICE', conversation_visibility: false, conversation_metadata: { source: 'eigi-homepage', agent_id: 'public-agent', task: 'Chase unpaid invoices' } })
    expect(sdk.connect).toHaveBeenCalledWith({ url: 'https://example.daily.co/room', token: 'test-daily-token' })
    expect(sdk.options).toMatchObject({ enableMic: true, enableCam: false, enableScreenShare: false })
    call.mute(true)
    expect(sdk.mic).toHaveBeenCalledWith(false)
    await call.disconnect()
    await call.disconnect()
    expect(sdk.disconnect).toHaveBeenCalledTimes(1)
    expect(sdk.stop).toHaveBeenCalled()
    expect(sdk.destroy).toHaveBeenCalledTimes(1)
    expect(args.audio.srcObject).toBeNull()
  })
  it('never initializes media without an agent or a public token', async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ widget_config: { widget_interface: { enable_chat: true } } }))
    vi.stubGlobal('fetch', fetch)
    await expect(connectVoice({ ...options(), config: { ...config, agentId: '' } })).rejects.toMatchObject({ kind: 'unconfigured' })
    expect(fetch).not.toHaveBeenCalled()
    await expect(connectVoice(options())).rejects.toMatchObject({ kind: 'unavailable' })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sdk.created).not.toHaveBeenCalled()
  })
  it('does not incorrectly require chat to be enabled for voice', async () => {
    const fetch = mockFetch()
    fetch.mockReset().mockResolvedValueOnce(Response.json({ ...settings, widget_config: { widget_interface: { enable_chat: false } } })).mockResolvedValueOnce(Response.json({ dailyRoom: 'https://example.daily.co/room', dailyToken: 'test-token' }))
    const call = await connectVoice(options())
    await call.disconnect()
  })
  it('releases media on microphone denial without starting a server call', async () => {
    const fetch = mockFetch()
    sdk.init.mockRejectedValueOnce(new DOMException('Denied', 'NotAllowedError'))
    await expect(connectVoice(options())).rejects.toMatchObject({ name: 'NotAllowedError' })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sdk.stop).toHaveBeenCalled()
    expect(sdk.destroy).toHaveBeenCalled()
  })
  it.each([new Response('private error', { status: 500 }), Response.json({ dailyRoom: 'bad' })])('cleans up on a failed or malformed session response', async response => {
    const fetch = mockFetch()
    fetch.mockReset().mockResolvedValueOnce(Response.json(settings)).mockResolvedValueOnce(response)
    await expect(connectVoice(options())).rejects.toMatchObject({ kind: 'unavailable' })
    expect(sdk.destroy).toHaveBeenCalled()
    expect(sdk.connect).not.toHaveBeenCalled()
  })
  it('aborts an active call and ignores late transcripts', async () => {
    mockFetch()
    const controller = new AbortController()
    const args = options(controller)
    const call = await connectVoice(args)
    sdk.options?.callbacks?.onUserTranscript?.({ text: 'A real turn', final: true, user_id: 'test', timestamp: 'test' })
    expect(args.onEvent).toHaveBeenCalledWith({ type: 'transcript', role: 'user', text: 'A real turn' })
    controller.abort()
    await call.disconnect()
    args.onEvent.mockClear()
    sdk.options?.callbacks?.onBotTranscript?.({ text: 'Late turn' })
    expect(args.onEvent).not.toHaveBeenCalled()
    expect(sdk.stop).toHaveBeenCalled()
  })
  it('stops a media track returned after cancellation while permission was pending', async () => {
    const fetch = mockFetch()
    let grant!: () => void
    sdk.init.mockImplementationOnce(() => new Promise<void>(resolve => { grant = resolve }))
    const controller = new AbortController()
    const pending = connectVoice(options(controller))
    await vi.waitFor(() => expect(sdk.init).toHaveBeenCalled())
    controller.abort()
    const stop = vi.fn()
    sdk.options?.callbacks?.onTrackStarted?.({ kind: 'audio', stop } as unknown as MediaStreamTrack, { id: 'test', local: true, name: 'test' })
    grant()
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(stop).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('destroys the transport even if disconnect fails', async () => {
    mockFetch()
    const call = await connectVoice(options())
    sdk.disconnect.mockRejectedValueOnce(new Error('leave failed'))
    await call.disconnect()
    expect(sdk.destroy).toHaveBeenCalled()
  })
})
