import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

/** A short intro curtain: a counter runs to 100 while fonts load, then the panel lifts away. */
export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [leaving, setLeaving] = useState(false)
  const n = useMotionValue(0)
  const label = useTransform(n, (v) => String(Math.round(v)).padStart(3, '0'))

  useEffect(() => {
    if (reduce) { onDone(); return }
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const run = animate(n, 100, { duration: 1.3, ease: [0.65, 0, 0.35, 1] })
    Promise.all([run.then(() => {}), fonts]).then(() => setLeaving(true))
    return () => run.stop()
  }, [n, reduce, onDone])

  if (reduce) return null
  return (
    <motion.div
      className="gutter fixed inset-0 z-[80] flex flex-col justify-between bg-bg py-8"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && onDone()}
      aria-hidden="true"
    >
      <div className="label flex justify-between">
        <span>{profile.name}</span>
        <span>Portfolio 2025–26</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-2xl font-medium tracking-tight text-mute sm:text-3xl">Loading the work</span>
        <motion.span className="tabular font-display text-[22vw] font-medium leading-[0.8] tracking-[-0.06em] sm:text-[14vw]">{label}</motion.span>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-px bg-accent" style={{ width: useTransform(n, (v) => `${v}%`) }} />
    </motion.div>
  )
}
