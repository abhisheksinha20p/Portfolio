import { useState, useCallback } from 'react';
import { useClock } from '../../hooks/useClock';
import { ActivityBar } from './ActivityBar';
import { Sidebar } from './Sidebar';
import { TabBar } from './TabBar';
import { BottomPanel } from './BottomPanel';
import { StatusBar } from './StatusBar';
import { AICopilotPanel } from './AICopilotPanel';
import { FILES, PROJECTS } from '../../data/portfolio';
import { AboutView } from '../views/AboutView';
import { SkillsView } from '../views/SkillsView';
import { ContactView } from '../views/ContactView';
import { ReadmeView } from '../views/ReadmeView';
import { PackageJsonView } from '../views/PackageJsonView';
import { ExtensionMarketplaceView } from '../views/ExtensionMarketplaceView';
import { ProjectWorkspaceView } from '../views/ProjectWorkspaceView';
import { ChevronRight, Blocks, Search, Terminal, Bot } from 'lucide-react';

export const IDEWorkspace = () => {
  const [activeTab, setActiveTab] = useState<string | null>('about.js');
  const [openTabs, setOpenTabs] = useState<string[]>(['about.js']);
  
  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState('extensions');
  
  // Extensions State
  const [installedProjects, setInstalledProjects] = useState<string[]>(['cyberstore-api']);
  const [installingProject, setInstallingProject] = useState<string | null>(null);
  const [extensionSearch, setExtensionSearch] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
  const clock = useClock();
  
  // AI Copilot State
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

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

    return (
      <div className="flex flex-col items-center justify-center h-full text-[#64748B] font-mono">
        <Blocks size={48} className="mb-4 opacity-20" />
        <p className="mb-2">Select a file or extension to view details.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0A0F] overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background: #0A0A0F; color: #E2E8F0; }
        .font-mono { font-family: 'Fira Code', monospace; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 240, 255, 0.3); }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(5px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes loadingSlide { 0% { width: 0%; transform: translateX(-100%); } 50% { width: 50%; } 100% { width: 0%; transform: translateX(300%); } }
      `}} />

      {/* TOP WINDOW BAR */}
      <div className="h-10 shrink-0 w-full bg-[#0A0A0F] border-b border-white/5 flex items-center px-4 justify-between z-40">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="flex items-center gap-3 w-1/3">
          <div className="flex items-center gap-2 w-full bg-white/5 rounded px-3 py-1 border border-transparent hover:border-white/10 group text-[#64748B] text-xs font-mono justify-center cursor-default">
            <Search size={12} /> AbhiOS Workspace
          </div>
        </div>
        <div className="flex gap-3 text-[#64748B] items-center">
          <span className="text-[10px] font-mono hidden md:inline">{clock}</span>
          <button onClick={() => setBottomPanelOpen(v => !v)} className="p-1 hover:bg-white/10 rounded">
            <Terminal size={16}/>
          </button>
          <button 
            onClick={() => setAiPanelOpen(v => !v)} 
            className={`p-1 rounded transition-colors ${
              aiPanelOpen ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'hover:bg-white/10'
            }`}
          >
            <Bot size={16}/>
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar 
          activeView={sidebarView}
          onViewChange={setSidebarView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
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
        />

        <div className="flex flex-col flex-1 min-w-0 bg-[#0D0D14]">
          <TabBar 
            openTabs={openTabs}
            activeTab={activeTab}
            onActivateTab={setActiveTab}
            onCloseTab={closeTab}
          />

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

          <BottomPanel 
            isOpen={bottomPanelOpen} 
            onClose={() => setBottomPanelOpen(false)}
            onOpenTab={openTab}
            onInstallProject={handleInstall}
          />
        </div>

        <AICopilotPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} />
      </div>

      <StatusBar installingProject={installingProject} />
    </div>
  );
};


