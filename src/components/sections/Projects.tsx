import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Github, ExternalLink, Layers, Database, Cpu } from "lucide-react";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-background relative"
    >
      <div className="container mx-auto px-4">
        <SectionHeading title="Featured Projects" subtitle="My Work" />

        {/* ClientFlow Project */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <Card className="p-0 overflow-hidden group border-primary/20">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Project Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center bg-surface">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  <span className="text-primary font-mono text-sm capitalize">
                    Full Stack Application (Freelance Management Platform)
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  ClientFlow
                </h3>
                <p className="text-muted mb-6 leading-relaxed">
                  A comprehensive freelance management platform designed to
                  streamline client relationships, project tracking, and
                  invoicing. Provides a centralized dashboard for freelancers
                  and a secure portal for clients.
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold mb-3 text-gray-300">
                    Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "Stripe",
                      "Docker",
                      "Tailwind CSS",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 text-xs text-gray-400 border border-white/5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                  <a
                    href="https://github.com/abhisheksinha20p/ClientFlow.git"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="text-sm">
                      <Github size={18} /> GitHub
                    </Button>
                  </a>
                  <a
                    href="https://client-flow-teal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" className="text-sm">
                      <ExternalLink size={18} /> Live Demo
                    </Button>
                  </a>
                </div>
              </div>

              {/* Project Visual/Mockup Overlay */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 flex items-center justify-center min-h-[300px]">
                <div className="absolute inset-0 bg-[url('/img/clientflow.png')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="p-4 glass rounded-xl text-center">
                    <Layers className="w-8 h-8 text-primary mx-auto mb-2" />
                    <span className="text-xs font-mono">Dual-Portal</span>
                  </div>
                  <div className="p-4 glass rounded-xl text-center">
                    <Database className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <span className="text-xs font-mono">RBAC Auth</span>
                  </div>
                  <div className="col-span-2 p-4 glass rounded-xl text-center">
                    <Cpu className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-xs font-mono">Stripe Integrated</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Vera Project */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="p-0 overflow-hidden group">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Project Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center bg-surface">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  <span className="text-primary font-mono text-sm capitalize">
                    Full Stack Application
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Vera
                </h3>
                <p className="text-muted mb-6 leading-relaxed">
                  A modern full-stack task management application focused on
                  simplicity and productivity. Features secure authentication, a
                  focus dashboard, and a clean glassmorphism-based UI.
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold mb-3 text-gray-300">
                    Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "Docker",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 text-xs text-gray-400 border border-white/5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                  <a
                    href="https://github.com/abhisheksinha20p/Vera"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="text-sm">
                      <Github size={18} /> GitHub
                    </Button>
                  </a>
                  <a
                    href="https://vera-3m9k2bkdy-avis-projects-87f288a4.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" className="text-sm">
                      <ExternalLink size={18} /> Live Demo
                    </Button>
                  </a>
                </div>
              </div>

              {/* Project Visual/Mockup Overlay */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 flex items-center justify-center min-h-[300px]">
                <div className="absolute inset-0 bg-[url('/img/vera_app.png')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="p-4 glass rounded-xl text-center">
                    <Layers className="w-8 h-8 text-primary mx-auto mb-2" />
                    <span className="text-xs font-mono">Clean UI</span>
                  </div>
                  <div className="p-4 glass rounded-xl text-center">
                    <Database className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <span className="text-xs font-mono">Secure DB</span>
                  </div>
                  <div className="col-span-2 p-4 glass rounded-xl text-center">
                    <Cpu className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-xs font-mono">High Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="text-center mt-12 opacity-50">
          <p>More projects coming soon...</p>
        </div>
      </div>
    </section>
  );
};
