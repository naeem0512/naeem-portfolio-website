"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { 
  Heart, 
  MapPin, 
  Coffee, 
  Lightbulb, 
  Rocket, 
  Star, 
  Zap, 
  MessageCircle, 
  Send, 
  Sparkles, 
  Code, 
  Brain,
  Linkedin,
  LogOut,
  UserCheck,
  Clock,
  Building,
  Smile,
  PartyPopper
} from "lucide-react";
import Image from "next/image";

// Emoji reactions
const REACTIONS = ['👋', '🚀', '💡', '🔥', '⚡', '🎯', '💪', '🌟', '🎉', '☕', '🧠', '💻', '✨', '🎨', '🤩', '😎'];

// Message types with fun descriptions
const MESSAGE_TYPES = {
  compliment: { 
    color: 'from-pink-500/20 to-purple-500/20', 
    icon: Heart, 
    border: 'border-pink-500/30',
    label: '💖 Leave a compliment'
  },
  question: { 
    color: 'from-blue-500/20 to-cyan-500/20', 
    icon: Lightbulb, 
    border: 'border-blue-500/30',
    label: '💡 Ask a question'
  },
  collaboration: { 
    color: 'from-green-500/20 to-emerald-500/20', 
    icon: Rocket, 
    border: 'border-green-500/30',
    label: '🚀 Collaboration idea'
  },
  general: { 
    color: 'from-yellow-500/20 to-orange-500/20', 
    icon: MessageCircle, 
    border: 'border-yellow-500/30',
    label: '💬 Just saying hi'
  },
  technical: { 
    color: 'from-purple-500/20 to-indigo-500/20', 
    icon: Code, 
    border: 'border-purple-500/30',
    label: '💻 Tech talk'
  },
  inspiration: { 
    color: 'from-emerald-500/20 to-teal-500/20', 
    icon: Brain, 
    border: 'border-emerald-500/30',
    label: '🧠 Share inspiration'
  }
};

// Enhanced mock data with more fun messages
const mockWallMessages = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=100&h=100&fit=crop&crop=face",
      headline: "Senior AI Engineer at Google",
      location: "London, UK",
      company: "Google",
      verified: true
    },
    message: "Your LiftSense project blew my mind! 97.94% accuracy is incredible. As a fellow AI enthusiast, I'm genuinely impressed. Keep pushing boundaries! 🤯",
    reaction: "🧠",
    type: "technical",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    likes: 23
  },
  {
    id: 2,
    user: {
      name: "Marcus Rodriguez",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      headline: "Full Stack Developer at Spotify",
      location: "Barcelona, Spain",
      company: "Spotify",
      verified: true
    },
    message: "First-class degree well deserved! 🎓 Your portfolio is fire and shows real passion. Would love to jam on some code together sometime!",
    reaction: "🔥",
    type: "collaboration",
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    likes: 18
  },
  {
    id: 3,
    user: {
      name: "Emma Watson",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      headline: "Product Manager at Microsoft",
      location: "New York, USA",
      company: "Microsoft",
      verified: true
    },
    message: "Your sign language detection project really touched my heart! 💝 Tech that makes a difference is the best kind of tech. You're inspiring!",
    reaction: "💡",
    type: "inspiration",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    likes: 31
  },
  {
    id: 4,
    user: {
      name: "Ahmed Hassan",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      headline: "UX Designer at Airbnb",
      location: "Dubai, UAE",
      company: "Airbnb",
      verified: true
    },
    message: "Clean portfolio design! Love the color scheme and animations. Can you share what inspired your design choices? 🎨",
    reaction: "🎯",
    type: "question",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    likes: 12
  },
  {
    id: 5,
    user: {
      name: "Sofia Andersson",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      headline: "Data Scientist at Netflix",
      location: "Stockholm, Sweden",
      company: "Netflix",
      verified: true
    },
    message: "Birmingham City University alumna here! 🏫 So proud to see what you've accomplished. The future is bright! Keep coding and keep dreaming! ✨",
    reaction: "🎉",
    type: "compliment",
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    likes: 27
  },
  {
    id: 6,
    user: {
      name: "Carlos Martinez",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      headline: "DevOps Engineer at Tesla",
      location: "Austin, TX",
      company: "Tesla",
      verified: true
    },
    message: "Dude, your pathfinding visualizer is sick! 🤩 I spent like 20 minutes just playing with it. Great way to make algorithms fun!",
    reaction: "🚀",
    type: "general",
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    likes: 15
  }
];

// LinkedIn Sign In Component with Fun Vibe
const LinkedInSignIn = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <div className="max-w-md mx-auto">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg"
      >
        <Linkedin className="w-10 h-10 text-white" />
      </motion.div>
      
      <h3 className="text-3xl font-bold text-white mb-4">Join the Fun! 🎉</h3>
      <p className="text-white/70 mb-8 leading-relaxed">
        Sign in with LinkedIn to leave your mark on this digital wall! 
        Your professional profile adds authenticity, but the vibes are pure fun! ✨
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => signIn('linkedin')}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Linkedin className="w-5 h-5" />
        Continue with LinkedIn
      </motion.button>
      
      <p className="text-white/50 text-sm mt-6">
        🔒 We only access your basic profile info • No spam, just good vibes!
      </p>
    </div>
  </motion.div>
);

// Enhanced Message Card with More Fun
const FloatingMessage = ({ message, index, onHover, onLike }) => {
  const messageType = MESSAGE_TYPES[message.type] || MESSAGE_TYPES.general;
  const Icon = messageType.icon;
  
  const getTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: Math.random() * 8 - 4,
        x: Math.sin(index * 0.5) * 25,
        y: Math.cos(index * 0.7) * 20
      }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 80
      }}
      whileHover={{ 
        scale: 1.08, 
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => onHover(message)}
      onHoverEnd={() => onHover(null)}
      className={`
        relative p-6 rounded-2xl cursor-pointer
        bg-gradient-to-br ${messageType.color}
        border ${messageType.border}
        backdrop-blur-sm
        shadow-lg hover:shadow-2xl hover:shadow-accent/20
        max-w-[320px]
        transition-all duration-300
      `}
      style={{
        position: 'absolute',
        left: `${(index * 15 + Math.random() * 25) % 75}%`,
        top: `${(index * 20 + Math.random() * 25) % 65}%`,
      }}
    >
      {/* Fun floating sparkles */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute -top-2 -right-2"
      >
        <Sparkles className="w-5 h-5 text-accent" />
      </motion.div>

      {/* LinkedIn verification badge */}
      {message.user.verified && (
        <div className="absolute -top-1 -left-1">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
            <UserCheck className="w-3 h-3 text-white" />
          </div>
        </div>
      )}

      {/* User Profile Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative">
          <Image
            src={message.user.image}
            alt={message.user.name}
            width={50}
            height={50}
            className="rounded-full border-2 border-white/30 shadow-md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm truncate">{message.user.name}</h4>
          <p className="text-white/80 text-xs truncate">{message.user.headline}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-white/60" />
            <span className="text-white/60 text-xs">{message.user.location}</span>
          </div>
        </div>
        
        <motion.span 
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {message.reaction}
        </motion.span>
      </div>

      {/* Message Content */}
      <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-4">
        {message.message}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-white/60">
          <Clock className="w-3 h-3" />
          <span>{getTimeAgo(message.timestamp)}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(message.id)}
          className="flex items-center gap-1 text-white/70 hover:text-red-400 transition-colors"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span className="font-semibold">{message.likes}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Add Message Form
const AddMessageForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    message: '',
    reaction: '👋',
    type: 'general'
  });

  const handleSubmit = () => {
    if (formData.message.trim()) {
      onSubmit({
        ...formData,
        user: {
          name: user.name,
          image: user.image,
          headline: user.linkedin?.headline || 'Professional',
          location: user.linkedin?.location || 'Global',
          company: user.linkedin?.industry || 'Tech',
          verified: true
        }
      });
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-gradient-to-br from-[#232329] to-[#1a1a1f] rounded-2xl p-8 w-full max-w-lg border border-accent/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fun Header */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PartyPopper className="w-12 h-12 text-accent mx-auto mb-3" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">Leave Your Mark! ✨</h3>
          <p className="text-white/60">What do you want to share with the world?</p>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold text-white">{user.name}</div>
            <div className="text-white/70 text-sm">{user.linkedin?.headline || 'Professional'}</div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Message Type */}
          <div>
            <label className="text-white/80 font-medium mb-3 block">What's your vibe?</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(MESSAGE_TYPES).map(([key, type]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData({...formData, type: key})}
                  className={`p-3 rounded-lg text-sm transition-all ${
                    formData.type === key 
                      ? 'bg-accent/20 border-accent border-2 text-accent font-semibold' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white/80'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-white/80 font-medium mb-3 block">Your message</label>
            <textarea
              placeholder="Share your thoughts, drop some wisdom, or just say hi! ✨"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-white/20 rounded-xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              rows="4"
              maxLength={280}
            />
            <div className="text-right text-xs text-white/50 mt-2">
              {formData.message.length}/280
            </div>
          </div>

          {/* Reaction Picker */}
          <div>
            <label className="text-white/80 font-medium mb-3 block">Pick your emoji</label>
            <div className="flex gap-2 flex-wrap">
              {REACTIONS.map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFormData({...formData, reaction: emoji})}
                  className={`text-2xl p-3 rounded-xl transition-all ${
                    formData.reaction === emoji 
                      ? 'bg-accent/20 border-accent border-2 scale-110' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors font-medium"
            >
              Maybe Later
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleSubmit}
              disabled={!formData.message.trim()}
              className="flex-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 disabled:from-accent/50 disabled:to-accent/30 text-primary py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Add to Wall!
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
const LinkedInGuestbook = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState(mockWallMessages);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalMessages: mockWallMessages.length,
    professionals: 6,
    countries: 8
  });

  const handleAddMessage = (newMessage) => {
    const message = {
      ...newMessage,
      id: messages.length + 1,
      timestamp: Date.now(),
      likes: Math.floor(Math.random() * 5) + 1
    };
    setMessages([message, ...messages]);
    setStats({
      totalMessages: stats.totalMessages + 1,
      professionals: stats.professionals + 1,
      countries: stats.countries
    });
  };

  const handleLike = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ));
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto mb-4"
          />
          <p className="text-white/60">Loading the magic...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-12 xl:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4">
            The <span className="text-accent">Digital Wall</span> 🎨
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            A living, breathing canvas where professionals leave their mark! 
            Each message becomes part of an ever-evolving digital art piece powered by LinkedIn! ✨
          </p>
          
          {/* Fun Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-accent">{stats.totalMessages}</div>
              <div className="text-white/60 text-sm">Messages</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-accent">{stats.professionals}</div>
              <div className="text-white/60 text-sm">Professionals</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-accent">{stats.countries}</div>
              <div className="text-white/60 text-sm">Countries</div>
            </motion.div>
          </div>

          {/* Auth Section */}
          {session ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full px-6 py-3 border border-white/20">
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-white font-medium">Hey, {session.user.name}!</span>
                <Smile className="w-4 h-4 text-accent" />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-primary px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:shadow-lg hover:shadow-accent/25 flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Add Your Magic
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-full transition-all duration-300 border border-white/20"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          ) : (
            <LinkedInSignIn />
          )}
        </motion.div>

        {/* Interactive Wall */}
        {session && (
          <div className="relative h-[700px] bg-gradient-to-br from-[#1a1a1a] via-[#232329] to-[#1a1a1f] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div 
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full" 
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #00ff99 2px, transparent 2px),
                                   radial-gradient(circle at 75% 75%, #00ff99 1px, transparent 1px)`,
                  backgroundSize: '60px 60px'
                }} 
              />
            </div>

            {/* Messages */}
            <AnimatePresence>
              {messages.map((message, index) => (
                <FloatingMessage
                  key={message.id}
                  message={message}
                  index={index}
                  onHover={setHoveredMessage}
                  onLike={handleLike}
                />
              ))}
            </AnimatePresence>

            {/* Fun Instructions */}
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-white/50 text-sm"
              >
                ✨ Hover over messages to explore • Click hearts to spread love • Add your own magic! ✨
              </motion.p>
            </div>
          </div>
        )}

        {/* Add Message Form */}
        <AnimatePresence>
          {showForm && session && (
            <AddMessageForm
              user={session.user}
              onSubmit={handleAddMessage}
              onClose={() => setShowForm(false)}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-2xl border border-accent/20"
        >
          <h3 className="text-xl font-bold text-white mb-3">🎨 Welcome to the Digital Art Gallery!</h3>
          <p className="text-white/70 mb-2">
            Each message adds color, personality, and life to this living canvas
          </p>
          <p className="text-white/50 text-sm">
            Powered by LinkedIn for authenticity • Designed for pure creative fun! ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LinkedInGuestbook;