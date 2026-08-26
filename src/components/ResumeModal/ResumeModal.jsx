import React from 'react';
import { sounds } from '../../utils/audio';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Phone, 
  Mail, 
  MapPin, 
  Globe 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose, onHireMe }) {
  if (!isOpen) return null;

  const handleHireMe = (e) => {
    e.preventDefault();
    sounds.playSuccess();
    if (onHireMe) {
      onHireMe();
    } else {
      onClose();
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="resume-modal-backdrop" onClick={onClose} data-lenis-prevent>
      <div 
        className="resume-modal-container" 
        onClick={(e) => e.stopPropagation()}
        data-cursor="default"
        data-lenis-prevent
      >
        {/* Header */}
        <div className="resume-modal-header">
          <div className="resume-header-info">
            <span className="resume-tag">// CURRICULUM VITAE</span>
            <h3 className="resume-name">YATHARTH JAISWAL</h3>
            <span className="resume-role">WEB DEVELOPER</span>
            <div className="resume-contact-inline">
              <a href="mailto:yatharthjai789@gmail.com" className="resume-link"><Mail size={11} /> yatharthjai789@gmail.com</a>
              <a href="tel:+919936872903" className="resume-link"><Phone size={11} /> +91 9936872903</a>
              <a href="https://github.com/Yatharth-Jaiswal" target="_blank" rel="noopener noreferrer" className="resume-link"><GithubIcon size={11} /> github.com/Yatharth-Jaiswal</a>
              <a href="https://linkedin.com/in/yatharth-jaiswal-b24656360/" target="_blank" rel="noopener noreferrer" className="resume-link"><LinkedinIcon size={11} /> linkedin.com/in/yatharth-jaiswal</a>
              <span><MapPin size={11} /> Unnao / Kanpur, India</span>
            </div>
          </div>

          <div className="resume-header-actions">
            <button 
              type="button" 
              className="resume-btn"
              onClick={() => {
                sounds.playClick();
                window.print();
              }}
              title="Print CV"
            >
              <Printer size={14} />
              <span>PRINT</span>
            </button>

            <button 
              type="button" 
              className="resume-btn gold-variant"
              onClick={handleHireMe}
              title="Contact Direct"
              data-cursor="open"
            >
              <Mail size={14} />
              <span>HIRE ME</span>
            </button>

            <button 
              type="button" 
              className="resume-close-btn"
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              aria-label="Close CV"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CV Document Content */}
        <div className="resume-modal-body" data-lenis-prevent tabIndex={0}>
          
          {/* Summary */}
          <div className="resume-section">
            <h4 className="resume-sec-title">
              <Briefcase size={14} /> PROFESSIONAL SUMMARY
            </h4>
            <p className="resume-sec-text">
              Passionate Web Developer with 6 months of industry experience developing responsive, high-performance websites using HTML, CSS, and JavaScript. Experienced in collaborating with teams, optimizing website speed by up to 70%, and delivering user-friendly, SEO-optimized web solutions. Contributed to live business websites by implementing responsive layouts, improving performance, and ensuring cross-browser compatibility.
            </p>
          </div>

          {/* Core Technical Strengths */}
          <div className="resume-section">
            <h4 className="resume-sec-title">
              <Code size={14} /> TECHNICAL SKILLS
            </h4>
            <div className="resume-skills-grid">
              <div className="resume-skill-cat">
                <span className="cat-label">Core Web Languages:</span>
                <span className="cat-items">HTML5, CSS3, JavaScript (ES6+), Python</span>
              </div>
              <div className="resume-skill-cat">
                <span className="cat-label">Frameworks &amp; Libraries:</span>
                <span className="cat-items">React.js (Beginner / Core Hooks &amp; Components), Vite</span>
              </div>
              <div className="resume-skill-cat">
                <span className="cat-label">Tooling &amp; Workflows:</span>
                <span className="cat-items">Git, GitHub, Speed Optimization (70% load time reduction), SEO, Cross-Browser Compatibility, Team Communication</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="resume-section">
            <h4 className="resume-sec-title">
              <Award size={14} /> PROFESSIONAL EXPERIENCE
            </h4>
            
            <div className="resume-job-item">
              <div className="job-item-header">
                <div>
                  <strong className="job-role">Web Developer</strong>
                  <div className="job-company">PixeloLabs</div>
                </div>
                <span className="job-period">08/2023 – 01/2024</span>
              </div>
              <ul className="job-bullets">
                <li>Developed and deployed responsive, SEO-friendly websites.</li>
                <li>Improved page load speed by up to 70% using frontend asset and rendering optimization techniques.</li>
                <li>Collaborated with UI/UX designers and backend developers to deliver production-ready features.</li>
                <li>Debugged and tested applications thoroughly to guarantee flawless cross-browser compatibility.</li>
              </ul>
            </div>
          </div>

          {/* Featured Live Projects */}
          <div className="resume-section">
            <h4 className="resume-sec-title">
              <Globe size={14} /> FEATURED PRODUCTION PROJECTS
            </h4>

            <div className="resume-job-item">
              <div className="job-item-header">
                <div>
                  <strong className="job-role">Backyard Breaks</strong>
                  <div className="job-company">HTML, CSS &amp; JavaScript &nbsp;|&nbsp; <a href="https://backyardbreaks.com" target="_blank" rel="noopener noreferrer" className="resume-link">backyardbreaks.com <ExternalLink size={10} /></a></div>
                </div>
                <span className="job-period">2024</span>
              </div>
              <ul className="job-bullets">
                <li>Developed responsive and SEO-friendly web pages including Meet the Team, Rewards Program, and FAQ following modern web standards.</li>
                <li>Integrated live streaming and social media platforms (Whatnot, TikTok, and Twitch) to enhance user engagement.</li>
                <li>Collaborated with the development team to deliver a consistent and user-friendly experience.</li>
                <li>Optimized website performance and ensured seamless functionality across Chrome, Firefox, Safari, and mobile devices.</li>
              </ul>
            </div>

            <div className="resume-job-item">
              <div className="job-item-header">
                <div>
                  <strong className="job-role">InfiniWell</strong>
                  <div className="job-company">HTML, CSS &amp; JavaScript &nbsp;|&nbsp; <a href="https://infiniwell.com" target="_blank" rel="noopener noreferrer" className="resume-link">infiniwell.com <ExternalLink size={10} /></a></div>
                </div>
                <span className="job-period">2023</span>
              </div>
              <ul className="job-bullets">
                <li>Developed responsive product listing pages with filtering functionality to improve product discovery.</li>
                <li>Built content-driven pages including Science, Ingredients, Blog, and Support with a focus on usability and clean UI.</li>
                <li>Improved mobile responsiveness, website performance, and cross-browser compatibility for an enhanced user experience.</li>
                <li>Maintained clean, reusable, and well-structured front-end code following modern best practices.</li>
              </ul>
            </div>

            <div className="resume-job-item">
              <div className="job-item-header">
                <div>
                  <strong className="job-role">Travel_X (Tour &amp; Travels)</strong>
                  <div className="job-company">HTML5, CSS3, JavaScript &amp; Swiper.js &nbsp;|&nbsp; <a href="https://Yatharth-Jaiswal.github.io/Tour_And_Travels/" target="_blank" rel="noopener noreferrer" className="resume-link">live preview <ExternalLink size={10} /></a></div>
                </div>
                <span className="job-period">2024</span>
              </div>
              <ul className="job-bullets">
                <li>Engineered an interactive luxury travel curation portal featuring split-typography hero transitions and smooth kinetic animations.</li>
                <li>Built modular destination showcases (Jaipur, Udaipur, Srinagar) with interactive Swiper.js slider carousels and curated itineraries.</li>
                <li>Implemented clean, responsive frontend architecture ensuring seamless cross-device compatibility across mobile, tablet, and desktop viewports.</li>
              </ul>
            </div>
          </div>

          {/* Certifications */}
          <div className="resume-section">
            <h4 className="resume-sec-title">
              <CheckCircle2 size={14} /> CERTIFICATIONS &amp; JOB SIMULATIONS
            </h4>
            <div className="resume-certs-grid">
              <div className="cert-box">
                <strong className="cert-title">Technology Job Simulation</strong>
                <span className="cert-issuer">Issuer: Deloitte &nbsp;|&nbsp; <a href="https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_6a52887b6e8414e4b8bdc821_1783925222543_completion_certificate.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">certificate <ExternalLink size={10} /></a></span>
              </div>
              <div className="cert-box">
                <strong className="cert-title">Software Engineering Job Simulation</strong>
                <span className="cert-issuer">Issuer: Forage &nbsp;|&nbsp; <a href="https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/xv8eSGu7nksKNiCQj_2sNmYuurxgpFYawco_6a52887b6e8414e4b8bdc821_1783929301566_completion_certificate.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">certificate <ExternalLink size={10} /></a></span>
              </div>
              <div className="cert-box">
                <strong className="cert-title">AWS Artificial Intelligence Practitioner Learning Plan</strong>
                <span className="cert-issuer">Issuer: AWS</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="resume-section">
            <h4 className="resume-sec-title">
              <GraduationCap size={14} /> EDUCATION
            </h4>
            
            <div className="resume-job-item">
              <div className="job-item-header">
                <div>
                  <strong className="job-role">Bachelor&apos;s of Computer Application (BCA)</strong>
                  <div className="job-company">Rama University, Kanpur, UP &nbsp;|&nbsp; Specialization in Web Development</div>
                </div>
                <span className="job-period">2024 – 2027</span>
              </div>
            </div>

            <div className="resume-job-item">
              <div className="job-item-header">
                <div>
                  <strong className="job-role">Intermediate (Class 12th)</strong>
                  <div className="job-company">Kendriya Vidyalaya, CBSE, Unnao, UP</div>
                </div>
                <span className="job-period">2021 – 2022</span>
              </div>
            </div>

            <div className="resume-job-item">
              <div className="job-item-header">
                <div>
                  <strong className="job-role">High School (Class 10th)</strong>
                  <div className="job-company">Kendriya Vidyalaya, CBSE, Unnao, UP</div>
                </div>
                <span className="job-period">2020</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
