import { useTypewriter } from '../../hooks/useTypewriter';

export const AboutView = () => {
  const typedCode = useTypewriter(`const developer = {\n  name: "Abhishek Sinha",\n  role: "Full Stack & Mobile Developer",\n  status: "Engineering secure & scalable solutions"\n};\ndeveloper.connect();`, 20);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden relative">
      <div className="w-full lg:w-1/2 h-full overflow-y-auto p-8 font-mono text-sm leading-relaxed z-10 custom-scrollbar">
        <div className="text-[#64748B] mb-4">{'/** @file about.js */'}</div>
        <pre className="text-[#E2E8F0] whitespace-pre-wrap">
          <code dangerouslySetInnerHTML={{
            __html: typedCode
              .replace(/"([^"]+)"/g, '<span class="text-[#39FF14]">"$1"</span>')
              .replace(/\b(const|developer|name|role|status)\b/g, match => `<span class="text-[#B026FF]">${match}</span>`)
          }} />
          <span className="animate-pulse inline-block w-2 h-4 bg-[#00F0FF] ml-1 align-middle"></span>
        </pre>
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-lg aspect-video bg-[#0A0A0F]/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_0_40px_rgba(0,240,255,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        </div>
      </div>
    </div>
  );
};
