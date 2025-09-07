"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { 
  MessageSquare, Send, User, Calendar, MapPin, Heart, 
  Coffee, Code, Lightbulb, Rocket, Star, X, Check,
  ThumbsUp, MessageCircle, Share2, Clock, Building,
  Linkedin, Loader2
} from "lucide-react";

// Simple message categories
const MESSAGE_TYPES = [
  { id: 'hello', label: 'Say Hi! 👋', description: 'Just dropping by to say hello' },
  { id: 'feedback', label: 'Thoughts 💭', description: 'Share your thoughts on my work' },
  { id: 'question', label: 'Question 🤔', description: 'Got something to ask?' },
  { id: 'collab', label: 'Let\'s Work! 🤝', description: 'Collaboration or project ideas' },
  { id: 'random', label: 'Random 🎲', description: 'Whatever\'s on your mind' }
];

// Simple toast notifications
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-6 right-6 z-50 bg-accent text-primary px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
    >
      <Check className="w-4 h-4" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Message card component
const MessageCard = ({ message, index, onLike, currentUserId }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // Check if current user has liked this message
  useEffect(() => {
    if (currentUserId && message.likedBy) {
      setHasLiked(message.likedBy.includes(currentUserId));
    }
  }, [currentUserId, message.likedBy]);

  const formatTime = (timestamp) => {
    const now = Date.now();
    const messageTime = new Date(timestamp).getTime();
    const diff = now - messageTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleLike = async () => {
    if (isLiking || !currentUserId) return;
    
    setIsLiking(true);
    try {
      await onLike(message.id, !hasLiked);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error('Error liking message:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const messageType = MESSAGE_TYPES.find(type => type.id === message.type) || MESSAGE_TYPES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 ${
        message.isOwner ? 'ring-1 ring-accent/30' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={message.image || '/default-avatar.png'}
          alt={message.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">{message.name}</h3>
            {message.isOwner && (
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full border border-accent/30">
                Owner
              </span>
            )}
          </div>
          
          <p className="text-white/70 text-sm">{message.title || 'Visitor'}</p>
          
          <div className="flex items-center gap-4 mt-1 text-xs text-white/50">
            {message.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {message.location}
              </div>
            )}
            {message.company && (
              <div className="flex items-center gap-1">
                <Building className="w-3 h-3" />
                {message.company}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(message.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-white/90 mb-4 leading-relaxed">{message.content}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full">
          {messageType.label}
        </span>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            disabled={isLiking || !currentUserId}
            className={`flex items-center gap-1 text-sm transition-colors ${
              hasLiked ? 'text-red-400' : 'text-white/60 hover:text-red-400'
            } ${!currentUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLiking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            )}
            <span>{message.likes || 0}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Compose form
const ComposeForm = ({ user, onSubmit, onClose }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('hello');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        content: content.trim(),
        type,
        name: user.name,
        title: user.linkedin?.headline || 'Visitor',
        image: user.image,
        location: user.linkedin?.location,
        company: user.linkedin?.company,
        email: user.email,
        isOwner: user.email === 'naeemahmed7860@gmail.com' // Your email
      });
      onClose();
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-[#1a1a1a] border border-white/20 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Leave a message</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 rounded-lg">
          <img
            src={user.image || '/default-avatar.png'}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-white/60 text-sm">{user.linkedin?.headline || 'Visitor'}</p>
          </div>
        </div>

        {/* Message type */}
        <div className="mb-4">
          <label className="block text-white/80 font-medium mb-3">What's this about?</label>
          <div className="grid grid-cols-1 gap-2">
            {MESSAGE_TYPES.map((messageType) => (
              <button
                key={messageType.id}
                onClick={() => setType(messageType.id)}
                className={`text-left p-3 rounded-lg transition-all ${
                  type === messageType.id 
                    ? 'bg-accent/20 border-accent border text-accent' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/80'
                }`}
              >
                <div className="font-medium text-sm">{messageType.label}</div>
                <div className="text-xs opacity-80">{messageType.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Message content */}
        <div className="mb-6">
          <label className="block text-white/80 font-medium mb-3">Your message</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Don't be shy! 😊"
            className="w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 resize-none focus:outline-none focus:border-accent/50 transition-all"
            maxLength={500}
          />
          <div className="text-right text-xs text-white/40 mt-2">
            {content.length}/500
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className="flex-1 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-primary py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post Message
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main guestbook component
const CasualGuestbook = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guestbook/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMessage = async (messageData) => {
    try {
      const response = await fetch('/api/guestbook/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages(prev => [newMessage, ...prev]);
        setToast("Thanks for leaving a message! 🎉");
      } else {
        throw new Error('Failed to post message');
      }
    } catch (error) {
      console.error('Error posting message:', error);
      setToast("Something went wrong. Please try again!");
    }
  };

  const handleLike = async (messageId, isLiking) => {
    try {
      const response = await fetch(`/api/guestbook/messages/${messageId}/like`, {
        method: isLiking ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? updatedMessage : msg
        ));
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-white/60">Loading guestbook...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
            Guest<span className="text-accent">book</span> 📝
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Drop me a line! Whether it's feedback, questions, collaboration ideas, or just saying hi - I'd love to hear from you.
          </p>
        </motion.div>

        {/* Auth state */}
        {session ? (
          <div className="max-w-3xl mx-auto">
            {/* User header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={session.user.image || '/default-avatar.png'}
                    alt={session.user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h3 className="font-semibold text-white">Hey {session.user.name}! 👋</h3>
                    <p className="text-white/60 text-sm">
                      {session.user.linkedin?.headline || 'Visitor'} 
                      {session.user.linkedin?.location && ` • ${session.user.linkedin.location}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCompose(true)}
                    className="bg-accent text-primary px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Write Message
                  </motion.button>
                  
                  <button
                    onClick={() => signOut()}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="space-y-6">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white/5 rounded-xl"
                >
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                  <p className="text-white/60">Be the first to leave a message!</p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <MessageCard 
                      key={message.id} 
                      message={message} 
                      index={index}
                      onLike={handleLike}
                      currentUserId={session.user.id}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-6xl mb-4">👋</div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Join the conversation!</h2>
                <p className="text-white/70 mb-6">
                  Sign in with LinkedIn to leave a message and connect with me. It's quick and easy!
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signIn('linkedin')}
                className="bg-[#0077B5] hover:bg-[#005885] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg flex items-center gap-3 mx-auto"
              >
                <Linkedin className="w-5 h-5" />
                Continue with LinkedIn
              </motion.button>
              
              <p className="text-white/50 text-sm">
                🔒 We only access your basic profile info
              </p>
            </motion.div>
          </div>
        )}

        {/* Compose modal */}
        <AnimatePresence>
          {showCompose && session && (
            <ComposeForm
              user={session.user}
              onSubmit={handleAddMessage}
              onClose={() => setShowCompose(false)}
            />
          )}
        </AnimatePresence>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <Toast
              message={toast}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>

        {/* Simple footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-white/50 text-sm"
        >
          <p>Thanks for stopping by! 😊</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CasualGuestbook;