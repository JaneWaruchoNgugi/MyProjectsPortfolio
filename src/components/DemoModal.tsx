import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Laptop, Loader2, RotateCw, Smartphone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projects'
import { host } from '../lib/format'
import { Github } from './ui/BrandIcons'
import { Preview } from './Preview'

/** True when this portfolio is itself shown inside another page, where nested demos are usually blocked. */
const framed = (() => { try { return window.self !== window.top } catch { return true } })()

/** Plays a project's live deployment inside the portfolio, with desktop and phone frames. */
export function DemoModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const [slow, setSlow] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [nonce, setNonce] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    setLoaded(false); setSlow(false)
    setMobile(window.innerWidth >= 640 && window.innerWidth < 1024)
    const t = setTimeout(() => setSlow(true), 8000)
    return () => clearTimeout(t)
  }, [project, nonce])

  useEffect(() => {
    if (!project) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      prev?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project?.url && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-2 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.name} live demo`}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full max-h-[94dvh] w-full max-w-[1400px] flex-col overflow-hidden rounded-2xl border border-line-2 bg-surface shadow-2xl shadow-black"
            initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-3 py-2.5 sm:px-4">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{project.name}</div>
                <div className="truncate font-mono text-[11px] text-dim">{host(project.url)}</div>
              </div>
              <div className="hidden rounded-full border border-line p-0.5 sm:flex">
                {[
                  { m: false, icon: Laptop, label: 'Desktop size' },
                  { m: true, icon: Smartphone, label: 'Phone size' },
                ].map(({ m, icon: Icon, label }) => (
                  <button key={label} type="button" onClick={() => setMobile(m)} aria-pressed={mobile === m} aria-label={label} title={label}
                    className={`grid size-8 place-items-center rounded-full transition ${mobile === m ? 'bg-fg text-bg' : 'text-mute hover:text-fg'}`}>
                    <Icon className="size-4" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setNonce((n) => n + 1)} aria-label="Reload demo" title="Reload"
                className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-surface-2 hover:text-fg">
                <RotateCw className="size-4" aria-hidden="true" />
              </button>
              <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer" aria-label="View source" title="View source"
                className="hidden size-9 place-items-center rounded-full text-mute transition hover:bg-surface-2 hover:text-fg sm:grid">
                <Github className="size-4" />
              </a>
              <a href={project.url} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-ink transition hover:bg-fg">
                <span className="hidden sm:inline">Visit website</span><span className="sm:hidden">Open</span> <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close demo"
                className="grid size-9 place-items-center rounded-full border border-line-2 transition hover:border-fg">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex flex-1 justify-center overflow-hidden bg-bg">
              {framed ? (
                <div className="relative grid w-full place-items-center overflow-hidden p-6">
                  <div className="absolute inset-0 opacity-30 blur-sm"><Preview project={project} className="h-full w-full" /></div>
                  <div className="relative max-w-md rounded-2xl border border-line-2 bg-bg/85 p-8 text-center backdrop-blur-md">
                    <p className="font-display text-2xl font-medium tracking-tight">Open {project.name} to play</p>
                    <p className="mt-3 text-sm leading-relaxed text-mute">
                      This copy of the portfolio is being shown inside another page, which blocks live demos from loading here. On the published site the demo plays right in this window.
                    </p>
                    <a href={project.url} target="_blank" rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition hover:bg-fg">
                      Play on {host(project.url)} <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : (<>
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <div>
                    <Loader2 className="mx-auto size-6 animate-spin text-accent" aria-hidden="true" />
                    <p className="mt-4 text-sm text-mute">Starting {project.name}…</p>
                    {slow && (
                      <p className="mt-2 text-sm text-mute">
                        Taking a while. <a className="text-accent underline underline-offset-4" href={project.url} target="_blank" rel="noreferrer">Open it in a new tab</a> instead.
                      </p>
                    )}
                  </div>
                </div>
              )}
              <motion.iframe
                key={`${project.id}-${nonce}`}
                src={project.url}
                title={`${project.name} live demo`}
                onLoad={() => setLoaded(true)}
                initial={false}
                animate={{ width: mobile ? 400 : '100%', opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`h-full max-w-full bg-white ${mobile ? 'my-4 rounded-[2.2rem] border-[7px] border-surface-2' : ''}`}
                allow="autoplay; fullscreen; clipboard-write; accelerometer; gyroscope"
                allowFullScreen
              />
              </>)}
            </div>
            <p className="border-t border-line px-4 py-2 text-center text-xs text-dim">
              This is the live deployment. If a site refuses to load inside the page, use Visit website.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
