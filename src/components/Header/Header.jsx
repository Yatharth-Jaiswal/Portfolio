import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Header.css';

export default function Header({ 
  activeSection, 
  onNavClick, 
  visible = true 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'TECHNOLOGY' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'timeline', label: 'EXPERIENCE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'certifications', label: 'CERTIFICATIONS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNavItemClick = (item) => {
    setMobileMenuOpen(false);
    onNavClick(item.id);
  };

  return (
    <header className={`site-header ${visible ? 'is-visible' : ''}`}>
      <div className="header-inner">
        {/* Brand / Home Link */}
        <button
          className="header-brand"
          onClick={() => onNavClick('hero')}
          data-cursor="ring"
          aria-label="Back to Top"
        >
          <div className="header-brand-badge">DEV</div>
          <div className="header-brand-info">
            <span className="header-brand-name">YATHARTH</span>
          </div>
        </button>

        {/* Desktop Segmented Navigation */}
        <nav className="header-nav-desktop" aria-label="Header Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`header-nav-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => handleNavItemClick(item)}
                data-cursor="ring"
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="header-mobile-drawer">
          <div className="mobile-drawer-crosshair" />
          <div className="mobile-nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleNavItemClick(item)}
                >
                  <span className="mobile-nav-index">0{navItems.indexOf(item) + 1}</span>
                  <span className="mobile-nav-label">{item.label}</span>
                  {item.isModal && <ArrowUpRight size={14} />}
                </button>
              );
            })}
          </div>
          <div className="mobile-drawer-footer">
            <span className="mobile-footer-text">YATHARTH.DEV // 2026</span>
          </div>
        </div>
      )}
    </header>
  );
}
