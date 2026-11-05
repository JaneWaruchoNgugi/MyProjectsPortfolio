export type Category = 'Game' | 'Fintech' | 'Platform' | 'Client site' | 'Backend'

export interface Project {
  id: string
  name: string
  repo: string
  created: string // ISO date the repository was created
  url?: string
  category: Category
  stack: string[]
  summary: string
  highlights: string[]
  featured?: boolean
  /** Screenshot in public/shots, e.g. 'shots/thimbles.webp'. Falls back to generated art. */
  image?: string
}

const gh = (name: string, owner = 'JaneWaruchoNgugi') => `${owner}/${name}`

export const projects: Project[] = [
  {
    id: 'spincorner', image: 'shots/spincorner.webp', name: 'Spin Corner', repo: gh('SpinCorner_'), created: '2025-08-22',
    url: 'https://spincorner.netlify.app/', category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'A spinning-wheel game with smooth easing animations, dynamic gradients and interactive prize segments.',
    highlights: ['First production game', 'Physics-style spin easing', 'Toast feedback on wins'],
  },
  {
    id: 'safari-fortunes', image: 'shots/safari-fortunes.webp', name: 'Safari Fortunes', repo: gh('SafariFortunes'), created: '2025-08-27',
    url: 'https://fortunesafari.netlify.app/', category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'A wildlife-themed slot machine featuring animals from Kenya and beyond, with animated symbols and winning paylines.',
    highlights: ['Multi-payline evaluation', 'Animated reel symbols'],
  },
  {
    id: 'ngommagames', image: 'shots/ngommagames.webp', name: 'NgommaGames Hub', repo: gh('ngommagames'), created: '2025-08-30',
    url: 'https://ngommagames.onrender.com/', category: 'Platform', stack: ['Node.js', 'Express', 'EJS', 'Socket.IO'],
    summary: 'A web gaming hub that organises mini-games into Arcade, Sports, Adventure, Puzzle and Action rows in a Netflix-style slider.',
    highlights: ['Server-rendered with Express + EJS', 'Category sliders', 'Real-time sockets'],
  },
  {
    id: 'wheel-of-odds', image: 'shots/wheel-of-odds.webp', name: 'Wheel of Odds', repo: gh('wheelofOdds-main'), created: '2025-09-04',
    url: 'https://wheelof-odds-main.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Canvas', 'Vite'],
    summary: 'A casino-style 20-number wheel where players bet High (11–20) or Low (1–10), drawn on Canvas with animated spins.',
    highlights: ['Canvas-rendered wheel', 'Betting controls and payouts', 'Rebuilt as wheelofOdds-main in Nov 2025'],
  },
  {
    id: 'pingpong', image: 'shots/pingpong.webp', name: '3D Ping Pong', repo: gh('pingpong'), created: '2025-09-13',
    url: 'https://pingpong-vert.vercel.app/', category: 'Game', stack: ['JavaScript', 'Express', 'EJS', 'CSS'],
    summary: 'A 3D ping pong game with an AI opponent, ball physics, scoring and player progression.',
    highlights: ['AI paddle opponent', 'Physics and spin', 'Followed by a rewritten version two weeks later'],
  },
  {
    id: 'tictactoe', image: 'shots/tictactoe.webp', name: 'Tic Tac Toe', repo: gh('TicTacToe'), created: '2025-09-27',
    url: 'https://tic-tac-toe-sigma-vert.vercel.app', category: 'Game', stack: ['JavaScript', 'Express', 'EJS'],
    summary: 'Classic noughts and crosses with a computer opponent and win detection.',
    highlights: ['Minimax-style computer play'],
  },
  {
    id: 'chess', image: 'shots/chess.webp', name: 'Chess', repo: gh('ChessGame'), created: '2025-09-27',
    url: 'https://chess-game-weld-delta.vercel.app/', category: 'Game', stack: ['JavaScript', 'Express', 'EJS'],
    summary: 'A browser chess board with legal move handling for every piece.',
    highlights: ['Full piece move rules'],
  },
  {
    id: 'flappy', image: 'shots/flappy.webp', name: 'Flappy Bird', repo: gh('FlappyBird'), created: '2025-09-27',
    url: 'https://flappy-bird-kappa-six.vercel.app/', category: 'Game', stack: ['JavaScript', 'EJS', 'Canvas'],
    summary: 'A side-scrolling tap-to-fly arcade game with gravity, pipes and score tracking.',
    highlights: ['Game loop and collision detection'],
  },
  {
    id: 'glowplan', image: 'shots/glowplan.webp', name: 'GlowPlan', repo: gh('gloplan-landing'), created: '2025-10-06',
    url: 'https://gloplan-landing.vercel.app', category: 'Platform', stack: ['React', 'TypeScript', 'Tailwind', 'Express', 'OpenAI', 'Vite'],
    summary: 'An AI skin and wellness coach that builds personalised daily plans, shipped as a landing site, an EJS web app and an Express backend that calls OpenAI.',
    highlights: ['AI backend on Express + OpenAI', 'Marketing landing page', 'Three-repo product'],
  },
  {
    id: 'thimbles', image: 'shots/thimbles.webp', name: 'Thimbles: Follow the Gem', repo: gh('thimbles'), created: '2025-10-10',
    url: 'https://thimbles-iota.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Three.js', 'Vite'],
    summary: 'A neon live-casino shell game: pick a difficulty from 3 to 6 shells, follow the gem through the shuffle, and pick the right one.',
    highlights: ['Teleport swaps and neon trails', 'Camera shake on reveal', 'Live table and trend chart'], featured: true,
  },
  {
    id: 'nyaga', image: 'shots/nyaga.webp', name: 'J.M. Nyaga Campaign', repo: gh('nyaga-campaign'), created: '2025-10-24',
    url: 'https://nyaga-campaign-po1i.vercel.app/', category: 'Client site', stack: ['Next.js', 'Supabase', 'Tailwind', 'Framer Motion'],
    summary: "A campaign website for J.M. Nyaga in Tharaka Constituency (jmnyaga.co.ke), with volunteer and donation sign-ups stored in Supabase.",
    highlights: ['Supabase data capture', 'Scroll-triggered animation'],
  },
  {
    id: 'casino', name: 'Casino Website', repo: gh('casino-website'), created: '2025-10-25',
    url: 'https://casino-website-henna.vercel.app', category: 'Platform', stack: ['Next.js', 'TypeScript', 'Tailwind'],
    summary: 'A casino lobby that brings the in-house games together, started as an MVP in October and rebuilt in January.',
    highlights: ['Game lobby', 'MVP to production rebuild'],
  },
  {
    id: 'mines', image: 'shots/mines.webp', name: 'Mines', repo: gh('MinesGame'), created: '2025-11-08',
    url: 'https://mines-game-seven.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'Reveal gems and avoid the mines on a 5×5 grid. Choose how many mines, cash out any time as the multiplier climbs.',
    highlights: ['Risk-based multiplier', 'Cash-out logic'],
  },
  {
    id: 'microwave', image: 'shots/microwave.webp', name: 'Microwave Jackpot', repo: gh('Microwave-Jackpot'), created: '2025-11-22',
    url: 'https://microwave-jackpot.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'A jackpot game with a playful microwave theme and animated reveals.',
    highlights: ['Themed jackpot animations'],
  },
  {
    id: 'mysticlock', image: 'shots/mysticlock.webp', name: 'Mystic Lock', repo: gh('MysticLock'), created: '2025-12-08',
    url: 'https://mystic-lock.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'Pick one of nine lockboxes on a 3×3 grid to reveal a mystical symbol, from a Null Core up to a 20× Cosmic Fragment, with sound and bet history.',
    highlights: ['Canvas lockbox reveals', 'Rarity-based multipliers', 'Custom sound design'],
  },
  {
    id: 'oddeven', image: 'shots/oddeven.webp', name: 'Odd or Even', repo: gh('oddeven'), created: '2026-01-19',
    url: 'https://oddeven-tawny.vercel.app', category: 'Game', stack: ['React', 'CSS', 'Vite'],
    summary: 'A quick-fire prediction game: call odd or even before the number is drawn.',
    highlights: ['Fast rounds'],
  },
  {
    id: 'rps', image: 'shots/rps.webp', name: 'Rock Paper Scissors', repo: gh('rockpaperscissors'), created: '2026-01-22',
    url: 'https://rockpaperscissors-jade-sigma.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'WebSockets', 'Vite'],
    summary: 'A real-time Rock Paper Scissors game with betting, results from the server over WebSockets, sound effects and live balance.',
    highlights: ['Server-authoritative results', 'Shuffle animation', 'Sound design'],
  },
  {
    id: 'bongoquiz', image: 'shots/bongoquiz.webp', name: 'Bongo Quiz', repo: gh('bongoquiz', 'patrick-olusaba'), created: '2026-02-27',
    url: 'https://bongoquiz.com', category: 'Platform', stack: ['React', 'TypeScript', 'Firebase', 'PWA', 'Tailwind', 'Vite'],
    summary: 'A live quiz product at bongoquiz.com, shipped as an installable PWA with Firebase and a companion live scoreboard.',
    highlights: ['Production domain', 'Installable PWA', 'Team project'], featured: true,
  },
  {
    id: 'tushinde-quizzes', image: 'shots/tushinde-quizzes.webp', name: 'Tushinde Quizzes', repo: gh('Tushindequizzes'), created: '2026-03-05',
    url: 'https://tushindequizzes.vercel.app', category: 'Platform', stack: ['React', 'TypeScript', 'Zustand', 'Recharts', 'Tailwind', 'Vite'],
    summary: 'The Tushinde quiz experience: timed question rounds, confetti wins and charts of player performance.',
    highlights: ['Zustand game state', 'Recharts stats'],
  },
  {
    id: 'scoreboard', image: 'shots/scoreboard.webp', name: 'Bongo Quiz Scoreboard', repo: gh('scoreboard'), created: '2026-03-05',
    url: 'https://scoreboard-livid-pi.vercel.app', category: 'Platform', stack: ['React', 'TypeScript', 'Firebase', 'Vite'],
    summary: 'A real-time leaderboard for Bongo Quiz, reading live scores from Firestore.',
    highlights: ['Live Firestore listeners'],
  },
  {
    id: 'bongo', image: 'shots/bongo.webp', name: 'HighScores', repo: gh('Bongo'), created: '2026-03-16',
    url: 'https://bongo-drab.vercel.app', category: 'Platform', stack: ['React', 'TypeScript', 'Firebase', 'Express', 'Framer Motion', 'Vite'],
    summary: 'HighScores, an exam revision platform for Kenyan students: CBC-aligned assessments browsed by grade, with paid plans and animated rewards.',
    highlights: ['Exams organised by grade and subject', 'Express sessions + Firebase', 'Animated UI with confetti'],
  },
  {
    id: 'pesatrack', image: 'shots/pesatrack.webp', name: 'PesaTrack', repo: gh('PesaTrack'), created: '2026-03-25',
    url: 'https://pesa-track-self.vercel.app', category: 'Fintech', stack: ['React', 'TypeScript', 'Firebase', 'Recharts', 'Vite'],
    summary: 'An expense management system with employee and admin roles: request, approve, upload receipts, and keep an audit trail.',
    highlights: ['Phone + PIN auth', 'Role-based dashboards', 'Audit logs'],
  },
  {
    id: 'devtrack', image: 'shots/devtrack.webp', name: 'DevTrack', repo: gh('DevTrack'), created: '2026-03-27',
    url: 'https://dev-track-nine-rosy.vercel.app', category: 'Platform', stack: ['React', 'TypeScript', 'Firebase', 'Gemini AI', 'Zustand', 'Vite'],
    summary: 'A developer tracking app with Firebase sign-in and Google Gemini AI built in.',
    highlights: ['Gemini AI integration', 'Firebase auth and storage'],
  },
  {
    id: 'menumtaa', image: 'shots/menumtaa.webp', name: 'MenuMtaa', repo: gh('MenuMtaa'), created: '2026-04-16',
    url: 'https://menu-mtaa.vercel.app', category: 'Client site', stack: ['React', 'TypeScript', 'Zustand', 'Vite'],
    summary: 'Turns a restaurant menu into a QR code: customers scan, add items and send a real order on WhatsApp. Sold as a done-for-you service, live in 48 hours.',
    highlights: ['QR menu with WhatsApp ordering', 'Live demo and pricing pages'],
  },
  {
    id: 'samrose', image: 'shots/samrose.webp', name: 'Samrose Beauty Hub', repo: gh('samrosebeautyhub'), created: '2026-04-17',
    url: 'https://samrosebeautyhub.vercel.app', category: 'Client site', stack: ['React', 'TypeScript', 'Firebase', 'Vite'],
    summary: 'A beauty salon website with services, business hours, testimonials and instant WhatsApp booking.',
    highlights: ['WhatsApp booking flow', 'Firebase-backed content'],
  },
  {
    id: 'colorstudios', image: 'shots/colorstudios.webp', name: 'Color Studios', repo: gh('colorstudios'), created: '2026-04-17',
    url: 'https://colorstudios.vercel.app', category: 'Client site', stack: ['React', 'TypeScript', 'Firebase', 'Vite'],
    summary: 'A photography studio site with a portfolio, service packages and a custom session builder that books over WhatsApp.',
    highlights: ['Session builder', 'Firebase-managed gallery'],
  },
  {
    id: 'fashiondrop', image: 'shots/fashiondrop.webp', name: 'FashionDrop Kenya', repo: gh('FashionDrop'), created: '2026-06-26',
    url: 'https://fashion-drop.vercel.app', category: 'Client site', stack: ['React', 'TypeScript', 'Firebase', 'Zustand', 'Vite'],
    summary: "A Kenyan fashion e-commerce store for shoes and bags: catalogue, cart, checkout, order tracking and an admin dashboard.",
    highlights: ['Firestore products and orders', 'Admin product management', 'Light / dark themes'],
  },
  {
    id: 'diceroll', image: 'shots/diceroll.webp', name: 'DiceRoll Live', repo: gh('DiceRollMain'), created: '2026-07-01',
    url: 'https://dice-roll-main-2pvr.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'React Three Fiber', 'Three.js', 'Vite'],
    summary: 'A live 3D dice game rendered with React Three Fiber, with physically rolled dice and a soundtrack.',
    highlights: ['Real-time 3D dice', 'Audio design'], featured: true,
  },
  {
    id: 'rpsmain', image: 'shots/rpsmain.webp', name: 'Rock Paper Scissors 3D', repo: gh('rpsmain'), created: '2026-07-13',
    url: 'https://rpsmain.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'React Three Fiber', 'Post-processing', 'Framer Motion', 'Vite'],
    summary: 'The Bongo Games rebuild of Rock Paper Scissors as a 3D scene with bloom post-processing and animated hands.',
    highlights: ['3D scene with post-processing', 'Zustand game store'], featured: true,
  },
  {
    id: 'minesmain', image: 'shots/minesmain.webp', name: 'Mines Casino', repo: gh('MinesMain'), created: '2026-07-13',
    category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'The production version of Mines, redesigned for the casino lobby.',
    highlights: ['Casino-ready redesign'],
  },
  {
    id: 'safarislot', image: 'shots/safarislot.webp', name: 'Safari Slot', repo: gh('safariSlot'), created: '2026-07-13',
    url: 'https://safari-slot.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'PixiJS', 'i18next', 'Vitest', 'Vite'],
    summary: 'A WebGL slot machine rendered with PixiJS, translated with i18next and covered by Vitest tests.',
    highlights: ['WebGL reels with PixiJS', 'Multi-language', 'Unit-tested payouts'], featured: true,
  },
  {
    id: 'pesaflow', image: 'shots/pesaflow.webp', name: 'PesaFlow', repo: gh('pesaflow'), created: '2026-08-19',
    url: 'https://pesaflow-hazel.vercel.app', category: 'Fintech', stack: ['React', 'TypeScript', 'Firebase', 'Capacitor', 'PWA', 'Vitest', 'Vite'],
    summary: 'Smart money management for Kenyans, including daily earners: spending, bills, savings goals, net worth, emergency fund and an AI money advisor. Formerly FinWise.',
    highlights: ['Android + iOS via Capacitor', 'Offline-first with cloud sync', 'KES and M-Pesa first'], featured: true,
  },
  {
    id: 'lango', image: 'shots/lango.webp', name: 'Lango', repo: gh('Lango'), created: '2026-09-03',
    url: 'https://lango-beryl.vercel.app', category: 'Platform', stack: ['React', 'TypeScript', 'Firebase', 'i18next', 'Recharts', 'Tailwind', 'Vite'],
    summary: 'Gate and salon management for Kenyan businesses: every visitor, delivery and client is recorded, the right people get a WhatsApp alert, and reports work in English and Swahili.',
    highlights: ['Bilingual (EN / SW)', 'Role-based access', 'Analytics dashboards'], featured: true,
  },
  {
    id: 'bingoplatform', name: 'Bingo Platform API', repo: gh('bingoplatform'), created: '2026-10-12',
    category: 'Backend', stack: ['Node.js', 'Express', 'Prisma', 'Redis', 'Socket.IO', 'OpenAPI'],
    summary: 'The backend for multiplayer bingo: rounds, ticket purchases, draws, wins, live Socket.IO rooms and admin reports.',
    highlights: ['41 documented OpenAPI endpoints', '84 unit and integration tests', 'Wallet and auth adapters'],
  },
  {
    id: 'quickbingo', image: 'shots/quickbingo.webp', name: 'Quick Bingo', repo: gh('quickbingo'), created: '2026-10-19',
    url: 'https://quickbingo.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Canvas', 'Web Audio'],
    summary: 'A bingo room with a physics-driven globe of 85 balls, simulated players, hot numbers and prize tiers.',
    highlights: ['Canvas ball physics', 'Web Audio engine', 'Weighted draws'],
  },
  {
    id: 'bingo35', image: 'shots/bingo35.webp', name: 'Bingo 35', repo: gh('bingo35'), created: '2026-10-26',
    url: 'https://bingo35.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'A fast 35-ball bingo variant packaged as a single self-contained file for embedding.',
    highlights: ['Single-file build'],
  },
  {
    id: 'bingo90', image: 'shots/bingo90.webp', name: 'Bingo 90', repo: gh('bingo90'), created: '2026-10-31',
    url: 'https://bingo90.vercel.app', category: 'Game', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'Classic UK-style 90-ball bingo with one-line, two-line and full-house prizes.',
    highlights: ['Strip ticket generation'], featured: true,
  },
  {
    id: 'bingolounge', image: 'shots/bingolounge.webp', name: 'Bingo Lounge', repo: gh('BingoLounge'), created: '2026-11-02',
    url: 'https://bingo-lounge.vercel.app', category: 'Platform', stack: ['React', 'TypeScript', 'Vite'],
    summary: 'A lobby for seven bingo games (Scratch, Flip, Reel, Deal, Quick, 35 and 90) with a featured carousel and a full-screen player.',
    highlights: ['7 games in one lobby', 'Deep links per game'], featured: true,
  },
]

/** Oldest first. The position in this list is the project's number on the site. */
export const sorted = [...projects].sort((a, b) => a.created.localeCompare(b.created))
export const numberOf = (p: Project) => String(sorted.indexOf(p) + 1).padStart(2, '0')
export const featured = sorted.filter((p) => p.featured).reverse()

