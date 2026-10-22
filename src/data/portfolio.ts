// All site content lives here. Edit this file to update the portfolio.

export const PROFILE = {
  name: 'Abhishek Sinha',
  role: 'Web & Mobile Engineer',
  headline: 'I build secure, fast products — from the API to the app in your pocket.',
  summary:
    'Full-stack and mobile engineer who enjoys both sides of the stack — smooth interfaces and the reliable systems behind them. Currently an Associate Frontline Deployment Engineer at Tech Signific, taking software from requirements to production.',
  location: 'Jamshedpur, India · Open to remote',
  status: 'Open to new roles',
  email: 'abhisheksinha20009k@gmail.com',
  github: 'https://github.com/abhisheksinha20p',
  linkedin: 'https://www.linkedin.com/in/abhishek-sinha-0897aa23b',
  blog: 'https://mycodeyatra.com',
  resume: '/Resume/Full_Stack_dev.pdf',
};

export type Project = {
  name: string;
  year: string;
  tagline: string;
  image: string;
  problem: string;
  role: string;
  built: string[];
  stack: string[];
  live?: string;
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    name: 'ClientFlow',
    year: '2025',
    tagline: 'Client portal and invoicing for freelancers',
    image: '/img/clientflow.png',
    problem:
      'Freelancers juggle clients across email, spreadsheets and payment apps. ClientFlow puts projects, files and invoices in one place — with a separate, secure portal for each client.',
    role: 'Solo — design, frontend, backend, deployment',
    built: [
      'Dual portal (freelancer + client) with role-based access control',
      'Multi-tenant data model that keeps every client’s data isolated',
      'Stripe integration for invoicing and payouts',
      'Dockerised stack for identical dev and production environments',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Docker'],
    live: 'https://client-flow-teal.vercel.app/',
    github: 'https://github.com/abhisheksinha20p/ClientFlow',
  },
  {
    name: 'Vera',
    year: '2025',
    tagline: 'A calm, focused task manager',
    image: '/img/vera_app.png',
    problem:
      'Most task apps become another source of noise. Vera is built around a single focus dashboard that shows only what matters today.',
    role: 'Solo — product, UI and full-stack build',
    built: [
      'Secure authentication and per-user data',
      'Focus dashboard with offline-friendly client state',
      'Custom component system with accessibility built in',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker'],
    live: 'https://vera-steel-eight.vercel.app/',
    github: 'https://github.com/abhisheksinha20p/Vera',
  },
];

export type Job = { company: string; title: string; period: string; points: string[] };

export const EXPERIENCE: Job[] = [
  {
    company: 'Tech Signific',
    title: 'Associate Frontline Deployment Engineer',
    period: 'Jun 2026 — Present',
    points: [
      'Own work across the lifecycle, from requirement analysis to production deployment',
      'Troubleshoot and optimise live applications for performance',
      'Write technical documentation and support release activities',
      'Collaborate with cross-functional teams to ship reliable software',
    ],
  },
  {
    company: 'Tech Signific',
    title: 'Full-Stack & Mobile Developer (Freelance)',
    period: 'Oct 2025 — May 2026',
    points: [
      'Built fintech mobile apps with a focus on UX and secure integrations',
      'Led the architecture of a Node.js + MongoDB backend serving web and mobile',
      'Ran production environments with Docker for consistent deploys',
      'Implemented JWT-based authentication across applications',
    ],
  },
  {
    company: 'Tech Signific',
    title: 'Full-Stack Developer Intern',
    period: 'Jan 2025 — Jul 2025',
    points: [
      'Developed server-side logic and REST APIs in Node.js',
      'Built responsive interfaces with HTML, CSS and vanilla JavaScript',
      'Worked in Agile sprints with planning and code reviews',
    ],
  },
];

export const EDUCATION = {
  degree: 'B.E. Electronics & Communication Engineering',
  school: 'KLS Gogte Institute of Technology, Belagavi',
  period: '2020 — 2024',
};

export const CERTIFICATIONS = [
  'Google Data Analytics — Foundations, Ask Questions, Prepare Data, Process Data',
  'Tata Group — Data Visualisation Job Simulation',
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'React Query'] },
  { group: 'Mobile', items: ['React Native', 'Expo'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST', 'GraphQL', 'Stripe'] },
  { group: 'Data', items: ['MongoDB', 'PostgreSQL', 'Redis'] },
  { group: 'Security', items: ['JWT', 'OAuth', 'RBAC', 'Encryption'] },
  { group: 'Ops', items: ['Docker', 'Nginx', 'CI/CD', 'AWS'] },
];

// Starter ideas — edit freely. status: 'Exploring' | 'Prototyping' | 'Building'
export const IDEAS: { title: string; status: string; problem: string; approach: string }[] = [
  {
    title: 'Ledger-first payments SDK',
    status: 'Exploring',
    problem:
      'Small teams adding payments often store balances as a single number that drifts out of sync with reality.',
    approach:
      'A tiny Node.js library that records every movement as an immutable double-entry ledger row, so balances are always derived and auditable.',
  },
  {
    title: 'Offline-first field app kit',
    status: 'Prototyping',
    problem:
      'Mobile apps for agents and field staff break the moment connectivity drops.',
    approach:
      'React Native template with a local queue, conflict-aware sync and background retries — so work is never lost.',
  },
  {
    title: 'Security checklist bot for PRs',
    status: 'Exploring',
    problem:
      'Auth and permission bugs slip through review because nobody is specifically looking for them.',
    approach:
      'A GitHub Action that flags new routes missing auth middleware, unsafe CORS and secrets in diffs, with a short review comment.',
  },
];
