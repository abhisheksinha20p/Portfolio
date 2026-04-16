import { Activity, PlayCircle, Loader2, Circle } from 'lucide-react';
import type { Project } from '../../data/portfolio';

interface ProjectWorkspaceViewProps {
  project: Project;
}

export const ProjectWorkspaceView = ({ project }: ProjectWorkspaceViewProps) => {
  return (
    <div className="h-full overflow-y-auto p-8 relative bg-[#0D0D14] custom-scrollbar animate-fade-in-up">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00F0FF]/10 via-[#0D0D14] to-[#0D0D14] h-96 pointer-events-none"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="w-12 h-12 rounded border border-[#00F0FF]/30 flex items-center justify-center bg-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Activity size={24} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">{project.name}</h1>
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14] font-mono">
                <Circle size={6} fill="currentColor" className="animate-pulse"/> ACTIVE ENV
              </span>
            </div>
            <p className="text-[#64748B] font-mono text-xs mt-1">Running locally on port 3000</p>
          </div>
          <div className="ml-auto flex gap-3">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 hover:bg-[#00F0FF]/20 rounded text-sm flex items-center gap-2 transition-colors"
              >
                <PlayCircle size={16} /> Open App
              </a>
            ) : (
              <button
                disabled
                className="px-4 py-1.5 bg-white/5 text-[#64748B] border border-white/10 rounded text-sm flex items-center gap-2 cursor-not-allowed opacity-50"
              >
                <PlayCircle size={16} /> No Demo Available
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#12121A] border border-white/5 rounded-xl p-6">
              <h3 className="text-[#E2E8F0] font-bold text-sm mb-4">Environment Telemetry</h3>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B]">CPU Usage</span>
                  <div className="w-24 h-1.5 bg-white/5 rounded">
                    <div className="h-full bg-[#00F0FF] w-1/4 rounded shadow-[0_0_5px_#00F0FF]"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B]">Memory</span>
                  <div className="w-24 h-1.5 bg-white/5 rounded">
                    <div className="h-full bg-[#B026FF] w-1/2 rounded shadow-[0_0_5px_#B026FF]"></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Network Rx/Tx</span>
                  <span className="text-[#E2E8F0]">1.2MB / 450KB</span>
                </div>
              </div>
            </div>
            <div className="bg-[#12121A] border border-white/5 rounded-xl p-6">
              <h3 className="text-[#E2E8F0] font-bold text-sm mb-4">Active Processes</h3>
              <div className="space-y-3 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-[#39FF14]">
                  <Loader2 size={12} className="animate-spin" /> node server.js
                </div>
                <div className="flex items-center gap-2 text-[#39FF14]">
                  <Loader2 size={12} className="animate-spin" /> webpack --watch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
