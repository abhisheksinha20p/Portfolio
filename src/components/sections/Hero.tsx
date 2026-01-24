import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-secondary font-medium tracking-wide mb-4">
              FULL STACK & MOBILE DEVELOPER
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Building <span className="text-gradient">Secure APIs</span> <br />
              & Scalable Systems
            </h1>
            <p className="text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              I specialize in backend development, API security, and mobile applications 
              using Node.js, MongoDB, Docker, and modern cloud infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#projects"
                className="group px-8 py-3 bg-primary/10 border border-primary/50 text-primary rounded-lg font-medium hover:bg-primary/20 transition-all flex items-center gap-2"
              >
                View Projects
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="#contact"
                className="group px-8 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Contact Me
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted/30 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-muted rounded-full mx-auto animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
