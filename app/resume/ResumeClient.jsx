"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiMongodb, SiExpress } from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Core skills with proficiency levels
const skills = {
  title: "Technical Skills",
  description: "Technologies and tools I work with to build modern applications",
  categories: [
    {
      name: "Frontend",
      skills: [
        { icon: <FaReact />, name: "React", level: "Advanced" },
        { icon: <SiNextdotjs />, name: "Next.js", level: "Advanced" },
        { icon: <FaJs />, name: "JavaScript", level: "Advanced" },
        { icon: <SiTypescript />, name: "TypeScript", level: "Intermediate" },
        { icon: <SiTailwindcss />, name: "Tailwind CSS", level: "Advanced" },
        { icon: <FaHtml5 />, name: "HTML5", level: "Advanced" },
        { icon: <FaCss3 />, name: "CSS3", level: "Advanced" },
      ]
    },
    {
      name: "Backend & Database",
      skills: [
        { icon: <FaNodeJs />, name: "Node.js", level: "Intermediate" },
        { icon: <SiExpress />, name: "Express.js", level: "Intermediate" },
        { icon: <SiMongodb />, name: "MongoDB", level: "Intermediate" },
        { icon: <FaPython />, name: "Python", level: "Advanced" },
        { icon: <FaJava />, name: "Java", level: "Intermediate" },
      ]
    }
  ]
};

// Education data with correct timeline
const education = {
  title: "Education",
  items: [
    {
      institution: "Birmingham City University",
      degree: "BSc Computer and Data Science",
      duration: "2022 - 2025",
      status: "First-Class Honours Graduate",
      grade: "Expected: First-Class Honours",
      highlights: ["Data Structures & Algorithms", "Software Engineering", "Machine Learning", "AI Systems", "Database Design"]
    }
  ],
};

// Key certifications only
const certifications = {
  title: "Certifications",
  items: [
    { name: "IT Specialist – Python", issuer: "Pearson", year: "2024" },
    { name: "Enterprise Design Thinking Practitioner", issuer: "IBM", year: "2024" },
    { name: "Software Engineer Intern", issuer: "HackerRank", year: "2024" },
    { name: "Java Programming", issuer: "HackerRank", year: "2023" },
    { name: "Data Science Fundamentals", issuer: "IBM", year: "2023" },
    { name: "React Developer", issuer: "HackerRank", year: "2023" },
  ],
};

// Personal info with updated timeline
const about = {
  title: "About Me",
  description: "Computer Science graduate passionate about creating impactful software solutions. Over my 3+ years of study (2022-2025), I've developed expertise in full-stack development and AI/ML, with a focus on building applications that solve real-world problems.",
  details: [
    { label: "Status", value: "First-Class Computer Science Graduate (2025)" },
    { label: "Focus", value: "Full-Stack Development & AI/ML Engineering" },
    { label: "Specialization", value: "React, Python, TensorFlow, Next.js" },
    { label: "Goal", value: "Building innovative solutions with real impact" },
    { label: "University", value: "Birmingham City University (2022-2025)" },
    { label: "Experience", value: "3+ years of project development" }
  ]
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="skills"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            {/* Skills */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px]">
                <div className="text-center xl:text-left">
                  <h3 className="text-4xl font-bold mb-4">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                
                <div className="space-y-8">
                  {skills.categories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h4 className="text-2xl font-semibold mb-6 text-accent text-center xl:text-left">
                        {category.name}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#232329] rounded-xl p-6 flex flex-col items-center text-center group hover:bg-[#2a2a30] transition-all duration-300"
                          >
                            <div className="text-4xl mb-3 group-hover:text-accent transition-all duration-300">
                              {skill.icon}
                            </div>
                            <h5 className="font-medium mb-1">{skill.name}</h5>
                            <span className="text-sm text-white/60">{skill.level}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                
                <div className="space-y-6">
                  {education.items.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#232329] rounded-xl p-6 hover:bg-[#2a2a30] transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-accent mb-1">
                            {item.degree}
                          </h4>
                          <p className="text-white/80 font-medium">{item.institution}</p>
                        </div>
                        <div className="text-right mt-2 lg:mt-0">
                          <span className="text-white/60">{item.duration}</span>
                          {item.status && (
                            <p className="text-accent text-sm font-medium">{item.status}</p>
                          )}
                          {item.grade && (
                            <p className="text-green-400 text-sm font-medium">{item.grade}</p>
                          )}
                        </div>
                      </div>
                      
                      {item.highlights && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Certifications */}
            <TabsContent value="certifications" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{certifications.title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.items.map((cert, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#232329] rounded-xl p-6 hover:bg-[#2a2a30] transition-all duration-300"
                    >
                      <h4 className="font-semibold text-accent mb-2">{cert.name}</h4>
                      <p className="text-white/80">{cert.issuer}</p>
                      <span className="text-sm text-white/60">{cert.year}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* About */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 text-lg leading-relaxed">
                  {about.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[800px] mx-auto xl:mx-0 mt-8">
                  {about.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-center sm:items-start gap-2"
                    >
                      <span className="text-accent font-medium min-w-[100px]">
                        {detail.label}:
                      </span>
                      <span className="text-white/80 text-center sm:text-left">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;