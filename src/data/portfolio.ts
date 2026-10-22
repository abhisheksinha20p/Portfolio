// All site content lives here. Edit this file to update the portfolio.

export const PROFILE = {
  name: 'Abhishek Sinha',
  role: 'Web & Mobile Engineer',
  headline: 'I build secure, fast products — from the API to the app in your pocket.',
  summary:
    'Full-stack and mobile engineer working across React, React Native and Node.js. I care about the parts users never see — auth, data models, deploys — as much as the parts they do. Most recently shipping fintech features at Tech Signific.',
  location: 'India · Open to remote',
  status: 'Open to new roles',
  email: 'abhisheksinha20009k@gmail.com',
  github: 'https://github.com/abhisheksinha20p',
  linkedin: 'https://www.linkedin.com/in/abhishek-sinha-0897aa23b',
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
    live: 'https://vera-3m9k2bkdy-avis-projects-87f288a4.vercel.app/',
    github: 'https://github.com/abhisheksinha20p/Vera',
  },
];

export type Job = { company: string; title: string; period: string; points: string[] };

export const EXPERIENCE: Job[] = [
  {
    company: 'Tech Signific',
    title: 'Full-Stack & Mobile Developer',
    period: 'Oct 2025 — Present',
    points: [
      'Build fintech features in React Native backed by Node.js services',
      'Implemented JWT authentication and granular role-based access control',
      'Designed MongoDB schemas for transaction-heavy workloads',
      'Ship services as Docker containers',
    ],
  },
  {
    company: 'Tech Signific',
    title: 'Full-Stack Developer Intern',
    period: 'Jan 2025 — Jul 2025',
    points: [
      'Built REST APIs and optimised SQL / NoSQL queries',
      'Created a reusable UI component library',
      'Worked in an Agile team with Git-based CI/CD',
    ],
  },
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
