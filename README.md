# Abhishek Sinha — Portfolio

Static, single-page portfolio. React 19 + Vite + Tailwind, deployed on Vercel.

## Edit content
Everything (profile, projects, experience, skills, ideas) lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).
Résumé: replace `public/Resume/Full_Stack_dev.pdf`. Project screenshots: `public/img/`.

## Run
```bash
npm install
npm run dev
```

## Contact form
Uses EmailJS. Copy `.env.example` to `.env` (and set the same vars in Vercel).
In the EmailJS dashboard, restrict the public key to your domain.

## Security
- No backend, no secrets in the bundle — only the EmailJS public key.
- Strict CSP, HSTS and other headers in [`vercel.json`](vercel.json).
- Contact form: honeypot, length limits, client cooldown.
