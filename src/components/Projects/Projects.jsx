import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { sounds } from '../../utils/audio';
import { getAssetUrl } from '../../utils/helpers';
import { ExternalLink, ArrowRight, X, Cpu, Layers, Sparkles } from 'lucide-react';
import './Projects.css';

export default function Projects({ onSelectProject }) {
  const [activeModalProject, setActiveModalProject] = useState(null);

  const openProjectModal = (project) => {
    sounds.playSuccess();
    setActiveModalProject(project);
  };

  const closeProjectModal = () => {
    sounds.playClick();
    setActiveModalProject(null);
  };

  return (
    <section id="projects" className="section-wrapper projects-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-header-tag">03 // SELECTED WORKS</span>
        <h2 className="section-header-title">PROJECTS</h2>
        <div className="section-header-line" />
      </div>

      {/* Editorial Projects List */}
      <div className="projects-editorial-list">
        {projectsData.map((project, index) => {
          return (
            <article
              key={project.id}
              className="project-editorial-card"
              onClick={() => openProjectModal(project)}
              data-cursor="open"
            >
              {/* Top Editorial Index */}
              <div className="project-editorial-meta">
                <span className="project-editorial-num">{project.number}</span>
              </div>

              {/* Title & Short Tagline */}
              <div className="project-title-group">
                <h3 className="project-editorial-title">{project.title}</h3>
                <p className="project-editorial-subtitle">{project.subtitle}</p>
              </div>

              {/* Large Showcase Project Screenshot Viewport */}
              <div className="project-preview-viewport">
                <div className="project-viewport-overlay">
                  <div className="viewport-scanline" />
                  <div className="viewport-corner-tl" />
                  <div className="viewport-corner-tr" />
                  <div className="viewport-corner-bl" />
                  <div className="viewport-corner-br" />
                </div>

                {/* Project Image Frame */}
                <div className="project-image-frame">
                  <img 
                    src={getAssetUrl(project.image)} 
                    alt={project.title} 
                    className="project-screenshot-img" 
                    loading="lazy"
                    onError={(e) => {
                      const fallback = getAssetUrl(project.fallbackImage);
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  <div className="project-image-vignette" />
                </div>

                {/* Hover CTA Indicator */}
                <div className="viewport-hover-cta">
                  <span className="cta-text">EXPLORE ARCHITECTURE</span>
                  <ArrowRight size={18} className="cta-arrow" />
                </div>
              </div>

              {/* Editorial Bottom Bar: Tech Stack & CTA */}
              <div className="project-editorial-footer">
                <div className="project-tech-tags">
                  {project.technologies.map((t, tIdx) => (
                    <span key={tIdx} className="project-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <button 
                  type="button" 
                  className="project-view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProjectModal(project);
                  }}
                  data-cursor="open"
                >
                  <span className="view-btn-text">VIEW PROJECT</span>
                  <ArrowRight size={15} className="view-btn-arrow" />
                </button>
              </div>

              {/* Subtle Dividing Line */}
              <div className="project-item-separator" />
            </article>
          );
        })}
      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="project-modal-backdrop" onClick={closeProjectModal} data-lenis-prevent>
          <div 
            className="project-modal-container" 
            onClick={(e) => e.stopPropagation()}
            data-cursor="default"
            data-lenis-prevent
          >
            {/* Modal Header */}
            <div className="project-modal-header">
              <div className="modal-header-left">
                <span className="modal-num">{activeModalProject.number}</span>
                <span className="modal-category">{activeModalProject.category}</span>
              </div>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={closeProjectModal}
                data-cursor="link"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="project-modal-body" data-lenis-prevent tabIndex={0}>
              <div className="modal-top-meta">
                <h3 className="modal-title">{activeModalProject.title}</h3>
                <p className="modal-subtitle">{activeModalProject.subtitle}</p>
              </div>

              <div className="modal-desc-box">
                <span className="modal-section-tag">SYSTEM OVERVIEW</span>
                <p className="modal-long-desc">{activeModalProject.longDescription}</p>
              </div>

              {/* Metrics Grid */}
              <div className="modal-metrics-grid">
                {activeModalProject.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="modal-metric-card">
                    <span className="metric-card-label">{m.label}</span>
                    <span className="metric-card-val">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Full */}
              <div className="modal-stack-section">
                <span className="modal-section-tag">TECHNOLOGIES &amp; PROTOCOLS</span>
                <div className="modal-tags-list">
                  {activeModalProject.technologies.map((t, idx) => (
                    <span key={idx} className="modal-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-actions-bar">
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-technical gold-variant"
                  data-cursor="open"
                  onClick={() => sounds.playClick()}
                >
                  <span>LAUNCH LIVE SITE</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
