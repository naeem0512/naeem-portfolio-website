"use client";

import { motion } from "framer-motion";

const Blog = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.4, duration: 0.6, ease: "easeInOut" },
          }}
          className="grid grid-cols-1 md:grid-cols-1 gap-[60px]"
        >
          <div className="flex-1 flex flex-col justify-center gap-6">
            {/* Blog Title */}
            <h1 className="text-6xl font-bold text-accent">
              From Curious Coder to Tech Explorer 🚀
            </h1>
            {/* Blog Content */}
            <p className="text-white/60 mt-4">
              Every journey in tech has its twists and turns, and mine started with an insatiable curiosity:
              &quot;How do these apps even work?!&quot; What began as a simple question quickly spiraled 
              into a full-blown obsession. Late nights spent debugging, countless cups of coffee, and 
              moments of doubt where I wondered if I’d ever figure it out—all of it was part of my journey. 
            </p>
            <p className="text-white/60 mt-4">
              My first steps at Birmingham City University, diving into Computer and Data Science, were 
              nothing short of overwhelming. The concepts were challenging, and there were times when I 
              felt completely out of my depth. But every small victory—every bug squashed, every project 
              completed—fueled my passion even more. It wasn&#39;t just about learning to code; it was about 
              discovering how technology can be a force for good, capable of solving real-world problems 
              and making a difference. 
            </p>
            {/* Section */}
            <h2 className="text-4xl font-semibold text-accent mt-8">
              The Spark: Finding My Geek Groove 🔥
            </h2>
            <p className="text-white/60 mt-4">
              It wasn’t always easy, but that’s what made the breakthroughs so satisfying. I vividly 
              remember the sleepless nights working on a British Sign Language translator with my team. 
              The pressure was immense, but so was the excitement. We were doing something meaningful—something 
              that could truly help people. The camaraderie, the shared frustrations, and the ultimate 
              triumph when we saw our project come to life—those moments cemented my love for tech.
            </p>
            <p className="text-white/60 mt-4">
              Through these experiences, I found my stride. Coding became more than just a skill; it became 
              my creative outlet. I discovered that I’m most alive when I’m building something new, solving 
              problems, and pushing the boundaries of what’s possible. Whether it’s a complex algorithm or 
              a simple app, the thrill of creation is what drives me.
            </p>
            {/* Section */}
            <h2 className="text-4xl font-semibold text-accent mt-8">
              Real-World Applications: Coding IRL 🌐
            </h2>
            <p className="text-white/60 mt-4">
              Theoretical knowledge is important, but what I love most is rolling up my sleeves and getting 
              to work. There’s something incredibly satisfying about turning abstract concepts into 
              tangible solutions. Every project, from web apps to machine learning models, presents its 
              own set of challenges. And yes, there are moments when nothing seems to work, when the code 
              feels like an unsolvable puzzle. But those are the moments that make the successes so sweet.
            </p>
            <p className="text-white/60 mt-4">
              Each project is a new adventure, a chance to learn and grow. And with each one, I’ve become 
              more confident in my abilities. I’ve learned to embrace the difficulties as part of the 
              process, knowing that each obstacle is just another step toward mastery.
            </p>
            {/* Section */}
            <h2 className="text-4xl font-semibold text-accent mt-8">
              The Road Ahead: Next-Level Aspirations 🌟
            </h2>
            <p className="text-white/60 mt-4">
              Looking ahead, I’m filled with excitement and anticipation. The tech world is constantly 
              evolving, and there’s always something new to learn, explore, and create. I’m passionate 
              about diving deeper into areas like AI and data science, and I’m eager to work on projects 
              that push the envelope and challenge the status quo.
            </p>
            <p className="text-white/60 mt-4">
              But beyond the code, it’s the impact that drives me. I want to build solutions that don’t 
              just work but make a real difference. Whether it’s improving accessibility, solving a 
              pressing problem, or just making someone’s day a little easier, I’m committed to using my 
              skills for good.
            </p>
            <p className="text-white/60 mt-4">
              And who knows? Maybe I’ll start that tech blog I’ve been dreaming about, or create tutorials 
              to help others navigate their own coding journeys. Because at the end of the day, it’s not 
              just about being a developer—it’s about being a part of a community that’s building the future.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
