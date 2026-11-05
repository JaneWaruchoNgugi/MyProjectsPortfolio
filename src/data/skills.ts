/** Skill groups. Each name must match a `stack` entry in projects.ts so counts come from real projects. */
export const skillGroups: { title: string; blurb: string; items: string[] }[] = [
  { title: 'Languages', blurb: 'What the code is written in.', items: ['TypeScript', 'JavaScript', 'CSS', 'EJS'] },
  { title: 'Frontend', blurb: 'Interfaces, state and data views.', items: ['React', 'Next.js', 'Tailwind', 'Framer Motion', 'Zustand', 'Recharts', 'i18next'] },
  { title: 'Graphics & games', blurb: 'Rendering, physics and sound.', items: ['Three.js', 'React Three Fiber', 'PixiJS', 'Canvas', 'Web Audio', 'Post-processing'] },
  { title: 'Backend', blurb: 'APIs, real-time and data.', items: ['Node.js', 'Express', 'Socket.IO', 'WebSockets', 'Prisma', 'Redis', 'OpenAPI'] },
  { title: 'Platforms & tools', blurb: 'Where it runs and how it ships.', items: ['Firebase', 'Supabase', 'Vite', 'Vitest', 'Capacitor', 'PWA', 'OpenAI', 'Gemini AI'] },
]
