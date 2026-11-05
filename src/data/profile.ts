export const profile = {
  name: 'Jane Ngugi',
  role: 'Full-Stack Product Engineer',
  company: 'Tushinde',
  // Month the timeline starts. Update to your exact Tushinde start date.
  joined: '2025-08-01',
  location: 'Nairobi, Kenya',
  timeZone: 'Africa/Nairobi',
  available: true,
  availability: 'Open to new projects',
  intro:
    'I design and build real-money games, fintech and business platforms for Kenyan users, taking each one from the first sketch to a live deploy.',
  github: 'https://github.com/JaneWaruchoNgugi',
  // PDF in /public. Set to '' to hide the resume link.
  resume: 'JaneWaruchoNgugiResume.pdf',
  // Add an email or LinkedIn URL and they appear in the hero and contact sections.
  email: '',
  linkedin: '',
}

/** About section copy. Written from what the repositories show; edit freely. */
export const about = {
  lead: 'I like software you can feel. A wheel that slows down the way a real one would, a cash-out button that responds the instant you tap it, a money app that still opens with no signal.',
  journey: [
    'My first months at Tushinde were spent shipping small games quickly: a spinning wheel, a safari slot machine, ping pong, chess and Flappy Bird, most of them on Express and EJS. Building that many in a row taught me game loops, collision detection and how much the feel of an animation matters.',
    'From there I moved to React and TypeScript for everything, and the games grew into casino-grade products like Mines, Mystic Lock and a real-time Rock Paper Scissors with server-side results.',
    'In 2026 the work widened. I helped build Bongo Quiz and its live scoreboard, made expense and money tools like PesaTrack and PesaFlow, built sites for local businesses, and went deeper on graphics with Three.js, React Three Fiber and PixiJS. Most recently I have been building Lango for property security and a full bingo platform, from its tested API to the lobby players see.',
  ],
  approach: [
    { title: 'Ship, then refine', text: 'Most ideas here went from first commit to a public URL within days. A live build gets real feedback that a mock-up never will.' },
    { title: 'Design for the phone first', text: 'Most of my users are on mid-range Android phones and mobile data, so layouts, assets and animation budgets start there.' },
    { title: 'Make it local', text: 'KES amounts, M-Pesa-style flows, phone and PIN sign-in, Swahili translations and WhatsApp ordering, because that is how people here pay and talk.' },
  ],
  interests: ['Game feel and motion design', 'Real-time systems', 'WebGL and 3D on the web', 'Personal finance tools', 'Offline-first apps'],
}
