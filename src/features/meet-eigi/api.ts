/** Public widget transport, verified against the official Eigi widget (@cliniq360/eigi-widget). */
export type AgentConnection = { token: string; sessionId?: string }
export type ChatConfig = { agentId: string; baseUrl: string }
/** What the homepage needs to know before a visitor talks to the agent. */
export type AgentInfo = { token: string; terms: string; chat: boolean }

/** Amit, the public website onboarding agent. Override with VITE_EIGI_AGENT_ID. */
const AMIT_AGENT_ID = '6ac25521e59d6468337ceab9'
export const DEFAULT_TERMS = 'By talking to Amit, you agree to the terms and conditions.'

export const chatConfig: ChatConfig = {
  agentId: import.meta.env.VITE_EIGI_AGENT_ID?.trim() || AMIT_AGENT_ID,
  baseUrl: 'https://api.eigi.ai',
}

type ErrorKind = 'unconfigured' | 'unavailable' | 'busy' | 'empty'

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

/**
 * Like the official widget, the agent's terms are a notice the visitor accepts by starting a conversation.
 * The UI must show `terms` beside every Talk and Chat action.
 */
export async function getAgent(config: ChatConfig, signal: AbortSignal): Promise<AgentInfo> {
  if (!config.agentId) throw new ChatError('unconfigured')
  const response = await fetch(`${config.baseUrl}/v1/widgets/agents/${encodeURIComponent(config.agentId)}`, { signal })
  checkResponse(response)
  const data = await response.json()
  if (typeof data.prompt_access_token !== 'string' || !data.prompt_access_token) throw new ChatError('unavailable')
  const tnc = data.widget_config?.widget_tnc_config
  const terms = tnc?.tnc_enabled ? (typeof tnc.tnc_content === 'string' && tnc.tnc_content.trim()) || DEFAULT_TERMS : ''
  return { token: data.prompt_access_token, terms, chat: data.widget_config?.widget_interface?.enable_chat !== false }
}

export async function connectAgent(config: ChatConfig, signal: AbortSignal): Promise<AgentConnection> {
  const { token, chat } = await getAgent(config, signal)
  if (!chat) throw new ChatError('unavailable')
  const sessionResponse = await fetch(`${config.baseUrl}/v1/widgets/chat/sessions?agent_id=${encodeURIComponent(config.agentId)}`, {
    method: 'POST', signal, headers: { 'X-Prompt-Token': token },
  })
  checkResponse(sessionResponse)
  const session = await sessionResponse.json()
  if (typeof session.session_id !== 'string' || !session.session_id) throw new ChatError('unavailable')
  return { token, sessionId: session.session_id }
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
