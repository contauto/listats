import React from 'react';
import { motion } from 'framer-motion';
import TimeFormatter from "../functions/TimeFormatter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import './LastTracks.css';

function LastTracks({ item, id, width }) {
    const { played_at } = item;
    const { artists, name } = item.track;
    const time = TimeFormatter(played_at);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    const openInSpotify = () => {
        window.open(item.track.external_urls.spotify, '_blank');
    };

    return (
        <motion.div 
            className="last-track-container"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={openInSpotify}
            style={{ cursor: 'pointer' }}
        >
            <div className="last-track-content">
                <span className="track-number">
                    {id + 1 < 10 ? `0${id + 1}` : id + 1}
                </span>

                <motion.img
                    src={item.track.album.images[1].url}
                    className="track-image"
                    alt="album-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                />

                <div className="track-details">
                    <div className="track-info">
                        <h3 className="track-name">
                            {truncateText(name, width < 768 ? 30 : 50)}
                        </h3>
                        <p className="track-artist">
                            {truncateText(artists.map(artist => artist.name).join(', '), 
                                width < 768 ? 25 : 40)}
                        </p>
                    </div>

                    <div className="track-metadata">
                        <div className="metadata-item">
                            <CalendarTodayIcon className="icon" />
                            <span>{time[0]}</span>
                        </div>
                        <div className="metadata-item">
                            <AccessTimeIcon className="icon" />
                            <span>{time[1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default LastTracks;
