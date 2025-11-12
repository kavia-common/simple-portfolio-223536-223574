import React from 'react';
import '../styles/variables.css';

/**
 * PUBLIC_INTERFACE
 * Hero (Intro) section with name, title, and CTAs.
 */
function Hero() {
  return (
    <header id="home" tabIndex={-1} className="section" aria-label="Introduction">
      <div className="container hero-grid">
        <h1 className="section-title hero-title">Hi, I’m Alex Doe</h1>
        <p className="section-subtitle hero-subtitle">
          Frontend Engineer crafting accessible, high-performance web experiences.
        </p>
        <div className="cta-row">
          <a className="btn" href="#projects">View Projects</a>
          <a className="btn secondary" href="#contact">Contact Me</a>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Hero);
