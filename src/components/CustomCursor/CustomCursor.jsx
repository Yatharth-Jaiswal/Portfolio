import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState({
    variant: 'default',
    text: '',
    isHovered: false,
    isActive: false
  });

  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({
    currentX: -100,
    currentY: -100,
    targetX: -100,
    targetY: -100,
    isVisible: false
  });

  useEffect(() => {
    // Check for touch devices
    if (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window) {
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current.targetX = clientX;
      mousePos.current.targetY = clientY;

      // Immediate zero-latency update for the center precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      if (!mousePos.current.isVisible) {
        mousePos.current.isVisible = true;
        mousePos.current.currentX = clientX;
        mousePos.current.currentY = clientY;
        if (rootRef.current) {
          rootRef.current.classList.remove('is-hidden');
        }
      }
    };

    const handlePointerDown = () => {
      setCursorVariant((prev) => ({ ...prev, isActive: true }));
    };

    const handlePointerUp = () => {
      setCursorVariant((prev) => ({ ...prev, isActive: false }));
    };

    const handleMouseLeave = () => {
      mousePos.current.isVisible = false;
      if (rootRef.current) {
        rootRef.current.classList.add('is-hidden');
      }
    };

    const handleMouseEnter = () => {
      mousePos.current.isVisible = true;
      if (rootRef.current) {
        rootRef.current.classList.remove('is-hidden');
      }
    };

    // Event delegation for contextual cursors
    let lastTarget = null;
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea, [role="button"]');
      if (target === lastTarget) return;
      lastTarget = target;

      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        const cursorText = target.getAttribute('data-cursor-text') || '';

        if (cursorType) {
          setCursorVariant({
            variant: cursorType,
            text: cursorText,
            isHovered: true,
            isActive: false
          });
        } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
          setCursorVariant({
            variant: 'link',
            text: '',
            isHovered: true,
            isActive: false
          });
        }
      } else {
        setCursorVariant({
          variant: 'default',
          text: '',
          isHovered: false,
          isActive: false
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // High frequency smooth animation loop for the outer ring
    let animId;
    const lerpSpeed = 0.32; // Snappy, ultra-fluid response

    const renderLoop = () => {
      const { targetX, targetY } = mousePos.current;

      mousePos.current.currentX += (targetX - mousePos.current.currentX) * lerpSpeed;
      mousePos.current.currentY += (targetY - mousePos.current.currentY) * lerpSpeed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mousePos.current.currentX}px, ${mousePos.current.currentY}px, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window !== 'undefined' && (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <div ref={rootRef} className="custom-cursor-root is-hidden" aria-hidden="true">
      {/* Zero-latency Hardware Precision Dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${cursorVariant.isActive ? 'is-active' : ''} ${
          cursorVariant.isHovered ? 'is-hovered' : ''
        }`}
      />

      {/* High-frequency Ultra-smooth Follower Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring variant-${cursorVariant.variant} ${cursorVariant.isActive ? 'is-active' : ''} ${
          cursorVariant.isHovered ? 'is-hovered' : ''
        }`}
      >
        {cursorVariant.text && <span className="cursor-text">{cursorVariant.text}</span>}
      </div>
    </div>
  );
}
