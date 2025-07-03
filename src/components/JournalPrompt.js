import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Edit3, Save, X } from 'lucide-react';
const JournalPrompt = ({ prompt, onSelect }) => {
    const [isWriting, setIsWriting] = useState(false);
    const [response, setResponse] = useState('');
    const handleStartWriting = () => {
        setIsWriting(true);
        onSelect();
    };
    const handleSave = () => {
        // Here you would save the response
        console.log('Saving response:', response);
        setIsWriting(false);
    };
    return (_jsxs(motion.div, { whileHover: { y: -2 }, className: "card", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `p-2 rounded-lg bg-white/10 ${prompt.color}`, children: _jsx(prompt.icon, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold text-lg", children: prompt.title }), _jsxs("div", { className: "flex items-center space-x-2 text-white/60 text-sm", children: [_jsx("span", { children: prompt.category }), _jsx("span", { children: "\u2022" }), _jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-3 w-3 mr-1" }), prompt.date] })] })] })] }), !isWriting && (_jsxs("button", { onClick: handleStartWriting, className: "btn-secondary text-sm px-4 py-2", children: [_jsx(Edit3, { className: "h-4 w-4 mr-2" }), "Write"] }))] }), _jsx("p", { className: "text-white/80 leading-relaxed mb-4", children: prompt.prompt }), isWriting && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, className: "space-y-4", children: [_jsx("textarea", { value: response, onChange: (e) => setResponse(e.target.value), placeholder: "Start writing your reflection...", className: "w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-spotify-green" }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsxs("button", { onClick: () => setIsWriting(false), className: "px-4 py-2 text-white/70 hover:text-white transition-colors duration-200", children: [_jsx(X, { className: "h-4 w-4 mr-2 inline" }), "Cancel"] }), _jsxs("button", { onClick: handleSave, className: "btn-primary text-sm px-4 py-2", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), "Save Entry"] })] })] }))] }));
};
export default JournalPrompt;
