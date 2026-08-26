import React, { useState } from 'react';
import { certificationsData } from '../../data/certificationsData';
import { sounds } from '../../utils/audio';
import { Award, ShieldCheck, ExternalLink } from 'lucide-react';
import './Certifications.css';

export default function Certifications() {
  const [activeCertIndex, setActiveCertIndex] = useState(0);

  return (
    <section id="certifications" className="section-wrapper certifications-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-header-tag">06 // ACCREDITATIONS</span>
        <h2 className="section-header-title">CERTIFICATIONS</h2>
        <div className="section-header-line" />
      </div>

      <div className="certifications-container">
        
        {/* Intro Subtitle */}
        <div className="certifications-intro-bar">
          <div className="cert-intro-left">
            <Award size={16} className="cert-intro-gold-icon" />
            <span className="cert-intro-text">
              VERIFIED TECHNICAL CREDENTIALS &amp; ENTERPRISE JOB SIMULATIONS
            </span>
          </div>
          <div className="cert-intro-status">
            <span className="cert-status-dot" />
            <span>3 CREDENTIALS VALIDATED</span>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certificationsData.map((cert, index) => {
            const isSelected = activeCertIndex === index;
            return (
              <article
                key={cert.id}
                className={`cert-card ${isSelected ? 'is-selected' : ''}`}
                onMouseEnter={() => {
                  setActiveCertIndex(index);
                  sounds.playHover();
                }}
                data-cursor="ring"
              >
                {/* Card Top Strip */}
                <div className="cert-card-top">
                  <div className="cert-num-group">
                    <span className="cert-idx-num">{cert.number}</span>
                    <span className="cert-code-tag">{cert.issuerCode}</span>
                  </div>
                  <div className="cert-meta-right">
                    <span className="cert-year-badge">{cert.year}</span>
                    <span className="cert-status-badge">
                      <ShieldCheck size={11} /> {cert.status}
                    </span>
                  </div>
                </div>

                {/* Category Label */}
                <span className="cert-cat-label">{cert.category}</span>

                {/* Title */}
                <h3 className="cert-card-title">{cert.title}</h3>

                {/* Issuer Info */}
                <div className="cert-issuer-box">
                  <span className="issuer-label">ISSUING ORGANIZATION:</span>
                  <span className="issuer-value">{cert.issuer}</span>
                </div>

                {/* Description */}
                <p className="cert-card-desc">{cert.description}</p>

                {/* Credential Link Button */}
                {cert.credentialUrl && (
                  <div className="cert-card-actions">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-credential-btn"
                      data-cursor="open"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                      }}
                    >
                      <span>VIEW CREDENTIAL</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}

                {/* Subtle Bottom Accent Indicator */}
                <div className="cert-card-glow-line" />
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
