import React from 'react';
import { motion } from 'framer-motion';
import './Track.css';

function Track({ id, item }) {
    const { artists, album, name, external_urls } = item;

    const truncate = (text, max) => text.length <= max ? text : `${text.substring(0, max)}...`;

    const openSpotify = () => window.open(external_urls.spotify, '_blank');

    return (
        <motion.div
            className="track-card"
            whileHover={{ y: -4, scale: 1.01 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: id * 0.05 }}
            onClick={openSpotify}
        >
            <span className="track-rank">{String(id + 1).padStart(2, '0')}</span>

            <div className="track-image-wrap">
                <img src={album.images[1]?.url} alt={album.name} className="track-image" />
                <div className="track-play-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            <div className="track-info">
                <h3 className="track-title">{truncate(name, 35)}</h3>
                <p className="track-artist">{truncate(artists.map(a => a.name).join(', '), 30)}</p>
                <p className="track-album">{truncate(album.name, 30)}</p>
            </div>
        </motion.div>
    );
}

export default Track;