import React from 'react';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__left">
                    <a href="#hero" className="footer__logo" onClick={e => { e.preventDefault(); scrollTop(); }}>
                        <span className="footer__logo-bracket">&lt;</span>
                        Portfolio
                        <span className="footer__logo-bracket">/&gt;</span>
                    </a>
                    <p className="footer__tagline">
                        Building the web, one component at a time.
                    </p>
                </div>

                <div className="footer__links">
                    {['About', 'Skills', 'Projects', 'Contact'].map(link => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="footer__link"
                            onClick={e => {
                                e.preventDefault();
                                document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <button className="footer__scroll-top" onClick={scrollTop} id="scroll-top-btn" aria-label="Scroll to top">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                </button>
            </div>

            <div className="footer__bottom">
                <p>© {year} Your Name · Crafted with ❤️ using React &amp; Vite</p>
            </div>
        </footer>
    );
}
