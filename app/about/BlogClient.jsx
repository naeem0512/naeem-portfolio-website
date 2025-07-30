"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  Eye
} from "lucide-react";
import Link from "next/link";

// Blog data structure
const blogPost = {
  id: 1,
  title: "🎉 Finally! I Did It! I Got the First-Class Degree!!",
  subtitle: "From Curious Coder to Tech Explorer: How I Turned \"Wait, How Does This Work?\" Into Academic Success and a Tech Obsession",
  author: "Mohammed Naeem Ahmed",
  date: "July 2025",
  readTime: "8 min read",
  category: "Journey",
  tags: ["First Class", "University", "Coding Journey", "Birmingham City", "Computer Science"],
  coverImage: "/blog/journey-cover.jpg", // You can add this later
  excerpt: "From feeling completely lost in my first programming lecture to building AI systems that actually work... this journey has been absolutely wild.",
  views: 1247,
  likes: 89,
  comments: 23,
  content: [
    {
      type: "intro",
      title: "The Beginning",
      icon: Sparkles,
      content: "Okay, let me take a moment to breathe and celebrate because... I actually did it! 🎊 It all started with one simple (and slightly panicked) question: \"How do these apps even work?!\" Fast-forward through countless late nights, debugging marathons, and about a thousand Stack Overflow tabs later—and here I am: a First-Class Honours Computer & Data Science graduate!"
    },
    {
      type: "milestone",
      title: "🔥 The Spark: My Geek Awakening",
      icon: Lightbulb,
      timeline: "2022",
      content: "Starting uni at Birmingham City felt like jumping into the deep end without floaties. Code looked like alien hieroglyphics. Databases? Sounded like something you'd find in a sci-fi lab. But somewhere between the late-night debugging marathons and victory dances after solving a stubborn bug (yes, I celebrate alone in my room), I caught the bug—the good kind.",
      highlight: "One of the biggest \"this is why I love tech\" moments? Building a British Sign Language translator with my team. Real pressure. Real stakes. Real purpose. It wasn't just a grade—it was a project that could genuinely help people."
    },
    {
      type: "experience",
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
      type: "achievement",
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
      type: "project_spotlight",
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
};

// Interactive components
const ReadingProgress = ({ progress }) => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
    style={{ scaleX: progress / 100 }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: progress / 100 }}
  />
);

const FloatingActions = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setLiked(!liked)}
        className={`w-12 h-12 rounded-full backdrop-blur-lg border transition-all duration-300 flex items-center justify-center ${
          liked 
            ? 'bg-red-500/20 border-red-500/50 text-red-400' 
            : 'bg-white/10 border-white/20 text-white/60 hover:text-red-400'
        }`}
      >
        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setBookmarked(!bookmarked)}
        className={`w-12 h-12 rounded-full backdrop-blur-lg border transition-all duration-300 flex items-center justify-center ${
          bookmarked 
            ? 'bg-accent/20 border-accent/50 text-accent' 
            : 'bg-white/10 border-white/20 text-white/60 hover:text-accent'
        }`}
      >
        <BookOpen className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/60 hover:text-accent transition-all duration-300 flex items-center justify-center"
      >
        <Share2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

const SectionCard = ({ section, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = section.icon;

  return (
    <motion.article
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

const BlogClient = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-primary relative">
      <ReadingProgress progress={readingProgress} />
      <FloatingActions post={blogPost} />

      {/* Hero Section */}
      <section className="relative py-20 xl:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Category badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent font-medium mb-6"
            >
              {blogPost.category}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {blogPost.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/70 mb-8 leading-relaxed"
            >
              {blogPost.subtitle}
            </motion.p>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-white/60"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blogPost.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{blogPost.likes} likes</span>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-2 mt-8"
            >
              {blogPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm hover:bg-accent/20 hover:text-accent transition-colors cursor-pointer"
                >
                  #{tag.replace(' ', '')}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {blogPost.content.map((section, index) => (
              <SectionCard key={index} section={section} index={index} />
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogClient;