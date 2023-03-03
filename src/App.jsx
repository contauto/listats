/* eslint-disable no-unused-vars */

import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "./buttonOverride.scss";

import React, { useEffect, useState } from "react";
import { auth, getData } from "./ApiRequests";
import {
  AUTHORIZE,
  TOKEN,
  TRACK_LONG_TERM,
  TRACK_MEDIUM_TERM,
  TRACK_SHORT_TERM,
  body,
  client_id,
  client_secret,
  redirect_uri,
} from "./Constants";
import { ARTIST_LONG_TERM } from "./Constants";
import { ARTIST_SHORT_TERM } from "./Constants";
import { ARTIST_MEDIUM_TERM } from "./Constants";
import { useDispatch } from "react-redux";
import { loginHandler } from "./redux/Actions";

export default function App() {
  const [shortTracks, setShortTracks] = useState();
  const [mediumTracks, setMediumTracks] = useState();
  const [longTracks, setLongTracks] = useState();

  const [shortArtists, setShortArtists] = useState();
  const [mediumArtists, setMediumArtists] = useState();
  const [longArtists, setLongArtists] = useState();


  const dispatch=useDispatch()

  const requestAuthorization = () => {
    window.location.href = AUTHORIZE();
  };

  const handleRedirect = () => {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
    }
    window.history.pushState("", "", redirect_uri);
    return code;
  };

  

  useEffect(() => {
    if (window.location.search.length > 0) {
      const code = handleRedirect();
      const takeData = async () => {
        try {
          const login = async (code) => {
            try {
              const response =await dispatch(loginHandler(client_id, client_secret, TOKEN, body(code)));
              return response;
            } catch (error) {
              console.log("login", error);
            }
          };
          const response = (await login(code))
          const access_token=response.response.data.access_token;
          const refresh_token=response.response.data.refresh_token;

          const trackShort = await getData(TRACK_SHORT_TERM);
          setShortTracks(trackShort);

          const trackMedium = await getData(TRACK_MEDIUM_TERM);
          setMediumTracks(trackMedium);

          const trackLong = await getData(TRACK_LONG_TERM);
          setLongTracks(trackLong);

          const artistShort = await getData(ARTIST_SHORT_TERM);
          setShortArtists(artistShort);

          const artistMedium = await getData(ARTIST_MEDIUM_TERM);
          setMediumArtists(artistMedium);

          const artistLong = await getData(ARTIST_LONG_TERM);
          setLongArtists(artistLong);
        } catch (error) {
          console.log("takeData", error);
        }
      };

      takeData();
    }
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        {!shortTracks && window.location.search.length === 0 && (
          <AwesomeButton
            type="primary"
            cssModule={AwesomeButtonStyles}
            onPress={() => {
              requestAuthorization();
            }}
          >
            Button
          </AwesomeButton>
        )}
        {shortTracks && (shortTracks.data.items.map((track,id)=>{return (<li key={id}>{track.name}</li>)}))}
      </div>
    </div>
  );
}
