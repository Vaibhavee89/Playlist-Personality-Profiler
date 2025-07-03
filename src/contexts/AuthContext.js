var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { spotifyAuth } from '../services/spotifyAuth';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = spotifyAuth.isAuthenticated() && !!user;
    const login = () => {
        const authUrl = spotifyAuth.generateAuthUrl();
        window.location.href = authUrl;
    };
    const logout = () => {
        spotifyAuth.logout();
        setUser(null);
    };
    const refreshUser = () => __awaiter(void 0, void 0, void 0, function* () {
        if (spotifyAuth.isAuthenticated()) {
            try {
                const userData = yield spotifyAuth.getCurrentUser();
                setUser(userData);
            }
            catch (error) {
                console.error('Failed to fetch user data:', error);
                logout();
            }
        }
    });
    useEffect(() => {
        const initAuth = () => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            if (spotifyAuth.isAuthenticated()) {
                yield refreshUser();
            }
            setIsLoading(false);
        });
        initAuth();
    }, []);
    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshUser,
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
