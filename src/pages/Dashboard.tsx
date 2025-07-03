import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Clock, TrendingUp, Play, Pause } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { spotifyAuth, SpotifyPlaylist } from '../services/spotifyAuth';
import PlaylistCard from '../components/PlaylistCard';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist | null>(null);

  const stats = [
    { label: 'Total Playlists', value: playlists.length.toString(), icon: Music, color: 'text-spotify-green' },
    { label: 'Total Tracks', value: playlists.reduce((acc, p) => acc + p.tracks.total, 0).toString(), icon: Play, color: 'text-blue-400' },
    { label: 'User Since', value: user ? '2023' : '-', icon: Clock, color: 'text-purple-400' },
    { label: 'Followers', value: user?.followers?.total?.toString() || '0', icon: TrendingUp, color: 'text-pink-400' }
  ];

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const userPlaylists = await spotifyAuth.getUserPlaylists(20);
        setPlaylists(userPlaylists);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [isAuthenticated]);

  const formatDuration = (totalMs: number) => {
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const transformPlaylistData = (playlist: SpotifyPlaylist) => ({
    id: playlist.id,
    name: playlist.name,
    description: playlist.description || 'No description',
    image: playlist.images?.[0]?.url || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: playlist.tracks.total,
    duration: '2h 30m', // Placeholder - would need to fetch track durations
    lastPlayed: 'Recently'
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Please Connect to Spotify</h2>
          <p className="text-white/70">You need to authenticate with Spotify to view your dashboard.</p>
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
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.display_name}!
          </h1>
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
          ) : playlists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PlaylistCard 
                    playlist={transformPlaylistData(playlist)} 
                    onAnalyze={() => setSelectedPlaylist(playlist)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Music className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Playlists Found</h3>
              <p className="text-white/70">Create some playlists on Spotify to get started!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;