import React from 'react';
import projects from '../data/projects';
import '../styles/variables.css';

/**
 * PUBLIC_INTERFACE
 * Projects section displaying project cards with lazy-loaded images.
 */
function Projects() {
  return (
    <section id="projects" tabIndex={-1} className="section" aria-label="Projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Selected work showcasing design systems and apps</p>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',
          gap:16
        }}>
          {projects.map((p) => (
            <article key={p.title} className="card" style={{overflow:'hidden'}}>
              <div style={{
                background:'linear-gradient(135deg, var(--color-border), transparent)',
                aspectRatio:'16/9',
                position:'relative'
              }}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  style={{ width:'100%', height:'100%', objectFit:'cover', filter:'saturate(1.05) contrast(1.02)' }}
                />
                {/* simple placeholder shimmer effect via CSS gradient behind image load */}
              </div>
              <div style={{padding:16}}>
                <h3 style={{margin:'0 0 8px'}}>{p.title}</h3>
                <p style={{margin:'0 0 12px', color:'var(--color-text-muted)'}}>{p.description}</p>
                <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:12}}>
                  {p.tech.map(t => (
                    <span key={t} style={{
                      background:'var(--color-bg)',
                      border:'1px solid var(--color-border)',
                      padding:'4px 8px',
                      borderRadius:999,
                      fontSize:12
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                  {p.demo && <a className="btn" href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open demo for ${p.title}`}>Live Demo</a>}
                  {p.source && <a className="btn secondary" href={p.source} target="_blank" rel="noopener noreferrer" aria-label={`Open source code for ${p.title}`}>Source</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Projects);
