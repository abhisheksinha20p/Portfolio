export const ReadmeView = () => (
  <div className="h-full overflow-y-auto p-8 font-mono text-sm bg-[#0D0D14] custom-scrollbar text-[#E2E8F0] max-w-3xl mx-auto">
    <div className="space-y-6">
      <div>
        <h1 className="text-[#00F0FF] text-2xl font-bold"># Abhishek Portfolio</h1>
        <p className="text-[#64748B] mt-2">v4.2.0 — IDE-themed developer portfolio</p>
      </div>
      <div>
        <h2 className="text-[#B026FF]">## Overview</h2>
        <p className="text-[#94A3B8] mt-2 leading-relaxed">An interactive portfolio designed as an IDE workspace. Navigate files, install project extensions, query the AI copilot, and explore the git timeline.</p>
      </div>
      <div>
        <h2 className="text-[#B026FF]">## Quick Start</h2>
        <div className="mt-2 bg-black/40 border border-white/10 rounded p-4 space-y-1">
          <div><span className="text-[#39FF14]">$</span> <span className="text-[#E2E8F0]">open about.js</span> <span className="text-[#64748B]"># Developer profile</span></div>
          <div><span className="text-[#39FF14]">$</span> <span className="text-[#E2E8F0]">run skills.sh</span> <span className="text-[#64748B]"># View skill matrix</span></div>
          <div><span className="text-[#39FF14]">$</span> <span className="text-[#E2E8F0]">install clientflow</span> <span className="text-[#64748B]"># Launch project</span></div>
        </div>
      </div>
      <div>
        <h2 className="text-[#B026FF]">## Projects</h2>
        <div className="mt-2 space-y-2">
          <div className="bg-black/40 border border-white/10 rounded p-3">
            <div className="text-[#E2E8F0] font-bold">ClientFlow</div>
            <div className="text-[#64748B] text-xs mt-1">Freelance management platform with dual-portal system</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded p-3">
            <div className="text-[#E2E8F0] font-bold">Vera</div>
            <div className="text-[#64748B] text-xs mt-1">Modern task management with glassmorphism UI</div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[#B026FF]">## Stack</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {['React 18', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Tailwind CSS'].map(t => (
            <span key={t} className="px-2 py-1 text-xs bg-black/40 border border-[#00F0FF]/20 text-[#00F0FF] rounded">{t}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);
