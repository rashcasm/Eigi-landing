/** Public widget transport, verified against @cliniq360/eigi-widget 1.2.3. */
export type AgentConnection = { token: string; sessionId?: string }
export type ChatConfig = { agentId: string; baseUrl: string }

export const chatConfig: ChatConfig = {
  agentId: import.meta.env.VITE_EIGI_AGENT_ID?.trim() ?? '',
  baseUrl: (import.meta.env.VITE_EIGI_API_URL?.trim() || 'https://api.eigi.ai').replace(/\/$/, ''),
}

type ErrorKind = 'unconfigured' | 'unavailable' | 'busy' | 'empty' | 'terms'

export class ChatError extends Error {
  readonly kind: ErrorKind
  constructor(kind: ErrorKind) {
    super(kind)
    this.kind = kind
  }
}

function checkResponse(response: Response) {
  if (!response.ok) throw new ChatError(response.status === 429 ? 'busy' : 'unavailable')
}

export async function connectAgent(config: ChatConfig, signal: AbortSignal): Promise<AgentConnection> {
  if (!config.agentId) throw new ChatError('unconfigured')
  const response = await fetch(`${config.baseUrl}/v1/widgets/agents/${encodeURIComponent(config.agentId)}`, { signal })
  checkResponse(response)
  const data = await response.json()
  if (typeof data.prompt_access_token !== 'string' || !data.prompt_access_token) throw new ChatError('unavailable')
  if (data.widget_config?.widget_interface?.enable_chat === false) throw new ChatError('unavailable')
  // Configured legal gates must be handled by the official widget, never silently bypassed.
  if (data.widget_config?.widget_tnc_config?.tnc_enabled) throw new ChatError('terms')
  const sessionResponse = await fetch(`${config.baseUrl}/v1/widgets/chat/sessions?agent_id=${encodeURIComponent(config.agentId)}`, {
    method: 'POST', signal, headers: { 'X-Prompt-Token': data.prompt_access_token },
  })
  checkResponse(sessionResponse)
  const session = await sessionResponse.json()
  if (typeof session.session_id !== 'string' || !session.session_id) throw new ChatError('unavailable')
  return { token: data.prompt_access_token, sessionId: session.session_id }
}

export async function sendAgentMessage(
  config: ChatConfig,
  connection: AgentConnection,
  message: string,
  signal: AbortSignal,
  onText: (text: string) => void,
): Promise<AgentConnection> {
  const response = await fetch(`${config.baseUrl}/v1/widgets/chat/messages`, {
    method: 'POST', signal,
    headers: { 'Content-Type': 'application/json', 'X-Prompt-Token': connection.token },
    body: JSON.stringify({
      agent_id: config.agentId, session_id: connection.sessionId ?? null,
      message, metadata: { source: 'eigi-homepage', agent_id: config.agentId },
    }),
  })
  checkResponse(response)
  if (!response.body) throw new ChatError('empty')
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let text = ''
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) break
      text += decoder.decode(chunk.value, { stream: true })
      onText(text)
    }
    text += decoder.decode()
    if (!text.trim()) throw new ChatError('empty')
    onText(text)
  } finally {
    reader.releaseLock()
  }
  return { token: connection.token, sessionId: response.headers.get('X-Session-ID') || connection.sessionId }
}
