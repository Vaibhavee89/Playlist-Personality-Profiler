import React from 'react';
import { motion } from 'framer-motion';

interface AudioFeaturesProps {
  data: {
    valence: number;
    energy: number;
    danceability: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    speechiness: number;
  };
}

const AudioFeatures: React.FC<AudioFeaturesProps> = ({ data }) => {
  const features = [
    { key: 'valence', label: 'Positivity', description: 'How positive/happy your music sounds' },
    { key: 'energy', label: 'Energy', description: 'Intensity and power of your tracks' },
    { key: 'danceability', label: 'Danceability', description: 'How suitable for dancing' },
    { key: 'acousticness', label: 'Acoustic', description: 'Presence of acoustic instruments' }
  ];

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 rounded-lg p-4 border border-white/10"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-white font-medium">{feature.label}</span>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </div>
            <span className="text-white/70 font-semibold">
              {Math.round(data[feature.key as keyof typeof data] * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data[feature.key as keyof typeof data] * 100}%` }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              className="h-2 rounded-full bg-gradient-to-r from-spotify-green to-green-400"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AudioFeatures;