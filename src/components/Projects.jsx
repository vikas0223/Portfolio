import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 'pcw1', num: '01', cat: 'UI/UX · Finance', name: 'FinWise — Budgeting &\nExpense Tracking', bg: ['#131210', '#1a1814'], line: '#c9a96e', acc: '#c9a96e' },
  { id: 'pcw2', num: '02', cat: 'UI/UX · E-Commerce', name: 'NEONVOID —\nRecord Store Platform', bg: ['#131210', '#1a1814'], line: '#c9a96e', acc: '#c9a96e' },
  { id: 'pcw3', num: '03', cat: 'UI/UX · Health', name: 'Workout\nPlanning App', bg: ['#131210', '#1a1814'], line: '#c9a96e', acc: '#c9a96e' },
  { id: 'pcw4', num: '04', cat: 'UI/UX · Wellness', name: 'Saanjh —\nMental Wellness Chatbot', bg: ['#131210', '#1a1814'], line: '#c9a96e', acc: '#c9a96e' },
];

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
    // Draw canvas backgrounds
    PROJECTS.forEach((p, i) => {
      const el = document.getElementById(`pi${i+1}`);
      if (el) drawCardBg(el, p, i);
    });

    const pcw1 = document.getElementById('pcw1');
    const pcw2 = document.getElementById('pcw2');
    const pcw3 = document.getElementById('pcw3');
    const pcw4 = document.getElementById('pcw4');
    const titleWrap = document.getElementById('proj-title-wrap');
    if (!pcw1 || !pcw2 || !pcw3 || !pcw4 || !titleWrap) return;

    const isMobile = window.matchMedia('(max-width:860px)').matches;

    const ctx = gsap.context(() => {
      // More visible starting positions: slide in from left/right edges
      gsap.set(pcw1, { x: '-25vw', y: 40, autoAlpha: 0 });
      gsap.set(pcw2, { x: '25vw', y: 40, autoAlpha: 0 });
      gsap.set(pcw3, { x: '-25vw', y: 40, autoAlpha: 0 });
      gsap.set(pcw4, { x: '25vw', y: 40, autoAlpha: 0 });
      gsap.set(titleWrap, { y: 0, autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }, // Premium soft easing
        scrollTrigger: {
          trigger: '#projects',
          start: isMobile ? 'top 80%' : 'top top',
          end: isMobile ? 'bottom 20%' : '+=3800',
          pin: !isMobile, // Stack scrolls naturally on mobile
          pinSpacing: !isMobile,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(pcw1, { x: 0, y: 0, autoAlpha: 1, duration: 0.40 }, 0.00)
        .to(pcw2, { x: 0, y: 0, autoAlpha: 1, duration: 0.40 }, 0.25)
        .to(pcw3, { x: 0, y: 0, autoAlpha: 1, duration: 0.40 }, 0.50)
        .to(pcw4, { x: 0, y: 0, autoAlpha: 1, duration: 0.40 }, 0.75)
        .to(titleWrap, { y: -32, autoAlpha: 0, duration: 0.15, ease: 'power2.inOut' }, 1.10);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="bg-d0 w-full relative overflow-visible pt-[140px] pb-[100px] z-10">
      <div id="proj-title-wrap" className="text-center px-[72px] mb-[52px] relative z-10 isolate will-change-[opacity,transform]">
        <p className="slabel justify-center after:hidden">Selected Work</p>
        <h2 className="stitle !mb-0">Projects that <em>ship</em></h2>
      </div>

      <div id="proj-grid" className="w-full px-6 md:px-[72px] overflow-x-clip">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
          {PROJECTS.map((p, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div className="pc-wrap" id={p.id} key={p.id}>
                <a className="pc relative overflow-hidden border border-border rounded-[2px] h-[360px] md:h-[420px] block w-full no-underline transition-all duration-400 ease hover:shadow-[0_0_0_1px_rgba(201,169,110,.35),0_28px_70px_rgba(0,0,0,.6)] hover:border-[rgba(201,169,110,.35)] group" href="#">
                  <div className="pc-img absolute inset-0 bg-cover bg-center transition-transform duration-[650ms] ease-[var(--ease)] group-hover:scale-[1.07] z-0" id={`pi${i+1}`}></div>
                  <div className="absolute inset-0 bg-[rgba(8,7,5,.65)] opacity-0 transition-opacity duration-500 ease-[var(--ease)] group-hover:opacity-100 z-10"></div>
                  
                  {/* Top-left subtle details */}
                  <div className="absolute top-[24px] left-[26px] z-30 flex items-center gap-2">
                    <span className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-white/55">{p.num}</span>
                    <span className="font-mono text-[0.55rem] tracking-[0.16em] uppercase text-[rgba(201,169,110,.65)] py-[3px] px-2 rounded-[2px] border border-[rgba(201,169,110,.2)] bg-black/35 backdrop-blur-md">{p.cat}</span>
                  </div>
                  
                  {/* Alternating Content Layout -> Now Centered */}
                  <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 p-10 md:p-14 pointer-events-none text-center">
                    <h3 className="font-serif text-[1.65rem] md:text-[1.85rem] font-normal text-[#f5f1ea] leading-[1.2] tracking-[-0.01em] whitespace-pre-line opacity-0 translate-y-5 transition-all duration-500 ease-[var(--ease)] group-hover:opacity-100 group-hover:translate-y-0 delay-75">
                      {p.name}
                    </h3>
                    <span className="pc-cta pointer-events-auto inline-flex items-center gap-[10px] py-[11px] px-6 bg-gold text-d0 rounded-[2px] font-mono text-[0.68rem] tracking-[0.18em] uppercase opacity-0 translate-y-5 transition-all duration-500 ease-[var(--ease)] group-hover:opacity-100 group-hover:translate-y-0 delay-150 hover:bg-[#d4b47a] hover:gap-[14px]">
                      View Project
                      <svg className="shrink-0 transition-transform duration-300 ease group-hover:translate-x-1" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  {/* Bottom gradient stroke on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] z-50 bg-gradient-to-r from-gold to-teal scale-x-0 origin-left transition-transform duration-[600ms] ease-[var(--ease)] group-hover:scale-x-100"></div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
