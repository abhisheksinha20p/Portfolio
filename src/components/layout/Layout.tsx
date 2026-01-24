import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-black relative">
       <div className="noise-overlay" />
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <footer className="py-6 text-center text-muted text-sm glass mt-20">
        <p>© {new Date().getFullYear()} Abhishek Sinha. All rights reserved.</p>
      </footer>
    </div>
  );
};
