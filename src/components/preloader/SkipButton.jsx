import React from 'react';

export default function SkipButton({ onSkip, btnRef }) {
  return (
    <button 
      ref={btnRef}
      onClick={onSkip}
      className="absolute top-8 right-8 z-50 font-mono text-[0.7rem] tracking-[0.22em] text-t-lo uppercase bg-transparent border-none cursor-default outline-none hover:text-gold transition-colors duration-300 py-1 opacity-0 pointer-events-none"
      style={{ borderBottom: '1px solid transparent' }}
      onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#c9a96e'}
      onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
    >
      Skip &rarr;
    </button>
  );
}
