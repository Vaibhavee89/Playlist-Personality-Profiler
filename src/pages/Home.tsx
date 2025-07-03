import React, { useState } from 'react';
import { Music, Sparkles, Brain, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { login, isAuthenticated } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSpotifyLogin = async () => {
    if (isAuthenticated) {
      return;
    }
    
    setIsConnecting(true);
    try {
      login();
    } catch (error) {
      console.error('Login failed:', error);
      setIsConnecting(false);
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'Personality Analysis',
      description: 'Discover your Big Five personality traits through your music taste',
      color: 'text-personality-openness'
    },
    {
      icon: Heart,
      title: 'Mood Profiling',
      description: 'Understand your emotional patterns and music preferences',
      color: 'text-personality-agreeableness'
    },
    {
      icon: TrendingUp,
      title: 'Audio Insights',
      description: 'Deep dive into valence, energy, and musical characteristics',
      color: 'text-personality-extraversion'
    },
    {
      icon: Sparkles,
      title: 'Personalized Journals',
      description: 'AI-generated reflection prompts based on your musical journey',
      color: 'text-personality-neuroticism'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-spotify-green rounded-full mb-6"
          >
            <Music className="h-10 w-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Playlist
            <span className="bg-gradient-to-r from-spotify-green to-green-400 bg-clip-text text-transparent">
              {' '}Personality
            </span>
            <br />Profiler
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Analyze your Spotify playlist and discover your personality and mood profile through the power of music psychology
          </p>
        </div>

        {!isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpotifyLogin}
            disabled={isConnecting}
            className="btn-primary text-lg px-8 py-4 mb-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Music className="h-5 w-5" />
                <span>Connect with Spotify</span>
              </div>
            )}
          </motion.button>
        )}

        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-spotify-green/20 border border-spotify-green/30 rounded-lg p-4 mb-6">
              <p className="text-white font-medium">✅ Connected to Spotify!</p>
              <p className="text-white/70 text-sm">You can now explore your musical personality</p>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="personality-card text-center"
            >
              <feature.icon className={`h-8 w-8 ${feature.color} mx-auto mb-4`} />
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;