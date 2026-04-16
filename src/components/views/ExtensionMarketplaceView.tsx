import { useState } from 'react';
import { 
  Blocks, Download, Loader2, Cpu, Settings, 
  Trash2, Activity, Star, ShieldCheck, Github, ExternalLink
} from 'lucide-react';
import type { Project } from '../../data/portfolio';

interface ExtensionMarketplaceViewProps {
  project: Project;
  isInstalled: boolean;
  isInstalling: boolean;
  onInstall: (id: string) => void;
  onUninstall: (id: string) => void;
  onLaunch: (id: string) => void;
}

export const ExtensionMarketplaceView = ({ 
  project, 
  isInstalled, 
  isInstalling, 
  onInstall, 
  onUninstall, 
  onLaunch 
}: ExtensionMarketplaceViewProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'changelog' | 'dependencies'>('details');

  return (
    <div className="h-full overflow-y-auto p-6 relative bg-[#0D0D14] custom-scrollbar animate-fade-in-up font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-2xl bg-[#12121A] border border-white/10 flex items-center justify-center shadow-lg shrink-0">
            <Blocks size={48} className="text-[#00F0FF]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              {project.name}
              {isInstalled && (
                <span className="bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] px-2 py-0.5 rounded border border-[#00F0FF]/20 font-mono tracking-widest uppercase">
                  Installed
                </span>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm mt-2 text-[#64748B]">
              <span className="text-[#00F0FF] flex items-center gap-1">
                <ShieldCheck size={14} /> {project.publisher}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Download size={14} /> {project.downloads}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#FFBD2E]">
                <Star size={14} /> {project.stars}
              </span>
              <span>•</span>
              <span>v{project.version}</span>
            </div>
            <p className="text-[#E2E8F0] mt-3 text-sm">{project.shortDesc}</p>
            
            <div className="flex items-center gap-3 mt-5">
              {isInstalling ? (
                <button disabled className="px-6 py-1.5 bg-[#00F0FF]/20 text-[#00F0FF] rounded-md font-semibold text-sm flex items-center gap-2 border border-[#00F0FF]/30 cursor-not-allowed w-32 justify-center">
                  <Loader2 size={16} className="animate-spin" /> Installing
                </button>
              ) : isInstalled ? (
                <>
                  <button 
                    onClick={() => onLaunch(project.id)} 
                    className="px-6 py-1.5 bg-[#00F0FF] text-black hover:bg-[#39FF14] transition-colors rounded-md font-semibold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    <Cpu size={16} /> Launch Environment
                  </button>
                  <button 
                    onClick={() => onUninstall(project.id)} 
                    className="px-4 py-1.5 bg-white/5 hover:bg-[#FF5F56]/10 hover:text-[#FF5F56] border border-white/10 hover:border-[#FF5F56]/30 transition-colors text-[#E2E8F0] rounded-md text-sm flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Uninstall
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => onInstall(project.id)} 
                  className="px-8 py-1.5 bg-[#00F0FF] hover:bg-white text-[#0A0A0F] transition-all duration-300 rounded-md font-semibold text-sm shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center gap-2"
                >
                  <Download size={16} /> Install
                </button>
              )}
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              <button 
                className="p-1.5 text-[#64748B] hover:text-white rounded bg-white/5 border border-white/10 transition-colors opacity-50 cursor-not-allowed" 
                title="Settings not available for this module"
                disabled
              >
                <Settings size={16} />
              </button>
            </div>
            
            <div className={`h-1 bg-[#12121A] mt-4 rounded-full overflow-hidden transition-all duration-300 ${isInstalling ? 'opacity-100' : 'opacity-0 h-0 mt-0'}`}>
              <div className="h-full bg-[#00F0FF] w-1/3 rounded-full animate-[loadingSlide_1s_ease-in-out_infinite] shadow-[0_0_10px_#00F0FF]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 border-b border-white/10 mb-6">
          {['Details', 'Changelog', 'Dependencies'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab.toLowerCase() as 'details' | 'changelog' | 'dependencies')}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.toLowerCase() 
                  ? 'text-white border-[#00F0FF]' 
                  : 'text-[#64748B] border-transparent hover:text-[#E2E8F0]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-[#E2E8F0] pb-12">
          {activeTab === 'details' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 text-white flex items-center gap-2">
                  <Activity size={18} className="text-[#00F0FF]" /> Overview
                </h2>
                <p className="leading-relaxed text-[#94A3B8]">{project.desc}</p>
                <div className="mt-6 aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl relative">
                  <img src={project.image} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent"></div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 text-white">Features & Tech Stack</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t: string) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#00F0FF] shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="list-disc pl-5 space-y-2 text-[#94A3B8] text-sm marker:text-[#00F0FF]">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                  <li>Seamless integration with AbhiOS ecosystem.</li>
                  <li>Custom dark mode theming out of the box.</li>
                </ul>
              </div>

              {(project.github || project.live) && (
                <div>
                  <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 text-white flex items-center gap-2">
                    <ExternalLink size={18} className="text-[#00F0FF]" /> Links
                  </h2>
                  <div className="flex gap-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00F0FF]/50 rounded-lg transition-all text-sm text-[#E2E8F0]"
                      >
                        <Github size={16} /> GitHub
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 hover:border-[#00F0FF] rounded-lg transition-all text-sm text-[#00F0FF]"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className="space-y-6 animate-fade-in-up">
              {project.changelog.map((log: { v: string; detail: string }, i: number) => (
                <div key={i} className="relative pl-6 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-[-24px] before:w-px before:bg-white/10 last:before:hidden">
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[#12121A] border-2 border-[#B026FF]"></div>
                  <h3 className="font-bold text-white font-mono flex items-center gap-2">
                    v{log.v} <span className="text-[10px] bg-white/5 text-[#64748B] px-2 py-0.5 rounded uppercase font-sans tracking-widest">Release</span>
                  </h3>
                  <p className="text-[#94A3B8] text-sm mt-1">{log.detail}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'dependencies' && (
            <div className="animate-fade-in-up space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.tech.map((t: string) => (
                  <div key={t} className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-mono text-[#E2E8F0]">{t.toLowerCase()}</span>
                    <span className="text-xs text-[#00F0FF]">latest</span>
                  </div>
                ))}
              </div>
              <p className="text-[#64748B] text-xs italic mt-4 border-t border-white/5 pt-4">Internal ecosystem dependencies are automatically managed by AbhiOS.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
