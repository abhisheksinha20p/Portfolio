import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'abhios_tour_v2';

export const useOnboardingTour = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      const t = setTimeout(() => setShouldShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const markComplete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShouldShow(false);
  }, []);

  const resetTour = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setShouldShow(true);
  }, []);

  return { shouldShow, markComplete, resetTour };
};
