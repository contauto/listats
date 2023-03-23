import SecureLS from "secure-ls";

export const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
export const client_id = process.env.REACT_APP_CLIENT_ID;
export const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export const REFRESH=()=>{
  const secureLs = new SecureLS();
  const listatsAuth = secureLs.get("listats-auth");
  return listatsAuth.refresh_token
}

export const AUTHORIZE = () => {
  let url = "https://accounts.spotify.com/authorize";
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + (redirect_uri);
  url += "&show_dialog=true";
  url +=
    "&scope= ugc-image-upload user-top-read playlist-modify-private user-read-recently-played";
  return url;
};

export const body = (code) => {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + (redirect_uri);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;
  return body;
};

export const refreshBody = () => {
  const refresh_token=REFRESH()
  let body = "grant_type=refresh_token";
  body += "&refresh_token=" + refresh_token;
  body += "&client_id=" + client_id;
  return body;
};

export const TOKEN = "https://accounts.spotify.com/api/token";

export const ME = "https://api.spotify.com/v1/me/";

export const TRACK_SHORT_TERM =
  "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term";
export const TRACK_MEDIUM_TERM =
  "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term";
export const TRACK_LONG_TERM =
  "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term";

export const ARTIST_SHORT_TERM =
  "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term";
export const ARTIST_MEDIUM_TERM =
  "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term";
export const ARTIST_LONG_TERM =
  "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term";

export const base = "https://api.spotify.com";

export const withUserId="https://api.spotify.com/v1/users/"

export const recently=base+"/v1/me/player/recently-played"

export const addTrackLink=(playlistId)=>{return base+"/v1/playlists/"+playlistId+"/tracks"}