import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { Music, User, BookOpen, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const Navbar = () => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();
    const navItems = [
        { path: '/', icon: Music, label: 'Home' },
        { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
        { path: '/analysis', icon: User, label: 'Analysis' },
        { path: '/journal', icon: BookOpen, label: 'Journal' },
    ];
    return (_jsx("nav", { className: "bg-black/20 backdrop-blur-md border-b border-white/10", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Music, { className: "h-8 w-8 text-spotify-green" }), _jsx("span", { className: "text-white font-bold text-xl", children: "PlaylistPersonality" })] }), _jsxs("div", { className: "flex items-center space-x-8", children: [_jsx("div", { className: "flex space-x-8", children: navItems.map(({ path, icon: Icon, label }) => (_jsxs(Link, { to: path, className: `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === path
                                        ? 'text-spotify-green bg-white/10'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'}`, children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { children: label })] }, path))) }), isAuthenticated && user && (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [user.images && user.images.length > 0 ? (_jsx("img", { src: user.images[0].url, alt: user.display_name, className: "w-8 h-8 rounded-full" })) : (_jsx("div", { className: "w-8 h-8 bg-white/20 rounded-full flex items-center justify-center", children: _jsx(User, { className: "h-4 w-4 text-white" }) })), _jsx("span", { className: "text-white text-sm font-medium", children: user.display_name })] }), _jsx("button", { onClick: logout, className: "text-white/70 hover:text-white transition-colors duration-200 p-2", title: "Logout", children: _jsx(LogOut, { className: "h-4 w-4" }) })] }))] })] }) }) }));
};
export default Navbar;
