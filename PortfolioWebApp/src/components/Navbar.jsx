import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/variables.css';

/**
 * PUBLIC_INTERFACE
 * Navbar shows anchor navigation and highlights the active section on scroll.
 * Uses IntersectionObserver for performance-friendly section detection.
 */
function Navbar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const sections = useRef({});

  useEffect(() => {
    const ids = ['home', 'skills', 'projects', 'contact'];
    ids.forEach(id => { sections.current[id] = document.getElementById(id); });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach(id => {
      const el = sections.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.focus({ preventScroll: true });
    }
  };

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="container">
        <a href="#home" onClick={handleNavClick('home')} className="brand">
          {/* Use FRONTEND URL for title context if present */}
          {(() => {
            try {
              return process.env.REACT_APP_FRONTEND_URL
                ? new URL(process.env.REACT_APP_FRONTEND_URL).hostname
                : 'My Portfolio';
            } catch {
              return 'My Portfolio';
            }
          })()}
        </a>

        <button
          id="menu-button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-menu"
          className="btn secondary menu-button-inline"
          onClick={() => setOpen(v => !v)}
        >
          ☰
        </button>

        <ul
          id="primary-menu"
          role="menubar"
          className={`nav-links ${open ? 'open' : ''}`}
        >
          {[
            { id:'home', label:'Home' },
            { id:'skills', label:'Skills' },
            { id:'projects', label:'Projects' },
            { id:'contact', label:'Contact' },
          ].map(item => (
            <li key={item.id} role="none">
              <a
                role="menuitem"
                href={`#${item.id}`}
                onClick={handleNavClick(item.id)}
                className={`nav-link ${active === item.id ? 'is-active' : ''}`}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li role="none"><ThemeToggle /></li>
        </ul>
      </div>
    </nav>
  );
}

export default React.memo(Navbar);
