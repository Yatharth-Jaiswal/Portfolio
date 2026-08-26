import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { copyToClipboard } from '../../utils/helpers';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Terminal, 
  Radio, 
  MapPin,
  AlertCircle 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../Icons';
import './Contact.css';

export default function Contact({ onTriggerExcited }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    sounds.playClick();
    const ok = await copyToClipboard('yatharthjai789@gmail.com');
    if (ok) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    sounds.playClick();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/yatharthjai789@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name || 'Visitor / Recruiter',
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name || formState.email}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (response.ok || data.success === 'true') {
        sounds.playSuccess();

        // Trigger celebratory particle burst & confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#c89d47', '#dfb75c', '#ffffff', '#8ab4f8']
        });

        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Transmission failed. Please try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(
        err.message || 'Unable to send message directly. Please click to copy email and send via your email client.'
      );
    }
  };

  return (
    <section id="contact" className="section-wrapper contact-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-header-tag">07 // TRANSMISSION</span>
        <h2 className="section-header-title">CONTACT</h2>
        <div className="section-header-line" />
      </div>

      <div className="contact-main-grid">
        
        {/* Left Column: Bold Architectural Typography */}
        <div className="contact-typography-col">
          <div className="contact-live-beacon">
            <Radio size={14} className="beacon-icon" />
            <span className="beacon-text">TRANSMITTER ONLINE // OPEN FOR OPPORTUNITIES</span>
          </div>

          <h3 className="contact-huge-headline">
            <span className="contact-line">LET&apos;S</span>
            <span className="contact-line highlight-gold">BUILD</span>
            <span className="contact-line">SOMETHING</span>
            <span className="contact-line highlight-white">GREAT.</span>
          </h3>

          <div className="contact-direct-link-block">
            <span className="direct-label">DIRECT COMMUNICATIONS:</span>
            
            {/* Email Card */}
            <div 
              className="direct-email-card"
              onClick={handleCopyEmail}
              data-cursor="copy"
              onMouseEnter={() => {
                sounds.playHover();
                onTriggerExcited?.(true);
              }}
              onMouseLeave={() => onTriggerExcited?.(false)}
            >
              <div className="direct-email-left">
                <Mail size={16} className="email-icon" />
                <span className="email-address">yatharthjai789@gmail.com</span>
              </div>
              <div className="direct-email-right">
                {copiedEmail ? (
                  <span className="copied-badge">
                    <Check size={12} /> COPIED
                  </span>
                ) : (
                  <span className="copy-action">
                    <Copy size={12} /> CLICK TO COPY
                  </span>
                )}
              </div>
            </div>

            {/* Location Card */}
            <div className="contact-location-card">
              <div className="contact-location-left">
                <MapPin size={16} className="location-icon" />
                <span className="location-text">Location: India</span>
              </div>
              <span className="location-badge">OPEN FOR REMOTE // WORLDWIDE</span>
            </div>
          </div>

          {/* Social Network Channels */}
          <div className="contact-social-links-grid">
            <a
              href="https://github.com/Yatharth-Jaiswal"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
              data-cursor="open"
              onMouseEnter={() => sounds.playHover()}
            >
              <GithubIcon size={14} />
              <span>GITHUB // @YATHARTH-JAISWAL</span>
              <ArrowRight size={12} className="social-arr" />
            </a>

            <a
              href="https://linkedin.com/in/yatharth-jaiswal-b24656360/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
              data-cursor="open"
              onMouseEnter={() => sounds.playHover()}
            >
              <LinkedinIcon size={14} />
              <span>LINKEDIN // YATHARTH JAISWAL</span>
              <ArrowRight size={12} className="social-arr" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Dispatch Terminal */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            
            {/* Card Header */}
            <div className="contact-form-header">
              <div className="form-header-left">
                <span className="form-header-index">// MSG.01</span>
                <span className="form-header-title">DIRECT MESSAGE DISPATCH</span>
              </div>
              <span className="form-status-indicator">ENCRYPTED // TLS</span>
            </div>

            {submitted ? (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <Check size={28} className="success-check-icon" />
                </div>
                <h4 className="success-title">TRANSMISSION DELIVERED</h4>
                <p className="success-desc">
                  Thank you! Your message has been sent directly to yatharthjai789@gmail.com. I will review and respond to your return address within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn-technical"
                  onClick={() => setSubmitted(false)}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-element">
                {errorMessage && (
                  <div className="form-error-banner">
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    YOUR NAME / IDENTIFIER
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="form-input"
                    onFocus={() => sounds.playHover()}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    RETURN EMAIL ADDRESS
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="form-input"
                    onFocus={() => sounds.playHover()}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    TRANSMISSION MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Brief outline of your project, web development role, or inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="form-textarea"
                    onFocus={() => sounds.playHover()}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-technical gold-variant form-submit-btn"
                  data-cursor="open"
                  onMouseEnter={() => {
                    sounds.playHover();
                    onTriggerExcited?.(true);
                  }}
                  onMouseLeave={() => onTriggerExcited?.(false)}
                >
                  {isSubmitting ? (
                    <span>DISPATCHING MESSAGE...</span>
                  ) : (
                    <>
                      <span>GET IN TOUCH</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                  <div className="submit-sonar-ring" />
                </button>
              </form>
            )}

            {/* Micro Card Footer */}
            <div className="form-card-footer">
              <span className="footer-spec">RESPONSE TIME: &lt; 24H</span>
              <span className="footer-spec">LOCATION: INDIA // REMOTE</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
