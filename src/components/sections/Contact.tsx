import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, Loader2 } from 'lucide-react';
import { type FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus('idle');

    try {
      // Verify key presence
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error("EmailJS Public Key is missing. Check .env file.");
      }

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        publicKey
      );
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="Get In Touch" subtitle="Contact Me" />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 font-serif italic">Let's Build Something Secure</h3>
              <p className="text-muted">
                I'm currently available for freelance projects. creating secure backend systems 
                or scalable mobile applications? Let's discuss how we can work together.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:abhisheksinha20009k@gmail.com" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors border border-white/5">
                  <Mail className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted">Email</div>
                  <div className="font-medium text-white">abhisheksinha20009k@gmail.com</div>
                </div>
              </a>
              
              <a href="tel:+917050267437" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors border border-white/5">
                  <Phone className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted">Phone</div>
                  <div className="font-medium text-white">7050267437</div>
                </div>
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://github.com/abhisheksinha20p" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full justify-center"><Github className="mr-2" /> GitHub</Button>
              </a>
              <a href="http://www.linkedin.com/in/abhishek-sinha-0897aa23b" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full justify-center"><Linkedin className="mr-2" /> LinkedIn</Button>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Card className="p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-sm font-medium text-gray-400">Name</label>
                  <input 
                    type="text" 
                    name="user_name"
                    id="user_name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all text-white placeholder:text-gray-600"
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-sm font-medium text-gray-400">Email</label>
                  <input 
                    type="email" 
                    name="user_email"
                    id="user_email"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all text-white placeholder:text-gray-600"
                    placeholder="your@email.com" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                  <textarea 
                    name="message"
                    id="message"
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all text-white placeholder:text-gray-600 resize-none"
                    placeholder="How can I help you?" 
                    required 
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>Sending... <Loader2 className="ml-2 animate-spin" size={18} /></>
                  ) : (
                    <>Send Message <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </Button>

                {status === 'success' && (
                  <p className="text-green-400 text-sm text-center">Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">Failed to send message. Please try again.</p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
