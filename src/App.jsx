import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ParticleNetwork from './components/ParticleNetwork/ParticleNetwork';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Timeline from './components/Timeline/Timeline';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ResumeModal from './components/ResumeModal/ResumeModal';

import { sounds } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showHeader, setShowHeader] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isExcitedParticles, setIsExcitedParticles] = useState(false);

  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Track active sections on scroll in exact ordered hierarchy
    const sections = ['hero', 'about', 'skills', 'projects', 'timeline', 'education', 'certifications', 'contact'];
    const triggers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            setActiveSection(id);
            if (id !== 'hero') setShowHeader(true);
            else setShowHeader(false);
          },
          onEnterBack: () => {
            setActiveSection(id);
            if (id !== 'hero') setShowHeader(true);
            else setShowHeader(false);
          }
        });
        triggers.push(trigger);
      }
    });

    // Scroll reveal observer for section headings & components
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.section-header, .section-wrapper').forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      triggers.forEach((t) => t.kill());
      revealObserver.disconnect();
    };
  }, []);

  // Pause Lenis background smooth scroll and lock body when resume modal is open
  useEffect(() => {
    if (isResumeOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
  }, [isResumeOpen]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid hotkeys when typing in form inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      if (e.key === 'Escape') {
        setIsResumeOpen(false);
      } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
        const mapping = {
          '1': 'hero',
          '2': 'about',
          '3': 'skills',
          '4': 'projects',
          '5': 'timeline',
          '6': 'education',
          '7': 'certifications',
          '8': 'contact'
        };
        scrollToSection(mapping[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: id === 'hero' ? 0 : -30, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(id);
    }
  };

  const handleOpenResume = () => {
    sounds.playSuccess();
    setIsResumeOpen(true);
  };

  const handleHireMe = () => {
    setIsResumeOpen(false);
    setTimeout(() => {
      scrollToSection('contact');
      const nameInput = document.getElementById('contact-name');
      if (nameInput) {
        nameInput.focus();
      }
    }, 150);
  };

  return (
    <div className="portfolio-app-root">
      {/* Interactive 3D/2D Constellation Background */}
      <ParticleNetwork isExcited={isExcitedParticles} />

      {/* Ambient Tech Grid */}
      <div className="ambient-tech-grid" aria-hidden="true" />

      {/* Sticky Floating Technical Header */}
      <Header
        activeSection={activeSection}
        onNavClick={scrollToSection}
        visible={showHeader}
      />

      {/* Main Content Sections in Exact Required Sequence */}
      <main className="main-content-flow">
        {/* 00: HERO */}
        <Hero
          activeSection={activeSection}
          onNavClick={scrollToSection}
          onOpenResume={handleOpenResume}
        />

        {/* 01: ABOUT */}
        <About />

        {/* 02: TECHNOLOGY / SKILLS */}
        <Skills />

        {/* 03: PROJECTS */}
        <Projects onSelectProject={() => {}} />

        {/* 04: EXPERIENCE */}
        <Timeline />

        {/* 05: EDUCATION */}
        <Education />

        {/* 06: CERTIFICATIONS */}
        <Certifications />

        {/* 07: CONTACT */}
        <Contact onTriggerExcited={setIsExcitedParticles} />
      </main>

      {/* System Status Footer */}
      <Footer onScrollTop={() => scrollToSection('hero')} />

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onHireMe={handleHireMe}
      />
    </div>
  );
}
