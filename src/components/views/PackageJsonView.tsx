export const PackageJsonView = () => (
  <div className="h-full overflow-y-auto p-8 font-mono text-sm bg-[#0D0D14] custom-scrollbar">
    <pre className="text-[#E2E8F0] leading-relaxed"
      dangerouslySetInnerHTML={{__html: `<span class="text-white">{</span>
  <span class="text-[#00F0FF]">"name"</span>: <span class="text-[#39FF14]">"abhios-portfolio"</span>,
  <span class="text-[#00F0FF]">"version"</span>: <span class="text-[#39FF14]">"4.2.0"</span>,
  <span class="text-[#00F0FF]">"description"</span>: <span class="text-[#39FF14]">"IDE-style developer portfolio"</span>,
  <span class="text-[#00F0FF]">"scripts"</span>: <span class="text-white">{</span>
    <span class="text-[#00F0FF]">"dev"</span>: <span class="text-[#39FF14]">"vite"</span>,
    <span class="text-[#00F0FF]">"build"</span>: <span class="text-[#39FF14]">"tsc && vite build"</span>,
    <span class="text-[#00F0FF]">"deploy"</span>: <span class="text-[#39FF14]">"gh-pages -d dist"</span>
  <span class="text-white">}</span>,
  <span class="text-[#00F0FF]">"//_note"</span>: <span class="text-[#39FF14]">"This is a decorative representation of dependencies"</span>,
  <span class="text-[#00F0FF]">"dependencies"</span>: <span class="text-white">{</span>
    <span class="text-[#00F0FF]">"react"</span>: <span class="text-[#39FF14]">"^18.2.0"</span>,
    <span class="text-[#00F0FF]">"react-dom"</span>: <span class="text-[#39FF14]">"^18.2.0"</span>,
    <span class="text-[#00F0FF]">"lucide-react"</span>: <span class="text-[#39FF14]">"^0.383.0"</span>,
    <span class="text-[#00F0FF]">"tailwindcss"</span>: <span class="text-[#39FF14]">"^3.4.0"</span>
  <span class="text-white">}</span>,
  <span class="text-[#00F0FF]">"author"</span>: <span class="text-[#39FF14]">"abhi.dev"</span>,
  <span class="text-[#00F0FF]">"license"</span>: <span class="text-[#39FF14]">"MIT"</span>
<span class="text-white">}</span>`}}
    />
  </div>
);
