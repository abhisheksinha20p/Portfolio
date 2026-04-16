import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, Zap, SkipForward } from 'lucide-react';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  emoji: string;
  targetId?: string; // DOM element ID to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string; // description of what to do
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to AbhiOS 🚀',
    description: "My portfolio is built to look like a VS Code environment. Let's take a quick guided tour so you know how to use all the functions.",
    emoji: '👨‍💻',
    position: 'center',
  },
  {
    id: 'explorer',
    title: 'File Explorer',
    description: "This contains about me and other stuff. You can open files like about.js and skills.sh to read more.",
    emoji: '📁',
    targetId: 'tour-activity-bar',
    position: 'right',
  },
  {
    id: 'search',
    title: 'Global Search',
    description: "Use this to search files and other things easily across the entire workspace.",
    emoji: '🔍',
    targetId: 'tour-activity-bar',
    position: 'right',
  },
  {
    id: 'git-timeline',
    title: 'Git Timeline',
    description: "This section is to see the experience and project timeline, designed like a real Git commit graph.",
    emoji: '🌿',
    targetId: 'tour-activity-bar',
    position: 'right',
  },
  {
    id: 'projects',
    title: 'Extensions / Projects',
    description: "Extensions are my personal projects that you can 'install' and see right here in the terminal.",
    emoji: '🧩',
    targetId: 'tour-activity-bar',
    position: 'right',
  },
  {
    id: 'tabs',
    title: 'Tabbed Navigation',
    description: "Just like a real IDE, everything opens in tabs so you can switch between views without losing progress.",
    emoji: '📑',
    targetId: 'tour-tabbar',
    position: 'bottom',
  },
  {
    id: 'terminal',
    title: 'Integrated Terminal',
    description: "Click here to open the terminal and try commands like `help` or `projects` via the CLI.",
    emoji: '🖥️',
    targetId: 'tour-terminal-btn',
    position: 'bottom',
  },
  {
    id: 'ai',
    title: 'AI Copilot',
    description: "Talk to my AI Copilot if you want a quick summary of my skills.",
    emoji: '🤖',
    targetId: 'tour-ai-btn',
    position: 'bottom',
  },
  {
    id: 'done',
    title: "You're all set!",
    description: "You're ready to explore. Have fun looking around!",
    emoji: '✅',
    position: 'center',
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

const STORAGE_KEY = 'abhios_tour_v2';

export const useOnboardingTour = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      const t = setTimeout(() => setShouldShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const markComplete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShouldShow(false);
  }, []);

  const resetTour = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setShouldShow(true);
  }, []);

  return { shouldShow, markComplete, resetTour };
};

export const OnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const current = TOUR_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === TOUR_STEPS.length - 1;
  const progress = ((step + 1) / TOUR_STEPS.length) * 100;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (current.targetId) {
      const el = document.getElementById(current.targetId);
      if (el) {
        el.classList.add('tour-highlight');
        return () => el.classList.remove('tour-highlight');
      }
    }
  }, [step, current.targetId]);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  }, [onComplete]);

  const next = () => {
    if (isLast) { dismiss(); return; }
    setStep(s => s + 1);
  };

  const prev = () => {
    if (!isFirst) setStep(s => s - 1);
  };

  const isCenter = !current.targetId || current.position === 'center';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9000] transition-all duration-500"
        style={{
          backgroundColor: `rgba(0,0,0,${visible && !exiting ? 0.65 : 0})`,
          backdropFilter: visible && !exiting ? 'blur(2px)' : 'blur(0px)',
        }}
        onClick={dismiss}
      />

      {/* Tour Card */}
      <div
        className="fixed z-[9001] transition-all duration-500 max-w-[95vw]"
        style={{
          ...(isCenter
            ? {
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${visible && !exiting ? 1 : 0.92})`,
              }
            : getPositionStyle(current.targetId, current.position)
          ),
          opacity: visible && !exiting ? 1 : 0,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="w-[340px] max-w-full rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0D0D14 0%, #12121A 100%)',
            boxShadow: '0 0 60px rgba(0,240,255,0.08), 0 25px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #378ADD, #00F0FF, #1D9E75)' }} />

          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-5 pb-0">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)' }}
              >
                {current.emoji}
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#64748B] mb-0.5 uppercase tracking-widest">
                  Step {step + 1} of {TOUR_STEPS.length}
                </div>
                <h3 className="text-white font-bold text-[14px] leading-tight font-sans">
                  {current.title}
                </h3>
              </div>
            </div>
            <button
              onClick={dismiss}
              className="text-[#475569] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5 shrink-0"
              aria-label="Close tour"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 pt-4 pb-5">
            <p className="text-[#94A3B8] text-[13px] leading-relaxed font-sans">
              {current.description}
            </p>

            {current.action && (
              <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-lg px-3 py-2">
                <Zap size={11} className="shrink-0" />
                <span>{current.action}</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="mx-5 mb-4 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #378ADD, #00F0FF)',
              }}
            />
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 flex items-center justify-between gap-3">
            <button
              onClick={dismiss}
              className="text-[11px] font-mono text-[#475569] hover:text-[#64748B] flex items-center gap-1 transition-colors"
            >
              <SkipForward size={12} /> Skip tour
            </button>

            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={prev}
                  className="flex items-center gap-1 text-[12px] font-mono text-[#64748B] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/5 transition-colors"
                >
                  <ArrowLeft size={13} /> Back
                </button>
              )}
              <button
                onClick={next}
                className="flex items-center gap-1.5 text-[12px] font-bold px-4 py-1.5 rounded-lg transition-all"
                style={{
                  background: isLast
                    ? 'linear-gradient(90deg, #1D9E75, #00F0FF)'
                    : 'linear-gradient(90deg, #378ADD, #00F0FF)',
                  color: '#000',
                }}
              >
                {isLast ? (
                  <>🚀 Let's Go!</>
                ) : (
                  <>Next <ArrowRight size={13} /></>
                )}
              </button>
            </div>
          </div>

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 pb-4">
            {TOUR_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 20 : 5,
                  height: 5,
                  backgroundColor: i === step ? '#00F0FF' : i < step ? '#378ADD' : '#1e293b',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

function getPositionStyle(
  targetId: string | undefined,
  position: TourStep['position'],
): React.CSSProperties {
  if (!targetId || typeof window === 'undefined') return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  const el = document.getElementById(targetId);
  if (!el) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  // If the screen is too small, just center it to avoid ugly overlapping or clipping
  if (window.innerWidth < 768) {
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  }

  const rect = el.getBoundingClientRect();
  const POPUP_W = 340;
  const MARGIN = 16;

  switch (position) {
    case 'right': {
      let calcLeft = rect.right + MARGIN;
      // Reverse if it goes off screen to the right
      if (calcLeft + POPUP_W > window.innerWidth) {
        calcLeft = rect.left - POPUP_W - MARGIN;
      }
      return { top: Math.max(MARGIN, rect.top + rect.height / 2), left: calcLeft, transform: 'translateY(-50%)' };
    }
    case 'left':
      return { top: rect.top + rect.height / 2, right: window.innerWidth - rect.left + MARGIN, transform: 'translateY(-50%)' };
    case 'bottom': {
      let calcLeft = rect.left + rect.width / 2;
      // Clamp bounds left & right
      const minLeft = POPUP_W / 2 + MARGIN;
      const maxLeft = window.innerWidth - POPUP_W / 2 - MARGIN;
      if (calcLeft < minLeft) calcLeft = minLeft;
      if (calcLeft > maxLeft) calcLeft = maxLeft;
      return { top: rect.bottom + MARGIN, left: calcLeft, transform: 'translateX(-50%)' };
    }
    case 'top': {
      let calcLeft = rect.left + rect.width / 2;
      const minLeft = POPUP_W / 2 + MARGIN;
      const maxLeft = window.innerWidth - POPUP_W / 2 - MARGIN;
      if (calcLeft < minLeft) calcLeft = minLeft;
      if (calcLeft > maxLeft) calcLeft = maxLeft;
      return { bottom: window.innerHeight - rect.top + MARGIN, left: calcLeft, transform: 'translateX(-50%)' };
    }
    default:
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  }
}
