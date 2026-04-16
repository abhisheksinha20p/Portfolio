import { X, Blocks, Activity } from 'lucide-react';
import { FILES, PROJECTS } from '../../data/portfolio';

interface TabBarProps {
  openTabs: string[];
  activeTab: string | null;
  onActivateTab: (id: string) => void;
  onCloseTab: (e: React.MouseEvent, id: string) => void;
}

export const TabBar = ({ openTabs, activeTab, onActivateTab, onCloseTab }: TabBarProps) => {
  const getTabInfo = (id: string) => {
    let displayName = id;
    let icon: React.ReactNode = <Blocks size={16} />;
    const isExt = id.startsWith('ext:');
    const isRun = id.startsWith('run:');
    
    if (FILES[id]) {
      const file = FILES[id];
      const iconMap: Record<string, React.ReactNode> = {
        FileCode2: <Blocks size={16} className="text-[#E34F26]" />,
        TerminalSquare: <Blocks size={16} className="text-[#39FF14]" />,
        Mail: <Blocks size={16} className="text-[#B026FF]" />,
        FileJson: <Blocks size={16} className="text-[#FFBD2E]" />,
      };
      icon = iconMap[file.icon] || <Blocks size={16} />;
    } else if (isExt || isRun) {
      const rawId = id.replace('ext:', '').replace('run:', '');
      const project = PROJECTS.find(p => p.id === rawId);
      const projectName = project?.name || 'Unknown Module';
      displayName = isExt ? `Extension: ${projectName}` : `Local: ${projectName}`;
      icon = isRun 
        ? <Activity size={16} className="text-[#39FF14]"/> 
        : <Blocks size={16} className="text-[#00F0FF]" />;
    }

    return { displayName, icon };
  };

  return (
    <div className="flex h-10 bg-[#0A0A0F] border-b border-white/5 overflow-x-auto custom-scrollbar shrink-0">
      {openTabs.map(id => {
        const { displayName, icon } = getTabInfo(id);
        return (
          <div 
            key={id} 
            onClick={() => onActivateTab(id)}
            className={`flex items-center gap-2 px-4 min-w-fit cursor-pointer border-r border-white/5 group font-mono text-sm transition-colors duration-200 ${
              activeTab === id 
                ? 'bg-[#0D0D14] text-white border-t-2 border-t-[#00F0FF]' 
                : 'bg-[#12121A] text-[#64748B] border-t-2 border-t-transparent hover:bg-[#1A1A24]'
            }`}
          >
            {icon} <span>{displayName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(e, id);
              }}
              aria-label={`Close ${displayName} tab`}
              className={`ml-2 rounded hover:bg-white/10 p-0.5 transition-opacity ${
                activeTab === id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
