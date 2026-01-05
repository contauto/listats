import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dataHandler } from '../redux/Actions';
import {
    AUTHORIZE,
    TRACK_SHORT_TERM,
    TRACK_MEDIUM_TERM,
    TRACK_LONG_TERM,
    ARTIST_SHORT_TERM,
    ARTIST_MEDIUM_TERM,
    ARTIST_LONG_TERM,
    recently
} from '../Constants';
import './Dashboard.css';

function Dashboard() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoggedIn, display_name } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        display_name: store.display_name
    }), shallowEqual);

    const handleLogin = () => window.location.href = AUTHORIZE();

    const fetchData = (url, titleKey) => {
        dispatch(dataHandler(url, t(titleKey)));
    };

    const features = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
            ),
            titleKey: 'dashboard.features.topTracks',
            descKey: 'dashboard.features.topTracksDesc',
            color: '#1db954'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
            titleKey: 'dashboard.features.topArtists',
            descKey: 'dashboard.features.topArtistsDesc',
            color: '#1ed760'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            titleKey: 'dashboard.features.timeRanges',
            descKey: 'dashboard.features.timeRangesDesc',
            color: '#22c55e'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
            ),
            titleKey: 'dashboard.features.playlists',
            descKey: 'dashboard.features.playlistsDesc',
            color: '#16a34a'
        }
    ];

    const quickActionGroups = [
        {
            title: t('common.tracks'),
            icon: '🎵',
            items: [
                { url: TRACK_SHORT_TERM, titleKey: 'titles.topTracks4Weeks', label: t('timeRanges.shortTerm') },
                { url: TRACK_MEDIUM_TERM, titleKey: 'titles.topTracks6Months', label: t('timeRanges.mediumTerm') },
                { url: TRACK_LONG_TERM, titleKey: 'titles.topTracksAllTime', label: t('timeRanges.longTerm') }
            ]
        },
        {
            title: t('common.artists'),
            icon: '🎤',
            items: [
                { url: ARTIST_SHORT_TERM, titleKey: 'titles.topArtists4Weeks', label: t('timeRanges.shortTerm') },
                { url: ARTIST_MEDIUM_TERM, titleKey: 'titles.topArtists6Months', label: t('timeRanges.mediumTerm') },
                { url: ARTIST_LONG_TERM, titleKey: 'titles.topArtistsAllTime', label: t('timeRanges.longTerm') }
            ]
        },
        {
            title: t('common.lastPlayed'),
            icon: '⏱️',
            items: [
                { url: recently, titleKey: 'titles.lastPlayed', label: t('dashboard.recentlyPlayed') }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="dashboard">
            {/* Hero Section */}
            <motion.section
                className="dashboard-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="hero-content"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {isLoggedIn ? (
                        <>
                            <h1 className="hero-title">
                                <span className="gradient-text">{t('dashboard.welcomeBack')}</span>
                                <br />
                                <span className="user-name">{display_name}</span>
                            </h1>
                            <p className="hero-subtitle">{t('dashboard.selectOption')}</p>
                        </>
                    ) : (
                        <>
                            <h1 className="hero-title">
                                <span className="hero-welcome">{t('dashboard.welcome')}</span>
                                <br />
                                <span className="gradient-text">Listats</span>
                            </h1>
                            <p className="hero-subtitle">{t('dashboard.subtitle')}</p>
                            <motion.button
                                className="hero-cta"
                                onClick={handleLogin}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                                {t('dashboard.cta')}
                            </motion.button>
                        </>
                    )}
                </motion.div>

                {/* Decorative Elements */}
                <div className="hero-decoration">
                    <div className="decoration-circle circle-1" />
                    <div className="decoration-circle circle-2" />
                    <div className="decoration-circle circle-3" />
                </div>
            </motion.section>

            {/* Quick Actions for Logged In Users */}
            {isLoggedIn && (
                <motion.section
                    className="quick-actions-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="section-heading">{t('dashboard.quickActions')}</h2>
                    <div className="quick-actions-container">
                        {quickActionGroups.map((group, groupIndex) => (
                            <motion.div
                                key={groupIndex}
                                className="quick-action-group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * groupIndex }}
                            >
                                <div className="group-header">
                                    <span className="group-icon">{group.icon}</span>
                                    <span className="group-title">{group.title}</span>
                                </div>
                                <div className="group-items">
                                    {group.items.map((item, itemIndex) => (
                                        <motion.button
                                            key={itemIndex}
                                            className="group-item-btn"
                                            onClick={() => fetchData(item.url, item.titleKey)}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {item.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Features Grid */}
            <motion.section
                className="features-section"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card glass"
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="feature-icon" style={{ color: feature.color }}>
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{t(feature.titleKey)}</h3>
                            <p className="feature-desc">{t(feature.descKey)}</p>
                            <div className="feature-glow" style={{ background: feature.color }} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Stats Preview */}
            {!isLoggedIn && (
                <motion.section
                    className="stats-preview"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="stat-number">50</span>
                            <span className="stat-label">{t('common.tracks')}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">50</span>
                            <span className="stat-label">{t('common.artists')}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">3</span>
                            <span className="stat-label">{t('dashboard.features.timeRanges')}</span>
                        </div>
                    </div>
                </motion.section>
            )}
        </div>
    );
}

export default Dashboard;
