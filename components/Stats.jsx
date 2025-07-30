"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FiAward, FiCode, FiGitBranch, FiTrendingUp } from "react-icons/fi";

const stats = [
  { 
    num: 1, 
    text: "First-Class Honours Degree",
    icon: FiAward,
    color: "text-yellow-400",
    description: "BSc Computer & Data Science"
  },
  { 
    num: 7, 
    text: "Major Projects Completed",
    icon: FiCode,
    color: "text-blue-400",
    description: "Full-stack & AI/ML projects"
  },
  { 
    num: 17, 
    text: "Professional Certifications",
    icon: FiTrendingUp,
    color: "text-green-400",
    description: "IBM, Pearson, HackerRank"
  },
  { 
    num: 500, 
    text: "GitHub Contributions",
    suffix: "+",
    icon: FiGitBranch,
    color: "text-purple-400",
    description: "Active development history"
  },
];

const Stats = () => {
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

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <motion.div 
          className="flex flex-wrap gap-6 max-w-[90vw] mx-auto xl:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((item, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="flex-1 min-w-[280px] group"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full
                         hover:bg-white/10 hover:border-accent/30 transition-all duration-300
                         hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex items-start gap-4">
                  <div className={`${item.color} p-3 rounded-xl bg-white/5 border border-white/10 
                                 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-2xl" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-baseline gap-1 mb-2">
                      <CountUp
                        end={item.num}
                        duration={3}
                        delay={0.5}
                        className="text-3xl xl:text-4xl font-bold text-white"
                      />
                      {item.suffix && (
                        <span className="text-2xl xl:text-3xl font-bold text-accent">
                          {item.suffix}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-1 leading-tight">
                      {item.text}
                    </h3>
                    
                    <p className="text-sm text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Subtle accent line */}
                <div className="mt-4 h-1 bg-gradient-to-r from-accent/20 via-accent/50 to-transparent rounded-full
                              group-hover:from-accent/40 group-hover:via-accent/70 transition-all duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional achievements row */}
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold text-accent">AI/ML</div>
              <div className="text-sm text-white/60">Specialization Focus</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold text-accent">Full-Stack</div>
              <div className="text-sm text-white/60">Development Expertise</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold text-accent">2025</div>
              <div className="text-sm text-white/60">Graduation Year</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold text-accent">Birmingham</div>
              <div className="text-sm text-white/60">City University</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;