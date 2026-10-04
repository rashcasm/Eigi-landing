import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { createCrowd, type Crowd } from '../utils/crowd.ts'
import { spriteUrl } from '../utils/peeps.ts'

export type CrowdStatus = 'loading' | 'ready' | 'error'

/**
 * Runs the base-camp crowd on a canvas: loads the sprite, keeps the crowd sized to the canvas,
 * and walks it only while it is on screen (and the user allows motion).
 */
export function useCrowd(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const crowdRef = useRef<Crowd | null>(null)
  const [status, setStatus] = useState<CrowdStatus>('loading')
  const onScreen = useInView(canvasRef)
  // the sprite is heavy and the crowd lives at the bottom of the page: fetch it only once it is close
  const near = useInView(canvasRef, { once: true, margin: '0px 0px 800px 0px' })
  const still = useReducedMotion()

  useEffect(() => {
    if (!near) return
    const canvas = canvasRef.current!
    const img = new Image()
    let observer: ResizeObserver | undefined
    img.onload = () => {
      const crowd = createCrowd(img)
      crowdRef.current = crowd
      observer = new ResizeObserver(() => {
        canvas.width = canvas.clientWidth * devicePixelRatio
        canvas.height = canvas.clientHeight * devicePixelRatio
        crowd.resize(canvas.clientWidth, canvas.clientHeight)
        crowd.draw(canvas.getContext('2d')!, devicePixelRatio)
      })
      observer.observe(canvas)
      setStatus('ready')
    }
    img.onerror = () => setStatus('error')
    img.src = spriteUrl
    return () => {
      img.onload = img.onerror = null
      observer?.disconnect()
    }
  }, [canvasRef, near])

  useEffect(() => {
    const crowd = crowdRef.current
    if (status !== 'ready' || !onScreen || still || !crowd) return
    const ctx = canvasRef.current!.getContext('2d')!
    let last = performance.now()
    let raf = requestAnimationFrame(function frame(now) {
      crowd.tick(Math.min(0.1, (now - last) / 1000)) // cap the jump after a background tab
      last = now
      crowd.draw(ctx, devicePixelRatio)
      raf = requestAnimationFrame(frame)
    })
    return () => cancelAnimationFrame(raf)
  }, [canvasRef, status, onScreen, still])

  /** Gives a sherpa to the peep at `at` (canvas px), or to a random one, and repaints. True if someone new was chosen. */
  const choose = (at?: { x: number; y: number }) => {
    const crowd = crowdRef.current
    if (!crowd) return false
    const picked = at ? crowd.pickAt(at.x, at.y) : crowd.pickAny()
    if (picked) crowd.draw(canvasRef.current!.getContext('2d')!, devicePixelRatio)
    return picked
  }

  return { status, choose }
}
