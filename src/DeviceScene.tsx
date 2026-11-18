import { useEffect, useRef } from 'react';
import { PROJECTS } from './data/portfolio';

// Pure-CSS 3D laptop + phone. Tilts toward the pointer; no WebGL needed.
export const DeviceScene = () => {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!fine.matches) return;
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      stage.current?.style.setProperty('--ry', `${-20 + x * 16}deg`);
      stage.current?.style.setProperty('--rx', `${24 - y * 10}deg`);
    };
    addEventListener('pointermove', onMove);
    return () => removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="scene rise" style={{ animationDelay: '.3s' }} aria-hidden>
      <div ref={stage} className="stage">
        <div className="laptop">
          <div className="lid">
            <img src={PROJECTS[0].image} alt="" />
          </div>
          <div className="base" />
        </div>

        <div className="phone-pos">
          <div className="phone">
            <img src="/img/vera-screen-today.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <span className="chip float-chip" style={{ top: '-6%', left: '4%', ['--z' as string]: '90px' }}>React</span>
        <span className="chip float-chip" style={{ top: '-14%', right: '22%', ['--z' as string]: '160px' }}>React Native</span>
        <span className="chip float-chip" style={{ bottom: '-4%', left: '-4%', ['--z' as string]: '130px' }}>Node.js</span>
      </div>
    </div>
  );
};
