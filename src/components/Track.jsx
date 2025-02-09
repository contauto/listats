import React from 'react';
import {motion} from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import './Track.css';

function Track(props) {
    const {artists} = props.item;

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    return (
        <motion.div 
            className="track-container"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 100 
            }}
        >
            <div className="track-content">
                <span className="track-number">
                    {props.id + 1 < 10 ? `0${props.id + 1}` : props.id + 1}
                </span>
                
                <motion.div className="image-container">
                    <motion.img
                        src={props.item.album.images[1].url}
                        className="track-image"
                        alt="album-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.div 
                        className="image-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    />
                </motion.div>

                <div className="track-info">
                    <div className="track-text">
                        <Tooltip title={props.item.name} placement="top">
                            <h3 className="track-name truncate-text">
                                {truncateText(props.item.name, window.innerWidth < 768 ? 25 : 40)}
                            </h3>
                        </Tooltip>

                        <Tooltip title={artists.map(artist => artist.name).join(', ')} placement="bottom">
                            <p className="track-artist truncate-text">
                                {truncateText(artists.map(artist => artist.name).join(', '), 
                                    window.innerWidth < 768 ? 20 : 35)}
                            </p>
                        </Tooltip>
                    </div>
                    {props.item.album.name && (
                        <Tooltip title={props.item.album.name} placement="bottom">
                            <p className="track-album truncate-text">
                                {truncateText(props.item.album.name, window.innerWidth < 768 ? 20 : 35)}
                            </p>
                        </Tooltip>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default Track;