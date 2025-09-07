// utils/blogAnalytics.js - REAL Analytics System

class RealBlogAnalytics {
    constructor() {
      this.storageKey = 'naeem_blog_analytics_v1';
      this.sessionKey = 'naeem_blog_session';
      this.isClient = typeof window !== 'undefined';
      
      if (this.isClient) {
        this.init();
      }
    }
  
    init() {
      // Initialize analytics on page load
      this.trackSession();
      this.trackPageView();
      
      // Track user engagement
      this.trackScrollDepth();
      this.trackTimeOnPage();
      
      // Setup visibility change tracking
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.saveCurrentSession();
        }
      });
  
      // Save data before page unload
      window.addEventListener('beforeunload', () => {
        this.saveCurrentSession();
      });
    }
  
    // Get or create analytics data structure
    getAnalyticsData() {
      if (!this.isClient) return this.getDefaultStructure();
      
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const data = JSON.parse(stored);
          return this.migrateDataStructure(data);
        }
      } catch (error) {
        console.warn('Failed to load analytics data:', error);
      }
      
      return this.getDefaultStructure();
    }
  
    getDefaultStructure() {
      return {
        totalPageViews: 0,
        uniqueVisitors: new Set(),
        sessions: [],
        posts: {},
        interactions: {
          likes: 0,
          shares: 0,
          comments: 0,
          bookmarks: 0
        },
        performance: {
          avgTimeOnPage: 0,
          avgScrollDepth: 0,
          bounceRate: 0
        },
        timestamps: {
          firstVisit: new Date().toISOString(),
          lastVisit: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        }
      };
    }
  
    migrateDataStructure(data) {
      // Ensure all required fields exist
      const defaultStructure = this.getDefaultStructure();
      
      return {
        ...defaultStructure,
        ...data,
        uniqueVisitors: new Set(data.uniqueVisitors || []),
        sessions: data.sessions || [],
        posts: data.posts || {},
        interactions: {
          ...defaultStructure.interactions,
          ...data.interactions
        },
        performance: {
          ...defaultStructure.performance,
          ...data.performance
        },
        timestamps: {
          ...defaultStructure.timestamps,
          ...data.timestamps,
          lastUpdated: new Date().toISOString()
        }
      };
    }
  
    saveAnalyticsData(data) {
      if (!this.isClient) return;
      
      try {
        // Convert Set to Array for storage
        const dataToStore = {
          ...data,
          uniqueVisitors: Array.from(data.uniqueVisitors),
          timestamps: {
            ...data.timestamps,
            lastUpdated: new Date().toISOString()
          }
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
      } catch (error) {
        console.warn('Failed to save analytics data:', error);
      }
    }
  
    // Generate or get visitor ID
    getVisitorId() {
      if (!this.isClient) return 'server-visitor';
      
      let visitorId = localStorage.getItem('naeem_visitor_id');
      if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('naeem_visitor_id', visitorId);
      }
      return visitorId;
    }
  
    // Track user session
    trackSession() {
      if (!this.isClient) return;
      
      const sessionId = 'session_' + Date.now();
      const visitorId = this.getVisitorId();
      
      const sessionData = {
        sessionId,
        visitorId,
        startTime: Date.now(),
        endTime: null,
        pages: [],
        interactions: 0,
        scrollDepth: 0
      };
      
      sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
      
      const data = this.getAnalyticsData();
      data.uniqueVisitors.add(visitorId);
      data.sessions.push(sessionData);
      this.saveAnalyticsData(data);
    }
  
    // Track page views
    trackPageView(path = null) {
      if (!this.isClient) return;
      
      const currentPath = path || window.location.pathname;
      const data = this.getAnalyticsData();
      
      data.totalPageViews += 1;
      data.timestamps.lastVisit = new Date().toISOString();
      
      // Update session data
      const sessionData = this.getCurrentSession();
      if (sessionData) {
        sessionData.pages.push({
          path: currentPath,
          timestamp: Date.now(),
          referrer: document.referrer
        });
        sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
      }
      
      this.saveAnalyticsData(data);
    }
  
    // Track post-specific analytics
    trackPostView(postId) {
      if (!this.isClient || !postId) return;
      
      const data = this.getAnalyticsData();
      
      if (!data.posts[postId]) {
        data.posts[postId] = {
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          bookmarks: 0,
          avgTimeOnPage: 0,
          avgScrollDepth: 0,
          firstViewed: new Date().toISOString()
        };
      }
      
      data.posts[postId].views += 1;
      data.posts[postId].lastViewed = new Date().toISOString();
      
      this.saveAnalyticsData(data);
      return data.posts[postId].views;
    }
  
    // Track interactions (likes, shares, etc.)
    trackInteraction(type, postId = null) {
      if (!this.isClient) return;
      
      const data = this.getAnalyticsData();
      
      // Global interaction tracking
      if (data.interactions[type] !== undefined) {
        data.interactions[type] += 1;
      }
      
      // Post-specific tracking
      if (postId && data.posts[postId]) {
        if (data.posts[postId][type] !== undefined) {
          data.posts[postId][type] += 1;
        }
      }
      
      // Update session interactions
      const sessionData = this.getCurrentSession();
      if (sessionData) {
        sessionData.interactions += 1;
        sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
      }
      
      this.saveAnalyticsData(data);
      return postId ? data.posts[postId][type] : data.interactions[type];
    }
  
    // Track scroll depth
    trackScrollDepth() {
      if (!this.isClient) return;
      
      let maxScrollDepth = 0;
      
      const updateScrollDepth = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (scrollPercent > maxScrollDepth) {
          maxScrollDepth = Math.min(scrollPercent, 100);
          
          // Update session data
          const sessionData = this.getCurrentSession();
          if (sessionData) {
            sessionData.scrollDepth = Math.max(sessionData.scrollDepth, maxScrollDepth);
            sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
          }
        }
      };
      
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateScrollDepth();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  
    // Track time on page
    trackTimeOnPage() {
      if (!this.isClient) return;
      
      const startTime = Date.now();
      
      const updateTimeOnPage = () => {
        const timeSpent = Date.now() - startTime;
        const sessionData = this.getCurrentSession();
        
        if (sessionData) {
          sessionData.timeOnPage = timeSpent;
          sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        }
      };
      
      // Update every 30 seconds
      const interval = setInterval(updateTimeOnPage, 30000);
      
      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        clearInterval(interval);
        updateTimeOnPage();
      });
    }
  
    // Get current session data
    getCurrentSession() {
      if (!this.isClient) return null;
      
      try {
        const sessionData = sessionStorage.getItem(this.sessionKey);
        return sessionData ? JSON.parse(sessionData) : null;
      } catch (error) {
        return null;
      }
    }
  
    // Save current session to persistent storage
    saveCurrentSession() {
      if (!this.isClient) return;
      
      const sessionData = this.getCurrentSession();
      if (!sessionData) return;
      
      sessionData.endTime = Date.now();
      
      const data = this.getAnalyticsData();
      
      // Update session in sessions array
      const sessionIndex = data.sessions.findIndex(s => s.sessionId === sessionData.sessionId);
      if (sessionIndex !== -1) {
        data.sessions[sessionIndex] = sessionData;
      }
      
      // Calculate and update performance metrics
      this.updatePerformanceMetrics(data);
      this.saveAnalyticsData(data);
    }
  
    // Update performance metrics
    updatePerformanceMetrics(data) {
      const completedSessions = data.sessions.filter(s => s.endTime);
      
      if (completedSessions.length > 0) {
        // Average time on page
        const totalTime = completedSessions.reduce((sum, session) => {
          return sum + (session.endTime - session.startTime);
        }, 0);
        data.performance.avgTimeOnPage = Math.round(totalTime / completedSessions.length / 1000); // in seconds
        
        // Average scroll depth
        const totalScrollDepth = completedSessions.reduce((sum, session) => {
          return sum + (session.scrollDepth || 0);
        }, 0);
        data.performance.avgScrollDepth = Math.round(totalScrollDepth / completedSessions.length);
        
        // Bounce rate (sessions with only 1 page view)
        const bouncedSessions = completedSessions.filter(s => s.pages.length <= 1).length;
        data.performance.bounceRate = Math.round((bouncedSessions / completedSessions.length) * 100);
      }
    }
  
    // Get blog statistics
    getBlogStats() {
      const data = this.getAnalyticsData();
      
      return {
        totalViews: data.totalPageViews,
        uniqueVisitors: data.uniqueVisitors.size,
        totalPosts: Object.keys(data.posts).length || 5, // Fallback to known post count
        avgTimeOnPage: data.performance.avgTimeOnPage,
        avgScrollDepth: data.performance.avgScrollDepth,
        bounceRate: data.performance.bounceRate,
        totalLikes: Object.values(data.posts).reduce((sum, post) => sum + (post.likes || 0), 0),
        totalShares: Object.values(data.posts).reduce((sum, post) => sum + (post.shares || 0), 0),
        totalComments: Object.values(data.posts).reduce((sum, post) => sum + (post.comments || 0), 0),
        sessionsToday: this.getSessionsToday(data),
        lastUpdated: data.timestamps.lastUpdated
      };
    }
  
    // Get post-specific statistics
    getPostStats(postId) {
      const data = this.getAnalyticsData();
      
      if (!data.posts[postId]) {
        return {
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          bookmarks: 0,
          avgTimeOnPage: 0,
          avgScrollDepth: 0
        };
      }
      
      return data.posts[postId];
    }
  
    // Get sessions from today
    getSessionsToday(data) {
      const today = new Date().toDateString();
      return data.sessions.filter(session => {
        const sessionDate = new Date(session.startTime).toDateString();
        return sessionDate === today;
      }).length;
    }
  
    // Get analytics trends (last 7 days)
    getTrends() {
      const data = this.getAnalyticsData();
      const now = Date.now();
      const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
      
      const recentSessions = data.sessions.filter(session => session.startTime > weekAgo);
      const previousWeekSessions = data.sessions.filter(session => 
        session.startTime > (weekAgo - (7 * 24 * 60 * 60 * 1000)) && session.startTime <= weekAgo
      );
      
      const calculateTrend = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100);
      };
      
      return {
        viewsTrend: calculateTrend(recentSessions.length, previousWeekSessions.length),
        visitorsTrend: calculateTrend(
          new Set(recentSessions.map(s => s.visitorId)).size,
          new Set(previousWeekSessions.map(s => s.visitorId)).size
        ),
        engagementTrend: calculateTrend(
          recentSessions.reduce((sum, s) => sum + s.interactions, 0),
          previousWeekSessions.reduce((sum, s) => sum + s.interactions, 0)
        )
      };
    }
  
    // Reset analytics (for development/testing)
    resetAnalytics() {
      if (!this.isClient) return;
      
      localStorage.removeItem(this.storageKey);
      sessionStorage.removeItem(this.sessionKey);
      localStorage.removeItem('naeem_visitor_id');
      console.log('Analytics data reset');
    }
  
    // Export analytics data
    exportData() {
      const data = this.getAnalyticsData();
      const exportData = {
        ...data,
        uniqueVisitors: Array.from(data.uniqueVisitors),
        exportedAt: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blog-analytics-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
  
  // Create and export singleton instance
  const blogAnalytics = new RealBlogAnalytics();
  
  export default blogAnalytics;
  
  // Export individual methods for convenience
  export const {
    trackPageView,
    trackPostView,
    trackInteraction,
    getBlogStats,
    getPostStats,
    getTrends,
    resetAnalytics,
    exportData
  } = blogAnalytics;