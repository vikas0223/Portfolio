import React, { useEffect, useRef } from 'react';
import SectionGlow from '../ui/SectionGlow';
import { EDUCATION_HISTORY, CERTIFICATIONS, ACHIEVEMENTS } from '../../config/education';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const scoreRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      scoreRefs.current.forEach((el, idx) => {
        if (!el) return;
        const item = EDUCATION_HISTORY[idx];
        if (!item) return;

        const targetVal = item.targetValue;
        const decimals = item.decimals || 0;
        const prefix = item.prefix || '';
        const suffix = item.suffix || '';

        const proxy = { val: 0 };
        // Set initial 0 value
        el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

        gsap.to(proxy, {
          val: targetVal,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el.closest('.er') || el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${prefix}${decimals > 0 ? proxy.val.toFixed(decimals) : Math.round(proxy.val)}${suffix}`;
          },
          onComplete: () => {
            el.textContent = `${prefix}${decimals > 0 ? targetVal.toFixed(decimals) : targetVal}${suffix}`;
            gsap.fromTo(el,
              { filter: 'brightness(1.25)' },
              { filter: 'brightness(1)', duration: 0.4, ease: 'power2.out' }
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Education */}
      <section ref={sectionRef} id="education" className="sec bg-d1 border-t border-border px-5 sm:px-8 md:px-[72px]">
        <SectionGlow />
        <p className="slabel" data-r>Education</p>
        <h2 className="stitle text-[clamp(2.1rem,4.2vw,3.8rem)]" data-r="c">Academic <em>background</em></h2>
        <div className="flex flex-col gap-[3px]">
          {EDUCATION_HISTORY.map((item, idx) => (
            <div className="er" data-r="l" data-d={idx + 1} key={idx}>
              <div>
                <p className="er-in">{item.institution}</p>
                <p className="er-dg">{item.degree}</p>
              </div>
              <div className="er-rt">
                <p className="er-yr">{item.period}</p>
                <p 
                  ref={(el) => (scoreRefs.current[idx] = el)}
                  className="er-sc text-gold font-mono text-[0.76rem] font-medium tracking-wide inline-block"
                  style={{ willChange: 'contents' }}
                >
                  {item.score}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="sec bg-d0 border-t border-border px-5 sm:px-8 md:px-[72px]">
        <SectionGlow />
        <p className="slabel" data-r>Certifications</p>
        <h2 className="stitle text-[clamp(2.1rem,4.2vw,3.8rem)]" data-r="c">Verified <em>learning</em></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[3px]">
          {CERTIFICATIONS.map((item, idx) => (
            <div className="cc" data-r data-d={idx + 1} key={idx}>
              <p className="cc-org">{item.organization}</p>
              <p className="cc-nm">{item.name}</p>
              <p className="cc-yr">{item.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra */}
      <section id="extra" className="sec bg-d1 border-t border-border px-5 sm:px-8 md:px-[72px]">
        <SectionGlow />
        <p className="slabel" data-r>Beyond Design</p>
        <h2 className="stitle text-[clamp(2.1rem,4.2vw,3.8rem)]" data-r="c">Extra-curricular <em>achievements</em></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
          {ACHIEVEMENTS.map((item, idx) => (
            <div className="ec" data-r="s" data-d={idx + 1} key={idx}>
              <p className="ec-rk">{item.rank}</p>
              <p className="ec-ti">{item.title}</p>
              <p className="ec-ds">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
