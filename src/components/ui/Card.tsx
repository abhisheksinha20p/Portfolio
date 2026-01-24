import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({ children, className = '', hoverEffect = false }: CardProps) => {
  return (
    <div 
      className={`
        glass p-6 rounded-2xl border border-white/5 
        ${hoverEffect ? 'glass-hover hover:-translate-y-1' : ''} 
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};
