"use client";

import { motion } from "framer-motion";
import { FiGithub, FiStar, FiGitBranch, FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";

const GitHubStats = () => {
  const [stats, setStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/naeem0512');
        const userData = await userResponse.json();
        
        const reposResponse = await fetch('https://api.github.com/users/naeem0512/repos');
        const reposData = await reposResponse.json();
        
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars: totalStars
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const statItems = [
    {
      label: "Public Repos",
      value: stats.publicRepos,
      icon: FiGitBranch,
      color: "text-blue-400"
    },
    {
      label: "Followers",
      value: stats.followers,
      icon: FiUsers,
      color: "text-green-400"
    },
    {
      label: "Following",
      value: stats.following,
      icon: FiUsers,
      color: "text-purple-400"
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      icon: FiStar,
      color: "text-yellow-400"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl h-24"></div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {statItems.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 text-center"
          >
            <div className="flex justify-center mb-3">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                <IconComponent className="text-xl" />
              </div>
            </div>
            
            <div className="text-2xl xl:text-3xl font-bold text-white mb-2">
              {stat.value}
            </div>
            
            <div className="text-sm text-white/60">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default GitHubStats;
