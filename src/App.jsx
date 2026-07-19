import React, { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Marquee from './components/ui/Marquee';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import UsualSuspects from './components/sections/UsualSuspects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import CustomCursor from './components/ui/CustomCursor';
import Footer from './components/layout/Footer';
import Preloader from './components/preloader/Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const visited = sessionStorage.getItem('portfolio-visited');
      return visited ? false : true;
    }
    return true;
  });

  // Scroll reveal for [data-r] elements — matching original HTML logic
  useEffect(() => {
    const delayMap = { '1': 0.06, '2': 0.13, '3': 0.20, '4': 0.27, '5': 0.34 };

    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-r]').forEach(el => {
        const type = el.getAttribute('data-r') || '';
        const delay = delayMap[el.getAttribute('data-d')] || 0;

        let fromVars, toVars;
        if (type === 'l') { fromVars = { x: -36, opacity: 0 }; toVars = { x: 0, opacity: 1 }; }
        else if (type === 'r') { fromVars = { x: 36, opacity: 0 }; toVars = { x: 0, opacity: 1 }; }
        else if (type === 's') { fromVars = { scale: 0.94, y: 18, opacity: 0 }; toVars = { scale: 1, y: 0, opacity: 1 }; }
        else if (type === 'c') { fromVars = { clipPath: 'inset(0 0 100% 0)', opacity: 0 }; toVars = { clipPath: 'inset(0 0 0% 0)', opacity: 1 }; }
        else { fromVars = { y: 28, opacity: 0 }; toVars = { y: 0, opacity: 1 }; }

        gsap.set(el, fromVars);
        gsap.to(el, {
          ...toVars,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 55%',
            scrub: 0.6,
          },
        });
      });

      // Pill stagger animation
      document.querySelectorAll('#about .pills').forEach(container => {
        const pills = container.querySelectorAll('.pill');
        if (!pills.length) return;
        gsap.set(pills, { y: 8, opacity: 0, scale: 0.97 });
        gsap.to(pills, {
          y: 0, opacity: 1, scale: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <UsualSuspects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
