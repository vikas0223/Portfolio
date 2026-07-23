import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Check touch / tablet media query
    const isTouchOrTablet = window.matchMedia('(pointer: coarse), (max-width: 1024px)').matches;
    if (isTouchOrTablet) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    // Use GSAP's quickSetter for maximum performance (bypasses style recalc)
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');
    const setRingRotation = gsap.quickSetter(ring, 'rotation', 'deg');
    const setRingScaleX = gsap.quickSetter(ring, 'scaleX');
    const setRingScaleY = gsap.quickSetter(ring, 'scaleY');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let rx = mx, ry = my;
    let pvx = 0, pvy = 0;

    function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove, { passive: true });

    // Delta-time compensated lerp for frame-rate independence
    const tickerCb = (time, dt) => {
      // dt is in seconds from GSAP ticker
      const dtSec = Math.min(dt / 1000, 0.05); // cap at 50ms to prevent jumps
      const dotSpeed = 1 - Math.pow(0.001, dtSec); // ~0.35 at 60fps, adapts to framerate
      const ringSpeed = 1 - Math.pow(0.00001, dtSec); // ~0.18 at 60fps, buttery smooth

      // Dot follows quickly
      dx += (mx - dx) * dotSpeed;
      dy += (my - dy) * dotSpeed;
      setDotX(dx - 3);
      setDotY(dy - 3);

      // Ring follows with lag — velocity-based deformation
      const oldRx = rx, oldRy = ry;
      rx += (mx - rx) * ringSpeed;
      ry += (my - ry) * ringSpeed;

      // Smooth velocity (EMA)
      const vx = rx - oldRx;
      const vy = ry - oldRy;
      pvx += (vx - pvx) * 0.4;
      pvy += (vy - pvy) * 0.4;

      const spd = Math.sqrt(pvx * pvx + pvy * pvy);
      const squeeze = clamp(1 - spd * 0.012, 0.78, 1);
      const stretch = clamp(1 + spd * 0.015, 1, 1.3);
      const angle = Math.atan2(pvy, pvx) * (180 / Math.PI);

      setRingX(rx - 19);
      setRingY(ry - 19);
      setRingRotation(angle);
      setRingScaleX(stretch);
      setRingScaleY(squeeze);
    };
    gsap.ticker.add(tickerCb);

    // Hover states via event delegation
    const linkSel = 'a, button, .pill-btn, .cf-fr, .cf-fl, .pill, .mq-word, .pc-cta, .cf-sub';
    const cardSel = '.pc, .cc, .ec, .er, .fx';
    const headlineSel = '.stitle, .hl, .ct-ti, .slabel';

    const clearAll = () => document.body.classList.remove('ch', 'chl', 'cht');

    const onMouseOver = (e) => {
      if (e.target.closest(headlineSel)) { clearAll(); document.body.classList.add('cht'); }
      else if (e.target.closest(cardSel)) { clearAll(); document.body.classList.add('ch'); }
      else if (e.target.closest(linkSel)) { clearAll(); document.body.classList.add('chl'); }
    };
    const onMouseOut = (e) => {
      if (e.target.closest(headlineSel)) { document.body.classList.remove('cht'); }
      else if (e.target.closest(cardSel)) { document.body.classList.remove('ch'); }
      else if (e.target.closest(linkSel)) { document.body.classList.remove('chl'); }
    };
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Click state
    const onDown = () => document.body.classList.add('ck');
    const onUp = () => document.body.classList.remove('ck');
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    // Hide when cursor leaves window
    const onDocLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onDocEnter = () => { dot.style.opacity = ''; ring.style.opacity = ''; };
    document.addEventListener('mouseleave', onDocLeave);
    document.addEventListener('mouseenter', onDocEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tickerCb);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onDocLeave);
      document.removeEventListener('mouseenter', onDocEnter);
    };
  }, []);

  return (
    <>
      <div id="cdot" ref={dotRef}></div>
      <div id="cring" ref={ringRef}></div>
    </>
  );
}
