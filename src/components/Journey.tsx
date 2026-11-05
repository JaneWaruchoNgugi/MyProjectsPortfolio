import { motion, useScroll, useSpring } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { chapters } from '../data/journey'
import { profile } from '../data/profile'
import { sorted, type Project } from '../data/projects'
import { useOpenDemo } from '../lib/demo'
import { dayLabel, monthLabel } from '../lib/format'

const ease = [0.16, 1, 0.3, 1] as const

function Milestone({ p, i }: { p: Project; i: number }) {
  const openDemo = useOpenDemo()
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease, delay: Math.min(i, 4) * 0.05 }}
      className="group relative pb-8 pl-8 last:pb-0 sm:pl-10"
    >
      <span className={`absolute left-[-4.5px] top-2 size-[10px] rounded-full border-2 border-bg transition-transform duration-500 group-hover:scale-150 ${p.featured ? 'bg-accent' : 'bg-fg/60'}`} />
      <time dateTime={p.created} className="tabular font-mono text-xs text-dim">{dayLabel(p.created)}</time>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="text-xl font-medium tracking-tight">{p.name}</h4>
        <span className="label">{p.category}</span>
      </div>
      <p className="mt-1.5 max-w-xl text-mute">{p.summary}</p>
      {p.url && (
        <button type="button" onClick={() => openDemo(p)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg/80 underline-offset-4 transition hover:text-accent hover:underline">
          <Play className="size-3 fill-current" aria-hidden="true" /> Play demo
        </button>
      )}
    </motion.li>
  )
}

/** A vertical rail that fills with the accent as the reader scrolls through its milestones. */
function ChapterLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  return (
    <div ref={ref} className="relative md:col-span-8 md:col-start-5">
      <div className="absolute bottom-0 left-0 top-2 w-px bg-line-2" />
      <motion.div style={{ scaleY: fill }} className="absolute bottom-0 left-0 top-2 w-px origin-top bg-accent" />
      <ol className="relative">{children}</ol>
    </div>
  )
}

export function Journey() {
  const list = sorted.filter((p) => p.created >= profile.joined)

  return (
    <div id="journey" className="mt-40 scroll-mt-20">
      <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-12">
        <div className="label md:col-span-3">Journey</div>
        <div className="md:col-span-9">
          <h3 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">How the work evolved</h3>
          <p className="mt-4 max-w-xl text-lg text-mute">
            Every project in order, from {monthLabel(list[0].created)} to {monthLabel(list[list.length - 1].created)}, dated by the day its repository was created.
          </p>
        </div>
      </div>

      <div className="relative mt-16">
        {chapters.map((c, ci) => {
          const items = list.filter((p) => p.created >= c.from && p.created <= c.to)
          if (!items.length) return null
          return (
            <section key={c.title} aria-labelledby={`ch-${ci}`} className="grid gap-8 pb-20 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-4 lg:col-span-3">
                <div className="md:sticky md:top-28">
                  <div className="font-display text-6xl font-medium tracking-tight text-accent/90 sm:text-7xl">0{ci + 1}</div>
                  <h4 id={`ch-${ci}`} className="mt-3 text-2xl font-medium tracking-tight">{c.title}</h4>
                  <div className="label mt-2">{monthLabel(c.from)} – {monthLabel(items[items.length - 1].created)} · {items.length} projects</div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">{c.text}</p>
                </div>
              </div>
              <ChapterLine>
                {items.map((p, i) => <Milestone key={p.id} p={p} i={i} />)}
              </ChapterLine>
            </section>
          )
        })}
      </div>
    </div>
  )
}
