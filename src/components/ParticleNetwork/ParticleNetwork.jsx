import React, { useEffect, useRef } from 'react';
import './ParticleNetwork.css';

export default function ParticleNetwork({ isExcited = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with interpolation
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      radius: 180,
      isHovering: false
    };

    // Responsive node count
    const getNodeCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 45;
      if (w < 1024) return 75;
      return 115;
    };

    let nodeCount = getNodeCount();
    let particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        // Distribute particles with cluster tendency towards edges & geometric space
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 400 - 200; // 3D depth perception
        
        // Calibrated slow serene cosmic drift
        const speed = Math.random() * 0.22 + 0.08;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.vz = (Math.random() - 0.5) * 0.15;

        // Visual attributes & twinkling stars
        this.baseRadius = Math.random() * 1.6 + 0.7;
        this.isGold = Math.random() < 0.15; // 15% gold accent stars
        this.isStar = Math.random() < 0.25; // 25% twinkling distant stars
        this.alpha = Math.random() * 0.45 + 0.25;
        this.pulseSpeed = Math.random() * 0.015 + 0.005;
        this.pulseVal = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulseVal += this.pulseSpeed;

        // Base drift
        this.x += this.vx * (isExcited ? 2.2 : 1);
        this.y += this.vy * (isExcited ? 2.2 : 1);
        this.z += this.vz;

        // Wrap around boundaries smoothly
        if (this.x < -40) this.x = width + 40;
        if (this.x > width + 40) this.x = -40;
        if (this.y < -40) this.y = height + 40;
        if (this.y > height + 40) this.y = -40;
        if (this.z < -200) this.z = 200;
        if (this.z > 200) this.z = -200;

        // Mouse interaction: Gentle attraction & fluid displacement
        if (mouse.isHovering) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 0.018;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
            // Dampen excessive velocity smoothly
            this.vx *= 0.97;
            this.vy *= 0.97;
          }
        }
      }

      draw() {
        // Perspective scale factor
        const fov = 400;
        const scale = fov / (fov + this.z);
        const screenX = (this.x - width / 2) * scale + width / 2;
        const screenY = (this.y - height / 2) * scale + height / 2;
        const radius = this.baseRadius * scale;

        // Smooth twinkling star pulsation
        const twinkle = Math.sin(this.pulseVal) * 0.25;
        const currentAlpha = Math.max(0.08, Math.min(1, (this.alpha + twinkle) * (scale * 0.85)));

        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(0.5, radius), 0, Math.PI * 2);

        if (this.isGold) {
          ctx.fillStyle = `rgba(200, 157, 71, ${currentAlpha * 1.5})`;
          ctx.shadowColor = 'rgba(200, 157, 71, 0.6)';
          ctx.shadowBlur = this.isStar ? 8 : 4;
        } else {
          ctx.fillStyle = `rgba(220, 235, 245, ${currentAlpha * 0.8})`;
          ctx.shadowColor = this.isStar ? 'rgba(255, 255, 255, 0.4)' : 'transparent';
          ctx.shadowBlur = this.isStar ? 4 : 0;
        }
        ctx.fill();

        return { screenX, screenY, scale, isGold: this.isGold, currentAlpha };
      }
    }

    // Initialize particles
    for (let i = 0; i < nodeCount; i++) {
      particles.push(new Particle());
    }

    // Connect nearby nodes with thin geometric lines
    const connectNodes = (renderedPoints) => {
      const maxDistance = window.innerWidth < 768 ? 95 : 135;
      const len = renderedPoints.length;

      for (let i = 0; i < len; i++) {
        const p1 = renderedPoints[i];
        if (!p1) continue;

        let connections = 0;
        for (let j = i + 1; j < len; j++) {
          const p2 = renderedPoints[j];
          if (!p2) continue;

          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connections++;
            if (connections > 6) break; // Limit max wireframe density for clean look

            const normalizedDist = 1 - dist / maxDistance;
            const lineAlpha = normalizedDist * 0.16 * Math.min(p1.currentAlpha, p2.currentAlpha);

            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);

            if (p1.isGold || p2.isGold) {
              ctx.strokeStyle = `rgba(200, 157, 71, ${lineAlpha * 1.6})`;
              ctx.lineWidth = 0.75;
            } else {
              ctx.strokeStyle = `rgba(180, 200, 215, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
            }
            ctx.stroke();
          }
        }
      }
    };

    // Main render loop
    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render nodes and collect transformed 2D positions
      const renderedPoints = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        renderedPoints.push(p.draw());
      }

      // Draw constellation wireframe
      connectNodes(renderedPoints);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodeCount = getNodeCount();
      particles = [];
      for (let i = 0; i < nodeCount; i++) {
        particles.push(new Particle());
      }
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = width * 0.5;
      mouse.targetY = height * 0.5;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isExcited]);

  return (
    <div className="particle-network-container" aria-hidden="true">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="particle-vignette" />
    </div>
  );
}
