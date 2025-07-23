// components/Analytics.jsx - Analytics wrapper
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Google Analytics page view tracking
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
      });
    }

    // Performance monitoring
    if (typeof window !== 'undefined') {
      import('../utils/performance').then(({ measurePerformance }) => {
        measurePerformance();
      });
    }
  }, [pathname]);

  return null;
};

export default Analytics;