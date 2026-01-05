import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { loginHandler } from './redux/Actions';
import { useApiProgress } from './functions/PendingApiCall';
import { getBase64, postData, putData } from './functions/ApiRequests';
import {
    addTrackLink,
    base,
    body,
    client_id,
    client_secret,
    redirect_uri,
    TOKEN,
    withUserId
} from './Constants';
import Title from './components/Title';
import Spinner from './components/Spinner';
import Track from './components/Track';
import LastTracks from './components/LastTracks';
import Artist from './components/Artist';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoggedIn, data, text, userId, last } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        data: store.data,
        text: store.text,
        userId: store.userId,
        last: store.last
    }), shallowEqual);

    const pendingGetCall = useApiProgress('get', base, false);
    const pendingPostCall = useApiProgress('post', base, false);

    const createPlaylist = (playlistBody) => {
        return postData(withUserId + userId + '/playlists', playlistBody);
    };

    const updateCoverImage = async (playlistId) => {
        const url = base + '/v1/playlists/' + playlistId + '/images';
        const imageData = await getBase64();
        await putData(url, imageData);
    };

    const addSongs = (tracks, playlistId) => {
        const uris = tracks.map(track => track.uri);
        postData(addTrackLink(playlistId), { uris, position: 0 });
    };

    const handleCreatePlaylist = async () => {
        try {
            const response = await createPlaylist({
                name: text,
                description: 'Powered by Listats - listats.netlify.app',
                public: false
            });
            await updateCoverImage(response.data.id);
            addSongs(data, response.data.id);
            Swal.fire({
                title: t('common.playlistCreated'),
                icon: 'success',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                confirmButtonColor: '#1db954'
            });
        } catch (error) {
            Swal.fire({
                title: t('errors.loadFailed'),
                icon: 'error',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
            });
        }
    };

    const handleRedirect = () => {
        let code = null;
        const queryString = window.location.search;
        if (queryString.length > 0) {
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code');
        }
        window.history.pushState('', '', redirect_uri);
        return code;
    };

    useEffect(() => {
        if (window.location.search.length > 0) {
            const code = handleRedirect();
            const authenticate = async () => {
                try {
                    await dispatch(loginHandler(client_id, client_secret, TOKEN, body(code)));
                } catch (error) { }
            };
            authenticate();
        }
    }, [dispatch]);

    return (
        <motion.div
            className="app-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <AnimatePresence>
                    {isLoggedIn && (data || last) && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <Title text={text} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Show Dashboard when no data is displayed */}
                {!pendingGetCall && !data && !last && <Dashboard />}

                {pendingGetCall && !data && !last && <Spinner />}

                {data && data[0]?.type === 'track' && (
                    <>
                        <div className="tracks-grid">
                            {data.map((item, id) => (
                                <Track key={item.id || id} id={id} item={item} />
                            ))}
                        </div>
                        <motion.div
                            className="create-playlist-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <button
                                className="btn-primary create-btn"
                                onClick={handleCreatePlaylist}
                                disabled={pendingGetCall || pendingPostCall}
                            >
                                {pendingGetCall || pendingPostCall ? (
                                    <>
                                        <span className="spinner" />
                                        {t('common.creating')}
                                    </>
                                ) : (
                                    t('common.createPlaylist')
                                )}
                            </button>
                        </motion.div>
                    </>
                )}

                {data && data[0]?.type === 'artist' && (
                    <div className="artists-grid">
                        {data.map((artist, index) => (
                            <Artist key={artist.id} artist={artist} index={index} />
                        ))}
                    </div>
                )}

                {last && (
                    <div className="last-tracks-container">
                        {last.map((item, id) => (
                            <LastTracks key={id} item={item} id={id} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default App;
