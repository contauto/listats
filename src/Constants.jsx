import SecureLS from 'secure-ls';

export const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
export const client_id = import.meta.env.VITE_CLIENT_ID;
export const client_secret = import.meta.env.VITE_CLIENT_SECRET;
export const unsplash_access_key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const unsplashRandomImageUrl = 'https://api.unsplash.com/photos/random';

export const REFRESH = () => {
  const secureLs = new SecureLS();
  const listatsAuth = secureLs.get('listats-auth');
  return listatsAuth.refresh_token;
};

export const AUTHORIZE = () => {
  let url = 'https://accounts.spotify.com/authorize';
  url += '?client_id=' + client_id;
  url += '&response_type=code';
  url += '&redirect_uri=' + redirect_uri;
  url += '&show_dialog=true';
  url += '&scope=ugc-image-upload user-top-read playlist-modify-private user-read-recently-played';
  return url;
};

export const body = (code) => {
  let b = 'grant_type=authorization_code';
  b += '&code=' + code;
  b += '&redirect_uri=' + redirect_uri;
  b += '&client_id=' + client_id;
  b += '&client_secret=' + client_secret;
  return b;
};

export const refreshBody = () => {
  const refresh_token = REFRESH();
  let b = 'grant_type=refresh_token';
  b += '&refresh_token=' + refresh_token;
  b += '&client_id=' + client_id;
  return b;
};

export const TOKEN = 'https://accounts.spotify.com/api/token';
export const ME = 'https://api.spotify.com/v1/me/';
export const base = 'https://api.spotify.com';
export const withUserId = 'https://api.spotify.com/v1/users/';
export const recently = base + '/v1/me/player/recently-played';

export const TRACK_SHORT_TERM = base + '/v1/me/top/tracks?limit=50&time_range=short_term';
export const TRACK_MEDIUM_TERM = base + '/v1/me/top/tracks?limit=50&time_range=medium_term';
export const TRACK_LONG_TERM = base + '/v1/me/top/tracks?limit=50&time_range=long_term';

export const ARTIST_SHORT_TERM = base + '/v1/me/top/artists?limit=50&time_range=short_term';
export const ARTIST_MEDIUM_TERM = base + '/v1/me/top/artists?limit=50&time_range=medium_term';
export const ARTIST_LONG_TERM = base + '/v1/me/top/artists?limit=50&time_range=long_term';

export const getRecommendationsUrl = (seedTracks) => {
  const seeds = seedTracks.slice(0, 5).map(t => t.id).join(',');
  return `${base}/v1/recommendations?limit=20&seed_tracks=${seeds}`;
};

export const addTrackLink = (playlistId) => `${base}/v1/playlists/${playlistId}/tracks`;

export const githubUrl = 'https://github.com/contauto/listats/blob/master/README.md';