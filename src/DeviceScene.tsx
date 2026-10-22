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
            <div className="phone-screen">
              <p className="flex justify-between text-[0.55em] opacity-60"><span>9:41</span><span>●●●</span></p>
              <p className="text-[0.6em] opacity-60 mt-[1.2em]">Total balance</p>
              <p className="font-serif text-[1.6em] leading-none">₹2,48,300</p>
              <div className="flex items-end gap-[3%] h-[18%] mt-[1em]">
                {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-accent" style={{ height: `${h}%`, opacity: 0.35 + i * 0.09 }} />
                ))}
              </div>
              <ul className="mt-[1.2em] space-y-[0.7em] text-[0.55em]">
                {[['Stripe payout', '+12,400'], ['Cloud hosting', '−1,850'], ['Client: Acme', '+38,000']].map(([l, a]) => (
                  <li key={l} className="flex justify-between border-b border-line pb-[0.5em]"><span>{l}</span><span>{a}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <span className="chip float-chip" style={{ top: '-6%', left: '4%', ['--z' as string]: '90px' }}>React</span>
        <span className="chip float-chip" style={{ top: '-14%', right: '22%', ['--z' as string]: '160px' }}>React Native</span>
        <span className="chip float-chip" style={{ bottom: '-4%', left: '-4%', ['--z' as string]: '130px' }}>Node.js</span>
      </div>
    </div>
  );
};
