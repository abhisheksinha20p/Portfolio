import { Download, ExternalLink, FileText, Maximize2 } from 'lucide-react';
import { useState } from 'react';

const RESUME_PATH = '/Resume/Full_Stack_dev.pdf';

export const ResumeView = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0D0D14]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0A0A0F] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
          <FileText size={14} className="text-[#FF5F56]" />
          <span>Resume/Full_Stack_dev.pdf</span>
          <span className="text-[#39FF14] bg-[#39FF14]/10 px-1.5 py-0.5 rounded text-[10px] ml-2">PDF</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(v => !v)}
            title="Toggle fullscreen"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#64748B] hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
          >
            <Maximize2 size={13} />
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>

          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#64748B] hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">Open</span>
          </a>

          <a
            href={RESUME_PATH}
            download="Abhishek_Sinha_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#00F0FF] text-black font-bold hover:bg-white transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
          >
            <Download size={13} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* PDF Embed */}
      <div
        className={`flex-1 overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-50 bg-[#0D0D14] pt-0' : ''
        }`}
      >
        {isFullscreen && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#0A0A0F] border-b border-white/5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
              <FileText size={14} className="text-[#FF5F56]" />
              <span>Resume/Full_Stack_dev.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={RESUME_PATH}
                download="Abhishek_Sinha_Resume.pdf"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#00F0FF] text-black font-bold hover:bg-white transition-all"
              >
                <Download size={13} />
                Download
              </a>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#64748B] hover:text-white hover:bg-white/5 transition-all border border-white/10"
              >
                <Maximize2 size={13} />
                Exit
              </button>
            </div>
          </div>
        )}

        <iframe
          src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          className="w-full h-full border-0"
          title="Abhishek Sinha - Full Stack Developer Resume"
          style={{ background: '#1a1a2e' }}
        />
      </div>
    </div>
  );
};
