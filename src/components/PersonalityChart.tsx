import React from 'react';
import { motion } from 'framer-motion';

interface PersonalityChartProps {
  data: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

const PersonalityChart: React.FC<PersonalityChartProps> = ({ data }) => {
  const traits = [
    { key: 'openness', label: 'Openness', color: 'bg-personality-openness' },
    { key: 'conscientiousness', label: 'Conscientiousness', color: 'bg-personality-conscientiousness' },
    { key: 'extraversion', label: 'Extraversion', color: 'bg-personality-extraversion' },
    { key: 'agreeableness', label: 'Agreeableness', color: 'bg-personality-agreeableness' },
    { key: 'neuroticism', label: 'Neuroticism', color: 'bg-personality-neuroticism' }
  ];

  return (
    <div className="space-y-6">
      {traits.map((trait, index) => (
        <motion.div
          key={trait.key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">{trait.label}</span>
            <span className="text-white/70 font-semibold">{data[trait.key as keyof typeof data]}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data[trait.key as keyof typeof data]}%` }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              className={`h-3 rounded-full ${trait.color}`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PersonalityChart;