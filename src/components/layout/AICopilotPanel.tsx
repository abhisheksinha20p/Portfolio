import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { chatWithAI } from '../../lib/ai';

interface AICopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  width?: number;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const AICopilotPanel = ({ isOpen, onClose, width }: AICopilotPanelProps) => {
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<Message[]>([
    { role: 'ai', text: 'AbhiOS Copilot initialized. Ask me anything about Abhi\'s skills or projects.' }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const aiChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aiChatRef.current) {
      aiChatRef.current.scrollTop = aiChatRef.current.scrollHeight;
    }
  }, [aiMessages, isAiTyping, isOpen]);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = aiInput;
    setAiMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setAiInput('');
    setIsAiTyping(true);

    try {
      const response = await chatWithAI(userMessage);
      setAiMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error: any) {
      setAiMessages(prev => [...prev, { role: 'ai', text: error.message || "Failed to get response." }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="shrink-0 bg-[#0A0A0F] border-l border-white/5 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
      style={{ width }}
    >
      <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2 text-sm font-sans font-bold text-white">
          <Bot size={16} className="text-[#00F0FF]" /> AbhiOS Copilot
        </div>
        <button 
          onClick={onClose} 
          aria-label="Close Copilot"
          className="text-[#64748B] hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      
      <div ref={aiChatRef} className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4 font-sans text-sm">
        {aiMessages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex flex-col max-w-[90%] ${
              msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
            } animate-fade-in-up`}
          >
            <span className="text-[10px] text-[#64748B] font-mono mb-1 px-1 uppercase">
              {msg.role === 'user' ? 'You' : 'Copilot'}
            </span>
            <div className={`p-3 rounded-lg border ${
              msg.role === 'user' 
                ? 'bg-[#00F0FF]/10 border-[#00F0FF]/20 text-[#E2E8F0] rounded-tr-none' 
                : 'bg-white/5 border-white/10 text-[#64748B] rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isAiTyping && (
          <div className="flex flex-col max-w-[90%] self-start items-start animate-fade-in-up">
            <span className="text-[10px] text-[#64748B] font-mono mb-1 px-1 uppercase">Copilot</span>
            <div className="p-3 rounded-lg border bg-white/5 border-white/10 text-[#64748B] rounded-tl-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
              <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-[#0D0D14] shrink-0">
        <form onSubmit={handleAiSubmit} className="relative">
          <input 
            type="text" 
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Ask copilot..." 
            className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all"
          />
          <button 
            type="submit" 
            disabled={!aiInput.trim() || isAiTyping} 
            aria-label="Send message"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#00F0FF] disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
