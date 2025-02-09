import React from 'react';
import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import './Artist.css';

function Artist({ artist, index }) {
    const openInSpotify = () => {
        window.open(artist.external_urls.spotify, '_blank');
    };

    return (
        <motion.div 
            className="artist-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
            }}
            whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            onClick={openInSpotify}
            style={{ cursor: 'pointer' }}
        >
            <div className="artist-rank">{index + 1}</div>
            <div className="artist-image-container">
                <motion.img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="artist-image"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div 
                    className="image-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                />
            </div>
            
            <div className="artist-info">
                <Tooltip title={artist.name} placement="top">
                    <h3 className="artist-name">{artist.name}</h3>
                </Tooltip>
                <div className="artist-stats">
                    <span className="artist-followers">
                        {artist.followers.total.toLocaleString()} followers
                    </span>
                    <div className="artist-genres">
                        {artist.genres.slice(0, 2).map((genre, idx) => (
                            <span key={idx} className="genre-tag">
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Artist; 