// app/about/page.jsx - SERVER COMPONENT

export const metadata = {
  title: "About",
  description: "Learn about my journey from curious coder to first-class Computer & Data Science graduate. My story of academic success and passion for technology.",
  keywords: "about, journey, first class degree, Computer Science, Birmingham City University, Mohammed Naeem Ahmed",
  openGraph: {
    title: "About | Mohammed Naeem Ahmed",
    description: "Learn about my journey from curious coder to first-class Computer & Data Science graduate.",
    url: "https://naeemcodes.com/about",
  }
};

import AboutClient from './AboutClient';

export default function AboutPage() {
  return <AboutClient />;
}