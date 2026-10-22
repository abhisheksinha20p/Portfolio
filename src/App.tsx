import { lazy, Suspense, useEffect } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, FileText, Globe, PenLine } from 'lucide-react';
import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, IDEAS, EDUCATION, CERTIFICATIONS } from './data/portfolio';
import { Contact } from './Contact';
import { DeviceScene } from './DeviceScene';

// If the 3D chunk fails to load (e.g. stale cache after a deploy), fall back to the CSS scene.
const Scene3D = lazy(() => import('./Scene3D').catch(() => ({ default: DeviceScene })));
const hasWebGL = (() => {
  try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
})();

const NAV = ['Work', 'Experience', 'Ideas', 'Contact'];

const Label = ({ n, children }: { n: string; children: string }) => (
  <p className="label mb-10">
    <span className="text-accent">{n}</span> — {children}
  </p>
);

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
    {children} <ArrowUpRight size={14} aria-hidden />
  </a>
);

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a href="#work" className="skip">Skip to content</a>

      <header className="sticky top-0 z-10 bg-paper/85 backdrop-blur border-b border-line">
        <nav className="wrap flex items-center justify-between h-16">
          <a href="#top" className="font-serif text-xl">Abhishek Sinha</a>
          <ul className="hidden sm:flex gap-8 text-sm">
            {NAV.map((s) => (
              <li key={s}><a href={`#${s.toLowerCase()}`} className="link">{s}</a></li>
            ))}
          </ul>
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">Résumé</a>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="wrap pt-20 pb-24 sm:pt-28 sm:pb-32 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label flex items-center gap-2 mb-8 rise">
              <span className="dot" aria-hidden /> {PROFILE.status} · {PROFILE.location}
            </p>
            <h1 className="font-serif text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.95] tracking-tight rise" style={{ animationDelay: '.1s' }}>
              {PROFILE.role}.<br />
              <span className="text-muted italic">{PROFILE.headline}</span>
            </h1>
            <div className="mt-12 flex flex-wrap gap-4 rise" style={{ animationDelay: '.2s' }}>
              <a href="#work" className="btn">See selected work</a>
              <a href={PROFILE.resume} download="Abhishek_Sinha_Resume.pdf" className="btn-ghost inline-flex items-center gap-2">
                <FileText size={16} aria-hidden /> Download résumé
              </a>
            </div>
          </div>
          {hasWebGL ? (
            <Suspense fallback={<DeviceScene />}><Scene3D /></Suspense>
          ) : (
            <DeviceScene />
          )}
        </section>

        {/* Work */}
        <section id="work" className="wrap py-24 border-t border-line">
          <Label n="01">Selected work</Label>
          <div className="space-y-32">
            {PROJECTS.map((p, i) => (
              <article key={p.name} className="reveal grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <p className="label mb-3">{String(i + 1).padStart(2, '0')} · {p.year}</p>
                  <h2 className="font-serif text-5xl mb-3">{p.name}</h2>
                  <p className="text-lg text-muted mb-8">{p.tagline}</p>

                  <dl className="space-y-6 text-[15px] leading-relaxed">
                    <div><dt className="label mb-1">Problem</dt><dd>{p.problem}</dd></div>
                    <div><dt className="label mb-1">Role</dt><dd>{p.role}</dd></div>
                    <div>
                      <dt className="label mb-1">What I built</dt>
                      <dd>
                        <ul className="list-disc pl-5 space-y-1 marker:text-accent">
                          {p.built.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      </dd>
                    </div>
                  </dl>

                  <ul className="flex flex-wrap gap-2 mt-8" aria-label="Tech stack">
                    {p.stack.map((t) => <li key={t} className="chip">{t}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn">
                        <Globe size={16} aria-hidden className="mr-2" /> Visit live site
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-sm">
                        <Github size={16} aria-hidden /> View code on GitHub
                      </a>
                    )}
                  </div>
                </div>
                <a
                  href={p.live ?? p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg:col-span-7 shot"
                  aria-label={`Open ${p.name}`}
                >
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" width={1536} height={1024} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Experience + skills */}
        <section id="experience" className="wrap py-24 border-t border-line">
          <Label n="02">Experience</Label>
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <p className="font-serif text-3xl leading-snug">{PROFILE.summary}</p>
              <div className="reveal mt-12 space-y-6 text-[15px]">
                <div>
                  <p className="label mb-2">Education</p>
                  <p className="font-medium">{EDUCATION.degree}</p>
                  <p className="text-muted">{EDUCATION.school} · {EDUCATION.period}</p>
                </div>
                <div>
                  <p className="label mb-2">Certifications</p>
                  <ul className="space-y-1 text-muted">{CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
              </div>
            </div>
            <ol className="lg:col-span-7 space-y-12">
              {EXPERIENCE.map((j) => (
                <li key={j.title + j.period} className="reveal grid sm:grid-cols-[10rem_1fr] gap-2 sm:gap-8">
                  <p className="label pt-1">{j.period}</p>
                  <div>
                    <h3 className="text-xl font-medium">{j.title}</h3>
                    <p className="text-muted mb-3">{j.company}</p>
                    <ul className="space-y-1 text-[15px] text-muted">
                      {j.points.map((pt) => <li key={pt}>— {pt}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <p className="label mb-3">{s.group}</p>
                <ul className="space-y-1">{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* Ideas */}
        <section id="ideas" className="wrap py-24 border-t border-line">
          <Label n="03">Ideas I'm working through</Label>
          <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
            {IDEAS.map((idea) => (
              <article key={idea.title} className="reveal bg-paper p-8 flex flex-col">
                <p className="chip self-start mb-6">{idea.status}</p>
                <h3 className="font-serif text-2xl mb-4">{idea.title}</h3>
                <p className="text-[15px] mb-4"><span className="label block mb-1">Problem</span>{idea.problem}</p>
                <p className="text-[15px] text-muted"><span className="label block mb-1">Approach</span>{idea.approach}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="wrap py-24 border-t border-line grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Label n="04">Contact</Label>
            <h2 className="font-serif text-5xl leading-tight mb-8">Let’s build something together.</h2>
            <ul className="space-y-3">
              <li><a href={`mailto:${PROFILE.email}`} className="link inline-flex items-center gap-2"><Mail size={16} aria-hidden /> {PROFILE.email}</a></li>
              <li><ExtLink href={PROFILE.linkedin}><Linkedin size={16} aria-hidden /> LinkedIn</ExtLink></li>
              <li><ExtLink href={PROFILE.github}><Github size={16} aria-hidden /> GitHub</ExtLink></li>
              <li><ExtLink href={PROFILE.blog}><PenLine size={16} aria-hidden /> Blog — mycodeyatra.com</ExtLink></li>
            </ul>
          </div>
          <div className="lg:col-span-7"><Contact /></div>
        </section>
      </main>

      <footer className="wrap py-10 border-t border-line flex justify-between text-sm text-muted">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href="#top" className="link">Back to top ↑</a>
      </footer>
    </>
  );
}
