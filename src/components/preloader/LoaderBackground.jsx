import React from 'react';

export default function LoaderBackground() {
  // Generate 12 floating particles with random offsets
  const particles = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-d0 select-none pointer-events-none">
      {/* Self-contained keyframes for particles and breathing glow */}
      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.35;
          }
          85% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-110vh) translateX(var(--drift-x, 20px));
            opacity: 0;
          }
        }
        @keyframes breathe-glow {
          0%, 100% {
            opacity: 0.16;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.28;
            transform: scale(1.05);
          }
        }
      `}</style>

      {/* Grid Pattern Layer */}
      <div 
        className="absolute inset-0 opacity-[0.65]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 169, 110, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 169, 110, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Breathing Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] aspect-square max-w-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'breathe-glow 9s ease-in-out infinite',
        }}
      />

      {/* Vignette Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 30%, rgba(12, 11, 9, 0.92) 100%)',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((_, i) => {
          const delay = -Math.random() * 12;
          const duration = 7 + Math.random() * 8;
          const driftX = (Math.random() * 60 - 30) + 'px';
          const size = 1.5 + Math.random() * 1.5;
          const left = Math.random() * 100 + '%';

          return (
            <div
              key={i}
              className="absolute bg-gold rounded-full"
              style={{
                left,
                bottom: '-20px',
                width: size + 'px',
                height: size + 'px',
                '--drift-x': driftX,
                animation: `float-particle ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
