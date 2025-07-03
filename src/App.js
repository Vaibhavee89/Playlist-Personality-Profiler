import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Journal from './pages/Journal';
import Callback from './pages/Callback';
import Navbar from './components/Navbar';
function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900", children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/analysis", element: _jsx(Analysis, {}) }), _jsx(Route, { path: "/journal", element: _jsx(Journal, {}) }), _jsx(Route, { path: "/callback", element: _jsx(Callback, {}) })] })] }) }) }));
}
export default App;
