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
          className="skills-grid"
        >
          {skills.map((skill) => (
            <div key={skill.name} role="listitem" className="card card-padding-sm">
              <div className="row-between">
                <strong id={`skill-${skill.name}-label`}>{skill.name}</strong>
                <span id={`skill-${skill.name}-value`} className="muted">{skill.level}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skill.level}
                aria-labelledby={`skill-${skill.name}-label`}
                aria-describedby={`skill-${skill.name}-value`}
                className="progress-track"
              >
                <span
                  className="progress-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              {skill.tags?.length ? (
                <div className="row-flex-gap" style={{ marginTop: 10 }}>
                  {skill.tags.map(tag => (
                    <span key={tag} className="tag chip muted">{tag}</span>
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
