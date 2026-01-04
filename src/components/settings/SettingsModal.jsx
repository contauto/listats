import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import './SettingsModal.css';

function SettingsModal({ isOpen, onClose }) {
    const { t, i18n } = useTranslation();
    const { isDark, toggleTheme } = useTheme();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('listats-language', lang);
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-backdrop"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>{t('settings.title')}</h2>
                            <button className="close-btn" onClick={onClose}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">{t('settings.darkMode')}</span>
                                </div>
                                <button
                                    className={`toggle-switch ${isDark ? 'active' : ''}`}
                                    onClick={toggleTheme}
                                >
                                    <span className="toggle-thumb" />
                                </button>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">{t('settings.language')}</span>
                                </div>
                                <div className="language-selector">
                                    <button
                                        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                                        onClick={() => changeLanguage('en')}
                                    >
                                        {t('settings.english')}
                                    </button>
                                    <button
                                        className={`lang-btn ${i18n.language === 'tr' ? 'active' : ''}`}
                                        onClick={() => changeLanguage('tr')}
                                    >
                                        {t('settings.turkish')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <a href="https://berkemaktav.com" target="_blank" rel="noopener noreferrer" className="credit-link">
                                berkemaktav.com
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default SettingsModal;
