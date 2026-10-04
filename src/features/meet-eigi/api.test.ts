import { afterEach, describe, expect, it, vi } from 'vitest'
import { ChatError, connectAgent, sendAgentMessage } from './api.ts'

const config = { agentId: 'public-agent', baseUrl: 'https://example.test' }
const signal = () => new AbortController().signal
const connection = { token: 'public-widget-test-token', sessionId: 'visitor-session' }
afterEach(() => vi.unstubAllGlobals())

describe('Eigi public chat transport', () => {
  it('requires a real configured agent and never invents a reply', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    await expect(connectAgent({ ...config, agentId: '' }, signal())).rejects.toMatchObject({ kind: 'unconfigured' })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('creates an isolated visitor session with the public widget token', async () => {
    const fetch = vi.fn()
      .mockResolvedValueOnce(Response.json({ prompt_access_token: connection.token, widget_config: { widget_interface: { enable_chat: true } } }))
      .mockResolvedValueOnce(Response.json({ session_id: 'new-session' }))
    vi.stubGlobal('fetch', fetch)
    expect(await connectAgent(config, signal())).toEqual({ token: connection.token, sessionId: 'new-session' })
    expect(fetch.mock.calls[1][0]).toBe('https://example.test/v1/widgets/chat/sessions?agent_id=public-agent')
    expect(fetch.mock.calls[1][1].headers).toEqual({ 'X-Prompt-Token': connection.token })
  })

  it.each([
    { widget_interface: { enable_chat: false } },
    { widget_tnc_config: { tnc_enabled: true } },
  ])('does not bypass the agent’s chat or consent settings', async widget_config => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ prompt_access_token: connection.token, widget_config }))
    vi.stubGlobal('fetch', fetch)
    await expect(connectAgent(config, signal())).rejects.toBeInstanceOf(ChatError)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('streams arbitrary agent text across split UTF-8 chunks and retains its session', async () => {
    const bytes = new TextEncoder().encode('Here’s your café follow-up.')
    const stream = new ReadableStream({ start(controller) {
      for (const byte of bytes) controller.enqueue(new Uint8Array([byte]))
      controller.close()
    } })
    const fetch = vi.fn().mockResolvedValue(new Response(stream, { headers: { 'X-Session-ID': 'returned-session' } }))
    vi.stubGlobal('fetch', fetch)
    const onText = vi.fn()
    const abortSignal = signal()
    expect(await sendAgentMessage(config, connection, 'Draft my reply', abortSignal, onText)).toEqual({ token: connection.token, sessionId: 'returned-session' })
    expect(onText).toHaveBeenLastCalledWith('Here’s your café follow-up.')
    const request = fetch.mock.calls[0][1]
    expect(request.signal).toBe(abortSignal)
    expect(JSON.parse(request.body)).toMatchObject({ message: 'Draft my reply', session_id: 'visitor-session', agent_id: 'public-agent' })
  })

  it('returns a safe error for rate limits and never renders upstream details', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('private upstream details', { status: 429 })))
    await expect(sendAgentMessage(config, connection, 'Hello', signal(), vi.fn())).rejects.toMatchObject({ kind: 'busy', message: 'busy' })
  })

  it('rejects empty replies', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('  ')))
    await expect(sendAgentMessage(config, connection, 'Hello', signal(), vi.fn())).rejects.toMatchObject({ kind: 'empty' })
  })
})
