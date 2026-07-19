import React from 'react';

export default function GridTransition({ gridRef }) {
  return (
    <div 
      ref={gridRef}
      className="absolute inset-0 z-10 pointer-events-none opacity-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(201, 169, 110, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201, 169, 110, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        clipPath: 'inset(50% 0 50% 0)',
        WebkitClipPath: 'inset(50% 0 50% 0)',
        willChange: 'clip-path, opacity',
      }}
    />
  );
}
