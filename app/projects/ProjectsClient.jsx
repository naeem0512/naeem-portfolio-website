// app/projects/ProjectsClient.jsx - CREATE THIS NEW FILE

"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Github, ExternalLink, FileText, Play, Book } from "lucide-react";
import Image from "next/image";
import { projects, getProjectsByCategory } from "@/utils/projectsData";

const categories = ["All", "AI/ML", "Full-Stack", "Frontend", "Backend"];

const ProjectCard = ({ project, index }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-[#232329] rounded-xl overflow-hidden group hover:bg-[#2a2a30] transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 ${
        project.featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {!imageError ? (
          <div className={`relative ${project.featured ? 'h-64 md:h-80' : 'h-48'}`}>
            {imageLoading && (
              <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                <div className="text-white/40">Loading...</div>
              </div>
            )}
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className={`bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ${
            project.featured ? 'h-64 md:h-80' : 'h-48'
          }`}>
            <div className="text-accent/60 text-4xl">
              {project.category === 'AI/ML' ? '🧠' : 
               project.category === 'Full-Stack' ? '⚡' : '🎨'}
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
              ⭐ Featured
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
              <Play className="w-4 h-4" />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.dissertation && (
            <a href={project.dissertation} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
              <FileText className="w-4 h-4" />
            </a>
          )}
          {project.notebook && (
            <a href={project.notebook} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
              <Book className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

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

        {project.featured && project.highlights && (
          <ul className="mt-4 space-y-1">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {(project.technologies || project.tags).slice(0, project.featured ? 6 : 4).map((tech, i) => (
            <span 
              key={i}
              className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md hover:bg-accent/20 transition-colors"
            >
              {tech}
            </span>
          ))}
          {(project.technologies || project.tags).length > (project.featured ? 6 : 4) && (
            <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-md">
              +{(project.technologies || project.tags).length - (project.featured ? 6 : 4)} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsClient = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = getProjectsByCategory(activeCategory);

  return (
    <section className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto px-4">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

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

export default ProjectsClient;