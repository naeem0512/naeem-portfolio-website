
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, MapPin, Coffee, Lightbulb, Rocket, Star, Zap, MessageCircle, Send, Sparkles, Code, Brain } from "lucide-react";

// Emoji reactions people can choose from
const REACTIONS = ['👋', '🚀', '💡', '🔥', '⚡', '🎯', '💪', '🌟', '🎉', '☕', '🧠', '💻'];

// Fun message types with different styles
const MESSAGE_TYPES = {
  compliment: { color: 'from-pink-500/20 to-purple-500/20', icon: Heart, border: 'border-pink-500/30' },
  question: { color: 'from-blue-500/20 to-cyan-500/20', icon: Lightbulb, border: 'border-blue-500/30' },
  collaboration: { color: 'from-green-500/20 to-emerald-500/20', icon: Rocket, border: 'border-green-500/30' },
  general: { color: 'from-yellow-500/20 to-orange-500/20', icon: MessageCircle, border: 'border-yellow-500/30' },
  technical: { color: 'from-purple-500/20 to-indigo-500/20', icon: Code, border: 'border-purple-500/30' },
  inspiration: { color: 'from-emerald-500/20 to-teal-500/20', icon: Brain, border: 'border-emerald-500/30' }
};

// Mock data with variety
const mockWallMessages = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "London, UK",
    message: "Your LiftSense project blew my mind! 97.94% accuracy is incredible. As a fellow AI enthusiast, I'm genuinely impressed.",
    reaction: "🧠",
    type: "technical",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    color: "#8B5CF6"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    location: "Barcelona, Spain", 
    message: "First-class degree well deserved! 🎓 Would love to collaborate on an ML project sometime.",
    reaction: "🚀",
    type: "collaboration",
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    color: "#10B981"
  },
  {
    id: 3,
    name: "Emma Watson",
    location: "New York, USA",
    message: "Your sign language detection project really touched my heart. Tech that makes a difference is the best kind of tech! ✨",
    reaction: "💡",
    type: "inspiration",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    color: "#F59E0B"
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    message: "Clean portfolio design! Can you share what inspired your color scheme choice?",
    reaction: "🎯",
    type: "question",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    color: "#3B82F6"
  },
  {
    id: 5,
    name: "Sofia Andersson",
    location: "Stockholm, Sweden",
    message: "Birmingham City University alumna here! So proud to see what you've accomplished. The future is bright! 🌟",
    reaction: "🎉",
    type: "compliment",
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    color: "#EF4444"
  }
];

const FloatingMessage = ({ message, index, onHover }) => {
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
        rotate: Math.random() * 6 - 3,
        x: Math.sin(index * 0.5) * 20,
        y: Math.cos(index * 0.7) * 15
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => onHover(message)}
      onHoverEnd={() => onHover(null)}
      className={`
        relative p-4 rounded-xl cursor-pointer
        bg-gradient-to-br ${messageType.color}
        border ${messageType.border}
        backdrop-blur-sm
        shadow-lg hover:shadow-xl
        max-w-[280px]
        transition-all duration-300
      `}
      style={{
        position: 'absolute',
        left: `${(index * 17 + Math.random() * 20) % 80}%`,
        top: `${(index * 23 + Math.random() * 20) % 70}%`,
      }}
    >
      {/* Sparkle effect */}
      <div className="absolute -top-1 -right-1">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-4 h-4 text-accent" />
        </motion.div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-white" />
          <span className="text-white font-semibold text-sm">{message.name}</span>
        </div>
        <span className="text-2xl">{message.reaction}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 mb-2">
        <MapPin className="w-3 h-3 text-white/60" />
        <span className="text-white/60 text-xs">{message.location}</span>
      </div>

      {/* Message */}
      <p className="text-white/90 text-sm leading-relaxed mb-2 line-clamp-3">
        {message.message}
      </p>

      {/* Time */}
      <div className="text-white/50 text-xs">
        {getTimeAgo(message.timestamp)}
      </div>
    </motion.div>
  );
};

const MessagePreview = ({ message }) => {
  if (!message) return null;

  const messageType = MESSAGE_TYPES[message.type] || MESSAGE_TYPES.general;
  const Icon = messageType.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-8 right-8 bg-[#232329] border border-accent/30 rounded-xl p-4 max-w-sm shadow-2xl z-50"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-accent" />
        <span className="text-white font-semibold">{message.name}</span>
        <span className="text-xl">{message.reaction}</span>
      </div>
      <div className="flex items-center gap-1 mb-2">
        <MapPin className="w-3 h-3 text-white/60" />
        <span className="text-white/60 text-sm">{message.location}</span>
      </div>
      <p className="text-white/80 text-sm">{message.message}</p>
    </motion.div>
  );
};

const AddMessageForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    message: '',
    reaction: '👋',
    type: 'general'
  });

  const handleSubmit = () => {
    if (formData.name && formData.message) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#232329] rounded-xl p-6 w-full max-w-md border border-accent/30"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-white mb-4">Leave Your Mark! ✨</h3>
        
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Your location (optional)"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-colors"
            >
              <option value="general">💬 General message</option>
              <option value="compliment">💖 Compliment</option>
              <option value="question">💡 Question</option>
              <option value="collaboration">🚀 Collaboration idea</option>
              <option value="technical">💻 Technical discussion</option>
              <option value="inspiration">🧠 Inspiration</option>
            </select>
          </div>

          <div>
            <textarea
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg p-3 text-white placeholder-white/40 resize-none focus:outline-none focus:border-accent transition-colors"
              rows="4"
              required
            />
          </div>

          <div>
            <p className="text-white/60 text-sm mb-2">Pick your reaction:</p>
            <div className="flex gap-2 flex-wrap">
              {REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({...formData, reaction: emoji})}
                  className={`text-2xl p-2 rounded-lg transition-all ${
                    formData.reaction === emoji 
                      ? 'bg-accent/20 border-accent border-2' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-accent hover:bg-accent/90 text-black py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Add to Wall
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InteractiveWall = () => {
  const [messages, setMessages] = useState(mockWallMessages);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalMessages: mockWallMessages.length,
    countries: 5,
    reactions: 12
  });

  const handleAddMessage = (newMessage) => {
    const message = {
      ...newMessage,
      id: messages.length + 1,
      timestamp: Date.now(),
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    setMessages([message, ...messages]);
    setStats({
      ...stats,
      totalMessages: stats.totalMessages + 1
    });
  };

  return (
    <section className="min-h-screen py-12 xl:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
            The <span className="text-accent">Digital Wall</span> 🎨
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            A living, breathing space where visitors leave their mark. Each message becomes part of an ever-evolving digital art piece!
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.totalMessages}</div>
              <div className="text-white/60 text-sm">Messages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.countries}</div>
              <div className="text-white/60 text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.reactions}</div>
              <div className="text-white/60 text-sm">Reactions</div>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-accent hover:bg-accent/90 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5" />
            Add Your Message
          </button>
        </motion.div>

        {/* Interactive Wall */}
        <div className="relative h-[600px] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #00ff99 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #00ff99 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Messages */}
          {messages.map((message, index) => (
            <FloatingMessage
              key={message.id}
              message={message}
              index={index}
              onHover={setHoveredMessage}
            />
          ))}

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-white/40 text-sm">
              ✨ Hover over messages to read them • Messages appear randomly across the wall
            </p>
          </div>
        </div>

        {/* Message Preview */}
        <AnimatePresence>
          {hoveredMessage && (
            <MessagePreview message={hoveredMessage} />
          )}
        </AnimatePresence>

        {/* Add Message Form */}
        <AnimatePresence>
          {showForm && (
            <AddMessageForm
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
          className="text-center mt-16 p-6 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20"
        >
          <p className="text-white/80 mb-2">
            🎨 Each message adds to the living artwork of this digital space
          </p>
          <p className="text-white/60 text-sm">
            Messages are randomly positioned and styled to create a unique visual experience every time you visit
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveWall;