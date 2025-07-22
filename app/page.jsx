"use client";

import { Button } from "@/components/ui/button";
import { FiDownload, FiArrowRight, FiCode, FiGitlab } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import Link from "next/link";

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="h-full relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 z-0" />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-96 h-96 bg-accent/3 rounded-full blur-3xl z-0"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto h-full relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 min-h-screen xl:min-h-0">
          
          {/* Enhanced text section */}
          <div className="text-center xl:text-left order-2 xl:order-none max-w-2xl">
            
            {/* Status badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for opportunities
            </motion.div>
            
            {/* Improved subtitle with first-class degree */}
            <motion.span 
              variants={itemVariants}
              className="text-xl text-white/70 block mb-4"
            >
              First-Class Computer & Data Science Graduate
            </motion.span>
            
            {/* Enhanced main title with gradient text */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Naeem
              </span>
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="inline-block origin-bottom"
              >
                👋
              </motion.span>
            </motion.h1>
            
            {/* Improved description with typing effect */}
            <motion.div
              variants={itemVariants}
              className="max-w-[600px] mb-8 xl:mb-10"
            >
              <p className="text-lg xl:text-xl text-white/80 leading-relaxed mb-4">
                First-class graduate with a passion for crafting{" "}
                <span className="text-accent font-semibold">innovative digital experiences</span>{" "}
                and solving complex problems through clean, efficient code.
              </p>
              <p className="text-base text-white/60">
                Specializing in full-stack development, AI/ML integration, and turning ambitious ideas into impactful solutions.
              </p>
            </motion.div>

            {/* Skills badges */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-2 mb-8 justify-center xl:justify-start"
            >
              {["React", "Next.js", "Python", "AI/ML", "Node.js"].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:border-accent/30 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Enhanced buttons section */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-6 mb-10"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary CTA Button */}
                <Link href="/projects">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 group-hover:shadow-xl"
                    >
                      <span className="flex items-center gap-2">
                        View My Work
                        <FiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
                
                {/* Secondary Button */}
                <Link href="/Mohammed Naeem Ahmed CV copy.docx" passHref> 
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-accent/30 text-white hover:bg-accent/10 hover:border-accent/60 font-semibold px-8 py-4 text-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-2">
                        Download CV
                        <FiDownload className="text-xl transition-transform group-hover:translate-y-1" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Enhanced social links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center xl:justify-start gap-8"
            >
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>Connect with me</span>
                <div className="w-12 h-px bg-gradient-to-r from-accent/50 to-transparent"></div>
              </div>
              <Social
                containerStyles="flex gap-4"
                iconStyles="w-10 h-10 border border-accent/20 rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:border-accent hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              />
            </motion.div>
          </div>
          
          {/* Enhanced photo section with better positioning */}
          <motion.div 
            variants={itemVariants}
            className="order-1 xl:order-none mb-8 xl:mb-0 relative flex items-center justify-center xl:justify-end w-full xl:w-auto"
          >
            {/* Floating decorative elements */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute -top-6 -left-6 w-12 h-12 bg-accent/20 rounded-full blur-sm z-0"
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "2s" }}
              className="absolute -bottom-4 -right-4 w-8 h-8 bg-accent/30 rounded-full blur-sm z-0"
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "4s" }}
              className="absolute top-1/2 -right-8 w-6 h-6 bg-accent/25 rounded-full blur-sm z-0"
            />
            
            {/* Code floating icons */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 right-8 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-accent/20 z-10"
            >
              <FiCode className="text-accent text-xl" />
            </motion.div>

            <motion.div
              animate={{
                y: [5, -5, 5],
                rotate: [0, -15, 0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-6 left-4 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-accent/20 z-10"
            >
              <FiGitlab className="text-accent text-xl" />
            </motion.div>
            
            <div className="relative z-20 flex items-center justify-center">
              <Photo />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced Stats section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ y }}
        className="relative z-10"
      >
        <Stats />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center text-white/40 text-sm"
        >
          <span className="mb-2">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"></div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;