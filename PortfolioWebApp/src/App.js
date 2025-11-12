import React, { useEffect } from 'react';
import './App.css';
import './styles/variables.css';
import './styles/performance.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { setSeoDefaults } from './utils/seo';

/**
 * PUBLIC_INTERFACE
 * App composes the portfolio sections into a SPA and sets basic SEO title.
 */
function App() {
  useEffect(() => {
    document.title = `Alex Doe • Portfolio`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      const m = document.createElement('meta');
      m.setAttribute('name','description');
      m.setAttribute('content','Personal portfolio of Alex Doe: projects, skills, and contact.');
      document.head.appendChild(m);
    }
    // Apply canonical and JSON-LD schema at runtime
    setSeoDefaults();
  }, []);

  return (
    <div className="App">
      {/* Skip link for keyboard users */}
      <a href="#main" className="visually-hidden">Skip to main content</a>
      <Navbar />
      <main id="main" tabIndex={-1} role="main" aria-label="Main content">
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
