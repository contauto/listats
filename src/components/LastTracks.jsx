import React from 'react';
import { motion } from 'framer-motion';
import TimeFormatter from '../functions/TimeFormatter';
import './LastTracks.css';

function LastTracks({ item, id }) {
    const { played_at, track } = item;
    const { artists, name, album, external_urls } = track;
    const [date, time] = TimeFormatter(played_at);

    const truncate = (text, max) => text.length <= max ? text : `${text.substring(0, max)}...`;

    const openSpotify = () => window.open(external_urls.spotify, '_blank');

    return (
        <motion.div
            className="last-track-card"
            whileHover={{ x: 4 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: id * 0.05 }}
            onClick={openSpotify}
        >
            <span className="last-track-rank">{String(id + 1).padStart(2, '0')}</span>

            <div className="last-track-image-wrap">
                <img src={album.images[1]?.url} alt={album.name} className="last-track-image" />
            </div>

            <div className="last-track-info">
                <h3 className="last-track-title">{truncate(name, 40)}</h3>
                <p className="last-track-artist">{truncate(artists.map(a => a.name).join(', '), 35)}</p>
            </div>

            <div className="last-track-meta">
                <span className="meta-date">{date}</span>
                <span className="meta-time">{time}</span>
            </div>
        </motion.div>
    );
}

export default LastTracks;
