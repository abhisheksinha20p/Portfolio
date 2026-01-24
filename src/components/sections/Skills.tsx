import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { Server, Database, Container, Globe, Wrench, Shield } from 'lucide-react';

const skillsData = [
  {
    category: "Backend & APIs",
    icon: <Server className="w-6 h-6 text-primary" />,
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices"]
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6 text-secondary" />,
    skills: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Schema Design"]
  },
  {
    category: "DevOps & Cloud",
    icon: <Container className="w-6 h-6 text-primary" />,
    skills: ["Docker", "AWS (EC2, S3)", "Nginx", "CI/CD", "Linux"]
  },
  {
    category: "Frontend",
    icon: <Globe className="w-6 h-6 text-secondary" />,
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"]
  },
  {
    category: "Security",
    icon: <Shield className="w-6 h-6 text-primary" />,
    skills: ["JWT Auth", "OAuth", "Rate Limiting", "Data Encryption", "OWASP"]
  },
  {
    category: "Tooling",
    icon: <Wrench className="w-6 h-6 text-secondary" />,
    skills: ["Git", "GitHub Actions", "Jest", "Postman", "VS Code"]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="Technical Expertise" subtitle="My Toolkit" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hoverEffect className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-sm bg-white/5 border border-white/5 rounded-full text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
