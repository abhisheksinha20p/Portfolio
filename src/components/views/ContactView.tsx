import { useState } from 'react';
import { CheckCircle2, Send, Mail, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const ContactView = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setError(false);

    const form = e.currentTarget;
    
    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        form,
        publicKey
      );
      
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 font-mono text-sm bg-[#0D0D14] flex flex-col custom-scrollbar">
       <div className="max-w-2xl w-full mx-auto mt-10">
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] transition-shadow duration-500">
            <div className="bg-black/40 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-[#64748B] text-xs">~/contact.js</span>
            </div>
            <div className="p-8">
              <div className="text-[#B026FF] mb-6">
                <span className="text-[#E2E8F0]">import</span> {'{'} <span className="text-[#00F0FF]">sendMessage</span> {'}'} <span className="text-[#E2E8F0]">from</span> <span className="text-[#39FF14]">'@api/contact'</span>;
              </div>
              
              <div className="flex gap-4 mb-6">
                <a href="mailto:abhisheksinha20009k@gmail.com" className="flex items-center gap-2 text-xs text-[#64748B] hover:text-[#00F0FF] transition-colors">
                  <Mail size={14} /> abhisheksinha20009k@gmail.com
                </a>
                <a href="https://github.com/abhisheksinha20p" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#64748B] hover:text-[#00F0FF] transition-colors">
                  <Github size={14} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/abhishek-sinha-0897aa23b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#64748B] hover:text-[#00F0FF] transition-colors">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col group">
                  <label className="text-[#64748B] mb-2 group-focus-within:text-[#00F0FF] transition-colors">
                    const <span className="text-[#E2E8F0]">name</span> = 
                  </label>
                  <input 
                    type="text" 
                    name="user_name"
                    placeholder='"John Doe"' 
                    className="bg-transparent border-b border-white/20 focus:border-[#00F0FF] outline-none text-[#39FF14] py-2 px-1 focus:shadow-[0_4px_10px_-4px_rgba(0,240,255,0.4)] transition-all placeholder:text-white/10" 
                  />
                </div>
                <div className="flex flex-col group">
                  <label className="text-[#64748B] mb-2 group-focus-within:text-[#00F0FF] transition-colors">
                    const <span className="text-[#E2E8F0]">email</span> = 
                  </label>
                  <input 
                    type="email" 
                    name="user_email"
                    placeholder='"john@example.com"' 
                    className="bg-transparent border-b border-white/20 focus:border-[#00F0FF] outline-none text-[#39FF14] py-2 px-1 focus:shadow-[0_4px_10px_-4px_rgba(0,240,255,0.4)] transition-all placeholder:text-white/10" 
                  />
                </div>
                <div className="flex flex-col group">
                  <label className="text-[#64748B] mb-2 group-focus-within:text-[#B026FF] transition-colors">
                    const <span className="text-[#E2E8F0]">message</span> = 
                  </label>
                  <textarea 
                    name="message"
                    rows={4} 
                    placeholder='`Your message here...`' 
                    className="bg-white/5 border border-white/10 rounded focus:border-[#B026FF] outline-none text-[#39FF14] p-3 focus:shadow-[0_0_15px_rgba(176,38,255,0.2)] transition-all resize-none mt-1 placeholder:text-white/10 custom-scrollbar" 
                  />
                </div>
                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`flex items-center gap-2 transition-colors group relative overflow-hidden px-4 py-2 rounded border ${
                      sent 
                        ? 'border-[#39FF14]/30 bg-[#39FF14]/5 text-[#39FF14]' 
                        : loading
                        ? 'border-transparent bg-white/5 text-[#E2E8F0] cursor-wait'
                        : error
                        ? 'border-[#FF5F56]/30 bg-[#FF5F56]/5 text-[#FF5F56]'
                        : 'border-transparent hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/5 text-[#E2E8F0] hover:text-[#00F0FF]'
                    }`}
                  >
                    {sent ? (
                      <><CheckCircle2 size={16} className="text-[#39FF14]" /> Message sent!</>
                    ) : loading ? (
                      <><span className="animate-spin">⏳</span> Sending...</>
                    ) : error ? (
                      <><span>❌</span> Failed to send</>
                    ) : (
                      <>
                        <span className="relative text-[#00F0FF]">await</span>
                        <span className="relative">sendMessage(name, email, message);</span>
                        <Send size={16} className="relative ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#00F0FF]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
       </div>
    </div>
  );
};
