import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from './data/portfolio';
import { Link } from './Link';
import { usePath } from './router';
import { useScrollMotion } from './useScrollMotion';
import { NavBar } from './NavBar';
import { Home, Work, Experience, Skills, Ideas, Resume, ContactPage, NotFound } from './pages';

const ROUTES: Record<string, { title: string; Page: () => React.JSX.Element }> = {
  '/': { title: 'Home', Page: Home },
  '/work': { title: 'Work', Page: Work },
  '/experience': { title: 'Experience', Page: Experience },
  '/skills': { title: 'Skills', Page: Skills },
  '/ideas': { title: 'Ideas', Page: Ideas },
  '/resume': { title: 'Resume', Page: Resume },
  '/contact': { title: 'Contact', Page: ContactPage },
};

const NAV = ['/', '/work', '/experience', '/skills', '/ideas', '/resume'];
const BASE_TITLE = document.title;

export default function App() {
  const path = usePath();
  const route = ROUTES[path];
  const Page = route?.Page ?? NotFound;

  useScrollMotion(path);

  useEffect(() => {
    document.title = !route ? `Not found · ${PROFILE.name}` : path === '/' ? BASE_TITLE : `${route.title} · ${PROFILE.name}`;
  }, [path, route]);

  const navLink = (to: string, className: string) => (
    <Link to={to} className={className} aria-current={path === to ? 'page' : undefined}>
      {ROUTES[to].title}
    </Link>
  );

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      {/* Solid, blurred bar that sits above the content (sticky, so it never overlaps the page top). */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <nav className="wrap flex h-16 items-center justify-between gap-4" aria-label="Main">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight">{PROFILE.name}</Link>

          <NavBar path={path} items={NAV.map((to) => ({ to, label: ROUTES[to].title }))} />

          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn hidden !py-2 sm:inline-flex" aria-current={path === '/contact' ? 'page' : undefined}>
              Contact
            </Link>
            {/* Mobile menu: native <details>, closed again after a pick */}
            <details className="menu relative lg:hidden">
              <summary className="icon-btn cursor-pointer list-none" aria-label="Open menu">
                <span className="relative grid place-items-center">
                  <Menu size={18} aria-hidden className="menu-open" />
                  <X size={18} aria-hidden className="menu-close absolute" />
                </span>
              </summary>
              <ul
                className="panel absolute right-0 mt-2 w-52 p-2 shadow-xl"
                onClick={(e) => { (e.currentTarget.parentElement as HTMLDetailsElement).open = false; }}
              >
                {[...NAV, '/contact'].map((to) => (
                  <li key={to}>{navLink(to, 'block rounded-xl px-4 py-2.5 hover:bg-ink/[0.05] aria-[current=page]:text-primary')}</li>
                ))}
              </ul>
            </details>
          </div>
        </nav>
      </header>

      <main id="main" key={path}>
        <Page />
      </main>

      <footer className="border-t border-line">
        <div className="wrap flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[...NAV, '/contact'].map((to) => <li key={to}>{navLink(to, 'link')}</li>)}
          </ul>
        </div>
      </footer>
    </>
  );
}
