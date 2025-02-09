import React from 'react';
import { motion } from 'framer-motion';
import './Title.css';

function Title(props) {
    return (
        <motion.div 
            className="title-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100
            }}
        >
            <motion.h1 
                className="title-text"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="title-highlight">
                    {props.text.length > 20 && window.innerWidth < 480 
                        ? `${props.text.substring(0, 20)}...` 
                        : props.text}
                </span>
            </motion.h1>
        </motion.div>
    );
}

export default Title;