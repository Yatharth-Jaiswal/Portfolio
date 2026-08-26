import React, { useState } from 'react';
import { timelineData } from '../../data/timelineData';
import { sounds } from '../../utils/audio';
import { CheckCircle2, ChevronRight, Milestone, Calendar, ArrowUpRight } from 'lucide-react';
import './Timeline.css';

export default function Timeline() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section id="timeline" className="section-wrapper timeline-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-header-tag">04 // CAREER &amp; WORK</span>
        <h2 className="section-header-title">EXPERIENCE</h2>
        <div className="section-header-line" />
      </div>

      <div className="timeline-container">
        
        {/* Vertical Track Line */}
        <div className="timeline-vertical-spine" />

        {/* Timeline Milestone Nodes */}
        <div className="timeline-nodes-list">
          {timelineData.map((item, index) => {
            const isActive = activeItem === index;
            return (
              <div
                key={item.year}
                className={`timeline-entry ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => {
                  setActiveItem(index);
                  sounds.playHover();
                }}
                data-cursor="ring"
              >
                {/* Center Node Bullet on Spine */}
                <div className="timeline-node-bullet">
                  <div className="bullet-glow-ring" />
                  <div className="bullet-core" />
                </div>

                {/* Main Content Box */}
                <div className="timeline-entry-card">
                  
                  {/* Card Header Bar */}
                  <div className="timeline-card-header">
                    <div className="timeline-year-group">
                      <span className="timeline-year-text">{item.year}</span>
                      <span className="timeline-badge-tag">{item.badge}</span>
                    </div>
                    <span className="timeline-company-name">{item.company}</span>
                  </div>

                  {/* Role Title */}
                  <h3 className="timeline-role-title">{item.role}</h3>

                  {/* Summary Narrative */}
                  <p className="timeline-summary-text">{item.summary}</p>

                  {/* Highlights List */}
                  <div className="timeline-highlights-list">
                    {item.highlights.map((point, pIndex) => (
                      <div key={pIndex} className="timeline-highlight-point">
                        <span className="point-indicator">├─</span>
                        <span className="point-text">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="timeline-tech-pills">
                    {item.tech.map((t, tIndex) => (
                      <span key={tIndex} className="tech-pill-item">
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
