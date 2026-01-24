import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import type { FormEvent } from 'react';

export const Contact = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert("Thank you for your message! This is a demo form.");
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
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Secure</h3>
              <p className="text-muted">
                I'm currently available for freelance projects. creating secure backend systems 
                or scalable mobile applications? Let's discuss how we can work together.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:abhisheksinha20009k@gmail.com" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted">Email</div>
                  <div className="font-medium">abhisheksinha20009k@gmail.com</div>
                </div>
              </a>
              
              <a href="tel:+917050267437" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                  <Phone className="text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted">Phone</div>
                  <div className="font-medium">7050267437</div>
                </div>
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://github.com/abhisheksinha20p" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full justify-center"><Github className="mr-2" /> GitHub</Button>
              </a>
              <a href="http://www.linkedin.com/in/abhishek-sinha-0897aa23b" target="_blank" rel="noopener noreferrer">
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-gray-600"
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-gray-600"
                    placeholder="your@email.com" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-gray-600 resize-none"
                    placeholder="How can I help you?" 
                    required 
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
