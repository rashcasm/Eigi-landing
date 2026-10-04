import { useCallback, useEffect, useRef, useState } from 'react'
import { ChatError, chatConfig, connectAgent, sendAgentMessage } from './api.ts'
import type { AgentConnection } from './api.ts'

export type ChatMessage = { id: number; role: 'user' | 'assistant'; text: string }

const ERROR_TEXT = {
  unconfigured: 'Web chat is being connected. You can talk to Amit on WhatsApp now.',
  unavailable: 'Eigi couldn’t connect. Try again, or continue with Amit on WhatsApp.',
  busy: 'Eigi is busy right now. Please try again in a moment.',
  empty: 'Eigi didn’t return a reply. Please try again.',
  terms: 'This agent requires its own welcome flow. Continue with Amit on WhatsApp.',
}

export function useEigiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [streaming, setStreaming] = useState('')
  const connection = useRef<AgentConnection | null>(null)
  const request = useRef<AbortController | null>(null)
  const sequence = useRef(0)
  const lastRequest = useRef('')

  useEffect(() => () => request.current?.abort(), [])

  const send = useCallback(async (input: string, retry = false) => {
    const text = input.trim()
    if (!text || request.current || text.length > 4000) return false
    const controller = new AbortController()
    request.current = controller
    lastRequest.current = text
    setError('')
    setPending(true)
    setStreaming('')
    if (!retry) setMessages(current => [...current, { id: sequence.current++, role: 'user', text }])
    const timeout = window.setTimeout(() => controller.abort('timeout'), 45000)
    try {
      if (!connection.current) connection.current = await connectAgent(chatConfig, controller.signal)
      let reply = ''
      connection.current = await sendAgentMessage(chatConfig, connection.current, text, controller.signal, value => {
        if (!controller.signal.aborted) {
          reply = value
          setStreaming(value)
        }
      })
      if (!controller.signal.aborted) setMessages(current => [...current, { id: sequence.current++, role: 'assistant', text: reply }])
    } catch (cause) {
      if (!controller.signal.aborted || controller.signal.reason === 'timeout') {
        setError(controller.signal.reason === 'timeout' ? 'Eigi took too long to reply. Please try again.' : ERROR_TEXT[cause instanceof ChatError ? cause.kind : 'unavailable'])
        connection.current = null
      }
    } finally {
      window.clearTimeout(timeout)
      if (request.current === controller) {
        request.current = null
        setPending(false)
        setStreaming('')
      }
    }
    return true
  }, [])

  function reset() {
    request.current?.abort()
    request.current = null
    connection.current = null
    setMessages([])
    setError('')
    setStreaming('')
    setPending(false)
  }

  return { messages, pending, error, streaming, send, reset, retry: () => send(lastRequest.current, true) }
}
