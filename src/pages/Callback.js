var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, AlertCircle } from 'lucide-react';
import { spotifyAuth } from '../services/spotifyAuth';
import { useAuth } from '../contexts/AuthContext';
const Callback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState('');
    const { refreshUser } = useAuth();
    useEffect(() => {
        const handleCallback = () => __awaiter(void 0, void 0, void 0, function* () {
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            const error = searchParams.get('error');
            if (error) {
                setStatus('error');
                setError('Authorization was denied or cancelled');
                return;
            }
            if (!code || !state) {
                setStatus('error');
                setError('Missing authorization code or state parameter');
                return;
            }
            try {
                const success = yield spotifyAuth.handleCallback(code, state);
                if (success) {
                    yield refreshUser();
                    setStatus('success');
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                }
                else {
                    setStatus('error');
                    setError('Failed to complete authentication');
                }
            }
            catch (err) {
                setStatus('error');
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            }
        });
        handleCallback();
    }, [searchParams, navigate, refreshUser]);
    const handleRetry = () => {
        navigate('/');
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-md mx-auto", children: [status === 'loading' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-b-2 border-spotify-green mx-auto mb-6" }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Connecting to Spotify" }), _jsx("p", { className: "text-white/70", children: "Please wait while we complete the authentication..." })] })), status === 'success' && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: "spring", stiffness: 200 }, className: "inline-flex items-center justify-center w-16 h-16 bg-spotify-green rounded-full mb-6", children: _jsx(Music, { className: "h-8 w-8 text-white" }) }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Successfully Connected!" }), _jsx("p", { className: "text-white/70", children: "Redirecting to your dashboard..." })] })), status === 'error' && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: "spring", stiffness: 200 }, className: "inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-6", children: _jsx(AlertCircle, { className: "h-8 w-8 text-white" }) }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Authentication Failed" }), _jsx("p", { className: "text-white/70 mb-6", children: error }), _jsx("button", { onClick: handleRetry, className: "btn-primary", children: "Try Again" })] }))] }) }));
};
export default Callback;
