import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart, Brain } from 'lucide-react';
import JournalPrompt from '../components/JournalPrompt';
const Journal = () => {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    // Mock journal prompts based on musical analysis
    const mockPrompts = [
        {
            id: 1,
            title: 'Emotional Resonance',
            category: 'Mood Reflection',
            prompt: 'Your playlist shows a high valence score, indicating you gravitate toward positive, uplifting music. Reflect on a recent moment when music lifted your spirits. What was happening in your life, and how did the music help you process those emotions?',
            icon: Heart,
            color: 'text-pink-400',
            date: '2025-01-15'
        },
        {
            id: 2,
            title: 'Creative Expression',
            category: 'Personality Insight',
            prompt: 'Your high openness score suggests you appreciate diverse and experimental music. Think about a song that challenged your musical boundaries. What drew you to it initially, and how has your relationship with that type of music evolved?',
            icon: Brain,
            color: 'text-purple-400',
            date: '2025-01-14'
        },
        {
            id: 3,
            title: 'Social Connections',
            category: 'Relationship Reflection',
            prompt: 'Your extraversion score indicates you enjoy energetic, social music. Consider how music has connected you with others. Write about a meaningful musical experience you\'ve shared with someone important to you.',
            icon: Sparkles,
            color: 'text-blue-400',
            date: '2025-01-13'
        }
    ];
    useEffect(() => {
        // Simulate loading prompts
        setTimeout(() => {
            setPrompts(mockPrompts);
            setLoading(false);
        }, 1000);
    }, []);
    return (_jsx("div", { className: "min-h-screen p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold text-white mb-2 flex items-center", children: [_jsx(BookOpen, { className: "h-8 w-8 mr-3 text-spotify-green" }), "Musical Journal"] }), _jsx("p", { className: "text-white/70 text-lg", children: "Reflect on your musical journey with AI-generated prompts based on your personality analysis" })] }), loading ? (_jsx("div", { className: "space-y-6", children: [1, 2, 3].map((i) => (_jsx("div", { className: "animate-pulse card h-32" }, i))) })) : (_jsx("div", { className: "space-y-6", children: prompts.map((prompt, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(JournalPrompt, { prompt: prompt, onSelect: () => setSelectedPrompt(prompt) }) }, prompt.id))) })), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, className: "mt-8 text-center", children: _jsxs("button", { className: "btn-primary", children: [_jsx(Sparkles, { className: "h-5 w-5 mr-2" }), "Generate New Prompt"] }) })] }) }));
};
export default Journal;
