import { ArrowUpRight, Play } from 'lucide-react'
import type { Project } from '../data/projects'
import { useOpenDemo } from '../lib/demo'
import { Github } from './ui/BrandIcons'

/** The three actions every project offers: play inside the page, visit the live site, read the source. */
export function ActionLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const openDemo = useOpenDemo()
  const base = 'inline-flex items-center gap-1.5 rounded-full text-sm transition duration-300'
  const pad = compact ? 'px-3 py-1.5' : 'px-4 py-2'
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.url ? (
        <>
          <button type="button" onClick={() => openDemo(project)}
            className={`${base} ${pad} bg-fg font-medium text-bg hover:bg-accent`}>
            <Play className="size-3.5 fill-current" aria-hidden="true" /> Play demo
          </button>
          <a href={project.url} target="_blank" rel="noreferrer"
            className={`${base} ${pad} group/l border border-line-2 hover:border-fg`}>
            Visit website
            <ArrowUpRight className="size-3.5 transition group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" aria-hidden="true" />
          </a>
        </>
      ) : (
        <span className={`${base} ${pad} border border-dashed border-line-2 text-dim`}>No public deploy</span>
      )}
      <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer"
        className={`${base} ${pad} text-mute hover:text-fg`}>
        <Github className="size-3.5" /> View source
      </a>
    </div>
  )
}
