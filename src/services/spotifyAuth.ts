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

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
  followers: { total: number };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  tracks: { total: number };
  owner: { display_name: string };
  public: boolean;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { name: string; images: Array<{ url: string }> };
  duration_ms: number;
  popularity: number;
}

export interface AudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
}

class SpotifyAuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage() {
    this.accessToken = Cookies.get('spotify_access_token') || null;
    this.refreshToken = Cookies.get('spotify_refresh_token') || null;
    const expiry = Cookies.get('spotify_token_expiry');
    this.tokenExpiry = expiry ? parseInt(expiry) : null;
  }

  private saveTokensToStorage(accessToken: string, refreshToken?: string, expiresIn?: number) {
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

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
    Cookies.remove('spotify_access_token');
    Cookies.remove('spotify_refresh_token');
    Cookies.remove('spotify_token_expiry');
  }

  generateAuthUrl(): string {
    const state = Math.random().toString(36).substring(2, 15);
    Cookies.set('spotify_auth_state', state, { expires: 1/24 }); // 1 hour

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

  async handleCallback(code: string, state: string): Promise<boolean> {
    const savedState = Cookies.get('spotify_auth_state');
    if (state !== savedState) {
      throw new Error('State mismatch - possible CSRF attack');
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
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

      const data = await response.json();
      this.saveTokensToStorage(data.access_token, data.refresh_token, data.expires_in);
      Cookies.remove('spotify_auth_state');
      
      return true;
    } catch (error) {
      console.error('Error during token exchange:', error);
      return false;
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
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

      const data = await response.json();
      this.saveTokensToStorage(data.access_token, data.refresh_token || this.refreshToken, data.expires_in);
      
      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.clearTokens();
      return false;
    }
  }

  private async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    // Check if token is expired and refresh if needed
    if (this.tokenExpiry && Date.now() >= this.tokenExpiry) {
      const refreshed = await this.refreshAccessToken();
      if (!refreshed) {
        throw new Error('Failed to refresh token');
      }
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (response.status === 401) {
      // Token might be invalid, try to refresh
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        // Retry the request with new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${this.accessToken}`,
          },
        });
      } else {
        throw new Error('Authentication failed');
      }
    }

    return response;
  }

  async getCurrentUser(): Promise<SpotifyUser> {
    const response = await this.makeAuthenticatedRequest('https://api.spotify.com/v1/me');
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  }

  async getUserPlaylists(limit: number = 20): Promise<SpotifyPlaylist[]> {
    const response = await this.makeAuthenticatedRequest(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }

    const data = await response.json();
    return data.items;
  }

  async getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
    const response = await this.makeAuthenticatedRequest(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch playlist tracks');
    }

    const data = await response.json();
    return data.items.map((item: any) => item.track).filter((track: any) => track && track.id);
  }

  async getAudioFeatures(trackIds: string[]): Promise<AudioFeatures[]> {
    const chunks = [];
    for (let i = 0; i < trackIds.length; i += 100) {
      chunks.push(trackIds.slice(i, i + 100));
    }

    const allFeatures: AudioFeatures[] = [];
    
    for (const chunk of chunks) {
      const response = await this.makeAuthenticatedRequest(
        `https://api.spotify.com/v1/audio-features?ids=${chunk.join(',')}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch audio features');
      }

      const data = await response.json();
      allFeatures.push(...data.audio_features.filter((f: any) => f !== null));
    }

    return allFeatures;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken && (!this.tokenExpiry || Date.now() < this.tokenExpiry);
  }

  logout() {
    this.clearTokens();
  }
}

export const spotifyAuth = new SpotifyAuthService();