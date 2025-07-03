import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, AlertCircle } from 'lucide-react';
import { spotifyAuth } from '../services/spotifyAuth';
import { useAuth } from '../contexts/AuthContext';

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
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
        const success = await spotifyAuth.handleCallback(code, state);
        
        if (success) {
          await refreshUser();
          setStatus('success');
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setStatus('error');
          setError('Failed to complete authentication');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    };

    handleCallback();
  }, [searchParams, navigate, refreshUser]);

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-spotify-green mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Connecting to Spotify</h2>
            <p className="text-white/70">Please wait while we complete the authentication...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-spotify-green rounded-full mb-6"
            >
              <Music className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Successfully Connected!</h2>
            <p className="text-white/70">Redirecting to your dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-6"
            >
              <AlertCircle className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
            <p className="text-white/70 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="btn-primary"
            >
              Try Again
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Callback;