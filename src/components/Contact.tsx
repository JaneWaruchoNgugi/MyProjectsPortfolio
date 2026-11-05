import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, ArrowUpRight, FileText } from 'lucide-react'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { Github, Linkedin } from './ui/BrandIcons'
import { Magnetic } from './ui/Magnetic'
import { SplitWords } from './ui/Reveal'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-25%'])
  const primary = profile.email ? `mailto:${profile.email}` : profile.github
  const links = [
    { href: profile.github, label: 'GitHub', handle: 'JaneWaruchoNgugi', icon: Github },
    profile.linkedin ? { href: profile.linkedin, label: 'LinkedIn', handle: 'Profile', icon: Linkedin } : null,
    profile.resume ? { href: profile.resume, label: 'Resume', handle: 'PDF', icon: FileText } : null,
  ].filter((l): l is NonNullable<typeof l> => Boolean(l))

  return (
    <section id="contact" ref={ref} className="relative scroll-mt-16 overflow-hidden border-t border-line bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 overflow-hidden">
        <motion.div style={{ x }} className="whitespace-nowrap font-display text-[22vw] font-medium leading-none tracking-[-0.06em] text-fg/[0.035]">
          Let's build · Let's build
        </motion.div>
      </div>

      <div className="gutter relative">
        <div className="mx-auto max-w-[1400px] pb-10 pt-28 sm:pt-40">
          <div className="label flex gap-3"><span className="text-accent">04</span><span>Contact</span></div>
          <h2 className="mt-6 max-w-5xl font-display text-[12vw] font-medium leading-[0.92] tracking-[-0.04em] sm:text-8xl lg:text-[8.5rem]">
            <SplitWords text="Have an idea worth building?" accent={['building']} inView />
          </h2>

          <div className="mt-16 grid items-end gap-12 md:grid-cols-12">
            <p className="max-w-md text-lg leading-relaxed text-mute md:col-span-5">
              Whether it is a game, a money app or a platform for your business, I would like to hear about it. Tell me what you are making and I will reply with how I would build it.
            </p>
            <div className="flex md:col-span-7 md:justify-end">
              <Magnetic strength={0.35}>
                <a href={primary} target={profile.email ? undefined : '_blank'} rel="noreferrer"
                  className="group relative grid size-44 place-items-center overflow-hidden rounded-full bg-accent text-center text-accent-ink sm:size-52">
                  <span className="absolute inset-0 translate-y-full rounded-full bg-fg transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
                  <span className="relative flex flex-col items-center gap-1 text-lg font-medium">
                    <ArrowUpRight className="size-6 transition duration-500 group-hover:rotate-45" aria-hidden="true" />
                    {profile.email ? 'Send an email' : 'Say hello on GitHub'}
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>

          <ul className="mt-20 border-t border-line">
            {links.map(({ href, label, handle, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-line py-6 transition-colors hover:text-accent">
                  <span className="flex items-center gap-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                    <Icon className="size-6" /> {label}
                  </span>
                  <span className="flex items-center gap-3 text-mute">
                    <span className="hidden font-mono text-sm sm:inline">{handle}</span>
                    <ArrowUpRight className="size-5 transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <footer className="mt-24 grid gap-6 text-sm text-mute sm:grid-cols-3 sm:items-end">
            <div>
              <div className="font-display text-2xl font-medium tracking-tight text-fg">{profile.name}</div>
              <div className="mt-1">{profile.role} · {profile.location}</div>
            </div>
            <div className="label sm:text-center">© {new Date().getFullYear()} · React, TypeScript, Tailwind, Framer Motion</div>
            <div className="sm:text-right">
              <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 transition hover:border-fg hover:text-fg">
                Back to top <ArrowUp className="size-4" aria-hidden="true" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}
