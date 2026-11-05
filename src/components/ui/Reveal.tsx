import { motion, type HTMLMotionProps } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/** Fades and lifts children into place once they scroll into view. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Splits a line into words that rise out of a mask one after another. */
export function SplitWords({ text, className = '', delay = 0, accent = [] as string[], inView = false }: {
  text: string; className?: string; delay?: number; accent?: string[]; inView?: boolean
}) {
  const words = text.split(' ')
  const trigger = inView
    ? { whileInView: { y: '0%' }, viewport: { once: true, margin: '-10% 0px' } }
    : { animate: { y: '0%' } }
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
          <motion.span
            className={`inline-block ${accent.includes(w.replace(/[^\w']/g, '')) ? 'text-accent' : ''}`}
            initial={{ y: '110%' }}
            {...trigger}
            transition={{ duration: 1, ease, delay: delay + i * 0.045 }}
          >
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SectionHeader({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-12">
      <div className="label flex gap-3 md:col-span-3">
        <span className="text-accent">{index}</span>
        <span>{label}</span>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display text-[2.4rem] font-medium leading-[1] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          <SplitWords text={title} inView />
        </h2>
        {intro && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
