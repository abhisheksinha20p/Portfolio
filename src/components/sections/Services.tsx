import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { Server, Smartphone, Globe } from 'lucide-react';

const services = [
  {
    title: "Backend Development",
    icon: <Server className="w-10 h-10 text-primary" />,
    description: "Building robust, scalable, and secure backend architectures. I ensure your data is safe and your services are always available."
  },
  {
    title: "API Development",
    icon: <Globe className="w-10 h-10 text-secondary" />,
    description: "Designing RESTful APIs with strict security protocols, proper error handling, and comprehensive documentation."
  },
  {
    title: "Mobile App Development",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    description: "Creating cross-platform mobile applications that provide seamless user experiences and integrate perfectly with backend services."
  }
];

export const Services = () => {
  return (
    <section id="services" className="min-h-screen py-20 relative">
       {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        <SectionHeading title="Services" subtitle="What I Offer" />

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card hoverEffect className="h-full text-center group">
                 <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                   {service.icon}
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                 <p className="text-muted leading-relaxed">
                   {service.description}
                 </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
