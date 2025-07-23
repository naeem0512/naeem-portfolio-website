// utils/performance.js - Performance monitoring utilities
export const measurePerformance = () => {
    if (typeof window === 'undefined') return;
  
    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log to analytics service (replace with your preferred analytics)
        console.log(`Performance: ${entry.name}`, entry.value);
        
        // You can send to Google Analytics, Vercel Analytics, etc.
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: entry.name,
            value: entry.value,
            event_category: 'performance'
          });
        }
      }
    });
  
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] });
  };