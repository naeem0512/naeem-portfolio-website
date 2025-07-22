"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
        className="relative"
      >
        {/* Image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 2.4, duration: 0.6, ease: "easeOut" },
          }}
          className="relative w-[300px] h-[300px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/IMG_4418 copy.PNG"
              priority
              quality={100}
              fill
              sizes="(max-width: 768px) 300px, 450px"
              alt="Mohammed Naeem Ahmed"
              className="object-cover object-center scale-90"
            />
          </div>
        </motion.div>

        {/* Simple rotating circle */}
        <motion.svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] xl:w-[480px] h-[320px] xl:h-[480px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;