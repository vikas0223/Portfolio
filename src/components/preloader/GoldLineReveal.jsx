import React from 'react';

export default function GoldLineReveal({ dotRef }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div 
        ref={dotRef} 
        className="w-1.5 h-1.5 rounded-full bg-gold opacity-0"
        style={{ willChange: 'width, height, border-radius, opacity' }}
      />
    </div>
  );
}
