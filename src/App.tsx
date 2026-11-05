import Lenis from 'lenis'
import { MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { DemoModal } from './components/DemoModal'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { ProjectIndex } from './components/ProjectIndex'
import { SelectedWork } from './components/SelectedWork'
import { Skills } from './components/Skills'
import { SectionHeader } from './components/ui/Reveal'
import type { Project } from './data/projects'
import { DemoContext } from './lib/demo'

const seenIntro = () => { try { return sessionStorage.getItem('intro') === '1' } catch { return false } }

export default function App() {
  const [demo, setDemo] = useState<Project | null>(null)
  const [ready, setReady] = useState(seenIntro)
  const close = useCallback(() => setDemo(null), [])
  const finishIntro = useCallback(() => {
    setReady(true)
    try { sessionStorage.setItem('intro', '1') } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ anchors: { offset: -64 }, lerp: 0.1 })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <DemoContext.Provider value={setDemo}>
        <div className="noise">
          {!ready && <Loader onDone={finishIntro} />}
          <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
            Skip to projects
          </a>
          <Nav />
          <main>
            <Hero ready={ready} />
            <About />
            <section id="projects" className="gutter scroll-mt-16 py-28 sm:py-40">
              <div className="mx-auto max-w-[1400px]">
                <SectionHeader index="02" label="Projects" title="Selected work you can play right now."
                  intro="Highlights from the last year. Every card opens the real deployed build inside this page, links to the live site and shows the source." />
                <SelectedWork />
                <ProjectIndex />
                <Journey />
              </div>
            </section>
            <Skills />
            <Contact />
          </main>
          <DemoModal project={demo} onClose={close} />
        </div>
      </DemoContext.Provider>
    </MotionConfig>
  )
}
