import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { ReactNode, PointerEvent } from 'react'

/** Gently pulls its child toward the pointer. Disabled for touch and reduced motion. */
export function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  return (
    <motion.div className={className || 'inline-block'} style={{ x, y }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.div>
  )
}
