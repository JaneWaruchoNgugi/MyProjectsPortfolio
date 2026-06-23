import type { SiteContent } from './types'

export const defaultContent: SiteContent = {
  brand: 'JN',
  resumeUrl: '/JaneWaruchoNgugiResume.pdf',
  hero: {
    eyebrow: 'Full-stack software developer', titleStart: 'I build digital products that turn', titleAccent: 'ideas', titleEnd: 'into impact.',
    intro: 'I’m Jane — a product-minded engineer building complete, user-centred platforms across education, fintech, gaming, wellness, and community.',
    location: 'Based in Nairobi', locationDetail: 'Building for the world',
    stats: [{ value: '39+', label: 'Repositories' }, { value: '5+', label: 'Product sectors' }, { value: 'End-to-end', label: 'Product ownership' }],
  },
  marquee: ['React', 'TypeScript', 'Firebase', 'Node.js', 'Product Design', 'AI Workflows'],
  work: {
    kicker: 'Selected work', title: 'Products built to solve real problems.', intro: 'From first idea to deployed product, these projects show how I think, design, and engineer complete systems.',
    projects: [
      { id: 'bongoquiz', name: 'BongoQuiz', label: 'EdTech · Gamification', summary: 'A learning and community ecosystem that turns revision into an engaging, reward-driven experience.', detail: 'I designed and built product architecture across quiz tournaments, live leaderboards, rewards, community features, progression, marketplace concepts, and administration.', stack: ['React', 'TypeScript', 'Firebase', 'PWA'], color: '#ff6b35', kind: 'bongo', repoUrl: 'https://github.com/WaruchoJaneNgugi/Bongo', liveUrl: 'https://www.bongoquiz.com/', imageUrl: '', metrics: [{ value: '10+', label: 'Product modules' }, { value: 'Full stack', label: 'Build scope' }], visible: true },
      { id: 'finwise', name: 'FinWise', label: 'FinTech · Mobile', summary: 'A personal finance platform that makes budgeting, goals, and financial progress clear and actionable.', detail: 'Built responsive dashboards, financial journeys, analytics, authentication, admin tooling, and native Android/iOS delivery through Capacitor.', stack: ['React', 'TypeScript', 'Firebase', 'Capacitor'], color: '#6d5dfc', kind: 'finwise', repoUrl: 'https://github.com/WaruchoJaneNgugi/finwise', liveUrl: 'https://finwise-one.vercel.app/', imageUrl: '', metrics: [{ value: 'Web + mobile', label: 'Platforms' }, { value: 'End-to-end', label: 'Ownership' }], visible: true },
      { id: 'pesatrack', name: 'PesaTrack', label: 'Business Ops · FinTech', summary: 'A role-based expense management system that gives teams a clear path from request to approval and audit.', detail: 'Engineered employee and admin workflows, PIN authentication, categorized expense requests, approval states, receipt handling, audit reports, and spending analytics.', stack: ['React', 'TypeScript', 'Firestore', 'Recharts'], color: '#07845f', kind: 'pesa', repoUrl: 'https://github.com/WaruchoJaneNgugi/PesaTrack', liveUrl: 'https://pesa-track-self.vercel.app/', imageUrl: '', metrics: [{ value: '2 roles', label: 'Permission model' }, { value: 'Auditable', label: 'Workflow design' }], visible: true },
      { id: 'highscores', name: 'HighScores', label: 'EdTech · AI Learning', summary: 'A digital education platform built around mock exams, revision content, and measurable student progress.', detail: 'Developed subject management, assessment workflows, learning dashboards, document ingestion, AI-assisted learning concepts, and content administration.', stack: ['React', 'TypeScript', 'Firebase', 'AI'], color: '#168bb8', kind: 'scores', repoUrl: 'https://github.com/WaruchoJaneNgugi/scoreboard', liveUrl: 'https://bongo-drab.vercel.app/home', imageUrl: '', metrics: [{ value: 'Learner-first', label: 'UX approach' }, { value: 'Admin + user', label: 'Experiences' }], visible: true },
    ],
  },
  about: { kicker: 'About me', title: 'More than code.', accent: 'I build the whole product.', lead: 'I’m a full-stack developer and product engineer who enjoys the difficult middle — turning an ambitious idea into a system people can actually use.', paragraphs: ['My work spans architecture, user experience, frontend development, backend integration, authentication, database design, dashboards, and deployment. That range lets me see the complete product, not just one isolated feature.', 'I pair strong product thinking with AI-assisted engineering workflows to move quickly without losing sight of quality, maintainability, or the user.'] },
  skills: {
    kicker: 'What I bring', title: 'From product thinking to production.', intro: 'I work across the stack and keep the product goal visible through every technical decision.',
    capabilities: [
      { id: 'product', icon: 'layers', title: 'Product engineering', text: 'I translate product ideas into clear architecture, user journeys, and production-ready interfaces.' },
      { id: 'frontend', icon: 'code', title: 'Frontend systems', text: 'Responsive React and TypeScript applications built with reusable components and thoughtful state management.' },
      { id: 'backend', icon: 'database', title: 'Backend & data', text: 'Authentication, Firestore models, APIs, permissions, admin systems, and real-time product experiences.' },
      { id: 'ai', icon: 'spark', title: 'AI-assisted delivery', text: 'I use modern AI workflows to accelerate execution while retaining ownership of architecture and quality.' },
    ],
    toolkit: ['React.js', 'TypeScript', 'JavaScript', 'Firebase', 'Firestore', 'Node.js', 'Django', 'REST APIs', 'Git & GitHub', 'Vercel', 'Capacitor', 'Figma'],
  },
  contact: { kicker: 'Let’s build something useful', title: 'Have a role or product that needs an', accent: 'owner?', intro: 'I’m open to software development, product engineering, React, and AI product opportunities.', email: 'waruchojanen@gmail.com', githubUrl: 'https://github.com/WaruchoJaneNgugi', linkedinUrl: 'https://www.linkedin.com/in/jane-ngugi-64b07935b/' },
  footer: 'Designed and built by Jane Ngugi.',
}
