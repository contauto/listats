import React from 'react';
import { motion } from 'framer-motion';
import './Title.css';

function Title({ text }) {
    const truncateText = (text, maxLength) => 
        text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return (
        <motion.div 
            className="title-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.h1 
                className="title-text"
                whileHover={{ scale: 1.01 }}
            >
                {truncateText(text, window.innerWidth < 480 ? 20 : 50)}
            </motion.h1>
        </motion.div>
    );
}

export default Title;