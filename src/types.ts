export type Stat = { value: string; label: string }
export type Project = {
  id: string; name: string; label: string; summary: string; detail: string
  stack: string[]; color: string; kind: string; repoUrl: string; liveUrl: string
  imageUrl: string; metrics: Stat[]; visible: boolean
}
export type Capability = { id: string; icon: 'layers' | 'code' | 'database' | 'spark'; title: string; text: string }
export type SiteContent = {
  brand: string
  resumeUrl: string
  hero: { eyebrow: string; titleStart: string; titleAccent: string; titleEnd: string; intro: string; location: string; locationDetail: string; stats: Stat[] }
  marquee: string[]
  work: { kicker: string; title: string; intro: string; projects: Project[] }
  about: { kicker: string; title: string; accent: string; lead: string; paragraphs: string[] }
  skills: { kicker: string; title: string; intro: string; capabilities: Capability[]; toolkit: string[] }
  contact: { kicker: string; title: string; accent: string; intro: string; email: string; githubUrl: string; linkedinUrl: string }
  footer: string
}
