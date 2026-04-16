import { CheckCircle2, GitBranch, Circle, Loader2 } from 'lucide-react';

interface StatusBarProps {
  installingProject: string | null;
}

export const StatusBar = ({ installingProject }: StatusBarProps) => {
  return (
    <div className="h-7 shrink-0 bg-[#00F0FF]/10 border-t border-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-between px-4 text-xs font-mono z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch size={12} /> main*
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 size={12} /> Prettier
        </div>
        {installingProject && (
          <div className="flex items-center gap-2 animate-fade-in-up bg-[#00F0FF]/20 px-2 rounded">
            <Loader2 size={12} className="animate-spin" /> Installing {installingProject}...
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 text-[#64748B]">
        <span className="hidden sm:inline">UTF-8</span>
        <span className="text-[#39FF14] flex items-center gap-1">
          <Circle size={8} fill="currentColor" /> AbhiOS v4.2
        </span>
      </div>
    </div>
  );
};
