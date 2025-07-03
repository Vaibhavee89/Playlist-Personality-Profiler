import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, TrendingUp } from 'lucide-react';
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
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-b-2 border-spotify-green mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Analyzing Your Musical DNA" }), _jsx("p", { className: "text-white/70", children: "This may take a few moments..." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Your Musical Personality" }), _jsx("p", { className: "text-white/70 text-lg", children: "Deep insights into your personality through music psychology" })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-8 mb-8", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, className: "card", children: [_jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center", children: [_jsx(Brain, { className: "h-6 w-6 mr-2 text-personality-openness" }), "Big Five Personality Traits"] }), _jsx(PersonalityChart, { data: analysisData.personality })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 }, className: "card", children: [_jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center", children: [_jsx(Heart, { className: "h-6 w-6 mr-2 text-pink-400" }), "Mood & Audio Features"] }), _jsx(AudioFeatures, { data: analysisData.mood })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "card mb-8", children: [_jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center", children: [_jsx(TrendingUp, { className: "h-6 w-6 mr-2 text-blue-400" }), "Personality Insights"] }), _jsx("div", { className: "space-y-6", children: personalityInsights.map((insight, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 + index * 0.1 }, className: "bg-white/5 rounded-lg p-6 border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: `text-lg font-semibold ${insight.color}`, children: insight.trait }), _jsxs("span", { className: "text-white/70 font-medium", children: [insight.score, "%"] })] }), _jsx("p", { className: "text-white/80 leading-relaxed", children: insight.description })] }, insight.trait))) })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, children: _jsx(MoodAnalysis, { data: analysisData.mood }) })] }) }));
};
export default Analysis;
