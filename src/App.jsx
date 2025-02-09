import React, {useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
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
import {getBase64, getData, postData, putData} from "./functions/ApiRequests";
import {Button} from "@mui/material";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Title from "./components/Title";
import Spinner from "./components/Spinner";
import Track from "./components/Track";
import LastTracks from "./components/LastTracks";
import Artist from "./components/Artist";

export default function App() {
    const {isLoggedIn, data, text, userId, last} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        data: store.data,
        text: store.text,
        userId: store.userId,
        last: store.last
    }));
    const dispatch = useDispatch();
    const pendingGetCall = useApiProgress("get", base, false);
    const pendingPostCall = useApiProgress("post", base, false);

    const successMessage = withReactContent(Swal)

    const playlistSpecs = (name, description) => {
        return {name, description, public: false};
    };

    const createPlaylist = (body) => {
        const url = withUserId + userId + "/playlists";
        return postData(url, body);
    };

    const updateCoverImage = async (playlistId) => {
        const url = base + "/v1/playlists/" + playlistId + "/images";
        const response = await getBase64();
        await putData(url, response);
    };

    const playlistCreateActions= async () => {
        await createPlaylist(
            playlistSpecs(text, "Powered by Listats, listats.netlify.app")
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
        for (let index = 0; index < data.length; index++) {
            const track = data[index].uri;
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

    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5 }}
        >
            <div className="container mt-4">
                <div className="row">
                    <div>
                        <AnimatePresence>
                            {isLoggedIn && (data || last) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Title text={text}/>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {pendingGetCall && (!data && !last) && (
                            <Spinner/>
                        )}

                        <div className="tracks-grid">
                            <AnimatePresence>
                                {data && data.map((item, id) => (
                                    <motion.div 
                                        key={id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: id * 0.1 }}
                                        className="track-item"
                                    >
                                        {item.type === "track" && (
                                            <Track id={id} item={item} width="80" height="80"/>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {data && data[0]?.type === "track" && (
                                <motion.div 
                                    className="mt-3 mb-5 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                >
                                    <Button 
                                        disabled={pendingGetCall}
                                        onClick={playlistCreateActions}
                                        className="create-playlist-btn"
                                        variant="contained"
                                        sx={{
                                            background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #333333 0%, #1a1a1a 100%)',
                                            }
                                        }}
                                    >
                                        {(pendingGetCall||pendingPostCall) ? (
                                            <>
                                                <span className="spinner-border"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Playlist"
                                        )}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {data && data[0]?.type === "artist" && (
                                <motion.div
                                    className="artists-grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {data.map((artist, index) => (
                                        <Artist 
                                            key={artist.id} 
                                            artist={artist} 
                                            index={index}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="last-tracks-container">
                    <AnimatePresence>
                        {last && last.map((item, id) => (
                            <motion.div 
                                key={id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: id * 0.1 }}
                            >
                                <LastTracks width={window.innerWidth} id={id} item={item}/>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
