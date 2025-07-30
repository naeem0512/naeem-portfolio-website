// app/about/page.jsx - SERVER COMPONENT

export const metadata = {
  title: "Blog",
  description: "From curious coder to first-class Computer & Data Science graduate. An interactive blog about my coding journey, challenges, and achievements.",
  keywords: "blog, journey, first class degree, Computer Science, Birmingham City University, Mohammed Naeem Ahmed, coding story",
  openGraph: {
    title: "Blog | Mohammed Naeem Ahmed",
    description: "From curious coder to first-class Computer & Data Science graduate. An interactive blog about my coding journey.",
    url: "https://naeemcodes.com/about",
  }
};

import BlogClient from './BlogClient';

export default function AboutPage() {
  return <BlogClient />;
}