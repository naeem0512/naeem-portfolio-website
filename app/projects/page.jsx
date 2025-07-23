// app/projects/page.jsx - SERVER COMPONENT (FIXED)

export const metadata = {
  title: "Projects",
  description: "Explore my portfolio of AI/ML projects, full-stack applications, and creative coding solutions. From LiftSense fatigue detection to pathfinding visualizations.",
  keywords: "projects, portfolio, AI, machine learning, full stack, React, Python, TensorFlow, LiftSense",
  openGraph: {
    title: "Projects | Mohammed Naeem Ahmed",
    description: "Explore my portfolio of AI/ML projects, full-stack applications, and creative coding solutions.",
    url: "https://naeemcodes.com/projects",
    images: ["/projects-og.jpg"]
  }
};

import ProjectsClient from './ProjectsClient';

export default function ProjectsPage() {
  return <ProjectsClient />;
}