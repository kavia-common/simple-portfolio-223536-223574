import React, { useEffect } from 'react';
import './App.css';
import './styles/variables.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * PUBLIC_INTERFACE
 * App composes the portfolio sections into a SPA and sets basic SEO title.
 */
function App() {
  useEffect(() => {
    const site = process.env.REACT_APP_FRONTEND_URL || process.env.REACT_APP_API_BASE || '';
    document.title = `Alex Doe • Portfolio`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      const m = document.createElement('meta');
      m.setAttribute('name','description');
      m.setAttribute('content','Personal portfolio of Alex Doe: projects, skills, and contact.');
      document.head.appendChild(m);
    }
    // Optional canonical if FRONTEND_URL present
    if (site) {
      const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
      canonical.setAttribute('rel','canonical');
      try {
        const url = site.startsWith('http') ? site : `https://${site}`;
        canonical.setAttribute('href', url);
        if (!document.head.contains(canonical)) document.head.appendChild(canonical);
      } catch { /* ignore */ }
    }
  }, []);

  return (
    <div className="App">
      <a href="#home" className="visually-hidden">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
