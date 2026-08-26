import React from 'react';
import { sounds } from '../../utils/audio';
import { ArrowUp, Terminal, Shield, Cpu, Activity } from 'lucide-react';
import './Footer.css';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="site-main-footer">
      <div className="footer-inner-content">
        
        {/* Top Technical Status Ribbon */}
        <div className="footer-status-ribbon">
          <div className="status-badge-item">
            <span className="status-live-dot" />
            <span className="status-text">SYSTEM STATUS: NOMINAL</span>
          </div>

          <div className="status-badge-item">
            <Cpu size={12} className="status-icon" />
            <span className="status-text">NODE: EDGE-GLOBAL</span>
          </div>

          <div className="status-badge-item">
            <Activity size={12} className="status-icon" />
            <span className="status-text">LATENCY: 14MS</span>
          </div>
        </div>

        {/* Center Technical Divider */}
        <div className="footer-divider-line" />

        {/* Bottom Bar: Identity & Back To Top */}
        <div className="footer-bottom-bar">
          <div className="footer-branding-block">
            <span className="footer-brand-title">YATHARTH JAISWAL</span>
            <span className="footer-copyright-note">
              © {new Date().getFullYear()} // CRAFTED WITH REACT, GLSL &amp; LENIS
            </span>
          </div>

          <button
            type="button"
            className="footer-back-to-top-btn"
            onClick={() => {
              sounds.playClick();
              onScrollTop();
            }}
            data-cursor="ring"
            aria-label="Back to top"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp size={13} className="back-top-arrow" />
          </button>
        </div>

      </div>
    </footer>
  );
}
