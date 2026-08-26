import React, { useState } from 'react';
import { educationData } from '../../data/educationData';
import { sounds } from '../../utils/audio';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import './Education.css';

export default function Education() {
  const [activeEduIndex, setActiveEduIndex] = useState(0);

  return (
    <section id="education" className="section-wrapper education-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-header-tag">05 // ACADEMIC BACKGROUND</span>
        <h2 className="section-header-title">EDUCATION</h2>
        <div className="section-header-line" />
      </div>

      <div className="education-container">
        <div className="education-cards-grid">
          {educationData.map((edu, idx) => {
            const isSelected = activeEduIndex === idx;
            return (
              <article
                key={edu.id}
                className={`education-card ${isSelected ? 'is-selected' : ''}`}
                onMouseEnter={() => {
                  setActiveEduIndex(idx);
                  sounds.playHover();
                }}
                data-cursor="ring"
              >
                {/* Top Meta Bar */}
                <div className="edu-card-header">
                  <div className="edu-period-group">
                    <Calendar size={13} className="edu-header-icon" />
                    <span className="edu-period-text">{edu.period}</span>
                    <span className="edu-status-badge">{edu.status}</span>
                  </div>
                  <div className="edu-location-badge">
                    <MapPin size={11} />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Degree Title & Institution */}
                <div className="edu-title-block">
                  <h3 className="edu-degree-title">{edu.degree}</h3>
                  <div className="edu-institution-row">
                    <GraduationCap size={15} className="institution-icon" />
                    <span className="edu-institution-name">{edu.institution}</span>
                    {edu.specialization && (
                      <>
                        <span className="institution-sep">/</span>
                        <span className="edu-specialization-text">{edu.specialization}</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
