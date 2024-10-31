import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PerformanceTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Clear any existing marks first
    performance.clearMarks();
    
    // Mark route change start
    performance.mark('route-change-start');

    const measurePageLoad = () => {
      if (performance && performance.getEntriesByType) {
        const perfEntries = performance.getEntriesByType('navigation');
        const paintEntries = performance.getEntriesByType('paint');
        
        console.group(`🔍 Page Performance: ${location.pathname}`);
        
        // Navigation Timing
        if (perfEntries.length > 0) {
          const timing = perfEntries[0];
          console.log('📊 Navigation Timing:', {
            'DNS Lookup': Math.round(timing.domainLookupEnd - timing.domainLookupStart) + 'ms',
            'Connection Time': Math.round(timing.connectEnd - timing.connectStart) + 'ms',
            'First Byte (TTFB)': Math.round(timing.responseStart - timing.requestStart) + 'ms',
            'DOM Interactive': Math.round(timing.domInteractive) + 'ms',
            'DOM Complete': Math.round(timing.domComplete) + 'ms',
            'Load Total': Math.round(timing.loadEventEnd - timing.startTime) + 'ms'
          });
        }

        // Paint Timing
        if (paintEntries.length > 0) {
          console.log('🎨 Paint Timing:', {
            'First Paint': Math.round(paintEntries[0].startTime) + 'ms',
            'First Contentful Paint': Math.round(paintEntries[1]?.startTime || 0) + 'ms'
          });
        }

        // Memory Usage (if available)
        if (performance.memory) {
          console.log('💾 Memory Usage:', {
            'Used JS Heap': Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
            'Total JS Heap': Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB'
          });
        }

        // Resource Loading
        const resources = performance.getEntriesByType('resource');
        const resourceStats = resources.reduce((acc, resource) => {
          const type = resource.initiatorType;
          if (!acc[type]) acc[type] = [];
          acc[type].push({
            name: resource.name.split('/').pop(),
            duration: Math.round(resource.duration)
          });
          return acc;
        }, {});

        console.log('📦 Resources Loaded:', resourceStats);
        
        console.groupEnd();

        // Clear only after measurements are done
        setTimeout(() => {
          performance.clearMarks();
          performance.clearMeasures();
          performance.clearResourceTimings();
        }, 0);
      }
    };

    window.addEventListener('load', measurePageLoad);

    return () => {
      window.removeEventListener('load', measurePageLoad);
      // Only measure if start mark exists
      if (performance.getEntriesByName('route-change-start').length > 0) {
        performance.mark('route-change-end');
        try {
          performance.measure('route-change', 'route-change-start', 'route-change-end');
        } catch (error) {
          console.warn('Performance measurement error:', error);
        }
      }
    };
  }, [location.pathname]);

  return null;
};

export default PerformanceTracker; 