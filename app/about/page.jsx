"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
            <h1 className="text-4xl xl:text-5xl font-bold text-accent">
              🎉 Finally! I Did It! I Got the First-Class Degree!! 🎓
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl xl:text-2xl font-semibold text-white/90 mb-4">
              <strong>From Curious Coder to Tech Explorer: How I Turned "Wait, How Does This Work?" Into Academic Success and a Tech Obsession 🚀</strong>
            </h2>

            {/* Opening */}
            <p className="text-white/60 mt-4 text-lg">
              Okay, let me take a moment to breathe and celebrate because... <strong className="text-accent">I actually did it!</strong> 🎊
            </p>
            
            <p className="text-white/60 mt-4 text-lg">
              It all started with one simple (and slightly panicked) question: <strong className="text-accent">"How do these apps even <em>work</em>?!"</strong> Fast-forward through countless late nights, debugging marathons, and about a thousand Stack Overflow tabs later—and here I am: a <strong className="text-accent">First-Class Honours</strong> Computer & Data Science graduate!
            </p>
            
            <p className="text-white/60 mt-4 text-lg">
              From feeling completely lost in my first programming lecture to building AI systems that actually work... this journey has been absolutely wild. Let me tell you how it all went down. 👇
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl xl:text-3xl font-semibold text-accent mt-8">
              🔥 The Spark: My Geek Awakening
            </h2>
            <p className="text-white/60 mt-4 text-lg">
              Starting uni at Birmingham City felt like jumping into the deep end without floaties. Code looked like alien hieroglyphics. Databases? Sounded like something you'd find in a sci-fi lab.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              But somewhere between the late-night debugging marathons and victory dances after solving a stubborn bug (yes, I celebrate alone in my room), I caught the bug—the <strong className="text-accent">good kind</strong>.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              One of the biggest "this is why I love tech" moments? Building a <strong className="text-accent">British Sign Language translator</strong> with my team. Real pressure. Real stakes. Real purpose. It wasn't just a grade—it was a project that could genuinely help people. That was the <em className="text-accent">aha!</em> moment where tech turned from a career path into a calling.
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl xl:text-3xl font-semibold text-accent mt-8">
              🛠️ Coding IRL: The Joy, the Chaos, the Ctrl+Z
            </h2>
            <p className="text-white/60 mt-4 text-lg">
              Let's be honest—coding isn't always glamorous. Sometimes it's a perfectly clean deploy. Sometimes it's you screaming internally because one semi-colon broke your whole app.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              But I <em className="text-accent">live</em> for that rollercoaster.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              From building full-stack apps to experimenting with machine learning models, I've learned that the messiest problems often teach you the most. And yes, there were bugs that nearly broke my spirit—but they also built my resilience.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              Turns out, code isn't just logic. It's <strong className="text-accent">art, engineering, therapy, and occasional wizardry</strong> all rolled into one.
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl xl:text-3xl font-semibold text-accent mt-8">
              🌟 First-Class Degree, First-Class Dreams
            </h2>
            <p className="text-white/60 mt-4 text-lg">
              Getting a <strong className="text-accent">First</strong> wasn't just about good grades. It was about showing up—even when I felt lost. It was proving to myself that I <em>could</em> do hard things (like surviving group projects without losing my mind).
            </p>
            <p className="text-white/60 mt-4 text-lg">
              Now? I'm hungrier than ever. Here's what I'm aiming for next:
            </p>
            <ul className="text-white/60 mt-4 text-lg space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Dive deeper into <strong className="text-accent">AI, data science, and everything nerdy</strong>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Build things that solve real problems (not just fill portfolio space)
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Help make tech more accessible, inclusive, and human
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Maybe finally launch that blog + tutorial series I keep daydreaming about
              </li>
            </ul>

            {/* Section 4 */}
            <h2 className="text-2xl xl:text-3xl font-semibold text-accent mt-8">
              🚀 What's Next? Building. Sharing. Leveling Up.
            </h2>
            <p className="text-white/60 mt-4 text-lg">
              If I've learned one thing on this journey, it's that tech isn't just about syntax and systems. It's about <strong className="text-accent">impact</strong>. It's about building things that <em>matter</em>.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              Whether it's an app that helps people communicate, a dashboard that reveals insights, or a tool that makes life just a little easier—this is what fuels me.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              And hey, if I can help others through this crazy ride—whether it's by sharing tips, writing tutorials, or just being real about the ups and downs—I'm all in.
            </p>

            {/* LiftSense Section */}
            <h2 className="text-2xl xl:text-3xl font-semibold text-accent mt-8">
              💪 Bonus Level Unlocked: LiftSense
            </h2>
            <p className="text-white/60 mt-4 text-lg">
              Speaking of real-world impact...
            </p>
            <p className="text-white/60 mt-4 text-lg">
              For my final year dissertation, I created <strong className="text-accent">LiftSense</strong>—an intelligent fatigue monitoring system for resistance training, built using synthetic biosignal data, LSTM models, and real-time feedback mechanisms. It's a project I poured my soul into, blending AI, data science, and a passion for human performance.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              👉 You can check out <strong className="text-accent">LiftSense</strong> (and my full dissertation!) over in the{" "}
              <Link href="/projects" className="text-accent hover:text-accent/80 underline transition-colors">
                <strong>Projects tab</strong>
              </Link>.
            </p>
            <p className="text-white/60 mt-4 text-lg">
              It's one of my proudest builds—and just a glimpse of what I hope to keep creating.
            </p>

            {/* TL;DR Section */}
            <h2 className="text-2xl xl:text-3xl font-semibold text-accent mt-8">
              💬 TL;DR:
            </h2>
            <ul className="text-white/60 mt-4 text-lg space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Started clueless.
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Cried over bugs.
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Got a First-Class degree.
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Built cool stuff.
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Still coding. Still learning. Still <em className="text-accent">loving it</em>.
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Check out LiftSense. It's dope.
              </li>
            </ul>

            {/* Closing */}
            <p className="text-white/60 mt-8 text-lg font-medium">
              Let's keep building, keep growing, and keep having fun doing it. The future? It's ours to code. 💥
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;