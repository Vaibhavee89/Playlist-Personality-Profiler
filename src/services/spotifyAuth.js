var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cookies from 'js-cookie';
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
    'user-read-recently-played'
].join(' ');
class SpotifyAuthService {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiry = null;
        this.loadTokensFromStorage();
    }
    loadTokensFromStorage() {
        this.accessToken = Cookies.get('spotify_access_token') || null;
        this.refreshToken = Cookies.get('spotify_refresh_token') || null;
        const expiry = Cookies.get('spotify_token_expiry');
        this.tokenExpiry = expiry ? parseInt(expiry) : null;
    }
    saveTokensToStorage(accessToken, refreshToken, expiresIn) {
        this.accessToken = accessToken;
        Cookies.set('spotify_access_token', accessToken, { expires: 1 });
        if (refreshToken) {
            this.refreshToken = refreshToken;
            Cookies.set('spotify_refresh_token', refreshToken, { expires: 30 });
        }
        if (expiresIn) {
            this.tokenExpiry = Date.now() + (expiresIn * 1000);
            Cookies.set('spotify_token_expiry', this.tokenExpiry.toString(), { expires: 1 });
        }
    }
    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiry = null;
        Cookies.remove('spotify_access_token');
        Cookies.remove('spotify_refresh_token');
        Cookies.remove('spotify_token_expiry');
    }
    generateAuthUrl() {
        const state = Math.random().toString(36).substring(2, 15);
        Cookies.set('spotify_auth_state', state, { expires: 1 / 24 }); // 1 hour
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPES,
            redirect_uri: REDIRECT_URI,
            state: state,
            show_dialog: 'true'
        });
        return `https://accounts.spotify.com/authorize?${params.toString()}`;
    }
    handleCallback(code, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedState = Cookies.get('spotify_auth_state');
            if (state !== savedState) {
                throw new Error('State mismatch - possible CSRF attack');
            }
            try {
                const response = yield fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: REDIRECT_URI,
                        client_id: CLIENT_ID,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to exchange code for token');
                }
                const data = yield response.json();
                this.saveTokensToStorage(data.access_token, data.refresh_token, data.expires_in);
                Cookies.remove('spotify_auth_state');
                return true;
            }
            catch (error) {
                console.error('Error during token exchange:', error);
                return false;
            }
        });
    }
    refreshAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.refreshToken) {
                return false;
            }
            try {
                const response = yield fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'refresh_token',
                        refresh_token: this.refreshToken,
                        client_id: CLIENT_ID,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to refresh token');
                }
                const data = yield response.json();
                this.saveTokensToStorage(data.access_token, data.refresh_token || this.refreshToken, data.expires_in);
                return true;
            }
            catch (error) {
                console.error('Error refreshing token:', error);
                this.clearTokens();
                return false;
            }
        });
    }
    makeAuthenticatedRequest(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, options = {}) {
            if (!this.accessToken) {
                throw new Error('No access token available');
            }
            // Check if token is expired and refresh if needed
            if (this.tokenExpiry && Date.now() >= this.tokenExpiry) {
                const refreshed = yield this.refreshAccessToken();
                if (!refreshed) {
                    throw new Error('Failed to refresh token');
                }
            }
            const response = yield fetch(url, Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, options.headers), { 'Authorization': `Bearer ${this.accessToken}` }) }));
            if (response.status === 401) {
                // Token might be invalid, try to refresh
                const refreshed = yield this.refreshAccessToken();
                if (refreshed) {
                    // Retry the request with new token
                    return fetch(url, Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, options.headers), { 'Authorization': `Bearer ${this.accessToken}` }) }));
                }
                else {
                    throw new Error('Authentication failed');
                }
            }
            return response;
        });
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.makeAuthenticatedRequest('https://api.spotify.com/v1/me');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        });
    }
    getUserPlaylists() {
        return __awaiter(this, arguments, void 0, function* (limit = 20) {
            const response = yield this.makeAuthenticatedRequest(`https://api.spotify.com/v1/me/playlists?limit=${limit}`);
            if (!response.ok) {
                throw new Error('Failed to fetch playlists');
            }
            const data = yield response.json();
            return data.items;
        });
    }
    getPlaylistTracks(playlistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.makeAuthenticatedRequest(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`);
            if (!response.ok) {
                throw new Error('Failed to fetch playlist tracks');
            }
            const data = yield response.json();
            return data.items.map((item) => item.track).filter((track) => track && track.id);
        });
    }
    getAudioFeatures(trackIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const chunks = [];
            for (let i = 0; i < trackIds.length; i += 100) {
                chunks.push(trackIds.slice(i, i + 100));
            }
            const allFeatures = [];
            for (const chunk of chunks) {
                const response = yield this.makeAuthenticatedRequest(`https://api.spotify.com/v1/audio-features?ids=${chunk.join(',')}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch audio features');
                }
                const data = yield response.json();
                allFeatures.push(...data.audio_features.filter((f) => f !== null));
            }
            return allFeatures;
        });
    }
    isAuthenticated() {
        return !!this.accessToken && (!this.tokenExpiry || Date.now() < this.tokenExpiry);
    }
    logout() {
        this.clearTokens();
    }
}
export const spotifyAuth = new SpotifyAuthService();
