import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed = 30) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    
    const timer = setInterval(() => {
      setDisplayedText(prev => {
        if (prev.length < text.length) {
          return prev + text.charAt(prev.length);
        }
        clearInterval(timer);
        return prev;
      });
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return displayedText;
};
