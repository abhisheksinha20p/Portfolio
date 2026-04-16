import { useState, useCallback } from 'react';
import { useClock } from '../../hooks/useClock';
import { ActivityBar } from './ActivityBar';
import { Sidebar } from './Sidebar';
import { TabBar } from './TabBar';
import { BottomPanel } from './BottomPanel';
import { StatusBar } from './StatusBar';
import { AICopilotPanel } from './AICopilotPanel';
import { useResizable } from '../../hooks/useResizable';
import { FILES, PROJECTS } from '../../data/portfolio';
import { AboutView } from '../views/AboutView';
import { SkillsView } from '../views/SkillsView';
import { ContactView } from '../views/ContactView';
import { ReadmeView } from '../views/ReadmeView';
import { PackageJsonView } from '../views/PackageJsonView';
import { ExtensionMarketplaceView } from '../views/ExtensionMarketplaceView';
import { ProjectWorkspaceView } from '../views/ProjectWorkspaceView';
import { CommitView } from '../views/CommitView';
import { OnboardingTour, useOnboardingTour } from '../ui/OnboardingTour';
import { ChevronRight, Blocks, Search, Terminal, Bot } from 'lucide-react';

export const IDEWorkspace = () => {
  const [activeTab, setActiveTab] = useState<string | null>('about.js');
  const [openTabs, setOpenTabs] = useState<string[]>(['about.js']);
  
  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState('extensions');
  
  // Resizable Panels State
  const { width: sidebarWidth, handleMouseDown: startSidebarResize } = useResizable({ initialSize: 256, minSize: 160, maxSize: 480, direction: 'horizontal' });
  const { width: aiPanelWidth, handleMouseDown: startAiResize } = useResizable({ initialSize: 320, minSize: 200, maxSize: 500, direction: 'horizontal', reverse: true });
  const { height: bottomHeight, handleMouseDown: startBottomResize } = useResizable({ initialSize: 200, minSize: 100, maxSize: 600, direction: 'vertical', reverse: true });

  // Extensions State
  const [installedProjects, setInstalledProjects] = useState<string[]>(['cyberstore-api']);
  const [installingProject, setInstallingProject] = useState<string | null>(null);
  const [extensionSearch, setExtensionSearch] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
  const clock = useClock();
  
  // AI Copilot State
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  // Onboarding Tour
  const tourState = useOnboardingTour();
  const tourVisible = tourState.shouldShow;
  const completeTour = tourState.markComplete;

  const openTab = useCallback((id: string) => {
    if (!openTabs.includes(id)) {
      setOpenTabs(prev => [...prev, id]);
    }
    setActiveTab(id);
  }, [openTabs]);

  const closeTab = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== id);
    setOpenTabs(newTabs);
    if (activeTab === id) {
      setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  }, [openTabs, activeTab]);

  const handleInstall = (projId: string) => {
    setInstallingProject(projId);
    setTimeout(() => {
      setInstalledProjects(prev => [...prev, projId]);
      setInstallingProject(null);
    }, 2000);
  };

  const handleUninstall = (projId: string) => {
    setInstalledProjects(prev => prev.filter(id => id !== projId));
    if (openTabs.includes(`run:${projId}`)) {
      closeTab({ stopPropagation: () => {} } as React.MouseEvent, `run:${projId}`);
    }
  };

  const handleLaunch = (projId: string) => {
    openTab(`run:${projId}`);
  };

  const renderMainContent = () => {
    if (!activeTab) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-[#64748B] font-mono">
          <Blocks size={48} className="mb-4 opacity-20" />
          <p className="mb-2">Select a file or extension to view details.</p>
        </div>
      );
    }

    if (FILES[activeTab]) {
      switch (activeTab) {
        case 'about.js': return <AboutView />;
        case 'skills.sh': return <SkillsView />;
        case 'contact.js': return <ContactView />;
        case 'README.md': return <ReadmeView />;
        case 'package.json': return <PackageJsonView />;
        default: return <div className="p-8 font-mono text-[#64748B]">// File content for {activeTab}</div>;
      }
    } 
    
    if (activeTab.startsWith('ext:')) {
      const id = activeTab.replace('ext:', '');
      const project = PROJECTS.find(p => p.id === id);
      if (project) {
        return (
          <ExtensionMarketplaceView 
            project={project} 
            isInstalled={installedProjects.includes(id)}
            isInstalling={installingProject === id}
            onInstall={handleInstall}
            onUninstall={handleUninstall}
            onLaunch={handleLaunch}
          />
        );
      }
    }

    if (activeTab.startsWith('run:')) {
      const id = activeTab.replace('run:', '');
      const project = PROJECTS.find(p => p.id === id);
      if (project) {
        return <ProjectWorkspaceView project={project} />;
      }
    }

    if (activeTab.startsWith('git:')) {
      const hash = activeTab.replace('git:', '');
      return <CommitView hash={hash} />;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-[#64748B] font-mono">
        <Blocks size={48} className="mb-4 opacity-20" />
        <p className="mb-2">Select a file or extension to view details.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0A0F] overflow-hidden">

      {/* TOP WINDOW BAR */}
      <div className="h-12 shrink-0 w-full bg-[#0A0A0F] border-b border-white/5 flex items-center px-4 justify-between relative">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="flex items-center gap-3 w-1/3">
          <div className="flex items-center gap-2 w-full bg-white/5 rounded px-3 py-1.5 border border-transparent hover:border-white/10 group text-[#64748B] text-sm font-mono justify-center cursor-default">
            <Search size={16} /> AbhiOS Workspace
          </div>
        </div>
        <div className="flex gap-3 text-[#64748B] items-center">
          <span className="text-xs font-mono hidden md:inline">{clock}</span>
          <button id="tour-terminal-btn" onClick={() => setBottomPanelOpen(v => !v)} className="p-1.5 hover:bg-white/10 rounded">
            <Terminal size={18}/>
          </button>
          <button 
            id="tour-ai-btn"
            onClick={() => setAiPanelOpen(v => !v)} 
            className={`p-1.5 rounded transition-colors ${
              aiPanelOpen ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'hover:bg-white/10'
            }`}
          >
            <Bot size={18}/>
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar 
          id="tour-activity-bar"
          activeView={sidebarView}
          onViewChange={setSidebarView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div id="tour-sidebar">
          <Sidebar 
            isOpen={sidebarOpen}
            activeView={sidebarView}
            activeTab={activeTab || ''}
            onOpenTab={openTab}
            onInstallProject={handleInstall}
            installedProjects={installedProjects}
            installingProject={installingProject}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            extensionSearch={extensionSearch}
            setExtensionSearch={setExtensionSearch}
            width={sidebarWidth}
          />
        </div>

        {/* SIDEBAR RESIZE HANDLE */}
        {sidebarOpen && (
          <div 
            onMouseDown={startSidebarResize}
            className="w-1 hover:w-1.5 h-full cursor-col-resize bg-transparent hover:bg-[#00F0FF]/30 transition-all z-30 shrink-0 relative"
          />
        )}

        <div className="flex flex-col flex-1 min-w-0 bg-[#0D0D14]">
          <div id="tour-tabbar">
            <TabBar 
              openTabs={openTabs}
              activeTab={activeTab}
              onActivateTab={setActiveTab}
              onCloseTab={closeTab}
            />
          </div>

          {activeTab && (
            <div className="flex items-center gap-1 px-4 h-7 text-xs font-mono text-[#64748B] bg-[#0D0D14] border-b border-white/5 shrink-0">
              <span>workspace</span> 
              <ChevronRight size={14} />
              <span className="text-[#E2E8F0] truncate max-w-sm">
                {activeTab.startsWith('ext:') ? 'Marketplace' : activeTab.startsWith('run:') ? 'Local Environment' : 'src'}
              </span>
              <ChevronRight size={14} />
              <span className={activeTab.startsWith('ext:') || activeTab.startsWith('run:') ? "text-[#00F0FF]" : "text-[#E2E8F0]"}>
                {activeTab.replace('ext:', '').replace('run:', '')}
              </span>
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            {renderMainContent()}
          </div>

          {/* BOTTOM PANEL RESIZE HANDLE */}
          {bottomPanelOpen && (
            <div 
              onMouseDown={startBottomResize}
              className="h-1 hover:h-1.5 w-full cursor-row-resize bg-transparent hover:bg-[#00F0FF]/30 transition-all z-30 relative"
            />
          )}

          <BottomPanel 
            isOpen={bottomPanelOpen} 
            onClose={() => setBottomPanelOpen(false)}
            onOpenTab={openTab}
            onInstallProject={handleInstall}
            height={bottomHeight}
          />
        </div>

        {/* AI PANEL RESIZE HANDLE */}
        {aiPanelOpen && (
          <div 
            onMouseDown={startAiResize}
            className="w-1 hover:w-1.5 h-full cursor-col-resize bg-transparent hover:bg-[#00F0FF]/30 transition-all z-30 shrink-0 relative"
          />
        )}

        <AICopilotPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} width={aiPanelWidth} />
      </div>

      <StatusBar installingProject={installingProject} />

      {/* Onboarding Tour */}
      {tourVisible && <OnboardingTour onComplete={completeTour} />}
    </div>
  );
};


