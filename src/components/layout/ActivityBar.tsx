import { Files, Search, GitBranch, Blocks, Settings } from 'lucide-react';

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const ActivityBar = ({ activeView, onViewChange, sidebarOpen, setSidebarOpen }: ActivityBarProps) => {
  const items = [
    { view: 'explorer', Icon: Files },
    { view: 'search', Icon: Search },
    { view: 'git', Icon: GitBranch },
    { view: 'extensions', Icon: Blocks },
  ];

  return (
    <div className="w-14 shrink-0 bg-[#0A0A0F] border-r border-white/5 flex flex-col items-center py-4 gap-6 z-30" role="tablist">
      {items.map(({ view, Icon }) => (
        <div 
          key={view} 
          role="button"
          tabIndex={0}
          aria-label={`Open ${view} view`}
          className={`relative group cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF] rounded-md ${
            activeView === view && sidebarOpen ? 'text-white' : 'text-[#64748B]'
          }`}
          onClick={() => { 
            if (activeView === view && sidebarOpen) {
              setSidebarOpen(false); 
            } else { 
              onViewChange(view); 
              setSidebarOpen(true); 
            } 
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (activeView === view && sidebarOpen) {
                setSidebarOpen(false);
              } else {
                onViewChange(view);
                setSidebarOpen(true);
              }
            }
          }}
        >
          <Icon size={24} className="group-hover:text-white transition-colors" />
          {activeView === view && sidebarOpen && (
            <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] rounded-r"></div>
          )}
        </div>
      ))}
      <div className="mt-auto">
        <Settings size={22} className="text-[#64748B]" />
      </div>
    </div>
  );
};
