import { lazy, Suspense, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteContent } from './useSiteContent'
import type { Project, SiteContent } from './types'
import './App.css'

const AdminPage = lazy(() => import('./AdminPage').then(module => ({ default: module.AdminPage })))

export type IconName = 'arrow' | 'download' | 'github' | 'linkedin' | 'menu' | 'close' | 'external' | 'code' | 'database' | 'layers' | 'spark' | 'check' | 'eye'
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />, download: <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />,
    github: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.2.5S18.1.1 15 1.8a13.4 13.4 0 0 0-7 0C4.9.1 3.8.5 3.8.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2" />,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />, close: <path d="m6 6 12 12M18 6 6 18" />,
    external: <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />,
    code: <path d="m8 9-4 3 4 3m8-6 4 3-4 3M14 5l-4 14" />,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    spark: <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3ZM5 16l-.7 2.3L2 19l2.3.7L5 22l.7-2.3L8 19l-2.3-.7L5 16Z" />,
    check: <path d="m5 12 4 4L19 6" />, eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function ProductMock({ kind }: { kind: string }) {
  if (kind === 'bongo') return <div className="mock bongo-mock"><aside><b>B</b><i /><i /><i /><i /></aside><div className="mock-main"><small>Good afternoon, Jane</small><h4>Ready to play?</h4><div className="banner"><span>Weekly Challenge</span><strong>Science Sprint</strong><button>Play now</button></div><div className="cards"><i /><i /><i /></div></div></div>
  if (kind === 'finwise') return <div className="mock finance-mock"><nav><b>finwise</b><span>Overview  Budget  Goals</span></nav><small>Welcome back, Jane</small><h4>Your money overview</h4><div className="finance-grid"><div className="balance"><small>Total balance</small><strong>KSh 124,500</strong><em>+12.4% this month</em></div><div className="chart"><i /><i /><i /><i /><i /><i /></div><div className="goal"><small>Savings goal</small><strong>72%</strong><i /></div></div></div>
  if (kind === 'pesa') return <div className="mock pesa-mock"><aside><b>PT</b><i /><i /><i /><i /></aside><div className="mock-main"><small>ADMIN OVERVIEW</small><h4>Expense requests</h4><div className="stats"><i>12<small>Pending</small></i><i>48<small>Approved</small></i><i>3<small>Rejected</small></i></div><div className="request"><b>Travel expense</b><span>KES 8,500</span><button>Approve</button></div><div className="bars"><i /><i /><i /><i /><i /></div></div></div>
  return <div className="mock scores-mock"><nav><b>HighScores</b><span>Dashboard  Subjects  Mock exams</span></nav><div className="score-hero"><small>Continue learning</small><h4>Make today count.</h4><button>Resume lesson</button></div><div className="subjects"><i>∑<small>Mathematics</small></i><i>⚗<small>Science</small></i><i>Aa<small>English</small></i></div></div>
}

function ProjectPreview({ project }: { project: Project }) {
  return <div className="project-visual" style={{ '--project-color': project.color } as CSSProperties}>
    <div className="app-window"><div className="window-top"><i /><i /><i /></div>{project.imageUrl ? <img className="project-image" src={project.imageUrl} alt={`${project.name} website preview`} /> : <ProductMock kind={project.kind} />}</div>
  </div>
}

function PublicPortfolio({ content }: { content: SiteContent }) {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .1 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); return () => observer.disconnect() }, [content])
  const projects = content.work.projects.filter(project => project.visible)
  return <div className="site-shell">
    <header><nav className="nav container"><a className="brand" href="#top">{content.brand}<span>.</span></a><div className={`nav-links ${menuOpen ? 'open' : ''}`}>{['work','about','skills','contact'].map(item => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<a className="nav-resume" href={content.resumeUrl} download>Resume <Icon name="download" size={16} /></a></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name={menuOpen ? 'close' : 'menu'} /></button></nav></header>
    <main id="top">
      <section className="hero container"><div className="hero-copy reveal visible"><div className="eyebrow"><span />{content.hero.eyebrow}</div><h1>{content.hero.titleStart} <em>{content.hero.titleAccent}</em> {content.hero.titleEnd}</h1><p>{content.hero.intro}</p><div className="hero-actions"><a className="button primary" href="#work">Explore my work <Icon name="arrow" /></a><a className="text-link" href={content.contact.githubUrl} target="_blank" rel="noreferrer"><Icon name="github" />View GitHub</a></div><div className="hero-proof">{content.hero.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div><div className="hero-visual reveal visible"><div className="orbit one"/><div className="orbit two"/><div className="portrait"><div className="portrait-grid"/><span className="code">&lt;/&gt;</span><div className="initials">{content.brand}</div><div className="caption"><span>{content.hero.location}</span><strong>{content.hero.locationDetail}</strong></div></div><div className="float-tag react">React</div><div className="float-tag firebase">Firebase</div><div className="float-tag typescript">TypeScript</div></div></section>
      <div className="marquee"><div>{[...Array(2)].flatMap((_,i) => content.marquee.map(item => <span key={`${i}-${item}`}>{item}<i>✦</i></span>))}</div></div>
      <section className="section container" id="work"><div className="section-heading reveal"><div><span className="kicker">{content.work.kicker}</span><h2>{content.work.title}</h2></div><p>{content.work.intro}</p></div><div className="projects">{projects.map((project,index) => <article className="project reveal" key={project.id}><div className="preview-wrap"><span className="project-number">{String(index+1).padStart(2,'0')}</span><ProjectPreview project={project}/></div><div className="project-copy" style={{ '--project-color': project.color } as CSSProperties}><span className="project-label">{project.label}</span><h3>{project.name}</h3><p className="project-summary">{project.summary}</p><p className="project-detail">{project.detail}</p><div className="project-metrics">{project.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="project-actions"><a className="button project-live" href={project.liveUrl} target="_blank" rel="noreferrer"><Icon name="eye" size={17}/>View live site</a><a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer">Repository <Icon name="external" size={16}/></a></div></div></article>)}</div></section>
      <section className="about" id="about"><div className="container about-grid"><div className="reveal"><span className="kicker light">{content.about.kicker}</span><h2>{content.about.title}<br/><em>{content.about.accent}</em></h2></div><div className="about-copy reveal"><p className="large">{content.about.lead}</p>{content.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="button light-button" href={content.resumeUrl} download>Download my resume <Icon name="download"/></a></div></div></section>
      <section className="section container" id="skills"><div className="section-heading reveal"><div><span className="kicker">{content.skills.kicker}</span><h2>{content.skills.title}</h2></div><p>{content.skills.intro}</p></div><div className="capabilities">{content.skills.capabilities.map((item,index) => <article className="capability reveal" key={item.id}><span>{String(index+1).padStart(2,'0')}</span><div className="capability-icon"><Icon name={item.icon}/></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="toolkit reveal"><span>Technical toolkit</span><div>{content.skills.toolkit.map(tool => <i key={tool}><Icon name="check" size={14}/>{tool}</i>)}</div></div></section>
      <section className="contact" id="contact"><div className="contact-orb"/><div className="container contact-inner reveal"><span className="kicker light">{content.contact.kicker}</span><h2>{content.contact.title} <em>{content.contact.accent}</em></h2><p>{content.contact.intro}</p><div className="contact-actions"><a className="button accent" href={`mailto:${content.contact.email}`}>Start a conversation <Icon name="arrow"/></a><a href={content.contact.githubUrl} target="_blank" rel="noreferrer"><Icon name="github"/>GitHub</a><a href={content.contact.linkedinUrl} target="_blank" rel="noreferrer"><Icon name="linkedin"/>LinkedIn</a></div></div></section>
    </main><footer><div className="container"><a className="brand" href="#top">{content.brand}<span>.</span></a><p>{content.footer}</p><a href="#top">Back to top ↑</a></div></footer>
  </div>
}

function App() {
  const { content, loading } = useSiteContent()
  if (window.location.pathname.startsWith('/admin')) return loading ? <div className="admin-loading">Loading content manager…</div> : <Suspense fallback={<div className="admin-loading">Loading secure admin…</div>}><AdminPage initialContent={content}/></Suspense>
  return <>{loading && <div className="content-loading">Loading portfolio…</div>}<PublicPortfolio content={content}/></>
}
export default App
