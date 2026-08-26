import React, { useState } from 'react';
import { 
  Mail, 
  FileText, 
  ChevronDown, 
  Terminal, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../Icons';
import { sounds } from '../../utils/audio';
import './Hero.css';

export default function Hero({ activeSection, onNavClick, onOpenDocs, onOpenResume }) {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      id: 'github',
      name: 'GitHub',
      icon: GithubIcon,
      href: 'https://github.com/Yatharth-Jaiswal',
      tooltip: 'GITHUB // @YATHARTH-JAISWAL'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: 'https://linkedin.com/in/yatharth-jaiswal-b24656360/',
      tooltip: 'LINKEDIN // YATHARTH JAISWAL'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      href: '#contact',
      onClick: (e) => {
        e.preventDefault();
        sounds.playClick();
        onNavClick('contact');
        setTimeout(() => {
          const input = document.getElementById('contact-name') || document.getElementById('contact-email');
          if (input) input.focus();
        }, 400);
      },
      tooltip: 'EMAIL // yatharthjai789@gmail.com'
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: FileText,
      href: '#resume',
      onClick: (e) => {
        e.preventDefault();
        sounds.playClick();
        onOpenResume?.();
      },
      tooltip: 'RESUME // VIEW CV'
    }
  ];

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'TECHNOLOGY' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'timeline', label: 'EXPERIENCE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'certifications', label: 'CERTIFICATIONS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNav = (item) => {
    sounds.playClick();
    onNavClick(item.id);
  };

  return (
    <section id="hero" className="hero-section">
      {/* Corner Technical Crosshairs */}
      <div className="crosshair-tl" />
      <div className="crosshair-tr" />
      <div className="crosshair-bl" />
      <div className="crosshair-br" />

      {/* Main Centered Command Stage */}
      <div className="hero-center-container">
        
        {/* Top Tech Logo / Monogram */}
        <div className="hero-logo-wrapper" data-cursor="ring">
          <div className="hero-logo-ring-outer" />
          <div className="hero-logo-badge">
            <span className="hero-logo-text">DEV</span>
          </div>
          <div className="hero-logo-sub">2026</div>
        </div>

        {/* Vertical Connecting Line (Top) */}
        <div className="hero-stem-line top-stem" />

        {/* Horizontal Divider Line */}
        <div className="hero-horizontal-divider">
          <div className="divider-cap-left" />
          <div className="divider-core-line" />
          <div className="divider-cap-right" />
        </div>

        {/* Identity & Profession Title */}
        <div className="hero-identity-group">
          <h1 className="hero-name">YATHARTH JAISWAL</h1>
          <div className="hero-profession">
            <span className="profession-dot" />
            <span className="profession-text">WEB DEVELOPER</span>
            <span className="profession-dot" />
          </div>
          <p className="hero-tagline">
            I build interactive, responsive and performance-focused digital experiences.
          </p>
        </div>

        {/* Circular Social Icons */}
        <div className="hero-socials-row">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.id !== 'resume' && item.id !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="hero-social-btn"
                aria-label={item.name}
                data-cursor="open"
                data-cursor-text={item.name}
                onMouseEnter={() => {
                  setHoveredSocial(item.id);
                  sounds.playHover();
                }}
                onMouseLeave={() => setHoveredSocial(null)}
                onClick={item.onClick || (() => sounds.playClick())}
              >
                <Icon className="hero-social-icon" strokeWidth={1.5} size={15} />
                {hoveredSocial === item.id && (
                  <div className="social-tooltip">
                    <span className="tooltip-text">{item.tooltip}</span>
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* Vertical Connecting Line (Bottom) */}
        <div className="hero-stem-line bottom-stem" />

        {/* Center Segmented Navigation Container */}
        <nav className="hero-segmented-nav" aria-label="Hero Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`hero-nav-item ${isActive ? 'is-active' : ''} ${item.isModal ? 'is-modal-trigger' : ''}`}
                onClick={() => handleNav(item)}
                onMouseEnter={() => sounds.playHover()}
                data-cursor="ring"
              >
                <span className="nav-item-label">{item.label}</span>
                {item.isModal && <ArrowUpRight size={10} className="nav-modal-icon" />}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Hero Footer: Micro Technical Specs & Copyright */}
      <footer className="hero-footer-content">
        <div className="hero-footer-copy">© 2026 YATHARTH JAISWAL &nbsp;|&nbsp; ALL SYSTEMS NOMINAL</div>
      </footer>

      {/* Scroll Down Prompt */}
      <div 
        className="hero-scroll-indicator" 
        onClick={() => onNavClick('about')}
        data-cursor="link"
        onMouseEnter={() => sounds.playHover()}
      >
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-line-animated" />
        <ChevronDown size={14} className="scroll-chevron" />
      </div>

    </section>
  );
}
