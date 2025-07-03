import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const PersonalityChart = ({ data }) => {
    const traits = [
        { key: 'openness', label: 'Openness', color: 'bg-personality-openness' },
        { key: 'conscientiousness', label: 'Conscientiousness', color: 'bg-personality-conscientiousness' },
        { key: 'extraversion', label: 'Extraversion', color: 'bg-personality-extraversion' },
        { key: 'agreeableness', label: 'Agreeableness', color: 'bg-personality-agreeableness' },
        { key: 'neuroticism', label: 'Neuroticism', color: 'bg-personality-neuroticism' }
    ];
    return (_jsx("div", { className: "space-y-6", children: traits.map((trait, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-white font-medium", children: trait.label }), _jsxs("span", { className: "text-white/70 font-semibold", children: [data[trait.key], "%"] })] }), _jsx("div", { className: "w-full bg-white/10 rounded-full h-3", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${data[trait.key]}%` }, transition: { delay: 0.5 + index * 0.1, duration: 0.8 }, className: `h-3 rounded-full ${trait.color}` }) })] }, trait.key))) }));
};
export default PersonalityChart;
