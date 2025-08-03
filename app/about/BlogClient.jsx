// app/about/BlogClient.jsx - UPDATED VERSION

"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  Clock, 
  Coffee, 
  Heart, 
  Share2, 
  BookOpen,
  Code2,
  Lightbulb,
  Rocket,
  Trophy,
  MapPin,
  GraduationCap,
  Sparkles,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  Eye,
  Menu,
  X,
  ArrowUp,
  Filter,
  Search,
  Tag,
  ChevronDown,
  Bookmark,
  ExternalLink,
  User,
  Star
} from "lucide-react";
import Link from "next/link";

// Enhanced blog data with multiple posts
const blogPosts = [
  {
    id: 1,
    title: "🎉 Finally! I Did It! I Got the First-Class Degree!!",
    subtitle: "From Curious Coder to Tech Explorer: My Journey to Academic Success",
    author: "Mohammed Naeem Ahmed",
    date: "July 2025",
    readTime: "8 min read",
    category: "Journey",
    tags: ["First Class", "University", "Coding Journey", "Birmingham City", "Computer Science"],
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
    excerpt: "From feeling completely lost in my first programming lecture to building AI systems that actually work... this journey has been absolutely wild.",
    views: 1247,
    likes: 89,
    comments: 23,
    featured: true,
    content: {
      sections: [
        {
          id: "intro",
          title: "The Beginning",
          icon: Sparkles,
          content: "Okay, let me take a moment to breathe and celebrate because... I actually did it! 🎊 It all started with one simple (and slightly panicked) question: \"How do these apps even work?!\" Fast-forward through countless late nights, debugging marathons, and about a thousand Stack Overflow tabs later—and here I am: a First-Class Honours Computer & Data Science graduate!"
        },
        {
          id: "spark",
          title: "🔥 The Spark: My Geek Awakening",
          icon: Lightbulb,
          timeline: "2022",
          content: "Starting uni at Birmingham City felt like jumping into the deep end without floaties. Code looked like alien hieroglyphics. Databases? Sounded like something you'd find in a sci-fi lab. But somewhere between the late-night debugging marathons and victory dances after solving a stubborn bug (yes, I celebrate alone in my room), I caught the bug—the good kind.",
          highlight: "One of the biggest \"this is why I love tech\" moments? Building a British Sign Language translator with my team. Real pressure. Real stakes. Real purpose. It wasn't just a grade—it was a project that could genuinely help people."
        },
        {
          id: "coding",
          title: "🛠️ Coding IRL: The Joy, the Chaos, the Ctrl+Z",
          icon: Code2,
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
          icon: Trophy,
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
          icon: Rocket,
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
    id: 2,
    title: "Building LiftSense: My AI-Powered Fatigue Detection System",
    subtitle: "How I achieved 97.94% accuracy in real-time fatigue monitoring",
    author: "Mohammed Naeem Ahmed",
    date: "June 2025",
    readTime: "12 min read",
    category: "AI/ML",
    tags: ["Machine Learning", "LSTM", "Python", "TensorFlow", "Healthcare Tech"],
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    excerpt: "Deep dive into the technical challenges and breakthroughs of creating an intelligent fatigue detection system using LSTM neural networks.",
    views: 892,
    likes: 67,
    comments: 15,
    featured: false
  },
  {
    id: 3,
    title: "From Beginner to Full-Stack: My React Journey",
    subtitle: "Learning React, Next.js, and building real-world applications",
    author: "Mohammed Naeem Ahmed", 
    date: "May 2025",
    readTime: "6 min read",
    category: "Web Development",
    tags: ["React", "Next.js", "JavaScript", "Full Stack", "Learning"],
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    excerpt: "My journey from struggling with JavaScript basics to building full-stack applications with React and Next.js.",
    views: 654,
    likes: 45,
    comments: 8,
    featured: false
  },
  {
    id: 4,
    title: "Why I Chose Computer Science (And Why You Should Too)",
    subtitle: "The field that's shaping our future and how to get started",
    author: "Mohammed Naeem Ahmed",
    date: "April 2025", 
    readTime: "5 min read",
    category: "Career Advice",
    tags: ["Computer Science", "Career", "University", "Advice", "Future"],
    coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
    excerpt: "Why computer science is more than just coding and how it opens doors to incredible opportunities.",
    views: 1156,
    likes: 78,
    comments: 12,
    featured: false
  }
];

// Enhanced Table of Contents Component
const TableOfContents = ({ sections, activeSection, onSectionClick, isOpen, onToggle }) => {
  return (
    <div className={`fixed left-8 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="md:hidden absolute -right-12 top-0 w-10 h-10 bg-accent rounded-r-lg flex items-center justify-center"
      >
        {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
      </button>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 w-64 max-h-96 overflow-y-auto">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-accent" />
          Contents
        </h3>
        
        <nav className="space-y-2">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                  isActive 
                    ? 'bg-accent/20 border-accent border text-accent font-medium' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{section.title}</div>
                  {section.timeline && (
                    <div className="text-xs text-accent/70">{section.timeline}</div>
                  )}
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// Enhanced Reading Progress Component
const ReadingProgress = ({ progress, sections, activeSection }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-sm border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent/80"
          style={{ scaleX: progress / 100 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
        />
      </div>
      
      {/* Current section indicator */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sm text-white/60">Reading:</div>
          <div className="text-sm font-medium text-white">
            {sections.find(s => s.id === activeSection)?.title || "Introduction"}
          </div>
        </div>
        <div className="text-sm text-accent font-medium">
          {Math.round(progress)}% complete
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Floating Actions
const FloatingActions = ({ post, liked, setLiked, bookmarked, setBookmarked }) => {
  const [showTooltip, setShowTooltip] = useState("");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        setShowTooltip("copied");
        setTimeout(() => setShowTooltip(""), 2000);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowTooltip("copied");
      setTimeout(() => setShowTooltip(""), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-40"
    >
      {/* Like button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          onMouseEnter={() => setShowTooltip("like")}
          onMouseLeave={() => setShowTooltip("")}
          className={`w-12 h-12 rounded-full backdrop-blur-lg border transition-all duration-300 flex items-center justify-center ${
            liked 
              ? 'bg-red-500/20 border-red-500/50 text-red-400' 
              : 'bg-white/10 border-white/20 text-white/60 hover:text-red-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
        </motion.button>
        {showTooltip === "like" && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {liked ? "Unlike" : "Like this post"}
          </div>
        )}
      </div>

      {/* Bookmark button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setBookmarked(!bookmarked)}
          onMouseEnter={() => setShowTooltip("bookmark")}
          onMouseLeave={() => setShowTooltip("")}
          className={`w-12 h-12 rounded-full backdrop-blur-lg border transition-all duration-300 flex items-center justify-center ${
            bookmarked 
              ? 'bg-accent/20 border-accent/50 text-accent' 
              : 'bg-white/10 border-white/20 text-white/60 hover:text-accent'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
        </motion.button>
        {showTooltip === "bookmark" && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {bookmarked ? "Remove bookmark" : "Bookmark this post"}
          </div>
        )}
      </div>

      {/* Share button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          onMouseEnter={() => setShowTooltip("share")}
          onMouseLeave={() => setShowTooltip("")}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/60 hover:text-accent transition-all duration-300 flex items-center justify-center"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
        {showTooltip === "share" && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {showTooltip === "copied" ? "Link copied!" : "Share this post"}
          </div>
        )}
      </div>

      {/* Back to top button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/60 hover:text-accent transition-all duration-300 flex items-center justify-center"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

// Full Post View Component
const FullPostView = ({ post, onBack }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(post?.content?.sections?.[0]?.id || "");
  const [tocOpen, setTocOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  const contentRef = useRef(null);

  // Check if post has full content structure
  const hasFullContent = post?.content?.sections && post.content.sections.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setReadingProgress(Math.min(progress, 100));

      // Update active section based on scroll position (only if has full content)
      if (hasFullContent) {
        const sections = post.content.sections;
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i].id);
          if (element && element.getBoundingClientRect().top <= 100) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post?.content?.sections, hasFullContent]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTocOpen(false);
  };

  return (
    <div className="min-h-screen bg-primary relative">
      {hasFullContent && (
        <>
          <ReadingProgress 
            progress={readingProgress} 
            sections={post.content.sections}
            activeSection={activeSection}
          />
          
          <TableOfContents
            sections={post.content.sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            isOpen={tocOpen}
            onToggle={() => setTocOpen(!tocOpen)}
          />
        </>
      )}
      
      <FloatingActions
        post={post}
        liked={liked}
        setLiked={setLiked}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
      />

      {/* Hero Section */}
      <section className="relative py-20 xl:py-32 overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back button */}
            <motion.button
              onClick={onBack}
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 font-medium"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Blog
            </motion.button>

            {/* Category and meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-white/60">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Title and subtitle */}
            <h1 className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {post.subtitle}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm hover:bg-accent/20 hover:text-accent transition-colors cursor-pointer"
                >
                  #{tag.replace(' ', '')}
                </span>
              ))}
            </div>

            {/* Author and stats */}
            <div className="flex items-center justify-between border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-white">{post.author}</div>
                  <div className="text-sm text-white/60">First-Class CS Graduate</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-white/60">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16" ref={contentRef}>
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto space-y-12 ${hasFullContent ? 'ml-0 md:ml-72' : ''}`}>
            {hasFullContent ? (
              // Render full content sections if available
              <>
                {post.content.sections.map((section, index) => (
                  <SectionCard key={section.id} section={section} index={index} />
                ))}

                {/* Closing section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center py-12 border-t border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">💬 TL;DR:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-white/80">
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span>
                      Started clueless.
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span>
                      Cried over bugs.
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span>
                      Got a First-Class degree.
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span>
                      Built cool stuff.
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span>
                      Still coding. Still learning.
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span>
                      Check out LiftSense. It's dope.
                    </div>
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg font-medium text-white mt-8"
                  >
                    Let's keep building, keep growing, and keep having fun doing it. The future? It's ours to code. 💥
                  </motion.p>
                </motion.div>
              </>
            ) : (
              // Render placeholder content for posts without full content
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
              >
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">🚧</div>
                  <h2 className="text-3xl font-bold text-white mb-4">Coming Soon!</h2>
                  <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                    This article is currently being written. I'm crafting something amazing about <strong>{post.title.replace(/[🎉💪🛠️🌟🔥]/g, '').trim()}</strong>.
                  </p>
                  
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-8">
                    <h3 className="text-accent font-semibold mb-3">What to expect:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        In-depth technical insights
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        Real-world examples
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        Step-by-step breakdowns
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        Practical takeaways
                      </div>
                    </div>
                  </div>

                  <p className="text-white/60 mb-6">
                    In the meantime, check out my other articles or explore my projects!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={onBack}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                      ← Back to Blog
                    </motion.button>
                    <Link href="/projects">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                      >
                        View Projects →
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Section Card Component for detailed post view
const SectionCard = ({ section, index }) => {
  const IconComponent = section.icon;

  return (
    <motion.article
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:border-accent/30 transition-all duration-500 overflow-hidden">
        
        {/* Timeline indicator */}
        {section.timeline && (
          <div className="absolute -left-4 top-8 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-sm">
            {section.timeline.slice(-2)}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
              {section.title}
            </h2>
            {section.timeline && (
              <span className="text-accent/70 text-sm font-medium">{section.timeline}</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-white/80 text-lg leading-relaxed">
            {section.content}
          </p>

          {/* Highlight box */}
          {section.highlight && (
            <div className="bg-accent/5 border-l-4 border-accent p-4 rounded-r-lg">
              <p className="text-white/90 italic">{section.highlight}</p>
            </div>
          )}

          {/* Code block */}
          {section.codeBlock && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-[#0d1117] rounded-lg border border-white/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-white/60 text-sm">{section.codeBlock.language}</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-white/90 font-mono">
                  {section.codeBlock.code}
                </code>
              </pre>
            </motion.div>
          )}

          {/* Achievements list */}
          {section.achievements && (
            <div className="space-y-3">
              <h4 className="text-white font-semibold mb-4">What's Next?</h4>
              {section.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <ChevronRight className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-white/80">{achievement}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Project stats */}
          {section.stats && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
              {Object.entries(section.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-accent font-bold text-lg">{value}</div>
                  <div className="text-white/60 text-sm capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}

          {/* Project link */}
          {section.projectLink && (
            <Link href={section.projectLink}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Check out LiftSense
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// Main Blog Component
const BlogClient = () => {
  const [view, setView] = useState("grid"); // "grid" or "post"
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories and tags
  const categories = ["All", ...new Set(blogPosts.map(post => post.category))];
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  const openPost = (post) => {
    setSelectedPost(post);
    setView("post");
    window.scrollTo(0, 0);
  };

  const closePost = () => {
    setView("grid");
    setSelectedPost(null);
  };

  // Featured post for hero section
  const featuredPost = blogPosts.find(post => post.featured);

  if (view === "post" && selectedPost) {
    return <FullPostView post={selectedPost} onBack={closePost} />;
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative py-20 xl:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl xl:text-6xl font-bold text-white mb-6">
              My <span className="text-accent">Blog</span> 📝
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              From coding adventures to career insights. Join me on my journey through tech, learning, and life as a first-class Computer Science graduate.
            </p>
            
            {/* Blog stats */}
            <div className="flex justify-center gap-8 mb-12">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-accent">{blogPosts.length}</div>
                <div className="text-white/60 text-sm">Articles</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-accent">
                  {blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                </div>
                <div className="text-white/60 text-sm">Total Views</div>  
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-accent">
                  {categories.length - 1}
                </div>
                <div className="text-white/60 text-sm">Categories</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto mb-16"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-accent" />
                Featured Post
              </h2>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-accent/30 overflow-hidden group cursor-pointer"
                   onClick={() => openPost(featuredPost)}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold">
                        {featuredPost.category}
                      </span>
                      <span className="text-white/80 text-sm">{featuredPost.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-white/80 text-lg">
                      {featuredPost.subtitle || featuredPost.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-accent" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-accent text-primary'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-accent" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    className={`px-3 py-1 rounded-md text-sm transition-all duration-300 ${
                      selectedTag === tag
                        ? 'bg-accent text-primary'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    #{tag.replace(' ', '')}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  All Articles ({blogPosts.filter(post => {
                    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
                    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
                    const matchesSearch = !searchQuery || 
                      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchesCategory && matchesTag && matchesSearch;
                  }).length})
                </h2>
                
                {(selectedCategory !== "All" || selectedTag || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedTag("");
                      setSearchQuery("");
                    }}
                    className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts
                  .filter(post => {
                    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
                    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
                    const matchesSearch = !searchQuery || 
                      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchesCategory && matchesTag && matchesSearch && !post.featured;
                  })
                  .map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-accent/30 transition-all duration-500 cursor-pointer"
                      onClick={() => openPost(post)}
                    >
                      {/* Cover image */}
                      <div className="relative overflow-hidden h-48">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-white/70 mb-4 leading-relaxed text-sm line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-md"
                            >
                              #{tag.replace(' ', '')}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex items-center gap-4 text-white/60 text-sm">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 text-accent text-sm font-medium">
                            Read More
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
              </div>
            </motion.div>

            {/* No results message */}
            {blogPosts.filter(post => {
              const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
              const matchesTag = !selectedTag || post.tags.includes(selectedTag);
              const matchesSearch = !searchQuery || 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
              return matchesCategory && matchesTag && matchesSearch && !post.featured;
            }).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your search terms or clearing the filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedTag("");
                    setSearchQuery("");
                  }}
                  className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter signup section */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Updated! 📬
              </h3>
              <p className="text-white/70 mb-6 text-lg">
                Get notified when I publish new articles about coding, career tips, and tech insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:bg-white/20 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-white/50 text-sm mt-3">
                No spam, unsubscribe anytime. I respect your privacy! 🔒
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogClient;