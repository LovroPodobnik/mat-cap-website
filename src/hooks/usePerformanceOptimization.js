import { useEffect } from 'react';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Disable smooth scrolling during scroll
    let scrollTimeout;
    const handleScroll = () => {
      document.body.style.pointerEvents = 'none';
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.pointerEvents = 'auto';
    };
  }, []);
}; 