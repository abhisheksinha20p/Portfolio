import { Download, ExternalLink, FileText, Maximize2, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { RESUME_PATH, RESUME_DOWNLOAD_FILENAME } from '../../config/constants';

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

interface PDFPageProps {
  pdfDoc: any;
  pageNum: number;
}

const PDFPage = ({ pdfDoc, pageNum }: PDFPageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (!active) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Render at a high DPI (scale 1.5) for crisp text
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;
        if (active) {
          setLoading(false);
        }
      } catch (err) {
        console.error(`Error rendering PDF page ${pageNum}:`, err);
      }
    };
    renderPage();
    return () => {
      active = false;
    };
  }, [pdfDoc, pageNum]);

  return (
    <div className="relative mx-auto bg-white p-2 rounded shadow-2xl max-w-full">
      <canvas ref={canvasRef} className="max-w-full h-auto block" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D14]/80">
          <Loader2 className="animate-spin text-[#00F0FF]" size={24} />
        </div>
      )}
    </div>
  );
};

export const ResumeView = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  useEffect(() => {
    let active = true;

    const loadLibraryAndPDF = async () => {
      // 1. Check if browser has native PDF viewing capabilities (fallback indicator)
      const hasNativePDF = 
        navigator.pdfViewerEnabled || 
        (navigator.mimeTypes && Array.from(navigator.mimeTypes).some(m => m.type === 'application/pdf'));

      // 2. Load PDF.js script dynamically
      if (!window.pdfjsLib) {
        try {
          const script = document.createElement('script');
          script.src = '/lib/pdfjs/pdf.min.js';
          script.async = true;
          
          const scriptPromise = new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
          
          document.body.appendChild(script);
          await scriptPromise;
        } catch (err) {
          console.warn('PDF.js script load failed. Checking for native iframe fallback...', err);
          if (active) {
            if (hasNativePDF) {
              setUseIframeFallback(true);
              setLoading(false);
            } else {
              setError('Failed to load PDF viewer library and no native PDF viewer detected.');
              setLoading(false);
            }
            return;
          }
        }
      }

      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdfjs/pdf.worker.min.js';
      }

      // 3. Load actual PDF document using the library
      try {
        if (!active) return;
        const pdfjsLib = window.pdfjsLib;
        if (!pdfjsLib) {
          throw new Error('PDF.js library was not loaded.');
        }

        const loadingTask = pdfjsLib.getDocument(RESUME_PATH);
        const pdf = await loadingTask.promise;
        
        if (active) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading PDF document:', err);
        if (active) {
          if (hasNativePDF) {
            setUseIframeFallback(true);
            setLoading(false);
          } else {
            setError(err.message || 'An error occurred while loading the PDF.');
            setLoading(false);
          }
        }
      }
    };

    loadLibraryAndPDF();

    return () => {
      active = false;
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-[#64748B] font-mono gap-3 bg-[#0D0D14]">
          <Loader2 className="animate-spin text-[#00F0FF]" size={32} />
          <span>Loading document viewer...</span>
        </div>
      );
    }

    if (error && !useIframeFallback) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0D0D14] text-center font-sans">
          <div className="max-w-md bg-white/5 border border-[#FF5F56]/20 rounded-xl p-6 shadow-xl">
            <AlertCircle className="w-12 h-12 text-[#FF5F56] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Unable to Load PDF Viewer</h3>
            <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
              We couldn't initialize the interactive PDF reader. You can open or download the PDF file directly using the links below.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 text-white rounded text-sm transition-all"
              >
                <ExternalLink size={14} />
                Open PDF
              </a>
              <a
                href={RESUME_PATH}
                download={RESUME_DOWNLOAD_FILENAME}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00F0FF] text-black font-bold rounded text-sm hover:bg-white transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (useIframeFallback) {
      return (
        <iframe
          src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          className="w-full h-full border-0"
          title="Abhishek Sinha - Full Stack Developer Resume (Native Fallback)"
          style={{ background: '#1a1a2e' }}
        />
      );
    }

    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#0D0D14] space-y-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {Array.from({ length: numPages }, (_, i) => (
            <PDFPage key={i + 1} pdfDoc={pdfDoc} pageNum={i + 1} />
          ))}
        </div>
      </div>
    );
  };

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
            download={RESUME_DOWNLOAD_FILENAME}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#00F0FF] text-black font-bold hover:bg-white transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
          >
            <Download size={13} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Main View Area */}
      <div
        className={`flex-grow flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-50 bg-[#0D0D14] pt-0' : ''
        }`}
      >
        {isFullscreen && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#0A0A0F] border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
              <FileText size={14} className="text-[#FF5F56]" />
              <span>Resume/Full_Stack_dev.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={RESUME_PATH}
                download={RESUME_DOWNLOAD_FILENAME}
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

        {renderContent()}
      </div>
    </div>
  );
};
