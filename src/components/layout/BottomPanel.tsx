import { X } from 'lucide-react';
import { TerminalPanel } from './TerminalPanel';

interface BottomPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTab?: (tabId: string) => void;
  onInstallProject?: (projectId: string) => void;
  height?: number;
}

export const BottomPanel = ({ isOpen, onClose, onOpenTab, onInstallProject, height }: BottomPanelProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="shrink-0 border-t border-white/5 bg-[#080810] flex flex-col z-10"
      style={{ height }}
    >
      <div className="flex items-center justify-between h-8 border-b border-white/5 bg-[#0A0A0F] px-4 shrink-0">
        <div className="flex gap-4 uppercase text-[10px] tracking-wider font-mono">
          <span className="text-white border-b border-[#00F0FF] pb-1 cursor-pointer">Terminal</span>
          <span className="text-[#64748B] hover:text-white cursor-pointer">Output</span>
        </div>
        <X size={14} className="text-[#64748B] hover:text-white cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex-1 overflow-hidden">
        <TerminalPanel onOpenTab={onOpenTab} onInstallProject={onInstallProject} />
      </div>
    </div>
  );
};
