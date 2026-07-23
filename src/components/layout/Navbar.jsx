import React, { useEffect, useRef, useState } from 'react';
import resumePdf from '../../resume/Resume 2.pdf'; // Assuming this resolves correctly in Vite
import { siteConfig } from '../../config/siteConfig';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const update = (y) => {
      setScrolled(y > 60);
      // Hide when scrolling down past 120px, show when scrolling up
      // Don't hide if menu or resume is open
      if (!showResume && !mobileMenuOpen) {
        setHidden(y > lastY.current && y > 120);
      }
      lastY.current = y;
    };

    const onLenisScroll = (lenis) => update(lenis.scroll);
    const onNativeScroll = () => update(window.scrollY);

    if (window.__lenis) {
      window.__lenis.on('scroll', onLenisScroll);
    } else {
      window.addEventListener('scroll', onNativeScroll, { passive: true });
    }

    return () => {
      if (window.__lenis) {
        window.__lenis.off('scroll', onLenisScroll);
      }
      window.removeEventListener('scroll', onNativeScroll);
    };
  }, [showResume, mobileMenuOpen]);

  // Handle ESC key for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowResume(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal/menu is open
  useEffect(() => {
    if (showResume || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showResume, mobileMenuOpen]);

  const navLinks = ['about', 'projects', 'education', 'contact'];

  return (
    <>
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-[550] py-[22px] px-6 md:px-[60px] flex justify-between items-center transition-all duration-400 ease-in-out border-b border-transparent ${
          scrolled && !mobileMenuOpen ? 'bg-[rgba(12,11,9,.93)] backdrop-blur-[20px] !border-b-[var(--border)]' : ''
        } ${hidden ? '-translate-y-full' : ''}`}
      >
        {/* LEFT: Logo */}
        <div className="flex-1 flex justify-start">
          <a href="#hero" className="font-serif text-[1.3rem] tracking-[.01em] text-t-hi no-underline hover:opacity-70 transition-opacity">
            {siteConfig.name}
          </a>
        </div>

        {/* CENTER: Status (Balanced properly) */}
        <div className="flex-1 hidden md:flex justify-center items-center gap-2 text-[0.74rem] text-t-lo">
          <span className="w-[7px] h-[7px] rounded-full bg-green animate-[sdot-ping_2.2s_infinite]"></span>
          <span>available for work</span>
        </div>

        {/* RIGHT: Desktop Links */}
        <div className="flex-1 hidden md:flex justify-end">
          <ul className="flex items-center gap-[32px] list-none">
            {navLinks.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-[0.72rem] tracking-[0.14em] uppercase text-t-lo relative transition-colors hover:text-gold after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px after:bg-gold after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
                >
                  {id === 'projects' ? 'Work' : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setShowResume(true)}
                className="text-[0.72rem] tracking-[0.14em] uppercase text-gold relative transition-all hover:text-[#f2ede6] hover:drop-shadow-[0_0_8px_rgba(201,169,110,0.5)] after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px after:bg-gold after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
              >
                Resume
              </button>
            </li>
          </ul>
        </div>

        {/* RIGHT: Mobile Menu Toggle */}
        <div className="flex-1 flex justify-end md:hidden">
          <button
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className={`w-12 h-12 min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-[6px] relative rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 cursor-pointer ${
              mobileMenuOpen
                ? 'bg-gold/10 border border-gold/40 shadow-[0_0_20px_rgba(201,169,110,0.25)] rotate-180'
                : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rotate-0'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                mobileMenuOpen
                  ? 'bg-gold rotate-45 translate-y-[7.5px]'
                  : 'bg-t-hi rotate-0 translate-y-0'
              }`}
            ></span>
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen
                  ? 'bg-gold opacity-0 scale-x-0'
                  : 'bg-t-hi opacity-100 scale-x-100'
              }`}
            ></span>
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                mobileMenuOpen
                  ? 'bg-gold -rotate-45 -translate-y-[7.5px]'
                  : 'bg-t-hi rotate-0 translate-y-0'
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[501] bg-[#0c0b11]/96 backdrop-blur-2xl flex flex-col justify-between items-center p-8 transition-all duration-500 ease-[var(--ease)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
      >
        {/* Top spacer matching nav height */}
        <div className="w-full h-[60px] shrink-0"></div>

        <div className="flex flex-col items-center gap-6 my-auto w-full">
          {/* Available for work (Mobile) */}
          <div className="flex items-center gap-2 text-[0.76rem] font-mono text-t-lo uppercase tracking-[0.14em] mb-4">
            <span className="w-[8px] h-[8px] rounded-full bg-green animate-[sdot-ping_2.2s_infinite]"></span>
            <span>available for work</span>
          </div>

          <ul className="flex flex-col items-center gap-6 list-none w-full">
            {navLinks.map((id, index) => (
              <li
                key={id}
                className="w-full text-center transition-all duration-500"
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 80}ms` : '0ms',
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileMenuOpen ? 1 : 0
                }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-[2.4rem] sm:text-[3rem] text-t-hi hover:text-gold active:text-gold transition-colors inline-block py-1 min-h-[48px] flex items-center justify-center"
                >
                  {id === 'projects' ? 'Work' : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
            <li
              className="w-full flex justify-center mt-4 transition-all duration-500"
              style={{
                transitionDelay: mobileMenuOpen ? `${navLinks.length * 80}ms` : '0ms',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0
              }}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowResume(true);
                }}
                className="py-3.5 px-8 min-h-[48px] rounded-full border border-gold/40 text-gold text-[0.78rem] tracking-[0.2em] font-mono uppercase bg-gold/5 active:bg-gold/20 active:scale-95 transition-all"
              >
                View Resume
              </button>
            </li>
          </ul>
        </div>

        <div className="w-full text-center pb-4 text-t-lo font-mono text-[0.65rem] tracking-[0.15em] uppercase">
          © 2026 {siteConfig.name}
        </div>
      </div>

      {/* RESUME MODAL OVERLAY */}
      <div
        className={`fixed inset-0 z-[600] flex items-center justify-center transition-all duration-500 ease-[var(--ease)] ${
          showResume ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Glassmorphism Background Backdrop */}
        <div
          className="absolute inset-0 bg-[#0c0b09]/80 backdrop-blur-md"
          onClick={() => setShowResume(false)}
        ></div>

        {/* Modal Panel */}
        <div
          className={`relative z-10 w-full max-w-[800px] bg-d1 border border-border rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,169,110,0.1)] p-8 md:p-12 mx-4 md:mx-0 flex flex-col items-center transition-all duration-500 delay-75 ease-[var(--ease)] ${
            showResume ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-95 opacity-0'
          }`}
        >
          <button
            onClick={() => setShowResume(false)}
            className="absolute top-6 right-6 text-t-lo hover:text-t-hi transition-colors"
            title="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <p className="font-mono text-[0.7rem] tracking-[0.25em] text-gold uppercase mb-4">Curriculum Vitae</p>
          <h2 className="font-serif text-[2.5rem] md:text-[3.2rem] text-t-hi font-light mb-8 text-center leading-tight">
            Resume
          </h2>

          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-[500px]">
            {/* Download PDF Button */}
            <a
              href={resumePdf}
              download="Vikas_Singh_Resume.pdf"
              className="flex-1 flex justify-center items-center gap-3 py-4 bg-[rgba(255,255,255,0.03)] border border-border rounded-[4px] text-t-hi font-mono text-[0.75rem] tracking-[0.15em] uppercase hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(201,169,110,0.3)] transition-all duration-300 group"
            >
              <svg className="text-gold group-hover:translate-y-[2px] transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </a>

            {/* Open Full Resume Button */}
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex justify-center items-center gap-3 py-4 bg-gold text-d0 rounded-[4px] font-mono text-[0.75rem] tracking-[0.15em] uppercase hover:bg-[#d4b47a] hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] transition-all duration-300 group"
            >
              Open Full
              <svg className="transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
