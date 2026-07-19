import React, { Suspense, useRef } from 'react';
import gsap from 'gsap';
import HeroModel from '../../three/HeroScene';
import bgPattern from '../../assets/images/hero-bg.png';
import profileImg from '../../assets/images/profile.png';
import { siteConfig } from '../../config/siteConfig';

export default function Hero() {
  const rotTarget = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(rotTarget.current, { y: nx * 0.10, x: ny * 0.08,
      duration: 1.0, ease: 'power2.out', overwrite: true });
  };
  const handleMouseLeave = () => {
    gsap.to(rotTarget.current, { x: 0, y: 0,
      duration: 1.8, ease: 'power3.out', overwrite: true });
  };

  return (
    <section id="hero" className="min-h-screen bg-d0 grid grid-cols-1 md:grid-cols-2 overflow-hidden relative">

      {/* Animated background glow layer */}
      <div id="hero-glow-layer" aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        <div className="absolute w-[640px] h-[640px] -top-[180px] -left-[140px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,.068)_0%,transparent_68%)] blur-[90px] animate-[hgl-drift-1_16s_ease-in-out_infinite_alternate] will-change-transform"></div>
        <div className="absolute w-[520px] h-[520px] -bottom-[160px] left-[18%] rounded-full bg-[radial-gradient(circle,rgba(126,184,164,.048)_0%,transparent_68%)] blur-[100px] animate-[hgl-drift-2_21s_ease-in-out_infinite_alternate_reverse] will-change-transform"></div>
        <div className="absolute w-[360px] h-[360px] top-[30%] right-[35%] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,.038)_0%,transparent_65%)] blur-[80px] animate-[hgl-drift-3_13s_ease-in-out_infinite_alternate] will-change-transform delay-[-4s]"></div>
      </div>

      {/* HERO LEFT — text content */}
      <div className="flex flex-col justify-center py-[100px] px-7 md:py-[120px] md:pl-[76px] md:pr-12 relative z-10">
        <div className="mb-[30px]">
          <p className="hl dim text-[clamp(2rem,7vw,3.2rem)] md:text-[clamp(2.8rem,4.4vw,5rem)]">
            Hey, I'm <span className="inline-flex items-center justify-center overflow-hidden shrink-0 rounded-full shadow-[0_4px_18px_rgba(0,0,0,.14)] relative top-[0.04em] w-[58px] h-[58px] bg-d3 border border-border">
              <img src={profileImg} alt={siteConfig.name} className="w-full h-full object-cover object-[center_20%]" />
            </span> <strong className="text-t-hi font-medium">{siteConfig.name.split(' ')[0]}</strong>
          </p>
          <p className="hl text-[clamp(2rem,7vw,3.2rem)] md:text-[clamp(2.8rem,4.4vw,5rem)]">{siteConfig.role}</p>
          <p className="hl dim text-[clamp(2rem,7vw,3.2rem)] md:text-[clamp(2.8rem,4.4vw,5rem)]">
            Based in <strong className="text-t-hi font-medium">{siteConfig.location}</strong>
          </p>
        </div>

        <p className="hero-sub">
          I specialise in creating thoughtful, research-backed digital products — from wireframe to high-fidelity prototype, with engineering precision.
        </p>

        <a href="#contact" className="inline-flex items-center self-start gap-2.5 px-5 py-[9px] rounded-full bg-gold text-d0 text-[0.78rem] font-medium tracking-[0.04em] font-sans opacity-0 animate-[fu_.85s_.88s_ease_forwards] transition-all hover:bg-[#d4b47a] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(201,169,110,.20)] cursor-none group" id="hero-cta">
          Get In Touch Today
          <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center shrink-0 transition-transform group-hover:rotate-45">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        <div className="absolute bottom-7 left-7 md:left-[76px] flex items-center gap-3 opacity-0 animate-[fu_.8s_1.2s_ease_forwards]" aria-hidden="true">
          <div className="sline"></div>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-t-lo">Scroll to explore</span>
        </div>
      </div>

      {/* Background pattern — top-left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '480px',
          height: '400px',
          left: 0,
          top: 0,
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '480px auto',
          opacity: 0.30,
          pointerEvents: 'none',
          zIndex: 0,
          mixBlendMode: 'lighten',
          maskImage: 'radial-gradient(ellipse 100% 100% at 0% 0%, black 30%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 0% 0%, black 30%, transparent 72%)',
        }}
      />

      {/* Background pattern — bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '480px',
          height: '400px',
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '480px auto',
          opacity: 0.30,
          pointerEvents: 'none',
          zIndex: 0,
          mixBlendMode: 'lighten',
          maskImage: 'radial-gradient(ellipse 100% 100% at 100% 100%, black 30%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 100% 100%, black 30%, transparent 72%)',
        }}
      />

      {/* HERO RIGHT — 3D Room Model */}
      <div className="relative h-[60vw] md:h-auto md:w-full flex items-center justify-center px-7 md:px-0 md:pr-[76px] z-10" id="hero-3d-container">
        <div
          className="w-full max-w-[480px] rounded-[24px] overflow-hidden bg-[#0c0b11] aspect-[1/0.92] cursor-default relative shadow-[0_16px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/5"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <HeroModel rotTarget={rotTarget} />
        </div>
      </div>
    </section>
  );
}
