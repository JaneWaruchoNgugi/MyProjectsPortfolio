import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Play, Search } from 'lucide-react'
import { useMemo, useState, type PointerEvent } from 'react'
import { numberOf, sorted, type Category, type Project } from '../data/projects'
import { useOpenDemo } from '../lib/demo'
import { monthLabel } from '../lib/format'
import { Preview } from './Preview'
import { Github } from './ui/BrandIcons'

const filters: (Category | 'All')[] = ['All', 'Game', 'Fintech', 'Platform', 'Client site', 'Backend']
const PAGE = 12

/** Every project as a scannable list. Hovering a row on desktop floats its preview beside the cursor. */
export function ProjectIndex() {
  const openDemo = useOpenDemo()
  const [filter, setFilter] = useState<Category | 'All'>('All')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState<Project | null>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...sorted].reverse().filter((p) =>
      (filter === 'All' || p.category === filter) &&
      (!q || [p.name, p.summary, p.category, ...p.stack].join(' ').toLowerCase().includes(q)))
  }, [filter, query])
  const shown = expanded || query ? list : list.slice(0, PAGE)
  const count = (f: Category | 'All') => (f === 'All' ? sorted.length : sorted.filter((p) => p.category === f).length)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    x.set(e.clientX + 24); y.set(e.clientY - 110)
  }

  return (
    <div className="mt-32">
      <div className="flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="label">Full index</div>
          <h3 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            All {sorted.length} projects
          </h3>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block">
            <span className="sr-only">Search projects</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-dim" aria-hidden="true" />
            <input id="project-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or tech"
              className="w-full rounded-full border border-line-2 bg-surface py-2 pl-10 pr-4 text-sm placeholder:text-dim focus:border-accent focus:outline-none sm:w-56" />
          </label>
        </div>
      </div>

      <LayoutGroup id="index-filters">
        <div className="-mx-5 mt-6 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="toolbar" aria-label="Filter projects by category">
          <div className="flex w-max gap-1.5">
            {filters.map((f) => (
              <button key={f} type="button" onClick={() => { setFilter(f); setExpanded(false) }} aria-pressed={filter === f}
                className={`relative rounded-full border px-4 py-1.5 text-sm transition-colors ${filter === f ? 'border-transparent text-bg' : 'border-line-2 text-mute hover:text-fg'}`}>
                {filter === f && <motion.span layoutId="idx-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{f === 'All' ? 'All' : f === 'Client site' ? 'Client sites' : f === 'Platform' ? 'Platforms' : f === 'Game' ? 'Games' : f}</span>
                <span className="relative ml-1.5 font-mono text-[10px] opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>
        </div>
      </LayoutGroup>

      <div className="mt-8" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
        <div className="label hidden grid-cols-12 gap-4 border-b border-line pb-3 md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-4">Project</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-2">Created</span>
          <span className="col-span-3 text-right">Open</span>
        </div>
        <ul>
          <AnimatePresence initial={false}>
            {shown.map((p) => (
              <motion.li key={p.id} layout="position"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'mouse') return
                  if (!hovered) { x.jump(e.clientX + 24); y.jump(e.clientY - 110) }
                  setHovered(p)
                }}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line py-5 md:grid-cols-12 md:gap-4">
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                <span className="tabular relative font-mono text-xs text-dim transition group-hover:text-accent md:col-span-1">{numberOf(p)}</span>
                <div className="relative min-w-0 md:col-span-4">
                  <div className="truncate text-lg font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-xl">{p.name}</div>
                  <div className="mt-1 truncate font-mono text-[11px] text-dim">{p.stack.join(' · ')}</div>
                </div>
                <span className="relative col-start-2 text-sm text-mute md:hidden">{p.category} · {monthLabel(p.created)}</span>
                <span className="relative hidden text-sm text-mute md:col-span-2 md:block">{p.category}</span>
                <span className="tabular relative hidden text-sm text-mute md:col-span-2 md:block">{monthLabel(p.created)}</span>
                <div className="relative col-start-3 row-span-3 row-start-1 flex items-center justify-end gap-1 md:col-span-3 md:col-start-auto md:row-auto">
                  {p.url && (
                    <button type="button" onClick={() => openDemo(p)} aria-label={`Play ${p.name} demo`} title="Play demo"
                      className="grid size-10 place-items-center rounded-full border border-line-2 transition hover:border-accent hover:bg-accent hover:text-accent-ink">
                      <Play className="size-3.5 fill-current" aria-hidden="true" />
                    </button>
                  )}
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Visit ${p.name} website`} title="Visit website"
                      className="grid size-10 place-items-center rounded-full border border-line-2 transition hover:border-fg">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  <a href={`https://github.com/${p.repo}`} target="_blank" rel="noreferrer" aria-label={`View ${p.name} source on GitHub`} title="View source"
                    className="grid size-10 place-items-center rounded-full border border-line-2 transition hover:border-fg">
                    <Github className="size-4" />
                  </a>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {list.length === 0 && <p className="py-10 text-mute">No projects match “{query}”. Try a technology like React or Firebase.</p>}
      </div>

      {!query && list.length > PAGE && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setExpanded((e) => !e)}
            className="rounded-full border border-line-2 px-6 py-3 text-sm transition hover:border-fg">
            {expanded ? 'Show fewer' : `Show all ${list.length} projects`}
          </button>
        </div>
      )}

      <AnimatePresence>
        {hovered && (
          <motion.div key="float" className="pointer-events-none fixed left-0 top-0 z-30 hidden w-80 overflow-hidden rounded-xl border border-line-2 shadow-2xl shadow-black/60 lg:block"
            style={{ x, y }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={hovered.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Preview project={hovered} className="aspect-[16/10]" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
