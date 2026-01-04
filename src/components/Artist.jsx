import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Artist.css';

function Artist({ artist, index }) {
    const { t } = useTranslation();

    const openSpotify = () => window.open(artist.external_urls.spotify, '_blank');

    const formatFollowers = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toLocaleString();
    };

    return (
        <motion.div
            className="artist-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={openSpotify}
        >
            <div className="artist-rank">{index + 1}</div>

            <div className="artist-image-container">
                <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
                <div className="artist-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            <div className="artist-info">
                <h3 className="artist-name">{artist.name}</h3>
                <span className="artist-followers">
                    {formatFollowers(artist.followers.total)} {t('common.followers')}
                </span>
                <div className="artist-genres">
                    {artist.genres.slice(0, 2).map((genre, idx) => (
                        <span key={idx} className="genre-tag">{genre}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default Artist;