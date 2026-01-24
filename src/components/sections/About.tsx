import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { GraduationCap, Code2, ShieldCheck } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="About Me" subtitle="My Background" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              Engineering <span className="text-gradient">Secure & Scalable</span> Solutions
            </h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                As a freelance Full Stack & Mobile Developer, I specialize in building high-performance backend systems 
                and secure APIs. My approach is rooted in clean architecture and security-first principles, 
                ensuring that every application I build is robust, maintainable, and ready for production.
              </p>
              <p>
                I have deep expertise in the MERN stack and cross-platform mobile development. I don't just write code; 
                I design systems that solve real-world problems efficiently. My workflow emphasizes comprehensive testing (Jest), 
                structured logging (Winston), and strict data validation to prevent vulnerabilities before they happen.
              </p>
              <p>
                Whether it's deploying Dockerized microservices on AWS or building intuitive React interfaces, 
                I am committed to delivering excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card className="text-center p-4">
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium text-sm">Security First</h4>
              </Card>
              <Card className="text-center p-4">
                <Code2 className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h4 className="font-medium text-sm">Clean Code</h4>
              </Card>
            </div>
          </motion.div>

          {/* Education & Timeline Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="text-primary" /> Education
            </h3>

            <div className="relative border-l border-white/10 ml-3 pl-8 pb-8">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
              <Card>
                <span className="text-primary text-sm font-mono mb-2 block">2024</span>
                <h4 className="text-lg font-bold">Bachelor of Engineering</h4>
                <p className="text-gray-400 text-sm">Electronics and Communications Engineering</p>
                <div className="mt-2 text-sm text-gray-500">
                  KLS Gogte Institute of Technology
                </div>
              </Card>
            </div>
             
             {/* Future education or certifications could go here */}
             <div className="relative border-l border-white/10 ml-3 pl-8">
               <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[7px] top-1" />
               <p className="text-sm text-muted italic">Continuous Learning & Certifications...</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
