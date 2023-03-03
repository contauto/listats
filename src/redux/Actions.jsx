import { auth, getData, setAuthorizationHeader } from "../ApiRequests";
import {
  ME,
  TRACK_SHORT_TERM,
  TRACK_LONG_TERM,
  TRACK_MEDIUM_TERM,
  ARTIST_LONG_TERM,
  ARTIST_MEDIUM_TERM,
  ARTIST_SHORT_TERM,
} from "../Constants";
import * as ACTIONS from "./Constants";

export const logoutSuccess = () => {
  return async function (dispatch) {
    dispatch({
      type: ACTIONS.LOGOUT_SUCCESS,
    });
  };
};

export const loginSuccess = (authState) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const loginHandler = (client_id, client_secret, url, body) => {
  return async function (dispatch) {
    const response = await auth(client_id, client_secret, url, body);
    setAuthorizationHeader({
      isLoggedIn: true,
      access_token: response.data.access_token,
    });
    const me = await getData(ME);

    const shortTracks = await getData(TRACK_SHORT_TERM);

    const mediumTracks = getData(TRACK_MEDIUM_TERM);

    const longTracks = getData(TRACK_LONG_TERM);

    const shortArtists = getData(ARTIST_SHORT_TERM);

    const mediumArtists = getData(ARTIST_MEDIUM_TERM);

    const longArtists = getData(ARTIST_LONG_TERM);

    const authState = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      display_name: me.data.display_name,
      image: me.data.images[0].url,
      shortTracks: shortTracks.data,
      mediumTracks: mediumTracks.data,
      longTracks: longTracks.data,
      shortArtists: shortArtists.data,
      mediumArtists: mediumArtists.data,
      longArtists: longArtists.data,
    };
    dispatch(loginSuccess(authState));
    return { response, me };
  };
};
