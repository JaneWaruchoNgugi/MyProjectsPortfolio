# Jane Ngugi Portfolio

Firebase-backed portfolio and content management system built with React, TypeScript, and Vite.

## Routes and data

- `/` — public portfolio
- `/admin` — authenticated content dashboard
- Firestore document: `portfolio/site`
- Storage folder: `portfolio/`
- Local defaults render until the first publish, so the public site never starts blank.

## One-time Firebase setup

The app uses the dedicated Firebase project `myprojectsportfolio`. A different Firebase project can be supplied through `.env` using `.env.example`.

1. Firebase Console → Authentication → Sign-in method → enable **Email/Password**.
2. Authentication → Users → add `waruchojanen@gmail.com` with a strong password.
3. Enable Firestore Database and Storage.
4. Deploy the included rules:

```bash
firebase use myprojectsportfolio
firebase deploy --only firestore:rules,storage
```

The rules allow public portfolio reads and restrict all writes and uploads to the authenticated admin email.

5. Run the site, open `/admin`, sign in, review the defaults, and click **Save & publish** to create `portfolio/site`.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

The default resume is `public/JaneWaruchoNgugiResume.pdf`. A replacement PDF can be uploaded in Admin → Settings.
