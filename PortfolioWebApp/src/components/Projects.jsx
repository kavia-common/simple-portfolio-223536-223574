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

        <div className="projects-grid">
          {projects.map((p) => (
            <article key={p.title} className="card card-overflow-hidden">
              <div className="media-16x9">
                <img
                  src={p.image}
                  alt={`${p.title} – project preview image`}
                  loading="lazy"
                  width="1280"
                  height="720"
                  className="media-cover"
                />
                {/* simple placeholder shimmer effect via CSS gradient behind image load */}
              </div>
              <div className="card-padding">
                <h3 className="h3-compact">{p.title}</h3>
                <p className="p-compact-muted">{p.description}</p>
                <div className="chips-row">
                  {p.tech.map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                <div className="row-flex-gap">
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
