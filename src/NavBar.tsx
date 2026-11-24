import { useEffect, useRef } from 'react';
import { Link } from './Link';

type Item = { to: string; label: string };

/**
 * Desktop nav with a pill that glides to whichever link is hovered or focused,
 * and settles back on the current page. CSS transitions (not keyframes), so it
 * retargets smoothly while you sweep across links. The pill is positioned
 * straight on the DOM: hover moves shouldn't re-render React.
 */
export const NavBar = ({ items, path }: { items: Item[]; path: string }) => {
  const list = useRef<HTMLUListElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  const moveTo = (el: Element | null | undefined) => {
    const p = pill.current;
    if (!p) return;
    if (!(el instanceof HTMLElement)) { p.style.opacity = '0'; return; }
    p.style.width = `${el.offsetWidth}px`;
    p.style.transform = `translateX(${el.offsetLeft}px)`;
    p.style.opacity = '1';
  };

  useEffect(() => {
    const toCurrent = () => moveTo(list.current?.querySelector('[aria-current="page"]'));
    toCurrent();
    // Enable the glide only after the first placement, so it doesn't slide in on load.
    const id = requestAnimationFrame(() => pill.current?.classList.add('is-ready'));
    addEventListener('resize', toCurrent);
    document.fonts?.ready.then(toCurrent);
    return () => { cancelAnimationFrame(id); removeEventListener('resize', toCurrent); };
  }, [path]);

  const backToCurrent = () => moveTo(list.current?.querySelector('[aria-current="page"]'));

  return (
    <ul ref={list} onMouseLeave={backToCurrent} onBlur={backToCurrent}
      className="relative hidden items-center rounded-full border border-line bg-surface/60 p-1 lg:flex">
      <span ref={pill} aria-hidden className="nav-indicator" style={{ opacity: 0 }} />
      {items.map((it) => (
        <li key={it.to}>
          <Link
            to={it.to}
            className="nav-link"
            aria-current={path === it.to ? 'page' : undefined}
            onMouseEnter={(e) => moveTo(e.currentTarget)}
            onFocus={(e) => moveTo(e.currentTarget)}
          >
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
