import React, {useEffect, useState} from "react";
import {
    addTrackLink,
    base,
    body,
    client_id,
    client_secret,
    recently,
    redirect_uri,
    TOKEN,
    withUserId,
} from "./Constants";
import {useDispatch, useSelector} from "react-redux";
import {loginHandler} from "./redux/Actions";
import {useApiProgress} from "./functions/PendingApiCall.jsx";
import {Card} from "./components/ArtistCards";
import {getBase64, getData, postData, putData} from "./functions/ApiRequests";
import {Button} from "@mui/material";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Title from "./components/Title";
import Spinner from "./components/Spinner";
import Track from "./components/Track";
import LastTracks from "./components/LastTracks";

export default function App() {
    const {isLoggedIn, data, text, userId, last} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        data: store.data,
        text: store.text,
        userId: store.userId,
        last: store.last
    }));
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);


    const playlistSpecs = (name, description) => {
        return {name, description, public: false};
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

    const successMessage = withReactContent(Swal)

    const createPlaylist = (body) => {
        const url = withUserId + userId + "/playlists";
        return postData(url, body);
    };

    const updateCoverImage = async (playlistId) => {
        const url = base + "/v1/playlists/" + playlistId + "/images";
        const image = await getBase64();
        await putData(url, image);
    };

    const playlistCreateActions= async () => {
        await createPlaylist(
            playlistSpecs(text, "Powered by berkemaktav")
        ).then((response) => {
            updateCoverImage(response.data.id);
            addSongs(data, response.data.id);
            successMessage.fire({
                title: <strong>Playlist Created!</strong>,
                icon: 'success'
            })
        });
    }
    const addSongs = (data, playlistId) => {
        let uris = [];
        let url = addTrackLink(playlistId);
        for (let index = 0; index < data.items.length; index++) {
            const track = data.items[index].uri;
            uris.push(track);
        }
        const json = {uris, position: 0};
        postData(url, json);
        getData(recently)
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
                            return await dispatch(
                                loginHandler(client_id, client_secret, TOKEN, body(code))
                            );
                        } catch (error) {
                        }
                    };
                    await login(code);
                } catch (error) {
                }
            };

            takeData();
        }
    }, [dispatch, data]);

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div>
                        {isLoggedIn && (data || last) && (
                            <Title text={text}/>
                        )}
                        {pendingApiCall && (!data || !last) && (
                            <Spinner/>
                        )}
                        {data &&
                            data.map((item, id) => {
                                return (
                                    <div key={id}>
                                        {item.type === "track" && (
                                            <Track id={id} item={item} width="80" height="80"/>
                                        )}
                                    </div>
                                );
                            })}

                        {data && data[0].type === "track" && (
                            <div className="mt-3 mb-5 text-center">
                                <Button disabled={pendingApiCall}
                                        size="large"
                                        color="secondary"
                                        variant="contained"
                                        onClick={playlistCreateActions}
                                >
                                    Playlist oluştur
                                </Button>
                            </div>
                        )}

                        {data && data[0].type === "artist" && (
                            <Card screenSize={windowSize} items={data}/>
                        )}
                    </div>
                </div>

                {last && last.map((item, id) => {
                    return (<div key={id}>
                            <LastTracks id={id} item={item}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
