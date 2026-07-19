import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useAssetPreloader from '../../hooks/useAssetPreloader';
import { GREETINGS } from './preloaderData';
import LoaderBackground from './LoaderBackground';
import GreetingSequence from './GreetingSequence';
import GoldLineReveal from './GoldLineReveal';
import GridTransition from './GridTransition';
import SkipButton from './SkipButton';
import { animateHeroReveal } from './HeroReveal';

export default function Preloader({ onComplete }) {
  const { isLoaded, statusMessage } = useAssetPreloader();
  const [canShowSkip, setCanShowSkip] = useState(false);
  const [currentText, setCurrentText] = useState(GREETINGS[0] || 'Namaste.');
  
  const textRef = useRef(null);
  const statusRef = useRef(null);
  const dotRef = useRef(null);
  const gridRef = useRef(null);
  const btnRef = useRef(null);
  const containerRef = useRef(null);
  const masterTimelineRef = useRef(null);

  // Skip handler - instantly jumps to the Hero reveal sequence
  const handleSkip = () => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.seek('reveal-start');
      masterTimelineRef.current.play();
    }
  };

  useEffect(() => {
    // 1. Accessibility check: Bypasses animations if prefers-reduced-motion is active
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.remove('preloading');
      onComplete();
      return;
    }

    // 2. Lock body scrolling (wheel, touch, and keys)
    document.body.classList.add('preloading');
    const preventScroll = (e) => {
      if (document.body.classList.contains('preloading')) {
        e.preventDefault();
      }
    };
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    // Enable skip button fade-in after 1 second
    const skipTimer = setTimeout(() => {
      setCanShowSkip(true);
      if (btnRef.current) {
        gsap.to(btnRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
      }
    }, 1000);

    // 3. Build Master GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        document.body.classList.remove('preloading');
        onComplete();
      }
    });
    masterTimelineRef.current = tl;

    // A. Greeting sequence (Namaste to Hello)
    GREETINGS.forEach((greeting) => {
      tl.call(() => {
        setCurrentText(greeting);
      });
      tl.fromTo(textRef.current,
        { opacity: 0, filter: 'blur(12px)', y: 15 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.25, ease: 'power2.out' }
      );
      tl.to({}, { duration: 0.25 }); // Short stay duration
      tl.to(textRef.current,
        { opacity: 0, filter: 'blur(10px)', y: -10, duration: 0.2, ease: 'power2.in' }
      );
    });

    // B. Personal Welcome Message
    // "Hello."
    tl.call(() => {
      setCurrentText('Hello.');
    });
    tl.fromTo(textRef.current,
      { opacity: 0, filter: 'blur(12px)', y: 15 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.22, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.28 });
    tl.to(textRef.current,
      { opacity: 0, filter: 'blur(10px)', y: -10, duration: 0.18, ease: 'power2.in' }
    );

    // "I'm Vikas Singh"
    tl.call(() => {
      setCurrentText('I\'m <span class="text-gold font-medium">Vikas Singh</span>');
    });
    tl.fromTo(textRef.current,
      { opacity: 0, filter: 'blur(12px)', y: 15 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.32, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.55 }); // Pause
    tl.to(textRef.current,
      { opacity: 0, filter: 'blur(10px)', y: -10, duration: 0.2, ease: 'power2.in' }
    );

    // "UI/UX Designer"
    tl.call(() => {
      setCurrentText('UI/UX Designer');
    });
    tl.fromTo(textRef.current,
      { opacity: 0, filter: 'blur(12px)', y: 15 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.32, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.55 }); // Pause
    
    // Animate exit of both greetings text and loader status indicator together
    tl.to([textRef.current, statusRef.current], {
      opacity: 0,
      filter: 'blur(10px)',
      y: -10,
      duration: 0.22,
      ease: 'power2.in'
    });

    // C. Gold Dot -> Stretch Line -> Extend -> Grid Transformation
    // Reveal centered Gold Dot
    tl.fromTo(dotRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }
    );
    tl.to({}, { duration: 0.1 });

    // Stretch to center horizontal line
    tl.to(dotRef.current, {
      width: 260,
      height: 1.5,
      borderRadius: 0,
      duration: 0.32,
      ease: 'power3.inOut'
    });

    // Extend line to full screen width
    tl.to(dotRef.current, {
      width: '100%',
      duration: 0.38,
      ease: 'power2.inOut'
    });

    // Draw Grid (clipPath vertical expansion of gold grid)
    tl.fromTo(gridRef.current,
      { opacity: 0, clipPath: 'inset(50% 0 50% 0)', WebkitClipPath: 'inset(50% 0 50% 0)' },
      { opacity: 1, clipPath: 'inset(0% 0 0% 0)', WebkitClipPath: 'inset(0% 0 0% 0)', duration: 0.65, ease: 'power3.out' },
      '-=0.18'
    );
    
    // Fade out skip button
    tl.to(btnRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.2 }, '-=0.5');

    // Fade out original center line as it blends into grid
    tl.to(dotRef.current, { opacity: 0, duration: 0.2 }, '-=0.5');

    // D. Seamless Hero Transition Label
    tl.addLabel('reveal-start');

    // Run the synchronized Hero slide/fade transitions
    animateHeroReveal(tl);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      clearTimeout(skipTimer);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      id="preloader-container"
      className="fixed inset-0 w-screen h-screen z-[9999] overflow-hidden"
    >
      <LoaderBackground />
      <GreetingSequence 
        textRef={textRef} 
        statusRef={statusRef} 
        statusMessage={statusMessage} 
        currentText={currentText}
      />
      <GoldLineReveal dotRef={dotRef} />
      <GridTransition gridRef={gridRef} />
      <SkipButton onSkip={handleSkip} btnRef={btnRef} />
    </div>
  );
}
