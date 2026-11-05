import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { Magnetic } from './ui/Magnetic'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

function useActiveSection() {
  const [active, setActive] = useState<string>('home')
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function Nav() {
  const active = useActiveSection()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`gutter fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? 'border-b border-line bg-bg/70 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between">
          <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
            <span className="relative grid size-8 place-items-center overflow-hidden rounded-full border border-line-2 font-display text-sm font-semibold">
              <span className="transition duration-500 group-hover:-translate-y-8">JN</span>
              <span className="absolute translate-y-8 text-accent transition duration-500 group-hover:translate-y-0">JN</span>
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur-md">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-1.5 text-sm transition-colors ${active === s.id ? 'text-bg' : 'text-mute hover:text-fg'}`}>
                    {active === s.id && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-block">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition hover:bg-fg">
                Get in touch
              </a>
            </Magnetic>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
              className="relative grid size-10 place-items-center rounded-full border border-line-2 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
              <span className={`absolute h-px w-4 bg-fg transition duration-300 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
              <span className={`absolute h-px w-4 bg-fg transition duration-300 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="gutter fixed inset-0 z-40 flex flex-col bg-bg pb-10 pt-24 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {sections.map((s, i) => (
                <li key={s.id} className="overflow-hidden">
                  <motion.a href={`#${s.id}`} onClick={() => setOpen(false)}
                    initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.05 }}
                    className={`flex items-baseline gap-4 font-display text-5xl font-medium tracking-tight ${active === s.id ? 'text-accent' : ''}`}>
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>{s.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="label flex justify-between border-t border-line pt-5">
              <span>{profile.location}</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-fg">GitHub ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
