import React from 'react';
import { Terminal, ShieldCheck, MapPin, Sparkles, Cpu, Activity, Zap, CheckCircle2 } from 'lucide-react';
import './About.css';

export default function About() {
  const specs = [
    { label: 'LOCATION', value: 'UNNAO / KANPUR, INDIA (REMOTE)', icon: MapPin },
    { label: 'STATUS', value: 'OPEN FOR SELECT ROLES & FREELANCE', icon: Sparkles, highlight: true },
    { label: 'DISCIPLINE', value: 'WEB DEVELOPMENT & UI ENGINEERING', icon: Cpu },
    { label: 'PERFORMANCE', value: 'UP TO 70% SPEED OPTIMIZATION', icon: Zap }
  ];

  return (
    <section id="about" className="section-wrapper about-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-header-tag">01 // IDENTITY</span>
        <h2 className="section-header-title">ABOUT</h2>
        <div className="section-header-line" />
      </div>

      {/* Two Column Layout */}
      <div className="about-grid">
        {/* Left Column: Big Statement Typography */}
        <div className="about-statement-col">
          <div className="about-statement-badge">
            <span className="statement-pulse-dot" />
            <span className="statement-badge-text">ENGINEERING PHILOSOPHY</span>
          </div>

          <h3 className="about-hero-statement">
            <span className="statement-line">I BUILD DIGITAL</span>
            <span className="statement-line highlight-gold">EXPERIENCES</span>
            <span className="statement-line">THAT COMBINE</span>
            <span className="statement-line">CLEAN DESIGN,</span>
            <span className="statement-line highlight-white">INTERACTION</span>
            <span className="statement-line">&amp; PERFORMANCE.</span>
          </h3>

          <div className="about-metrics-strip">
            <div className="about-metric-item">
              <span className="metric-val">06+</span>
              <span className="metric-lbl">MOS INDUSTRY EXP</span>
            </div>
            <div className="metric-sep" />
            <div className="about-metric-item">
              <span className="metric-val">70%</span>
              <span className="metric-lbl">SPEED BOOST</span>
            </div>
            <div className="metric-sep" />
            <div className="about-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">CROSS-BROWSER QA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Technical Specifications */}
        <div className="about-details-col">
          <div className="about-bio-card">
            <div className="bio-card-header">
              <span className="bio-card-index">// SPEC.01</span>
              <span className="bio-card-title">PROFILE OVERVIEW</span>
            </div>
            <p className="bio-paragraph">
              Passionate Web Developer with industry experience developing responsive, high-performance websites using HTML, CSS, and JavaScript. Experienced in collaborating with teams, optimizing website speed by up to 70%, and delivering user-friendly, SEO-optimized web solutions.
            </p>
            <p className="bio-paragraph secondary">
              Contributed to live production websites including Backyard Breaks and InfiniWell by implementing responsive layouts, improving performance, and ensuring cross-browser compatibility across Chrome, Firefox, Safari, and mobile devices.
            </p>
          </div>

          {/* Technical Metadata Spec Sheet */}
          <div className="about-specs-grid">
            {specs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`spec-box ${item.highlight ? 'is-highlighted' : ''}`}>
                  <div className="spec-box-top">
                    <Icon size={13} className="spec-icon" />
                    <span className="spec-label">{item.label}</span>
                  </div>
                  <div className="spec-value">{item.value}</div>
                </div>
              );
            })}
          </div>

          {/* Interests & Domains */}
          <div className="about-focus-panel">
            <span className="focus-panel-title">CORE SKILLS &amp; FOCUS DOMAINS</span>
            <div className="focus-tags">
              <span className="focus-tag">HTML5 &amp; CSS3</span>
              <span className="focus-tag">JAVASCRIPT ES6+</span>
              <span className="focus-tag">REACT.JS</span>
              <span className="focus-tag">PYTHON</span>
              <span className="focus-tag">SPEED OPTIMIZATION</span>
              <span className="focus-tag">SEO &amp; ACCESSIBILITY</span>
              <span className="focus-tag">STREAM INTEGRATIONS</span>
              <span className="focus-tag">GIT &amp; GITHUB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Technical Line */}
      <div className="about-bottom-accent" />
    </section>
  );
}
