import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { spotifyAuth, SpotifyUser } from '../services/spotifyAuth';

interface AuthContextType {
  user: SpotifyUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
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

  const refreshUser = async () => {
    if (spotifyAuth.isAuthenticated()) {
      try {
        const userData = await spotifyAuth.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        logout();
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      if (spotifyAuth.isAuthenticated()) {
        await refreshUser();
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};