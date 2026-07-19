import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { siteConfig } from '../../config/siteConfig';

export default function Footer() {
  const monogramRef = useRef(null);

  useEffect(() => {
    const el = monogramRef.current;
    if (!el) return;

    // Subtle breathing animation for footer signature doodle
    gsap.fromTo(el,
      { opacity: 0.15, scale: 0.98 },
      {
        opacity: 0.45,
        scale: 1.02,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      }
    );
  }, []);

  return (
    <footer className="w-full flex flex-col items-center justify-center py-12 border-t border-border bg-d0 relative z-10 select-none">
      <div ref={monogramRef} className="mb-4">
        {/* Elegant designer-inspired VS Monogram */}
        <svg viewBox="0 0 100 40" width="100" height="40" stroke="#C9A96E" fill="none" strokeWidth="1.2">
          {/* Subtle horizontal design baseline */}
          <line x1="10" y1="20" x2="90" y2="20" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.25" />
          
          {/* V */}
          <path d="M 36 12 L 44 28 L 52 12" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* S */}
          <path d="M 64 14 Q 56 12 56 18 T 64 24 Q 64 28 56 28" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Geometric inspection target circle */}
          <circle cx="50" cy="20" r="18" strokeWidth="0.6" strokeDasharray="1 3" opacity="0.4" />
          
          {/* Minimal coordinate ticks */}
          <line x1="50" y1="0" x2="50" y2="4" strokeWidth="0.8" opacity="0.5" />
          <line x1="50" y1="36" x2="50" y2="40" strokeWidth="0.8" opacity="0.5" />
          <line x1="30" y1="20" x2="34" y2="20" strokeWidth="0.8" opacity="0.5" />
          <line x1="66" y1="20" x2="70" y2="20" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>
      <p className="font-mono text-[0.6rem] text-t-lo/50 uppercase tracking-[0.2em]">
        Designed &amp; Built by {siteConfig.name} • © 2026
      </p>
    </footer>
  );
}
