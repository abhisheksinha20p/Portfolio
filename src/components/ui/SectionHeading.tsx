import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
}

export const SectionHeading = ({ title, subtitle, align = 'center' }: SectionHeadingProps) => {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-primary font-medium tracking-wider uppercase text-sm"
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold mt-2"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '60px' }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`h-1 bg-primary mt-4 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </div>
  );
};
