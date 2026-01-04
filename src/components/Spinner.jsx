import React from 'react';
import { motion } from 'framer-motion';
import './Spinner.css';

function Spinner() {
    return (
        <div className="spinner-container">
            <motion.div
                className="spinner-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

export default Spinner;