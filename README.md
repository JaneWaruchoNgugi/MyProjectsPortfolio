# Jane Ngugi · Portfolio

A timeline portfolio of everything shipped at Tushinde, built with React, TypeScript, Tailwind CSS v4, Framer Motion and Lenis.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # static site in dist/
```

## Editing content
- `src/data/projects.ts` — every project: name, repo, creation date, live URL, category, stack, summary, highlights. Set `featured: true` to show it in the Arcade.
- `src/data/profile.ts` — name, role, Tushinde start date (`joined`), email and LinkedIn.

## Deploy
Import the repo on Vercel (framework preset: Vite). No environment variables needed.
