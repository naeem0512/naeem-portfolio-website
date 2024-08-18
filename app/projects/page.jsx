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
      "This portfolio website is more than just a collection of my work—it's a reflection of my journey as a developer. Built with Next.js and Tailwind CSS, this site represents countless hours of coding, tweaking, and perfecting. The goal was to create something that not only showcases my skills but also provides an intuitive and visually appealing experience. It's a project that continues to evolve as I learn more and push the boundaries of what I can do. And hey, you’re already here, so you know it’s working!",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
    image: "/computer.png",
    github: "https://github.com/naeem0512/Portfolio",
  },
  {
    num: "02",
    category: "Python",
    title: "Sign Language Detection",
    description:
      "This project holds a special place in my heart because it combines technology with social impact. I worked on developing a sign language detection system using Python and machine learning. The goal was to bridge communication gaps for those who rely on sign language. This project taught me the importance of accessibility in technology, and it was incredibly fulfilling to apply machine learning in a way that could potentially make a real difference in people's lives.",
    stack: [
      { name: "Python" },
      { name: "TensorFlow" },
    ],
    image: "/signlang.jpeg",
    github: "https://github.com/naeem0512/Sign-Language",
  },
  {
    num: "03",
    category: "Machine Learning",
    title: "Emotion Classification in Images: Happy vs. Sad",
    description:
      "This project is a simple yet effective introduction to the world of neural networks and deep learning. It focuses on classifying emotions in images as either 'Happy' or 'Sad' using a neural network model. The goal is to accurately (or nearly accurately) predict the emotion in the given images.",
    stack: [
      { name: "Python" },
      { name: "Jupyter Notebook" },
      { name: "TensorFlow" },
    ],
    image: "/cnn-image.png",  
    github: "https://github.com/naeem0512/cnn-image-classifier",
  },
  {
    num: "04",
    category: "Backend",
    title: "Luxury Wheels",
    description:
      "Luxury Wheels was a project that challenged my backend development skills in a significant way. The idea was to create a specialized web-based car rental system for luxury and vintage cars, targeting high-end wedding events. I aimed to design a seamless booking interface that would provide an exceptional user experience. Throughout this project, I honed my PHP and MySQL skills while also understanding the importance of user experience in backend systems. It was rewarding to see how a robust backend can elevate the entire product.",
    stack: [
      { name: "PHP" },
      { name: "MySQL" },
      { name: "JavaScript" },
    ],
    image: "/l.png",
    github: "https://github.com/naeem0512/LuxuryWheels",
  },
  {
    num: "05",
    category: "Frontend",
    title: "Phaser Brick Breaker Game",
    description:
      "Creating this Phaser-based brick breaker game was a trip down memory lane to the classic games I grew up with. The challenge was to replicate the fun and addictive nature of the original while adding my own twist. This project allowed me to dive deep into game development concepts and sharpen my skills in HTML, JavaScript, and Phaser. It was a fun project that reminded me why I fell in love with coding in the first place—it's about creating something that brings joy.",
    stack: [
      { name: "HTML" },
      { name: "JavaScript" },
      { name: "Phaser" },
    ],
    image: "/bricks.png",
    github: "https://github.com/naeem0512/Phaser-Brick-Breaker-Game",
  },
  {
    num: "06",
    category: "Machine Learning",
    title: "Movie Recommender",
    description:
      "The Movie Recommender system was an exciting project that introduced me to the world of machine learning. The idea was to create a hybrid recommendation system that combines different filtering methods to suggest movies. It was fascinating to see how algorithms can predict user preferences and how data-driven insights can enhance user experiences. This project not only improved my Python and data analysis skills but also sparked my interest in AI and its potential to shape the future.",
    stack: [
      { name: "Python" },
      { name: "Jupyter Notebook" },
      { name: "Pandas" },
    ],
    image: "/pop.png",
    github: "https://github.com/naeem0512/MovieRecommender",
  },
  {
    num: "07",
    category: "Python",
    title: "Snake Game",
    description:
      "Building the Snake Game with Pygame was a nostalgic project that brought back memories of playing the classic game on my first mobile phone. The challenge was to recreate that same simple yet addictive experience using Python. This project allowed me to explore game development from a new perspective, focusing on the mechanics and user experience. It was a fun way to apply my programming skills to create something timeless and enjoyable.",
    stack: [
      { name: "Python" },
      { name: "Pygame" },
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
