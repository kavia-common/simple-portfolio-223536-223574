import React from 'react';
import '../styles/variables.css';

/**
 * PUBLIC_INTERFACE
 * Hero (Intro) section with name, title, and CTAs.
 */
function Hero() {
  return (
    <header id="home" tabIndex={-1} className="section" aria-label="Introduction">
      <div className="container" style={{display:'grid', gap:16, alignItems:'center'}}>
        <h1 className="section-title" style={{fontSize:'2rem'}}>Hi, I’m Alex Doe</h1>
        <p className="section-subtitle" style={{fontSize:'1.125rem'}}>
          Frontend Engineer crafting accessible, high-performance web experiences.
        </p>
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <a className="btn" href="#projects">View Projects</a>
          <a className="btn secondary" href="#contact">Contact Me</a>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Hero);
