import React from 'react';
import { motion } from 'framer-motion';
import './Title.css';

function Title({ text }) {
    return (
        <motion.h1
            className="section-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {text}
        </motion.h1>
    );
}

export default Title;