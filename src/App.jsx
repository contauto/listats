import React, { useEffect } from "react";
import {
  TOKEN,
  TRACK_SHORT_TERM,
  body,
  client_id,
  client_secret,
  redirect_uri,
} from "./Constants";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "./redux/Actions";
import { useApiProgress } from "./PendingApiCall.jsx";

export default function App() {
  const { shortTracks, isLoggedIn } = useSelector((store) => ({
    shortTracks: store.shortTracks,
    isLoggedIn: store.isLoggedIn,
  }));

  const dispatch = useDispatch();
  const pendingApiCall = useApiProgress("get", TRACK_SHORT_TERM);

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

  let text = "Top Tracks-Last 4 Weeks";

  useEffect(() => {
    if (window.location.search.length > 0) {
      const code = handleRedirect();
      const takeData = async () => {
        try {
          const login = async (code) => {
            try {
              const response = await dispatch(
                loginHandler(client_id, client_secret, TOKEN, body(code))
              );
              return response;
            } catch (error) {
              console.log("login", error);
            }
          };
          await login(code);
        } catch (error) {
          console.log("takeData", error);
        }
      };

      takeData();
    }
  }, [dispatch]);

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            {isLoggedIn && shortTracks && (
              <div className="text-center">
                
                <h3 >{text}</h3>
              </div>
            )}
            {!isLoggedIn && pendingApiCall && (
              <div
                className="spinner-border position-absolute top-50 start-50"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {shortTracks &&
              shortTracks.items.map((track, id) => {
                return (
                  <div key={track.preview_url}>
                    <span className="bold" key={track.popularity}>
                      {id + 1 < 10 ? "0" + (id + 1) : id + 1}
                    </span>
                    <img
                      key={id}
                      src={track.album.images[2].url}
                      className="img-thumbnail m-2 p-0"
                      alt="album-cover"
                    ></img>
                    <span className="bold" key={track.name}>
                      {track.name.length > 70
                        ? track.name.slice(0, 70)
                        : track.name}
                    </span>
                    <q className="bold float-end mt-4" key={track.id}>
                      {track.artists[0].name}
                    </q>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
