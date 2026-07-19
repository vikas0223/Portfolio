import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. PRELOADER DOODLES
// Scattered in the background of the preloader.
// ==========================================
export function PreloaderDoodles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const doodles = el.querySelectorAll('.pre-doodle');
    doodles.forEach((doodle, idx) => {
      // Subtle float animation
      gsap.to(doodle, {
        x: '+=random(-5, 5)',
        y: '+=random(-5, 5)',
        rotation: '+=random(-2, 2)',
        duration: 'random(6, 9)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Slow fade in and out (soft pulse)
      gsap.fromTo(doodle,
        { opacity: 0 },
        {
          opacity: 'random(0.06, 0.14)',
          duration: 2.2,
          delay: idx * 0.15,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          repeatDelay: 5
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-5 pointer-events-none select-none overflow-hidden">
      {/* Doodle 1: Bézier handle (Top Left) */}
      <div className="pre-doodle absolute top-[12%] left-[10%] w-[100px] h-[60px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 100 60" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <path d="M 10 50 Q 50 10 90 50" strokeDasharray="3 3" opacity="0.6" />
          <rect x="47" y="27" width="6" height="6" fill="#0C0B09" stroke="#C9A96E" strokeWidth="1.2" />
          <line x1="50" y1="30" x2="30" y2="15" strokeWidth="0.8" />
          <line x1="50" y1="30" x2="70" y2="45" strokeWidth="0.8" />
          <circle cx="30" cy="15" r="2.5" fill="#0C0B09" stroke="#C9A96E" strokeWidth="1" />
          <circle cx="70" cy="45" r="2.5" fill="#0C0B09" stroke="#C9A96E" strokeWidth="1" />
        </svg>
      </div>

      {/* Doodle 2: Pen Tool (Top Right) */}
      <div className="pre-doodle absolute top-[15%] right-[12%] w-[80px] h-[80px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <path d="M 15 80 C 35 25, 65 25, 85 80" strokeDasharray="3 3" opacity="0.5" />
          <rect x="27" y="38" width="6" height="6" fill="#0C0B09" stroke="#C9A96E" strokeWidth="1.2" />
          <rect x="67" y="38" width="6" height="6" fill="#0C0B09" stroke="#C9A96E" strokeWidth="1.2" />
          {/* Minimal Pen Cursor tip */}
          <path d="M 48 30 L 44 38 L 47 40 L 41 46 L 49 48 Z" fill="#0C0B09" strokeWidth="1" />
        </svg>
      </div>

      {/* Doodle 3: Cursor Pointer + Annotation (Middle Left) */}
      <div className="pre-doodle absolute top-[40%] left-[8%] w-[80px] h-[80px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <path d="M 12 12 L 12 42 L 21 33 L 33 33 Z" fill="rgba(201, 169, 110, 0.12)" strokeWidth="1.2" />
          <g transform="translate(28, 38)">
            <rect x="0" y="0" width="48" height="15" rx="1.5" fill="#0C0B09" stroke="#C9A96E" strokeWidth="0.8" />
            <text x="5" y="10" fill="#C9A96E" fontSize="6.5" fontFamily="DM Mono" stroke="none">W: 320px</text>
          </g>
        </svg>
      </div>

      {/* Doodle 4: Wireframe rect (Middle Right) */}
      <div className="pre-doodle absolute top-[38%] right-[8%] w-[110px] h-[75px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 120 80" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <rect x="5" y="5" width="110" height="70" rx="2" strokeDasharray="3 3" />
          <line x1="5" y1="5" x2="115" y2="75" strokeWidth="0.6" opacity="0.4" />
          <line x1="115" y1="5" x2="5" y2="75" strokeWidth="0.6" opacity="0.4" />
          <rect x="42" y="32" width="36" height="15" rx="1" fill="#0C0B09" stroke="#C9A96E" strokeWidth="0.8" />
          <text x="45" y="41" fill="#C9A96E" fontSize="6.5" fontFamily="DM Mono" stroke="none">120×80</text>
        </svg>
      </div>

      {/* Doodle 5: Alignment Guides (Bottom Left) */}
      <div className="pre-doodle absolute bottom-[18%] left-[12%] w-[130px] h-[55px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 160 60" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <rect x="5" y="15" width="35" height="35" rx="2" strokeWidth="0.8" />
          <rect x="70" y="15" width="35" height="35" rx="2" strokeWidth="0.8" />
          <line x1="40" y1="32.5" x2="70" y2="32.5" strokeWidth="1" />
          <line x1="40" y1="28.5" x2="40" y2="36.5" strokeWidth="1" />
          <line x1="70" y1="28.5" x2="70" y2="36.5" strokeWidth="1" />
          <rect x="47" y="24.5" width="16" height="13" fill="#0C0B09" stroke="#C9A96E" strokeWidth="0.7" />
          <text x="50" y="33" fill="#C9A96E" fontSize="6.5" fontFamily="DM Mono" stroke="none">30</text>
          <line x1="0" y1="15" x2="160" y2="15" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      </div>

      {/* Doodle 6: Golden ratio spiral (Bottom Right) */}
      <div className="pre-doodle absolute bottom-[15%] right-[14%] w-[100px] h-[62px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 100 62" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <rect x="0" y="0" width="100" height="62" opacity="0.25" strokeWidth="0.6" />
          <line x1="62" y1="0" x2="62" y2="62" opacity="0.25" strokeWidth="0.6" />
          <line x1="62" y1="38" x2="100" y2="38" opacity="0.25" strokeWidth="0.6" />
          <line x1="86" y1="38" x2="86" y2="0" opacity="0.25" strokeWidth="0.6" />
          <line x1="86" y1="14" x2="62" y2="14" opacity="0.25" strokeWidth="0.6" />
          <path d="M 0 62 A 62 62 0 0 1 62 0 A 38 38 0 0 1 100 38 A 24 24 0 0 1 76 62 A 14 14 0 0 1 62 48 A 8 8 0 0 1 70 40 A 6 6 0 0 1 76 46" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Doodle 7: Auto Layout bounds (Top Center) */}
      <div className="pre-doodle absolute top-[8%] left-[45%] w-[80px] h-[80px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 80 80" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <rect x="15" y="15" width="50" height="50" rx="2.5" strokeDasharray="2 2" />
          <line x1="15" y1="40" x2="25" y2="40" strokeWidth="0.8" />
          <line x1="15" y1="37" x2="15" y2="43" strokeWidth="0.8" />
          <line x1="25" y1="37" x2="25" y2="43" strokeWidth="0.8" />
          <g transform="translate(32, 22)">
            <path d="M 0 4 L 16 4 M 0 1 L 0 7 M 16 1 L 16 7" strokeWidth="0.7" />
            <text x="3" y="10" fill="#C9A96E" fontSize="5.5" fontFamily="DM Mono" stroke="none">gap:8</text>
          </g>
        </svg>
      </div>

      {/* Doodle 8: Measurement arrows (Bottom Center) */}
      <div className="pre-doodle absolute bottom-[8%] left-[46%] w-[90px] h-[36px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 100 40" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <line x1="10" y1="20" x2="90" y2="20" strokeWidth="1" />
          <path d="M 10 20 L 14 17 M 10 20 L 14 23 M 90 20 L 86 17 M 90 20 L 86 23" strokeWidth="1" />
          <rect x="36" y="11" width="28" height="18" fill="#0C0B09" stroke="#C9A96E" strokeWidth="0.8" />
          <text x="40" y="22" fill="#C9A96E" fontSize="6.5" fontFamily="DM Mono" stroke="none">16px</text>
        </svg>
      </div>

      {/* Doodle 9: Pixel Grid Fragment (Far Left Middle) */}
      <div className="pre-doodle absolute top-[60%] left-[5%] w-[60px] h-[60px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 80 80" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <path d="M 0 10 L 80 10 M 0 30 L 80 30 M 0 50 L 80 50 M 0 70 L 80 70 M 10 0 L 10 80 M 30 0 L 30 80 M 50 0 L 50 80 M 70 0 L 70 80" strokeDasharray="1 3" opacity="0.35" />
          <rect x="30" y="30" width="20" height="20" fill="rgba(201, 169, 110, 0.15)" strokeWidth="1" />
          <circle cx="40" cy="40" r="1.5" fill="#C9A96E" stroke="none" />
        </svg>
      </div>

      {/* Doodle 10: Component outline (Far Right Middle) */}
      <div className="pre-doodle absolute top-[62%] right-[6%] w-[95px] h-[50px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 120 60" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <rect x="2" y="14" width="116" height="44" rx="2" strokeWidth="0.9" />
          <path d="M 2 14 L 2 2 Q 2 0 4 0 L 32 0 Q 34 0 34 2 L 34 14" fill="#0C0B09" strokeWidth="0.9" />
          <path d="M 8 6 L 12 2 L 16 6 L 12 10 Z" fill="#C9A96E" stroke="none" />
          <text x="21" y="8" fill="#C9A96E" fontSize="6" fontFamily="DM Mono" stroke="none">Button</text>
        </svg>
      </div>

      {/* Doodle 11: Tiny design token (Center Left Bottom) */}
      <div className="pre-doodle absolute bottom-[25%] left-[30%] w-[95px] h-[30px]" style={{ opacity: 0 }}>
        <svg viewBox="0 0 110 32" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <rect x="2" y="2" width="106" height="28" rx="14" fill="#0C0B09" strokeWidth="0.8" />
          <circle cx="14" cy="16" r="5" fill="#C9A96E" stroke="none" />
          <text x="24" y="19" fill="#C9A96E" fontSize="6.5" fontFamily="DM Mono" stroke="none">token:gold</text>
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// 2. ABOUT PORTRAIT DOODLES
// Placed around the portrait image in About section.
// ==========================================
export function AboutDoodles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const doodles = el.querySelectorAll('.about-doodle');
    doodles.forEach((doodle) => {
      // Subtle floating movement and gentle rotation
      gsap.to(doodle, {
        y: '+=3',
        rotation: '+=1',
        duration: 'random(5, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none select-none z-10">
      {/* Corner Crop Marks */}
      <div className="about-doodle absolute -top-4 -left-4 w-8 h-8 opacity-15">
        <svg viewBox="0 0 30 30" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1.2">
          <path d="M 5 25 L 5 5 L 25 5" />
          <line x1="0" y1="12" x2="10" y2="12" strokeDasharray="1 1" />
          <line x1="12" y1="0" x2="12" y2="10" strokeDasharray="1 1" />
        </svg>
      </div>
      <div className="about-doodle absolute -top-4 -right-4 w-8 h-8 opacity-15">
        <svg viewBox="0 0 30 30" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1.2" style={{ transform: 'rotate(90deg)' }}>
          <path d="M 5 25 L 5 5 L 25 5" />
          <line x1="0" y1="12" x2="10" y2="12" strokeDasharray="1 1" />
          <line x1="12" y1="0" x2="12" y2="10" strokeDasharray="1 1" />
        </svg>
      </div>
      <div className="about-doodle absolute -bottom-4 -left-4 w-8 h-8 opacity-15">
        <svg viewBox="0 0 30 30" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1.2" style={{ transform: 'rotate(-90deg)' }}>
          <path d="M 5 25 L 5 5 L 25 5" />
          <line x1="0" y1="12" x2="10" y2="12" strokeDasharray="1 1" />
          <line x1="12" y1="0" x2="12" y2="10" strokeDasharray="1 1" />
        </svg>
      </div>
      <div className="about-doodle absolute -bottom-4 -right-4 w-8 h-8 opacity-15">
        <svg viewBox="0 0 30 30" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1.2" style={{ transform: 'rotate(180deg)' }}>
          <path d="M 5 25 L 5 5 L 25 5" />
          <line x1="0" y1="12" x2="10" y2="12" strokeDasharray="1 1" />
          <line x1="12" y1="0" x2="12" y2="10" strokeDasharray="1 1" />
        </svg>
      </div>

      {/* Dimension Label (Figma style inspecting size) */}
      <div className="about-doodle absolute -top-8 left-[calc(50%-45px)] px-2 py-0.5 border border-[#C9A96E]/20 bg-d0 rounded text-[0.58rem] font-mono text-gold tracking-widest opacity-15">
        W: 420px × H: 480px
      </div>

      {/* Circular Measurement Guide (Center Right) */}
      <div className="about-doodle absolute -right-16 top-[15%] w-32 h-32 opacity-12">
        <svg viewBox="0 0 200 200" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <circle cx="100" cy="100" r="76" strokeDasharray="3 4" />
          <circle cx="100" cy="100" r="88" strokeDasharray="25 10 5 10" opacity="0.6" />
          <line x1="100" y1="10" x2="100" y2="190" strokeDasharray="1 5" opacity="0.3" />
          <line x1="10" y1="100" x2="190" y2="100" strokeDasharray="1 5" opacity="0.3" />
          <text x="105" y="32" fill="#C9A96E" fontSize="7" fontFamily="DM Mono" stroke="none">r: 76px</text>
          <text x="105" y="178" fill="#C9A96E" fontSize="7" fontFamily="DM Mono" stroke="none">360°</text>
        </svg>
      </div>

      {/* Bézier handle curves (Center Left) */}
      <div className="about-doodle absolute -left-20 top-[35%] w-24 h-12 opacity-12">
        <svg viewBox="0 0 100 40" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <path d="M 10 30 Q 50 10 90 30" strokeDasharray="2 2" />
          <rect x="47" y="17" width="6" height="6" fill="#0C0B09" stroke="#C9A96E" strokeWidth="1" />
          <line x1="50" y1="20" x2="30" y2="5" strokeWidth="0.8" />
          <circle cx="30" cy="5" r="2" fill="#C9A96E" stroke="none" />
        </svg>
      </div>

      {/* Thin geometric concentric circles (Bottom Left) */}
      <div className="about-doodle absolute -left-16 bottom-[15%] w-16 h-16 opacity-12">
        <svg viewBox="0 0 60 60" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <circle cx="30" cy="30" r="26" />
          <circle cx="30" cy="30" r="18" strokeDasharray="1 2.5" />
          <rect x="27" y="27" width="6" height="6" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Tiny crosshair alignment mark (Bottom Right) */}
      <div className="about-doodle absolute -right-10 bottom-[20%] w-10 h-10 opacity-12">
        <svg viewBox="0 0 40 40" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <line x1="20" y1="5" x2="20" y2="35" />
          <line x1="5" y1="20" x2="35" y2="20" />
          <circle cx="20" cy="20" r="10" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="4" />
        </svg>
      </div>

      {/* Baseline guides (Across Bottom) */}
      <div className="about-doodle absolute bottom-6 -left-[20px] -right-[20px] h-8 opacity-10">
        <svg viewBox="0 0 400 40" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8" preserveAspectRatio="none">
          <line x1="0" y1="10" x2="400" y2="10" opacity="0.3" />
          <line x1="0" y1="20" x2="400" y2="20" opacity="0.5" />
          <line x1="0" y1="30" x2="400" y2="30" opacity="0.3" />
          <text x="5" y="8" fill="#C9A96E" fontSize="6.5" fontFamily="DM Mono" stroke="none">GRID: BASELINE_ALIGN</text>
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// 3. PROJECT CARD UNIQUE DOODLES
// unique designer annotation language per project card.
// ==========================================
export function ProjectDoodles({ index }) {
  const doodleRef = useRef(null);

  useEffect(() => {
    const el = doodleRef.current;
    if (!el) return;

    // Line drawing effect using GSAP ScrollTrigger
    const paths = el.querySelectorAll('path, line, circle, rect');
    paths.forEach((path) => {
      const len = path.getTotalLength ? path.getTotalLength() : 150;
      gsap.fromTo(path,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

    // Slow independent floating drift
    gsap.to(el.querySelectorAll('.drift-path'), {
      y: '+=2.5',
      x: '+=1.5',
      duration: 'random(5, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.15
    });

    // Soft glow pulse
    gsap.to(el, {
      opacity: 0.14,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, [index]);

  // Project 01: FinWise (Finance)
  if (index === 0) {
    return (
      <svg
        ref={doodleRef}
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 opacity-[0.08]"
        stroke="#C9A96E"
        fill="none"
        strokeWidth="1"
      >
        {/* Financial Graph / Trendline */}
        <path className="drift-path" d="M 40 230 Q 120 185 180 215 T 330 135" strokeWidth="1.2" />
        <circle className="drift-path" cx="40" cy="230" r="2.5" fill="#C9A96E" stroke="none" />
        <circle className="drift-path" cx="180" cy="215" r="2.5" fill="#C9A96E" stroke="none" />
        <circle className="drift-path" cx="330" cy="135" r="2.5" fill="#C9A96E" stroke="none" />
        <text className="drift-path font-mono text-[7px]" x="335" y="137" fill="#C9A96E" stroke="none">+42.8%</text>

        {/* Wallet outline */}
        <g className="drift-path" transform="translate(315, 35)">
          <rect x="0" y="0" width="30" height="20" rx="2" strokeWidth="0.8" />
          <path d="M 20 0 L 20 20 M 20 10 L 30 10 A 3 3 0 0 1 27 13 L 20 13" strokeWidth="0.8" />
          <circle cx="25" cy="10" r="0.8" fill="#C9A96E" stroke="none" />
        </g>

        {/* Pie chart outline */}
        <g className="drift-path" transform="translate(45, 65)">
          <circle cx="30" cy="30" r="24" strokeDasharray="3 3" strokeWidth="0.8" />
          <path d="M 30 6 L 30 30 L 51 18" strokeWidth="0.8" />
          <path d="M 30 30 L 13 42" strokeWidth="0.8" />
          <text className="font-mono text-[6.5px]" x="38" y="13" fill="#C9A96E" stroke="none">64%</text>
          <text className="font-mono text-[6.5px]" x="7" y="29" fill="#C9A96E" stroke="none">22%</text>
        </g>

        {/* Grid System outline */}
        <rect x="20" y="20" width="360" height="260" strokeDasharray="2 6" strokeWidth="0.6" opacity="0.7" />
        <line x1="20" y1="150" x2="380" y2="150" strokeDasharray="2 6" strokeWidth="0.6" opacity="0.7" />
        <line x1="200" y1="20" x2="200" y2="280" strokeDasharray="2 6" strokeWidth="0.6" opacity="0.7" />
      </svg>
    );
  }

  // Project 02: NeonVoid (Cyberpunk record store platform)
  if (index === 1) {
    return (
      <svg
        ref={doodleRef}
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 opacity-[0.08]"
        stroke="#C9A96E"
        fill="none"
        strokeWidth="1"
      >
        {/* Vinyl grooves */}
        <g className="drift-path" transform="translate(270, 150)">
          <circle cx="0" cy="0" r="65" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="50" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="35" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="20" strokeWidth="0.6" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="8" fill="#0C0B09" strokeWidth="0.8" />
          {/* Tonearm */}
          <path d="M 55 -90 L 35 -55 L 12 -30 L 3 -3" strokeWidth="0.8" />
          <rect x="1" y="-5" width="5" height="3" transform="rotate(45)" strokeWidth="0.8" />
        </g>

        {/* Equalizer bars */}
        <g className="drift-path" transform="translate(45, 190)">
          <line x1="0" y1="40" x2="0" y2="10" strokeWidth="1.2" />
          <line x1="6" y1="40" x2="6" y2="25" strokeWidth="1.2" />
          <line x1="12" y1="40" x2="12" y2="5" strokeWidth="1.2" />
          <line x1="18" y1="40" x2="18" y2="18" strokeWidth="1.2" />
          <line x1="24" y1="40" x2="24" y2="30" strokeWidth="1.2" />
          <line x1="30" y1="40" x2="30" y2="12" strokeWidth="1.2" />
          <line x1="36" y1="40" x2="36" y2="22" strokeWidth="1.2" />
          <line x1="42" y1="40" x2="42" y2="35" strokeWidth="1.2" />
          <text className="font-mono text-[6px]" x="0" y="52" fill="#C9A96E" stroke="none">EQ: 44.1kHz</text>
        </g>

        {/* Audio Waveform */}
        <path className="drift-path" d="M 30 65 Q 60 25 90 65 T 150 65" strokeWidth="0.8" strokeDasharray="2 2" />
        <path className="drift-path" d="M 30 65 Q 60 95 90 65 T 150 65" strokeWidth="0.8" opacity="0.4" />
        <text className="drift-path font-mono text-[6.5px]" x="32" y="50" fill="#C9A96E" stroke="none">FREQ_SPECTRUM</text>
      </svg>
    );
  }

  // Project 03: Workout App
  if (index === 2) {
    return (
      <svg
        ref={doodleRef}
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 opacity-[0.08]"
        stroke="#C9A96E"
        fill="none"
        strokeWidth="1"
      >
        {/* Heartbeat line */}
        <path className="drift-path" d="M 230 60 L 255 60 L 260 48 L 265 82 L 271 35 L 276 68 L 280 56 L 284 60 L 310 60" strokeWidth="1.2" />
        <text className="drift-path font-mono text-[6.5px]" x="232" y="48" fill="#C9A96E" stroke="none">BPM: 132</text>

        {/* Progress Ring */}
        <g className="drift-path" transform="translate(60, 80)">
          <circle cx="30" cy="30" r="24" strokeWidth="2" opacity="0.35" />
          <path d="M 30 6 A 24 24 0 1 1 6 30" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="30" r="17" strokeWidth="2" opacity="0.35" />
          <path d="M 30 13 A 17 17 0 0 1 47 30" strokeWidth="2" strokeLinecap="round" />
          <text className="font-mono text-[6px]" x="-8" y="70" fill="#C9A96E" stroke="none">ACTIVE_RING: 84%</text>
        </g>

        {/* Fitness / Overload Graph */}
        <g className="drift-path" transform="translate(180, 160)">
          <rect x="0" y="0" width="160" height="90" strokeDasharray="3 3" strokeWidth="0.8" />
          <rect x="15" y="50" width="12" height="40" strokeWidth="0.8" />
          <rect x="45" y="35" width="12" height="55" strokeWidth="0.8" />
          <rect x="75" y="25" width="12" height="65" strokeWidth="0.8" />
          <rect x="105" y="10" width="12" height="80" strokeWidth="0.8" fill="rgba(201, 169, 110, 0.12)" />
          <line x1="0" y1="18" x2="160" y2="18" strokeDasharray="2 1" />
          <text className="font-mono text-[6.5px]" x="5" y="12" fill="#C9A96E" stroke="none">TARGET: 85KG</text>
          <text className="font-mono text-[5.5px]" x="122" y="85" fill="#C9A96E" stroke="none">W:04</text>
        </g>
      </svg>
    );
  }

  // Project 04: Saanjh (Mental Wellness Chatbot)
  if (index === 3) {
    return (
      <svg
        ref={doodleRef}
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 opacity-[0.08]"
        stroke="#C9A96E"
        fill="none"
        strokeWidth="1"
      >
        {/* Moon Outline & Grid */}
        <g className="drift-path" transform="translate(55, 45)">
          <path d="M 20 0 A 20 20 0 1 0 20 40 A 16 16 0 1 1 20 0" strokeWidth="1" />
          <line x1="20" y1="-8" x2="20" y2="48" strokeDasharray="1 3.5" />
          <line x1="-8" y1="20" x2="48" y2="20" strokeDasharray="1 3.5" />
          <text className="font-mono text-[6.5px]" x="-5" y="-5" fill="#C9A96E" stroke="none">LUNAR_GUIDE_V2</text>
        </g>

        {/* Chat Bubble Outline */}
        <g className="drift-path" transform="translate(250, 50)">
          <rect x="0" y="0" width="95" height="40" rx="4" strokeWidth="0.8" />
          <path d="M 20 40 L 15 48 L 28 40" strokeWidth="0.8" />
          <line x1="12" y1="13" x2="83" y2="13" strokeWidth="0.6" strokeDasharray="1 2" />
          <line x1="12" y1="22" x2="63" y2="22" strokeWidth="0.6" strokeDasharray="1 2" />
          <text className="font-mono text-[6px]" x="12" y="33" fill="#C9A96E" stroke="none">bot_response_active</text>
        </g>

        {/* Breathing concentric circles */}
        <g className="drift-path" transform="translate(90, 185)">
          <circle cx="0" cy="0" r="42" strokeDasharray="3 3.5" />
          <circle cx="0" cy="0" r="28" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="14" />
          <text className="font-mono text-[6px]" x="48" y="5" fill="#C9A96E" stroke="none">BREATH_CYCLE (5.5s)</text>
        </g>

        {/* Calm Wave Pattern */}
        <g className="drift-path" transform="translate(220, 200)">
          <path d="M 0 20 Q 30 5 60 20 T 120 20" strokeWidth="1" />
          <path d="M 0 20 Q 30 35 60 20 T 120 20" strokeWidth="0.6" opacity="0.45" />
          <text className="font-mono text-[6.5px]" x="2" y="4" fill="#C9A96E" stroke="none">ALPHA_SIGNAL_8Hz</text>
        </g>
      </svg>
    );
  }

  return null;
}

// ==========================================
// 4. CONTACT SECTION SYSTEM DOODLES
// Subtle computer system guides around Retro Computer.
// ==========================================
export function ContactDoodles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const doodles = el.querySelectorAll('.contact-doodle');
    doodles.forEach((doodle) => {
      // Subtle float movement
      gsap.to(doodle, {
        y: 'random(-3, 3)',
        x: 'random(-2, 2)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Pulse the online ping dot
    gsap.fromTo(el.querySelector('.online-ping'),
      { opacity: 0.3, scale: 0.8 },
      {
        opacity: 1,
        scale: 1.2,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
      <style>{`
        @keyframes data-flow {
          to {
            stroke-dashoffset: -24;
          }
        }
        .data-flow-line {
          animation: data-flow 1.8s linear infinite;
        }
        .data-flow-line-reverse {
          animation: data-flow 1.8s linear infinite reverse;
        }
      `}</style>
      
      {/* Side Data Flow Lines */}
      <svg viewBox="0 0 500 450" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
        <path className="data-flow-line" d="M 35 40 L 35 410" strokeDasharray="6 6" opacity="0.1" />
        <path className="data-flow-line-reverse" d="M 465 40 L 465 410" strokeDasharray="6 6" opacity="0.1" />
      </svg>

      {/* Signal Strength & Link status (Top Right) */}
      <div className="contact-doodle absolute top-[30px] right-[40px] w-20 h-10 opacity-15">
        <svg viewBox="0 0 60 25" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="1">
          <line x1="0" y1="20" x2="0" y2="16" strokeWidth="1.2" />
          <line x1="4" y1="20" x2="4" y2="12" strokeWidth="1.2" />
          <line x1="8" y1="20" x2="8" y2="8" strokeWidth="1.2" />
          <line x1="12" y1="20" x2="12" y2="4" strokeWidth="1.2" />
          <line x1="16" y1="20" x2="16" y2="0" strokeWidth="1.2" />
          <circle className="online-ping" cx="28" cy="10" r="2.5" fill="#C9A96E" stroke="none" />
          <text x="36" y="13" fontSize="6.5" fontFamily="DM Mono" fill="#C9A96E" stroke="none">LINK</text>
        </svg>
      </div>

      {/* System Load Coordinates (Top Left) */}
      <div className="contact-doodle absolute top-[30px] left-[40px] w-24 h-8 opacity-15">
        <svg viewBox="0 0 90 20" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <rect x="0" y="0" width="85" height="18" rx="2" />
          <text x="6" y="11" fontSize="6.5" fontFamily="DM Mono" fill="#C9A96E" stroke="none">SYS_LOAD: 12.8%</text>
        </svg>
      </div>

      {/* Mouse Cursor and Drift line (Middle Left) */}
      <div className="contact-doodle absolute top-[110px] left-[70px] w-16 h-16 opacity-10">
        <svg viewBox="0 0 50 50" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <path d="M 0 0 L 10 10 L 4 10 L 0 16 Z" fill="rgba(201, 169, 110, 0.1)" strokeWidth="0.8" />
          <line x1="10" y1="10" x2="28" y2="28" strokeDasharray="2 2" strokeWidth="0.8" />
          <text x="30" y="35" fontSize="6.5" fontFamily="DM Mono" fill="#C9A96E" stroke="none">trace</text>
        </svg>
      </div>

      {/* Terminal markers / prompts (Bottom Left) */}
      <div className="contact-doodle absolute bottom-[30px] left-[40px] w-48 h-6 opacity-15">
        <svg viewBox="0 0 200 20" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <text x="0" y="12" fontSize="7" fontFamily="DM Mono" fill="#C9A96E" stroke="none">&gt; secure_payload_stream: ok</text>
        </svg>
      </div>

      {/* Data Flow/Port Information (Bottom Right) */}
      <div className="contact-doodle absolute bottom-[30px] right-[40px] w-36 h-6 opacity-15">
        <svg viewBox="0 0 150 20" width="100%" height="100%" stroke="#C9A96E" fill="none" strokeWidth="0.8">
          <text x="25" y="12" fontSize="7" fontFamily="DM Mono" fill="#C9A96E" stroke="none">ADDR: 127.0.0.1:443</text>
        </svg>
      </div>
    </div>
  );
}
