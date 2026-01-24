import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './Button';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check if user has a saved preference, otherwise default to dark
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Default to saved preference, then system preference, then dark
    const initialTheme = savedTheme || systemTheme || 'dark'; 
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button 
      variant="ghost" 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};
