import { motion } from 'framer-motion'
import { Boxes, Braces, Cloud, MonitorSmartphone, Server } from 'lucide-react'
import type { PointerEvent } from 'react'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { SectionHeader } from './ui/Reveal'

const icons = [Braces, MonitorSmartphone, Boxes, Server, Cloud]

function usedIn(tech: string) {
  return projects.filter((p) => p.stack.includes(tech))
}

function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Skills() {
  const max = Math.max(...skillGroups.flatMap((g) => g.items.map((t) => usedIn(t).length)))
  return (
    <section id="skills" className="gutter scroll-mt-16 py-28 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader index="03" label="Skills" title="The toolkit behind the work."
          intro="Only tools used in the projects above, with a count of how many projects use each one." />

        <div className="mt-20 grid gap-4 md:grid-cols-6">
          {skillGroups.map((g, gi) => {
            const Icon = icons[gi]
            const items = g.items.map((t) => ({ t, list: usedIn(t) })).filter((x) => x.list.length).sort((a, b) => b.list.length - a.list.length)
            return (
              <motion.article
                key={g.title}
                onPointerMove={spotlight}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (gi % 3) * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-line-2 sm:p-7 ${gi < 3 ? 'md:col-span-2' : 'md:col-span-3'}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgb(232 184 107 / 0.09), transparent 60%)' }} />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-2 text-accent transition duration-500 group-hover:rotate-[-8deg] group-hover:border-accent/50">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="label">{items.length} tools</span>
                </div>
                <h3 className="relative mt-6 text-xl font-medium tracking-tight">{g.title}</h3>
                <p className="relative mt-1 text-sm text-mute">{g.blurb}</p>
                <ul className="relative mt-6 grid gap-1">
                  {items.map(({ t, list }) => (
                    <li key={t} title={list.map((p) => p.name).join(', ')}
                      className="group/row grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-surface-2">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="truncate text-sm">{t}</span>
                        <span className="hidden h-px flex-1 bg-line sm:block">
                          <span className="block h-px origin-left bg-accent/70 transition-transform duration-700 group-hover/row:scale-x-100"
                            style={{ width: `${(list.length / max) * 100}%`, transform: 'scaleX(0.35)' }} />
                        </span>
                      </span>
                      <span className="tabular font-mono text-xs text-mute">{list.length} {list.length === 1 ? 'project' : 'projects'}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
