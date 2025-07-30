// utils/projectsData.js - Updated with placeholder images
export const projects = [
    {
      id: 1,
      title: "LiftSense - Smart Fatigue Detection",
      category: "AI/ML",
      tags: ["Python", "TensorFlow", "LSTM", "AI"],
      description: "Intelligent fatigue detection system with 97.94% accuracy using LSTM neural networks and synthetic biosignal data.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
      featured: true,
      github: "https://github.com/naeem0512/liftsense-2.0",
      live: "/demo-videos/liftsense-demo.mp4",
      dissertation: "/documents/A3-Dissertation-22161297.pdf",
      technologies: ["Python", "TensorFlow", "Keras", "LSTM", "NumPy", "Pandas"],
      highlights: [
        "97.94% accuracy in fatigue detection",
        "Real-time biosignal processing",
        "Synthetic data generation pipeline"
      ]
    },
    {
      id: 2,
      title: "Finance Dashboard App",
      category: "Full-Stack",
      tags: ["React", "Node.js", "MongoDB", "ML"],
      description: "Financial insights dashboard with ML-powered predictions and real-time analytics for portfolio management.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      github: "https://github.com/naeem0512/finance-app",
      live: "https://finance-app-naeem.vercel.app",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "TensorFlow.js"],
      highlights: [
        "Real-time financial data visualization",
        "ML-powered price predictions",
        "Portfolio tracking and analytics"
      ]
    },
    {
      id: 3,
      title: "Pathfinding Visualizer",
      category: "Frontend",
      tags: ["React", "TypeScript", "Algorithms"],
      description: "Interactive visualization of pathfinding algorithms including Dijkstra, A*, and BFS with customizable grid.",
      image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800&h=600&fit=crop&crop=center",
      github: "https://github.com/naeem0512/pathfinding-visualiser",
      live: "https://pathfinding-visualiser-kappa.vercel.app/",
      technologies: ["React", "TypeScript", "CSS3", "Algorithms"],
      highlights: [
        "Multiple algorithm implementations",
        "Interactive grid customization",
        "Real-time visualization with speed controls"
      ]
    },
    {
      id: 4,
      title: "British Sign Language Detection",
      category: "AI/ML",
      tags: ["Python", "TensorFlow", "Computer Vision", "OpenCV"],
      description: "Real-time British Sign Language detection system using computer vision and deep learning models.",
      image: "https://images.unsplash.com/photo-1559163499-413811fb2344?w=800&h=600&fit=crop&crop=center",
      github: "https://github.com/naeem0512/Sign-Language",
      demo: "/demo-videos/sign-language-demo.mp4",
      technologies: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "NumPy"],
      highlights: [
        "Real-time hand gesture recognition",
        "British Sign Language alphabet detection",
        "Computer vision preprocessing pipeline"
      ]
    },
    {
      id: 5,
      title: "Portfolio Website",
      category: "Frontend",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      description: "Modern, responsive portfolio website built with Next.js 14, featuring smooth animations and dynamic content.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&crop=center",
      github: "https://github.com/naeem0512/naeem-portfolio",
      live: "https://naeemcodes.com",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
      highlights: [
        "Server-side rendering with Next.js 14",
        "Smooth animations with Framer Motion",
        "Responsive design with Tailwind CSS"
      ]
    },
    {
      id: 6,
      title: "Movie Recommender System",
      category: "AI/ML",
      tags: ["Python", "Pandas", "Scikit-learn", "ML"],
      description: "Hybrid recommendation system combining collaborative filtering and content-based approaches for personalized movie suggestions.",
      image: "https://images.unsplash.com/photo-1489599856729-fcb8c36f1c4e?w=800&h=600&fit=crop&crop=center",
      github: "https://github.com/naeem0512/MovieRecommender",
      notebook: "https://nbviewer.org/github/naeem0512/MovieRecommender/blob/main/MovieRecommender.ipynb",
      technologies: ["Python", "Pandas", "Scikit-learn", "NumPy", "Matplotlib"],
      highlights: [
        "Hybrid collaborative and content-based filtering",
        "SVD matrix factorization implementation",
        "Comprehensive data analysis and visualization"
      ]
    }
  ];
  
  // Function to get projects by category
  export const getProjectsByCategory = (category) => {
    if (category === "All") return projects;
    return projects.filter(project => project.category === category);
  };
  
  // Function to get featured projects
  export const getFeaturedProjects = () => {
    return projects.filter(project => project.featured);
  };