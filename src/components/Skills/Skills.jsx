import React, { useState } from 'react';
import { skillsData } from '../../data/skillsData';
import { sounds } from '../../utils/audio';
import { Code2, Wrench, CheckCircle2 } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(skillsData[0]);

  const frontendSkills = skillsData.filter((s) => s.categoryGroup === 'FRONTEND');
  const toolsSkills = skillsData.filter((s) => s.categoryGroup === 'TOOLS');

  const handleHoverSkill = (skill) => {
    setActiveSkill(skill);
    sounds.playHover();
  };

  return (
    <section id="skills" className="section-wrapper skills-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-header-tag">02 // ARSENAL</span>
        <h2 className="section-header-title">TECHNOLOGY</h2>
        <div className="section-header-line" />
      </div>

      {/* Main Interactive Matrix Layout */}
      <div className="skills-interactive-container">
        
        {/* Left Column: Categorized Technical Groups */}
        <div className="skills-index-col">
          
          {/* Group 1: Frontend */}
          <div className="skills-category-group">
            <div className="category-group-header">
              <div className="group-header-left">
                <Code2 size={15} className="group-icon gold-icon" />
                <span className="group-title">FRONTEND</span>
              </div>
              <span className="group-count-badge">{frontendSkills.length} CORE SKILLS</span>
            </div>

            <div className="skills-tech-list">
              {frontendSkills.map((skill, index) => {
                const isSelected = activeSkill.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    className={`tech-row-item ${isSelected ? 'is-selected' : ''}`}
                    onMouseEnter={() => handleHoverSkill(skill)}
                    onClick={() => {
                      sounds.playClick();
                      setActiveSkill(skill);
                    }}
                    data-cursor="ring"
                  >
                    <div className="tech-row-left">
                      <span className="tech-row-index">0{index + 1}</span>
                      <span className="tech-row-name">{skill.name}</span>
                    </div>

                    <div className="tech-row-right">
                      <span className="tech-role-tag">{skill.roleTag}</span>
                      <span className="tech-level-pill">{skill.level}</span>
                      <div className="tech-row-indicator">
                        <span className="indicator-bar" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 2: Tools */}
          <div className="skills-category-group tools-group">
            <div className="category-group-header">
              <div className="group-header-left">
                <Wrench size={15} className="group-icon gold-icon" />
                <span className="group-title">TOOLS</span>
              </div>
              <span className="group-count-badge">{toolsSkills.length} ESSENTIAL TOOLS</span>
            </div>

            <div className="skills-tech-list">
              {toolsSkills.map((skill, index) => {
                const isSelected = activeSkill.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    className={`tech-row-item ${isSelected ? 'is-selected' : ''}`}
                    onMouseEnter={() => handleHoverSkill(skill)}
                    onClick={() => {
                      sounds.playClick();
                      setActiveSkill(skill);
                    }}
                    data-cursor="ring"
                  >
                    <div className="tech-row-left">
                      <span className="tech-row-index">0{index + 1}</span>
                      <span className="tech-row-name">{skill.name}</span>
                    </div>

                    <div className="tech-row-right">
                      <span className="tech-role-tag">{skill.roleTag}</span>
                      <span className="tech-level-pill tool-pill">{skill.level}</span>
                      <div className="tech-row-indicator">
                        <span className="indicator-bar" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Center Connecting Wireframe Line */}
        <div className="skills-connector-col" aria-hidden="true">
          <div className="connector-vertical-track" />
          <div className="connector-horizontal-pulse" />
        </div>

        {/* Right Column: Clean Technical Specification Panel */}
        <div className="skills-hud-col">
          <div className="skills-hud-card">
            
            {/* Top Specification Status Bar */}
            <div className="hud-card-top">
              <div className="hud-status-group">
                <span className="hud-pulse-light" />
                <span className="hud-status-text">{activeSkill.categoryGroup} SPECIFICATION // ACTIVE</span>
              </div>
              <span className="hud-node-id">MODULE // {activeSkill.name}</span>
            </div>

            {/* Main Active Tech Title & Overview */}
            <div className="hud-main-info">
              <div className="hud-meta-row">
                <span className="hud-category-badge">{activeSkill.category}</span>
                <span className="hud-proficiency-badge">{activeSkill.level}</span>
              </div>
              <h3 className="hud-tech-name">{activeSkill.name}</h3>
              <p className="hud-tech-desc">{activeSkill.description}</p>
            </div>

            {/* Implementation Highlights Section */}
            <div className="hud-highlights-block">
              <span className="hud-block-label">KEY IMPLEMENTATION PRACTICES:</span>
              <div className="hud-highlights-list">
                {activeSkill.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="hud-highlight-item">
                    <span className="hud-branch-indicator">├─</span>
                    <span className="hud-point-text">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment & Utilization Tags */}
            <div className="hud-deployment-block">
              <span className="hud-block-label">DEPLOYED IN PRODUCTION:</span>
              <div className="hud-deployment-pills">
                {activeSkill.usedIn.map((project, prIdx) => (
                  <span key={prIdx} className="hud-deploy-pill">
                    <CheckCircle2 size={11} className="deploy-pill-icon" />
                    {project}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Status Spec */}
            <div className="hud-card-footer">
              <span className="hud-footer-state">
                SYSTEM VERIFICATION: {activeSkill.categoryGroup} // READY FOR PRODUCTION
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
