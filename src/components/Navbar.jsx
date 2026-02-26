import React, { useState, useEffect } from 'react';
import './Navbar.css';

const LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y > 90);
      if (y <= 90) setMenuOpen(false);
    };
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${visible ? 'nav--visible' : 'nav--hidden'} ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#hero" className="nav__logo" onClick={e => { e.preventDefault(); go('hero'); }}>
          JB<span className="nav__logo-dot">.</span>
        </a>

        <ul className="nav__links">
          {LINKS.map(l => (
            <li key={l}>
              <button className="nav__link" onClick={() => go(l)}>{l}</button>
            </li>
          ))}
        </ul>

        <button
          className={`nav__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          id="nav-hamburger"
        >
          <span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="nav__mobile">
          {LINKS.map(l => (
            <button key={l} className="nav__mobile-link" onClick={() => go(l)}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
