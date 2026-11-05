import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { featured, numberOf, type Project } from '../data/projects'
import { useOpenDemo } from '../lib/demo'
import { monthLabel } from '../lib/format'
import { ActionLinks } from './ActionLinks'
import { Preview } from './Preview'

const ease = [0.16, 1, 0.3, 1] as const

function FeatureCard({ p, i, wide }: { p: Project; i: number; wide?: boolean }) {
  const openDemo = useOpenDemo()
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, ease, delay: (i % 2) * 0.1 }}
      className={`group ${wide ? 'md:col-span-2' : ''} ${!wide && i % 2 === 0 ? 'md:mt-24' : ''}`}
    >
      <button
        type="button"
        onClick={() => p.url && openDemo(p)}
        disabled={!p.url}
        aria-label={`Play ${p.name} demo`}
        className="relative block w-full overflow-hidden rounded-2xl border border-line bg-surface text-left"
      >
        <div className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
          <Preview project={p} className={wide ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[16/10]'} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-6 p-6 opacity-0 transition duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 md:block lg:p-8">
          <p className="max-w-lg text-base leading-relaxed text-fg/90">{p.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-mono text-[11px] text-fg/80 backdrop-blur">{t}</li>
            ))}
          </ul>
        </div>
        <span className="absolute right-4 top-4 grid size-12 scale-75 place-items-center rounded-full bg-accent text-accent-ink opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </button>

      <div className="mt-5 grid gap-3">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
          <h3 className="flex items-baseline gap-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
            <span className="font-mono text-xs text-accent">{numberOf(p)}</span>
            {p.name}
          </h3>
          <span className="label shrink-0">{p.category} · {monthLabel(p.created)}</span>
        </div>
        <p className="text-mute md:hidden">{p.summary}</p>
        <div className="transition duration-500 md:translate-y-1 md:group-hover:translate-y-0">
          <ActionLinks project={p} compact />
        </div>
      </div>
    </motion.article>
  )
}

export function SelectedWork() {
  return (
    <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
      {featured.map((p, i) => <FeatureCard key={p.id} p={p} i={i} wide={i === 0} />)}
    </div>
  )
}
