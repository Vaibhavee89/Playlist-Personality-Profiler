var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Clock, TrendingUp, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { spotifyAuth } from '../services/spotifyAuth';
import PlaylistCard from '../components/PlaylistCard';
import StatsCard from '../components/StatsCard';
const Dashboard = () => {
    var _a, _b;
    const { isAuthenticated, user } = useAuth();
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const stats = [
        { label: 'Total Playlists', value: playlists.length.toString(), icon: Music, color: 'text-spotify-green' },
        { label: 'Total Tracks', value: playlists.reduce((acc, p) => acc + p.tracks.total, 0).toString(), icon: Play, color: 'text-blue-400' },
        { label: 'User Since', value: user ? '2023' : '-', icon: Clock, color: 'text-purple-400' },
        { label: 'Followers', value: ((_b = (_a = user === null || user === void 0 ? void 0 : user.followers) === null || _a === void 0 ? void 0 : _a.total) === null || _b === void 0 ? void 0 : _b.toString()) || '0', icon: TrendingUp, color: 'text-pink-400' }
    ];
    useEffect(() => {
        const fetchPlaylists = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }
            try {
                const userPlaylists = yield spotifyAuth.getUserPlaylists(20);
                setPlaylists(userPlaylists);
            }
            catch (error) {
                console.error('Failed to fetch playlists:', error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchPlaylists();
    }, [isAuthenticated]);
    const formatDuration = (totalMs) => {
        const hours = Math.floor(totalMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };
    const transformPlaylistData = (playlist) => {
        var _a, _b;
        return ({
            id: playlist.id,
            name: playlist.name,
            description: playlist.description || 'No description',
            image: ((_b = (_a = playlist.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
            tracks: playlist.tracks.total,
            duration: '2h 30m', // Placeholder - would need to fetch track durations
            lastPlayed: 'Recently'
        });
    };
    if (!isAuthenticated) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Please Connect to Spotify" }), _jsx("p", { className: "text-white/70", children: "You need to authenticate with Spotify to view your dashboard." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold text-white mb-2", children: ["Welcome back, ", user === null || user === void 0 ? void 0 : user.display_name, "!"] }), _jsx("p", { className: "text-white/70 text-lg", children: "Explore your playlists and discover your musical personality" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: stats.map((stat, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(StatsCard, Object.assign({}, stat)) }, stat.label))) }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 }, className: "card", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Your Playlists" }), _jsxs("button", { className: "btn-secondary", children: [_jsx(Users, { className: "h-4 w-4 mr-2" }), "Analyze All"] })] }), loading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => (_jsx("div", { className: "animate-pulse", children: _jsx("div", { className: "bg-white/10 rounded-xl h-64" }) }, i))) })) : playlists.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: playlists.map((playlist, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(PlaylistCard, { playlist: transformPlaylistData(playlist), onAnalyze: () => setSelectedPlaylist(playlist) }) }, playlist.id))) })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx(Music, { className: "h-16 w-16 text-white/30 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "No Playlists Found" }), _jsx("p", { className: "text-white/70", children: "Create some playlists on Spotify to get started!" })] }))] })] }) }));
};
export default Dashboard;
