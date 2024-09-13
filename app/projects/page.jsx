"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsGithub } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi"; 

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
      "This portfolio isn’t just a showcase—it’s my coding adventure. Built with Next.js and Tailwind CSS, it’s the result of countless hours tweaking things to look and feel just right. It’s still evolving as I learn new tricks. And hey, you’re already here, so I guess it’s doing its job! If you'd like more insight into how this was built or have any questions, feel free to reach out.",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
    image: "/computer.png",
    // github: "https://github.com/naeem0512/naeem-portfolio-website",
  },
  {
    num: "02",
    category: "Fullstack",
    title: "Finance Dashboard App",
    description:
      `I’ve always had a thing for finance—there’s something exciting about turning raw data into meaningful insights. So, I built the Finance Dashboard App, a tool that not only tracks Revenue, Profit, and Expenses but also uses machine learning to predict future trends. It’s like having a financial expert at your fingertips, delivering real-time insights and predictive trends right when you need them.`,
    stack: [
      { name: "MongoDB" },
      { name: "Express.js" },
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Machine Learning" },
    ],
    image: "/finance-app.png",
    github: "https://github.com/naeem0512/finance-app",
    live: "https://finance-ew52e1p9d-naeems-projects-50b3f431.vercel.app",
  },
  {
    num: "03",
    category: "Frontend",
    title: "Pathfinding Visualiser",
    description:
      "This project emerged while I was preparing for my university data structures and algorithms exams. To solidify my understanding, I built the Pathfinding Visualiser, bringing algorithms like Dijkstra and A* to life on screen. It not only helped me excel in my exams but also sharpened my programming skills, creating a tool that could benefit others in their learning journey.",
    stack: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
    image: "/pathfinder.png",  
    github: "https://github.com/naeem0512/pathfinding-visualiser",
    live: "https://pathfinding-visualiser-kappa.vercel.app/",
  },
  {
    num: "04",
    category: "Python",
    title: "Sign Language Detection",
    description:
      "This project is close to my heart as it blends technology with social impact. I developed a sign language detection system using Python and machine learning to bridge communication gaps for sign language users. It highlighted the importance of accessibility in tech and was deeply fulfilling to create something that could genuinely make a difference.",
    stack: [
      { name: "Python" },
      { name: "TensorFlow" },
    ],
    image: "/signlang.jpeg",
    github: "https://github.com/naeem0512/Sign-Language",
  },
  {
    num: "05",
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
    live: "https://drive.google.com/file/d/1aFuYjcCnIL7I9EOkq4Q2041F-KTmCqlB/view?usp=sharing",
  },
  {
    num: "06",
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
    num: "07",
    category: "Frontend",
    title: "Phaser Brick Breaker Game",
    description:
      "Building this Phaser-based brick breaker game was a nostalgic blast from the past. The challenge? Capture that classic, addictive fun with my own twist.",
    stack: [
      { name: "HTML" },
      { name: "JavaScript" },
      { name: "Phaser" },
    ],
    image: "/bricks.png",
    github: "https://github.com/naeem0512/Phaser-Brick-Breaker-Game",
    live: "https://phaser-brick-breaker-game.vercel.app/",
  },
  {
    num: "08",
    category: "Machine Learning",
    title: "Movie Recommender",
    description:
      "Building the Movie Recommender system was my ticket into the wild world of machine learning. I cooked up a hybrid system that suggests movies like a psychic Netflix. Watching algorithms predict user preferences was a mind-blowing experience, and it seriously leveled up my Python and data skills. Plus, it’s got me thinking—AI might just be the future, and I’m here for it! So, Inception tonight?",
    stack: [
      { name: "Python" },
      { name: "Jupyter Notebook" },
      { name: "Pandas" },
    ],
    image: "/pop.png",
    github: "https://github.com/naeem0512/MovieRecommender",
  },
  {
    num: "09",
    category: "Python",
    title: "Snake Game",
    description:
      "Building the Snake Game with Pygame was a nostalgic trip back to my first mobile phone. Recreating that simple, addictive classic with Python was a blast, letting me dive into game mechanics and user experience. It was a fun way to flex my coding muscles and create something timeless.",
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
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.title}
              </h2>
              <p className="text-white/60">{project.description}</p>
              <ul className="flex gap-4">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}{index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20"></div>
              <div className="flex gap-4">
                {/* Live demo button */}
                {project.live && (
                  <Link href={project.live} target="_blank">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <FiArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live Demo</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
                {/* Github project button */}
                {project.github && (
                  <Link href={project.github} target="_blank">
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
                )}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
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
              ))}
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
