import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../config/projectData';

gsap.registerPlugin(ScrollTrigger);

function drawCardBg(el, cfg, idx) {
  const cv = document.createElement('canvas');
  cv.width = 800; cv.height = 520;
  const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0,0,800,520);
  g.addColorStop(0, cfg.bg[0]); g.addColorStop(1, cfg.bg[1]);
  ctx.fillStyle = g; ctx.fillRect(0,0,800,520);
  ctx.strokeStyle = cfg.line; ctx.globalAlpha = .07; ctx.lineWidth = 1;
  for (let x=0; x<800; x+=44) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,520); ctx.stroke(); }
  for (let y=0; y<520; y+=44) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(800,y); ctx.stroke(); }
  ctx.globalAlpha = .12; ctx.strokeStyle = cfg.acc; ctx.lineWidth = 1.5;
  for (let i=-520; i<800; i+=80) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i+520,520); ctx.stroke(); }
  ctx.globalAlpha = 1;
  const rg = ctx.createRadialGradient(400,260,20,400,260,260);
  rg.addColorStop(0, cfg.acc+'33'); rg.addColorStop(1, 'transparent');
  ctx.fillStyle = rg; ctx.fillRect(0,0,800,520);
  ctx.globalAlpha = .06; ctx.font = 'bold 200px serif'; ctx.fillStyle = '#fff';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('0'+(idx+1), 400, 260);
  el.style.backgroundImage = `url(${cv.toDataURL()})`;
}

export default function Projects() {
  useEffect(() => {
    // Draw canvas backgrounds for both desktop and mobile preview elements
    PROJECTS.forEach((p, i) => {
      const elDesk = document.getElementById(`pi-desk-${i+1}`);
      const elMob = document.getElementById(`pi-mob-${i+1}`);
      if (elDesk) drawCardBg(elDesk, p, i);
      if (elMob) drawCardBg(elMob, p, i);
    });

    const isMobile = window.matchMedia('(max-width:767px)').matches;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        PROJECTS.forEach((p) => {
          const sec = document.getElementById(`psec-${p.id}`);
          if (!sec) return;

          const topHalf = sec.querySelector('.title-top');
          const bottomHalf = sec.querySelector('.title-bottom');
          const reveal = sec.querySelector('.project-reveal');
          const desc = sec.querySelector('.project-desc');
          const tech = sec.querySelector('.project-tech');
          const ctas = sec.querySelector('.project-ctas');
          const glow = sec.querySelector('.project-glow');

          // Initial positioning and 3D states
          gsap.set(topHalf, { rotateX: 0, y: 0, autoAlpha: 1 });
          gsap.set(bottomHalf, { rotateX: 0, y: 0, autoAlpha: 1 });
          gsap.set(reveal, { scale: 0.95, autoAlpha: 0 });
          gsap.set(desc, { y: 24, autoAlpha: 0 });
          gsap.set(tech, { y: 24, autoAlpha: 0 });
          gsap.set(ctas, { y: 24, autoAlpha: 0 });
          gsap.set(glow, { autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: 'top top',
              end: '+=150%',
              pin: true,
              pinSpacing: true,
              scrub: 1.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Theatre curtain style split reveal timeline
          tl.to(topHalf, { rotateX: -25, y: -110, autoAlpha: 0, filter: 'blur(6px)', duration: 0.5 }, 0.00)
            .to(bottomHalf, { rotateX: 25, y: 110, autoAlpha: 0, filter: 'blur(6px)', duration: 0.5 }, 0.00)
            .to(reveal, { scale: 1, autoAlpha: 1, duration: 0.5 }, 0.20)
            .to(glow, { autoAlpha: 1, duration: 0.5 }, 0.20)
            .to(desc, { y: 0, autoAlpha: 1, duration: 0.3 }, 0.35)
            .to(tech, { y: 0, autoAlpha: 1, duration: 0.3 }, 0.45)
            .to(ctas, { y: 0, autoAlpha: 1, duration: 0.3 }, 0.55);
        });
      } else {
        // Mobile cards fade up cleanly
        const cards = document.querySelectorAll('.mob-proj-card');
        cards.forEach((card) => {
          gsap.fromTo(card,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="bg-d0 w-full relative overflow-visible pt-20 md:pt-[120px] pb-16 md:pb-[80px] z-10">
      <div id="proj-title-wrap" className="text-center px-5 sm:px-8 md:px-[72px] mb-10 md:mb-[72px] relative z-10 isolate">
        <p className="slabel justify-center after:hidden">Selected Work</p>
        <h2 className="stitle !mb-0 text-[clamp(2.2rem,6vw,3.8rem)]">Projects that <em>ship</em></h2>
      </div>

      {/* DESKTOP SPLIT REVEAL STACK */}
      <div className="hidden md:block w-full">
        {PROJECTS.map((p, i) => (
          <div
            className="project-sec w-full h-screen flex items-center justify-center relative overflow-hidden bg-d0"
            id={`psec-${p.id}`}
            key={p.id}
          >
            {/* Background radial glow */}
            <div className="project-glow absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_center,rgba(201,169,110,0.06),transparent)] opacity-0 pointer-events-none transition-opacity"></div>

            {/* Revealed Project Content */}
            <div className="project-reveal absolute inset-0 z-10 flex flex-row items-center justify-center gap-16 px-[80px] max-w-[1440px] mx-auto w-full opacity-0 pointer-events-none">
              
              {/* Left Column: Premium Canvas Card Preview */}
              <div className="w-1/2 aspect-[4/3] max-h-[460px] relative rounded-[4px] overflow-hidden border border-border shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                <div className="pc-img absolute inset-0 bg-cover bg-center" id={`pi-desk-${i+1}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                
                <div className="absolute top-[28px] left-[30px] z-30 flex items-center gap-2">
                  <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-white/55">{p.num}</span>
                  <span className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-[rgba(201,169,110,.65)] py-[3px] px-2 rounded-[2px] border border-[rgba(201,169,110,.2)] bg-black/35 backdrop-blur-md">{p.cat}</span>
                </div>

              </div>

              {/* Right Column: Project Meta & Content */}
              <div className="w-1/2 flex flex-col items-start text-left pointer-events-auto">
                <span className="font-mono text-[0.7rem] tracking-[0.25em] text-gold uppercase mb-3">{p.cat}</span>
                <h3 className="font-serif text-[2.8rem] text-t-hi leading-tight mb-4 font-normal whitespace-pre-line">{p.name}</h3>
                
                <p className="project-desc text-t-mid text-[0.92rem] leading-relaxed mb-6 max-w-[480px] opacity-0">
                  {p.desc}
                </p>

                <div className="project-tech flex flex-wrap gap-2 mb-8 opacity-0">
                  {p.tech.map((t) => (
                    <span className="py-1 px-3 rounded-[2px] border border-border/40 text-[0.68rem] tracking-[0.1em] text-t-lo uppercase bg-black/20" key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-ctas flex gap-4 opacity-0">
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-[11px] px-6 min-h-[44px] inline-flex items-center justify-center bg-gold text-d0 rounded-[2px] font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-250 hover:bg-[#d4b47a]"
                    >
                      Live Preview
                    </a>
                  ) : (
                    <span
                      className="py-[11px] px-6 min-h-[44px] inline-flex items-center justify-center bg-gold/15 text-gold/40 border border-gold/20 rounded-[2px] font-mono text-[0.68rem] tracking-[0.18em] uppercase cursor-not-allowed select-none"
                      title="Coming Soon"
                    >
                      Live Preview (Coming Soon)
                    </span>
                  )}

                  {p.repoUrl ? (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-[11px] px-6 min-h-[44px] inline-flex items-center justify-center border border-border rounded-[2px] font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-250 hover:border-gold hover:text-gold"
                    >
                      View Code
                    </a>
                  ) : (
                    <span
                      className="py-[11px] px-6 min-h-[44px] inline-flex items-center justify-center border border-border/30 text-t-lo/40 rounded-[2px] font-mono text-[0.68rem] tracking-[0.18em] uppercase cursor-not-allowed select-none bg-white/[0.02]"
                      title="Coming Soon"
                    >
                      View Code (Coming Soon)
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Title Split Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="relative w-full h-[300px]" style={{ perspective: '1200px' }}>
                
                {/* Top Half Mask - Clips bottom 50% */}
                <div 
                  className="title-top absolute inset-0 flex items-center justify-center origin-bottom" 
                  style={{ 
                    clipPath: 'inset(0% 0% 50% 0%)',
                    WebkitClipPath: 'inset(0% 0% 50% 0%)',
                    transformStyle: 'preserve-3d' 
                  }}
                >
                  <h3 className="font-serif text-[6vw] text-[#f5f1ea] leading-none uppercase tracking-[0.05em] select-none text-center">
                    {p.splitName}
                  </h3>
                </div>

                {/* Bottom Half Mask - Clips top 50% */}
                <div 
                  className="title-bottom absolute inset-0 flex items-center justify-center origin-top" 
                  style={{ 
                    clipPath: 'inset(50% 0% 0% 0%)',
                    WebkitClipPath: 'inset(50% 0% 0% 0%)',
                    transformStyle: 'preserve-3d' 
                  }}
                >
                  <h3 className="font-serif text-[6vw] text-[#f5f1ea] leading-none uppercase tracking-[0.05em] select-none text-center">
                    {p.splitName}
                  </h3>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MOBILE LAYOUT (CLEAN STACK WITH STACKED CTA BUTTONS) */}
      <div className="block md:hidden px-5 sm:px-8 flex flex-col gap-14 w-full">
        {PROJECTS.map((p, i) => (
          <div className="mob-proj-card w-full flex flex-col gap-5" key={p.id}>
            
            {/* Visual Preview */}
            <div className="w-full aspect-[4/3] relative rounded-[8px] overflow-hidden border border-border shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="pc-img absolute inset-0 bg-cover bg-center" id={`pi-mob-${i+1}`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="absolute top-[16px] left-[18px] z-30 flex items-center gap-2">
                <span className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-white/55">{p.num}</span>
                <span className="font-mono text-[0.55rem] tracking-[0.16em] uppercase text-[rgba(201,169,110,.65)] py-[3px] px-2 rounded-[2px] border border-[rgba(201,169,110,.2)] bg-black/35 backdrop-blur-md">{p.cat}</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col items-start text-left">
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase mb-2">{p.cat}</span>
              <h3 className="font-serif text-[1.8rem] sm:text-[2.2rem] text-t-hi leading-tight mb-3 font-normal whitespace-pre-line">{p.name}</h3>
              <p className="text-t-mid text-[0.88rem] leading-relaxed mb-5">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.tech.map((t) => (
                  <span className="py-1 px-2.5 rounded-[2px] border border-border/40 text-[0.62rem] tracking-[0.08em] text-t-lo uppercase bg-black/20" key={t}>{t}</span>
                ))}
              </div>

              {/* Stacked CTA Buttons on Mobile — Equal Prominence & 48px Min Target */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[48px] py-3 flex items-center justify-center bg-gold text-d0 rounded-[4px] font-mono text-[0.72rem] tracking-[0.18em] uppercase font-medium active:scale-95 transition-transform hover:bg-[#d4b47a]"
                  >
                    Live Preview
                  </a>
                ) : (
                  <span
                    className="w-full min-h-[48px] py-3 flex items-center justify-center bg-gold/15 text-gold/40 border border-gold/20 rounded-[4px] font-mono text-[0.72rem] tracking-[0.18em] uppercase font-medium cursor-not-allowed select-none"
                    title="Coming Soon"
                  >
                    Live Preview (Coming Soon)
                  </span>
                )}

                {p.repoUrl ? (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[48px] py-3 flex items-center justify-center border border-border/60 text-t-hi rounded-[4px] font-mono text-[0.72rem] tracking-[0.18em] uppercase font-medium bg-white/5 active:scale-95 transition-transform hover:border-gold hover:text-gold"
                  >
                    View Code
                  </a>
                ) : (
                  <span
                    className="w-full min-h-[48px] py-3 flex items-center justify-center border border-border/30 text-t-lo/40 rounded-[4px] font-mono text-[0.72rem] tracking-[0.18em] uppercase font-medium bg-white/[0.02] cursor-not-allowed select-none"
                    title="Coming Soon"
                  >
                    View Code (Coming Soon)
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
