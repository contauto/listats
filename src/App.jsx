import React, { useEffect, useState } from "react";
import {
  TOKEN,
  base,
  body,
  client_id,
  client_secret,
  redirect_uri,
  withUserId,
} from "./Constants";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "./redux/Actions";
import { useApiProgress } from "./PendingApiCall.jsx";
import { Card } from "./CardComponent";
import { getBase64, postData, putData } from "./ApiRequests";
import { Button } from "@mui/material";

export default function App() {
  const { isLoggedIn, data, text, userId } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    data: store.data,
    text: store.text,
    userId: store.userId,
  }));
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const playlistSpecs = (name, description) => {
    const array = { name, description, public: false };
    return array;
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const dispatch = useDispatch();
  const pendingApiCall = useApiProgress("get", base, false);

  const createPlaylist = (body) => {
    const url = withUserId + userId + "/playlists";
    return postData(url, body);
  };

  const updateCoverImage = async (playlistId) => {
    const url = base + "/v1/playlists/" + playlistId + "/images";
    const image = await getBase64();
    await putData(url, image);
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
              const response = await dispatch(
                loginHandler(client_id, client_secret, TOKEN, body(code))
              );

              return response;
            } catch (error) {}
          };
          await login(code);
        } catch (error) {}
      };

      takeData();
    }
  }, [dispatch, data]);

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div>
            {isLoggedIn && data && (
              <div className="text-center">
                <h3>{text}</h3>
              </div>
            )}
            {pendingApiCall && !data && (
              <div
                className="spinner-border position-absolute top-50 start-50"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {data &&
              data.items.map((item, id) => {
                return (
                  <React.Fragment key={id}>
                    {item.type === "track" && (
                      <div key={id + 50}>
                        <span className="bold" key={id + 100}>
                          {id + 1 < 10 ? "0" + (id + 1) : id + 1}
                        </span>
                        <img
                          key={id + 150}
                          src={item.album.images[1].url}
                          className="img-thumbnail m-2 p-0"
                          alt="album-cover"
                          height={80}
                          width={80}
                        ></img>
                        <span className="bold" key={id + 200}>
                          {item.name.length > 60
                            ? item.name.slice(0, 60)
                            : item.name}
                        </span>

                        <q className="bold float-end mt-4" key={id + 250}>
                          {item.artists[0].name}
                        </q>
                        <br />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

            {data && data.items[0].type === "track" && (
              <div className="mt-3 mb-5 text-center">
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  onClick={async () => {
                    await createPlaylist(
                      playlistSpecs(text, "Powered by berkemaktav")
                    ).then((response) => {
                      console.log(response);
                      updateCoverImage(response.data.id);
                    });
                  }}
                >
                  Playlist oluştur
                </Button>
              </div>
            )}

            {data && data.items[0].type === "artist" && (
              <Card screenSize={windowSize} items={data.items} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
