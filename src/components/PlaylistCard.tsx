import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Music, BarChart3 } from 'lucide-react';

interface PlaylistCardProps {
  playlist: {
    id: string;
    name: string;
    description: string;
    image: string;
    tracks: number;
    duration: string;
    lastPlayed: string;
  };
  onAnalyze: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onAnalyze }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={playlist.image} 
          alt={playlist.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button className="absolute bottom-4 right-4 bg-spotify-green hover:bg-green-600 rounded-full p-3 transition-colors duration-200">
          <Play className="h-5 w-5 text-white" />
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-2">{playlist.name}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{playlist.description}</p>
        
        <div className="flex items-center justify-between text-white/60 text-sm mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Music className="h-4 w-4 mr-1" />
              {playlist.tracks} tracks
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {playlist.duration}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">Last played {playlist.lastPlayed}</span>
          <button 
            onClick={onAnalyze}
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analyze</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;