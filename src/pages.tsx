import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, Download, Github, Globe, Linkedin, Mail, PenLine } from 'lucide-react';
import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, IDEAS, EDUCATION, CERTIFICATIONS, type Project } from './data/portfolio';
import { Contact } from './Contact';
import { Link } from './Link';

// CSS custom properties (e.g. --rot) aren't in React's style type.
const vars = (o: Record<string, string>) => o as CSSProperties;

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2">
    {children} <ArrowUpRight size={14} aria-hidden />
  </a>
);

const PageHead = ({ n, label, title, intro, children }: { n: string; label: string; title: string; intro?: string; children?: ReactNode }) => (
  <header className="mb-14 max-w-3xl">
    <p className="eyebrow rise mb-4"><span className="text-accent">{n}</span> / {label}</p>
    <h1 className="title rise" style={{ animationDelay: '.05s' }}>{title}</h1>
    {intro && <p className="rise mt-6 text-lg leading-relaxed text-muted" style={{ animationDelay: '.1s' }}>{intro}</p>}
    {children && <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '.15s' }}>{children}</div>}
  </header>
);

const Page = ({ children }: { children: ReactNode }) => <div className="wrap page">{children}</div>;

const DownloadResume = ({ ghost = false }: { ghost?: boolean }) => (
  <a href={PROFILE.resume} download="Abhishek_Sinha_Resume.pdf" className={ghost ? 'btn-ghost' : 'btn'}>
    <Download size={16} aria-hidden /> Download resume
  </a>
);

/* ---------------------------------------------------------------- Home */

const SECTIONS = [
  { to: '/work', title: 'Work', text: 'Vera and ClientFlow, designed, built and shipped end to end.' },
  { to: '/experience', title: 'Experience', text: 'Three roles at Tech Signific, from intern to production engineer.' },
  { to: '/skills', title: 'Skills', text: 'Frontend, mobile, backend, data, security and ops.' },
  { to: '/ideas', title: 'Ideas', text: 'Problems I’m exploring next.' },
  { to: '/resume', title: 'Resume', text: 'Everything on one page, with a PDF to download.' },
  { to: '/contact', title: 'Contact', text: 'Send a message or find me online.' },
];

export const Home = () => (
  <>
    <section className="relative overflow-hidden">
      <div className="glow -right-40 -top-40 h-[36rem] w-[36rem]" aria-hidden />
      <div className="wrap relative grid min-h-[calc(100svh-4rem)] items-center gap-16 py-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="rise font-serif text-[clamp(2.75rem,5.2vw,4.75rem)] leading-[0.95] tracking-tight">
            {PROFILE.role}.
            <span className="mt-4 block text-[clamp(1.6rem,2.7vw,2.4rem)] leading-[1.1] italic text-muted">{PROFILE.headline}</span>
          </h1>
          <p className="rise mt-8 max-w-xl text-[15px] leading-relaxed text-muted" style={{ animationDelay: '.1s' }}>
            {PROFILE.title}
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: '.2s' }}>
            <Link to="/work" className="btn">See my work <ArrowRight size={16} aria-hidden /></Link>
            <DownloadResume ghost />
          </div>
          <div className="rise mt-10 flex gap-2" style={{ animationDelay: '.3s' }}>
            {[
              { href: PROFILE.github, label: 'GitHub', icon: <Github size={18} aria-hidden /> },
              { href: PROFILE.linkedin, label: 'LinkedIn', icon: <Linkedin size={18} aria-hidden /> },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="icon-btn">{s.icon}</a>
            ))}
            <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="icon-btn"><Mail size={18} aria-hidden /></a>
          </div>
        </div>

        {/* Real product screens that drift with the scroll and settle at an angle */}
        <div data-motion className="rise relative mx-auto aspect-[5/4] w-full max-w-xl lg:col-span-6" style={{ animationDelay: '.25s' }} aria-hidden>
          <div className="frame drift absolute left-0 top-[14%] w-[80%]" style={vars({ '--rot': '-4deg', '--spin': '-6deg', '--depth': '0.6' })}>
            <img src="/img/clientflow.png" alt="" width={1536} height={1024} />
          </div>
          <div className="phone drift absolute right-[3%] top-0 w-[33%]" style={vars({ '--rot': '6deg', '--spin': '10deg', '--depth': '-1.2' })}>
            <img src="/img/vera-screen-today.png" alt="" width={376} height={840} />
          </div>
        </div>
      </div>
    </section>

    <section className="wrap pb-24" aria-labelledby="explore">
      <h2 id="explore" className="eyebrow mb-6">Explore</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s, i) => (
          <li key={s.to} className="reveal">
            <Link to={s.to} className="card group flex h-full flex-col p-7 transition-colors hover:border-accent/50">
              <span className="eyebrow mb-6 text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex items-center justify-between font-serif text-3xl">
                {s.title}
                <ArrowRight size={20} aria-hidden className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </span>
              <span className="mt-3 text-[15px] text-muted">{s.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </>
);

/* ---------------------------------------------------------------- Work */

const ProjectCard = ({ p, i }: { p: Project; i: number }) => {
  const flip = i % 2 === 1;
  return (
    <article className="card reveal relative overflow-hidden" style={vars({ '--tint': p.tint })}>
      <div className={`glow -bottom-48 h-[28rem] w-[28rem] ${flip ? '-left-40' : '-right-40'}`} aria-hidden />
      <div className="relative grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <div className={flip ? 'lg:order-2' : ''}>
          <p className="eyebrow mb-4">{String(i + 1).padStart(2, '0')} · {p.year}</p>
          <h2 className="font-serif text-5xl leading-none sm:text-6xl">{p.name}</h2>
          <p className="mt-3 text-lg text-muted">{p.tagline}</p>
          <p className="mt-6 text-[15px] leading-relaxed">{p.problem}</p>

          <ul className="mt-6 space-y-2.5 text-[15px] text-muted">
            {p.built.map((b) => (
              <li key={b} className="flex gap-3">
                <Check size={18} aria-hidden className="mt-0.5 shrink-0" style={{ color: `rgb(${p.tint})` }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm"><span className="label mr-2">Role</span>{p.role}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
            {p.stack.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn">
                <Globe size={16} aria-hidden /> {p.live.includes('play.google.com') ? 'Get it on Google Play' : 'Visit live site'}
              </a>
            )}
            {p.website && (
              <a href={p.website} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Globe size={16} aria-hidden /> Visit {p.name} website
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github size={16} aria-hidden /> View code
              </a>
            )}
          </div>
        </div>

        <div data-motion className={flip ? 'lg:order-1' : ''}>
          <a
            href={p.website ?? p.live ?? p.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${p.name}`}
            className="frame drift block"
            style={vars({ '--rot': flip ? '2deg' : '-2deg', '--spin': flip ? '-5deg' : '5deg', '--depth': '0.5' })}
          >
            <img src={p.image} alt={`${p.name} screenshots`} loading="lazy" width={1536} height={1024} />
          </a>
        </div>
      </div>
    </article>
  );
};

export const Work = () => (
  <Page>
    <PageHead n="01" label="Work" title="Products I designed, built and shipped end to end." />
    <div className="space-y-10">
      {PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Experience */

const Roles = () => (
  <ol className="space-y-6">
    {EXPERIENCE.map((j, i) => (
      <li key={j.title + j.period} className={`card reveal p-6 sm:p-8 ${i === 0 ? 'border-accent/40' : ''}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-medium">{j.title}</h2>
          <p className="eyebrow">{j.period}</p>
        </div>
        <p className="mt-1 text-muted">{j.company}{i === 0 && <span className="ml-2 text-accent">Current</span>}</p>
        <ul className="mt-4 space-y-1.5 text-[15px] text-muted">
          {j.points.map((pt) => <li key={pt}>{pt}</li>)}
        </ul>
      </li>
    ))}
  </ol>
);

export const Experience = () => (
  <Page>
    <PageHead n="02" label="Experience" title="From intern to production engineer." intro={PROFILE.summary} />
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8"><Roles /></div>
      <aside className="space-y-6 lg:col-span-4">
        <div className="card reveal p-6">
          <h2 className="label mb-2">Education</h2>
          <p className="font-medium">{EDUCATION.degree}</p>
          <p className="text-sm text-muted">{EDUCATION.school} · {EDUCATION.period}</p>
        </div>
        <div className="card reveal p-6">
          <h2 className="label mb-2">Certifications</h2>
          <ul className="space-y-1.5 text-sm text-muted">{CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </aside>
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Skills */

export const Skills = () => (
  <Page>
    <PageHead n="03" label="Skills" title="The tools I reach for." intro="What I use day to day to take products from the first screen to production." />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKILLS.map((s) => (
        <div key={s.group} className="card reveal p-7">
          <h2 className="label mb-5">{s.group}</h2>
          <ul className="flex flex-wrap gap-2">{s.items.map((it) => <li key={it} className="chip text-xs">{it}</li>)}</ul>
        </div>
      ))}
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Ideas */

export const Ideas = () => (
  <Page>
    <PageHead n="04" label="Ideas" title="Problems I’m working through." intro="Small tools I want to exist. Some are sketches, some are already half-built." />
    <div className="grid gap-4 md:grid-cols-3">
      {IDEAS.map((idea) => (
        <article key={idea.title} className="card reveal flex flex-col p-7">
          <p className="chip mb-6 self-start">{idea.status}</p>
          <h2 className="mb-4 font-serif text-2xl leading-tight">{idea.title}</h2>
          <p className="mb-4 text-[15px]"><span className="label mb-1 block">Problem</span>{idea.problem}</p>
          <p className="text-[15px] text-muted"><span className="label mb-1 block">Approach</span>{idea.approach}</p>
        </article>
      ))}
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Resume */

export const Resume = () => (
  <Page>
    <PageHead n="05" label="Resume" title={PROFILE.name} intro={PROFILE.title}>
      <DownloadResume />
      <Link to="/contact" className="btn-ghost">Get in touch</Link>
    </PageHead>

    <div className="card reveal grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
      <div className="space-y-10 lg:col-span-8">
        <section>
          <h2 className="label mb-3">Summary</h2>
          <p className="leading-relaxed">{PROFILE.summary}</p>
        </section>
        <section>
          <h2 className="label mb-5">Experience</h2>
          <ol className="space-y-7">
            {EXPERIENCE.map((j) => (
              <li key={j.title + j.period}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium">{j.title} · <span className="text-muted">{j.company}</span></h3>
                  <p className="eyebrow">{j.period}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-muted marker:text-accent">
                  {j.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="label mb-5">Projects</h2>
          <ul className="space-y-4">
            {PROJECTS.map((p) => (
              <li key={p.name}>
                <h3 className="font-medium">{p.name} <span className="text-muted">· {p.year}</span></h3>
                <p className="text-[15px] text-muted">{p.tagline}. {p.stack.slice(0, 6).join(', ')}.</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-10 lg:col-span-4">
        <section>
          <h2 className="label mb-3">Contact</h2>
          <ul className="space-y-2 text-[15px]">
            <li><a href={`mailto:${PROFILE.email}`} className="link break-all">{PROFILE.email}</a></li>
            <li><ExtLink href={PROFILE.linkedin}>LinkedIn</ExtLink></li>
            <li><ExtLink href={PROFILE.github}>GitHub</ExtLink></li>
            <li className="text-muted">{PROFILE.location}</li>
          </ul>
        </section>
        <section>
          <h2 className="label mb-3">Skills</h2>
          <ul className="space-y-3 text-[15px]">
            {SKILLS.map((s) => <li key={s.group}><span className="font-medium">{s.group}:</span> <span className="text-muted">{s.items.join(', ')}</span></li>)}
          </ul>
        </section>
        <section>
          <h2 className="label mb-3">Education</h2>
          <p className="font-medium">{EDUCATION.degree}</p>
          <p className="text-[15px] text-muted">{EDUCATION.school} · {EDUCATION.period}</p>
        </section>
        <section>
          <h2 className="label mb-3">Certifications</h2>
          <ul className="space-y-1.5 text-[15px] text-muted">{CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
      </aside>
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Contact */

export const ContactPage = () => (
  <Page>
    <div className="card relative overflow-hidden">
      <div className="glow -left-40 -top-40 h-[30rem] w-[30rem]" aria-hidden />
      <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
        <div className="lg:col-span-5">
          <p className="eyebrow rise mb-4"><span className="text-accent">06</span> / Contact</p>
          <h1 className="title rise mb-8">Let’s build something together.</h1>
          <ul className="space-y-3">
            <li><a href={`mailto:${PROFILE.email}`} className="link inline-flex items-center gap-2 break-all"><Mail size={16} aria-hidden /> {PROFILE.email}</a></li>
            <li><ExtLink href={PROFILE.linkedin}><Linkedin size={16} aria-hidden /> LinkedIn</ExtLink></li>
            <li><ExtLink href={PROFILE.github}><Github size={16} aria-hidden /> GitHub</ExtLink></li>
            <li><ExtLink href={PROFILE.blog}><PenLine size={16} aria-hidden /> Blog, mycodeyatra.com</ExtLink></li>
          </ul>
          <p className="mt-8 text-sm text-muted">{PROFILE.location}</p>
        </div>
        <div className="lg:col-span-7"><Contact /></div>
      </div>
    </div>
  </Page>
);

/* ---------------------------------------------------------------- 404 */

export const NotFound = () => (
  <Page>
    <PageHead n="404" label="Not found" title="This page doesn’t exist." intro="The link may be old, or the address mistyped.">
      <Link to="/" className="btn">Go home</Link>
    </PageHead>
  </Page>
);
