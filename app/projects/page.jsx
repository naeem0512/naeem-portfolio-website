"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Github, ExternalLink, FileText } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "LiftSense - Smart Fatigue Detection",
    category: "AI/ML",
    tags: ["Python", "TensorFlow", "LSTM", "AI"],
    description: "Intelligent fatigue detection system with 97.94% accuracy using LSTM neural networks.",
    image: "/api/placeholder/400/250",
    featured: true,
    github: "https://github.com/naeem0512/liftsense-2.0",
    live: "/liftsense-demo.mp4",
    dissertation: "/A3 Dissertation -22161297.pdf"
  },
  {
    id: 2,
    title: "Finance Dashboard App",
    category: "Full-Stack",
    tags: ["React", "Node.js", "MongoDB", "ML"],
    description: "Financial insights dashboard with ML-powered predictions and real-time analytics.",
    image: "/api/placeholder/400/250",
    github: "https://github.com/naeem0512/finance-app",
    live: "https://finance-app-demo.vercel.app"
  },
  {
    id: 3,
    title: "Pathfinding Visualizer",
    category: "Frontend",
    tags: ["React", "TypeScript", "Algorithms"],
    description: "Interactive visualization of pathfinding algorithms like Dijkstra and A*.",
    image: "/api/placeholder/400/250",
    github: "https://github.com/naeem0512/pathfinding-visualiser",
    live: "https://pathfinding-visualiser-kappa.vercel.app/"
  },
  {
    id: 4,
    title: "Sign Language Detection",
    category: "AI/ML",
    tags: ["Python", "TensorFlow", "Computer Vision"],
    description: "ML system for detecting and translating British Sign Language in real-time.",
    image: "/api/placeholder/400/250",
    github: "https://github.com/naeem0512/Sign-Language",
    live: "https://drive.google.com/file/demo"
  },
  {
    id: 5,
    title: "Portfolio Website",
    category: "Frontend",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    description: "This portfolio website built with modern web technologies.",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Movie Recommender",
    category: "AI/ML",
    tags: ["Python", "Pandas", "ML"],
    description: "Hybrid recommendation system using collaborative and content-based filtering.",
    image: "/api/placeholder/400/250",
    github: "https://github.com/naeem0512/MovieRecommender"
  }
];

const categories = ["All", "AI/ML", "Full-Stack", "Frontend", "Backend"];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-[#232329] rounded-xl overflow-hidden group hover:bg-[#2a2a30] transition-all duration-300 ${
        project.featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            project.featured ? 'h-64 md:h-80' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.live && (
            <button className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent transition-colors">
              <ExternalLink className="text-white text-sm w-4 h-4" />
            </button>
          )}
          {project.github && (
            <button className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent transition-colors">
              <Github className="text-white text-sm w-4 h-4" />
            </button>
          )}
          {project.dissertation && (
            <button className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent transition-colors">
              <FileText className="text-white text-sm w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${project.featured ? 'md:p-8' : ''}`}>
        <h3 className={`font-bold text-white group-hover:text-accent transition-colors ${
          project.featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          {project.title}
        </h3>
        
        <p className={`text-white/60 mt-2 ${
          project.featured ? 'text-base' : 'text-sm'
        }`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
            My <span className="text-accent">Projects</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From AI-powered systems to full-stack applications, here's what I've been building
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-accent text-primary'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-white/60">
            Showing <span className="text-accent font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">
              No projects found in this category
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;