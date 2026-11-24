import { useEffect } from 'react';

/**
 * Writes `--p` on every `[data-motion]` element: 0 when it sits in the middle of the
 * viewport, heading to +1 below and -1 above. CSS turns that into drift and tilt, so
 * visuals move as you scroll and settle at their resting angle when centred.
 * The variable lives on an untransformed wrapper, so measuring never feeds back.
 */
export const useScrollMotion = (page: string) => {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...document.querySelectorAll<HTMLElement>('[data-motion]')];
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > 2 * vh) continue;
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        el.style.setProperty('--p', p.toFixed(3));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
    };
  }, [page]); // re-scan when the page changes
};
