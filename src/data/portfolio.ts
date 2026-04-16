export interface FileConfig {
  icon: string;
  type: string;
  lines: number;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  version: string;
  publisher: string;
  tech: string[];
  shortDesc: string;
  desc: string;
  image: string;
  color: string;
  stars: number;
  downloads: string;
  issues: number;
  github?: string;
  live?: string;
  changelog: { v: string; detail: string }[];
}

export interface TimelineItem {
  type: string;
  date: string;
  title: string;
  desc: string;
  hash: string;
}

export interface TerminalBootItem {
  delay: number;
  text: string;
  color: string;
}

export const FILES: Record<string, FileConfig> = {
  'about.js': { icon: 'FileCode2', type: 'js', lines: 18 },
  'skills.sh': { icon: 'TerminalSquare', type: 'sh', lines: 42 },
  'contact.js': { icon: 'Mail', type: 'js', lines: 31 },
  'README.md': { icon: 'FileCode2', type: 'md', lines: 56 },
  'package.json': { icon: 'FileJson', type: 'json', lines: 24 },
};

export const PROJECTS = [
  {
    id: "clientflow",
    name: "ClientFlow",
    category: "projects",
    version: "v1.0.0",
    publisher: "abhisheksinha20p",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe", "Docker", "Tailwind CSS"],
    shortDesc: "Freelance management platform for client relationships and project tracking.",
    desc: "ClientFlow is a comprehensive freelance management platform designed to streamline client relationships, project tracking, and invoicing. Provides a centralized dashboard for freelancers and a secure portal for clients. Features dual-portal access, RBAC authentication, and Stripe payment integration.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
    color: "cyan",
    stars: 124,
    downloads: "2.1K",
    issues: 2,
    github: "https://github.com/abhisheksinha20p/ClientFlow.git",
    live: "https://client-flow-teal.vercel.app/",
    changelog: [
      { v: "1.0.0", detail: "Initial release with dual-portal system and Stripe integration." }
    ]
  },
  {
    id: "vera",
    name: "Vera",
    category: "projects",
    version: "v1.0.0",
    publisher: "abhisheksinha20p",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Docker"],
    shortDesc: "Modern task management application focused on simplicity and productivity.",
    desc: "Vera is a modern full-stack task management application focused on simplicity and productivity. Features secure authentication, a focus dashboard, and a clean glassmorphism-based UI. Designed to help users stay organized and productive with minimal friction.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    color: "purple",
    stars: 89,
    downloads: "1.5K",
    issues: 1,
    github: "https://github.com/abhisheksinha20p/Vera",
    live: "https://vera-3m9k2bkdy-avis-projects-87f288a4.vercel.app/",
    changelog: [
      { v: "1.0.0", detail: "Initial release with task management and focus dashboard." }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  { type: 'experience', date: 'Oct 2025', title: 'Full Stack & Mobile Developer', desc: 'Freelance at Tech Signific. Building Fintech mobile apps.', hash: 'e4f5g6h' },
  { type: 'experience', date: 'Jan 2025', title: 'Full Stack Developer Intern', desc: 'Tech Signific. Developed REST APIs and responsive UIs.', hash: 'z1x2c3v' },
  { type: 'project', date: 'Oct 2024', title: 'Deployed ClientFlow', desc: 'Released v1.0.0 with dual-portal system and Stripe integration.', hash: 'a1b2c3d' },
  { type: 'project', date: 'Sep 2024', title: 'Released Vera', desc: 'Launched task management app with glassmorphism UI.', hash: '7j8k9l0' },
];

export const TERMINAL_BOOT: TerminalBootItem[] = [
  { delay: 0, text: "> Initializing AbhiOS v4.2...", color: "#64748B" },
  { delay: 200, text: "> Loading kernel modules [OK]", color: "#39FF14" },
  { delay: 400, text: "> Mounting portfolio filesystem... done", color: "#39FF14" },
  { delay: 600, text: "> Starting dev server on :3000", color: "#00F0FF" },
  { delay: 800, text: "> Compiling TypeScript... 0 errors", color: "#39FF14" },
  { delay: 1000, text: "> Ready. Type \"help\" for commands.", color: "#E2E8F0" },
];

export const TERMINAL_COMMANDS: Record<string, () => string[]> = {
  help: () => ["Available commands: help, about, projects, whoami, open, run, install, launch, clear, mail"],
  whoami: () => ["abhi — Full Stack Developer, Builder of digital experiences."],
  projects: () => PROJECTS.map((p: Project) => `${p.id} - v${p.version} - ${p.stars} stars`),
};
