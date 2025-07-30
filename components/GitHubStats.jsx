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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/naeem0512', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        
        if (!userResponse.ok) {
          throw new Error(`GitHub API error: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        
        // Fetch repositories with pagination to get all repos
        let allRepos = [];
        let page = 1;
        const perPage = 100; // Max per page
        
        while (true) {
          const reposResponse = await fetch(
            `https://api.github.com/users/naeem0512/repos?page=${page}&per_page=${perPage}&sort=updated`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              }
            }
          );
          
          if (!reposResponse.ok) {
            throw new Error(`GitHub repos API error: ${reposResponse.status}`);
          }
          
          const reposData = await reposResponse.json();
          
          if (reposData.length === 0) break;
          
          allRepos = [...allRepos, ...reposData];
          
          if (reposData.length < perPage) break; // Last page
          
          page++;
        }
        
        // Calculate total stars from all repositories
        const totalStars = allRepos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        
        setStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          totalStars: totalStars
        });
        
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError(error.message);
        
        // Set fallback data if API fails
        setStats({
          publicRepos: 17, // Based on your current count
          followers: 1,
          following: 0,
          totalStars: 2
        });
      } finally {
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

  if (error && loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center col-span-full">
          <p className="text-red-400 text-sm">Unable to load GitHub stats</p>
          <p className="text-red-300/60 text-xs mt-1">Using cached data</p>
        </div>
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
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl h-32 flex items-center justify-center">
            <div className="text-white/40">Loading...</div>
          </div>
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