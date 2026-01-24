import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: ReactNode;
  className?: string;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary/10 border border-primary/50 text-primary hover:bg-primary/20 backdrop-blur-sm",
    outline: "bg-white/5 border border-white/10 text-text hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-text hover:text-primary hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
