// app/resume/page.jsx - SERVER COMPONENT

export const metadata = {
  title: "Resume",
  description: "Technical skills, education, and certifications of Mohammed Naeem Ahmed. Computer Science graduate with expertise in React, Python, AI/ML, and more.",
  keywords: "resume, CV, skills, education, certifications, React, Next.js, Python, TensorFlow, Birmingham City University",
  openGraph: {
    title: "Resume | Mohammed Naeem Ahmed",
    description: "Technical skills, education, and certifications of Mohammed Naeem Ahmed.",
    url: "https://naeemcodes.com/resume",
  }
};

import ResumeClient from './ResumeClient';

export default function ResumePage() {
  return <ResumeClient />;
}