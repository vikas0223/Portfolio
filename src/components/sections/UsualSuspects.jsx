import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import suspectsImg from '../assets/usual_suspects.png';

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
      style={{
        background: 'linear-gradient(180deg, #0c0b09 0%, #11100e 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        width: '100%',
        padding: '100px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
      }}>
        
        {/* TITLE */}
        <h2 
          ref={titleRef}
          style={{
            margin: '0 0 16px 0',
            textAlign: 'center',
            lineHeight: 1.1,
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
          }}
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
          style={{
            margin: '0',
            textAlign: 'center',
            color: '#888480',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
        >
          These are the tools I work with on a regular basis.
        </p>

        {/* IMAGE */}
        <div 
          ref={imageRef}
          style={{
            marginTop: '60px', // Proper margin-top requirement
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={suspectsImg}
            alt="The Usual Suspects Tools"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)', // Very subtle shadow
              borderRadius: '8px',
            }}
          />
        </div>

      </div>
    </section>
  );
}
