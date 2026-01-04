import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-credit">
          {t('footer.madeWith')} ❤️ {t('footer.by')}{' '}
          <a href="https://berkemaktav.com" target="_blank" rel="noopener noreferrer">
            berkemaktav
          </a>
        </p>
        <p className="footer-powered">{t('footer.poweredBy')}</p>
      </div>
    </footer>
  );
}

export default Footer;
