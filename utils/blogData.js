// utils/blogData.js - Enhanced blog data with analytics integration

import { 
    trackPageView, 
    trackEngagement, 
    getPostAnalytics,
    getGlobalAnalytics,
    getTrendingPosts 
  } from './blogAnalytics';
  
  // Enhanced blog posts with unique IDs for analytics
  export const blogPosts = [
    {
      id: 'first-class-degree-journey',
      title: "🎉 Finally! I Did It! I Got the First-Class Degree!!",
      subtitle: "From Curious Coder to Tech Explorer: My Journey to Academic Success",
      author: "Mohammed Naeem Ahmed",
      date: "July 2025",
      publishDate: "2025-07-22",
      readTime: "8 min read",
      estimatedReadTimeMs: 480000, // 8 minutes in milliseconds
      category: "Journey",
      tags: ["First Class", "University", "Coding Journey", "Birmingham City", "Computer Science"],
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
      excerpt: "From feeling completely lost in my first programming lecture to building AI systems that actually work... this journey has been absolutely wild.",
      featured: true,
      status: 'published',
      seoDescription: "My journey from beginner to first-class Computer Science graduate at Birmingham City University. Real stories, challenges, and breakthroughs.",
      content: {
        sections: [
          {
            id: "intro",
            title: "The Beginning",
            icon: "Sparkles",
            content: "Okay, let me take a moment to breathe and celebrate because... I actually did it! 🎊 It all started with one simple (and slightly panicked) question: \"How do these apps even work?!\" Fast-forward through countless late nights, debugging marathons, and about a thousand Stack Overflow tabs later—and here I am: a First-Class Honours Computer & Data Science graduate!"
          },
          {
            id: "spark",
            title: "🔥 The Spark: My Geek Awakening",
            icon: "Lightbulb",
            timeline: "2022",
            content: "Starting uni at Birmingham City felt like jumping into the deep end without floaties. Code looked like alien hieroglyphics. Databases? Sounded like something you'd find in a sci-fi lab. But somewhere between the late-night debugging marathons and victory dances after solving a stubborn bug (yes, I celebrate alone in my room), I caught the bug—the good kind.",
            highlight: "One of the biggest \"this is why I love tech\" moments? Building a British Sign Language translator with my team. Real pressure. Real stakes. Real purpose. It wasn't just a grade—it was a project that could genuinely help people."
          },
          {
            id: "coding",
            title: "🛠️ Coding IRL: The Joy, the Chaos, the Ctrl+Z",
            icon: "Code2",
            timeline: "2023-2024",
            content: "Let's be honest—coding isn't always glamorous. Sometimes it's a perfectly clean deploy. Sometimes it's you screaming internally because one semi-colon broke your whole app. But I live for that rollercoaster. From building full-stack apps to experimenting with machine learning models, I've learned that the messiest problems often teach you the most.",
            codeBlock: {
              language: "python",
              code: `# The moment everything clicked
  def solve_problem(confusion, coffee_cups, determination):
      while confusion > 0:
          confusion -= coffee_cups * determination
          if confusion <= 0:
              return "Eureka! 🎉"
      return "More coffee needed ☕"`
            }
          },
          {
            id: "achievement",
            title: "🌟 First-Class Degree, First-Class Dreams",
            icon: "Trophy",
            timeline: "2025",
            content: "Getting a First wasn't just about good grades. It was about showing up—even when I felt lost. It was proving to myself that I could do hard things (like surviving group projects without losing my mind).",
            achievements: [
              "Dive deeper into AI, data science, and everything nerdy",
              "Build things that solve real problems (not just fill portfolio space)",  
              "Help make tech more accessible, inclusive, and human",
              "Maybe finally launch that blog + tutorial series I keep daydreaming about"
            ]
          },
          {
            id: "liftsense",
            title: "💪 Bonus Level Unlocked: LiftSense",
            icon: "Rocket",
            timeline: "Final Year",
            content: "For my final year dissertation, I created LiftSense—an intelligent fatigue monitoring system for resistance training, built using synthetic biosignal data, LSTM models, and real-time feedback mechanisms. It's a project I poured my soul into, blending AI, data science, and a passion for human performance.",
            projectLink: "/projects",
            stats: {
              accuracy: "97.94%",
              technology: "LSTM Neural Networks", 
              impact: "Real-time fatigue detection"
            }
          }
        ]
      }
    },
    {
      id: 'liftsense-ai-system',
      title: "Building LiftSense: My AI-Powered Fatigue Detection System",
      subtitle: "How I achieved 97.94% accuracy in real-time fatigue monitoring",
      author: "Mohammed Naeem Ahmed",
      date: "June 2025",
      publishDate: "2025-06-15",
      readTime: "12 min read",
      estimatedReadTimeMs: 720000,
      category: "AI/ML",
      tags: ["Machine Learning", "LSTM", "Python", "TensorFlow", "Healthcare Tech"],
      coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      excerpt: "Deep dive into the technical challenges and breakthroughs of creating an intelligent fatigue detection system using LSTM neural networks.",
      featured: false,
      status: 'draft', // This will show as "Coming Soon"
      seoDescription: "Technical deep-dive into building LiftSense, an AI-powered fatigue detection system with 97.94% accuracy using LSTM neural networks and synthetic biosignal data."
    },
    {
      id: 'react-fullstack-journey',
      title: "From Beginner to Full-Stack: My React Journey",
      subtitle: "Learning React, Next.js, and building real-world applications",
      author: "Mohammed Naeem Ahmed", 
      date: "May 2025",
      publishDate: "2025-05-20",
      readTime: "6 min read",
      estimatedReadTimeMs: 360000,
      category: "Web Development",
      tags: ["React", "Next.js", "JavaScript", "Full Stack", "Learning"],
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      excerpt: "My journey from struggling with JavaScript basics to building full-stack applications with React and Next.js.",
      featured: false,
      status: 'draft',
      seoDescription: "Complete guide to learning React and Next.js from a beginner's perspective. Real experiences, challenges, and breakthrough moments."
    },
    {
      id: 'why-computer-science',
      title: "Why I Chose Computer Science (And Why You Should Too)",
      subtitle: "The field that's shaping our future and how to get started",
      author: "Mohammed Naeem Ahmed",
      date: "April 2025", 
      publishDate: "2025-04-10",
      readTime: "5 min read",
      estimatedReadTimeMs: 300000,
      category: "Career Advice",
      tags: ["Computer Science", "Career", "University", "Advice", "Future"],
      coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
      excerpt: "Why computer science is more than just coding and how it opens doors to incredible opportunities.",
      featured: false,
      status: 'draft',
      seoDescription: "Comprehensive guide to choosing Computer Science as a career path. Benefits, opportunities, and practical advice for aspiring developers."
    }
  ];
  
  // Function to get blog post by ID
  export const getBlogPostById = (id) => {
    return blogPosts.find(post => post.id === id);
  };
  
  // Function to get published posts only
  export const getPublishedPosts = () => {
    return blogPosts.filter(post => post.status === 'published');
  };
  
  // Function to get posts by category
  export const getPostsByCategory = (category) => {
    const posts = getPublishedPosts();
    if (category === "All") return posts;
    return posts.filter(post => post.category === category);
  };
  
  // Function to get posts by tag
  export const getPostsByTag = (tag) => {
    const posts = getPublishedPosts();
    return posts.filter(post => post.tags.includes(tag));
  };
  
  // Function to search posts
  export const searchPosts = (query) => {
    const posts = getPublishedPosts();
    const searchTerm = query.toLowerCase();
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.subtitle.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  };
  
  // Function to get featured posts
  export const getFeaturedPosts = () => {
    return getPublishedPosts().filter(post => post.featured);
  };
  
  // Function to get related posts
  export const getRelatedPosts = (currentPostId, limit = 3) => {
    const currentPost = getBlogPostById(currentPostId);
    if (!currentPost) return [];
    
    const posts = getPublishedPosts().filter(post => post.id !== currentPostId);
    
    // Score posts based on shared tags and category
    const scoredPosts = posts.map(post => {
      let score = 0;
      
      // Same category = +3 points
      if (post.category === currentPost.category) score += 3;
      
      // Shared tags = +1 point each
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += sharedTags.length;
      
      return { ...post, relationScore: score };
    });
    
    return scoredPosts
      .sort((a, b) => b.relationScore - a.relationScore)
      .slice(0, limit);
  };
  
  // Function to get all unique categories
  export const getCategories = () => {
    const posts = getPublishedPosts();
    return ["All", ...new Set(posts.map(post => post.category))];
  };
  
  // Function to get all unique tags
  export const getAllTags = () => {
    const posts = getPublishedPosts();
    return [...new Set(posts.flatMap(post => post.tags))];
  };
  
  // Function to get popular tags (based on usage frequency)
  export const getPopularTags = (limit = 10) => {
    const posts = getPublishedPosts();
    const tagCount = {};
    
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
  };
  
  // Function to get blog statistics
  export const getBlogStats = () => {
    const posts = getPublishedPosts();
    const globalAnalytics = getGlobalAnalytics();
    
    return {
      totalPosts: posts.length,
      totalDrafts: blogPosts.filter(post => post.status === 'draft').length,
      categories: getCategories().length - 1, // Exclude "All"
      tags: getAllTags().length,
      totalViews: globalAnalytics?.totalViews || 0,
      totalLikes: globalAnalytics?.totalLikes || 0,
      totalComments: globalAnalytics?.totalComments || 0,
      totalShares: globalAnalytics?.totalShares || 0,
      averageReadTime: calculateAverageReadTime(),
      lastUpdated: Math.max(...posts.map(post => new Date(post.publishDate).getTime()))
    };
  };
  
  // Function to calculate average read time
  export const calculateAverageReadTime = () => {
    const posts = getPublishedPosts();
    if (posts.length === 0) return 0;
    
    const totalReadTimeMs = posts.reduce((sum, post) => sum + (post.estimatedReadTimeMs || 0), 0);
    return Math.round(totalReadTimeMs / posts.length / 60000); // Convert to minutes
  };
  
  // Function to get posts with analytics data
  export const getPostsWithAnalytics = () => {
    const posts = getPublishedPosts();
    
    return posts.map(post => {
      const analytics = getPostAnalytics(post.id);
      return {
        ...post,
        analytics: analytics || {
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          averageReadTime: 0,
          engagementRate: 0
        }
      };
    });
  };
  
  // Function to get trending posts with real analytics
  export const getTrendingPostsWithData = (days = 7, limit = 5) => {
    const trendingPosts = getTrendingPosts(days);
    return trendingPosts.slice(0, limit).map(trendingPost => {
      const post = getBlogPostById(trendingPost.id);
      return {
        ...post,
        analytics: {
          views: trendingPost.views,
          recentViews: trendingPost.recentViews,
          engagementRate: trendingPost.engagementRate,
          trendScore: trendingPost.trendScore
        }
      };
    }).filter(Boolean); // Remove any null posts
  };
  
  // Function to track blog post interaction
  export const trackPostInteraction = (postId, interactionType, data = {}) => {
    const post = getBlogPostById(postId);
    if (!post) return;
    
    switch (interactionType) {
      case 'view':
        return trackPageView(postId, post.title);
      case 'like':
      case 'comment':
      case 'share':
        return trackEngagement(postId, interactionType, data.increment || 1);
      default:
        console.warn(`Unknown interaction type: ${interactionType}`);
    }
  };
  
  // Export configuration for easy access
  export const blogConfig = {
    postsPerPage: 6,
    featuredPostsLimit: 3,
    relatedPostsLimit: 3,
    popularTagsLimit: 10,
    trendingPostsDays: 7,
    enableAnalytics: true,
    enableComments: false, // Set to true when comment system is ready
    enableNewsletter: true,
    socialShareButtons: ['twitter', 'linkedin', 'facebook', 'copy'],
    readingProgressBar: true,
    estimatedReadingSpeed: 200 // words per minute
  };