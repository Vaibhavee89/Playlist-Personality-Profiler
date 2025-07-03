import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Clock, TrendingUp, Play, Pause } from 'lucide-react';
import PlaylistCard from '../components/PlaylistCard';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Mock data - replace with actual Spotify API calls
  const mockPlaylists = [
    {
      id: '1',
      name: 'My Chill Vibes',
      description: 'Perfect for relaxing evenings',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
      tracks: 45,
      duration: '2h 34m',
      lastPlayed: '2 days ago'
    },
    {
      id: '2',
      name: 'Workout Energy',
      description: 'High energy tracks for the gym',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
      tracks: 32,
      duration: '1h 58m',
      lastPlayed: '1 day ago'
    },
    {
      id: '3',
      name: 'Focus Flow',
      description: 'Instrumental music for deep work',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300',
      tracks: 28,
      duration: '1h 42m',
      lastPlayed: '3 hours ago'
    }
  ];

  const stats = [
    { label: 'Total Playlists', value: '12', icon: Music, color: 'text-spotify-green' },
    { label: 'Total Tracks', value: '1,247', icon: Play, color: 'text-blue-400' },
    { label: 'Listening Time', value: '87h', icon: Clock, color: 'text-purple-400' },
    { label: 'Top Genre', value: 'Indie Pop', icon: TrendingUp, color: 'text-pink-400' }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPlaylists(mockPlaylists);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Music Dashboard</h1>
          <p className="text-white/70 text-lg">Explore your playlists and discover your musical personality</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Playlists Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
            <button className="btn-secondary">
              <Users className="h-4 w-4 mr-2" />
              Analyze All
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/10 rounded-xl h-64"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PlaylistCard 
                    playlist={playlist} 
                    onAnalyze={() => setSelectedPlaylist(playlist)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;