import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';
import './i18n/i18n';
import './index.css';
import App from './App';
import configureStore from './redux/ConfigureStore';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './Footer';
import './Footer.css';

window.Buffer = Buffer;

const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <div className="app-wrapper">
                    <Navbar />
                    <main className="main-content">
                        <App />
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
