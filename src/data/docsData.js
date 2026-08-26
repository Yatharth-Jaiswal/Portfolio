export const docsData = {
  systemOverview: {
    title: 'SYSTEM ARCHITECTURE & PHILOSOPHY',
    version: 'v2.6.4-RELEASE',
    status: 'OPTIMIZED // PRODUCTION READY',
    architecture: [
      {
        layer: '01. PRESENTATION LAYER',
        desc: 'Built on React 18+ with component-driven isolation, strict state separation, and zero-compromise responsive layout geometry.'
      },
      {
        layer: '02. RENDER PIPELINE',
        desc: 'Direct HTML5 Canvas 2D / WebGL rendering context with requestAnimationFrame loop, DPR-adaptive scaling, and spatial indexing for 60fps particle physics.'
      },
      {
        layer: '03. MOTION & INTERACTION ENGINE',
        desc: 'GSAP ScrollTrigger orchestration coupled with Lenis inertial smoothing, custom magnetic cursor lerp, and Web Audio API synthesized sonic feedback.'
      },
      {
        layer: '04. DESIGN SYSTEM TOKENS',
        desc: 'Hardened dark charcoal palette (#0d1215), precision 1px borders, IBM Plex Mono technical metrics, and muted gold (#c89d47) accent states.'
      }
    ]
  },
  designTokens: [
    { token: '--bg-primary', value: '#0d1215', description: 'Base viewport dark background' },
    { token: '--bg-surface', value: '#12181c', description: 'Elevated technical container' },
    { token: '--border-subtle', value: 'rgba(255, 255, 255, 0.08)', description: 'Thin 1px structural dividing lines' },
    { token: '--accent-gold', value: '#c89d47', description: 'Active selection and glowing node highlight' },
    { token: '--text-mono', value: "'IBM Plex Mono', monospace", description: 'Technical labels, telemetry data, metadata' },
    { token: '--text-sans', value: "'Space Grotesk', sans-serif", description: 'Architectural headings & titles' }
  ],
  keyboardShortcuts: [
    { key: 'ESC', action: 'Close any active modal or drawer' },
    { key: '1 - 5', action: 'Quick jump to Section (Hero, About, Tech, Timeline, Contact)' },
    { key: 'D', action: 'Toggle System Documentation view' },
    { key: 'M', action: 'Toggle sound effects synthesizer on/off' }
  ],
  engineeringRules: [
    'Rule 01: Never sacrifice readability for flashiness. Ambient effects must maintain low opacity.',
    'Rule 02: Keep bundle sizes minimal, eliminating heavy UI frameworks in favor of clean CSS & standard web APIs.',
    'Rule 03: Frame rate consistency (60+ FPS) takes precedence over complex rendering passes.',
    'Rule 04: Ensure responsive elegance from 320px ultra-mobile to 4K ultra-wide monitors.'
  ]
};
