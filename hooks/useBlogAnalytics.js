// hooks/useBlogAnalytics.js - React hook for blog analytics

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  trackPageView,
  trackEngagement,
  trackReadingTime,
  getPostAnalytics,
  getGlobalAnalytics,
  getDashboardData,
  getTrendingPosts
} from '@/utils/blogAnalytics';

// Main analytics hook
export const useBlogAnalytics = (postId = null) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      if (postId) {
        const postAnalytics = getPostAnalytics(postId);
        setAnalytics(postAnalytics);
      } else {
        const globalAnalytics = getGlobalAnalytics();
        setAnalytics(globalAnalytics);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const track = useCallback((action, data = {}) => {
    try {
      let result;
      switch (action) {
        case 'view':
          result = trackPageView(postId, data.title);
          break;
        case 'like':
        case 'comment':
        case 'share':
          result = trackEngagement(postId, action, data.increment || 1);
          break;
        case 'readTime':
          result = trackReadingTime(postId, data.timeSpent);
          break;
        default:
          console.warn(`Unknown tracking action: ${action}`);
          return;
      }
      
      // Update local state with new analytics
      if (result) {
        setAnalytics(result);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [postId]);

  return { analytics, loading, error, track };
};

// Hook for reading progress and time tracking
export const useReadingProgress = (postId, contentRef, estimatedReadTime) => {
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const startTimeRef = useRef(null);
  const timeSpentRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const scrolled = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.scrollHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress based on content scroll
      const start = elementTop - windowHeight * 0.3;
      const end = elementTop + elementHeight - windowHeight * 0.7;
      const progressValue = Math.max(0, Math.min(100, ((scrolled - start) / (end - start)) * 100));

      setProgress(progressValue);

      // Track if user is actively reading (progress > 5% and < 95%)
      const newIsReading = progressValue > 5 && progressValue < 95;
      if (newIsReading !== isReading) {
        setIsReading(newIsReading);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentRef, isReading]);

  // Track reading time
  useEffect(() => {
    if (isReading) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
    } else {
      if (startTimeRef.current) {
        const sessionTime = Date.now() - startTimeRef.current;
        timeSpentRef.current += sessionTime;
        setTimeSpent(timeSpentRef.current);
        startTimeRef.current = null;
      }
    }
  }, [isReading]);

  // Track reading time when component unmounts or user leaves
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (timeSpentRef.current > 5000 && postId) { // Only track if spent more than 5 seconds
        trackReadingTime(postId, timeSpentRef.current);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && startTimeRef.current) {
        const sessionTime = Date.now() - startTimeRef.current;
        timeSpentRef.current += sessionTime;
        setTimeSpent(timeSpentRef.current);
        startTimeRef.current = null;
        setIsReading(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      handleBeforeUnload(); // Track time on unmount
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [postId]);

  return {
    progress: Math.round(progress),
    timeSpent: Math.round(timeSpentRef.current / 1000), // Return in seconds
    isReading,
    estimatedTimeRemaining: estimatedReadTime ? Math.max(0, estimatedReadTime - Math.round(timeSpentRef.current / 1000)) : null
  };
};

// Hook for engagement tracking (likes, shares, etc.)
export const useEngagement = (postId) => {
  const [engagementState, setEngagementState] = useState({
    liked: false,
    bookmarked: false,
    shared: false
  });

  // Load saved engagement state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && postId) {
      const saved = localStorage.getItem(`engagement_${postId}`);
      if (saved) {
        setEngagementState(JSON.parse(saved));
      }
    }
  }, [postId]);

  // Save engagement state to localStorage
  const saveEngagementState = useCallback((newState) => {
    if (typeof window !== 'undefined' && postId) {
      localStorage.setItem(`engagement_${postId}`, JSON.stringify(newState));
      setEngagementState(newState);
    }
  }, [postId]);

  const toggleLike = useCallback(() => {
    const newLiked = !engagementState.liked;
    const increment = newLiked ? 1 : -1;
    
    trackEngagement(postId, 'likes', increment);
    saveEngagementState({ ...engagementState, liked: newLiked });
    
    return newLiked;
  }, [postId, engagementState, saveEngagementState]);

  const toggleBookmark = useCallback(() => {
    const newBookmarked = !engagementState.bookmarked;
    saveEngagementState({ ...engagementState, bookmarked: newBookmarked });
    return newBookmarked;
  }, [engagementState, saveEngagementState]);

  const handleShare = useCallback(async (platform = 'general') => {
    trackEngagement(postId, 'shares', 1);
    saveEngagementState({ ...engagementState, shared: true });

    // Handle different share platforms
    const url = window.location.href;
    const title = document.title;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          return 'copied';
        } catch (err) {
          console.error('Failed to copy link:', err);
          return 'error';
        }
      default:
        if (navigator.share) {
          try {
            await navigator.share({ title, url });
            return 'shared';
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.error('Failed to share:', err);
            }
            return 'cancelled';
          }
        }
    }
    return 'opened';
  }, [postId, engagementState, saveEngagementState]);

  return {
    ...engagementState,
    toggleLike,
    toggleBookmark,
    handleShare
  };
};

// Hook for dashboard analytics
export const useDashboardAnalytics = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshData = useCallback(() => {
    try {
      setLoading(true);
      const data = getDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return { dashboardData, loading, error, refreshData };
};

// Hook for trending posts
export const useTrendingPosts = (days = 7, limit = 5) => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      const trending = getTrendingPosts(days);
      setTrendingPosts(trending.slice(0, limit));
    } catch (err) {
      console.error('Failed to get trending posts:', err);
      setTrendingPosts([]);
    } finally {
      setLoading(false);
    }
  }, [days, limit]);

  return { trendingPosts, loading };
};

// Hook for real-time analytics updates
export const useRealtimeAnalytics = (postId = null, interval = 30000) => {
  const [analytics, setAnalytics] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const updateAnalytics = () => {
      try {
        const data = postId ? getPostAnalytics(postId) : getGlobalAnalytics();
        setAnalytics(data);
        setLastUpdated(Date.now());
      } catch (err) {
        console.error('Failed to update analytics:', err);
      }
    };

    // Initial load
    updateAnalytics();

    // Set up interval for updates
    const intervalId = setInterval(updateAnalytics, interval);

    return () => clearInterval(intervalId);
  }, [postId, interval]);

  return { analytics, lastUpdated };
};

// Hook for analytics export/import
export const useAnalyticsManager = () => {
  const exportAnalytics = useCallback(() => {
    try {
      const data = getDashboardData();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `blog_analytics_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (err) {
      console.error('Failed to export analytics:', err);
      return false;
    }
  }, []);

  const importAnalytics = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          // Here you would implement the import logic
          console.log('Analytics data ready for import:', data);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  return { exportAnalytics, importAnalytics };
};