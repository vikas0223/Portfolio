import React from 'react';

export default function GreetingSequence({ textRef, statusRef, statusMessage, currentText }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      <div className="text-center px-6">
        <h1 
          ref={textRef} 
          className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] text-t-hi tracking-normal leading-none font-light select-none"
          style={{ opacity: 0, willChange: 'opacity, transform' }}
          dangerouslySetInnerHTML={{ __html: currentText || GREETINGS[0] || 'Hello.' }}
        />
      </div>
      
      {/* Loading Status Indicator at bottom */}
      <div 
        ref={statusRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
      >
        <span 
          className="font-mono text-[0.62rem] tracking-[0.25em] text-gold/45 uppercase select-none"
          style={{ willChange: 'opacity' }}
        >
          {statusMessage}
        </span>
      </div>
    </div>
  );
}
