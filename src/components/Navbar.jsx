import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import './Navbar.css';

function Navbar({ onLoginClick }) {
    const [scrolled, setScrolled] = useState(false);
    const { isLoggedIn } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn
    }));

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav 
            className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="navbar-container">
                <motion.div 
                    className="navbar-logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="logo-text">Listats</span>
                </motion.div>

                <div className="navbar-right">
                    <AnimatePresence mode="wait">
                        {!isLoggedIn && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button 
                                    onClick={onLoginClick}
                                    className="navbar-login-btn"
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #333333 0%, #1a1a1a 100%)',
                                        }
                                    }}
                                >
                                    Login with Spotify
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
}

export default Navbar; 