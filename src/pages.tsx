import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight, Check, Download, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, IDEAS, EDUCATION, CERTIFICATIONS, type Project } from './data/portfolio';
import { Contact } from './Contact';
import { Link } from './Link';

// CSS custom properties (e.g. --rot) aren't in React's style type.
const vars = (o: Record<string, string>) => o as CSSProperties;

const Ext = ({ href, children, className = 'link' }: { href: string; children: ReactNode; className?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} inline-flex items-center gap-1.5`}>
    {children} <ArrowUpRight size={15} aria-hidden className="opacity-70" />
  </a>
);

const PageHead = ({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) => (
  <header className="mb-16 sm:mb-20">
    <h1 className="title max-w-4xl">{title}</h1>
    {intro && <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{intro}</p>}
    {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
  </header>
);

const Page = ({ children }: { children: ReactNode }) => <div className="wrap page">{children}</div>;

const DownloadResume = ({ quiet = false }: { quiet?: boolean }) => (
  <a href={PROFILE.resume} download="Abhishek_Sinha_Resume.pdf" className={quiet ? 'btn-quiet' : 'btn'}>
    <Download size={17} aria-hidden /> Download resume
  </a>
);

const vera = PROJECTS.find((p) => p.name === 'Vera');

/* ---------------------------------------------------------------- Home */

const INDEX = [
  { to: '/experience', title: 'Experience', text: 'Three roles at Tech Signific, from intern to production engineer' },
  { to: '/skills', title: 'Skills', text: 'Frontend, mobile, backend, data, security and ops' },
  { to: '/ideas', title: 'Ideas', text: 'Small tools I want to exist, and how I would build them' },
  { to: '/resume', title: 'Resume', text: 'Everything on one page, plus the PDF' },
  { to: '/contact', title: 'Contact', text: 'Send a message or find me online' },
];

export const Home = () => (
  <>
    <section className="wrap grid min-h-[calc(100svh-4rem)] items-center gap-14 py-14 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h1 className="hero-name load-1">Abhishek<br />Sinha</h1>
        <p className="load-2 mt-8 max-w-[30ch] font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-tight tracking-tight">
          {PROFILE.headline}
        </p>
        <p className="load-2 mt-4 max-w-[58ch] text-muted">{PROFILE.title}</p>
        <div className="load-3 mt-10 flex flex-wrap items-center gap-3">
          <Link to="/work" className="btn">See my work</Link>
          <DownloadResume quiet />
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn"><Github size={18} aria-hidden /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn"><Linkedin size={18} aria-hidden /></a>
        </div>
      </div>

      {/* The one bold visual: Vera, live on a phone. Drifts with scroll and settles at an angle. */}
      <div data-motion className="load-3 mx-auto w-[min(72vw,300px)] lg:col-span-5">
        <div className="phone drift" style={vars({ '--rot': '4deg', '--spin': '7deg', '--depth': '-0.8' })}>
          <img src="/img/vera-screen-today.png" alt="Vera app, Today screen" width={376} height={840} />
        </div>
        {vera?.live && (
          <p className="mt-8 text-center text-sm text-muted">
            Vera, my daily planner, is <Ext href={vera.live}>live on Google Play</Ext>
          </p>
        )}
      </div>
    </section>

    <section className="wrap pb-24 sm:pb-32" aria-labelledby="work-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-heading" className="h2">Things I’ve shipped</h2>
        <Link to="/work" className="link">All project details</Link>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Link key={p.name} to="/work" className="group block">
            <div className="frame transition-transform duration-500 group-hover:-translate-y-1">
              <img src={p.image} alt={`${p.name} screenshots`} loading="lazy" width={1536} height={1024} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight group-hover:text-primary">{p.name}</h3>
            <p className="mt-1 text-muted">{p.tagline}</p>
          </Link>
        ))}
      </div>
    </section>

    <section className="wrap pb-24 sm:pb-32" aria-labelledby="more-heading">
      <h2 id="more-heading" className="h2 mb-8">More about me</h2>
      <ul className="rows">
        {INDEX.map((s) => (
          <li key={s.to}>
            <Link to={s.to} className="row-link">
              <span className="font-display text-2xl font-bold tracking-tight">{s.title}</span>
              <span className="text-muted">{s.text}</span>
              <ArrowUpRight size={20} aria-hidden className="hidden rotate-45 text-muted sm:block" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </>
);

/* ---------------------------------------------------------------- Work */

const ProjectRow = ({ p, i }: { p: Project; i: number }) => {
  const flip = i % 2 === 1;
  return (
    <article id={p.name.toLowerCase()} className="grid items-start gap-12 border-t border-line pt-14 lg:grid-cols-12" style={vars({ '--tint': p.tint })}>
      <div className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
        <p className="label">{p.year}</p>
        <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{p.name}</h2>
        <p className="mt-3 text-lg text-muted">{p.tagline}</p>
        <p className="mt-6 leading-relaxed">{p.problem}</p>

        <h3 className="label mt-8">What I built</h3>
        <ul className="mt-3 space-y-2.5">
          {p.built.map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <Check size={18} aria-hidden className="mt-0.5 shrink-0" style={{ color: `rgb(${p.tint})` }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <h3 className="label mt-8">My role</h3>
        <p className="mt-1 text-[15px]">{p.role}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.stack.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.live && (
            <Ext href={p.live} className="btn">{p.live.includes('play.google.com') ? 'Get it on Google Play' : 'Open the live app'}</Ext>
          )}
          {p.website && <Ext href={p.website} className="btn-quiet">Visit the {p.name} website</Ext>}
          {p.github && <Ext href={p.github} className="btn-quiet">Read the code</Ext>}
        </div>
      </div>

      <div data-motion className={`lg:sticky lg:top-28 lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1' : ''}`}>
        <a
          href={p.website ?? p.live ?? p.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.name}`}
          className="frame drift block"
          style={vars({ '--rot': flip ? '1.5deg' : '-1.5deg', '--spin': flip ? '-4deg' : '4deg', '--depth': '0.5' })}
        >
          <img src={p.image} alt={`${p.name} screenshots`} loading="lazy" width={1536} height={1024} />
        </a>
      </div>
    </article>
  );
};

export const Work = () => (
  <Page>
    <PageHead title="Work" intro="Two products I designed, built and launched on my own, from the first screen to production." />
    <div className="space-y-24">
      {PROJECTS.map((p, i) => <ProjectRow key={p.name} p={p} i={i} />)}
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Experience */

export const Experience = () => (
  <Page>
    <PageHead title="Experience" intro={PROFILE.summary} />
    <div className="grid gap-16 lg:grid-cols-12">
      {/* A real timeline, newest first */}
      <ol className="lg:col-span-8">
        {EXPERIENCE.map((j, i) => (
          <li key={j.title + j.period} className="grid gap-2 border-t border-line py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <div>
              <p className="text-sm text-muted">{j.period}</p>
              {i === 0 && <p className="mt-1 text-sm font-medium text-primary">Current role</p>}
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">{j.title}</h2>
              <p className="mt-1 text-muted">{j.company}</p>
              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/85">
                {j.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <aside className="space-y-10 lg:col-span-4">
        <section>
          <h2 className="label mb-3">Education</h2>
          <p className="font-medium">{EDUCATION.degree}</p>
          <p className="mt-1 text-[15px] text-muted">{EDUCATION.school}</p>
          <p className="text-[15px] text-muted">{EDUCATION.period}</p>
        </section>
        <section>
          <h2 className="label mb-3">Certifications</h2>
          <ul className="space-y-2 text-[15px]">{CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
        <DownloadResume quiet />
      </aside>
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Skills */

export const Skills = () => (
  <Page>
    <PageHead title="Skills" intro="What I use day to day to take a product from the first screen to production." />
    <dl className="rows">
      {SKILLS.map((s) => (
        <div key={s.group} className="grid gap-4 py-7 sm:grid-cols-[14rem_1fr] sm:gap-8">
          <dt className="font-display text-2xl font-bold tracking-tight">{s.group}</dt>
          <dd><ul className="flex flex-wrap gap-2">{s.items.map((it) => <li key={it} className="chip text-[15px]">{it}</li>)}</ul></dd>
        </div>
      ))}
    </dl>
  </Page>
);

/* ---------------------------------------------------------------- Ideas */

export const Ideas = () => (
  <Page>
    <PageHead title="Ideas" intro="Small tools I want to exist. Some are sketches, some are already half-built." />
    <div className="rows">
      {IDEAS.map((idea) => (
        <article key={idea.title} className="grid gap-6 py-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight">{idea.title}</h2>
            <p className="mt-2 text-sm font-medium text-primary">{idea.status}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            <div><h3 className="label mb-1.5">The problem</h3><p className="leading-relaxed">{idea.problem}</p></div>
            <div><h3 className="label mb-1.5">How I’d solve it</h3><p className="leading-relaxed text-ink/85">{idea.approach}</p></div>
          </div>
        </article>
      ))}
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Resume */

export const Resume = () => (
  <Page>
    <PageHead title="Resume" intro={PROFILE.title}>
      <DownloadResume />
      <Link to="/contact" className="btn-quiet">Get in touch</Link>
    </PageHead>

    <div className="panel grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
      <div className="space-y-10 lg:col-span-8">
        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight">{PROFILE.name}</h2>
          <p className="mt-4 leading-relaxed">{PROFILE.summary}</p>
        </section>
        <section>
          <h2 className="label mb-5">Experience</h2>
          <ol className="space-y-7">
            {EXPERIENCE.map((j) => (
              <li key={j.title + j.period}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold">{j.title}, <span className="font-normal text-muted">{j.company}</span></h3>
                  <p className="text-sm text-muted">{j.period}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-ink/85 marker:text-primary">
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
                <h3 className="font-semibold">{p.name} <span className="font-normal text-muted">({p.year})</span></h3>
                <p className="text-[15px] text-ink/85">{p.tagline}. Built with {p.stack.slice(0, 6).join(', ')}.</p>
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
            <li><Ext href={PROFILE.linkedin}>LinkedIn</Ext></li>
            <li><Ext href={PROFILE.github}>GitHub</Ext></li>
            <li className="text-muted">{PROFILE.location}</li>
          </ul>
        </section>
        <section>
          <h2 className="label mb-3">Skills</h2>
          <ul className="space-y-3 text-[15px]">
            {SKILLS.map((s) => <li key={s.group}><span className="font-semibold">{s.group}</span><br /><span className="text-ink/80">{s.items.join(', ')}</span></li>)}
          </ul>
        </section>
        <section>
          <h2 className="label mb-3">Education</h2>
          <p className="font-medium">{EDUCATION.degree}</p>
          <p className="text-[15px] text-muted">{EDUCATION.school}, {EDUCATION.period}</p>
        </section>
        <section>
          <h2 className="label mb-3">Certifications</h2>
          <ul className="space-y-1.5 text-[15px]">{CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
      </aside>
    </div>
  </Page>
);

/* ---------------------------------------------------------------- Contact */

export const ContactPage = () => (
  <Page>
    <div className="grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h1 className="title">Let’s build something together.</h1>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
          Hiring, a freelance project or a question about my work: write to me and I’ll get back to you.
        </p>
        <a href={`mailto:${PROFILE.email}`} className="link mt-10 inline-flex items-center gap-2 break-all font-display text-xl font-semibold sm:text-2xl">
          <Mail size={22} aria-hidden className="shrink-0" /> {PROFILE.email}
        </a>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <li><Ext href={PROFILE.linkedin}>LinkedIn</Ext></li>
          <li><Ext href={PROFILE.github}>GitHub</Ext></li>
          <li><Ext href={PROFILE.blog}>Blog at mycodeyatra.com</Ext></li>
        </ul>
        <p className="mt-8 text-muted">{PROFILE.location}</p>
      </div>
      <div className="panel p-6 sm:p-8 lg:col-span-6"><Contact /></div>
    </div>
  </Page>
);

/* ---------------------------------------------------------------- 404 */

export const NotFound = () => (
  <Page>
    <PageHead title="This page doesn’t exist." intro="The link may be old, or the address mistyped.">
      <Link to="/" className="btn">Go to the home page</Link>
    </PageHead>
  </Page>
);
