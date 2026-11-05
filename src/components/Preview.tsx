import type { Project } from '../data/projects'

function hash(s: string) {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0
  return h
}

/** Generated artwork for projects without a screenshot: a quiet typographic plate. */
function Plate({ project }: { project: Project }) {
  const h = hash(project.id)
  const cols = 12
  const bars = Array.from({ length: cols }, (_, i) => 18 + ((h >>> (i * 2)) % 64))
  const angle = (h % 5) * 18
  return (
    <div className="absolute inset-0 bg-surface-2">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`pl-${project.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8b86b" stopOpacity="0.16" />
            <stop offset="1" stopColor="#e8b86b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#pl-${project.id})`} />
        <g stroke="#ffffff" strokeOpacity="0.06">
          {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="250" />)}
          {Array.from({ length: 6 }, (_, i) => <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} />)}
        </g>
        <g transform={`rotate(${angle} 300 90)`} fill="none" stroke="#e8b86b" strokeOpacity="0.35">
          <circle cx="300" cy="90" r="46" />
          <circle cx="300" cy="90" r="78" strokeDasharray="2 5" />
          <line x1="254" y1="90" x2="346" y2="90" />
        </g>
        {bars.map((b, i) => (
          <rect key={i} x={24 + i * 14} y={226 - b} width="6" height={b} rx="1" fill="#ededeb" fillOpacity={i === h % cols ? 0.7 : 0.12} />
        ))}
      </svg>
      <span className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">{project.category}</span>
      <span className="absolute bottom-4 right-5 max-w-[70%] text-right font-display text-2xl font-medium leading-none tracking-tight text-fg/90 sm:text-3xl">
        {project.name}
      </span>
    </div>
  )
}

export function Preview({ project, className = '', sizes }: { project: Project; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
      {project.image ? (
        <img
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <Plate project={project} />
      )}
    </div>
  )
}
