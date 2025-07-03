import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const StatsCard = ({ label, value, icon: Icon, color }) => {
    return (_jsx(motion.div, { whileHover: { scale: 1.02 }, className: "card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white/70 text-sm font-medium", children: label }), _jsx("p", { className: "text-white text-2xl font-bold mt-1", children: value })] }), _jsx("div", { className: `p-3 rounded-full bg-white/10 ${color}`, children: _jsx(Icon, { className: "h-6 w-6" }) })] }) }));
};
export default StatsCard;
