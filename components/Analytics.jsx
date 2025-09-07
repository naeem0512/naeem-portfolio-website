// components/Analytics.jsx - Enhanced Analytics wrapper
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Google Analytics page view tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
      });
    }

    // Performance monitoring
    if (typeof window !== 'undefined') {
      import('../utils/performance')
        .then(({ measurePerformance }) => {
          measurePerformance();
        })
        .catch(error => {
          console.warn('Performance monitoring failed:', error);
        });
    }

    // Blog analytics tracking (only import when needed)
    if (typeof window !== 'undefined') {
      import('../utils/blogAnalytics')
        .then(({ trackPageView, analytics }) => {
          // Track page view
          trackPageView();

          // Track device type (only once per session)
          try {
            const deviceTracked = sessionStorage.getItem('device_tracked');
            if (!deviceTracked && analytics) {
              const data = analytics.getStoredData();
              const isMobile = window.innerWidth <= 768;
              const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

              if (!data.deviceTypes) {
                data.deviceTypes = { desktop: 0, mobile: 0, tablet: 0 };
              }

              if (isMobile) {
                data.deviceTypes.mobile += 1;
              } else if (isTablet) {
                data.deviceTypes.tablet += 1;
              } else {
                data.deviceTypes.desktop += 1;
              }

              analytics.saveData(data);
              sessionStorage.setItem('device_tracked', 'true');
            }
          } catch (error) {
            console.warn('Device tracking failed:', error);
          }

          // Track referrer (only once per session)
          try {
            const referrerTracked = sessionStorage.getItem('referrer_tracked');
            if (!referrerTracked && document.referrer && document.referrer !== window.location.href && analytics) {
              const data = analytics.getStoredData();
              const referrerDomain = new URL(document.referrer).hostname;

              if (!data.referrers) {
                data.referrers = {};
              }

              data.referrers[referrerDomain] = (data.referrers[referrerDomain] || 0) + 1;
              analytics.saveData(data);
              sessionStorage.setItem('referrer_tracked', 'true');
            }
          } catch (error) {
            console.warn('Referrer tracking failed:', error);
          }
        })
        .catch(error => {
          console.warn('Blog analytics failed:', error);
        });
    }
  }, [pathname]);

  return null;
};

export default Analytics;
