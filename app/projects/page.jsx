"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Fullstack",
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing my skills, projects, and contact information. Built with Next.js and Tailwind CSS. But hey, you probably already knew that—you’re standing inside it!",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" }
    ],
    image: "/computer.png",
    github: "https://github.com/naeem0512/Portfolio",
  },
  {
    num: "02",
    category: "Backend",
    title: "Luxury Wheels",
    description:
      "Specialised web-based car rental system tailored for wedding events, offering an intuitive booking interface for luxury and vintage cars.",
    stack: [
      { name: "PHP" },
      { name: "MySQL" },
      { name: "JavaScript" }
    ],
    image: "/l.png",
    github: "https://github.com/naeem0512/LuxuryWheels",
  },
  {
    num: "03",
    category: "Python",
    title: "Sign Language Detection",
    description:
      "A sign language detection system built with Python to help bridge communication gaps using machine learning.",
    stack: [
      { name: "Python" },
      { name: "TensorFlow" }
    ],
    image: "/signlang.jpeg",
    github: "https://github.com/naeem0512/Sign-Language",
  },
  {
    num: "04",
    category: "Frontend",
    title: "Phaser Brick Breaker Game",
    description:
      "A Phaser-based brick breaker game developed using HTML and JavaScript.",
    stack: [
      { name: "HTML" },
      { name: "JavaScript" },
      { name: "Phaser" }
    ],
    image: "/bricks.png",
    github: "https://github.com/naeem0512/Phaser-Brick-Breaker-Game",
  },
  {
    num: "05",
    category: "Machine Learning",
    title: "Movie Recommender",
    description:
      "A hybrid movie recommendation system combining various filtering methods to suggest movies to users.",
    stack: [
      { name: "Python" },
      { name: "Jupyter Notebook" },
      { name: "Pandas" }
    ],
    image: "/pop.png",
    github: "https://github.com/naeem0512/MovieRecommender",
  },
  {
    num: "06",
    category: "Python",
    title: "Snake Game",
    description:
      "A simple Snake Game built with Pygame for a fun and classic gaming experience.",
    stack: [
      { name: "Python" },
      { name: "Pygame" }
    ],
    image: "/Terminal Game.png",
    github: "https://github.com/naeem0512/snake-game",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* project title */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.title}
              </h2>
              {/* project description */}
              <p className="text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {/* remove the last comma */}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* github project button */}
              <Link href={project.github}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsGithub className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github repository</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          alt={project.title}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
