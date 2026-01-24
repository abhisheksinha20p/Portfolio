import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      
      {/* Editorial Vertical Text (Left) */}
      <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 z-10 writing-vertical-rl text-muted/20 tracking-[1em] text-xs font-mono select-none">
        EST. 2024 • PORTFOLIO
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="text-secondary tracking-[0.2em] text-sm mb-8 uppercase">
              Full Stack & Mobile Developer
            </p>
            
            <h1 className="text-6xl md:text-9xl font-serif italic text-white mb-6 tracking-tighter leading-[0.9]">
              Abhishek<br/>Sinha
            </h1>
            
            <div className="h-px w-24 bg-white/20 mx-auto my-10" />

            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto font-light leading-relaxed">
              Crafting <span className="text-white">secure backend systems</span> and <br className="hidden md:block"/>
              immersive cross-platform experiences.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-14"
            >
              <a 
                href="#projects"
                className="group inline-flex items-center gap-4 text-white hover:text-white/70 transition-colors uppercase tracking-widest text-sm"
              >
                View Selected Works
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative center line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -z-10" />
    </section>
  );
};
