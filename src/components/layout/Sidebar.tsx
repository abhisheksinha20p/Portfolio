import React from 'react';
import { ChevronDown, GitCommit, GitBranch, FileCode2, Blocks, Search, MoreHorizontal, Settings } from 'lucide-react';
import { FILES, PROJECTS, TIMELINE, type FileConfig } from '../../data/portfolio';

interface SidebarProps {
  isOpen: boolean;
  activeView: string;
  activeTab: string;
  onOpenTab: (id: string) => void;
  onInstallProject?: (id: string) => void;
  installedProjects?: string[];
  installingProject?: string | null;
  searchQuery?: string;
  extensionSearch?: string;
  setExtensionSearch?: (query: string) => void;
  setSearchQuery?: (query: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  FileCode2: <FileCode2 size={16} className="text-[#E34F26]" />,
  TerminalSquare: <Blocks size={16} className="text-[#39FF14]" />,
  Mail: <Blocks size={16} className="text-[#B026FF]" />,
  FileJson: <Blocks size={16} className="text-[#FFBD2E]" />,
};

export const Sidebar = ({ 
  isOpen, 
  activeView, 
  activeTab, 
  onOpenTab,
  onInstallProject,
  installedProjects = [],
  installingProject,
  searchQuery = '',
  extensionSearch = '',
  setExtensionSearch = () => {},
  setSearchQuery = () => {},
}: SidebarProps) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeView) {
      case 'explorer':
        return (
          <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar animate-fade-in-up">
            <div className="px-4 py-3 text-xs font-bold tracking-widest text-[#64748B]">EXPLORER</div>
            <div>
              <div className="flex items-center gap-1 px-2 py-1.5 cursor-pointer text-sm font-bold text-[#E2E8F0]">
                <ChevronDown size={16} /> <span className="ml-1">PORTFOLIO_SRC</span>
              </div>
              <div className="flex flex-col">
                {Object.keys(FILES).map((filename) => {
                  const file = FILES[filename] as FileConfig;
                  return (
                    <div 
                      key={filename} 
                      onClick={() => onOpenTab(filename)}
                      className={`flex items-center gap-2 pl-8 pr-2 py-1 text-sm cursor-pointer font-mono transition-all ${
                        activeTab === filename 
                          ? 'bg-[#00F0FF]/10 text-white border-l-2 border-[#00F0FF]' 
                          : 'border-l-2 border-transparent text-[#64748B] hover:text-[#E2E8F0] hover:bg-white/5'
                      }`}
                    >
                      {iconMap[file.icon] || <FileCode2 size={16} />} <span>{filename}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'search':
        const lowerQ = searchQuery.toLowerCase();
        let results: Array<{ type: string; name: string; id: string }> = [];
        if (lowerQ) {
          const isCategorySearch = lowerQ.includes(':');
          const [cat, term] = isCategorySearch ? lowerQ.split(':') : ['', lowerQ];
          results = [
            ...Object.keys(FILES).map(f => ({ type: 'file', name: f, id: f })),
            ...PROJECTS.map(p => ({ type: 'project', name: p.name, id: p.id }))
          ].filter(item => {
            if (isCategorySearch) {
              return item.type.includes(cat.trim()) && item.name.toLowerCase().includes(term?.trim() || '');
            }
            return item.name.toLowerCase().includes(lowerQ);
          });
        }
        return (
          <div className="flex flex-col flex-1 p-4 overflow-y-auto custom-scrollbar animate-fade-in-up">
            <div className="text-xs font-bold tracking-widest text-[#64748B] mb-4">GLOBAL SEARCH</div>
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. project:nebula"
                className="w-full bg-[#0A0A0F] border border-white/10 rounded pl-9 pr-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all"
              />
            </div>
            <div className="text-[10px] text-[#64748B] font-mono mb-4 leading-relaxed">
              Tip: Use <span className="text-[#00F0FF]">file:</span> or <span className="text-[#00F0FF]">project:</span> prefix
            </div>
            {searchQuery && (
              <div className="space-y-2">
                {results.length > 0 ? results.map((res) => (
                  <div 
                    key={res.id} 
                    onClick={() => onOpenTab(res.type === 'project' ? `ext:${res.id}` : res.id)} 
                    className="p-2 bg-white/5 border border-white/5 rounded cursor-pointer hover:bg-white/10 hover:border-[#00F0FF]/50 transition-colors flex items-center gap-2 font-mono text-xs"
                  >
                    {res.type === 'file' ? <FileCode2 size={12} className="text-[#E34F26]" /> : <Blocks size={12} className="text-[#00F0FF]" />}
                    <span className="text-[#64748B]">{res.type}:</span>
                    <span className="text-[#E2E8F0]">{res.name}</span>
                  </div>
                )) : <div className="text-xs text-[#64748B] font-mono text-center mt-4">No matches found.</div>}
              </div>
            )}
          </div>
        );

      case 'git':
        return (
          <div className="flex flex-col flex-1 p-4 overflow-y-auto custom-scrollbar animate-fade-in-up">
            <div className="text-xs font-bold tracking-widest text-[#64748B] mb-2">SOURCE CONTROL</div>
            <div className="flex items-center gap-2 mb-6 font-mono text-xs bg-[#39FF14]/5 border border-[#39FF14]/20 rounded p-2 text-[#39FF14]">
              <GitBranch size={12} /> <span>main</span>
              <span className="ml-auto text-[#64748B]">↑2 ↓0</span>
            </div>
            <div className="text-xs font-bold tracking-widest text-[#64748B] mb-4">COMMIT HISTORY</div>
            <div className="relative border-l border-[#64748B]/30 ml-3 space-y-6">
              {TIMELINE.map((item, i) => (
                <div key={item.hash || i} className="relative pl-6 group">
                  <div className="absolute -left-[9px] top-1 bg-[#12121A] p-0.5 rounded-full border border-[#00F0FF] group-hover:bg-[#00F0FF]/20 transition-colors">
                    <GitCommit size={12} className={item.type === 'project' ? "text-[#00F0FF]" : "text-[#B026FF]"} />
                  </div>
                  <div className="text-[10px] text-[#64748B] font-mono mb-1">{item.date} • [{item.hash}]</div>
                  <div className="text-sm text-[#E2E8F0] font-sans font-semibold group-hover:text-white transition-colors">{item.title}</div>
                  <div className="text-xs text-[#64748B] font-mono mt-1 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'extensions':
        const filteredProjects = PROJECTS.filter(p => p.name.toLowerCase().includes(extensionSearch.toLowerCase()));
        const installed = filteredProjects.filter(p => installedProjects.includes(p.id));
        const recommended = filteredProjects.filter(p => !installedProjects.includes(p.id));

        return (
          <div className="flex flex-col flex-1 overflow-hidden animate-fade-in-up">
            <div className="px-4 py-3 text-xs font-bold tracking-widest text-[#64748B] flex items-center justify-between shrink-0">
              <span>EXTENSIONS</span>
              <MoreHorizontal size={14} className="cursor-pointer hover:text-white" />
            </div>
            
            <div className="px-4 pb-3 shrink-0">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search Extensions in Marketplace" 
                  value={extensionSearch} 
                  onChange={e => setExtensionSearch(e.target.value)}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded pl-2 pr-2 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {installed.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.02] cursor-pointer text-xs font-bold text-[#E2E8F0] sticky top-0 z-10 backdrop-blur-sm">
                    <ChevronDown size={14} /> <span>INSTALLED ({installed.length})</span>
                  </div>
                  <div className="flex flex-col">
                    {installed.map(proj => (
                      <div 
                        key={proj.id} 
                        onClick={() => onOpenTab(`ext:${proj.id}`)}
                        className={`group flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 ${
                          activeTab === `ext:${proj.id}` 
                            ? 'bg-[#00F0FF]/10 border-[#00F0FF]' 
                            : 'border-transparent hover:bg-white/5'
                        }`}
                      >
                        <Blocks size={28} className="text-[#00F0FF] shrink-0 opacity-80" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-white truncate leading-tight flex items-center justify-between">
                            {proj.name} 
                            <Settings size={12} className="text-[#64748B] hover:text-white invisible group-hover:visible" />
                          </div>
                          <div className="text-[10px] text-[#64748B] truncate mt-0.5">{proj.shortDesc}</div>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#64748B]">
                            <span className="bg-[#00F0FF]/10 text-[#00F0FF] px-1 rounded border border-[#00F0FF]/20">v{proj.version}</span>
                            <span>{proj.publisher}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recommended.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.02] cursor-pointer text-xs font-bold text-[#E2E8F0] sticky top-0 z-10 backdrop-blur-sm">
                    <ChevronDown size={14} /> <span>RECOMMENDED ({recommended.length})</span>
                  </div>
                  <div className="flex flex-col">
                    {recommended.map(proj => {
                      const isInstalling = installingProject === proj.id;
                      return (
                        <div 
                          key={proj.id} 
                          onClick={() => onOpenTab(`ext:${proj.id}`)}
                          className={`group flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 relative ${
                            activeTab === `ext:${proj.id}` 
                              ? 'bg-[#00F0FF]/5 border-[#00F0FF]/50' 
                              : 'border-transparent hover:bg-white/5'
                          }`}
                        >
                          <Blocks size={28} className="text-[#64748B] shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-[#E2E8F0] truncate leading-tight">{proj.name}</div>
                            <div className="text-[10px] text-[#64748B] truncate mt-0.5">{proj.shortDesc}</div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                                <Blocks size={10}/> {proj.stars}
                              </span>
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  onInstallProject?.(proj.id); 
                                }}
                                disabled={isInstalling}
                                className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${
                                  isInstalling 
                                    ? 'bg-transparent text-[#00F0FF]' 
                                    : 'bg-[#00F0FF] text-black hover:bg-white'
                                }`}
                              >
                                {isInstalling ? 'Installing...' : 'Install'}
                              </button>
                            </div>
                            {isInstalling && (
                              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#12121A]">
                                <div className="h-full bg-[#00F0FF] animate-[loadingSlide_1s_ease-in-out_infinite]"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div className="p-4 text-xs text-[#64748B] uppercase tracking-widest">{activeView}</div>;
    }
  };

  return (
    <div className="w-64 shrink-0 bg-[#12121A]/90 backdrop-blur-md flex flex-col border-r border-white/5 z-20 overflow-hidden">
      {renderContent()}
    </div>
  );
};
