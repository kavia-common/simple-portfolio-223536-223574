import React from 'react';
import skills from '../data/skills';
import '../styles/variables.css';

/**
 * PUBLIC_INTERFACE
 * Skills section with proficiency bars and tags.
 */
function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="section" aria-label="Skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Tools and technologies I use regularly</p>
        <div
          role="list"
          aria-label="Skill list"
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',
            gap:16
          }}
        >
          {skills.map((skill) => (
            <div key={skill.name} role="listitem" className="card" style={{padding:16}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8}}>
                <strong id={`skill-${skill.name}-label`}>{skill.name}</strong>
                <span id={`skill-${skill.name}-value`} style={{color:'var(--color-text-muted)'}}>{skill.level}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skill.level}
                aria-labelledby={`skill-${skill.name}-label`}
                aria-describedby={`skill-${skill.name}-value`}
                style={{
                  width:'100%',
                  height:10,
                  background:'var(--color-border)',
                  borderRadius:999,
                  overflow:'hidden'
                }}
              >
                <span style={{
                  display:'block',
                  height:'100%',
                  width:`${skill.level}%`,
                  background:'linear-gradient(90deg, var(--color-primary), var(--color-accent))'
                }} />
              </div>
              {skill.tags?.length ? (
                <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:10}}>
                  {skill.tags.map(tag => (
                    <span key={tag} className="tag" style={{
                      border:'1px solid var(--color-border)',
                      padding:'4px 8px',
                      borderRadius:999,
                      color:'var(--color-text-muted)',
                      fontSize:12
                    }}>{tag}</span>
                  ))}
                </div>
              ): null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Skills);
