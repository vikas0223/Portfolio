import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import suspectsImg from '../../assets/images/usual-suspects.png';

gsap.registerPlugin(ScrollTrigger);

export default function UsualSuspects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      // Title: fade-in + slight upward motion
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      // Subtitle: slight delay after title
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.5" // Overlap for fluidity
      )
      // Image: fade-in after text
      .fromTo(imageRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
        "-=0.2"
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 md:py-28 px-5 sm:px-8 md:px-12 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
      style={{
        background: 'linear-gradient(180deg, #0c0b09 0%, #11100e 100%)',
      }}
    >
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        
        {/* TITLE */}
        <h2 
          ref={titleRef}
          className="mb-4 text-center leading-tight text-[clamp(2.1rem,6vw,5.5rem)]"
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#f2ede6',
          }}>THE </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#c9a96e', // Gold accent
          }}>USUAL</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#f2ede6',
          }}> SUSPECTS</span>
        </h2>

        {/* SUBTITLE */}
        <p 
          ref={subtitleRef}
          className="text-center text-[#888480] font-sans font-light tracking-wide text-[clamp(0.85rem,2vw,1.125rem)] max-w-[500px]"
        >
          These are the tools I work with on a regular basis.
        </p>

        {/* IMAGE */}
        <div 
          ref={imageRef}
          className="mt-8 sm:mt-12 md:mt-16 w-full flex justify-center max-w-full overflow-hidden"
        >
          <img
            src={suspectsImg}
            alt="The Usual Suspects Tools"
            className="w-full max-w-full h-auto block object-contain shadow-[0_15px_35px_rgba(0,0,0,0.5)] rounded-lg"
          />
        </div>

      </div>
    </section>
  );
}
