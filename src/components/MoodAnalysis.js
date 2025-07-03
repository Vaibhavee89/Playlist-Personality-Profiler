import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Heart, Zap, Music, Mic } from 'lucide-react';
const MoodAnalysis = ({ data }) => {
    const getMoodDescription = () => {
        const { valence, energy } = data;
        if (valence > 0.7 && energy > 0.7) {
            return {
                mood: 'Energetic & Joyful',
                description: 'Your music taste reflects an upbeat, optimistic personality. You likely use music to energize and motivate yourself.',
                color: 'text-yellow-400',
                icon: Zap
            };
        }
        else if (valence > 0.6 && energy < 0.5) {
            return {
                mood: 'Calm & Content',
                description: 'You prefer peaceful, positive music that creates a serene atmosphere. Music is your sanctuary for relaxation.',
                color: 'text-green-400',
                icon: Heart
            };
        }
        else if (valence < 0.4 && energy > 0.6) {
            return {
                mood: 'Intense & Passionate',
                description: 'Your playlist shows a preference for emotionally intense music. You connect deeply with powerful, expressive sounds.',
                color: 'text-red-400',
                icon: Music
            };
        }
        else {
            return {
                mood: 'Reflective & Thoughtful',
                description: 'You gravitate toward contemplative music that matches your introspective nature. Music helps you process emotions.',
                color: 'text-blue-400',
                icon: Mic
            };
        }
    };
    const moodInfo = getMoodDescription();
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "card", children: [_jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center", children: [_jsx(moodInfo.icon, { className: `h-6 w-6 mr-2 ${moodInfo.color}` }), "Your Musical Mood Profile"] }), _jsxs("div", { className: "bg-white/5 rounded-lg p-6 border border-white/10", children: [_jsx("h3", { className: `text-xl font-semibold mb-3 ${moodInfo.color}`, children: moodInfo.mood }), _jsx("p", { className: "text-white/80 leading-relaxed mb-6", children: moodInfo.description }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-white mb-1", children: [Math.round(data.valence * 100), "%"] }), _jsx("div", { className: "text-white/60 text-sm", children: "Positivity" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-white mb-1", children: [Math.round(data.energy * 100), "%"] }), _jsx("div", { className: "text-white/60 text-sm", children: "Energy" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-white mb-1", children: [Math.round(data.danceability * 100), "%"] }), _jsx("div", { className: "text-white/60 text-sm", children: "Danceability" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-white mb-1", children: [Math.round(data.acousticness * 100), "%"] }), _jsx("div", { className: "text-white/60 text-sm", children: "Acoustic" })] })] })] })] }));
};
export default MoodAnalysis;
