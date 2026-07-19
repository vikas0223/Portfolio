
export function animateHeroReveal(tl) {
  // 1. Fade out the loader container and unlock scrolling
  tl.to('#preloader-container', { 
    opacity: 0, 
    duration: 0.6, 
    ease: 'power2.inOut',
    onComplete: () => {
      const container = document.getElementById('preloader-container');
      if (container) container.style.display = 'none';
      document.body.classList.remove('preloading');
    }
  });

  // 2. Navbar fade down
  tl.fromTo('#nav', 
    { y: -20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 
    '-=0.35'
  );

  // 3. Hero headings (.hl) slide up
  tl.fromTo('.hl', 
    { y: 28, opacity: 0 }, 
    { y: 0, opacity: 1, stagger: 0.12, duration: 0.75, ease: 'power3.out' }, 
    '-=0.4'
  );

  // 4. Hero subtext slide up
  tl.fromTo('.hero-sub', 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
    '-=0.55'
  );

  // 5. Hero CTA button slide up
  tl.fromTo('#hero-cta', 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
    '-=0.55'
  );

  // 6. Scroll indicator line & text reveal
  tl.fromTo('.sline', 
    { width: 0, opacity: 0 }, 
    { width: 42, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
    '-=0.5'
  );
  tl.fromTo('.sline + span', 
    { x: -10, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
    '-=0.4'
  );

  // 7. 3D Room model canvas zoom in & fade
  tl.fromTo('#hero-3d-container', 
    { scale: 0.95, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 0.95, ease: 'power3.out' }, 
    '-=0.65'
  );

  // 8. Custom cursor trigger fade in
  tl.fromTo('#cdot, #cring', 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 
    '-=0.2'
  );
}
