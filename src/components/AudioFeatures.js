import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const AudioFeatures = ({ data }) => {
    const features = [
        { key: 'valence', label: 'Positivity', description: 'How positive/happy your music sounds' },
        { key: 'energy', label: 'Energy', description: 'Intensity and power of your tracks' },
        { key: 'danceability', label: 'Danceability', description: 'How suitable for dancing' },
        { key: 'acousticness', label: 'Acoustic', description: 'Presence of acoustic instruments' }
    ];
    return (_jsx("div", { className: "space-y-4", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("div", { children: [_jsx("span", { className: "text-white font-medium", children: feature.label }), _jsx("p", { className: "text-white/60 text-sm", children: feature.description })] }), _jsxs("span", { className: "text-white/70 font-semibold", children: [Math.round(data[feature.key] * 100), "%"] })] }), _jsx("div", { className: "w-full bg-white/10 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${data[feature.key] * 100}%` }, transition: { delay: 0.5 + index * 0.1, duration: 0.8 }, className: "h-2 rounded-full bg-gradient-to-r from-spotify-green to-green-400" }) })] }, feature.key))) }));
};
export default AudioFeatures;
