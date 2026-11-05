import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { about, profile } from '../data/profile'
import { sorted } from '../data/projects'
import { monthLabel } from '../lib/format'
import { Reveal, SectionHeader } from './ui/Reveal'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const first = sorted[0]
  const latest = sorted[sorted.length - 1]

  return (
    <section id="about" className="gutter scroll-mt-16 py-28 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader index="01" label="About" title="Fast to ship, careful with the details." />

        <div ref={ref} className="mt-20 grid gap-16 md:grid-cols-12">
          <motion.aside style={{ y: drift }} className="md:col-span-4">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="label">At a glance</div>
              <dl className="mt-6 grid gap-5 text-sm">
                {[
                  ['Role', profile.role],
                  ['Company', profile.company],
                  ['Based in', profile.location],
                  ['First repo', `${first.name}, ${monthLabel(first.created)}`],
                  ['Latest repo', `${latest.name}, ${monthLabel(latest.created)}`],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-line pt-4">
                    <dt className="text-mute">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 border-t border-line pt-5">
                <div className="label">Interests</div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {about.interests.map((i) => (
                    <li key={i} className="rounded-full border border-line-2 px-3 py-1 text-sm text-mute transition hover:border-accent hover:text-fg">{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="font-display text-3xl font-normal leading-[1.15] tracking-[-0.02em] sm:text-4xl">{about.lead}</p>
            </Reveal>
            <div className="mt-12 grid gap-6 text-lg leading-relaxed text-mute">
              {about.journey.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}><p className="max-w-[62ch]">{p}</p></Reveal>
              ))}
            </div>

            <div className="mt-16">
              <div className="label">How I work</div>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {about.approach.map((a, i) => (
                  <motion.li key={a.title}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    className="bg-bg p-6 transition-colors duration-500 hover:bg-surface">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <h3 className="mt-4 text-lg font-medium tracking-tight">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute">{a.text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
