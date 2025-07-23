// app/page.jsx - SERVER COMPONENT

export const metadata = {
  title: "Mohammed Naeem Ahmed - Portfolio",
  description: "First-class Computer & Data Science graduate specializing in AI/ML, full-stack development, and creating impactful digital solutions. Available for opportunities.",
  keywords: "Mohammed Naeem Ahmed, Portfolio, Full Stack Developer, AI/ML Engineer, Computer Science, Birmingham City University, React, Next.js, Python, TensorFlow, First Class Degree",
  openGraph: {
    title: "Mohammed Naeem Ahmed - Portfolio",
    description: "First-class Computer & Data Science graduate specializing in AI/ML, full-stack development, and creating impactful digital solutions.",
    url: "https://naeemcodes.com",
    images: ["/og-image.jpg"]
  }
};

import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient />;
}