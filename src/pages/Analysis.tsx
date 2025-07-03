import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Music, TrendingUp } from 'lucide-react';
import PersonalityChart from '../components/PersonalityChart';
import MoodAnalysis from '../components/MoodAnalysis';
import AudioFeatures from '../components/AudioFeatures';

const Analysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock personality data
  const mockPersonalityData = {
    openness: 78,
    conscientiousness: 65,
    extraversion: 82,
    agreeableness: 71,
    neuroticism: 34
  };

  const mockMoodData = {
    valence: 0.72,
    energy: 0.68,
    danceability: 0.75,
    acousticness: 0.23,
    instrumentalness: 0.15,
    liveness: 0.12,
    speechiness: 0.08
  };

  const personalityInsights = [
    {
      trait: 'High Extraversion',
      score: 82,
      description: 'Your music taste suggests you enjoy social, upbeat, and energetic experiences. You likely prefer music that gets you moving and connects you with others.',
      color: 'text-personality-extraversion'
    },
    {
      trait: 'High Openness',
      score: 78,
      description: 'You show a strong preference for diverse, creative, and experimental music. You\'re likely open to new genres and artistic expressions.',
      color: 'text-personality-openness'
    },
    {
      trait: 'Moderate Agreeableness',
      score: 71,
      description: 'Your playlist reflects a balance between harmonious and more intense musical elements, suggesting you appreciate both cooperation and independence.',
      color: 'text-personality-agreeableness'
    }
  ];

  useEffect(() => {
    // Simulate analysis loading
    setTimeout(() => {
      setAnalysisData({
        personality: mockPersonalityData,
        mood: mockMoodData
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-spotify-green mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Musical DNA</h2>
          <p className="text-white/70">This may take a few moments...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Musical Personality</h1>
          <p className="text-white/70 text-lg">Deep insights into your personality through music psychology</p>
        </motion.div>

        {/* Personality Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Brain className="h-6 w-6 mr-2 text-personality-openness" />
              Big Five Personality Traits
            </h2>
            <PersonalityChart data={analysisData.personality} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Heart className="h-6 w-6 mr-2 text-pink-400" />
              Mood & Audio Features
            </h2>
            <AudioFeatures data={analysisData.mood} />
          </motion.div>
        </div>

        {/* Detailed Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-400" />
            Personality Insights
          </h2>
          
          <div className="space-y-6">
            {personalityInsights.map((insight, index) => (
              <motion.div
                key={insight.trait}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/5 rounded-lg p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${insight.color}`}>{insight.trait}</h3>
                  <span className="text-white/70 font-medium">{insight.score}%</span>
                </div>
                <p className="text-white/80 leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mood Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <MoodAnalysis data={analysisData.mood} />
        </motion.div>
      </div>
    </div>
  );
};

export default Analysis;