import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logoutSuccess, mainMenuSuccess, dataHandler } from '../../redux/Actions';
import {
    AUTHORIZE,
    TRACK_SHORT_TERM,
    TRACK_MEDIUM_TERM,
    TRACK_LONG_TERM,
    ARTIST_SHORT_TERM,
    ARTIST_MEDIUM_TERM,
    ARTIST_LONG_TERM,
    recently,
    githubUrl
} from '../../Constants';
import SettingsModal from '../settings/SettingsModal';
import './Navbar.css';

function Navbar() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { isLoggedIn, display_name, image, access_token, refresh_token, userId } = useSelector(store => ({
        display_name: store.display_name,
        image: store.image,
        isLoggedIn: store.isLoggedIn,
        access_token: store.access_token,
        refresh_token: store.refresh_token,
        userId: store.userId
    }), shallowEqual);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const dropdownRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileDropdown(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const authState = { display_name, image, isLoggedIn, access_token, refresh_token, userId };

    const handleLogin = () => window.location.href = AUTHORIZE();
    const handleLogout = () => dispatch(logoutSuccess());
    const handleLogoClick = () => dispatch(mainMenuSuccess(authState));
    const handleGithub = () => window.open(githubUrl, '_blank');

    const fetchData = (url, titleKey) => {
        dispatch(dataHandler(url, t(titleKey)));
        setActiveDropdown(null);
        setMobileMenuOpen(false);
    };

    const trackItems = [
        { url: TRACK_SHORT_TERM, titleKey: 'titles.topTracks4Weeks', label: t('timeRanges.shortTerm') },
        { url: TRACK_MEDIUM_TERM, titleKey: 'titles.topTracks6Months', label: t('timeRanges.mediumTerm') },
        { url: TRACK_LONG_TERM, titleKey: 'titles.topTracksAllTime', label: t('timeRanges.longTerm') },
        { url: recently, titleKey: 'titles.lastPlayed', label: t('common.lastPlayed'), isLast: true }
    ];

    const artistItems = [
        { url: ARTIST_SHORT_TERM, titleKey: 'titles.topArtists4Weeks', label: t('timeRanges.shortTerm') },
        { url: ARTIST_MEDIUM_TERM, titleKey: 'titles.topArtists6Months', label: t('timeRanges.mediumTerm') },
        { url: ARTIST_LONG_TERM, titleKey: 'titles.topArtistsAllTime', label: t('timeRanges.longTerm') }
    ];

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95 }
    };

    const mobileMenuVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
        exit: { x: '100%' }
    };

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div className="navbar-container">
                    <motion.div
                        className="logo"
                        onClick={handleLogoClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="logo-text">Listats</span>
                    </motion.div>

                    {isLoggedIn && (
                        <div className="nav-menu" ref={dropdownRef}>
                            <div className="nav-item">
                                <button
                                    className={`nav-btn ${activeDropdown === 'tracks' ? 'active' : ''}`}
                                    onClick={() => setActiveDropdown(activeDropdown === 'tracks' ? null : 'tracks')}
                                >
                                    {t('common.tracks')}
                                    <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'tracks' && (
                                        <motion.div
                                            className="dropdown"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.2 }}
                                        >
                                            {trackItems.map((item, i) => (
                                                <motion.button
                                                    key={i}
                                                    className="dropdown-item"
                                                    onClick={() => fetchData(item.url, item.titleKey)}
                                                    whileHover={{ x: 4 }}
                                                >
                                                    {item.label}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="nav-item">
                                <button
                                    className={`nav-btn ${activeDropdown === 'artists' ? 'active' : ''}`}
                                    onClick={() => setActiveDropdown(activeDropdown === 'artists' ? null : 'artists')}
                                >
                                    {t('common.artists')}
                                    <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'artists' && (
                                        <motion.div
                                            className="dropdown"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.2 }}
                                        >
                                            {artistItems.map((item, i) => (
                                                <motion.button
                                                    key={i}
                                                    className="dropdown-item"
                                                    onClick={() => fetchData(item.url, item.titleKey)}
                                                    whileHover={{ x: 4 }}
                                                >
                                                    {item.label}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    <div className="nav-right">
                        {!isLoggedIn ? (
                            <>
                                <motion.button
                                    className="github-btn"
                                    onClick={handleGithub}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    className="login-btn"
                                    onClick={handleLogin}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                    </svg>
                                    {t('common.login')}
                                </motion.button>
                            </>
                        ) : (
                            <div className="profile-section" ref={profileRef}>
                                <motion.button
                                    className="profile-btn"
                                    onClick={() => setProfileDropdown(!profileDropdown)}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img src={image} alt={display_name} className="profile-img" />
                                    <span className="profile-name">{display_name}</span>
                                    <svg className={`chevron ${profileDropdown ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </motion.button>

                                <AnimatePresence>
                                    {profileDropdown && (
                                        <motion.div
                                            className="profile-dropdown"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button className="dropdown-item" onClick={() => { setSettingsOpen(true); setProfileDropdown(false); }}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                                    <circle cx="12" cy="12" r="3" />
                                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                                                </svg>
                                                {t('common.settings')}
                                            </button>
                                            <button className="dropdown-item" onClick={handleGithub}>
                                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                </svg>
                                                GitHub
                                            </button>
                                            <div className="dropdown-divider" />
                                            <button className="dropdown-item logout" onClick={handleLogout}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                                    <polyline points="16,17 21,12 16,7" />
                                                    <line x1="21" y1="12" x2="9" y2="12" />
                                                </svg>
                                                {t('common.logout')}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {isLoggedIn && (
                            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="mobile-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="mobile-menu"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="mobile-menu-header">
                                <img src={image} alt={display_name} className="mobile-profile-img" />
                                <span className="mobile-profile-name">{display_name}</span>
                            </div>

                            <div className="mobile-menu-section">
                                <h4>{t('common.tracks')}</h4>
                                {trackItems.map((item, i) => (
                                    <button key={i} className="mobile-menu-item" onClick={() => fetchData(item.url, item.titleKey)}>
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mobile-menu-section">
                                <h4>{t('common.artists')}</h4>
                                {artistItems.map((item, i) => (
                                    <button key={i} className="mobile-menu-item" onClick={() => fetchData(item.url, item.titleKey)}>
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mobile-menu-footer">
                                <button className="mobile-menu-item" onClick={() => { setSettingsOpen(true); setMobileMenuOpen(false); }}>
                                    {t('common.settings')}
                                </button>
                                <button className="mobile-menu-item logout" onClick={handleLogout}>
                                    {t('common.logout')}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </>
    );
}

export default Navbar;
