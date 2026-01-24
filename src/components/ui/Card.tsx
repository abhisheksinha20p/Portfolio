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
        bg-white/[0.02] p-8 border border-white/5 
        ${hoverEffect ? 'hover:bg-white/[0.04] hover:border-white/10' : ''} 
        transition-all duration-500 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};
