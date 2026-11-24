import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

// Tiny History-API router: the site has a handful of fixed pages, so a library would be overkill.

const subscribe = (cb: () => void) => {
  addEventListener('popstate', cb);
  return () => removeEventListener('popstate', cb);
};
const getPath = () => location.pathname.replace(/\/+$/, '') || '/';

export const usePath = () => useSyncExternalStore(subscribe, getPath);

export const navigate = (to: string) => {
  if (to === getPath()) return scrollTo({ top: 0, behavior: 'smooth' });
  const go = () => {
    history.pushState(null, '', to);
    dispatchEvent(new PopStateEvent('popstate'));
    scrollTo({ top: 0, behavior: 'instant' });
  };
  // Cross-fade pages with the View Transitions API where supported (styles in index.css).
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return go();
  document.startViewTransition(() => flushSync(go));
};
