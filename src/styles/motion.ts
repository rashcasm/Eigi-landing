import type { MotionProps } from 'motion/react'

/** The site's ease-out, same curve as --ease-out in global.css. */
export const easeOut = [0.2, 0.7, 0.2, 1] as const

/** Spread onto any motion element to fade it up once it scrolls into view. */
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  // brief: the motion confirms that content arrived, it shouldn't make anyone wait for it
  transition: { duration: 0.6, ease: easeOut },
} satisfies MotionProps
