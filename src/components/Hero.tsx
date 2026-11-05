import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { monthsBetween } from '../lib/format'
import { HeroCanvas } from './HeroCanvas'
import { Github, Linkedin } from './ui/BrandIcons'
import { Magnetic } from './ui/Magnetic'
import { SplitWords } from './ui/Reveal'

const ease = [0.16, 1, 0.3, 1] as const

function useLocalTime(tz: string) {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000)
    return () => clearInterval(id)
  })
  return time
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const time = useLocalTime(profile.timeZone)
  const delay = ready ? 0 : 99

  const stats = [
    { n: projects.length, l: 'Projects shipped' },
    { n: projects.filter((p) => p.category === 'Game').length, l: 'Playable games' },
    { n: projects.filter((p) => p.url).length, l: 'Live deployments' },
    { n: monthsBetween(profile.joined, new Date()), l: `Months at ${profile.company}` },
  ]

  return (
    <section id="home" ref={ref} className="gutter relative overflow-hidden pb-10 pt-28 sm:pt-32">
      <HeroCanvas />
      <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]" />

      <motion.div style={{ y, opacity: fade }} className="relative mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.1 }}
          className="label grid grid-cols-2 gap-y-3 border-b border-line pb-5 md:grid-cols-12"
        >
          <span className="hidden md:col-span-3 md:block">{profile.role}</span>
          <span className="hidden md:col-span-3 md:block">{profile.company} · 2025–26</span>
          <span className="tabular md:col-span-3">Nairobi · {time} EAT</span>
          <span className="flex items-center justify-end gap-2 text-fg md:col-span-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>
        </motion.div>

        <h1 className="mt-12 font-display text-[13vw] font-medium leading-[0.9] tracking-[-0.042em] sm:mt-16 sm:text-[9.5vw] xl:text-[8.6rem]">
          {ready && (
            <>
              <SplitWords text="I build games," accent={['games']} className="block" delay={delay + 0.05} />
              <SplitWords text="money apps & platforms" accent={['money']} className="block" delay={delay + 0.2} />
              <SplitWords text="people trust." className="block text-mute" delay={delay + 0.35} />
            </>
          )}
          {!ready && <span className="invisible">I build games, money apps & platforms people trust.</span>}
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease, delay: 0.6 }}
            className="max-w-md text-lg leading-relaxed text-mute md:col-span-5 md:col-start-1">
            I'm <span className="text-fg">{profile.name}</span>, a full-stack product engineer at {profile.company} in Nairobi. {profile.intro}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease, delay: 0.75 }}
            className="flex flex-col gap-6 md:col-span-6 md:col-start-7 md:items-end">
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a href="#projects" className="group inline-flex items-center gap-3 rounded-full bg-fg py-2 pl-6 pr-2 font-medium text-bg transition hover:bg-accent">
                  Explore my work
                  <span className="grid size-9 place-items-center rounded-full bg-bg text-fg transition duration-500 group-hover:rotate-[-45deg]">
                    <ArrowDownRight className="size-4" aria-hidden="true" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="inline-flex items-center rounded-full border border-line-2 px-6 py-[0.85rem] font-medium transition hover:border-fg">
                  Get in touch
                </a>
              </Magnetic>
            </div>
            <div className="flex items-center gap-5 text-sm text-mute">
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-fg">
                <Github className="size-4" /> GitHub <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
              {profile.resume && (
                <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-fg">
                  Resume (PDF) <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-fg">
                  <Linkedin className="size-4" /> LinkedIn <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
              )}
              {profile.email && <a href={`mailto:${profile.email}`} className="transition hover:text-fg">{profile.email}</a>}
            </div>
          </motion.div>
        </div>

        <motion.dl initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.9 }}
          className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`border-line py-6 ${i % 2 ? 'pl-5 border-l' : ''} md:border-l md:pl-6 ${i === 0 ? 'md:border-l-0 md:pl-0' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''}`}>
              <dt className="label">{s.l}</dt>
              <dd className="tabular mt-3 font-display text-5xl font-medium tracking-tight sm:text-6xl">{s.n}</dd>
            </div>
          ))}
        </motion.dl>

        <a href="#about" className="label mt-6 hidden items-center gap-3 md:inline-flex" aria-label="Scroll to About">
          <span className="relative h-8 w-px overflow-hidden bg-line-2">
            <span className="scrolldot absolute inset-x-0 top-0 h-1/2 bg-accent" />
          </span>
          Scroll
        </a>
      </motion.div>
    </section>
  )
}
