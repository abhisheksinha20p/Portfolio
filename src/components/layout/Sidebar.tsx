import React, { useState } from 'react';
import { ChevronDown, GitBranch, FileCode2, Blocks, Search, MoreHorizontal, Settings } from 'lucide-react';
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
  width?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  FileCode2: <FileCode2 size={16} className="text-[#E34F26]" />,
  TerminalSquare: <Blocks size={16} className="text-[#39FF14]" />,
  Mail: <Blocks size={16} className="text-[#B026FF]" />,
  FileJson: <Blocks size={16} className="text-[#FFBD2E]" />,
};

const BRANCH_CONFIG: Record<string, { x: number, color: string, dim: string }> = {
  'main': { x: 14, color: '#378ADD', dim: 'rgba(55, 138, 221, 0.15)' },
  'feature/vera-core': { x: 38, color: '#1D9E75', dim: 'rgba(29, 158, 117, 0.15)' },
  'default': { x: 14, color: '#64748B', dim: 'rgba(100, 116, 139, 0.15)' }
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
  width,
}: SidebarProps) => {
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
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

      case 'git': {
        const ROW_H = 90;
        const NODE_Y_OFFSET = 28; // vertical center of node within the row
        const svgH = TIMELINE.length * ROW_H;

        return (
          <div className="flex flex-col flex-1 p-4 overflow-hidden animate-fade-in-up font-sans">
            {/* Header */}
            <div className="text-[10px] font-bold tracking-widest text-[#64748B] mb-2 uppercase font-mono">Source Control</div>
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] bg-[#378ADD]/5 border border-[#378ADD]/20 rounded p-2 text-[#378ADD]">
              <GitBranch size={12} /> <span>main</span>
              <span className="ml-auto text-[#64748B] opacity-50">{TIMELINE.length} commits · 2 branches</span>
            </div>
            <div className="text-[10px] font-bold tracking-widest text-[#64748B] mb-3 uppercase font-mono shrink-0">Commit History</div>

            {/* Scrollable area — height is locked to exact content */}
            <div className="overflow-y-auto custom-scrollbar" style={{ height: svgH }}>
              <div className="relative" style={{ height: svgH }}>

                {/* ── SVG graph layer ── */}
                <svg
                  width="56"
                  height={svgH}
                  className="absolute left-0 top-0 pointer-events-none z-0"
                  style={{ overflow: 'visible' }}
                >
                  {/* Ghost rails — one per branch column */}
                  <line x1={14} y1={0} x2={14} y2={svgH} stroke="#378ADD" strokeWidth="1.5" opacity="0.08" />
                  <line x1={38} y1={0} x2={38} y2={svgH} stroke="#1D9E75" strokeWidth="1.5" opacity="0.08" />

                  {/* Segment lines / bezier curves between consecutive commits */}
                  {TIMELINE.map((item, i) => {
                    if (i === 0) return null;
                    const prev = TIMELINE[i - 1];
                    const cB = BRANCH_CONFIG[item.branch || 'main'] || BRANCH_CONFIG['default'];
                    const pB = BRANCH_CONFIG[prev.branch || 'main'] || BRANCH_CONFIG['default'];
                    const y1 = (i - 1) * ROW_H + NODE_Y_OFFSET;
                    const y2 = i * ROW_H + NODE_Y_OFFSET;

                    if (cB.x !== pB.x) {
                      return (
                        <path
                          key={`seg-${i}`}
                          d={`M${pB.x},${y1} C${pB.x},${y1 + 30} ${cB.x},${y2 - 30} ${cB.x},${y2}`}
                          fill="none"
                          stroke={cB.color}
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                          opacity="0.4"
                        />
                      );
                    }
                    return (
                      <line
                        key={`seg-${i}`}
                        x1={cB.x} y1={y1}
                        x2={cB.x} y2={y2}
                        stroke={cB.color}
                        strokeWidth="1.5"
                        opacity="0.25"
                      />
                    );
                  })}

                  {/* Commit nodes — drawn on top of lines */}
                  {TIMELINE.map((item, i) => {
                    const bCfg = BRANCH_CONFIG[item.branch || 'main'] || BRANCH_CONFIG['default'];
                    const cy = i * ROW_H + NODE_Y_OFFSET;
                    const isSelected = selectedHash === item.hash;
                    return (
                      <g key={`node-${i}`}>
                        {/* Outer ring */}
                        <circle
                          cx={bCfg.x} cy={cy} r={isSelected ? 7 : 5.5}
                          fill="#0D0D14"
                          stroke={isSelected ? '#00F0FF' : bCfg.color}
                          strokeWidth={isSelected ? 2 : 1.5}
                          style={{ filter: isSelected ? 'drop-shadow(0 0 6px #00F0FF)' : 'none', transition: 'all 0.2s' }}
                        />
                        {/* Inner dot */}
                        <circle
                          cx={bCfg.x} cy={cy} r={isSelected ? 3 : 2.5}
                          fill={isSelected ? '#00F0FF' : bCfg.color}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* ── Text rows layer ── */}
                {TIMELINE.map((item, i) => {
                  const bCfg = BRANCH_CONFIG[item.branch || 'main'] || BRANCH_CONFIG['default'];
                  const isSelected = selectedHash === item.hash;
                  return (
                    <div
                      key={item.hash}
                      className="absolute left-0 right-0 group cursor-pointer"
                      style={{ top: i * ROW_H, height: ROW_H }}
                      onClick={() => {
                        setSelectedHash(isSelected ? null : item.hash);
                        onOpenTab(`git:${item.hash}`);
                      }}
                    >
                      {/* Text content — offset past the SVG column */}
                      <div className="absolute left-12 right-2 top-0 bottom-0 flex flex-col justify-center py-2 pr-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-[9px] font-mono"
                            style={{ color: isSelected ? '#00F0FF' : '#64748B' }}
                          >
                            {item.date}
                          </span>
                          <span className="text-[9px] font-mono text-[#64748B] opacity-40">
                            [{item.hash.substring(0, 7)}]
                          </span>
                          {/* Branch badge */}
                          {item.branch && item.branch !== 'main' && (
                            <span
                              className="text-[8px] font-mono px-1 rounded"
                              style={{ color: bCfg.color, backgroundColor: bCfg.dim, border: `1px solid ${bCfg.color}40` }}
                            >
                              {item.branch}
                            </span>
                          )}
                        </div>
                        <div
                          className="text-[12px] font-bold leading-tight mb-1 transition-colors"
                          style={{ color: isSelected ? '#fff' : '#E2E8F0' }}
                        >
                          {item.title}
                        </div>
                        <div className="text-[10px] text-[#64748B] truncate leading-snug">
                          {item.desc}
                        </div>
                      </div>

                      {/* Hover/active left accent */}
                      <div
                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded transition-all duration-200"
                        style={{ backgroundColor: isSelected ? '#00F0FF' : 'transparent', opacity: isSelected ? 1 : 0 }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      case 'extensions':
        const filteredP = PROJECTS.filter(p => p.name.toLowerCase().includes(extensionSearch.toLowerCase()));
        const inst = filteredP.filter(p => installedProjects.includes(p.id));
        const rec = filteredP.filter(p => !installedProjects.includes(p.id));

        return (
          <div className="flex flex-col flex-1 overflow-hidden animate-fade-in-up">
            <div className="px-4 py-3 text-xs font-bold tracking-widest text-[#64748B] flex items-center justify-between shrink-0">
              <span>EXTENSIONS</span>
              <MoreHorizontal size={14} className="cursor-pointer hover:text-white" />
            </div>
            
            <div className="px-4 pb-3 shrink-0">
              <input 
                type="text" 
                placeholder="Search Extensions" 
                value={extensionSearch} 
                onChange={e => setExtensionSearch(e.target.value)}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded px-2 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
              />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {inst.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.02] cursor-pointer text-xs font-bold text-[#E2E8F0] sticky top-0 z-10 backdrop-blur-sm">
                    <ChevronDown size={14} /> <span>INSTALLED ({inst.length})</span>
                  </div>
                  {inst.map(proj => (
                    <div key={proj.id} onClick={() => onOpenTab(`ext:${proj.id}`)} className={`group flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 ${activeTab === `ext:${proj.id}` ? 'bg-[#00F0FF]/10 border-[#00F0FF]' : 'border-transparent hover:bg-white/5'}`}>
                      <Blocks size={28} className="text-[#00F0FF] shrink-0 opacity-80" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-white truncate leading-tight flex items-center justify-between">
                          {proj.name} 
                          <Settings size={12} className="text-[#64748B] invisible group-hover:visible" />
                        </div>
                        <div className="text-[10px] text-[#64748B] truncate mt-0.5">{proj.shortDesc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {rec.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.02] cursor-pointer text-xs font-bold text-[#E2E8F0] sticky top-0 z-10 backdrop-blur-sm">
                    <ChevronDown size={14} /> <span>RECOMMENDED ({rec.length})</span>
                  </div>
                  {rec.map(proj => {
                    const isInstalling = installingProject === proj.id;
                    return (
                      <div key={proj.id} onClick={() => onOpenTab(`ext:${proj.id}`)} className={`group flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 relative ${activeTab === `ext:${proj.id}` ? 'bg-[#00F0FF]/5 border-[#00F0FF]/50' : 'border-transparent hover:bg-white/5'}`}>
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
                                isInstalling ? 'text-[#00F0FF]' : 'bg-[#00F0FF] text-black hover:bg-white'
                              }`}
                            >
                              {isInstalling ? 'Installing...' : 'Install'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
    <div 
      className="bg-[#12121A]/90 backdrop-blur-md flex flex-col border-r border-white/5 z-20 overflow-hidden shrink-0"
      style={{ width }}
    >
      {renderContent()}
    </div>
  );
};
