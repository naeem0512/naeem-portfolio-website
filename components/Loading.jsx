// components/Loading.jsx - Create this component
"use client";

import { motion } from "framer-motion";

// Main loading component
export const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-white/60 mt-4">{message}</p>
      </motion.div>
    </div>
  );
};

// Skeleton loader for project cards
export const ProjectSkeleton = () => {
  return (
    <div className="bg-[#232329] rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/10"></div>
      <div className="p-6">
        <div className="h-6 bg-white/10 rounded mb-2"></div>
        <div className="h-4 bg-white/10 rounded mb-4 w-3/4"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-white/10 rounded w-16"></div>
          <div className="h-6 bg-white/10 rounded w-20"></div>
          <div className="h-6 bg-white/10 rounded w-14"></div>
        </div>
      </div>
    </div>
  );
};

// Stats skeleton loader
export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse">
          <div className="h-4 bg-white/10 rounded mb-2"></div>
          <div className="h-8 bg-white/10 rounded"></div>
        </div>
      ))}
    </div>
  );
};