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
import { useState } from 'react';
import { Music, Sparkles, Brain, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
const Home = () => {
    const { login, isAuthenticated } = useAuth();
    const [isConnecting, setIsConnecting] = useState(false);
    const handleSpotifyLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        if (isAuthenticated) {
            return;
        }
        setIsConnecting(true);
        try {
            login();
        }
        catch (error) {
            console.error('Login failed:', error);
            setIsConnecting(false);
        }
    });
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
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: "spring", stiffness: 200 }, className: "inline-flex items-center justify-center w-20 h-20 bg-spotify-green rounded-full mb-6", children: _jsx(Music, { className: "h-10 w-10 text-white" }) }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold text-white mb-6 leading-tight", children: ["Playlist", _jsxs("span", { className: "bg-gradient-to-r from-spotify-green to-green-400 bg-clip-text text-transparent", children: [' ', "Personality"] }), _jsx("br", {}), "Profiler"] }), _jsx("p", { className: "text-xl md:text-2xl text-white/80 mb-8 leading-relaxed", children: "Analyze your Spotify playlist and discover your personality and mood profile through the power of music psychology" })] }), !isAuthenticated && (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleSpotifyLogin, disabled: isConnecting, className: "btn-primary text-lg px-8 py-4 mb-12 disabled:opacity-50 disabled:cursor-not-allowed", children: isConnecting ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" }), _jsx("span", { children: "Connecting..." })] })) : (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Music, { className: "h-5 w-5" }), _jsx("span", { children: "Connect with Spotify" })] })) })), isAuthenticated && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-12", children: _jsxs("div", { className: "bg-spotify-green/20 border border-spotify-green/30 rounded-lg p-4 mb-6", children: [_jsx("p", { className: "text-white font-medium", children: "\u2705 Connected to Spotify!" }), _jsx("p", { className: "text-white/70 text-sm", children: "You can now explore your musical personality" })] }) })), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 + index * 0.1 }, className: "personality-card text-center", children: [_jsx(feature.icon, { className: `h-8 w-8 ${feature.color} mx-auto mb-4` }), _jsx("h3", { className: "text-white font-semibold text-lg mb-2", children: feature.title }), _jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: feature.description })] }, feature.title))) })] }) }));
};
export default Home;
