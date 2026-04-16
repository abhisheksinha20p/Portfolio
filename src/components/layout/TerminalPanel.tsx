import { useState, useEffect, useRef } from 'react';
import { TERMINAL_COMMANDS, FILES, PROJECTS } from '../../data/portfolio';

interface TerminalPanelProps {
  onOpenTab?: (tabId: string) => void;
  onInstallProject?: (projectId: string) => void;
}

export const TerminalPanel = ({ onOpenTab, onInstallProject }: TerminalPanelProps) => {
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output'; text: string; color?: string }>>([
    { type: 'output', text: '> Initializing AbhiOS v4.2...', color: '#64748B' },
    { type: 'output', text: '> Loading kernel modules [OK]', color: '#39FF14' },
    { type: 'output', text: '> Mounting portfolio filesystem... done', color: '#39FF14' },
    { type: 'output', text: '> Starting dev server on :3000', color: '#00F0FF' },
    { type: 'output', text: '> Compiling TypeScript... 0 errors', color: '#39FF14' },
    { type: 'output', text: '> Ready. Type "help" for commands.', color: '#E2E8F0' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', text: `$ ${cmd}` }]);

    // Process commands
    switch (command) {
      case 'help':
        const helpOutput = TERMINAL_COMMANDS.help();
        helpOutput.forEach(line => {
          setHistory(prev => [...prev, { type: 'output', text: line, color: '#E2E8F0' }]);
        });
        break;

      case 'whoami':
        const whoamiOutput = TERMINAL_COMMANDS.whoami();
        whoamiOutput.forEach(line => {
          setHistory(prev => [...prev, { type: 'output', text: line, color: '#E2E8F0' }]);
        });
        break;

      case 'projects':
        const projectsOutput = TERMINAL_COMMANDS.projects();
        projectsOutput.forEach(line => {
          setHistory(prev => [...prev, { type: 'output', text: line, color: '#39FF14' }]);
        });
        break;

      case 'open':
        if (args.length > 0) {
          const arg = args[0].toLowerCase();
          // Find matching file in FILES (exact or base name)
          const fileName = Object.keys(FILES).find(f => 
            f.toLowerCase() === arg || 
            f.toLowerCase().split('.')[0] === arg
          );

          if (fileName) {
            onOpenTab?.(fileName);
            setHistory(prev => [...prev, { type: 'output', text: `> Opening ${fileName}...`, color: '#39FF14' }]);
          } else {
            setHistory(prev => [...prev, { type: 'output', text: `> File not found: ${arg}`, color: '#FF5F56' }]);
          }
        } else {
          setHistory(prev => [...prev, { type: 'output', text: '> Usage: open <filename>', color: '#FF5F56' }]);
        }
        break;

      case 'run':
        if (args.length > 0) {
          const arg = args[0].toLowerCase();
          if (arg === 'skills.sh' || arg === 'skills') {
            onOpenTab?.('skills.sh');
            setHistory(prev => [...prev, { type: 'output', text: '> Running skills.sh...', color: '#39FF14' }]);
          } else {
            setHistory(prev => [...prev, { type: 'output', text: `> Command not found: run ${args[0]}`, color: '#FF5F56' }]);
          }
        } else {
          setHistory(prev => [...prev, { type: 'output', text: '> Usage: run <filename>', color: '#FF5F56' }]);
        }
        break;

      case 'install':
        if (args.length > 0) {
          const project = args[0].toLowerCase();
          const target = PROJECTS.find(p => p.id === project);
          if (target) {
            onInstallProject?.(target.id);
            setHistory(prev => [...prev, { type: 'output', text: `> Installing ${target.name}...`, color: '#00F0FF' }]);
            setHistory(prev => [...prev, { type: 'output', text: `> Installing dependencies...`, color: '#64748B' }]);
            setHistory(prev => [...prev, { type: 'output', text: `> ${target.name} installed successfully!`, color: '#39FF14' }]);
            setHistory(prev => [...prev, { type: 'output', text: `> Run 'launch ${target.id}' to view`, color: '#E2E8F0' }]);
          } else {
            setHistory(prev => [...prev, { type: 'output', text: `> Project not found: ${args[0]}`, color: '#FF5F56' }]);
          }
        } else {
          setHistory(prev => [...prev, { type: 'output', text: '> Usage: install <project-name>', color: '#FF5F56' }]);
          setHistory(prev => [...prev, { type: 'output', text: '> Available: clientflow, vera', color: '#64748B' }]);
        }
        break;

      case 'launch':
        if (args.length > 0) {
          const project = args[0].toLowerCase();
          const target = PROJECTS.find(p => p.id === project);
          if (target) {
            onOpenTab?.(`ext:${target.id}`);
            setHistory(prev => [...prev, { type: 'output', text: `> Launching ${target.name}...`, color: '#39FF14' }]);
          } else {
            setHistory(prev => [...prev, { type: 'output', text: `> Project not found: ${args[0]}`, color: '#FF5F56' }]);
          }
        } else {
          setHistory(prev => [...prev, { type: 'output', text: '> Usage: launch <project-name>', color: '#FF5F56' }]);
        }
        break;

      case 'clear':
        setHistory([
          { type: 'output', text: '> Terminal cleared', color: '#64748B' }
        ]);
        break;

      case 'mail':
        onOpenTab?.('contact.js');
        setHistory(prev => [...prev, { type: 'output', text: '> Opening contact.js...', color: '#39FF14' }]);
        break;

      case '':
        break;

      default:
        setHistory(prev => [...prev, { type: 'output', text: `> Command not found: ${command}`, color: '#FF5F56' }]);
        setHistory(prev => [...prev, { type: 'output', text: '> Type "help" for available commands', color: '#64748B' }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#080810] font-mono text-xs p-3 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={outputRef} className="flex-1 overflow-y-auto space-y-1 mb-2">
        {history.map((item, index) => (
          <div 
            key={index} 
            className={item.type === 'command' ? 'text-[#E2E8F0]' : ''}
            style={{ color: item.type === 'output' ? (item.color || '#E2E8F0') : '#E2E8F0' }}
          >
            {item.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-[#39FF14] shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal Input"
          className="flex-1 bg-transparent outline-none text-[#E2E8F0] caret-[#00F0FF]"
          autoFocus
        />
      </div>
    </div>
  );
};
